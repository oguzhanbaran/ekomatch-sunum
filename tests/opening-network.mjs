import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import { chromium } from 'playwright-core'

const browser = await chromium.launch({ executablePath: process.env.EKOMATCH_CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })
const errors = []
page.on('pageerror', error => errors.push(error.message))
// Inspect the canvas model only in this test; no audit API is exposed in the presentation.
await page.route('**/giris/index.html', async route => {
  const response = await route.fetch()
  const html = await response.text()
  await route.fulfill({ response, body: html.replace('buildNetwork();requestAnimationFrame(render)', 'buildNetwork();window.networkAudit={nodes,edges,newEdges,chainSets,gaps,meshFaces,pointAt,edgePoint};requestAnimationFrame(render)') })
})
async function frame(time) {
  await page.locator('#voice').evaluate((audio, t) => { audio.pause(); audio.currentTime = t }, time)
  await page.waitForFunction(t => Math.abs(document.querySelector('#voice').currentTime - t) < .0001, time)
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
  return page.locator('#stage').evaluate(canvas => canvas.toDataURL())
}
try {
  const base = process.env.EKOMATCH_TEST_URL || 'http://127.0.0.1:5173'
  await page.goto(`${base}/giris/index.html`)
  await page.waitForFunction(() => window.networkAudit && document.querySelector('#voice').src.startsWith('blob:') && document.querySelector('#voice').readyState >= 1)
  const model = await page.evaluate(() => {
    const { nodes, edges, newEdges, chainSets, gaps, meshFaces, pointAt, edgePoint } = networkAudit
    return { nodes, edges, newEdges, chainSets, gaps, meshFaces,
      particleEndpoints: edges.map(e => [edgePoint(e, 12, 0), pointAt(e.a, 12), edgePoint(e, 12, 1), pointAt(e.b, 12)]) }
  })
  assert.equal(model.nodes.length, 64)
  assert.ok(model.edges.length >= 120 && model.edges.length <= 180)
  assert.ok(model.meshFaces.length >= 50)
  assert.equal(model.newEdges.length, 12)
  const unique = new Set()
  for (const e of [...model.edges, ...model.newEdges]) {
    assert.ok(model.nodes[e.a] && model.nodes[e.b] && e.a !== e.b)
    const key = [e.a,e.b].sort((a,b)=>a-b).join('-')
    assert.ok(!unique.has(key), `Duplicate relationship ${key}`); unique.add(key)
  }
  const connected = new Set([0])
  for (let pass = 0; pass < model.nodes.length; pass++) {
    for (const e of model.edges) if (connected.has(e.a) || connected.has(e.b)) { connected.add(e.a); connected.add(e.b) }
  }
  assert.equal(connected.size, model.nodes.length, 'Every node belongs to the main economic network')
  assert.deepEqual(model.edges.slice(0,3).map(e=>[e.a,e.b]), [[0,1],[2,3],[4,5]])
  assert.deepEqual(model.chainSets[0], [2,1,4])
  for (const n of model.nodes) assert.ok(n.x > 140 && n.x < 1800 && n.y > 90 && n.y < 1000)
  for (const [i, a] of model.nodes.entries()) for (const b of model.nodes.slice(i+1)) assert.ok(Math.hypot(a.x-b.x,a.y-b.y)>45, 'Nodes must remain visually separate')
  assert.ok(model.nodes.filter(n=>n.outside && n.x<650).length >= 10)
  assert.ok(model.nodes.filter(n=>n.outside && n.x>1270).length >= 10)
  for (const [a,b,c,d] of model.particleEndpoints) { assert.deepEqual(a,b); assert.deepEqual(c,d) }
  for (const gap of model.gaps) assert.ok(gap.a!==gap.b && gap.r>30 && gap.r<100)
  const cues = JSON.parse(await fs.readFile('public/giris/cues.json','utf8'))
  await fs.mkdir('test-results/opening-network', { recursive:true })
  for (const scene of cues.sahneler.filter(s=>s.id!=='bitis')) {
    await frame(scene.t + .05)
    assert.deepEqual(errors, [])
  }
  for (const time of [9,15.9,23.5,31.9,38.5]) {
    const original = await frame(time)
    await frame(time+.8)
    assert.equal(await frame(time), original, 'Seeking must reproduce the same network frame')
    await page.screenshot({path:`test-results/opening-network/${time}.png`})
  }
  assert.deepEqual(errors, [])
  assert.equal(await fs.readFile('giris/index.html','utf8'), await fs.readFile('public/giris/index.html','utf8'))
  console.log('Passed: connected 64-node triangular mesh with translucent faces, no duplicate/overlapping nodes, balanced outward groups, integrated opening/chain, consistent particle paths, all scenes and repeatable seeking at 1280×720.')
} finally { await browser.close() }

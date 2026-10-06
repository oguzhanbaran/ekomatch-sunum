import assert from 'node:assert/strict'
import { chromium } from 'playwright-core'
import { perspectiveNetwork as model, TIMELINE } from '../src/data/perspectiveNetwork.ts'

assert.equal(model.nodes.length,120)
assert.equal(model.nodes.filter(n=>n.business).length,18)
assert.equal(model.edges.length,200)
assert.equal(model.gaps.length,5)
for (const year of [1995,2000,2010,2020,2026]) {
  const actual=model.nodes.filter(n=>n.birthYear<=year).length
  const expected=120*((year-1989)/37)**2.2
  assert.ok(Math.abs(actual-expected)<=1.1)
}
for(const node of model.nodes)assert.ok(node.ringBirthYear>=1995)
for(const edge of model.edges){assert.ok(edge.delayYears>=0&&edge.delayYears<=1.5);assert.equal(edge.birthYear,Math.max(model.nodes[edge.a].birthYear,model.nodes[edge.b].birthYear)+edge.delayYears)}
const crosses=(a,b)=>{
  if(a.some(n=>b.includes(n)))return false
  const [p,q]=a.map(i=>model.nodes[i]),[r,s]=b.map(i=>model.nodes[i])
  const orient=(a,b,c)=>(b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x)
  return orient(p,q,r)*orient(p,q,s)<0&&orient(r,s,p)*orient(r,s,q)<0
}
for(const gap of model.gaps)for(const edge of model.edges){assert.ok(!(gap[0]===edge.a&&gap[1]===edge.b));assert.ok(!crosses(gap,[edge.a,edge.b]))}
const reached=new Set([0]);for(let i=0;i<120;i++)for(const e of model.edges)if(reached.has(e.a)||reached.has(e.b)){reached.add(e.a);reached.add(e.b)}assert.equal(reached.size,120)

const browser=await chromium.launch({executablePath:process.env.EKOMATCH_CHROME||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true})
const page=await browser.newPage({viewport:{width:1920,height:1080},reducedMotion:'no-preference'})
const errors=[];page.on('pageerror',error=>errors.push(error.message))
try{
  await page.clock.install({time:new Date('2026-01-01T00:00:00Z')})
  await page.clock.pauseAt(new Date('2026-01-01T00:00:00Z'))
  await page.goto(`${process.env.EKOMATCH_TEST_URL||'http://127.0.0.1:5173'}/#bugunku-bakis`)
  await page.locator('.perspective-network').waitFor()
  const snapshot=()=>page.evaluate(()=>({year:document.querySelector('.perspective-year-value')?.textContent,nodes:[...document.querySelectorAll('.perspective-network > .perspective-node')].filter(e=>+getComputedStyle(e).opacity>.99).length,lines:[...document.querySelectorAll('.perspective-existing line')].filter(e=>+getComputedStyle(e).opacity===1&&+e.getAttribute('stroke-dashoffset')===0).length,question:+getComputedStyle(document.querySelector('.perspective-emphasis')).opacity,legend:+getComputedStyle(document.querySelector('.perspective-legend')).opacity,running:document.querySelector('.deck-perspective').dataset.timelineRunning}))
  assert.equal((await snapshot()).year,'1989')
  assert.equal((await snapshot()).question,0)
  await page.clock.runFor(700);assert.equal((await snapshot()).year,'1989')
  const firstEdge=model.edges.map((edge,index)=>({index,start:(TIMELINE.delay+(edge.birthYear-TIMELINE.startYear)/37*TIMELINE.growth)*1000})).sort((a,b)=>a.start-b.start)[0]
  const midpoint=Math.ceil(firstEdge.start)+175
  const edgeLine=page.locator('.perspective-existing line').nth(firstEdge.index)
  await page.clock.runFor(midpoint-700)
  const halfway=+(await edgeLine.getAttribute('stroke-dashoffset'))
  assert.ok(halfway>.4&&halfway<.6,'edge should be halfway drawn after 0.175 seconds')
  await page.clock.runFor(225)
  assert.equal(+(await edgeLine.getAttribute('stroke-dashoffset')),0,'edge should finish drawing after 0.35 seconds')
  await page.clock.runFor(6800-midpoint-225)
  const half=await snapshot();assert.equal(half.year,'2007');assert.ok(half.nodes>=23&&half.nodes<=28);assert.equal(half.legend,0)
  await page.clock.runFor(6400)
  const hold=await snapshot();assert.equal(hold.year,'2026');assert.equal(hold.question,0)
  await page.clock.runFor(1200);const fade=await snapshot();assert.ok(fade.question>0&&fade.question<1)
  await page.clock.runFor(400);const end=await snapshot();assert.equal(end.nodes,120);assert.equal(end.lines,200);assert.equal(end.question,1);assert.equal(end.legend,1);assert.equal(end.running,'false')
  await page.evaluate(()=>{window.testGraph=document.querySelector('.perspective-network');window.testPoints=[...document.querySelectorAll('.perspective-network > .perspective-node')].map(e=>e.getAttribute('transform'));window.testRect=document.querySelector('.perspective-network').getBoundingClientRect().toJSON()})
  await page.keyboard.press('ArrowRight');assert.ok(page.url().endsWith('#yeni-bakis'))
  assert.equal(await page.locator('.perspective-year').count(),0)
  assert.equal(await page.locator('.perspective-timeline-label').count(),0)
  assert.ok(await page.evaluate(()=>testGraph===document.querySelector('.perspective-network')&&JSON.stringify(testPoints)===JSON.stringify([...document.querySelectorAll('.perspective-network > .perspective-node')].map(e=>e.getAttribute('transform')))&&JSON.stringify(testRect)===JSON.stringify(document.querySelector('.perspective-network').getBoundingClientRect().toJSON())))
  assert.equal(await page.locator('.perspective-gap line').count(),5)
  await page.keyboard.press('ArrowLeft');assert.equal((await snapshot()).running,'false');assert.equal((await snapshot()).year,'2026')
  await page.keyboard.press('ArrowLeft');assert.ok(page.url().endsWith('#problem'))
  await page.keyboard.press('ArrowRight');assert.equal((await snapshot()).year,'1989');assert.equal((await snapshot()).running,'true')
  await page.keyboard.press('ArrowRight');assert.ok(page.url().endsWith('#bugunku-bakis'));await page.waitForFunction(()=>document.querySelector('.perspective-year-value')?.textContent==='2026');assert.equal((await snapshot()).question,1)
  await page.keyboard.press('ArrowRight');assert.ok(page.url().endsWith('#yeni-bakis'))
  assert.equal(await page.locator('.perspective-gap line').first().evaluate(e=>getComputedStyle(e).animationName),'perspective-flow')
  await page.keyboard.press('ArrowLeft');await page.keyboard.press('n');assert.ok((await page.locator('.notes > p').textContent()).startsWith('Bu ağ temsilidir; ama gerçek bir gerçeği anlatır.'))
  assert.deepEqual(errors,[])
  console.log('Passed: deterministic 120-node/200-edge graph, growth curve, 18 business rings, noncrossing reserved gaps, 0.8/12/1.5/0.4s timeline, delayed question/legend, skip/replay/backward behavior and stationary shared SVG.')
}finally{await browser.close()}

import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'
import { scenes, finances } from '../src/data/deckData.ts'

const base = process.env.EKOMATCH_TEST_URL || 'http://127.0.0.1:5173'
const output = new URL('../test-results/', import.meta.url)
await mkdir(output, { recursive: true })
const browser = await chromium.launch({ executablePath: process.env.EKOMATCH_CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
const errors = [], layout = [], checks = []
page.on('pageerror', e => errors.push(e.message))
page.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`) })
await page.emulateMedia({ reducedMotion: 'reduce' })
async function goto(id) {
  await page.goto(`${base}/#${id}`)
  await page.locator('.deck-scene').waitFor()
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(350)
}
async function settled() { await page.waitForTimeout(480) }
function hash(id) { assert.equal(new URL(page.url()).hash, `#${id}`) }
try {
  assert.equal(scenes.length, 26)
  assert.equal(new Set(scenes.map(s => s.id)).size, 26)
  assert.equal(finances.pos + finances.financing, finances.total)
  assert.equal(finances.low, null)
  assert.equal(finances.high, null)
  for (const size of [[1920,1080],[1440,900],[1366,768],[1024,768],[768,1024],[375,812]]) {
    await page.setViewportSize({ width: size[0], height: size[1] })
    for (let i = 0; i < scenes.length; i++) {
      const slide = scenes[i]
      await goto(slide.id)
      assert.equal(await page.locator('.deck-scene').count(), 1)
      assert.equal(await page.locator('.deck-scene h1').textContent(), slide.title)
      assert.equal(await page.locator('img[alt="EkoMatch"]').count(), slide.id === 'final' ? 1 : 0)
      const measurement = await page.evaluate(() => {
        const scene = document.querySelector('.deck-scene')
        const text = [...scene.querySelectorAll('h1,h2,p,li,button,th,td,.map-readout,.deck-insight')]
        const bottomLimit = innerHeight - 72
        const bad = text.filter(e => !e.closest('dialog') && e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden').map(e => {
          const scroller = e.closest('.benchmark-scroll, .gantt, .relation-heatmap')
          const clipped = scroller && getComputedStyle(scroller).overflowX === 'auto' && scroller.getBoundingClientRect().right <= innerWidth
          return { text: e.textContent.slice(0,65), r: e.getBoundingClientRect().toJSON(), clipped }
        }).filter(e => (!e.clipped && (e.r.right > innerWidth + 2 || e.r.left < -2)) || (innerWidth >= 1000 && e.r.bottom > bottomLimit))
        return { scroll: scene.scrollHeight > scene.clientHeight + 2, bad }
      })
      if (measurement.bad.length) layout.push({ size, id: slide.id, ...measurement })
      if (size[0] === 1920) await page.screenshot({ path: fileURLToPath(new URL(`${String(i + 1).padStart(2,'0')}-${slide.id}.png`, output)) })
    }
    checks.push(`26 scenes: ${size.join('×')}`)
    console.log(checks.at(-1))
  }
  await page.setViewportSize({ width: 1440, height: 900 })
  await goto('acilis')
  await page.keyboard.press('ArrowLeft'); hash('acilis')
  await page.keyboard.press('ArrowRight'); await settled(); hash('problem')
  await page.keyboard.press('Space'); await settled(); hash('ekomatch-nedir')
  await page.keyboard.press('PageUp'); await settled(); hash('problem')
  await page.keyboard.press('End'); await settled(); hash('final')
  await page.keyboard.press('ArrowRight'); hash('final')
  await page.keyboard.press('Home'); await settled(); hash('acilis')
  checks.push('Keyboard, boundaries, Home / End, Space')

  await page.keyboard.press('o'); await page.locator('.overview').waitFor()
  await page.keyboard.press('ArrowRight'); hash('acilis')
  assert.equal(await page.locator('.overview__grid button').count(), 26)
  await page.keyboard.press('Escape'); await settled()
  await page.getByRole('button', { name: 'Sahne görünümü', exact: true }).click()
  await page.locator('.overview__grid button').filter({ hasText: 'B2B · Economic Twin' }).click()
  await settled(); hash('ekonomik-ikiz')
  await page.getByRole('button', { name: 'Sonraki adım', exact: true }).focus()
  await page.keyboard.press('Space'); await settled(); hash('ekonomik-ikiz')
  assert.match(await page.locator('.b2b-focus h2').textContent(), /Ekonomik ikizler/)
  for (let i = 0; i < 5; i++) await page.getByRole('button', { name: 'Sonraki adım', exact: true }).click()
  assert.equal(await page.getByRole('button', { name: 'Sonraki adım', exact: true }).isDisabled(), true)
  await page.getByRole('button', { name: 'Yeniden başlat', exact: true }).click()
  assert.match(await page.locator('.b2b-focus h2').textContent(), /Mobilya/)
  checks.push('Overview and B2B interactive flow / keyboard activation')

  await goto('beyaz-alan')
  await page.getByRole('columnheader', { name: 'Market', exact: true }).click()
  assert.match(await page.locator('.heatmap-explain').textContent(), /Market/)
  await goto('davranissal-ikiz')
  assert.equal(await page.locator('.turkey-map path').count(),81)
  await page.locator('select').selectOption('35')
  await page.locator('select').focus(); await page.keyboard.press('ArrowDown'); hash('davranissal-ikiz')
  await page.locator('select').selectOption('35')
  assert.match(await page.locator('.map-readout').textContent(), /İzmir/)
  await page.getByRole('button', { name: /İşyeri \/ POS White Space/ }).click()
  assert.match(await page.locator('.deck-insight').textContent(), /işyeri edinim/)
  await goto('guven')
  await page.getByRole('button', { name: 'İhtiyacı doğrula' }).click()
  assert.match(await page.locator('.validation-result').textContent(), /Tedarikçi A/)
  await page.getByRole('button', { name: 'Doğrulamayı geri al' }).click()
  assert.match(await page.locator('.validation-result').textContent(), /bekleniyor/)
  checks.push('Heatmap, 81-province map, B2C layers and reversible human validation')

  await goto('bankaya-katki')
  await page.getByRole('button', { name: 'Kötü', exact: true }).click()
  assert.match(await page.locator('.scenario-value').textContent(), /paylaşılmadı/)
  await page.getByRole('button', { name: 'Beklenen', exact: true }).click()
  assert.match(await page.locator('.scenario-value').textContent(), /400/)
  await page.getByRole('button', { name: 'Hesaplar ve varsayımlar' }).click()
  for (let i=1;i<=4;i++) {
    await page.getByRole('button', { name: `Ek ${i}`, exact:true }).click()
    assert.match(await page.locator('dialog h2').textContent(), new RegExp(`Ek ${i}`))
  }
  await page.keyboard.press('ArrowRight'); hash('bankaya-katki')
  await page.keyboard.press('Escape'); assert.equal(await page.locator('dialog').isVisible(), false)
  await page.keyboard.press('n'); await page.locator('.notes').waitFor()
  await page.keyboard.press('ArrowRight'); hash('bankaya-katki')
  await page.keyboard.press('Escape'); await settled()
  checks.push('Financial arithmetic, missing values, 4 appendix panels, notes and modal isolation')

  await goto('acilis'); await page.waitForTimeout(800)
  for (let i=0;i<12;i++) { await page.mouse.wheel(0,90); await page.waitForTimeout(80) }
  await settled(); hash('problem')
  await page.waitForTimeout(250); await page.mouse.wheel(0,80); await settled(); hash('ekomatch-nedir')
  checks.push('Trackpad gesture: single scene per continuous scroll')
  await page.getByRole('button', { name: 'Tam ekran', exact:true }).click(); await settled()
  assert.equal(await page.evaluate(() => Boolean(document.fullscreenElement)), true)
  await page.getByRole('button', { name: 'Tam ekrandan çık', exact:true }).click(); await settled()
  assert.equal(await page.evaluate(() => Boolean(document.fullscreenElement)), false)
  checks.push('Fullscreen enter / exit')

  await goto('acilis')
  await page.emulateMedia({ reducedMotion:'no-preference' })
  const perf = await page.evaluate(() => new Promise(resolve => {
    const gaps=[]; let last=performance.now(); const start=last
    function tick(now) { gaps.push(now-last); last=now; if(now-start<1500)requestAnimationFrame(tick); else resolve({ frames:gaps.length, p95:gaps.sort((a,b)=>a-b)[Math.floor(gaps.length*.95)], duration:now-start }) }
    requestAnimationFrame(tick)
  }))
  checks.push(`Headless animation sample: ${perf.frames} frames / ${Math.round(perf.duration)}ms; p95 ${Math.round(perf.p95)}ms (not physical projector validation)`)
  await page.emulateMedia({ reducedMotion:'reduce' })
  await page.route('**/*', route => new URL(route.request().url()).origin === new URL(base).origin ? route.continue() : route.abort())
  await goto('acilis')
  await page.keyboard.press('ArrowRight'); await settled(); hash('problem')
  await page.keyboard.press('End'); await settled(); hash('final')
  assert.equal(await page.locator('img[alt="EkoMatch"]').evaluate(img => img.complete && img.naturalWidth > 0), true)
  await page.locator('img[alt="EkoMatch"]').evaluate(img => img.decode())
  checks.push('External network blocked: local server, logo and fonts work without internet')
  assert.deepEqual(errors, [])
  await writeFile(new URL('audit.json',output), JSON.stringify({ checks, layout, errors },null,2))
  console.log(JSON.stringify({ checks:checks.length, layoutIssues:layout.length, errors },null,2))
  if(layout.length) process.exitCode=1
} finally {
  await writeFile(new URL('audit.json',output), JSON.stringify({ checks, layout, errors },null,2))
  await browser.close()
}

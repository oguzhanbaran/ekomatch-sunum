import { chromium } from 'playwright-core'
import assert from 'node:assert/strict'
const browser = await chromium.launch({ executablePath: process.env.EKOMATCH_CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
const base = process.env.EKOMATCH_TEST_URL || 'http://127.0.0.1:5173'
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  for (const [width, height] of [[1920,1080],[1440,900],[1366,768],[1024,768],[375,812]]) {
    await page.setViewportSize({ width, height })
    await page.goto(`${base}/?viewport=${width}#davranissal-ikiz`)
    await page.locator('.whitespace-profiles').waitFor()
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(200)
    for (const [layer, profiles] of [
      ['Müşteri', [['Müşteri A', 'Ev / yapı'], ['Müşteri B', 'Spor mağazaları'], ['Müşteri C', 'Kasap']]],
      ['İşyeri', [['Akaryakıt istasyonu', 'Elektrikli araç şarj ünitesi'], ['Mahalle fırını', 'Endüstriyel hamur yoğurma makinesi'], ['Yerel market', 'Self servis kasa']]],
    ]) {
      await page.getByRole('button', { name: new RegExp(`${layer} White Space`) }).click()
      assert.equal(await page.locator('.turkey-map').count(), 0)
      assert.equal(await page.locator('.whitespace-selectors button').count(), 3)
      for (const [name, gap] of profiles) {
        await page.getByRole('button', { name, exact: true }).click()
        assert.equal(await page.getByRole('button', { name, exact: true }).getAttribute('aria-pressed'), 'true')
        assert.ok((await page.locator('.whitespace-gaps').textContent()).includes(gap))
        const bad = await page.locator('.deck-scene').evaluate(el => [...el.querySelectorAll('h1,h2,h3,p,button,.whitespace-status')].filter(e => {
          const r = e.getBoundingClientRect()
          return r.right > innerWidth + 2 || r.left < 0 || (innerWidth >= 1000 && r.bottom > innerHeight - 72)
        }).map(e => e.textContent))
        assert.deepEqual(bad, [], `${width} ${name}`)
      }
      if (width === 1440) await page.screenshot({ path: `/tmp/whitespace-${layer}.png` })
    }
    await page.getByRole('button', { name: /Bölge White Space/ }).click()
    assert.equal(await page.locator('.turkey-map path').count(), 81)
    await page.locator('select').selectOption('35')
    assert.match(await page.locator('.map-readout').textContent(), /İzmir/)
    // Each layer remembers its own selection.
    await page.getByRole('button', { name: /Müşteri White Space/ }).click()
    assert.equal(await page.getByRole('button', { name: 'Müşteri C', exact: true }).getAttribute('aria-pressed'), 'true')
    await page.getByRole('button', { name: 'Müşteri B', exact: true }).focus()
    await page.keyboard.press('Space')
    assert.equal(await page.getByRole('button', { name: 'Müşteri B', exact: true }).getAttribute('aria-pressed'), 'true')
    assert.equal(new URL(page.url()).hash, '#davranissal-ikiz')
    console.log(`${width}×${height}: customer, business and region views passed`)
  }
  assert.deepEqual(errors, [])
} finally { await browser.close() }

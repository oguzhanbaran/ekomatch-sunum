import assert from 'node:assert/strict'
import { chromium } from 'playwright-core'
import { scenes } from '../src/data/deckData.ts'

const browser = await chromium.launch({ executablePath: process.env.EKOMATCH_CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const base = process.env.EKOMATCH_TEST_URL || 'http://127.0.0.1:5173'
const errors = []
page.on('pageerror', error => errors.push(error.message))
const opacity = () => page.locator('.perspective-gap').evaluateAll(groups => groups.map(g => Number(getComputedStyle(g).opacity)))
const go = async id => { await page.goto(`${base}/#${id}`); await page.locator('.deck-scene').waitFor(); await page.waitForTimeout(500) }
try {
  assert.equal(scenes.length, 23)
  assert.deepEqual(scenes.slice(0, 5).map(s => s.id), ['acilis', 'problem', 'bugunku-bakis', 'yeni-bakis', 'ekomatch-nedir'])
  assert.equal(scenes.at(-1).id, 'mevcut-durum')
  await go('problem')
  await page.keyboard.press('ArrowRight')
  await page.locator('.perspective-network').waitFor()
  await page.waitForTimeout(1500)
  assert.equal(new URL(page.url()).hash, '#bugunku-bakis')
  assert.equal(await page.locator('.perspective-existing line').count(), 55)
  assert.equal(await page.locator('.perspective-node').count(), 40)
  assert.equal(await page.locator('.perspective-business').count(), 6)
  assert.equal(await page.locator('.perspective-gap').count(), 0)
  assert.equal(await page.locator('.perspective-items li').count(), 3)
  assert.equal(await page.locator('.perspective-example').count(), 0)
  assert.match(await page.locator('.progress-meta').textContent(), /03 \/ 23/)
  await page.locator('.perspective-network').evaluate(el => { window.persistentNetwork = el })
  const bounds = await page.locator('.perspective-network').boundingBox()
  await page.keyboard.press('ArrowRight')
  await page.locator('.perspective-gap').first().waitFor({ state: 'attached' })
  assert.ok(await page.locator('.perspective-network').evaluate(el => el === window.persistentNetwork))
  assert.deepEqual(await page.locator('.perspective-network').boundingBox(), bounds)
  assert.deepEqual(await opacity(), [0, 0, 0, 0, 0])
  await page.waitForTimeout(760)
  const staged = await opacity()
  assert.ok(staged[0] > 0 && staged[2] === 0 && staged[4] === 0, String(staged))
  assert.ok(await page.locator('.perspective-existing').evaluate(el => Number(getComputedStyle(el).opacity) < .13))
  await page.waitForTimeout(1400)
  assert.deepEqual(await opacity(), [1, 1, 1, 1, 1])
  assert.equal(await page.locator('.perspective-example').count(), 1)
  const overlaps = await page.evaluate(() => {
    const existing = new Set([...document.querySelectorAll('.perspective-existing line')].map(el => `${el.dataset.from}-${el.dataset.to}`))
    return [...document.querySelectorAll('.perspective-gap line')].filter(el => existing.has(`${el.dataset.from}-${el.dataset.to}`)).length
  })
  assert.equal(overlaps, 0)
  await page.keyboard.press('ArrowLeft'); await page.waitForTimeout(500)
  assert.equal(await page.locator('.perspective-gap').count(), 0)
  await page.keyboard.press('ArrowRight')
  await page.locator('.perspective-gap').first().waitFor({ state: 'attached' })
  assert.deepEqual(await opacity(), [0, 0, 0, 0, 0])
  await page.keyboard.press('n')
  assert.match(await page.locator('.notes').textContent(), /Birbirine benzeyen müşteriler ve işletmeler/)
  await page.keyboard.press('Escape')
  await page.keyboard.press('End')
  await page.locator('.metrics-grid').waitFor()
  assert.equal(new URL(page.url()).hash, '#mevcut-durum')
  for (const value of ['~855', '~564', '458']) assert.ok((await page.locator('.metrics-grid').textContent()).includes(value))
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const [width, height] of [[1920,1080],[1440,900],[1366,768],[1024,768],[768,1024],[375,812]]) {
    await page.setViewportSize({ width, height })
    for (const id of ['bugunku-bakis', 'yeni-bakis']) {
      await go(id); await page.evaluate(() => document.fonts.ready)
      const layout = await page.locator('.perspective-copy').evaluate(el => {
        const h = el.querySelector('h1'), slot = el.parentElement.getBoundingClientRect(), layout = el.closest('.perspective-layout').getBoundingClientRect()
        return { titleLines: h.clientHeight / parseFloat(getComputedStyle(h).lineHeight), overflow: el.scrollWidth > el.clientWidth, columnRatio: slot.width / layout.width, bottom: el.getBoundingClientRect().bottom }
      })
      assert.ok(layout.titleLines < 2.1 && !layout.overflow, JSON.stringify({ width, id, layout }))
      if(width >= 768) assert.ok(Math.abs(layout.columnRatio - .42) < .001)
      if(width >= 1000) assert.ok(layout.bottom < height - 72)
    }
  }
  assert.deepEqual(errors, [])
  console.log('Slide order, progress, shared network, staggered gaps, replay, notes, appendix and responsive layout passed.')
} finally { await browser.close() }

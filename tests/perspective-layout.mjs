import assert from 'node:assert/strict'
import { chromium } from 'playwright-core'

const browser = await chromium.launch({ executablePath: process.env.EKOMATCH_CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
const page = await browser.newPage({ reducedMotion: 'reduce' })
const base = process.env.EKOMATCH_TEST_URL || 'http://127.0.0.1:5173'
const errors = []
page.on('pageerror', error => errors.push(error.message))

try {
  for (const viewport of [{width:1920,height:1080},{width:1366,height:768},{width:1024,height:768},{width:768,height:1024},{width:375,height:812}]) {
    await page.setViewportSize(viewport)
    let previous
    for (const id of ['bugunku-bakis', 'yeni-bakis']) {
      await page.goto(`${base}/#${id}`)
      await page.locator('.perspective-network').waitFor()
      await page.waitForTimeout(250)
      const layout = await page.evaluate(() => {
        const el = selector => document.querySelector(selector)
        const rect = selector => el(selector).getBoundingClientRect()
        const style = selector => getComputedStyle(el(selector))
        const scene = rect('.deck-scene'), scale = scene.width / 1920
        const copy = rect('.perspective-copy'), tag = rect('.perspective-fixed-tag'), net = rect('.perspective-network'), legend = rect('.perspective-legend')
        const bad = [...el('.perspective-copy').querySelectorAll('h1,p,h2')].filter(node => {
          const r = node.getBoundingClientRect()
          return r.left < scene.left - 1 || r.right > scene.right + 1 || r.top < scene.top - 1 || r.bottom > scene.bottom + 1 || node.scrollWidth > node.clientWidth + 2
        }).map(node => node.textContent)
        return {
          x: (copy.left - scene.left) / scale, width: copy.width / scale,
          center: (copy.top + copy.bottom) / 2, targetCenter: (tag.bottom + scene.bottom - 54 * scale) / 2,
          gap: (net.left - copy.right) / scale, legendGap: (legend.top - net.bottom) / scale,
          legendAlign: (legend.left - net.left) / scale,
          graph: [net.x,net.y,net.width,net.height], viewBox: el('.perspective-network').getAttribute('viewBox'),
          points: [...document.querySelectorAll('.perspective-network > .perspective-node')].map(node => node.getAttribute('transform')),
          heading: style('.perspective-copy h1').fontSize, paragraph: style('.perspective-description').fontSize,
          legendFont: style('.perspective-legend').fontSize, bad,
        }
      })
      assert.ok(Math.abs(layout.x - 180) < .1)
      assert.ok(Math.abs(layout.width - 760) < .1)
      assert.ok(Math.abs(layout.center - layout.targetCenter) < .1)
      assert.ok(layout.gap >= 100)
      assert.ok(Math.abs(layout.legendGap - 24) < .1)
      assert.ok(Math.abs(layout.legendAlign) < .1)
      assert.equal(layout.heading, '60px')
      assert.equal(layout.paragraph, '32px')
      assert.equal(layout.legendFont, '26px')
      assert.deepEqual(layout.bad, [])
      if (previous) {
        assert.deepEqual(layout.graph, previous.graph)
        assert.deepEqual(layout.points, previous.points)
        assert.equal(layout.viewBox, previous.viewBox)
      }
      previous = layout
    }
  }
  assert.equal(await page.locator('.perspective-items p').count(), 0)
  assert.equal(await page.locator('.perspective-potential-ring').count(), 10)
  assert.equal(await page.locator('.perspective-gap line').first().evaluate(el => getComputedStyle(el).stroke), 'rgb(10, 107, 92)')
  assert.equal(await page.locator('.perspective-gap line').first().evaluate(el => getComputedStyle(el).strokeWidth), '3px')
  assert.equal(await page.locator('.perspective-potential-ring').first().evaluate(el => getComputedStyle(el).opacity), '0.4')
  await page.keyboard.press('n')
  assert.ok((await page.locator('.notes').textContent()).includes('Benzerlerini buluyoruz: davranışı ve yapısı birbirine benzeyen'))
  assert.deepEqual(errors, [])
  console.log('Passed: matched graph geometry/nodes on five viewports, centered columns, typography, spacing, no overflow, endpoint rings and speaker note.')
} finally { await browser.close() }

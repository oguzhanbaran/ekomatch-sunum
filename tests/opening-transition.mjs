import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import { chromium } from 'playwright-core'

const base = process.env.EKOMATCH_TEST_URL || 'http://127.0.0.1:5173'
const browser = await chromium.launch({ executablePath: process.env.EKOMATCH_CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
const errors = []
page.on('pageerror', error => errors.push(error.message))

async function frame(time) {
  await page.locator('#voice').evaluate((audio, t) => { audio.pause(); audio.currentTime = t }, time)
  await page.waitForFunction(t => Math.abs(document.querySelector('#voice').currentTime - t) < .0001, time)
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
  return page.locator('#stage').evaluate(canvas => canvas.toDataURL())
}

try {
  const cues = JSON.parse(await fs.readFile('public/giris/cues.json', 'utf8'))
  assert.equal(cues.sahneler.find(s => s.id === 's10_gecis').t, 46.25)
  assert.equal(cues.sure, 47.05)
  await fs.mkdir('test-results/opening-transition', { recursive: true })
  await page.goto(`${base}/giris/index.html`)
  await page.waitForFunction(() => document.querySelector('#voice').src.startsWith('blob:') && document.querySelector('#voice').readyState >= 1)
  assert.equal(await page.locator('#voice').evaluate(audio => audio.duration), 47.05)
  await page.keyboard.press('d')
  await page.evaluate(() => {
    window.openingEvents = []; window.openingMessages = []
    addEventListener('animationEnded', () => openingEvents.push(document.querySelector('#voice').currentTime))
    addEventListener('message', event => { if (event.data?.type === 'animationEnded') openingMessages.push(document.querySelector('#voice').currentTime) })
  })
  await frame(46.25)
  await page.screenshot({ path: 'test-results/opening-transition/start.png' })
  const middle = await frame(46.65)
  await page.screenshot({ path: 'test-results/opening-transition/middle.png' })
  assert.match(await page.locator('#debug').textContent(), /s10_gecis/)
  await frame(46.95)
  assert.equal(await frame(46.65), middle, 'Backward seeking must reproduce identical pixels')
  await page.locator('#pause').click()
  await page.locator('#voice').evaluate(audio => audio.pause())
  await frame(47.049)
  assert.deepEqual(await page.evaluate(() => openingEvents), [])
  await frame(47.05)
  assert.deepEqual(await page.evaluate(() => openingEvents), [47.05])
  await page.waitForFunction(() => openingMessages.length === 1)
  assert.deepEqual(await page.evaluate(() => openingMessages), [47.05])
  assert.equal(await page.locator('.opening-controls').isVisible(), false)
  assert.match(await page.locator('#debug').textContent(), /s10_gecis/)
  const border = await page.locator('#stage').evaluate(canvas => {
    const ctx = canvas.getContext('2d')
    return [[10,10],[1910,10],[10,1070],[1910,1070],[960,100],[960,1000]].map(([x,y]) => [...ctx.getImageData(x,y,1,1).data])
  })
  assert.ok(border.every(pixel => JSON.stringify(pixel) === '[172,191,183,255]'))
  await page.keyboard.press('d')
  await page.screenshot({ path: 'test-results/opening-transition/final.png' })
  assert.equal(await frame(46.65), middle)
  await page.keyboard.press('s')
  await frame(44.5)
  assert.equal(await page.locator('#subtitle').evaluate(el => getComputedStyle(el).backgroundColor), 'rgba(2, 7, 10, 0.7)')
  assert.ok(await page.locator('#subtitle').textContent())
  await page.goto(`${base}/#acilis`)
  await page.locator('.deck-scene').waitFor()
  assert.equal(await page.locator('.deck-scene').evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(172, 191, 183)')
  assert.deepEqual(errors, [])
  console.log('Passed: exact 0.8s transition, repeatable seeking, 47.05s events, flat matching final background and dark subtitle band.')
} finally { await browser.close() }

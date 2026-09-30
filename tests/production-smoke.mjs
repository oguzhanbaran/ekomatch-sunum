import assert from 'node:assert/strict'
import { chromium } from 'playwright-core'
import { scenes } from '../src/data/deckData.ts'

const browser = await chromium.launch({ executablePath: process.env.EKOMATCH_CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 1024, height: 768 }, hasTouch: true, reducedMotion: 'reduce' })
const errors = []
page.on('pageerror', e => errors.push(e.message))
const base = process.env.EKOMATCH_PRODUCTION_URL || 'http://127.0.0.1:4173'
const settle = () => page.waitForTimeout(450)
try {
  await page.goto(base)
  await page.locator('#login-username').fill('finnovate')
  await page.locator('#login-password').fill('yanlis-parola')
  await page.getByRole('button', { name: 'Sunumu aç' }).click()
  assert.match(await page.locator('#login-error').textContent(), /hatalı/)
  await page.locator('#login-password').fill('fin12fin12.')
  await page.getByRole('button', { name: 'Sunumu aç' }).click()
  await page.locator('.deck-scene').waitFor()

  for (const scene of scenes) {
    await page.goto(`${base}/#${scene.id}`)
    await page.locator('.deck-scene h1').waitFor()
    await page.waitForFunction(title => document.querySelector('.deck-scene h1')?.textContent === title, scene.title)
    assert.equal(await page.locator('.deck-scene h1').textContent(), scene.title)
  }
  await page.goto(`${base}/#acilis`); await settle()
  const cdp = await page.context().newCDPSession(page)
  async function swipe(x1,y1,x2,y2) {
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x1,y:y1}]})
    await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x2,y:y2}]})
    await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})
    await settle()
  }
  await swipe(700,500,200,500)
  assert.equal(new URL(page.url()).hash,'#problem')
  await swipe(200,500,700,500)
  assert.equal(new URL(page.url()).hash,'#acilis')
  await swipe(700,500,700,300)
  assert.equal(new URL(page.url()).hash,'#acilis')
  await page.keyboard.press('End'); await settle()
  await page.getByRole('button',{name:'Sahne görünümü',exact:true}).click()
  await page.getByRole('button',{name:'Baştan başlat',exact:true}).click(); await settle()
  assert.equal(new URL(page.url()).hash,'#acilis')
  await page.keyboard.press('n'); await settle()
  await page.getByRole('button',{name:'Notları kapat'}).focus()
  await page.keyboard.press('Tab')
  assert.equal(await page.evaluate(()=>Boolean(document.activeElement?.closest('.notes'))),true)
  await page.keyboard.press('Escape'); await settle()
  await page.goto(`${base}/#ekonomik-dongu`); await settle()
  for(let i=0;i<8;i++)await page.getByRole('button',{name:'Döngüyü ilerlet'}).click()
  assert.equal(await page.locator('.loop-copy h2').textContent(),'Bölgesel talep sinyali')
  await page.goto(`${base}/#yol-haritasi`); await settle()
  await page.locator('.gantt-row').last().click()
  assert.equal(await page.locator('.gantt-row').last().getAttribute('aria-pressed'),'true')
  assert.deepEqual(errors,[])
  console.log('Production: 26 scenes, touch forward/back/vertical isolation, restart, focus trap, 8-step loop and Gantt selection passed. No runtime errors.')
} finally { await browser.close() }

import { chromium } from 'playwright-core'

const executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const browser = await chromium.launch({ executablePath, headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('pageerror', error => errors.push(error.message))
await page.emulateMedia({ reducedMotion: 'reduce' })

await page.goto('http://127.0.0.1:5173/#acilis')
await page.waitForSelector('.hero-copy h1')
await page.keyboard.press('ArrowRight')
await page.waitForTimeout(500)
if (!page.url().endsWith('#problem')) throw new Error('ArrowRight navigation failed')

await page.keyboard.press('ArrowLeft')
await page.waitForTimeout(500)
if (!page.url().endsWith('#acilis')) throw new Error('ArrowLeft navigation failed')

await page.keyboard.press('o')
await page.waitForSelector('.overview')
await page.getByRole('button', { name: /Demo/ }).click()
await page.waitForTimeout(500)
if (!page.url().endsWith('#demo')) throw new Error('Overview navigation failed')

await page.getByRole('button', { name: /B2B DEMO/ }).click()
await page.getByRole('button', { name: /Sonraki adım/ }).click()
const activeStages = await page.locator('.demo-stage.is-active').count()
if (activeStages !== 2) throw new Error('Interactive demo progression failed')

const sceneIds = ['acilis', 'problem', 'beyaz-alan', 'ekonomik-ikiz', 'iliski-deseni', 'insan-dogrulamasi', 'b2b-eslesme', 'davranissal-ikiz', 'mcc-yolculugu', 'musteri-beyaz-alani', 'bolgesel-talep', 'pos-arz', 'uc-beyaz-alan', 'ekonomik-dongu', 'ai-motoru', 'guven', 'benchmark', 'riskler', 'yol-haritasi', 'kurumsal-deger', 'demo', 'final']
for (const id of sceneIds) {
  await page.goto(`http://127.0.0.1:5173/#${id}`)
  await page.waitForSelector('.scene')
  const sceneCount = await page.locator('.scene').count()
  if (sceneCount !== 1) throw new Error(`Scene mount failed: ${id}`)
}
if (errors.length) throw new Error(`Runtime errors: ${errors.join('; ')}`)

await page.screenshot({ path: '/tmp/ekomatch-1440.png' })
await browser.close()
console.log('Presentation navigation, overview and demo interaction passed.')

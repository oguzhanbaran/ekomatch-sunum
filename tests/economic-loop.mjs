import assert from 'node:assert/strict'
import { chromium } from 'playwright-core'

const labels = ['Bölgesel talep sinyali', 'İşletme fırsatı', 'Şubeci doğrular', 'Tedarikçi alternatifleri', 'Reel ticaret', 'Finansman', 'Yeni veri', 'Model yeniden öğrenir']
const panels = [
  ['BİREY → BÖLGE', 'Bireysel sinyaller anonim toplanır; hangi kategoride talebin yoğunlaştığı görünür.'],
  ['BÖLGE → İŞLETME', 'Talebin yoğunlaştığı bölgede, talebi karşılayabilecek işletmeler belirlenir.'],
  ['İNSAN KARARI', 'Fırsat gerekçesiyle şubeye gelir; gerçek ihtiyacı şubeci doğrular.'],
  ['İŞLETME → TEDARİKÇİ', 'Doğrulanan ihtiyaç için bankanın müşterisi olan birden fazla tedarikçi sunulur.'],
  ['TİCARET', 'Taraflar ticareti kendi seçimleriyle kurar; banka tedarikçiyi garanti etmez.'],
  ['FİNANSMAN', 'Kurulan ticarete uygun finansman eşlik eder; kredi kararı bankada, insan onayıyla verilir.'],
  ['VERİ', 'Gerçekleşen ve gerçekleşmeyen her sonuç sisteme geri beslenir.'],
  ['ÖĞRENME', 'Sonuçlar benzerlik ve skorlama modellerini iyileştirir; döngü yeniden başlar.'],
]
const browser = await chromium.launch({ executablePath: process.env.EKOMATCH_CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
const page = await browser.newPage({ reducedMotion: 'reduce' })
const errors = []
page.on('pageerror', error => errors.push(error.message))
const base = process.env.EKOMATCH_TEST_URL || 'http://127.0.0.1:5173'
const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < .1, `${actual} should equal ${expected}`)
const selected = index => page.waitForFunction(index => {
  const button = document.querySelectorAll('.deck-loop > button')[index]
  return button?.getAttribute('aria-pressed') === 'true' && getComputedStyle(button).borderTopColor === 'rgb(0, 127, 120)'
}, index)

try {
  for (const viewport of [{ width: 1920, height: 1080 }, { width: 1366, height: 768 }, { width: 1024, height: 768 }, { width: 768, height: 1024 }, { width: 375, height: 812 }]) {
    await page.setViewportSize(viewport)
    await page.goto(`${base}/#ekonomik-dongu`)
    await page.locator('.deck-loop').waitFor()
    await page.locator('.deck-loop > button').first().click()
    await page.waitForTimeout(250)
    const layout = await page.evaluate(() => {
      const scene = document.querySelector('.deck-scene').getBoundingClientRect(), scale = scene.width / 1920
      const rect = element => {
        const r = element.getBoundingClientRect()
        return { x: (r.left - scene.left) / scale, y: (r.top - scene.top) / scale, width: r.width / scale, height: r.height / scale }
      }
      const style = selector => getComputedStyle(document.querySelector(selector))
      const diagram = rect(document.querySelector('.deck-loop'))
      const boxes = [...document.querySelectorAll('.deck-loop > button')].map(button => ({ ...rect(button), radius: parseFloat(getComputedStyle(button).borderRadius), lines: button.querySelectorAll('.loop-box-line').length }))
      const bad = []
      const walker = document.createTreeWalker(document.querySelector('.deck-scene'), NodeFilter.SHOW_TEXT)
      while (walker.nextNode()) {
        const node = walker.currentNode, parent = node.parentElement
        if (!node.textContent.trim() || parent.closest('svg')) continue
        const r = parent.getBoundingClientRect()
        if (parseFloat(getComputedStyle(parent).fontSize) < 26 || r.left < scene.left - 1 || r.right > scene.right + 1 || r.top < scene.top - 1 || r.bottom > scene.bottom + 1 || parent.scrollWidth > parent.clientWidth + 2) bad.push(node.textContent)
      }
      const arrows = [...document.querySelectorAll('.loop-arrow')].map(arrow => {
        const matrix = arrow.transform.baseVal.consolidate().matrix, bounds = arrow.getBBox()
        return { x: matrix.e, y: matrix.f, dx: matrix.a, dy: matrix.b, width: bounds.width, height: bounds.height, stroke: getComputedStyle(arrow).stroke, lineWidth: getComputedStyle(arrow).strokeWidth }
      })
      const icon = document.querySelector('.loop-human-icon')
      return { diagram, boxes, arrows, icon: { ...rect(icon), color: getComputedStyle(icon).color, strokes: [...icon.children].map(path => getComputedStyle(path).stroke) }, copy: rect(document.querySelector('.loop-copy')), heading: style('.deck-heading h1').fontSize, panelHeading: style('.loop-copy h2').fontSize, paragraph: style('.loop-copy p:not(.deck-tag)').fontSize, button: style('.loop-copy .deck-button').fontSize, center: style('.loop-center strong').fontSize, centerWeight: style('.loop-center strong').fontWeight, centerColor: style('.loop-center strong').color, bad }
    })
    near(layout.diagram.x, 264); near(layout.diagram.width, 870); near(layout.diagram.height, 620)
    near(layout.copy.x, 1186); near(layout.copy.width, 470)
    assert.deepEqual([layout.heading, layout.panelHeading, layout.paragraph, layout.button, layout.center, layout.centerWeight, layout.centerColor], ['60px', '36px', '30px', '28px', '40px', '700', 'rgb(19, 40, 59)'])
    assert.deepEqual(layout.bad, [])
    assert.equal(layout.boxes.length, 8)
    layout.boxes.forEach((box, index) => {
      near(box.width, 210); near(box.height, 80); near(box.radius, 12)
      const angle = index * Math.PI / 4 - Math.PI / 2
      near(box.x + box.width / 2 - layout.diagram.x, 435 + 330 * Math.cos(angle))
      near(box.y + box.height / 2 - layout.diagram.y, 310 + 270 * Math.sin(angle))
      assert.ok(box.lines <= 2)
    })
    // Exact distance between rounded rectangles: their inset cores plus corner radii.
    for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) {
      const a = layout.boxes[i], b = layout.boxes[j], r = a.radius + b.radius
      const dx = Math.max(0, a.x + a.radius - (b.x + b.width - b.radius), b.x + b.radius - (a.x + a.width - a.radius))
      const dy = Math.max(0, a.y + a.radius - (b.y + b.height - b.radius), b.y + b.radius - (a.y + a.height - a.radius))
      assert.ok(Math.hypot(dx, dy) - r >= 24, 'rounded box outlines need at least 24px separation')
    }
    assert.equal(layout.arrows.length, 8)
    layout.arrows.forEach((arrow, index) => {
      const angle = index * Math.PI / 4 - Math.PI / 2 + Math.PI / 8
      near(arrow.x, 435 + 330 * Math.cos(angle)); near(arrow.y, 310 + 270 * Math.sin(angle))
      assert.ok(arrow.dx * (-330 * Math.sin(angle)) + arrow.dy * (270 * Math.cos(angle)) > 0, 'arrow must point clockwise')
      assert.deepEqual([arrow.width, arrow.height, arrow.stroke, arrow.lineWidth], [14, 14, 'rgb(10, 107, 92)', '2px'])
    })
    assert.equal(await page.locator('.deck-loop > svg circle').count(), 0)
    assert.equal(await page.locator('.deck-loop mask rect').count(), 9)
    assert.equal(await page.locator('.loop-human-icon').count(), 1)
    assert.equal(await page.locator('.deck-loop > button').nth(2).locator('.lucide-user-check').count(), 1)
    near(layout.icon.width, 28); near(layout.icon.height, 28)
    assert.ok(layout.icon.x + layout.icon.width < layout.boxes[2].x)
    near(layout.icon.y + layout.icon.height / 2, layout.boxes[2].y + layout.boxes[2].height / 2)
    assert.equal(layout.icon.color, 'rgb(10, 107, 92)')
    assert.ok(layout.icon.strokes.every(stroke => stroke === 'rgb(10, 107, 92)'))
    assert.equal(await page.locator('.deck-heading .deck-tag').textContent(), '02 / ÇÖZÜM & MİMARİ')
    assert.equal(await page.locator('.topbar__chapter').textContent(), '08Ekonomik Döngü')
    for (let index = 0; index < 8; index++) {
      await page.locator('.deck-loop > button').nth(index).click(); await selected(index)
      assert.equal(await page.locator('.deck-loop > button').nth(index).getAttribute('aria-label'), `${index + 1}. ${labels[index]}`)
      assert.equal(await page.locator('.loop-copy h2').textContent(), labels[index])
      assert.equal(await page.locator('.loop-copy .deck-tag').textContent(), panels[index][0])
      assert.equal(await page.locator('.loop-copy p:not(.deck-tag)').textContent(), panels[index][1])
      assert.equal(await page.locator('.deck-loop > button.active').evaluate(button => getComputedStyle(button).borderTopColor), 'rgb(0, 127, 120)')
      const panelOverflow = await page.locator('.loop-copy').evaluate(panel => {
        const diagram = document.querySelector('.deck-loop').getBoundingClientRect()
        return [...panel.children].filter(child => {
          const r = child.getBoundingClientRect(), style = getComputedStyle(child)
          return parseFloat(style.fontSize) < 26 || child.scrollWidth > child.clientWidth + 2 || r.top < diagram.top - 1 || r.bottom > diagram.bottom + 1
        }).map(child => child.textContent)
      })
      assert.deepEqual(panelOverflow, [])
      assert.equal(/POS|B2[BC]/.test(await page.locator('.deck-scene').innerText()), false)
    }
  }
  await page.keyboard.press('n')
  await page.locator('.notes').waitFor()
  assert.equal(/POS/.test(await page.locator('.notes').innerText()), false)
  await page.keyboard.press('Escape')
  await page.locator('.notes').waitFor({ state: 'hidden' })
  await page.locator('.deck-loop > button').first().click()
  for (let index = 1; index < 8; index++) { await page.keyboard.press('ArrowRight'); await selected(index); assert.ok(page.url().endsWith('#ekonomik-dongu')) }
  await page.keyboard.press('ArrowLeft'); await selected(6)
  await page.locator('.loop-copy .deck-button').click(); await selected(7)
  await page.keyboard.press('ArrowRight'); await page.waitForURL('**/#teknoloji')
  await page.keyboard.press('ArrowLeft'); await selected(0)
  await page.locator('.deck-loop > button').last().click(); await selected(7)
  await page.locator('.loop-copy .deck-button').click(); await page.waitForURL('**/#teknoloji')
  assert.deepEqual(errors, [])
  console.log('Passed: eight updated steps and panels, no POS in slide or notes, 28px human-decision icon, unchanged ellipse/boxes/arrows/eyebrow/pill, labels >=26px, no overflow at five viewports, selection and button/keyboard progression to next slide.')
} finally { await browser.close() }

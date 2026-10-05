import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import { chromium } from 'playwright-core'
import { scenes } from '../src/data/deckData.ts'
const browser = await chromium.launch({executablePath: process.env.EKOMATCH_CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless:true})
const page = await browser.newPage({viewport:{width:1920,height:1080}, reducedMotion:'reduce'})
const errors=[]; page.on('pageerror', e=>errors.push(e.message))
const base=process.env.EKOMATCH_TEST_URL || 'http://127.0.0.1:5173'
await fs.mkdir('test-results/projection',{recursive:true})
const report=[]
async function inspect(id, screenshot=false) {
 await page.goto(`${base}/#${id}`); await page.locator('.deck-scene').waitFor(); await page.evaluate(()=>document.fonts.ready); await page.waitForTimeout(250)
 return await measure(id,screenshot)
}
async function measure(id,screenshot=false) {
 const result=await page.locator('.deck-scene').evaluate(scene=>{
  const bounds=scene.getBoundingClientRect(), scale=bounds.width/1920
  const issues=[]
  for(const el of scene.querySelectorAll('*')){
   if(el.closest('dialog') || !el.getClientRects().length) continue
   const style=getComputedStyle(el), rect=el.getBoundingClientRect()
   const text=[...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())
   if(!text || style.display==='none' || style.visibility==='hidden') continue
   const name=el.textContent.trim().slice(0,90)
   // The two perspective legends deliberately use smaller secondary labels.
   const minimum=el.closest('.deck-perspective .perspective-legend')?22:26
   if(parseFloat(style.fontSize)<minimum) issues.push({type:'small',name,size:style.fontSize})
   if(rect.left<bounds.left-1 || rect.right>bounds.right+1 || rect.top<bounds.top-1 || rect.bottom>bounds.bottom+1) issues.push({type:'outside',name,rect:{x:(rect.x-bounds.x)/scale,y:(rect.y-bounds.y)/scale,w:rect.width/scale,h:rect.height/scale}})
   if(el.scrollWidth>el.clientWidth+3 && el.clientWidth>0) issues.push({type:'overflow',name,width:el.clientWidth,scroll:el.scrollWidth})
  }
  const leaves=[...scene.querySelectorAll('*')].filter(el=>!el.closest('dialog,svg')&&el.getClientRects().length&&[...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))
  for(let i=0;i<leaves.length;i++) for(let j=i+1;j<leaves.length;j++) {
   const a=leaves[i],b=leaves[j];if(a.contains(b)||b.contains(a))continue
   const ra=document.createRange(),rb=document.createRange();ra.selectNodeContents(a);rb.selectNodeContents(b)
   const overlap=[...ra.getClientRects()].some(x=>[...rb.getClientRects()].some(y=>Math.min(x.right,y.right)-Math.max(x.left,y.left)>3*scale&&Math.min(x.bottom,y.bottom)-Math.max(x.top,y.top)>3*scale))
   if(overlap)issues.push({type:'overlap',name:a.textContent.trim().slice(0,70),other:b.textContent.trim().slice(0,70)})
  }
  return {background:getComputedStyle(scene).backgroundColor,ratio:bounds.width/bounds.height,issues}
 })
 report.push({id,viewport:page.viewportSize(),...result})
 if(screenshot) await page.screenshot({path:`test-results/projection/${id}.png`})
 return result
}
try {
 for(const slide of scenes) await inspect(slide.id,true)
 // Check every interactive customer/business example and the map.
 await page.goto(`${base}/#davranissal-ikiz`); await page.locator('.space-layers').waitFor()
 for(const layer of [0,1,2]) {
  await page.locator('.space-layers button').nth(layer).click()
  for(let profile=0;profile<(layer===1?1:3);profile++) {
   if(layer!==1) await page.locator('.whitespace-selectors button').nth(profile).click()
   await page.waitForTimeout(100)
   await measure(`b2c-${layer}-${profile}`)
   await page.screenshot({path:`test-results/projection/b2c-${layer}-${profile}.png`})
  }
 }
 for(const viewport of [{width:1366,height:768},{width:1024,height:768},{width:768,height:1024},{width:375,height:812}]) {
  await page.setViewportSize(viewport)
  for(const slide of scenes) await inspect(slide.id)
 }
 await page.setViewportSize({width:1920,height:1080})
 await page.goto(`${base}/#swot`); await page.locator('.deck-swot').waitFor()
 assert.equal(await page.locator('.projection-toggle').count(),0)
 await page.waitForTimeout(2700); assert.equal(await page.locator('.topbar').isVisible(),false)
 await page.keyboard.press('c'); assert.equal(await page.locator('.topbar').isVisible(),true)
 await page.keyboard.press('p'); assert.equal(await page.locator('.deck-scene').evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(172, 191, 183)')
 await page.keyboard.press('ArrowRight'); await page.waitForTimeout(300)
 assert.equal(new URL(page.url()).hash,'#ekonomik-katki')
 await page.keyboard.press('f'); await page.waitForTimeout(100); assert.ok(await page.evaluate(()=>Boolean(document.fullscreenElement)))
 await page.keyboard.press('f')
 await page.keyboard.press('n'); await page.locator('.notes').waitFor(); await page.keyboard.press('Escape')
 await page.keyboard.press('o'); await page.locator('.overview').waitFor(); await page.keyboard.press('Escape')
 await fs.writeFile('test-results/projection/audit.json',JSON.stringify({errors,report},null,2))
 console.log(JSON.stringify({errors,issues:report.filter(r=>r.issues.length)},null,2))
 assert.equal(errors.length,0)
 assert.ok(report.every(r=>r.background==='rgb(172, 191, 183)' && Math.abs(r.ratio-16/9)<.001 && r.issues.length===0))
} finally {await browser.close()}

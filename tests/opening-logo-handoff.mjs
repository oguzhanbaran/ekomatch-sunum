import assert from 'node:assert/strict'
import { chromium } from 'playwright-core'

const browser=await chromium.launch({executablePath:process.env.EKOMATCH_CHROME||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true})
const page=await browser.newPage()
const errors=[]
page.on('pageerror',error=>errors.push(error.message))
const base=process.env.EKOMATCH_TEST_URL||'http://127.0.0.1:5173'
try {
  for(const viewport of [{width:1920,height:1080},{width:1366,height:768},{width:1024,height:768},{width:375,height:812}]) {
    await page.setViewportSize(viewport)
    await page.goto(`${base}/?logoHandoff=${viewport.width}`)
    const opening=page.frameLocator('.opening-sequence iframe')
    await opening.locator('#voice').waitFor({state:'attached'})
    const frame=page.frames().find(frame=>frame.url().includes('/giris/index.html'))
    await frame.waitForFunction(()=>document.querySelector('#voice').src.startsWith('blob:')&&document.querySelector('#voice').readyState>=1)
    await page.locator('.deck-cover-brand img').evaluate(image=>image.decode())
    await frame.evaluate(()=>{const audio=document.querySelector('#voice');audio.pause();audio.currentTime=47.05})
    await page.waitForTimeout(150)
    const match=await frame.evaluate(async()=>{
      const actual=document.querySelector('#stage'),cover=parent.document.querySelector('.deck-cover-brand img'),rect=cover.getBoundingClientRect()
      const expected=document.createElement('canvas');expected.width=actual.width;expected.height=actual.height
      const ctx=expected.getContext('2d'),dpr=actual.width/innerWidth
      ctx.fillStyle='#ACBFB7';ctx.fillRect(0,0,expected.width,expected.height)
      ctx.scale(dpr,dpr);ctx.drawImage(cover,rect.x,rect.y,rect.width,rect.height)
      const a=actual.getContext('2d').getImageData(0,0,actual.width,actual.height).data,b=ctx.getImageData(0,0,expected.width,expected.height).data
      let bad=0,max=0
      for(let i=0;i<a.length;i+=4){let delta=Math.max(Math.abs(a[i]-b[i]),Math.abs(a[i+1]-b[i+1]),Math.abs(a[i+2]-b[i+2]));max=Math.max(max,delta);if(delta>2)bad++}
      return{bad,max,total:actual.width*actual.height}
    })
    assert.ok(match.bad/match.total<.00005,`Final logo must match the cover's image, position and size: ${JSON.stringify(match)}`)
    await frame.evaluate(()=>{document.querySelector('#voice').currentTime=46.65})
    await page.waitForTimeout(50)
    const middle=await opening.locator('#stage').evaluate(c=>c.toDataURL())
    await frame.evaluate(()=>{document.querySelector('#voice').currentTime=46.9})
    await page.waitForTimeout(50)
    await frame.evaluate(()=>{document.querySelector('#voice').currentTime=46.65})
    await page.waitForTimeout(50)
    assert.equal(await opening.locator('#stage').evaluate(c=>c.toDataURL()),middle)
  }
  assert.deepEqual(errors,[])
  console.log('Passed: final logo matches actual cover image/position/size at four viewports; intermediate motion repeats exactly after seeking.')
}finally{await browser.close()}

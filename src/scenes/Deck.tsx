import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Minus, X, ScanSearch, UserCheck, Handshake, Banknote, Database, Layers, Network, BrainCircuit, ShieldCheck, Monitor, ChevronRight, RotateCcw, History, User, Users, Store, Package, PackageCheck, Activity, Radar, Link, Landmark, type LucideIcon } from 'lucide-react'
import { EkoMark, ktLogoUrl, archiLogoUrl } from '../components/Brand'
import { EconomicNetwork } from '../components/Network'
import { PerspectiveSlides } from '../components/PerspectiveSlides'
import * as data from '../data/deckData'
import provinces from '../data/provinces.json'
import { impactScenarios, impactNumber } from '../data/impactModel'

const miniLogoUrl = new URL('../../logo-mini.png', import.meta.url).href
const b2bStepImages = [
  new URL('../../Pics/Slide8/Company.png', import.meta.url).href,
  new URL('../../Pics/Slide8/Similarity.png', import.meta.url).href,
  new URL('../../Pics/Slide8/History.png', import.meta.url).href,
  new URL('../../Pics/Slide8/Oppurtinity.png', import.meta.url).href,
  new URL('../../Pics/Slide8/Employee.png', import.meta.url).href,
  new URL('../../Pics/Slide8/Supplier.png', import.meta.url).href,
  new URL('../../Pics/Slide8/Product.png', import.meta.url).href,
]

function Tag({ children }: { children: ReactNode }) { return <p className="deck-tag">{children}</p> }
function Insight({ children, warning = false }: { children: ReactNode; warning?: boolean }) { return <div className={`deck-insight ${warning ? 'is-warning' : ''}`}>{children}</div> }
function Steps({ items, active, select, icons, humanDecisionAt, productAt }: { items: string[]; active?: number; select?: (i: number) => void; icons?: LucideIcon[]; humanDecisionAt?: number; productAt?: number }) {
  return <ol className="deck-steps">{items.map((item, i) => {
    const Icon = icons?.[i]
    const number = <span className="step-number">{String(i + 1).padStart(2, '0')}</span>
    const arrow = i < items.length - 1 ? <ArrowRight aria-hidden="true" /> : null
    const content = <>{Icon ? <div className="step-top"><span className="step-icon-wrap" aria-hidden="true"><Icon size={34} strokeWidth={1.5} /></span>{arrow}</div> : number}{Icon ? <div className="step-label-row"><strong>{item}</strong>{productAt === i && <span className="step-product-label">ürün burada</span>}{humanDecisionAt === i && <span className="step-human-decision"><ShieldCheck className="step-human-icon" size={18} strokeWidth={1.5} aria-hidden="true" /><span>insan kararı</span></span>}</div> : <strong>{item}</strong>}</>
    return <li key={item} className={active === i ? 'selected' : ''}>{select ? <button onClick={() => select(i)} aria-pressed={active === i}>{content}</button> : content}{!Icon && arrow}</li>
  })}</ol>
}

function Heatmap() {
  const [selected, setSelected] = useState(3)
  const categories = ['Market', 'Ulaşım', 'Restoran', 'Yapı market', 'Ev / yaşam']
  return <><div className="heatmap-layout"><div className="relation-heatmap" role="table" aria-label="Temsili benzer müşteri kategori ilişkileri"><div role="row" className="heatmap-row"><span role="columnheader">Müşteri</span>{categories.map((cat, c) => <button role="columnheader" key={cat} onClick={() => setSelected(c)} aria-pressed={selected === c}>{cat}</button>)}</div>{Array.from({ length: 6 }, (_, r) => <div role="row" className={`heatmap-row ${r === 5 ? 'target-row' : ''}`} key={r}><strong role="rowheader">{r === 5 ? 'Bu müşteri' : `Benzer ${r + 1}`}</strong>{categories.map((cat, c) => { const missing = r === 5 && c === selected; const exists = r === 5 ? !missing : (r + c) % 4 !== 0; return <span role="cell" className={`heat-cell ${missing ? 'missing' : exists ? 'present' : 'absent'}`} key={cat} aria-label={`${cat}: ${missing ? 'potansiyel ilişki' : exists ? 'ilişki var' : 'ilişki yok'}`}>{missing ? '?' : exists ? <Check /> : <Minus />}</span> })}</div>)}</div><div className="heatmap-explain"><Tag>EKONOMİK BOŞLUK</Tag><h2>Benzerlerimde var,<br /><em>bende yok.</em></h2><p><strong>{categories[selected]}</strong> ilişkisi bu müşteride henüz oluşmamış.</p><p className="deck-source">Kategoriyi seçerek boş alanı inceleyin. Veriler temsilidir.</p></div></div><Insight warning>Boşluk kesin ihtiyaç değil; doğrulama gerektiren potansiyel sinyaldir.</Insight></>
}

function B2B() {
  const [step, setStep] = useState(0)
  const stepImage = b2bStepImages[step]
  return <><Steps items={data.b2bSteps} active={step} select={setStep} /><div className="b2b-focus" aria-live="polite"><div className={`b2b-focus-visual${stepImage ? ' has-image' : ''}`}>{stepImage ? <img src={stepImage} width="1254" height="1254" alt={`${data.b2bStory[step][0]} aşamasını temsil eden görsel`} /> : <span className="focus-number">{String(step + 1).padStart(2, '0')}</span>}</div><div><Tag>TEMSİLİ ÖRNEK · MOBİLYA ATÖLYESİ</Tag><h2>{data.b2bStory[step][0]}</h2><p>{data.b2bStory[step][1]}</p></div><div className="deck-action-column"><button className="deck-button" onClick={() => setStep(s => Math.min(6, s + 1))} disabled={step === 6}>Sonraki adım <ChevronRight /></button><button className="deck-button secondary" onClick={() => setStep(0)}><RotateCcw /> Yeniden başlat</button></div></div><Insight>AI keşfeder, insan doğrular. Tedarikçi eşleşmesi banka garantisi değildir.</Insight></>
}

const provinceNames = ['Adana','Adıyaman','Afyonkarahisar','Ağrı','Amasya','Ankara','Antalya','Artvin','Aydın','Balıkesir','Bilecik','Bingöl','Bitlis','Bolu','Burdur','Bursa','Çanakkale','Çankırı','Çorum','Denizli','Diyarbakır','Edirne','Elazığ','Erzincan','Erzurum','Eskişehir','Gaziantep','Giresun','Gümüşhane','Hakkâri','Hatay','Isparta','Mersin','İstanbul','İzmir','Kars','Kastamonu','Kayseri','Kırklareli','Kırşehir','Kocaeli','Konya','Kütahya','Malatya','Manisa','Kahramanmaraş','Mardin','Muğla','Muş','Nevşehir','Niğde','Ordu','Rize','Sakarya','Samsun','Siirt','Sinop','Sivas','Tekirdağ','Tokat','Trabzon','Tunceli','Şanlıurfa','Uşak','Van','Yozgat','Zonguldak','Aksaray','Bayburt','Karaman','Kırıkkale','Batman','Şırnak','Bartın','Ardahan','Iğdır','Yalova','Karabük','Kilis','Osmaniye','Düzce']
function SparseNetworkMarker({ province }: { province: typeof provinces[number] }) {
  const ring = province.rings[0]
  let area = 0, x = 0, y = 0
  ring.forEach((a, i) => {
    const b = ring[(i + 1) % ring.length], cross = a[0] * b[1] - b[0] * a[1]
    area += cross; x += (a[0] + b[0]) * cross; y += (a[1] + b[1]) * cross
  })
  // Keep the marker's outer diameter at 22px within the 380px-high map artwork.
  return <g transform={`translate(${x / (3 * area)} ${y / (3 * area)}) scale(${425 / 380})`} data-province={province.code}>
    <circle className="map-sparse-marker" r="9.5" />
  </g>
}

function B2C() {
  const [layer, setLayer] = useState(0)
  const reduced = useReducedMotion()
  const lowCoverage = [6, 16, 35]
  const insights = ['Yapı market, bu müşteri için potansiyel bir fırsat alanı.', 'Bireysel veri bankada kalır; yalnızca anonim toplam görünür.', 'Şubemiz doğrular; bankanın müşterisi üreticileri alternatif olarak sunar.']
  const gaps = layer === 0 ? [['Yapı market', "Benzer 100 müşterinin 38'inde var."]] : [['Tedarikçi Finansmanı', "Benzer 40 işletmenin 26'sında var."], ['Finansal kiralama', "Benzer 40 işletmenin 17'sinde var."]]
  return <div className="chain-example">
    <div className="b2c-layout">
      <div className="space-layers">{data.b2cLayers.map(([title, desc], i) => <button key={title} aria-pressed={layer === i} onClick={() => setLayer(i)}><span>0{i + 1}</span><div><h2>{title}</h2><p>{desc}</p></div></button>)}</div>
      <motion.div key={layer} className="chain-panel" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : .3 }}>
        {layer === 1 ? <div className="turkey-map"><div className="map-heading"><Tag>TEMSİLİ TALEP · TİCARİ AĞ</Tag></div><svg viewBox="0 0 970 425" role="img" aria-label="Talep ve ticari ağ haritası; Bursa, Ankara ve İzmir'de ticari ağ seyrek">{[...provinces].sort((a, b) => Number(lowCoverage.includes(a.code)) - Number(lowCoverage.includes(b.code))).map(p => <path key={p.code} d={p.rings.map(r => `M${r.map(pt => pt.join(',')).join('L')}Z`).join('')} className={`${p.code === 16 ? 'selected' : [6,16,27,34,35,41,42,54].includes(p.code) ? 'high' : p.code % 3 === 0 ? 'medium' : 'low'}${lowCoverage.includes(p.code) ? ' low-coverage' : ''}`}><title>{provinceNames[p.code - 1]}</title></path>)}{provinces.filter(p => lowCoverage.includes(p.code)).map(p => <SparseNetworkMarker key={p.code} province={p} />)}</svg><div className="map-readout">Dönüşüm bölgelerinde talep yüksek · ticari ağ seyrek</div><div className="map-legend"><span>Talep:</span><span><i className="demand-low" />düşük</span><span><i className="demand-medium" />orta</span><span><i className="demand-high" />yüksek</span><span className="coverage-key"><i className="demand-low-coverage" />ticari ağ seyrek</span></div></div> : <div className="whitespace-profiles">
          <Tag>{layer === 0 ? 'TEMSİLİ MÜŞTERİ · KATEGORİ BOŞLUĞU' : 'TEMSİLİ İŞLETME · FİNANSMAN BOŞLUĞU'}</Tag>
          <div className="chain-identity">{layer === 0 ? <User size={28} aria-hidden="true" /> : <Store size={28} aria-hidden="true" />}<span>{layer === 0 ? 'Müşteri A' : 'Yapı market zinciri'}</span></div>
          <div className="whitespace-existing"><span>{layer === 0 ? 'Mevcut: ✓ Market  ✓ Akaryakıt  ✓ Giyim' : 'Mevcut: ✓ Ticari hesap  ✓ İşletme finansmanı'}</span></div>
          <div className="chain-panel-bottom"><div className="whitespace-gaps">{gaps.map(([name, detail]) => <div className="chain-gap" key={name}><div><h3>{name}</h3><span>Henüz yok</span></div><p>{detail}</p></div>)}</div>
            {layer === 0 && <p className="chain-category-limit">Yalnızca işyeri kategorisi; ürün ya da neden çıkarılmaz.</p>}
          </div>
        </div>}
      </motion.div>
    </div>
    <Insight>{insights[layer]}</Insight>
  </div>
}

function Flywheel() {
  const [active, setActive] = useState(0)
  const maskId = useId()
  const labels = ['Talep Sinyali', 'Fırsat', 'Kullanıcı', 'Tedarikçi', 'Ticaret', 'Finansman', 'Veri', 'Model Eğitimi']
  const pointAt = (angle: number) => ({ x: 435 + 330 * Math.cos(angle), y: 310 + 270 * Math.sin(angle) })
  const points = data.loop.map((_, i) => pointAt(i * Math.PI / 4 - Math.PI / 2))
  const advance = () => {
    if (active < data.loop.length - 1) setActive(active + 1)
    else window.dispatchEvent(new Event('ekomatch:next-slide'))
  }
  return <div className="loop-layout">
    <div className="deck-loop">
      <svg viewBox="0 0 870 620" aria-hidden="true">
        <defs><mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="870" height="620"><rect width="870" height="620" fill="white" />{points.map(({ x, y }, i) => <rect key={i} x={x - 109} y={y - 44} width="218" height="88" rx="16" fill="black" />)}</mask></defs>
        <ellipse className="loop-track" cx="435" cy="310" rx="330" ry="270" mask={`url(#${maskId})`} />
        {points.map((_, i) => {
          const angle = i * Math.PI / 4 - Math.PI / 2 + Math.PI / 8
          const { x, y } = pointAt(angle)
          const rotation = Math.atan2(270 * Math.cos(angle), -330 * Math.sin(angle)) * 180 / Math.PI
          return <path key={i} className="loop-arrow" d="M-7 -7L7 0L-7 7" transform={`translate(${x} ${y}) rotate(${rotation})`} />
        })}
      </svg>
      <div className="loop-center"><span>TEK</span><strong>EKONOMİK AĞ</strong></div>
      {data.loop.map((label, i) => <button key={label} className={active === i ? 'active' : ''} style={{ left: points[i].x, top: points[i].y }} onClick={() => setActive(i)} aria-label={`${i + 1}. ${labels[i]}`} aria-pressed={active === i}>{i === 2 && <UserCheck className="loop-human-icon" size={28} aria-hidden="true" />}<span className="loop-box-label"><span className="loop-box-line">{labels[i]}</span></span></button>)}
    </div>
    <div className="loop-copy"><h2>{labels[active]}</h2><p>{data.loopDetails[active].description}</p><button className="deck-button secondary" onClick={advance}>Döngüyü ilerlet <ArrowRight /></button></div>
  </div>
}

function Architecture() {
  return <><div className="architecture-five">{data.architecture.map(([name, desc], i) => <div key={name}><span className="deck-number">0{i + 1}</span><h2>{name}</h2><p>{desc}</p></div>)}</div><Insight><strong>LLM hesap yapmaz, açıklar.</strong> Skorlar, doğrulamadan geçen ML modellerinden ve tanımlı hesap kurallarından gelir.</Insight><div className="principle-row"><span>Açıklanabilirlik</span><span>Tasarımda gizlilik</span><span>İnsan kontrolü</span></div></>
}

function Privacy() {
  const [validated, setValidated] = useState(false)
  return <><div className="privacy-layout"><div className="branch-preview"><div className="branch-top"><Monitor /><strong>Şube fırsat ekranı</strong><span>Temsili MVP</span></div><Tag>MOBİLYA ATÖLYESİ</Tag><h2>Kereste tedariki</h2><p><strong>Neden?</strong> Benzer şirket grubunda tekrar eden tedarik ve finansman ilişkisi.</p><div className="confidence"><span>Güven skoru · temsili</span><strong>82 / 100</strong></div><button className="deck-button" onClick={() => setValidated(v => !v)}>{validated ? <Check /> : <UserCheck />}{validated ? 'Doğrulamayı geri al' : 'İhtiyacı doğrula'}</button><p className="validation-result" aria-live="polite">{validated ? 'İhtiyaç doğrulandı. Tedarikçi A · B · C alternatifleri açıldı.' : 'Tedarikçi alternatifleri için müşteri görüşmesi bekleniyor.'}</p></div><div className="privacy-route"><div><Database /><h2>Bireysel kart verisi</h2><p>Banka içinde kalır.</p></div><div className="privacy-gate"><ShieldCheck /><h2>Anonimleştirme + minimum örneklem</h2><p>Veri yönetişimi kapısı</p></div><div><Network /><h2>İşletmeye ulaşan</h2><p>Yalnızca toplulaştırılmış bölgesel sinyal.</p></div></div></div></>
}

function GateDiamond() {
  return <svg className="gantt-gate-diamond" viewBox="0 0 22 22" width="22" height="22" aria-hidden="true"><path d="M11 0L22 11L11 22L0 11Z" /></svg>
}

function Roadmap({ detailed = false }: { detailed?: boolean }) {
  const [selected, setSelected] = useState<number | null>(null)
  const phases = detailed ? data.detailedPhases : data.phases
  const gates = [{ month: 4, label: 'Veri / gizlilik' }, { month: 8, label: 'Model doğrulama' }, { month: 12, label: 'Ölçekleme' }]
  return <>
    <div className="gantt">
      <div className="gantt-head"><strong>İş paketi</strong><div>{Array.from({ length: 12 }, (_, i) => <span key={i}>{i + 1}</span>)}</div><strong>Çıktı</strong></div>
      <div className="gantt-rows">
        <div className="gantt-gate-lines" aria-hidden="true"><div className="gantt-gate-track">{gates.map(gate => <i key={gate.month} style={{ left: `${gate.month / 12 * 100}%` }} />)}</div></div>
        {phases.map((p, i) => <button className={`gantt-row ${selected === i ? 'selected' : ''}`} key={p.name} onClick={() => setSelected(i)} aria-pressed={selected === i}><span>{p.name}</span><div className="gantt-track"><i style={{ gridColumn: `${p.start} / ${p.end + 1}` }}>{p.start}–{p.end}. ay</i></div><strong>{p.output}</strong></button>)}
      </div>
    </div>
    <div className="gantt-decision-gates"><div className="gantt-gate-track">{gates.map(gate => <div key={gate.month} className="gantt-decision-gate" style={{ left: `${gate.month / 12 * 100}%` }}><GateDiamond /><strong>Ay {gate.month}</strong><span>{gate.label}</span></div>)}</div></div>
    {detailed && <p className="gantt-gate-legend"><GateDiamond />Karar kapısı: devam / durdur</p>}
    {!detailed && <div className="gantt-footer"><p className="gantt-gate-legend"><GateDiamond />Karar kapısı: devam / durdur</p></div>}
  </>
}

function Pilot() {
  return <><div className="pilot-layout"><div className="pilot-funnel">{[['Fırsat','Doğrulama / fırsat'],['Doğrulama','Eşleşme / doğrulama'],['Eşleşme','İşlem / eşleşme'],['İşlem','Artımsal hacim']].map(([name, ratio], i) => <div key={name} style={{ marginInline: `${i * 5}%` }}><strong>{name}</strong><span>{ratio}</span></div>)}</div><div className="pilot-groups"><div><Tag>TEST ŞUBELERİ</Tag><h2>EkoMatch ile</h2><p>Önce → sonra</p></div><div><Tag>KONTROL ŞUBELERİ</Tag><h2>Mevcut akış</h2><p>Önce → sonra</p></div><Insight>Değişimlerin farkı → artımsal etki</Insight></div></div><div className="pilot-kpis">{['Yeni ekonomik ilişki', 'Artımsal ticaret hacmi', 'Finansman hacmi', 'Şube kullanım oranı'].map(k => <strong key={k}>{k}</strong>)}</div></>
}

function Resources() {
  const total = data.costBreakdown.reduce((sum, item) => sum + item.cost, 0)
  const radius = 125 - 20.8 / 2
  const halfGap = 3 / radius / 2
  const pointAt = (angle: number) => ({ x: 125 + radius * Math.sin(angle), y: 125 - radius * Math.cos(angle) })
  const formatDecimal = (value: number) => value.toFixed(1).replace('.', ',')
  let angle = 0
  const segments = data.costBreakdown.map(item => {
    const sweep = item.cost / total * Math.PI * 2
    const start = pointAt(angle + halfGap)
    const end = pointAt(angle + sweep - halfGap)
    angle += sweep
    return { ...item, path: `M${start.x} ${start.y}A${radius} ${radius} 0 ${sweep - halfGap * 2 > Math.PI ? 1 : 0} 1 ${end.x} ${end.y}` }
  })
  return <div className="resources-layout">
    <div>
      <div className="resource-total"><strong>13</strong><span>kişilik ekip</span></div>
      <div className="team-list">{data.team.map(item => <div key={item.role}><span>{item.role}</span><span>{item.people} kişi · {formatDecimal(item.cost)} M TL</span></div>)}</div>
    </div>
    <div>
      <div className="resource-total"><strong>~45</strong><span>milyon TL</span></div>
      <div className="cost-unallocated">
        <div className="resource-ring"><svg viewBox="0 0 250 250" role="img" aria-label={`Maliyet dağılımı: ${data.costBreakdown.map(item => `${item.name} %${formatDecimal(item.cost / total * 100)}`).join(', ')}`}>{segments.map(item => <path key={item.name} d={item.path} stroke={item.color} />)}</svg><span>12 ay</span></div>
        <ul>{data.costBreakdown.map(item => <li key={item.name}><span className="resource-cost-label"><i style={{ background: item.color }} aria-hidden="true" />{item.name}</span><span className="resource-cost-value">{item.cost} M TL</span></li>)}</ul>
      </div>
      <p className="deck-source">Kıdemli fintech kaynak seviyesi; rakamlar gösterge niteliğindedir.</p>
    </div>
  </div>
}

function Benchmark() {
  return <><div className="benchmark-scroll"><table className="deck-benchmark"><thead><tr><th scope="col">Özellik</th>{data.benchmarkColumns.map(c => <th scope="col" key={c}>{c}</th>)}</tr></thead><tbody>{data.benchmarkRows.map(r => <tr key={r.label}><th scope="row">{r.label}</th>{r.values.map((v, i) => <td key={i} className={`level-${v}`}><span aria-label={['Yok', 'Kısmi', 'Var'][v]}>{v === 2 ? <Check /> : v === 1 ? <Minus /> : <X />}</span></td>)}</tr>)}</tbody></table></div><div className="benchmark-legend"><span><Check /> Var</span><span><Minus /> Kısmi</span><span><X /> Yok</span></div><p className="deck-source">Kavramsal kategori karşılaştırması; ürün bazında değişebilir. EkoMatch: önerilen kapsam.</p></>
}

function Positioning() {
  return <div className="position-layout"><div className="position-y">Ekonomik ilişki odaklı ↑</div><div className="position-grid"><div><Network /><h2>Ağ analitiği</h2><p>Mevcut ilişkileri gösterir.</p></div><div className="position-highlight"><ScanSearch /><h2>EkoMatch</h2><p>Yeni ekonomik ilişkiyi keşfeder.</p></div><div><h2>Kampanya motoru</h2><p>Ürün ve teklif odağı</p></div><div><h2>CRM / ürün önerisi</h2><p>Yeni banka ürünü ilişkisi</p></div></div><div className="position-x"><span>Mevcut ilişki</span><ArrowRight /><span>Yeni ilişki keşfi</span></div><p className="deck-source">Kavramsal konumlandırma · alt sıra ürün, üst sıra ekonomik ilişki odaklıdır.</p></div>
}

function Revenue() {
  const ceiling = 3000
  return <div className="impact-slide">
    <div className="impact-main">
      <div className="impact-chart">
        <p className="impact-chart-title">Yıllık brüt gelir <span>· milyon TL</span></p>
        <div className="impact-legend">{impactScenarios.map(s => <span key={s.label}><i style={{ background: s.color }} />{s.label}</span>)}</div>
        <svg viewBox="0 0 730 360" role="img" aria-label={impactScenarios.map(s => `${s.label}: ${s.years.map((y, i) => `Yıl ${i + 1}: ${impactNumber(y.revenue)} milyon TL`).join(', ')}`).join('. ')}>
          {[1000, 2000, 3000].map(value => <g key={value}><line x1="78" x2="722" y1={310 - value / ceiling * 264} y2={310 - value / ceiling * 264} stroke="#13283B" strokeOpacity=".2" /><text x="65" y={318 - value / ceiling * 264} textAnchor="end" fontSize="26" fill="#2F3F4D">{impactNumber(value)}</text></g>)}
          {[0, 1, 2].map(year => <g key={year}>
            {impactScenarios.map((s, index) => { const height = s.years[year].revenue / ceiling * 264; const x = 110 + year * 215 + index * 88; return <g key={s.label}><rect x={x} y={310 - height} width="70" height={height} rx="5" fill={s.color} /><text x={x + 35} y={298 - height} textAnchor="middle" fontSize="28" fontWeight="600" fill="#13283B">{impactNumber(s.years[year].revenue)}</text></g> })}
            <text x={189 + year * 215} y="352" textAnchor="middle" fontSize="30" fill="#13283B">Yıl {year + 1}</text>
          </g>)}
        </svg>
      </div>
      <div className="impact-totals">{impactScenarios.map(s => <article key={s.label} style={{ borderColor: s.color }}>
        <h2><i style={{ background: s.color }} />{s.label}</h2>
        <p>3 yılda toplam brüt gelir</p>
        <strong>{impactNumber(s.total / 1000, 2)} <span>milyar TL</span></strong>
      </article>)}</div>
    </div>
    <Insight>Katılım bankacılığı: önce reel ekonomik ilişki, sonra finansman.</Insight>
  </div>
}

function FourStepProcess() {
  const icons = [ScanSearch, UserCheck, Handshake, Banknote]
  const descriptions = [
    'Benzerlerinin geçmişinden öğrenir, henüz kurulmamış ilişkileri bulur.',
    'Fırsat gerekçesiyle şubeciye gelir; gerçek ihtiyacı şubeci doğrular.',
    'Uygun alternatifler sunulur; seçimi taraflar yapar.',
    'Kurulan ticarete uygun finansman eşlik eder.',
  ]
  return <>
    <div className="definition-grid">{data.definition.map((name, i) => {
      const Icon = icons[i]
      return <div key={name} className="definition-step">
        <Icon /><h2>{name}</h2><p className="definition-description">{descriptions[i]}</p>
        {i < data.definition.length - 1 && <ChevronRight className="definition-flow-arrow" aria-hidden="true" />}
      </div>
    })}</div>
    <p className="definition-outcome">Yapay zekâ bulur ve açıklar; kredi ve ticari kararlar her zaman insanda.</p>
  </>
}

function SlideBody({ kind }: { kind: string }) {
  switch (kind) {
    case 'definition': return <FourStepProcess />
    case 'metrics': return <><div className="metrics-grid">{data.metrics.map(([value, unit, label]) => <div key={label}><strong>{value}</strong><span>{unit}</span><p>{label}</p></div>)}</div><Insight>Boşluk küçük değil: harcama bizde başlıyor, başka bankada bitiyor.</Insight><p className="deck-source">Kaynak: BKM 2025–2026 kart verileri, Kuveyt Türk kurumsal tanıtım (Aralık 2025).</p></>
    case 'heatmap': return <Heatmap />
    case 'comparison': return <><div className="approach-row old"><Tag>MEVCUT YAKLAŞIM</Tag><Steps items={['Müşterinin geçmişi', 'Segment', 'Ürün / kampanya', 'Ürün kullanılır']} icons={[History, Users, Package, PackageCheck]} productAt={2} /></div><div className="approach-row new"><Tag>EKOMATCH</Tag><Steps items={['Benzerlerin geçmişi', 'Fırsat keşfi', 'Şubeci doğrular', 'Arz eşleşir', 'Yeni ticaret', 'Ürün / finansman']} icons={[Activity, Radar, UserCheck, Link, Handshake, Landmark]} humanDecisionAt={2} productAt={5} /></div><p className="deck-source">Fark: mevcut yaklaşımda ürün hedeftir; EkoMatch'te ürün, kurulan ilişkinin sonucudur.</p></>
    case 'b2b': return <B2B />
    case 'b2c': return <B2C />
    case 'flywheel': return <Flywheel />
    case 'architecture': return <Architecture />
    case 'privacy': return <Privacy />
    case 'stack': return <><div className="stack-grid">{data.stack.map(([name, desc], i) => { const Icon = [Database, Layers, Network, BrainCircuit, ShieldCheck, Monitor][i]; return <div key={name}><Icon /><h2>{name}</h2><p>{desc}</p></div> })}</div><p className="deck-source">Önerilen teknoloji seçenekleri · entegrasyon ve altyapı kararları banka içinde netleştirilir.</p></>
    case 'roadmap': return <Roadmap />
    case 'roadmap-detail': return <Roadmap detailed />
    case 'pilot': return <Pilot />
    case 'resources': return <Resources />
    case 'benchmark': return <Benchmark />
    case 'positioning': return <Positioning />
    case 'swot': return <div className="deck-swot">{data.swot.map(([name, items], i) => <div key={name}><span className="deck-number">0{i + 1}</span><h2>{name}</h2><ul>{items.map(t => <li key={t}>{t}</li>)}</ul></div>)}</div>
    case 'risks': return <div className="deck-risks">{data.risks.map(([name, text], i) => <div key={name}><span className="deck-number">0{i + 1}</span><h2>{name}</h2><ArrowRight /><p>{text}</p></div>)}</div>
    case 'revenue': return <Revenue />
    case 'strategy': return <><div className="partner-strategies">
      <section className="partner-strategy-group" aria-label="Kuveyt Türk stratejileri">
        <div className="strategy-brand"><span className="slide-partner-mark is-kt"><img src={ktLogoUrl} alt="Kuveyt Türk" draggable={false} /></span></div>
        <ul className="partner-strategy-list">{data.strategies.map(([name]) => <li key={name}>{name}</li>)}</ul>
      </section>
      <section className="partner-strategy-group architecht-strategies" aria-label="Architecht stratejileri">
        <div className="strategy-brand"><span className="slide-partner-mark is-archi"><img src={archiLogoUrl} alt="Architecht" draggable={false} /></span></div>
        <ul className="partner-strategy-list">{data.architechtStrategies.map(text => <li key={text}>{text}</li>)}</ul>
      </section>
    </div></>
    default: return null
  }
}

export function DeckScene({ index, direction = 'forward' }: { index: number; direction?: 'forward' | 'backward' }) {
  const slide = data.scenes[index]
  const detailedRoadmap = slide.kind === 'roadmap-detail'
  const reduced = useReducedMotion()
  const root = useRef<HTMLElement>(null)
  useEffect(() => { root.current?.focus({ preventScroll: true }) }, [index])
  if (slide.kind === 'perspective') return <PerspectiveSlides slide={slide} direction={direction} />
  if (slide.kind === 'definition') return <section ref={root} tabIndex={-1} className="scene deck-scene deck-kind-definition" aria-label={slide.shortTitle}>
    <header className="definition-header"><Tag>{slide.eyebrow}</Tag></header>
    <div className="definition-process-content"><h1>{slide.title}</h1><SlideBody kind={slide.kind} /></div>
  </section>
  if (slide.kind === 'comparison') return <section ref={root} tabIndex={-1} className="scene deck-scene deck-kind-comparison" aria-label={slide.shortTitle}>
    <header className="comparison-header"><Tag>{slide.eyebrow}</Tag></header>
    <div className="comparison-content"><h1>{slide.title}</h1><SlideBody kind={slide.kind} /></div>
  </section>
  if (slide.kind === 'cover' || slide.kind === 'final' || slide.kind === 'divider') {
    const ease = [0.22, 1, 0.36, 1] as const
    return <section ref={root} tabIndex={-1} className={`scene deck-scene deck-${slide.kind}`} aria-label={slide.shortTitle}>{slide.kind === 'final' ? <motion.div className="final-network-layer" initial={false} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : 1.1, ease }}><EconomicNetwork rich className="deck-background-network" /></motion.div> : <EconomicNetwork className="deck-background-network" />}<div className="deck-veil" /><div className={`deck-center ${slide.kind === 'final' ? 'final-composition' : ''}`}>
      {slide.kind === 'final' ? <><motion.div className="final-logo" initial={false} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : .78, duration: reduced ? 0 : .8, ease }}><EkoMark /></motion.div><motion.h1 initial={false} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : .18, duration: reduced ? 0 : .75, ease }}>{slide.title}</motion.h1><motion.p className="deck-slogan" initial={false} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : 1.12, duration: reduced ? 0 : .65, ease }}>Talebi keşfet. Arzla buluştur.<br /><strong>Ekonomik ağı büyüt.</strong></motion.p></> : slide.kind === 'cover' ? <><div className="deck-cover-brand"><EkoMark /></div><h1>{slide.title}</h1><p className="deck-slogan">Talebi keşfet. Arzla buluştur.<br /><strong>Ekonomik ağı büyüt.</strong></p><div className="deck-cover-logos" aria-label="Proje paydaşları"><span className="deck-partner-slot is-kt"><img className="deck-cover-partner is-kt" src={ktLogoUrl} alt="Kuveyt Türk" draggable={false} /></span><span className="deck-partner-slot is-archi"><img className="deck-cover-partner is-archi" src={archiLogoUrl} alt="Archi Tech" draggable={false} /></span></div></> : <><span className="chapter-number">{slide.eyebrow.slice(-2)}</span><Tag>{slide.chapter}</Tag><h1>{slide.title}</h1><div className="chapter-line" /><img className="chapter-logo" src={miniLogoUrl} width="112" height="112" alt="EkoMatch sembolü" draggable={false} /></>}
    </div></section>
  }
  return <section ref={root} tabIndex={-1} className={`scene deck-scene deck-kind-${detailedRoadmap ? 'roadmap' : slide.kind}${detailedRoadmap ? ' roadmap-detailed' : ''}`} aria-label={slide.shortTitle}><header className="deck-heading"><Tag>{slide.eyebrow}</Tag><h1>{slide.title}</h1></header><motion.div className="deck-body" initial={false} animate={{ opacity: 1 }} transition={{ duration: .3 }}><SlideBody kind={slide.kind} /></motion.div></section>
}

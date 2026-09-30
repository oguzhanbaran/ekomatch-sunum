import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Minus, X, ScanSearch, UserCheck, Handshake, Banknote, Database, Layers, Network, BrainCircuit, ShieldCheck, Monitor, ChevronRight, RotateCcw, BookOpen, User, Package, Megaphone, Unlink, Activity, Radar, Link, Landmark, type LucideIcon } from 'lucide-react'
import { EkoMark } from '../components/Brand'
import { EconomicNetwork } from '../components/Network'
import * as data from '../data/deckData'
import provinces from '../data/provinces.json'

const miniLogoUrl = new URL('../../logo-mini.png', import.meta.url).href
const ktLogoUrl = new URL('../../kt-logo.png', import.meta.url).href
const archiLogoUrl = new URL('../../archi-logo.png', import.meta.url).href

function Tag({ children }: { children: ReactNode }) { return <p className="deck-tag">{children}</p> }
function Insight({ children, warning = false }: { children: ReactNode; warning?: boolean }) { return <div className={`deck-insight ${warning ? 'is-warning' : ''}`}>{children}</div> }
function Steps({ items, active, select, icons, humanDecisionAt }: { items: string[]; active?: number; select?: (i: number) => void; icons?: LucideIcon[]; humanDecisionAt?: number }) {
  return <ol className="deck-steps">{items.map((item, i) => {
    const Icon = icons?.[i]
    const number = <span className="step-number">{String(i + 1).padStart(2, '0')}</span>
    const arrow = i < items.length - 1 ? <ArrowRight aria-hidden="true" /> : null
    const content = <>{Icon ? <div className="step-top"><span className="step-icon-wrap" aria-hidden="true"><Icon size={30} strokeWidth={1.5} /></span></div> : number}{Icon ? <div className="step-label-row"><strong>{item}{humanDecisionAt === i && <ShieldCheck className="step-human-icon" size={18} strokeWidth={1.5} aria-label="İnsan kararı" />}</strong>{arrow}</div> : <strong>{item}</strong>}</>
    return <li key={item} className={active === i ? 'selected' : ''}>{select ? <button onClick={() => select(i)} aria-pressed={active === i}>{content}</button> : content}{!Icon && arrow}</li>
  })}</ol>
}

function Appendix() {
  const ref = useRef<HTMLDialogElement>(null)
  const [tab, setTab] = useState(0)
  return <><button className="deck-button secondary" onClick={() => ref.current?.showModal()}><BookOpen /> Hesaplar ve varsayımlar</button><dialog ref={ref} className="deck-dialog" aria-label="Finansal hesap ekleri"><button className="dialog-close" aria-label="Ekleri kapat" onClick={() => ref.current?.close()}><X /></button><Tag>SORU GELİRSE · EK 1–4</Tag><div className="deck-tabs">{data.appendices.map((a, i) => <button key={a.title} aria-pressed={tab === i} onClick={() => setTab(i)}>Ek {i + 1}</button>)}</div><h2>{data.appendices[tab].title}</h2><ul>{data.appendices[tab].body.map(t => <li key={t}>{t}</li>)}</ul><p className="deck-source">Kaynak: sağlanan sunum metni. Eksik hesap ekleri için teyit alanlarıdır.</p></dialog></>
}

function Heatmap() {
  const [selected, setSelected] = useState(3)
  const categories = ['Market', 'Ulaşım', 'Restoran', 'Kasap', 'Ev / yaşam']
  return <><div className="heatmap-layout"><div className="relation-heatmap" role="table" aria-label="Temsili benzer müşteri kategori ilişkileri"><div role="row" className="heatmap-row"><span role="columnheader">Müşteri</span>{categories.map((cat, c) => <button role="columnheader" key={cat} onClick={() => setSelected(c)} aria-pressed={selected === c}>{cat}</button>)}</div>{Array.from({ length: 6 }, (_, r) => <div role="row" className={`heatmap-row ${r === 5 ? 'target-row' : ''}`} key={r}><strong role="rowheader">{r === 5 ? 'Bu müşteri' : `Benzer ${r + 1}`}</strong>{categories.map((cat, c) => { const missing = r === 5 && c === selected; const exists = r === 5 ? !missing : (r + c) % 4 !== 0; return <span role="cell" className={`heat-cell ${missing ? 'missing' : exists ? 'present' : 'absent'}`} key={cat} aria-label={`${cat}: ${missing ? 'potansiyel ilişki' : exists ? 'ilişki var' : 'ilişki yok'}`}>{missing ? '?' : exists ? <Check /> : <Minus />}</span> })}</div>)}</div><div className="heatmap-explain"><Tag>ECONOMIC WHITE SPACE</Tag><h2>Benzerlerimde var,<br /><em>bende yok.</em></h2><p><strong>{categories[selected]}</strong> ilişkisi bu müşteride henüz oluşmamış.</p><p className="deck-source">Kategoriyi seçerek boş alanı inceleyin. Veriler temsilidir.</p></div></div><Insight warning>White Space kesin ihtiyaç değil; doğrulama gerektiren potansiyel sinyaldir.</Insight></>
}

function B2B() {
  const [step, setStep] = useState(0)
  return <><Steps items={data.b2bSteps} active={step} select={setStep} /><div className="b2b-focus" aria-live="polite"><div className="focus-number">{String(step + 1).padStart(2, '0')}</div><div><Tag>TEMSİLİ ÖRNEK · MOBİLYA ATÖLYESİ</Tag><h2>{data.b2bStory[step][0]}</h2><p>{data.b2bStory[step][1]}</p></div><div className="deck-action-column"><button className="deck-button" onClick={() => setStep(s => Math.min(6, s + 1))} disabled={step === 6}>Sonraki adım <ChevronRight /></button><button className="deck-button secondary" onClick={() => setStep(0)}><RotateCcw /> Yeniden başlat</button></div></div><Insight>AI keşfeder, insan doğrular. Tedarikçi eşleşmesi banka garantisi değildir.</Insight></>
}

const provinceNames = ['Adana','Adıyaman','Afyonkarahisar','Ağrı','Amasya','Ankara','Antalya','Artvin','Aydın','Balıkesir','Bilecik','Bingöl','Bitlis','Bolu','Burdur','Bursa','Çanakkale','Çankırı','Çorum','Denizli','Diyarbakır','Edirne','Elazığ','Erzincan','Erzurum','Eskişehir','Gaziantep','Giresun','Gümüşhane','Hakkâri','Hatay','Isparta','Mersin','İstanbul','İzmir','Kars','Kastamonu','Kayseri','Kırklareli','Kırşehir','Kocaeli','Konya','Kütahya','Malatya','Manisa','Kahramanmaraş','Mardin','Muğla','Muş','Nevşehir','Niğde','Ordu','Rize','Sakarya','Samsun','Siirt','Sinop','Sivas','Tekirdağ','Tokat','Trabzon','Tunceli','Şanlıurfa','Uşak','Van','Yozgat','Zonguldak','Aksaray','Bayburt','Karaman','Kırıkkale','Batman','Şırnak','Bartın','Ardahan','Iğdır','Yalova','Karabük','Kilis','Osmaniye','Düzce']
function B2C() {
  const [province, setProvince] = useState(16)
  const [layer, setLayer] = useState(0)
  const high = [6,16,27,34,35,41,42,54].includes(province)
  return <><div className="b2c-layout"><div className="space-layers">{data.b2cLayers.map(([title, desc], i) => <button key={title} aria-pressed={layer === i} onClick={() => setLayer(i)}><span>0{i + 1}</span><div><h2>{title} White Space</h2><p>{desc}</p></div></button>)}</div><div className="turkey-map"><div className="map-heading"><Tag>TEMSİLİ TALEP / POS AÇIĞI</Tag><label>İl <select value={province} onChange={e => setProvince(Number(e.target.value))}>{provinceNames.map((n, i) => <option value={i + 1} key={n}>{n}</option>)}</select></label></div><svg viewBox="0 0 970 425" role="img" aria-label="81 ilde temsili talep ve POS kapsama açığı haritası">{provinces.map(p => <path key={p.code} d={p.rings.map(r => `M${r.map(pt => pt.join(',')).join('L')}Z`).join('')} className={p.code === province ? 'selected' : [6,16,27,34,35,41,42,54].includes(p.code) ? 'high' : p.code % 3 === 0 ? 'medium' : 'low'} onClick={() => setProvince(p.code)}><title>{provinceNames[p.code - 1]} · temsili sinyal</title></path>)}</svg><div className="map-readout" aria-live="polite"><strong>{provinceNames[province - 1]}</strong><span>{high ? 'Talep yüksek · POS kapsaması düşük' : 'Talep / POS dengesi izleniyor'}</span></div><div className="map-legend"><span>◻ Düşük açık</span><span>▧ Orta açık</span><span>■ Yüksek açık</span></div></div></div><Insight>{['Kasap örneği: benzer müşteri grubunda kategori ilişkisi var; müşteride yok.', 'Kasap örneği: tekil davranışlar açılmaz; yeterli örneklemle bölgesel sinyal üretilir.', 'Kasap örneği: banka POS kapsaması zayıfsa işyeri edinim fırsatı değerlendirilir.'][layer]}</Insight><p className="deck-source">MCC ürünü değil, işyeri kategorisini gösterir. Harita: OCHA / HDX; ekonomik sinyaller temsilidir.</p></>
}

function Flywheel() {
  const [active, setActive] = useState(0)
  return <><div className="loop-layout"><div className="deck-loop"><svg viewBox="0 0 600 600" aria-hidden="true"><circle cx="300" cy="300" r="218" /><path d="M300 82 A218 218 0 0 1 518 300" /><path d="M504 282l14 18 14-18" /></svg><div className="loop-center"><span>TEK</span><strong>EKONOMİK<br />AĞ</strong></div>{data.loop.map((label, i) => <button key={label} className={active === i ? 'active' : ''} style={{ left: `${50 + Math.cos((i * 45 - 90) * Math.PI / 180) * 40}%`, top: `${50 + Math.sin((i * 45 - 90) * Math.PI / 180) * 40}%` }} onClick={() => setActive(i)} aria-pressed={active === i}><span>{i + 1}</span>{label}</button>)}</div><div className="loop-copy"><Tag>{active < 3 ? 'B2C → BÖLGE' : active < 6 ? 'B2B → TİCARET' : 'VERİ → ÖĞRENME'}</Tag><h2>{data.loop[active]}</h2><p>B2C talebin yönünü, B2B bu talebi karşılayacak işletmeleri görünür kılar.</p><button className="deck-button secondary" onClick={() => setActive(a => (a + 1) % 8)}>Döngüyü ilerlet <ArrowRight /></button></div></div></>
}

function Architecture() {
  return <><div className="architecture-five">{data.architecture.map(([name, desc], i) => <div key={name}><span className="deck-number">0{i + 1}</span><h2>{name}</h2><p>{desc}</p></div>)}</div><Insight><strong>LLM hesap yapmaz, açıklar.</strong> Skorlar, doğrulamadan geçen ML modellerinden ve tanımlı hesap kurallarından gelir.</Insight><div className="principle-row"><span>Açıklanabilirlik</span><span>Tasarımda gizlilik</span><span>İnsan kontrolü</span></div></>
}

function Privacy() {
  const [validated, setValidated] = useState(false)
  return <><div className="privacy-layout"><div className="branch-preview"><div className="branch-top"><Monitor /><strong>Şube fırsat ekranı</strong><span>Temsili MVP</span></div><Tag>MOBİLYA ATÖLYESİ</Tag><h2>Kereste tedariki</h2><p><strong>Neden?</strong> Benzer şirket grubunda tekrar eden tedarik ve finansman ilişkisi.</p><div className="confidence"><span>Güven skoru · temsili</span><strong>82 / 100</strong></div><button className="deck-button" onClick={() => setValidated(v => !v)}>{validated ? <Check /> : <UserCheck />}{validated ? 'Doğrulamayı geri al' : 'İhtiyacı doğrula'}</button><p className="validation-result" aria-live="polite">{validated ? 'İhtiyaç doğrulandı. Tedarikçi A · B · C alternatifleri açıldı.' : 'Tedarikçi alternatifleri için müşteri görüşmesi bekleniyor.'}</p></div><div className="privacy-route"><div><Database /><h2>Bireysel kart verisi</h2><p>Banka içinde kalır.</p></div><div className="privacy-gate"><ShieldCheck /><h2>Anonimleştirme + minimum örneklem</h2><p>Veri yönetişimi kapısı</p></div><div><Network /><h2>İşletmeye ulaşan</h2><p>Yalnızca toplulaştırılmış bölgesel sinyal.</p></div></div></div></>
}

function Roadmap() {
  const [selected, setSelected] = useState(0)
  return <><div className="gantt"><div className="gantt-head"><strong>İş paketi</strong><div>{Array.from({ length: 12 }, (_, i) => <span key={i}>{i + 1}</span>)}</div><strong>Çıktı</strong></div>{data.phases.map((p, i) => <button className={`gantt-row ${selected === i ? 'selected' : ''}`} key={p.name} onClick={() => setSelected(i)} aria-pressed={selected === i}><span>{p.name}</span><div className="gantt-track"><i style={{ gridColumn: `${p.start} / ${p.end + 1}` }}>{p.start}–{p.end}. ay</i></div><strong>{p.output}</strong></button>)}</div><div className="gates"><span>◇ Ay 4 · Veri / gizlilik</span><span>◇ Ay 8 · Model doğrulama</span><span>◇ Ay 12 · Ölçekleme</span></div><p className="deck-source">Aylık dağılım öneridir. Karar kapıları: devam / durdur.</p></>
}

function Pilot() {
  return <><div className="pilot-layout"><div className="pilot-funnel">{[['Fırsat','Doğrulama / fırsat'],['Doğrulama','Eşleşme / doğrulama'],['Eşleşme','İşlem / eşleşme'],['İşlem','Artımsal hacim']].map(([name, ratio], i) => <div key={name} style={{ marginInline: `${i * 5}%` }}><strong>{name}</strong><span>{ratio}</span></div>)}</div><div className="pilot-groups"><div><Tag>TEST ŞUBELERİ</Tag><h2>EkoMatch ile</h2><p>Önce → sonra</p></div><div><Tag>KONTROL ŞUBELERİ</Tag><h2>Mevcut akış</h2><p>Önce → sonra</p></div><Insight>Değişimlerin farkı → artımsal etki</Insight></div></div><div className="pilot-kpis">{['Yeni ekonomik ilişki', 'Artımsal POS hacmi', 'Finansman hacmi', 'Şube kullanım oranı'].map(k => <strong key={k}>{k}</strong>)}</div></>
}

function Resources() {
  return <><div className="resources-layout"><div><div className="resource-total"><strong>13</strong><span>kişilik ekip</span></div><div className="team-list">{data.team.map(role => <div key={role}><span>{role}</span><span>Dağılım bekleniyor</span></div>)}</div></div><div><div className="resource-total"><strong>~45</strong><span>milyon TL</span></div><div className="cost-unallocated"><div className="unallocated-ring" aria-label="Maliyet payları henüz belirlenmedi"><span>Paylar<br />bekleniyor</span></div><ul>{['Ekip', 'Altyapı', 'Veri', 'Eğitim'].map(c => <li key={c}>{c} <span>—</span></li>)}</ul></div><p className="deck-source">Başvuru tutarı · kalem bazlı maliyet kırılımı paylaşılmadı.</p></div></div></>
}

function Benchmark() {
  return <><div className="benchmark-scroll"><table className="deck-benchmark"><thead><tr><th scope="col">Özellik</th>{data.benchmarkColumns.map(c => <th scope="col" key={c}>{c}</th>)}</tr></thead><tbody>{data.benchmarkRows.map(r => <tr key={r.label}><th scope="row">{r.label}</th>{r.values.map((v, i) => <td key={i} className={`level-${v}`}><span aria-label={['Yok', 'Kısmi', 'Var'][v]}>{v === 2 ? <Check /> : v === 1 ? <Minus /> : <X />}</span></td>)}</tr>)}</tbody></table></div><div className="benchmark-legend"><span><Check /> Var</span><span><Minus /> Kısmi</span><span><X /> Yok</span></div><p className="deck-source">Kavramsal kategori karşılaştırması; ürün bazında değişebilir. EkoMatch: önerilen kapsam.</p></>
}

function Positioning() {
  return <div className="position-layout"><div className="position-y">Ekonomik ilişki odaklı ↑</div><div className="position-grid"><div><Network /><h2>Ağ analitiği</h2><p>Mevcut ilişkileri gösterir.</p></div><div className="position-highlight"><ScanSearch /><h2>EkoMatch</h2><p>Yeni ekonomik ilişkiyi keşfeder.</p></div><div><h2>Kampanya motoru</h2><p>Ürün ve teklif odağı</p></div><div><h2>CRM / ürün önerisi</h2><p>Yeni banka ürünü ilişkisi</p></div></div><div className="position-x"><span>Mevcut ilişki</span><ArrowRight /><span>Yeni ilişki keşfi</span></div><p className="deck-source">Kavramsal konumlandırma · alt sıra ürün, üst sıra ekonomik ilişki odaklıdır.</p></div>
}

function Opportunity() {
  return <><div className="opportunity-layout"><div className="cash-story"><div className="financial-number"><strong>590</strong><span>milyar TL</span></div><p>Diğer banka POS’larındaki harcama hacmi</p><ol><li>Kasap kategorisinde bölgesel talep sinyali.</li><li>Bankanın POS kapsaması sınırlı.</li><li>İşyeri edinimi → yeni ödeme ilişkisi.</li></ol></div><div><div className="financial-number"><strong>22</strong><span>milyar TL</span></div><p>Binde 1 senaryosunda fırsat hacmi</p><div className="volume-stages" aria-label="Verilen hacim dizisi, milyar TL">{[970,652,590].map((n, i) => <div key={n}><strong>{n}</strong><i style={{ height: `${n / 970 * 130}px` }} /><span>{['KT kartları', 'Ara baz*', 'Dış POS'][i]}</span></div>)}</div><p className="deck-source">*Ara bazın tanımı ve 22 trilyon TL senaryo bazı teyit bekliyor.</p></div></div><div className="finance-footer"><Insight warning>Hacim, gelir değildir. Kasap hikâyesi temsilidir.</Insight><Appendix /></div></>
}

function Revenue() {
  const f = data.finances
  const [scenario, setScenario] = useState(1)
  return <><div className="revenue-layout"><div><div className="financial-number"><strong>{f.total}</strong><span>milyon TL</span></div><p>POS + finansman katkı projeksiyonu</p><div className="revenue-bar" role="img" aria-label="400 milyon TL: 155 milyon POS ve 245 milyon finansman"><div style={{ flex: f.pos }}>155<br /><span>POS</span></div><div style={{ flex: f.financing }}>245<br /><span>Finansman</span></div></div><p className="deck-source">155 + 245 = 400 milyon TL</p></div><div className="scenario-panel"><div className="deck-tabs">{['Kötü', 'Beklenen', 'İyi'].map((n, i) => <button key={n} onClick={() => setScenario(i)} aria-pressed={scenario === i}>{n}</button>)}</div><div className="scenario-value" aria-live="polite"><strong>{scenario === 1 ? '400' : '—'}</strong><span>{scenario === 1 ? 'milyon TL · verilen projeksiyon' : 'Senaryo tutarı paylaşılmadı'}</span></div><div className="cost-reference"><span>Yaklaşık maliyet</span><strong>45 milyon TL</strong></div><p className="deck-source">Net/brüt tanımı ve dönem teyit bekliyor. Maliyet üstünde kalma iddiası henüz doğrulanamaz.</p></div></div><div className="finance-footer"><Insight>Projeksiyon, gerçekleşmiş gelir değildir.</Insight><Appendix /></div></>
}

function SlideBody({ kind }: { kind: string }) {
  const icons = [ScanSearch, UserCheck, Handshake, Banknote]
  switch (kind) {
    case 'definition': return <><p className="deck-lead">Bankanın geçmiş ekonomik ilişkilerinden öğrenir; henüz oluşmamış potansiyel ilişkileri keşfeder, talep ile arzı buluşturur.</p><div className="definition-grid">{data.definition.map((name, i) => { const Icon = icons[i]; return <div key={name}><Icon /><h2>{name}</h2></div> })}</div><Insight>Henüz kurulmamış ilişki, keşfedilmeyi bekleyen bir fırsattır.</Insight></>
    case 'metrics': return <><div className="metrics-grid">{data.metrics.map(([value, unit, label]) => <div key={label}><strong>{value}</strong><span>{unit}</span><p>{label}</p></div>)}</div><Insight>Boşluk küçük değil: harcama bizde başlıyor, başka bankada bitiyor.</Insight><p className="deck-source">Kaynak: BKM 2025–2026 kart verileri, Kuveyt Türk kurumsal tanıtım (Aralık 2025) · 590 milyar TL hesabında %90 off-us oranı varsayımı kullanılmıştır.</p></>
    case 'heatmap': return <Heatmap />
    case 'comparison': return <><div className="approach-row old"><Tag>MEVCUT YAKLAŞIM</Tag><Steps items={['Müşteri gelir', 'Ürün önerilir', 'Kampanya gönderilir', 'İlişki banka dışında kalır']} icons={[User, Package, Megaphone, Unlink]} /></div><div className="approach-row new"><Tag>EKOMATCH</Tag><Steps items={['Veri', 'Fırsat keşfi', 'Şubeci doğrular', 'Arz eşleşir', 'Yeni ticaret', 'Finansman / POS']} icons={[Activity, Radar, UserCheck, Link, Handshake, Landmark]} humanDecisionAt={2} /></div><p className="deck-source">Kavramsal süreç karşılaştırması.</p></>
    case 'b2b': return <B2B />
    case 'b2c': return <B2C />
    case 'flywheel': return <Flywheel />
    case 'architecture': return <Architecture />
    case 'privacy': return <Privacy />
    case 'stack': return <><div className="stack-grid">{data.stack.map(([name, desc], i) => { const Icon = [Database, Layers, Network, BrainCircuit, ShieldCheck, Monitor][i]; return <div key={name}><Icon /><h2>{name}</h2><p>{desc}</p></div> })}</div><p className="deck-source">Önerilen teknoloji seçenekleri · entegrasyon ve altyapı kararları banka içinde netleştirilir.</p></>
    case 'roadmap': return <Roadmap />
    case 'pilot': return <Pilot />
    case 'resources': return <Resources />
    case 'benchmark': return <Benchmark />
    case 'positioning': return <Positioning />
    case 'swot': return <div className="deck-swot">{data.swot.map(([name, items], i) => <div key={name}><span className="deck-number">0{i + 1}</span><h2>{name}</h2><ul>{items.map(t => <li key={t}>{t}</li>)}</ul></div>)}</div>
    case 'risks': return <div className="deck-risks">{data.risks.map(([name, text], i) => <div key={name}><span className="deck-number">0{i + 1}</span><h2>{name}</h2><ArrowRight /><p>{text}</p></div>)}</div>
    case 'opportunity': return <Opportunity />
    case 'revenue': return <Revenue />
    case 'strategy': return <><div className="strategy-table">{data.strategies.map(([name, text]) => <div key={name}><h2>{name}</h2><ArrowRight /><p>{text}</p></div>)}</div><Insight>Katılım bankacılığı: önce reel ekonomik ilişki, sonra finansman.</Insight></>
    default: return null
  }
}

export function DeckScene({ index }: { index: number }) {
  const slide = data.scenes[index]
  const reduced = useReducedMotion()
  const root = useRef<HTMLElement>(null)
  useEffect(() => { root.current?.focus({ preventScroll: true }) }, [index])
  if (slide.kind === 'cover' || slide.kind === 'final' || slide.kind === 'divider') {
    const ease = [0.22, 1, 0.36, 1] as const
    return <section ref={root} tabIndex={-1} className={`scene deck-scene deck-${slide.kind}`} aria-label={slide.shortTitle}>{slide.kind === 'final' ? <motion.div className="final-network-layer" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : 1.1, ease }}><EconomicNetwork rich className="deck-background-network" /></motion.div> : <EconomicNetwork className="deck-background-network" />}<div className="deck-veil" /><div className={`deck-center ${slide.kind === 'final' ? 'final-composition' : ''}`}>
      {slide.kind === 'final' ? <><motion.div className="final-logo" initial={reduced ? false : { opacity: 0, scale: .97, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: reduced ? 0 : .78, duration: reduced ? 0 : .8, ease }}><EkoMark /></motion.div><motion.h1 initial={reduced ? false : { opacity: 0, y: 10, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ delay: reduced ? 0 : .18, duration: reduced ? 0 : .75, ease }}>{slide.title}</motion.h1><motion.p className="deck-slogan" initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 1.12, duration: reduced ? 0 : .65, ease }}>Talebi keşfet. Arzla buluştur.<br /><strong>Ekonomik ağı büyüt.</strong></motion.p></> : slide.kind === 'cover' ? <><h1>{slide.title}</h1><p className="deck-slogan">Talebi keşfet. Arzla buluştur.<br /><strong>Ekonomik ağı büyüt.</strong></p><div className="deck-cover-logos" aria-label="Proje paydaşları"><img className="deck-cover-partner is-kt" src={ktLogoUrl} alt="Kuveyt Türk" draggable={false} /><img className="deck-cover-mini" src={miniLogoUrl} alt="EkoMatch sembolü" draggable={false} /><img className="deck-cover-partner is-archi" src={archiLogoUrl} alt="Archi Tech" draggable={false} /></div></> : <><span className="chapter-number">{slide.eyebrow.slice(-2)}</span><Tag>{slide.chapter}</Tag><h1>{slide.title}</h1><div className="chapter-line" /></>}
    </div></section>
  }
  return <section ref={root} tabIndex={-1} className={`scene deck-scene deck-kind-${slide.kind}`} aria-label={slide.shortTitle}><header className="deck-heading"><Tag>{slide.eyebrow}</Tag><h1>{slide.title}</h1></header><motion.div className="deck-body" initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .3 }}><SlideBody kind={slide.kind} /></motion.div></section>
}

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowRight, Banknote, Building2, Check, CircleHelp, Database, Eye, Factory, Fingerprint, GitBranch, Handshake, MapPinned, Network, ScanSearch, ShieldCheck, Sparkles, Store, UserCheck, Users, WalletCards, Zap } from 'lucide-react'
import { demoPatterns, roadmap, risks } from '../data/projectData'
import { demoCompanies, demoCustomers, mccCategories } from '../data/demoData'
import { EkoMark } from '../components/Brand'
import { EconomicNetwork, MiniNetworkLegend } from '../components/Network'
import { FlowArrow, Scene, Statement } from '../components/Scene'
import { AnimatedPath, Metric, Node, Pill, Radar, SampleNotice, SignalCard, ValidationRail } from '../components/Visuals'

const enter = { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: .5 } }

export function Scene01Hero() {
  return <section className="scene hero-scene">
    <EconomicNetwork className="hero-network" />
    <div className="hero-vignette" />
    <motion.div className="hero-copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8 }}>
      <motion.h1 initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .45, duration: .65 }}>Bankanın ekonomik ağında<br /><em>henüz var olmayan</em> ilişkileri keşfet.</motion.h1>
      <motion.div className="hero-dual" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .9 }}><span>Benzer ilişkilerden <strong>yeni ticaret.</strong></span><i /><span>Benzer davranışlardan <strong>yeni talep.</strong></span></motion.div>
    </motion.div>
    <div className="scroll-cue"><span>HİKÂYEYİ BAŞLAT</span><ArrowDown /></div>
  </section>
}

export function Scene02Problem() {
  const old = ['Kim ne aldı?', 'Kim kiminle çalışıyor?', 'Kim hangi ürünü kullandı?']
  return <Scene eyebrow="PROBLEM" title={<>Banka geçmişi görüyor.<br /><span>Fırsat ise henüz gerçekleşmedi.</span></>} className="problem-scene">
    <div className="problem-visual">
      <div className="past-questions">{old.map((q, i) => <motion.div key={q} initial={{ opacity: 0, x: -20 }} animate={{ opacity: .42, x: 0 }} transition={{ delay: .15 + i * .12 }}><span>0{i + 1}</span>{q}</motion.div>)}</div>
      <div className="problem-divider"><div /><ArrowRight /></div>
      <motion.div className="future-question" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .55 }}><ScanSearch /><small>EKOMATCH’İN SORUSU</small><strong>Henüz oluşmamış<br />ekonomik ilişki nerede?</strong></motion.div>
    </div>
  </Scene>
}

export function Scene03WhiteSpace() {
  return <Scene eyebrow="TEMEL İÇGÖRÜ" title={<>Economic <span>White Space</span></>} className="white-space-scene">
    <div className="white-space-layout">
      <div className="white-space-copy"><Statement tone="bright">Mevcut ağı analiz etmekten,<br /><strong>gelecekteki ağı keşfetmeye.</strong></Statement><MiniNetworkLegend /><div className="intuition"><small>TEK CÜMLEDE SEZGİ</small><strong>“Benzerlerimde var,<br />bende yok.”</strong></div></div>
      <div className="white-space-network"><EconomicNetwork labels /><motion.div className="edge-callout" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3 }}><Sparkles /> En güçlü potansiyel</motion.div></div>
    </div>
  </Scene>
}

export function Scene04EconomicTwin() {
  const features = ['NACE', 'Finansal profil', 'Şirket ölçeği', 'İşlem davranışı']
  return <Scene eyebrow="B2B · ECONOMIC TWIN" title={<>Bu şirkete benzeyen şirketler<br />geçmişte <span>kimlerle ticaret yaptı?</span></>} className="twin-scene">
    <div className="twin-canvas">
      <svg viewBox="0 0 1100 420" aria-hidden="true">
        <AnimatedPath d="M245 210 C390 210 395 75 520 75" delay={.2} kind="dotted" /><AnimatedPath d="M245 210 C390 210 395 165 520 165" delay={.3} kind="dotted" /><AnimatedPath d="M245 210 C390 210 395 255 520 255" delay={.4} kind="dotted" /><AnimatedPath d="M245 210 C390 210 395 345 520 345" delay={.5} kind="dotted" />
        <AnimatedPath d="M680 75 C775 75 785 125 900 125" delay={.75} /><AnimatedPath d="M680 165 C780 165 790 125 900 125" delay={.8} /><AnimatedPath d="M680 255 C780 255 790 295 900 295" delay={.85} /><AnimatedPath d="M680 345 C775 345 785 295 900 295" delay={.9} />
      </svg>
      <Node x={11} y={50} label="ANKA DOKUMA" kind="accent" delay={.1} />
      <div className="feature-column">{features.map((f, i) => <motion.div key={f} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .3 + i * .1 }}><i /><span>{f}</span></motion.div>)}</div>
      <Node x={82} y={30} label="EKONOMİK İKİZ 01" delay={.9} /><Node x={82} y={70} label="EKONOMİK İKİZ 02" delay={1} />
      <div className="twin-label"><Fingerprint /> Özellikler bir kimlik değil,<br /><strong>ekonomik temsil</strong> oluşturur.</div>
    </div>
  </Scene>
}

export function Scene05Pattern() {
  return <Scene eyebrow="B2B · DESEN KEŞFİ" title={<>Tek bir tahmin değil.<br /><span>Benzerlerde tekrar eden ilişki deseni.</span></>} className="pattern-scene">
    <div className="pattern-layout">
      <div className="peer-orbit"><div className="peer-core"><Factory /><strong>Anka<br />Dokuma</strong></div>{['İkiz 01', 'İkiz 02', 'İkiz 03', 'İkiz 04'].map((p, i) => <motion.span style={{ '--i': i } as React.CSSProperties} key={p} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: .2 + i * .1 }}>{p}</motion.span>)}</div>
      <div className="pattern-bars">{demoPatterns.map((p, i) => <motion.div className="pattern-bar" key={p.label} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .25 + i * .12 }}><div><span>{p.label}</span><strong>{p.value}%</strong></div><i><motion.b style={{ background: p.color }} initial={{ scaleX: 0 }} animate={{ scaleX: p.value / 50 }} transition={{ delay: .35 + i * .12, duration: .65 }} /></i></motion.div>)}</div>
      <div className="not-claim"><CircleHelp /><div><small>EKOMATCH ŞUNU SÖYLEMEZ</small><s>“Bu şirketin makineye ihtiyacı var.”</s><small>BUNUN YERİNE</small><strong>“Ekonomik benzerler bu ilişkiyi sıklıkla kurdu.”</strong></div></div>
    </div><SampleNotice />
  </Scene>
}

export function Scene06Validation() {
  return <Scene eyebrow="B2B · HUMAN-IN-THE-LOOP" title={<>AI fırsatı keşfeder.<br /><span>İnsan ihtiyacı doğrular.</span></>} className="validation-scene">
    <ValidationRail />
    <div className="validation-quote"><UserCheck /><div><small>MÜŞTERİ GÖRÜŞMESİ</small><q>“Evet, yeni üretim hattı yatırımı planlıyoruz.”</q></div></div>
    <Statement>Bir sinyal, ancak doğru bağlam ve insan kararıyla aksiyona dönüşür.</Statement>
  </Scene>
}

export function Scene07B2BMatch() {
  const suppliers = [
    { name: 'Nova Makine', score: 92, why: 'Faaliyet + ölçek + ilişki geçmişi' },
    { name: 'Eksen Sistem', score: 86, why: 'Bölge + kapasite uyumu' },
    { name: 'Doruk Endüstri', score: 79, why: 'Benzer ticaret ilişkileri' },
  ]
  return <Scene eyebrow="B2B · MATCH" title={<>Doğrulanmış talebi, <span>uygun tedarik alternatifleriyle</span> buluştur.</>} className="match-scene">
    <div className="match-flow">
      <div className="demand-company"><small>DOĞRULANMIŞ TALEP</small><Factory /><strong>Anka Dokuma</strong><span>Yeni üretim hattı</span></div>
      <div className="match-beam"><span>UYUM MOTORU</span><i /><ArrowRight /></div>
      <div className="supplier-list">{suppliers.map((s, i) => <motion.div key={s.name} initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .25 + i * .13 }}><em>0{i + 1}</em><div><strong>{s.name}</strong><span>{s.why}</span></div><b>{s.score}<small>/100</small></b></motion.div>)}</div>
    </div>
    <div className="guardrail"><ShieldCheck /> EkoMatch Uyum Skoru, tedarikçi kalitesi veya banka garantisi değildir. Karar için birden fazla alternatif sunar.</div>
  </Scene>
}

export function Scene08BehavioralTwin() {
  const cats = ['Market', 'Akaryakıt', 'Restoran', 'Havayolu']
  return <Scene eyebrow="B2C · BEHAVIORAL TWIN" title={<>Benzer davranışlar daha sonra<br /><span>hangi ekonomik ilişkileri kurdu?</span></>} className="behavior-scene">
    <div className="behavior-canvas">
      <div className="customer-core"><span>M-2048</span><strong>Anonim müşteri</strong><i /></div>
      {cats.map((c, i) => <motion.div className="mcc-node" style={{ '--i': i } as React.CSSProperties} key={c} initial={{ opacity: 0, scale: .5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .18 + i * .12 }}><small>MCC</small>{c}</motion.div>)}
      <div className="twin-cloud"><small>DAVRANIŞSAL İKİZLER</small>{[1,2,3,4,5,6,7].map(i => <motion.i key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: .65 + i * .05 }} />)}</div>
    </div>
    <div className="behavior-rule"><Eye /><span>Model özel hayat hikâyesi kurmaz.</span><strong>Ekonomik kategori davranışını öğrenir.</strong></div>
  </Scene>
}

export function Scene09MCCJourney() {
  const flows = [65, 48, 32, 22]
  return <Scene eyebrow="B2C · SEQUENCE" title={<>Bir sonraki ekonomik ilişki<br /><span>hangi kategori olabilir?</span></>} className="journey-scene">
    <div className="journey-visual">
      <div className="journey-col"><small>MEVCUT DİZİ</small>{['Market', 'Akaryakıt', 'Restoran'].map((x, i) => <motion.div key={x} {...enter} transition={{ delay: i * .1 }}>{x}</motion.div>)}</div>
      <div className="sankey-flow" aria-hidden="true">{flows.map((w, i) => <motion.i key={i} style={{ '--w': `${w}px`, '--y': `${32 + i * 58}px` } as React.CSSProperties} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: .35 + i * .1, duration: .7 }} />)}<span>BENZER DİZİLERDE SONRA</span></div>
      <div className="journey-col is-future"><small>NEXT ECONOMIC RELATIONSHIP</small>{['Ev & Yaşam', 'Seyahat', 'Dijital Hizmet', 'Giyim'].map((x, i) => <motion.div key={x} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .6 + i * .1 }}><span>{x}</span><b>{[38, 27, 21, 14][i]}%</b></motion.div>)}</div>
    </div><SampleNotice>Akış oranları sentetik; MCC kategori düzeyini temsil eder.</SampleNotice>
  </Scene>
}

export function Scene10CustomerWhiteSpace() {
  return <Scene eyebrow="B2C · WHITE SPACE" title={<>Benzerlerimde var, <span>bende yok.</span></>} className="customer-space-scene">
    <div className="customer-space">
      <div className="customer-space__core">M-2048<small>MEVCUT AĞ</small></div>
      {['Market', 'Akaryakıt', 'Restoran'].map((x, i) => <motion.div className="existing-cat" style={{ '--i': i } as React.CSSProperties} key={x} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2 + i * .12 }}>{x}</motion.div>)}
      <motion.div className="missing-cat" initial={{ opacity: 0, scale: .7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .85, type: 'spring' }}><Sparkles /><small>POTANSİYEL İLİŞKİ</small><strong>Ev & Yaşam</strong><span>Davranışsal ikizlerde sık<br />M-2048 ağında yok</span></motion.div>
      <div className="customer-space__line solid" /><div className="customer-space__line dotted" />
    </div>
    <div className="not-certainty">Kesin ihtiyaç değil. <strong>Doğru zamanda, doğru bağlamda değerlendirilecek potansiyel.</strong></div>
  </Scene>
}

export function Scene11RegionalDemand() {
  const dots = useMemo(() => Array.from({ length: 56 }, (_, i) => ({ x: 8 + ((i * 37) % 85), y: 8 + ((i * 23) % 80), hot: i % 7 < 3 })), [])
  return <Scene eyebrow="B2C → BÖLGE" title={<>Bireysel sinyaller değil.<br /><span>Anonimleştirilmiş bölgesel talep.</span></>} className="regional-scene">
    <div className="regional-layout">
      <div className="aggregation-flow"><div><Users /><span>Customer White Space</span></div><ArrowRight /><div><Network /><span>Toplulaştırma</span></div><ArrowRight /><div className="is-hot"><MapPinned /><span>Bölgesel talep</span></div></div>
      <div className="abstract-map">{dots.map((d, i) => <motion.i key={i} className={d.hot ? 'is-hot' : ''} style={{ left: `${d.x}%`, top: `${d.y}%` }} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: d.hot ? .95 : .35, scale: 1 }} transition={{ delay: .12 + i * .012 }} />)}<div className="heat heat-1" /><div className="heat heat-2" /><div className="map-label l1">BÖLGE 01<strong>Ev & Yaşam</strong></div><div className="map-label l2">BÖLGE 02<strong>Seyahat</strong></div></div>
      <div className="privacy-lock"><ShieldCheck /><strong>Mahremiyet eşiği</strong><span>Müşteri davranışı işyerine açılmaz.<br />Yalnızca yeterli ölçekte toplu sinyal.</span></div>
    </div>
  </Scene>
}

export function Scene12DemandSupply() {
  const cells = [
    { x: 0, y: 0, title: 'DÜŞÜK ÖNCELİK', sub: 'Talep düşük · arz yüksek', tone: 'quiet' },
    { x: 1, y: 0, title: 'BÜYÜME FIRSATI', sub: 'Talep yüksek · arz yüksek', tone: 'growth' },
    { x: 0, y: 1, title: 'İZLE', sub: 'Talep düşük · arz düşük', tone: 'quiet' },
    { x: 1, y: 1, title: 'YÜKSEK FIRSAT', sub: 'Talep yüksek · arz düşük', tone: 'hot' },
  ]
  return <Scene eyebrow="BÖLGE · POS EKOSİSTEMİ" title={<>Talep nerede oluşuyor,<br /><span>banka arzın neresinde?</span></>} className="matrix-scene">
    <div className="matrix-wrap">
      <div className="matrix-y">BANKA POS ARZI <ArrowDown /></div>
      <div className="matrix">{cells.map((c, i) => <motion.div className={`matrix-cell is-${c.tone}`} style={{ gridColumn: c.x + 1, gridRow: c.y + 1 }} key={c.title} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .12 + i * .12 }}><small>{c.sub}</small><strong>{c.title}</strong>{c.tone === 'hot' && <motion.i animate={{ scale: [1, 1.8, 1], opacity: [.8, 0, .8] }} transition={{ repeat: Infinity, duration: 2 }} />}</motion.div>)}</div>
      <div className="matrix-x">POTANSİYEL TALEP <ArrowRight /></div>
      <div className="matrix-example"><Store /><small>SENTETİK ÖRNEK</small><strong>Bölge 01 · Ev & Yaşam</strong><span>Talep güçlü, banka POS kapsaması sınırlı.</span><Pill tone="accent">Yeni işyeri / POS fırsatı</Pill></div>
    </div>
  </Scene>
}

export function Scene13ThreeSpaces() {
  const spaces = [
    { no: '01', title: 'MÜŞTERİ', q: 'Benzerlerde olan hangi ilişki bu müşteride yok?', icon: <Fingerprint /> },
    { no: '02', title: 'BÖLGE', q: 'Hangi kategoride talep coğrafi olarak yoğunlaşıyor?', icon: <MapPinned /> },
    { no: '03', title: 'MERCHANT / POS', q: 'Talep güçlü ama banka kapsaması nerede zayıf?', icon: <Store /> },
  ]
  return <Scene eyebrow="TEK FIRSAT MOTORU" title={<>Üç beyaz alan.<br /><span>Tek ekonomik fırsat.</span></>} className="three-spaces-scene">
    <div className="three-spaces">{spaces.map((s, i) => <motion.div key={s.no} className="space-stripe" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12 + i * .15 }}><em>{s.no}</em><i>{s.icon}</i><strong>{s.title}<br />WHITE SPACE</strong><p>{s.q}</p></motion.div>)}</div>
    <motion.div className="opportunity-result" initial={{ opacity: 0, scaleX: .3 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: .75, duration: .6 }}><span /><Sparkles /><strong>EKOMATCH OPPORTUNITY</strong><span /></motion.div>
  </Scene>
}

export function Scene14Flywheel() {
  const items = [
    ['Davranışsal İkiz', 'B2C'], ['Bölgesel Talep', 'SİNYAL'], ['Merchant Fırsatı', 'POS'], ['Yeni Kapasite', 'TİCARET'],
    ['Yeni B2B İhtiyaç', 'TALEP'], ['Ekonomik İkiz', 'B2B'], ['Finansman + Ödeme', 'DEĞER'], ['Daha Fazla Veri', 'ÖĞRENME'],
  ]
  return <Scene eyebrow="B2C + B2B" title={<>EkoMatch yalnızca fırsat bulmaz.<br /><span>Ekonomik ağı büyütür.</span></>} className="flywheel-scene">
    <div className="flywheel">
      <svg viewBox="0 0 600 600" aria-hidden="true"><motion.circle cx="300" cy="300" r="215" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2 }} /><motion.path d="M300 85a215 215 0 0 1 210 170" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: .7 }} /><path className="flywheel-arrow" d="M510 255l-26-22m26 22 9-33" /></svg>
      <div className="flywheel-core"><strong>EKONOMİK<br />AĞ ETKİSİ</strong></div>
      {items.map(([name, tag], i) => <motion.div className="flywheel-item" style={{ '--i': i } as React.CSSProperties} key={name} initial={{ opacity: 0, scale: .7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .12 + i * .09 }}><small>{tag}</small><strong>{name}</strong></motion.div>)}
    </div>
    <div className="flywheel-equation"><span>Yeni ilişki</span><i>→</i><span>Gerçek ticaret</span><i>→</i><span>Daha zengin ağ</span><i>→</i><strong>Daha iyi keşif</strong></div>
  </Scene>
}

export function Scene15AIEngine() {
  const data = ['Kart işlemleri', 'MCC', 'POS / Merchant', 'NACE', 'Finansallar', 'Coğrafi agregasyon']
  return <Scene eyebrow="AI & DATA" title={<>Karar katmanları ayrışır.<br /><span>Sinyal açıklanabilir kalır.</span></>} className="architecture-scene">
    <div className="architecture">
      <div className="arch-layer data-layer"><small>01 · DATA</small><div>{data.map(x => <span key={x}>{x}</span>)}</div></div>
      <div className="arch-connector"><i /><ArrowDown /></div>
      <div className="arch-layer embedding-layer"><small>02 · FEATURE / EMBEDDING</small><strong>İzinli veriden ekonomik temsil</strong></div>
      <div className="arch-connector"><i /><ArrowDown /></div>
      <div className="twin-split"><div><Building2 /><small>B2B</small><strong>Economic Twin</strong></div><div><Users /><small>B2C</small><strong>Behavioral Twin</strong></div></div>
      <div className="arch-methods"><span>Benzerlik</span><span>Kümeleme</span><span>Dizi Modelleme</span><span>Graf Analitiği</span></div>
      <div className="arch-output"><div><ScanSearch /><span>AI / ML</span><strong>White Space Detection</strong></div><ArrowRight /><div><Zap /><span>DETERMİNİSTİK</span><strong>Opportunity Scoring</strong></div><ArrowRight /><div><UserCheck /><span>İNSAN + KURAL</span><strong>Doğrulama & Match</strong></div></div>
    </div>
    <div className="genai-note"><Sparkles /> Üretken AI, sayısal karar motoru değil; açıklama ve çalışan deneyimi için kontrollü bir katman olabilir.</div>
  </Scene>
}

export function Scene16Trust() {
  const flow = [
    { title: 'Ham müşteri verisi', sub: 'Banka sınırları içinde', icon: <Database />, tone: 'locked' },
    { title: 'AI analizi', sub: 'İç sistemlerde', icon: <Fingerprint />, tone: 'locked' },
    { title: 'Toplu fırsat sinyali', sub: 'Anonim / agregasyon', icon: <Network />, tone: 'open' },
    { title: 'Nihai karar', sub: 'Yetkili insan + kurallar', icon: <UserCheck />, tone: 'human' },
  ]
  return <Scene eyebrow="GÜVEN MİMARİSİ" title={<>Veri içeride kalır.<br /><span>Fırsat kontrollü biçimde dışarı çıkar.</span></>} className="trust-scene">
    <div className="trust-flow">{flow.map((f, i) => <div className={`trust-step is-${f.tone}`} key={f.title}><motion.i initial={{ opacity: 0, scale: .7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .15 + i * .13 }}>{f.icon}</motion.i><small>0{i + 1}</small><strong>{f.title}</strong><span>{f.sub}</span>{i < flow.length - 1 && <ArrowRight />}</div>)}</div>
    <div className="trust-principles"><Pill>KVKK / bankacılık sırrı duyarlı</Pill><Pill>Açıklanabilir sinyal</Pill><Pill>Audit trail</Pill><Pill>Human-in-the-loop</Pill></div>
    <Statement>Uyum bir sunum iddiası değil; hukuk ve bilgi güvenliğiyle doğrulanacak <strong>tasarım koşuludur.</strong></Statement>
  </Scene>
}

export function Scene17Benchmark() {
  const rows = [
    ['Geleneksel kampanya', 'Geçmiş satın alma', 'Teklif / iletişim'],
    ['İlişki grafı', 'Mevcut bağlantı', 'Bugünkü ağı keşif'],
    ['Ürün öneri motoru', 'Banka ürün kullanımı', 'Sonraki ürün'],
    ['EKOMATCH', 'Benzer ilişki + davranış', 'Potansiyel YENİ ekonomik ilişki'],
  ]
  return <Scene eyebrow="YENİLİKÇİLİK · BENCHMARK" title={<>Mevcut ilişkiyi bulmaktan,<br /><span>yeni ilişki fırsatını keşfetmeye.</span></>} className="benchmark-scene">
    <div className="benchmark-table"><div className="benchmark-head"><span>YAKLAŞIM</span><span>NEYİ OKUR?</span><span>NEYİ ÜRETİR?</span></div>{rows.map((r, i) => <motion.div className={i === 3 ? 'benchmark-row is-ek match-row' : 'benchmark-row'} key={r[0]} initial={{ opacity: 0, x: i === 3 ? 20 : -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .12 + i * .12 }}>{r.map((c, j) => <span key={c}>{j === 0 && i === 3 && <Sparkles />}{c}</span>)}</motion.div>)}</div>
    <div className="benchmark-difference"><div><small>MEVCUT</small><s>“Kime ne satalım?”</s></div><ArrowRight /><div><small>EKOMATCH</small><strong>“Hangi yeni ekonomik ilişki mümkün?”</strong></div></div>
  </Scene>
}

export function Scene18Risks() {
  return <Scene eyebrow="SWOT · RİSK KONTROLÜ" title={<>Güçlü sinyal,<br /><span>kontrollü karar.</span></>} className="risk-scene">
    <div className="risk-layout">
      <div className="risk-radar"><Radar values={risks.map(r => r.level)} /><small>RİSK YOĞUNLUĞU · KAVRAMSAL</small></div>
      <div className="risk-list">{risks.map((r, i) => <motion.div key={r.risk} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .1 + i * .08 }}><i>{String(i + 1).padStart(2, '0')}</i><strong>{r.risk}</strong><span>{r.control}</span></motion.div>)}</div>
      <div className="swot-edge"><div><small>GÜÇ</small><strong>Banka içi çok boyutlu ağ</strong></div><div><small>FIRSAT</small><strong>Gerçek ekonomiden büyüme</strong></div><div><small>ZAYIFLIK</small><strong>Veri hazırlığına bağımlılık</strong></div><div><small>TEHDİT</small><strong>Güven kaybı / yanlış aksiyon</strong></div></div>
    </div>
  </Scene>
}

export function Scene19Roadmap() {
  return <Scene eyebrow="12 AYLIK ÖNERİLEN PLAN" title={<>Kanıtla. Pilotta ölç.<br /><span>Kontrollü ölçekle.</span></>} className="roadmap-scene">
    <div className="roadmap"><motion.div className="roadmap__line" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.1 }} />{roadmap.map((r, i) => <motion.div className="roadmap-step" key={r.range} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12 + i * .12 }}><i>{i + 1}</i><small>{r.range}</small><strong>{r.title}</strong><span>{r.output}</span></motion.div>)}</div>
    <div className="workpacks"><div><Database /><span>VERİ & YÖNETİŞİM</span></div><div><Fingerprint /><span>MODEL & MLOPS</span></div><div><GitBranch /><span>ÜRÜN & ENTEGRASYON</span></div><div><Users /><span>İŞ BİRİMLERİ & PİLOT</span></div></div>
    <SampleNotice>Takvim öneridir; veri erişimi, ekip ve entegrasyon kapsamıyla netleşir.</SampleNotice>
  </Scene>
}

export function Scene20Value() {
  const chain = [
    { name: 'Yeni ilişki', icon: <Handshake /> }, { name: 'Ticaret', icon: <Building2 /> }, { name: 'Ödeme', icon: <WalletCards /> },
    { name: 'POS hacmi', icon: <Store /> }, { name: 'Finansman', icon: <Banknote /> }, { name: 'Müşteri derinliği', icon: <Network /> },
  ]
  return <Scene eyebrow="FİNANSAL & STRATEJİK ETKİ" title={<>Finansman başlangıç değil,<br /><span>gerçek ticaretin sonucudur.</span></>} className="value-scene">
    <div className="value-chain">{chain.map((x, i) => <motion.div key={x.name} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .1 + i * .1 }}><i>{x.icon}</i><strong>{x.name}</strong>{i < chain.length - 1 && <ArrowRight />}</motion.div>)}</div>
    <div className="value-bottom"><div className="pilot-metrics"><small>PİLOT BAŞARI ÖLÇÜTLERİ</small><Metric value="↑" label="Doğrulanan fırsat oranı" /><Metric value="↑" label="Yeni ticari ilişki" /><Metric value="↑" label="Ödeme / POS hacmi" /><Metric value="↑" label="Ekosistem derinliği" /></div><div className="strategy-lines"><small>KURUMA FAYDASI</small>{['AI destekli ilişki bankacılığı', 'Proaktif şube zekâsı', 'POS ekosistemi büyümesi', 'Mahremiyet duyarlı kişiselleştirme'].map(x => <span key={x}><Check />{x}</span>)}</div></div>
    <div className="roi-note">Sayısal ROI, pilot baz çizgisi ve kontrol grubu olmadan iddia edilmez.</div>
  </Scene>
}

function B2BDemo({ step }: { step: number }) {
  const stages = [
    { tag: 'MÜŞTERİ', title: 'Anka Dokuma', sub: 'NACE 13.20 · Orta ölçek' },
    { tag: 'ECONOMIC TWIN', title: '8 benzer şirket', sub: 'Faaliyet + ölçek + profil' },
    { tag: 'WHITE SPACE', title: 'Makine / Ekipman', sub: 'Benzerlerde güçlü ilişki deseni' },
    { tag: 'İNSAN DOĞRULAMASI', title: 'Yeni hat yatırımı', sub: 'Müşteri görüşmesinde doğrulandı' },
    { tag: 'MATCH', title: '3 tedarik alternatifi', sub: 'Uyum sinyaline göre sıralı' },
    { tag: 'YENİ İLİŞKİ', title: 'Ticaret + ödeme', sub: 'Finansman ihtiyacı artık gerçek' },
  ]
  return <div className="demo-track"><motion.div className="demo-track__line" animate={{ scaleX: step / (stages.length - 1) }} />{stages.map((s, i) => <motion.div className={`demo-stage ${i <= step ? 'is-active' : ''}`} key={s.tag} animate={{ opacity: i <= step ? 1 : .25, scale: i === step ? 1.04 : 1 }}><i>{i < step ? <Check /> : i + 1}</i><small>{s.tag}</small><strong>{s.title}</strong><span>{s.sub}</span></motion.div>)}</div>
}

function B2CDemo({ step }: { step: number }) {
  const stages = [
    { tag: 'ANONİM PROFİL', title: 'M-2048', sub: 'MCC kategori dizisi' },
    { tag: 'BEHAVIORAL TWIN', title: '124 benzer profil', sub: 'Benzer ekonomik ritim' },
    { tag: 'WHITE SPACE', title: 'Ev & Yaşam', sub: 'Benzerlerde var · M-2048’de yok' },
    { tag: 'AGREGASYON', title: 'Bölge 01', sub: 'Toplulaştırılmış sinyal' },
    { tag: 'POS OVERLAY', title: 'Düşük kapsama', sub: 'Banka arzı sınırlı' },
    { tag: 'FIRSAT', title: 'Merchant büyümesi', sub: 'POS / kampanya / edinim' },
  ]
  return <div className="demo-track b2c"><motion.div className="demo-track__line" animate={{ scaleX: step / (stages.length - 1) }} />{stages.map((s, i) => <motion.div className={`demo-stage ${i <= step ? 'is-active' : ''}`} key={s.tag} animate={{ opacity: i <= step ? 1 : .25, scale: i === step ? 1.04 : 1 }}><i>{i < step ? <Check /> : i + 1}</i><small>{s.tag}</small><strong>{s.title}</strong><span>{s.sub}</span></motion.div>)}</div>
}

export function Scene21Demo() {
  const [mode, setMode] = useState<'b2b' | 'b2c' | null>(null)
  const [step, setStep] = useState(0)
  useEffect(() => setStep(0), [mode])
  return <Scene eyebrow="MVP · CANLI AKIŞ" title={<>EkoMatch’i bir fırsatın<br /><span>doğuşunda izle.</span></>} className="demo-scene">
    {!mode ? <div className="demo-picker">
      <button onClick={() => setMode('b2b')}><Building2 /><span>B2B DEMO</span><strong>Benzer ilişkilerden<br />yeni ticaret</strong><ArrowRight /></button>
      <button onClick={() => setMode('b2c')}><Users /><span>B2C DEMO</span><strong>Benzer davranışlardan<br />yeni talep</strong><ArrowRight /></button>
    </div> : <div className="demo-active">
      <div className="demo-toolbar"><button onClick={() => setMode(null)}>← Demo seçimine dön</button><div><span className={mode === 'b2b' ? 'is-active' : ''}>B2B</span><span className={mode === 'b2c' ? 'is-active' : ''}>B2C</span></div><small>SENTETİK VERİ</small></div>
      <AnimatePresence mode="wait"><motion.div key={mode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{mode === 'b2b' ? <B2BDemo step={step} /> : <B2CDemo step={step} />}</motion.div></AnimatePresence>
      <div className="demo-controls"><div><button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>Geri</button><button className="is-primary" onClick={() => setStep(s => Math.min(5, s + 1))} disabled={step === 5}>{step === 5 ? 'Akış tamamlandı' : 'Sonraki adım'} <ArrowRight /></button></div><span>{step + 1} / 6</span></div>
    </div>}
  </Scene>
}

export function Scene22Final() {
  return <section className="scene final-scene">
    <EconomicNetwork rich className="final-network" />
    <div className="hero-vignette" />
    <motion.div className="final-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
      <EkoMark />
      <p>Benzer ilişkilerden <strong>yeni ticaret.</strong><br />Benzer davranışlardan <strong>yeni talep.</strong></p>
      <div><span>Talebi keşfet.</span><i /><span>Arzla buluştur.</span><i /><strong>Ekonomik ağı büyüt.</strong></div>
    </motion.div>
    <div className="final-tag">TECHATHON · 2026</div>
  </section>
}

export const sceneComponents = [
  Scene01Hero, Scene02Problem, Scene03WhiteSpace, Scene04EconomicTwin, Scene05Pattern, Scene06Validation,
  Scene07B2BMatch, Scene08BehavioralTwin, Scene09MCCJourney, Scene10CustomerWhiteSpace, Scene11RegionalDemand,
  Scene12DemandSupply, Scene13ThreeSpaces, Scene14Flywheel, Scene15AIEngine, Scene16Trust, Scene17Benchmark,
  Scene18Risks, Scene19Roadmap, Scene20Value, Scene21Demo, Scene22Final,
]

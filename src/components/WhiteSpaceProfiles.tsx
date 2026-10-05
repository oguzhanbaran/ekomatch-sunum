import { Check, ScanSearch } from 'lucide-react'
import type { WhiteSpaceProfile } from '../data/whiteSpaceExamples'

type Props = {
  kind: 'customer' | 'business'
  profiles: WhiteSpaceProfile[]
  selected: number
  onSelect: (index: number) => void
}

export function WhiteSpaceProfiles({ kind, profiles, selected, onSelect }: Props) {
  const business = kind === 'business'
  const profile = profiles[selected]
  return <div className={`whitespace-profiles whitespace-profiles--${kind}`}>
    <p className="deck-tag">{business ? 'TEMSİLİ İŞLETMELER · ÜRÜN BOŞLUĞU' : 'TEMSİLİ MÜŞTERİLER · KATEGORİ BOŞLUĞU'}</p>
    <div className="whitespace-selectors" role="group" aria-label={business ? 'Firma seçimi' : 'Müşteri seçimi'}>
      {profiles.map((entry, i) => <button key={entry.name} type="button" aria-pressed={selected === i} onClick={() => onSelect(i)}>{entry.name}</button>)}
    </div>
    <div className="whitespace-detail" aria-live="polite" aria-atomic="true">
      <div className="whitespace-existing"><span>{business ? 'Mevcut ürün ve hizmetler' : 'Mevcut kategori ilişkileri'}</span><div>{profile.existing.map(name => <span key={name}><Check size={14} aria-hidden="true" />{name}</span>)}</div></div>
      <h2>{business ? 'Bu işyerinin ürün boşluğu' : 'Bu müşterinin kategori boşlukları'}</h2>
      <div className="whitespace-gaps">{profile.gaps.map(gap => <div className="whitespace-gap-card" key={gap.name}>
        <ScanSearch size={28} strokeWidth={1.5} aria-hidden="true" />
        <div><h3>{gap.name}</h3><p>{gap.detail}</p></div>
        <span className="whitespace-status">Henüz yok</span>
      </div>)}</div>
    </div>
  </div>
}

import { useState } from 'react'
import gish from "../../assets/gish.png";

const cities = ['Toshkent', 'Samarqand', 'Buxoro', 'Andijon', 'Namangan', 'Qarshi']
const districts = ['Zangiota', 'Yunusobod', 'Chilonzor', 'Sergeli', 'Bektemir']
const locationPoints = {
  Toshkent: {
    Zangiota: { x: 404, y: 88, label: 'Zangiota, Toshkent viloyati' },
    Yunusobod: { x: 560, y: 102, label: 'Yunusobod, Toshkent shahri' },
    Chilonzor: { x: 500, y: 170, label: 'Chilonzor, Toshkent shahri' },
    Sergeli: { x: 610, y: 210, label: 'Sergeli, Toshkent shahri' },
    Bektemir: { x: 690, y: 228, label: 'Bektemir, Toshkent shahri' },
  },
  Samarqand: {
    Zangiota: { x: 280, y: 124, label: 'Samarqand markazi' },
    Yunusobod: { x: 340, y: 110, label: 'Siyob, Samarqand' },
    Chilonzor: { x: 420, y: 162, label: 'Urgut yo‘nalishi, Samarqand' },
    Sergeli: { x: 360, y: 214, label: 'Kattaqo‘rg‘on yo‘nalishi' },
    Bektemir: { x: 470, y: 228, label: 'Pastdarg‘om, Samarqand' },
  },
  Buxoro: {
    Zangiota: { x: 232, y: 146, label: 'Buxoro markazi' },
    Yunusobod: { x: 288, y: 130, label: 'Kogon, Buxoro' },
    Chilonzor: { x: 346, y: 174, label: 'Qorako‘l yo‘nalishi' },
    Sergeli: { x: 312, y: 212, label: 'Vobkent yo‘nalishi' },
    Bektemir: { x: 390, y: 222, label: 'G‘ijduvon yo‘nalishi' },
  },
  Andijon: {
    Zangiota: { x: 650, y: 122, label: 'Andijon markazi' },
    Yunusobod: { x: 704, y: 106, label: 'Asaka, Andijon' },
    Chilonzor: { x: 760, y: 164, label: 'Xonobod yo‘nalishi' },
    Sergeli: { x: 716, y: 214, label: 'Qo‘rg‘ontepa yo‘nalishi' },
    Bektemir: { x: 800, y: 226, label: 'Shahrixon yo‘nalishi' },
  },
  Namangan: {
    Zangiota: { x: 740, y: 118, label: 'Namangan markazi' },
    Yunusobod: { x: 792, y: 104, label: 'To‘raqo‘rg‘on, Namangan' },
    Chilonzor: { x: 844, y: 158, label: 'Uychi yo‘nalishi' },
    Sergeli: { x: 816, y: 208, label: 'Pop yo‘nalishi' },
    Bektemir: { x: 894, y: 220, label: 'Chortoq yo‘nalishi' },
  },
  Qarshi: {
    Zangiota: { x: 310, y: 178, label: 'Qarshi markazi' },
    Yunusobod: { x: 366, y: 160, label: 'Koson, Qarshi' },
    Chilonzor: { x: 420, y: 202, label: 'Mirishkor yo‘nalishi' },
    Sergeli: { x: 392, y: 246, label: 'Nishon yo‘nalishi' },
    Bektemir: { x: 472, y: 252, label: 'Dehqonobod yo‘nalishi' },
  },
}
const safetyItems = [
  'Himoya kaskasi (Majburiy)',
  'Maxsus ish kiyimi',
  "Ish qo'lqoplari",
  'Mustahkam poyabzal',
]
const workItems = [
  { label: 'Brigada', value: '12 kishi' },
  { label: 'Muddat', value: '10 kun' },
  { label: 'Toifa', value: 'Qurilish' },
  { label: "To'lov", value: 'Kunlik' },
]

const telegramGroupUrl = 'https://t.me/+ZOUUb23Ow9VjZDUy'

const defaultJob = {
  title: "G'isht terish va beton quyish ishlari",
  category: 'Qurilish',
  location: "Toshkent shahri, Chilonzor tumani",
  price: "250 000 so'm / kun",
  date: '12-oktyabr, 08:00',
  image: gish,
  alt: "G'isht terish va beton ishlari",
  description:
    "Yangi qurilayotgan 2 qavatli uy uchun g'isht terish va fundament beton ishlari bajarish kerak. Ish hajmi taxminan 1500 dona g'isht va 10 kub beton quyishdan iborat. Kerakli barcha materiallar obyektga yetkazib beriladi, tajribali ustalar guruhiga ustunlik beriladi.",
  employer: 'Abduqodir Dehqonov',
  employerRating: '4.9 (24 ta sharh)',
}

const currency = new Intl.NumberFormat('uz-UZ')

function MapPreview({ city, district }) {
  const point = locationPoints[city]?.[district] ?? locationPoints.Toshkent.Zangiota
  return (
    <div className="panel-map px-3 pb-3">
      <svg viewBox="0 0 1200 420" className="panel-map__svg block h-[236px] w-full" aria-hidden="true">
        <defs>
          <linearGradient id="panelMapBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2c4b56" />
            <stop offset="100%" stopColor="#1d3138" />
          </linearGradient>
          <pattern id="panelMapGrid" width="54" height="54" patternUnits="userSpaceOnUse">
            <path d="M54 0H0V54" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1200" height="420" rx="18" fill="url(#panelMapBg)" />
        <rect width="1200" height="420" rx="18" fill="url(#panelMapGrid)" />
        <g stroke="rgba(164,194,206,0.22)" strokeWidth="2" fill="none">
          <path d="M40 100h320M140 20v360M260 0v420M420 50v320M560 0v420M700 40v340M830 10v390M980 0v420M1120 50v300" />
          <path d="M0 320h1200M0 240h1200M0 160h1200M0 80h1200" />
        </g>
        <g stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none">
          <path d="M80 280c120-40 160-140 260-168s204 6 292 72 176 124 292 100 176-92 260-84" />
          <path d="M0 200c120 0 220-80 320-80s160 60 250 60 150-44 232-44 168 40 398 40" />
        </g>
        <circle cx={point.x} cy={point.y} r="18" fill="#f3b63d" opacity="0.22" />
        <path
          d={`M${point.x} ${point.y - 34}c-22 0-40 17.3-40 38.6 0 26.7 40 69.4 40 69.4s40-42.7 40-69.4C${point.x + 40} ${point.y - 20.7} ${point.x + 22} ${point.y - 34} ${point.x} ${point.y - 34}Zm0 53.2c-8.3 0-15-6.6-15-14.8S${point.x - 8.3} ${point.y + 15.6} ${point.x} ${point.y + 15.6}s15 6.6 15 14.8-6.7 14.8-15 14.8Z`}
          fill="#f6b337"
        />
        <g>
          <circle cx={point.x} cy={point.y} r="7" fill="#fff" />
          <circle cx={point.x} cy={point.y} r="4.5" fill="#f6b337" />
        </g>
        <text x="40" y="380" fill="rgba(255,255,255,0.32)" fontSize="16" fontFamily="inherit">
          {point.label}
        </text>
      </svg>
    </div>
  )
}

function PanelPage() {
  const [job] = useState(() => {
    try {
      const stored = window.sessionStorage.getItem('selectedJob')
      return stored ? { ...defaultJob, ...JSON.parse(stored) } : defaultJob
    } catch {
      return defaultJob
    }
  })
  const initialBudget = Number(String(job.price).replace(/\D/g, '')) || 250000
  const [city, setCity] = useState('Toshkent')
  const [district, setDistrict] = useState('Zangiota')
  const [jobDate] = useState(job.date)
  const [budget, setBudget] = useState(initialBudget)
  const [counterOffer, setCounterOffer] = useState(String(initialBudget))
  const [statusText, setStatusText] = useState('Taklif tayyor')
  const [note, setNote] = useState('')

  const summaryLine = job.location || `${city} viloyati, ${district} tumani`
  const selectedPoint = locationPoints[city]?.[district] ?? locationPoints.Toshkent.Zangiota
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedPoint.label)}`

  const applyBudgetChange = (nextValue) => {
    const sanitized = Math.max(150000, Math.min(500000, Number(nextValue) || 0))
    setBudget(sanitized)
    setCounterOffer(String(sanitized))
  }

  const buildTelegramMessage = (amount) => {
    const lines = [
      'Salom, men quyidagi ish bo‘yicha taklif yuboraman:',
      `Ish: ${job.title}`,
      `Narx: ${job.price}`,
      `Taklifim: ${currency.format(amount)} so'm`,
      `Joylashuv: ${summaryLine}`,
      `Aniq manzil: ${selectedPoint.label}`,
      `Muddat: ${jobDate}`,
      '',
      `${job.description}`,
    ]

    return lines.join('\n')
  }

  const prepareTelegramMessage = () => {
    const amount = Math.max(150000, Math.min(500000, Number(counterOffer) || budget))
    setBudget(amount)
    setCounterOffer(String(amount))
    setStatusText('Taklif yuborildi')
    setNote(`${currency.format(amount)} so'm miqdorida taklif yuborildi.`)

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(buildTelegramMessage(amount)).catch(() => {})
    }
  }

  return (
    <section className="boxodir-page panel-page min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.08),transparent_30%),linear-gradient(180deg,#f7f9fc_0%,#f3f5fa_100%)] px-3 pb-6 pt-4">
      <div className="boxodir-page__inner panel-page__inner mx-auto flex w-full max-w-[1260px] flex-col gap-3">
        <nav className="breadcrumb flex flex-wrap items-center gap-2 text-[0.84rem] text-[#8b5d2a]" aria-label="Breadcrumb">
          <a href="#/">Barcha ishlar</a>
          <span>&gt;</span>
          <a href="#/ishchi-paneli">Qurilish</a>
          <span>&gt;</span>
          <span>G'isht terish va beton ishlari</span>
        </nav>

        <div className="panel-layout grid gap-3 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="panel-layout__main grid gap-3">
            <article className="panel-card panel-card--hero overflow-hidden rounded-[10px] border border-[rgba(220,176,110,0.45)] bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
              <div className="">
                <img src={job.image || gish} alt={job.alt || job.title} className="block w-full h-auto object-cover" />
              </div>

              <div className="panel-card__body px-3 pb-3 pt-2.5">
                <div className="panel-card__title-row flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                  <div>
                    <h1 className="panel-title m-0 text-[clamp(2rem,3.2vw,3.1rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-slate-800">
                      {job.title}
                    </h1>
                    <div className="panel-meta mt-2 flex flex-wrap gap-3 text-[0.88rem] text-[#8b5d2a]">
                      <span>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 22s7-5.1 7-11.1A7 7 0 1 0 5 10.9C5 16.9 12 22 12 22Zm0-8.4a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
                        </svg>
                        {summaryLine}
                      </span>
                      <span>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M7 2v4M17 2v4M3.5 9h17M5 5h14a2 2 0 0 1 2 2v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a2 2 0 0 1 2-2Z" />
                        </svg>
                        {jobDate}
                      </span>
                    </div>
                  </div>
                  <div className="panel-actions flex gap-2 pt-[5px]">
                    <button type="button" className="icon-button grid h-[30px] w-[30px] place-items-center rounded-[8px] border border-[rgba(189,141,73,0.5)] bg-white text-[#8a5b22]" aria-label="Ulashish">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M15 8a3 3 0 1 0-2.83-4H12a3 3 0 0 0 3 4Zm-6 6a3 3 0 1 0-2.83-4H6a3 3 0 0 0 3 4Zm6 6a3 3 0 1 0-2.83-4H12a3 3 0 0 0 3 4Z" />
                        <path d="M8.8 9.1 13.2 6.9M8.8 14.9l4.4 2.2" />
                      </svg>
                    </button>
                    <button type="button" className="icon-button grid h-[30px] w-[30px] place-items-center rounded-[8px] border border-[rgba(189,141,73,0.5)] bg-white text-[#8a5b22]" aria-label="Saqlash">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6 3h10l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                        <path d="M8 3v6h8V3" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="panel-copy mt-3 border-t border-[rgba(189,141,73,0.28)] pt-3">
                  <h2>Ish tavsifi</h2>
                  <p>
                    {job.description}
                  </p>
                </div>
              </div>
            </article>

            <section className="panel-card rounded-[10px] border border-[rgba(220,176,110,0.45)] bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
              <div className="section-heading flex items-center gap-2 px-3 pt-2.5">
                <span className="section-heading__icon section-heading__icon--map">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 21s7-5.1 7-11.1A7 7 0 1 0 5 10.9C5 16.9 12 21 12 21Zm0-8.4a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
                  </svg>
                </span>
                <h2>Joylashuv xaritada</h2>
              </div>

              <div className="panel-locations px-3 pb-3">
                <div className="mb-2 flex items-center justify-between gap-3 rounded-[8px] border border-[rgba(194,154,92,0.28)] bg-[#fffaf2] px-3 py-2 text-[0.8rem] text-slate-600">
                  <div>
                    <div className="font-semibold text-slate-800">{selectedPoint.label}</div>
                    <div>{city} / {district}</div>
                  </div>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-8 items-center rounded-[8px] border border-[rgba(241,168,31,0.4)] bg-white px-3 text-[0.78rem] font-semibold text-[#a5691b]"
                  >
                    Xaritada ochish
                  </a>
                </div>

                <div className="pill-group flex flex-wrap gap-2" role="tablist" aria-label="Viloyatlar">
                  {cities.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`pill${city === item ? ' pill--active' : ''} inline-flex min-h-9 items-center justify-center rounded-[8px] border px-3 text-[0.84rem] ${city === item ? 'border-[#f4b12a] text-[#f39b12] shadow-[0_0_0_3px_rgba(244,177,42,0.12)]' : 'border-[rgba(191,143,80,0.28)] bg-white text-[#6e5a45]'}`}
                      onClick={() => setCity(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <div className="pill-group pill-group--districts flex flex-wrap gap-2" role="tablist" aria-label="Tumanlar">
                  {districts.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`pill pill--soft${district === item ? ' pill--active' : ''} inline-flex min-h-9 items-center justify-center rounded-[8px] border px-3 text-[0.84rem] ${district === item ? 'border-[#f4b12a] text-[#f39b12] shadow-[0_0_0_3px_rgba(244,177,42,0.12)]' : 'border-[rgba(191,143,80,0.28)] bg-[#fffaf2] text-[#6e5a45]'}`}
                      onClick={() => setDistrict(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <MapPreview city={city} district={district} />
            </section>

            <section className="panel-card panel-card--safety rounded-[10px] border border-[rgba(220,176,110,0.45)] bg-white pb-2 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
              <div className="section-heading flex items-center gap-2 px-3 pt-2.5">
                <span className="section-heading__icon section-heading__icon--safety">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2 4 5v6c0 5.6 3.7 10.7 8 11 4.3-.3 8-5.4 8-11V5l-8-3Z" />
                  </svg>
                </span>
                <h2>Xavfsizlik anjomlari talablari</h2>
              </div>

              <div className="safety-grid grid grid-cols-1 gap-2 px-3 pb-3 sm:grid-cols-2">
                {safetyItems.map((item) => (
                  <div key={item} className="safety-chip">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2 4 5v6c0 5.6 3.7 10.7 8 11 4.3-.3 8-5.4 8-11V5l-8-3Z" />
                      <path d="M7 12.5 10.2 16 17 9" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="panel-layout__aside grid gap-3">
            <section className="offer-card rounded-[10px] border border-[rgba(220,176,110,0.45)] bg-white p-3 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
              <p className="offer-card__label">Taklif etilgan kunlik ish haqi</p>
              <div className="offer-card__amount">{job.price}</div>
              <div className="divider my-3 h-px bg-[rgba(195,160,109,0.45)]" />

              <form className="counter-form grid gap-2.5" onSubmit={(event) => { event.preventDefault(); prepareTelegramMessage(); }}>
                <div className="counter-form__heading">Kelishuv (Counter-offer)</div>
                <p className="counter-form__hint">Siz o'z narxingizni taklif qilishingiz mumkin:</p>

                <label className="text-input grid min-h-9 grid-cols-[minmax(0,1fr)_auto] items-center overflow-hidden rounded-[8px] border border-[rgba(194,154,92,0.5)] bg-white">
                  <input
                    type="number"
                    min="150000"
                    max="500000"
                    step="5000"
                    value={counterOffer}
                    onChange={(event) => {
                      setCounterOffer(event.target.value)
                      const numeric = Number(event.target.value)
                      if (!Number.isNaN(numeric) && numeric > 0) {
                        setBudget(Math.max(150000, Math.min(500000, numeric)))
                      }
                    }}
                  />
                  <span>so'm</span>
                </label>

                <div className="stepper-row grid grid-cols-2 gap-2">
                  <button type="button" className="stepper-button min-h-9 rounded-[8px] border border-[rgba(193,150,82,0.45)] bg-white text-[1.3rem] font-bold text-[#9a671d]" onClick={() => applyBudgetChange(budget - 5000)}>
                    -
                  </button>
                  <button type="button" className="stepper-button min-h-9 rounded-[8px] border border-[rgba(193,150,82,0.45)] bg-white text-[1.3rem] font-bold text-[#9a671d]" onClick={() => applyBudgetChange(budget + 5000)}>
                    +
                  </button>
                </div>

                <input
                  className="range-input"
                  type="range"
                  min="150000"
                  max="500000"
                  step="5000"
                  value={budget}
                  onChange={(event) => applyBudgetChange(event.target.value)}
                />

                <a
                  href={telegramGroupUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={prepareTelegramMessage}
                  className="primary-submit min-h-10 rounded-[8px] bg-gradient-to-b from-[#f7b33b] to-[#f19f08] font-bold text-[#593500] shadow-[0_8px_18px_rgba(241,159,8,0.18)] inline-flex items-center justify-center"
                >
                  <span>Taklifni yuborish</span>
                </a>
                <div className="trust-banner flex min-h-9 items-center gap-2 rounded-[8px] bg-[#d8f0df] px-3 text-[0.78rem] text-[#27634c]">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2 4 5v6c0 5.6 3.7 10.7 8 11 4.3-.3 8-5.4 8-11V5l-8-3Z" />
                    <path d="m9 12 2.2 2.2L15 10.4" />
                  </svg>
                  <span>To'lov Kunlikish tomonidan kafolatlanadi</span>
                </div>
                <p className="status-note" aria-live="polite">
                  {statusText}
                  {note ? ` - ${note}` : ''}
                </p>
                <p className="status-note text-[0.74rem] text-slate-500">
                  Telegram yangi oynada ochiladi va xabar matni clipboardga tayyorlanadi.
                </p>
              </form>
            </section>

            <section className="employer-card rounded-[10px] border border-[rgba(220,176,110,0.45)] bg-white p-3 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
              <div className="employer-card__head flex items-center gap-2.5 border-b border-[rgba(193,150,82,0.26)] pb-2.5">
                <div className="employer-avatar grid h-[42px] w-[42px] place-items-center rounded-full bg-[#dbe1ef] font-bold text-[#65708a]">
                  AD
                </div>
                <div>
                  <div className="employer-name">{job.employer}</div>
                  <div className="employer-rate">* {job.employerRating}</div>
                </div>
              </div>
              <button type="button" className="ghost-button mt-2.5 min-h-8 w-full rounded-[8px] border border-[rgba(193,150,82,0.35)] bg-white text-[#a5691b]">
                Barcha e'lonlarni ko'rish
              </button>
            </section>

            <section className="job-summary-card rounded-[10px] border border-[rgba(220,176,110,0.45)] bg-white p-3 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
              {workItems.map((item) => (
                <div className="job-summary-card__row flex justify-between gap-3 py-2 text-[0.84rem] text-[#51606f]" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </section>
          </aside>
        </div>

      </div>
    </section>
  )
}

export default PanelPage

import { useState } from 'react'

const formatUzs = new Intl.NumberFormat('uz-UZ')

const chartPresets = {
  7: [24, 36, 31, 49, 40, 55, 47, 58],
  14: [18, 32, 28, 41, 36, 50, 45, 57, 49, 61],
  30: [16, 24, 21, 34, 30, 38, 36, 45, 39, 48, 44, 53],
}

const recentJobs = [
  { name: "Bog'bonlik (Kottedj)", date: '14 Mart, 2024', amount: '+150,000', state: 'Tasdiqlandi', tone: 'green' },
  { name: 'Yuk tashish (Sklad)', date: '12 Mart, 2024', amount: '+200,000', state: 'Tasdiqlandi', tone: 'yellow' },
  { name: 'Uyni tozalash', date: '10 Mart, 2024', amount: '+120,000', state: 'Arxivda', tone: 'gray' },
]

const cards = [
  { name: 'Uzcard', number: '8600 **** 4512', accent: '#0b78d0' },
  { name: 'Humo', number: '9860 **** 0092', accent: '#8b5cf6' },
]

function buildPath(values, width, height, padding) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const stepX = (width - padding * 2) / Math.max(values.length - 1, 1)

  return values
    .map((value, index) => {
      const normalized = max === min ? 0.5 : (value - min) / (max - min)
      const x = padding + index * stepX
      const y = height - padding - normalized * (height - padding * 2)
      return `${x},${y}`
    })
    .join(' ')
}

function FinanceChart({ period }) {
  const values = chartPresets[period]
  const points = buildPath(values, 980, 320, 34)
  const max = Math.max(...values)
  const min = Math.min(...values)

  const area = `${points} 946,286 34,286`

  return (
    <svg viewBox="0 0 980 320" className="finance-chart__svg" aria-hidden="true">
      <defs>
        <linearGradient id="financeArea" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f9ae11" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#f9ae11" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="980" height="320" rx="20" fill="#ffffff" />
      <g stroke="#edf0f4" strokeWidth="1">
        <path d="M24 72h932M24 118h932M24 164h932M24 210h932M24 256h932" />
      </g>
      <polygon points={area} fill="url(#financeArea)" />
      <polyline points={points} fill="none" stroke="#f8a60b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {values.map((value, index) => {
        const x = 34 + index * ((980 - 68) / Math.max(values.length - 1, 1))
        const y = 320 - 34 - ((value - min) / (max - min || 1)) * (320 - 68)

        return <circle key={`${value}-${index}`} cx={x} cy={y} r="5.5" fill="#f8a60b" stroke="#fff" strokeWidth="3" />
      })}
    </svg>
  )
}

function YangiliklarPage() {
  const [period, setPeriod] = useState(7)
  const [withdrawAmount, setWithdrawAmount] = useState('50000')
  const [selectedCard, setSelectedCard] = useState(cards[0].name)
  const [balance, setBalance] = useState(1250000)
  const [pending, setPending] = useState(450000)
  const [status, setStatus] = useState('Pulni yechib olish tayyor')
  const [history, setHistory] = useState(recentJobs)

  const handleWithdraw = (event) => {
    event.preventDefault()
    const amount = Math.max(50000, Math.min(5000000, Number(withdrawAmount) || 0))

    if (amount > balance) {
      setStatus('Balans yetarli emas')
      return
    }

    setBalance((current) => current - amount)
    setPending((current) => current + Math.round(amount * 0.12))
    setHistory((current) => [
      {
        name: 'Yechib olish',
        date: new Date().toLocaleDateString('uz-UZ', { day: '2-digit', month: 'long', year: 'numeric' }),
        amount: `-${formatUzs.format(amount)}`,
        state: selectedCard,
        tone: 'green',
      },
      ...current,
    ])
      setStatus("O'tkazma qabul qilindi")
  }

  return (
    <section className="boxodir-page finance-page min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.08),transparent_30%),linear-gradient(180deg,#f7f9fc_0%,#f3f5fa_100%)] px-3 pb-6 pt-4">
      <div className="boxodir-page__inner finance-page__inner mx-auto flex w-full max-w-[1260px] flex-col gap-3">
        <header className="finance-hero pb-1">
          <h1>Hamyon va To'lovlar</h1>
          <p>Moliaviy holatingiz va daromadlaringizni kuzatib boring.</p>
        </header>

        <section className="finance-summary grid gap-2 lg:grid-cols-3">
          <article className="summary-card summary-card--dark rounded-[10px] border border-[rgba(220,176,110,0.45)] bg-[#2f3338] p-4 text-white shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
            <div className="summary-card__title">Joriy balans</div>
            <div className="summary-card__amount">{formatUzs.format(balance)} UZS</div>
            <button type="button" className="summary-card__button mt-3 min-h-9 w-full rounded-[8px] bg-gradient-to-b from-[#f7b33b] to-[#f19f08] font-bold text-[#5c3900]">
              Yechib olish
            </button>
          </article>

          <article className="summary-card summary-card--light rounded-[10px] border border-[rgba(220,176,110,0.45)] bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
            <div className="summary-card__title">Kutilayotgan to'lovlar</div>
            <div className="summary-card__amount">{formatUzs.format(pending)} UZS</div>
            <div className="summary-card__meta">3 ta ish jarayonida</div>
          </article>

          <article className="summary-card summary-card--card rounded-[10px] border border-[rgba(220,176,110,0.45)] bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
            <div className="summary-card__title">Tezkor o'tkazma</div>
            <div className="summary-card__amount">8600 UZS</div>
            <div className="summary-card__meta">
              {selectedCard === 'Uzcard' ? 'Uzcard 8600 **** 4512' : 'Humo 9860 **** 0092'}
            </div>
          </article>
        </section>

        <section className="finance-grid grid gap-3 lg:grid-cols-[minmax(0,1fr)_318px]">
          <article className="finance-card finance-card--chart rounded-[10px] border border-[rgba(220,176,110,0.45)] bg-white p-3 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
            <div className="card-topline mb-2.5 flex flex-col gap-2.5 lg:flex-row lg:items-start lg:justify-between">
              <h2>Haftalik daromad</h2>
              <select className="select-pill h-8 rounded-[8px] border border-[rgba(194,154,92,0.35)] bg-white px-2 text-[#6b7280]" value={period} onChange={(event) => setPeriod(Number(event.target.value))}>
                <option value={7}>Oxirgi 7 kun</option>
                <option value={14}>Oxirgi 14 kun</option>
                <option value={30}>Oxirgi 30 kun</option>
              </select>
            </div>
            <FinanceChart period={period} />
            <div className="chart-axis">
              <span>Dush</span>
              <span>Sesh</span>
              <span>Chor</span>
              <span>Pay</span>
              <span>Jum</span>
              <span>Shan</span>
              <span>Yak</span>
            </div>
          </article>

          <article className="finance-card finance-card--history rounded-[10px] border border-[rgba(220,176,110,0.45)] bg-white p-3 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
            <div className="card-topline mb-2.5">
              <h2>Oxirgi bajarilgan ishlar</h2>
            </div>
            <div className="history-list grid gap-2">
              {history.map((item) => (
                <div className={`history-item history-item--${item.tone} grid grid-cols-[30px_minmax(0,1fr)_auto] items-center gap-2.5 py-1.5`} key={`${item.name}-${item.date}`}>
                  <div className="history-item__icon grid h-[30px] w-[30px] place-items-center rounded-[8px] bg-[#e8f3ee] text-[0.9rem] text-[#12855b]">{item.tone === 'green' ? 'G' : item.tone === 'yellow' ? 'U' : 'R'}</div>
                  <div className="history-item__body">
                    <div className="history-item__title">{item.name}</div>
                    <div className="history-item__date">{item.date}</div>
                  </div>
                  <div className="history-item__amount">{item.amount}</div>
                  <div className="history-item__state">{item.state}</div>
                </div>
              ))}
            </div>
            <button type="button" className="outline-button mt-3 min-h-8 w-full rounded-[8px] border border-[rgba(193,150,82,0.35)] bg-white text-[#a5691b]">
              Barcha tarixni ko'rish
            </button>
          </article>
        </section>

        <section className="finance-bottom grid gap-0 overflow-hidden rounded-[10px] lg:grid-cols-2">
          <article className="finance-card finance-card--withdraw rounded-t-[10px] border border-[rgba(220,176,110,0.45)] bg-white p-3 shadow-[0_2px_12px_rgba(15,23,42,0.04)] lg:rounded-r-none">
            <h2>Pulni yechib olish</h2>
            <form className="withdraw-form mt-3 grid gap-3" onSubmit={handleWithdraw}>
              <label className="field grid gap-2">
                <span>Yechiladigan miqdor (UZS)</span>
                <input
                  type="number"
                  min="50000"
                  max="5000000"
                  step="10000"
                  value={withdrawAmount}
                  onChange={(event) => setWithdrawAmount(event.target.value)}
                  placeholder="50 000 dan 5 000 000 gacha"
                  className="min-h-9 rounded-[8px] border border-[rgba(194,154,92,0.35)] px-3 font-[inherit]"
                />
              </label>

              <div className="cards-grid grid gap-2 sm:grid-cols-2">
                {cards.map((card) => (
                  <button
                    key={card.name}
                    type="button"
                    className={`bank-card${selectedCard === card.name ? ' bank-card--active' : ''} grid gap-2 rounded-[8px] border border-[rgba(194,154,92,0.38)] bg-white p-3 text-left text-[#273344] ${selectedCard === card.name ? 'border-[#f4a512] shadow-[0_0_0_3px_rgba(244,165,18,0.12)]' : ''}`}
                    onClick={() => setSelectedCard(card.name)}
                    style={{ '--card-accent': card.accent }}
                  >
                    <span className="bank-card__brand">{card.name}</span>
                    <span className="bank-card__number">{card.number}</span>
                  </button>
                ))}
              </div>

              <button type="submit" className="primary-submit primary-submit--wide min-h-10 rounded-[8px] bg-gradient-to-b from-[#f7b33b] to-[#f19f08] font-bold text-[#593500] shadow-[0_8px_18px_rgba(241,159,8,0.18)]">
                O'tkazmani tasdiqlash
              </button>
              <p className="status-note" aria-live="polite">
                {status}
              </p>
            </form>
          </article>

          <article className="finance-card finance-card--info rounded-b-[10px] border border-[rgba(220,176,110,0.45)] bg-gradient-to-b from-[#f6f7fb] to-[#f1f3f8] p-3 shadow-[0_2px_12px_rgba(15,23,42,0.04)] lg:rounded-l-none">
            <h2>Ma'lumotlar</h2>
            <div className="info-list mt-3 grid gap-4">
              <div className="info-item">
                <span>O'tkazma muddati</span>
                <p>Mablag'lar 5-15 daqiqa ichida kartangizga kelib tushadi.</p>
              </div>
              <div className="info-item">
                <span>Komissiya</span>
                <p>Kunlikish tizimi o'tkazmalar uchun 1% komissiya oladi.</p>
              </div>
              <div className="info-item">
                <span>Xavfsizlik</span>
                <p>Barcha operatsiyalar zamonaviy shifrlash tizimlari bilan himoyalangan.</p>
              </div>
            </div>
          </article>
        </section>

        <footer className="page-footer page-footer--finance mt-4 rounded-t-[12px] bg-gradient-to-b from-[#586375] to-[#4f596b] px-3 py-6 text-center text-white/70">
          <div className="page-footer__brand">Kunlikish</div>
          <div className="page-footer__links mt-3 flex flex-wrap justify-center gap-4 text-[0.78rem]">
            <a href="#/">Biz haqimizda</a>
            <a href="#/">Foydalanish shartlari</a>
            <a href="#/">Maxfiylik siyosati</a>
            <a href="#/">Bog'lanish</a>
          </div>
          <div className="page-footer__copy mt-4 border-t border-white/10 pt-3 text-[0.76rem]">(c) 2026 Kunlikish. Barcha huquqlar himoyalangan.</div>
        </footer>
      </div>
    </section>
  )
}

export default YangiliklarPage

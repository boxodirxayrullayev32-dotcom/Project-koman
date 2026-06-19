import { useState, useMemo } from 'react'
import farhodAvatarImg from '../../assets/farhod_avatar.png'
import traktorDalaImg from '../../assets/traktor_dala.png'
import omborxonaYuklagichImg from '../../assets/omborxona_yuklagich.png'

// High-quality stock photo representing plumbing work
const plumbingImg = "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80"

// Custom inline SVG icons
function StarIcon({ filled }) {
  return (
    <svg className={`w-4 h-4 ${filled ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function SteeringWheelIcon() {
  return (
    <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
      <circle cx="12" cy="12" r="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v7M12 15v7M2 12h7M15 12h7" />
    </svg>
  )
}

function CargoIcon() {
  return (
    <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  )
}

function WrenchIcon() {
  return (
    <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function TruckIcon() {
  return (
    <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm11 0a2 2 0 11-4 0 2 2 0 014 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 17h2a2 2 0 002-2V9a2 2 0 00-2-2H3v7a2 2 0 002 2h0m4 2h6m2 0h2a2 2 0 002-2v-4l-3-3h-3v7a2 2 0 002 2z" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

// Initial customer reviews data
const INITIAL_REVIEWS = [
  {
    id: 1,
    initials: "AN",
    avatarBg: "bg-indigo-100 text-indigo-700",
    name: "Abduvali Nazarov",
    date: new Date(Date.now() - 2 * 24 * 3600 * 1000), // 2 days ago
    dateText: "2 kun avval",
    stars: 5,
    text: "Farhod aka juda tajribali usta ekanlar. Bog'imizdagi yer haydash ishlarini kutilganidan ham tezroq va sifatli bitirib berdilar. Tavsiya qilaman!"
  },
  {
    id: 2,
    initials: "SR",
    avatarBg: "bg-emerald-100 text-emerald-700",
    name: "Sardor Raximov",
    date: new Date(Date.now() - 7 * 24 * 3600 * 1000), // 1 week ago
    dateText: "1 hafta avval",
    stars: 5,
    text: "Yuklarni tushirishda juda chaqqonlik bilan yordam berdilar. O'z ishini ustasi, hech qanday ortiqcha gap-so'zsiz hamma narsani tartibli joylashtirdilar."
  },
  {
    id: 3,
    initials: "JM",
    avatarBg: "bg-blue-100 text-blue-700",
    name: "Jasur Mirzo",
    date: new Date(Date.now() - 14 * 24 * 3600 * 1000), // 2 weeks ago
    dateText: "2 hafta avval",
    stars: 4.8,
    text: "Santehnika bo'yicha chaqirgandik, juda tez kelib muammoni hal qilib berdilar. Insofli va tajribali usta ekan."
  },
  {
    id: 4,
    initials: "RT",
    avatarBg: "bg-amber-100 text-amber-700",
    name: "Ravshan Tulyaganov",
    date: new Date(Date.now() - 21 * 24 * 3600 * 1000), // 3 weeks ago
    dateText: "3 hafta avval",
    stars: 4.5,
    text: "Texnika yordamida yer shumlash ishlarini o'z vaqtida bajarib berdilar. Texnikalari yangi va soz holatda ekan."
  },
  {
    id: 5,
    initials: "DR",
    avatarBg: "bg-rose-100 text-rose-700",
    name: "Dilshod Rustamov",
    date: new Date(Date.now() - 30 * 24 * 3600 * 1000), // 1 month ago
    dateText: "1 oy avval",
    stars: 5,
    text: "Qurilish materiallarini yuklash va tashish bo'yicha murojaat qilgandik. Juda tez va tartibli ishladilar. Ishlaridan juda mamnunmiz."
  },
  {
    id: 6,
    initials: "AM",
    avatarBg: "bg-violet-100 text-violet-700",
    name: "Aziz Mansurov",
    date: new Date(Date.now() - 45 * 24 * 3600 * 1000), // 1.5 months ago
    dateText: "2 oy avval",
    stars: 4.0,
    text: "Farhod aka yaxshi usta. Ishga mas'uliyat bilan yondashadilar. Keyingi safar ham albatta taklif qilamiz."
  }
]

function KompaniyalarPage() {
  const [selectedSort, setSelectedSort] = useState("Eng yangilari")
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [offerModalOpen, setOfferModalOpen] = useState(false)
  const [invitedJobTitle, setInvitedJobTitle] = useState("")
  const [invitationMessage, setInvitationMessage] = useState("")
  const [toastMessage, setToastMessage] = useState("")

  // Sort reviews based on select option
  const sortedReviews = useMemo(() => {
    return [...INITIAL_REVIEWS].sort((a, b) => {
      if (selectedSort === "Eng yangilari") {
        return b.date.getTime() - a.date.getTime()
      }
      if (selectedSort === "Eng eskilar") {
        return a.date.getTime() - b.date.getTime()
      }
      if (selectedSort === "Eng yaxshilari") {
        return b.stars - a.stars
      }
      return 0
    })
  }, [selectedSort])

  // Display only first 3 reviews initially, or all if toggled
  const displayedReviews = useMemo(() => {
    return showAllReviews ? sortedReviews : sortedReviews.slice(0, 3)
  }, [sortedReviews, showAllReviews])

  const handleOfferSubmit = (e) => {
    e.preventDefault()
    setToastMessage(`Farhod Karimovga "${invitedJobTitle}" ishi bo'yicha taklif yuborildi! Telegram ochiladi.`)
    setOfferModalOpen(false)

    const message = [
      "Salom, sizga ish taklifi keldi!",
      `Ish: ${invitedJobTitle}`,
      `Mutaxassis: Farhod Karimov`,
      invitationMessage && `Tafsilot: ${invitationMessage}`,
      "Kunlikish platformasi orqali yuborildi.",
    ].filter(Boolean).join('\n')

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(message).catch(() => {})
    }

    window.location.href = 'https://t.me/+ZOUUb23Ow9VjZDUy'

    setInvitedJobTitle("")
    setInvitationMessage("")
    setTimeout(() => {
      setToastMessage("")
    }, 4500)
  }

  return (
    <div className="w-full bg-[#f1f3f8] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#034433] text-white py-3 px-6 rounded-xl shadow-xl flex items-center gap-3 animate-bounce">
          <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Profile Columns Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column - Card Profile Details */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Main Info Box */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            
            {/* Avatar container with online status checkmark */}
            <div className="relative w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-amber-400 to-amber-500 mb-4">
              <img
                src={farhodAvatarImg}
                alt="Farhod Karimov"
                className="w-full h-full object-cover rounded-full border-4 border-white"
              />
              <span className="absolute bottom-1 right-2 w-7 h-7 bg-emerald-500 border-4 border-white rounded-full flex items-center justify-center shadow-md">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            </div>

            {/* Profile Name & Location */}
            <h3 className="text-2xl font-bold text-[#172033]">Farhod Karimov</h3>
            <p className="text-sm text-gray-500 mt-1 font-medium">Toshkent, Chilonzor tumani</p>

            {/* Ratings Summary */}
            <div className="flex items-center gap-1.5 mt-3">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((s) => (
                  <StarIcon key={s} filled={s <= 5} />
                ))}
              </div>
              <span className="text-sm font-bold text-[#172033] ml-1">4.8</span>
              <span className="text-xs text-gray-400 font-semibold">(124 ta sharh)</span>
            </div>

            {/* Divider */}
            <div className="w-full border-t border-gray-100 my-5"></div>

            {/* Stats block */}
            <div className="w-full flex flex-col gap-3.5 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-medium">Ro'yxatdan o'tgan:</span>
                <span className="text-[#172033] font-bold">May, 2023</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-medium">Bajarilgan ishlar:</span>
                <span className="text-[#172033] font-bold">452 ta</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-medium">Javob berish vaqti:</span>
                <span className="text-[#172033] font-bold">15 daqiqa</span>
              </div>
            </div>

            {/* Briefcase Button CTA */}
            <button
              type="button"
              onClick={() => setOfferModalOpen(true)}
              className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-amber-950 font-extrabold py-3.5 px-4 rounded-xl mt-6 transition duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <svg className="w-5 h-5 shrink-0 text-amber-950" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Ishga taklif qilish</span>
            </button>

          </div>

          {/* Skills block */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h4 className="text-lg font-bold text-[#172033] mb-4">Tasdiqlangan ko'nikmalar</h4>
            
            <div className="flex flex-col gap-3">
              {[
                { icon: <SteeringWheelIcon />, label: "Professional yer haydovchi" },
                { icon: <CargoIcon />, label: "Tajribali yuk yuklovchi" },
                { icon: <WrenchIcon />, label: "Santehnik" },
                { icon: <TruckIcon />, label: "Haydovchi (B, C)" }
              ].map((skill, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-blue-50/70 border border-blue-100/50 rounded-xl px-4 py-3"
                >
                  {skill.icon}
                  <span className="text-sm font-semibold text-blue-800">
                    {skill.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column - Work examples, About, Reviews */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Work Examples Gallery */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h4 className="text-lg font-bold text-[#172033] mb-4">Ish namunalari</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { img: traktorDalaImg, title: "Dala yerini haydash ishi" },
                { img: omborxonaYuklagichImg, title: "Omborda yuk yuklash ishi" },
                { img: plumbingImg, title: "Santehnika va quvurlar o'rnatish" }
              ].map((work, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 cursor-pointer shadow-sm"
                  onClick={() => alert(`Galereya: ${work.title}`)}
                >
                  <img
                    src={work.img}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Subtle hover overlay for caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-3">
                    <span className="text-white text-xs font-bold leading-tight">
                      {work.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* About Me Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h4 className="text-lg font-bold text-[#172033] mb-4">Men haqimda</h4>
            <p className="text-sm text-gray-600 leading-relaxed font-medium">
              10 yildan ortiq vaqt davomida qishloq xo'jaligi texnikasi va og'ir yuklarni tashish sohasida faoliyat yuritaman. Har qanday murakkablikdagi yer haydash va ekin ishlarini sifatli bajarib beraman. Shaxsiy haydovchilik guvohnomam va barcha kerakli sertifikatlarim mavjud. Kunlik ishlar yoki uzoq muddatli shartnomalar uchun ochiqman. Mas'uliyat, aniqlik va halollik mening asosiy ustuvorliklarimdir.
            </p>
          </div>

          {/* Customer Reviews Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-6">
            
            {/* Reviews Title & Sorting */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-50 pb-4">
              <h4 className="text-lg font-bold text-[#172033]">Mijozlar sharhlari</h4>
              
              <div className="flex items-center gap-2 relative group self-start sm:self-auto">
                <span className="text-xs text-gray-500">Saralash:</span>
                <div className="relative">
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="bg-transparent text-amber-700 font-bold text-xs cursor-pointer appearance-none pr-6 focus:outline-none hover:text-amber-800"
                  >
                    <option value="Eng yangilari">Eng yangilari</option>
                    <option value="Eng eskilar">Eng eskilar</option>
                    <option value="Eng yaxshilari">Eng yaxshilari</option>
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDownIcon />
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="flex flex-col gap-6">
              {displayedReviews.map(review => (
                <div key={review.id} className="flex gap-4 items-start pb-6 border-b border-gray-100/60 last:border-0 last:pb-0">
                  {/* Initials Avatar */}
                  <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center font-bold text-xs ${review.avatarBg}`}>
                    {review.initials}
                  </div>
                  
                  {/* Review Content */}
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-bold text-[#172033]">{review.name}</span>
                      <span className="text-xs text-gray-400 font-semibold">{review.dateText}</span>
                    </div>

                    {/* Review stars */}
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <StarIcon key={s} filled={s <= Math.round(review.stars)} />
                      ))}
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed font-medium mt-2">
                      "{review.text}"
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Toggle show all reviews button */}
            <button
              type="button"
              onClick={() => setShowAllReviews(prev => !prev)}
              className="w-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3.5 rounded-xl transition duration-150 text-sm cursor-pointer text-center"
            >
              {showAllReviews ? "Sharhlarni yopish" : "Barcha sharhlarni ko'rish"}
            </button>
          </div>

        </div>
      </div>

      {/* Offer Job Modal */}
      {offerModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h4 className="font-extrabold text-gray-800 text-lg">Ish taklif qilish</h4>
              <button
                type="button"
                onClick={() => setOfferModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleOfferSubmit} className="p-6 flex flex-col gap-4">
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-800 font-medium">
                Siz hozirda mutaxassis <span className="font-extrabold">Farhod Karimov</span>ga o'z ishingizni bajarish bo'yicha taklif yubormoqdasiz.
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Ishning nomi / sarlavhasi
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Hovli yerini haydash va shumlash"
                  value={invitedJobTitle}
                  onChange={(e) => setInvitedJobTitle(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Taklifingiz tafsiloti (ixtiyoriy)
                </label>
                <textarea
                  placeholder="Ish shartlari, vaqti va to'lov haqida qisqacha ma'lumot qoldiring"
                  value={invitationMessage}
                  onChange={(e) => setInvitationMessage(e.target.value)}
                  rows="3"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setOfferModalOpen(false)}
                  className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold py-2.5 rounded-xl transition duration-150 text-sm cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#f59e0b] hover:bg-[#d97706] text-amber-950 font-bold py-2.5 rounded-xl shadow-md transition duration-150 text-sm cursor-pointer"
                >
                  Taklif yuborish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default KompaniyalarPage

import { useState, useMemo } from 'react'
import daraxtKesishImg from '../../assets/daraxt_kesish.png'
import qurilishTashishImg from '../../assets/qurilish_tashish.png'
import ofisTozalashImg from '../../assets/ofis_tozalash.png'

// Custom inline SVG icons to avoid external dependencies
function PinIcon() {
  return (
    <svg className="w-4 h-4 text-amber-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="w-4 h-4 text-amber-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg className="w-4 h-4 text-amber-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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

// Generate exactly 42 realistic mock orders to match screenshot
const regionsList = [
  "Toshkent shahar",
  "Toshkent viloyati",
  "Samarqand viloyati",
  "Farg'ona viloyati",
  "Buxoro viloyati",
  "Andijon viloyati",
  "Qashqadaryo viloyati"
]

const MOCK_TEMPLATES = [
  {
    title: "Daraxt kesish va hovli tozalash",
    desc: "Katta hovli hududidagi 3 ta mevali daraxtni butash va hosil bo'lgan shox-shabbalarni olib chiqib tashlash kerak. Hovlini to'liq tozalash va tartibga keltirish talab etiladi. Ish asboblari biz...",
    image: daraxtKesishImg,
    category: "O'rtacha",
    time: "09:00 - 18:00",
    workers: "2 kishi kerak",
    baseMin: 250000,
    baseMax: 300000
  },
  {
    title: "Qurilish mollarini tashish",
    desc: "Yangi qurilayotgan obyektning 3-qavatiga g'isht va sement qoplarini tashish kerak. Lift ishlamaydi. Jismoniy baquvvat yigitlar talab etiladi. Ish hajmi kunlik va darhol to'lanadi.",
    image: qurilishTashishImg,
    category: "Og'ir",
    time: "08:00 - 17:00",
    workers: "4 kishi kerak",
    baseMin: 350000,
    baseMax: 450000
  },
  {
    title: "Ofis tozalash (General cleaning)",
    desc: "Kichik IT ofisida umumiy tozalash ishlarini amalga oshirish kerak. Derazalarni yuvish, changlarni artish va polda namli tozalash. Ish 4-5 soat davom etadi.",
    image: ofisTozalashImg,
    category: "Yengil",
    time: "18:00 - 22:00",
    workers: "1 kishi kerak",
    baseMin: 150000,
    baseMax: 200000
  }
]

const generateOrders = () => {
  const list = []
  for (let i = 1; i <= 42; i++) {
    const template = MOCK_TEMPLATES[(i - 1) % MOCK_TEMPLATES.length]
    const region = regionsList[(i - 1) % regionsList.length]
    
    // Add variations to make data dynamic
    const priceOffset = (i % 6) * 12000
    const workersCount = (i % 3) + 1
    const hoursStart = 8 + (i % 3)
    const hoursEnd = 16 + (i % 3)
    const dateOffset = i * 4 * 3600 * 1000 // offset dates
    
    list.push({
      id: i,
      title: `${template.title} #${i}`,
      description: `${template.desc} Tezda bog'lanishingizni so'raymiz. To'lov ish yakunida naqd yoki plastik kartaga o'tkaziladi.`,
      image: template.image,
      category: template.category,
      location: `${region}, ${i % 2 === 0 ? "Mirobod tumani" : "Sergeli 7-daha"}`,
      time: `${String(hoursStart).padStart(2, '0')}:00 - ${hoursEnd}:00`,
      workers: `${workersCount} kishi kerak`,
      budgetMin: template.baseMin - priceOffset,
      budgetMax: template.baseMax + priceOffset,
      region: region,
      createdAt: new Date(Date.now() - dateOffset)
    })
  }
  return list
}

const ORDERS_DATA = generateOrders()

function SearchPage() {
  // Filters State
  const [selectedRegion, setSelectedRegion] = useState("Toshkent shahar")
  const [priceRange, setPriceRange] = useState(500000)
  const [laborTypes, setLaborTypes] = useState(["Og'ir"]) // Pre-check "Og'ir" as in screenshot
  const [sortBy, setSortBy] = useState("Eng yangilari")
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Interactive Modal State
  const [activeModal, setActiveModal] = useState(null) // { type: 'contact'|'negotiate', job: object }
  const [proposalPrice, setProposalPrice] = useState("")
  const [phoneInput, setPhoneInput] = useState("")
  const [nameInput, setNameInput] = useState("")
  const [successToast, setSuccessToast] = useState("")

  // Clear filters handler
  const handleClearFilters = () => {
    setSelectedRegion("Toshkent shahar")
    setPriceRange(500000)
    setLaborTypes([])
    setCurrentPage(1)
  }

  // Toggle labor type checkbox
  const handleToggleLaborType = (type) => {
    if (laborTypes.includes(type)) {
      setLaborTypes(laborTypes.filter(t => t !== type))
    } else {
      setLaborTypes([...laborTypes, type])
    }
    setCurrentPage(1)
  }

  // Filtered and Sorted orders
  const filteredOrders = useMemo(() => {
    return ORDERS_DATA.filter(order => {
      // 1. Region filter
      if (selectedRegion && selectedRegion !== "Barchasi" && order.region !== selectedRegion) {
        return false
      }
      // 2. Price filter (budgetMin is within the slider value)
      if (order.budgetMin > priceRange) {
        return false
      }
      // 3. Labor type filter
      if (laborTypes.length > 0 && !laborTypes.includes(order.category)) {
        return false
      }
      return true
    }).sort((a, b) => {
      if (sortBy === "Eng yangilari") {
        return b.createdAt.getTime() - a.createdAt.getTime()
      }
      if (sortBy === "Eng eskilar") {
        return a.createdAt.getTime() - b.createdAt.getTime()
      }
      if (sortBy === "Budjeti yuqori") {
        return b.budgetMax - a.budgetMax
      }
      if (sortBy === "Budjeti past") {
        return a.budgetMin - b.budgetMin
      }
      return 0
    })
  }, [selectedRegion, priceRange, laborTypes, sortBy])

  // Paginated orders
  const currentOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredOrders.slice(start, start + itemsPerPage)
  }, [filteredOrders, currentPage])

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)

  // Generate pagination buttons
  const paginationRange = useMemo(() => {
    const range = []
    const siblingCount = 1
    
    // Always show first, last, current, and siblings
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - siblingCount && i <= currentPage + siblingCount)
      ) {
        range.push(i)
      } else if (
        (i === currentPage - siblingCount - 1 && i > 1) ||
        (i === currentPage + siblingCount + 1 && i < totalPages)
      ) {
        range.push('...')
      }
    }
    
    // Filter out duplicates (like consecutive ellipses)
    return range.filter((item, index) => range.indexOf(item) === index)
  }, [totalPages, currentPage])

  const handleOpenModal = (type, job) => {
    setProposalPrice(Math.round((job.budgetMin + job.budgetMax) / 2))
    setActiveModal({ type, job })
  }

  const handleSubmitModal = (e) => {
    e.preventDefault()
    if (!activeModal) return
    setSuccessToast(
      activeModal.type === 'contact'
        ? "Bog'lanish so'rovi yuborildi! Tez orada siz bilan bog'lanishadi."
        : `Narx taklifi (${Number(proposalPrice).toLocaleString()} so'm) muvaffaqiyatli yuborildi!`
    )
    setActiveModal(null)
    setPhoneInput("")
    setNameInput("")
    
    setTimeout(() => {
      setSuccessToast("")
    }, 4000)
  }

  return (
    <div className="w-full bg-[#f1f3f8] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-6 right-6 z-50 bg-[#034433] text-white py-3 px-6 rounded-xl shadow-xl flex items-center gap-3 animate-bounce">
          <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-semibold text-sm">{successToast}</span>
        </div>
      )}

      {/* Main Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Filter Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-[#172033] mb-3">Filtrlar</h3>
            
            {/* Regions Select */}
            <div className="mb-4">
              <label htmlFor="region-select" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Hududlar
              </label>
              <div className="relative">
                <select
                  id="region-select"
                  value={selectedRegion}
                  onChange={(e) => {
                    setSelectedRegion(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white text-sm text-[#172033] font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                >
                  <option value="Barchasi">Barcha hududlar</option>
                  {regionsList.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <ChevronDownIcon />
                </div>
              </div>
            </div>

            {/* Price Slider */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Kunlik haq (so'm)
              </label>
              <div className="px-1 py-3">
                <input
                  type="range"
                  min="150000"
                  max="500000"
                  step="10000"
                  value={priceRange}
                  onChange={(e) => {
                    setPriceRange(Number(e.target.value))
                    setCurrentPage(1)
                  }}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
                />
                <div className="flex justify-between items-center text-xs text-gray-500 mt-3 font-semibold">
                  <span>150,000</span>
                  <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                    {priceRange === 500000 ? "500,000+" : priceRange.toLocaleString()} so'm
                  </span>
                  <span>500,000+</span>
                </div>
              </div>
            </div>

            {/* Labor Type Checkboxes */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Jismoniy mehnat darajasi
              </label>
              <div className="flex flex-col gap-2">
                {[
                  { key: "Og'ir", label: "Og'ir (Qurilish, Yuk tashish)" },
                  { key: "O'rtacha", label: "O'rtacha (Bog'dorchilik)" },
                  { key: "Yengil", label: "Yengil (Tozalash, Tartiblash)" }
                ].map(type => {
                  const isChecked = laborTypes.includes(type.key)
                  return (
                    <button
                      key={type.key}
                      type="button"
                      onClick={() => handleToggleLaborType(type.key)}
                      className="flex items-center gap-3 text-left w-full cursor-pointer group focus:outline-none"
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        isChecked 
                          ? 'border-amber-500 bg-amber-500 text-white' 
                          : 'border-gray-300 group-hover:border-amber-400 bg-white'
                      }`}>
                        {isChecked && (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm transition-colors ${isChecked ? 'text-[#172033] font-semibold' : 'text-gray-600 group-hover:text-[#172033]'}`}>
                        {type.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Clear Filters Button */}
            <button
              type="button"
              onClick={handleClearFilters}
              className="w-full border-2 border-amber-500 hover:bg-amber-50 text-amber-600 font-bold py-2.5 rounded-xl transition duration-200 text-sm cursor-pointer"
            >
              Filtrni tozalash
            </button>
          </div>

          {/* Promotional Ad Block */}
          <div className="bg-[#034433] rounded-2xl p-4 text-white shadow-md relative overflow-hidden flex flex-col gap-2">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-700 opacity-20 rounded-full translate-x-12 -translate-y-12"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-800 opacity-35 rounded-full -translate-x-8 translate-y-8"></div>
            
            <div className="relative">
              <span className="bg-emerald-800 text-emerald-300 text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-md uppercase">
                Premium
              </span>
            </div>
            <div>
              <h4 className="text-lg font-extrabold tracking-tight leading-tight">
                Ishingizni tezroq toping!
              </h4>
              <p className="text-emerald-100 text-xs mt-1 leading-tight opacity-90">
                Anketangizni yuqori o'rinlarga chiqaring va kunlik takliflarni 2 barobar ko'proq oling.
              </p>
            </div>
            <button 
              type="button" 
              onClick={() => alert("Premium xizmat tez orada faollashadi!")}
              className="bg-[#10b981] hover:bg-[#059669] text-white text-xs font-bold py-2.5 px-4 rounded-xl text-center w-full transition duration-200 mt-2 cursor-pointer relative z-10"
            >
              Batafsil
            </button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-xl font-bold text-[#172033]">
              Topilgan ishlar ({filteredOrders.length} ta)
            </h2>
            
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 self-start sm:self-auto relative group">
              <span className="text-sm text-gray-500">Saralash:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="bg-transparent text-amber-700 font-bold text-sm cursor-pointer appearance-none pr-6 focus:outline-none hover:text-amber-800"
                >
                  <option value="Eng yangilari">Eng yangilari</option>
                  <option value="Eng eskilar">Eng eskilar</option>
                  <option value="Budjeti yuqori">Budjeti yuqori</option>
                  <option value="Budjeti past">Budjeti past</option>
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDownIcon />
                </div>
              </div>
            </div>
          </div>

          {/* Cards List */}
          <div className="flex flex-col gap-3">
            {currentOrders.length > 0 ? (
              currentOrders.map(order => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col sm:flex-row gap-3 relative group"
                >
                  {/* Category Pill Tag */}
                  <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${
                    order.category === "Og'ir" 
                      ? 'bg-red-50 text-red-600' 
                      : order.category === "O'rtacha" 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : 'bg-blue-50 text-blue-600'
                  }`}>
                    {order.category} mehnat
                  </span>

                  {/* Order Image */}
                  <div className="w-full sm:w-40 h-32 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={order.image}
                      alt={order.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Order Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold text-[#172033] group-hover:text-blue-600 transition-colors cursor-pointer mr-24">
                        {order.title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2 leading-snug">
                        {order.description}
                      </p>
                      
                      {/* Meta information rows */}
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-600 font-medium">
                        <span className="flex items-center gap-1.5">
                          <PinIcon />
                          {order.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <ClockIcon />
                          {order.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <UsersIcon />
                          {order.workers}
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-2"></div>

                    {/* Pricing and Action Buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                          Budjet:
                        </span>
                        <span className="text-base font-extrabold text-[#034433] tracking-tight">
                          {order.budgetMin.toLocaleString()} - {order.budgetMax.toLocaleString()} so'm
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleOpenModal('negotiate', order)}
                          className="border border-amber-600 hover:bg-amber-50 text-amber-700 text-sm font-bold px-4 py-2.5 rounded-xl transition duration-200 cursor-pointer"
                        >
                          Narxni kelishish
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenModal('contact', order)}
                          className="bg-[#854d0e] hover:bg-[#713f12] text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-sm transition duration-200 cursor-pointer"
                        >
                          Bog'lanish
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-3">
                <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="text-lg font-bold text-gray-800">Buyurtmalar topilmadi</h4>
                  <p className="text-sm text-gray-500 mt-1">Tanlangan filtrlar bo'yicha hech qanday taklif topilmadi. Filtr parametrlarini o'zgartirib ko'ring.</p>
                </div>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-5 rounded-xl text-sm transition mt-2 cursor-pointer"
                >
                  Filtrlarni tozalash
                </button>
              </div>
            )}
          </div>

          {/* Working Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              
              {/* Prev Button */}
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Page Buttons */}
              {paginationRange.map((page, idx) => {
                if (page === '...') {
                  return (
                    <span key={`ell-${idx}`} className="w-10 h-10 flex items-center justify-center text-gray-400 font-bold">
                      ...
                    </span>
                  )
                }
                const isCurrent = currentPage === page
                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-xl border font-bold text-sm flex items-center justify-center transition-all cursor-pointer ${
                      isCurrent 
                        ? 'bg-amber-500 border-amber-500 text-white shadow-sm' 
                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                )
              })}

              {/* Next Button */}
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

            </div>
          )}

        </div>
      </div>

      {/* Interactive Modal Overlay */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gray-50 px-5 py-3 border-b border-gray-100 flex items-center justify-between">
              <h4 className="font-extrabold text-gray-800 text-lg">
                {activeModal?.type === 'contact' ? "Bog'lanish" : "Narx kelishish"}
              </h4>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitModal} className="p-5 flex flex-col gap-3">
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-2 text-xs text-amber-800 font-medium">
                <span className="font-bold block mb-1">Tanlangan buyurtma:</span>
                {activeModal?.job?.title}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Sizning ismingiz
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ismingizni kiriting"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Telefon raqamingiz
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+998 (90) 123-45-67"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {activeModal?.type === 'negotiate' && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Siz taklif qilayotgan narx (so'm)
                  </label>
                  <input
                    type="number"
                    required
                    value={proposalPrice}
                    onChange={(e) => setProposalPrice(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold text-[#034433] focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    Budjet diapazoni: {activeModal?.job?.budgetMin?.toLocaleString()} - {activeModal?.job?.budgetMax?.toLocaleString()} so'm
                  </span>
                </div>
              )}

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold py-2.5 rounded-xl transition duration-150 text-sm cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#854d0e] hover:bg-[#713f12] text-white font-bold py-2.5 rounded-xl shadow-md transition duration-150 text-sm cursor-pointer"
                >
                  Yuborish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchPage

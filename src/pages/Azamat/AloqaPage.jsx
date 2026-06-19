// function AloqaPage() {
//   return (
//     <section className="page-canvas">
//       <div className="page-card">
//         {/* <p className="page-tag">Azamat</p>
//         <h2 className="page-title">Aloqa sahifasi</h2>
//         <p className="page-text">
//           Qilish kerak: aloqa formasi, kontakt ma'lumotlari va xarita yoki
//           qo‘shimcha blok.
//         </p>
//         <ul className="task-list">
//           <li>Formani qurish</li>
//           <li>Kontakt ma'lumotlarini qo‘yish</li>
//           <li>Qayta ishlatiladigan kichik componentlarni ajratish</li>
//         </ul> */}
//       </div>
//     </section>
//   )
// }

// export default AloqaPage

import React, { useState, useRef } from 'react';

const JobPostFlow = () => {
  const [step, setStep] = useState(1);
  const fileInputRef = useRef(null);
  
  // Barcha bosqichlar uchun umumiy ma'lumotlar ombori (State)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    time: '',
    description: '',
    paymentType: 'Kelishilgan narxda',
    price: '',
    agreed: false,
    images: []
  });

  // Xatoliklarni belgilash uchun state
  const [errors, setErrors] = useState({});

  // Inputlar o'zgarganda ishlaydigan funksiya
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Foydalanuvchi ma'lumot yozishni boshlasa, xatolik yozuvini o'chirish
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Rasmlarni yuklash qismi
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length + formData.images.length > 5) {
      alert("Maksimal 5 ta rasm yuklash mumkin!");
      return;
    }
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...selectedFiles]
    }));
  };

  // Qat'iy Validatsiya funksiyasi (Ma'lumot to'liq bo'lmasa keyingi bosqichga o'tkazmaydi)
  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = "Ish sarlavhasini kiriting!";
      if (!formData.category) newErrors.category = "Ish turini (kategoriya) tanlang!";
      if (!formData.date) newErrors.date = "Sanani belgilang!";
      if (!formData.time) newErrors.time = "Ish vaqtini kiriting!";
    }

    if (step === 2) {
      if (!formData.description.trim()) newErrors.description = "Ish haqida batafsil tavsif kiriting!";
      if (formData.paymentType === 'Belgilangan narxda' && !formData.price.trim()) {
        newErrors.price = "Ish haqini / narxini kiriting!";
      }
    }

    if (step === 3) {
      if (!formData.agreed) newErrors.agreed = "Davom etish uchun shartlarga rozilik berishingiz shart!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Keyingi bosqichga o'tish tugmasi mantiqi
  const handleNext = () => {
    if (validateStep()) {
      setStep(s => s + 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 font-sans text-slate-700 select-none">
      <div className="max-w-4xl mx-auto">
        
        {/* 1. STEPPER SECTION (Uzun chiziq chetlari ideal simmetrik qilingan) */}
        <div className="relative max-w-2xl mx-auto mb-14 px-4">
          {/* Orqa fondagi asosiy kulrang chiziq (Faqat doiralar markazi oralig'ida) */}
          <div 
            className="absolute top-5 h-[3px] bg-gray-200 -z-0"
            style={{ left: '32px', right: '32px' }}
          ></div>
          
          {/* Faol sariq chiziq (Ortiqcha chiqib ketmaydi, bosqichga qarab to'ladi) */}
          <div 
            className="absolute top-5 h-[3px] bg-amber-500 transition-all duration-500 ease-in-out -z-0"
            style={{ 
              left: '1px', 
              width: `calc(${(step - 1) * 50}% - ${step === 3 ? '0px' : '0px'})` 
            }}
          ></div>

          <div className="flex justify-between items-center relative z-10">
            {/* 1-bosqich */}
            <div className="flex flex-col items-center w-16">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                step > 1 ? 'bg-[#525e75] border-[#525e75] text-white' : step === 1 ? 'bg-amber-500 border-amber-500 text-white shadow-md' : 'bg-white border-gray-200 text-gray-400'
              }`}>
                {step > 1 ? '✓' : '1'}
              </div>
              <span className={`text-[11px] font-bold mt-2 text-center whitespace-nowrap ${step === 1 ? 'text-slate-900' : 'text-slate-400'}`}>
                Asosiy ma'lumotlar
              </span>
            </div>

            {/* 2-bosqich */}
            <div className="flex flex-col items-center w-16">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                step > 2 ? 'bg-[#525e75] border-[#525e75] text-white' : step === 2 ? 'bg-amber-500 border-amber-500 text-white shadow-md' : 'bg-white border-gray-200 text-gray-400'
              }`}>
                {step > 2 ? '✓' : '2'}
              </div>
              <span className={`text-[11px] font-bold mt-2 text-center whitespace-nowrap ${step === 2 ? 'text-slate-900' : 'text-slate-400'}`}>
                Batafsil tavsif
              </span>
            </div>

            {/* 3-bosqich */}
            <div className="flex flex-col items-center w-16">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                step === 3 ? 'bg-amber-500 border-amber-500 text-white shadow-md' : 'bg-white border-gray-200 text-gray-400'
              }`}>
                3
              </div>
              <span className={`text-[11px] font-bold mt-2 text-center whitespace-nowrap ${step === 3 ? 'text-slate-900' : 'text-slate-400'}`}>
                Tasdiqlash
              </span>
            </div>
          </div>
        </div>

        {/* 2. MAIN CARD (Asosiy formalar qismi) */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-10 max-w-2xl mx-auto mb-8">
          
          {/* STEP 1: ASOSIY MA'LUMOTLAR */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#334155]">Ish haqida asosiy ma'lumotlar</h2>
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-400">Ish sarlavhasi</label>
                  <input name="title" value={formData.title} onChange={handleChange} placeholder="Masalan: Qurilish maydonida yuk tashish" className={`w-full p-4 bg-gray-50/50 border rounded-xl outline-none transition-colors ${errors.title ? 'border-red-400 focus:border-red-500 bg-red-50/5' : 'border-orange-100 focus:border-amber-500'}`} />
                  {errors.title && <span className="text-xs text-red-500 font-medium">{errors.title}</span>}
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-400">Ish turi (Kategoriya)</label>
                  <select name="category" value={formData.category} onChange={handleChange} className={`w-full p-4 bg-gray-50/50 border rounded-xl outline-none appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23a1a1aa%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_auto] bg-[right_16px_center] bg-no-repeat ${errors.category ? 'border-red-400' : 'border-orange-100'}`}>
                    <option value="">Tanlang...</option>
                    <option value="qurilish">Qurilish va ta'mirlash</option>
                    <option value="yuk">Yuk tashish xizmati</option>
                    <option value="cleaning">Tozalash xizmati (Cleaning)</option>
                  </select>
                  {errors.category && <span className="text-xs text-red-500 font-medium">{errors.category}</span>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-400">Sana</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} className={`w-full p-4 bg-gray-50/50 border rounded-xl outline-none text-slate-500 ${errors.date ? 'border-red-400' : 'border-orange-100'}`} />
                    {errors.date && <span className="text-xs text-red-500 font-medium">{errors.date}</span>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-400">Ish vaqti</label>
                    <input type="time" name="time" value={formData.time} onChange={handleChange} className={`w-full p-4 bg-gray-50/50 border rounded-xl outline-none text-slate-500 ${errors.time ? 'border-red-400' : 'border-orange-100'}`} />
                    {errors.time && <span className="text-xs text-red-500 font-medium">{errors.time}</span>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: BATAFSIL TAVSIF VA NARX */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Ish tavsifi va narxi</h3>
                <h2 className="text-xl font-bold text-[#334155]">Ish haqida batafsil tavsif</h2>
              </div>
              <div className="space-y-5">
                <div className="flex flex-col gap-1.5">
                  <textarea name="description" value={formData.description} onChange={handleChange} rows="5" placeholder="Ish hajmi, talablar, yuklama va kerakli asboblar haqida batafsil ma'lumot kiriting..." className={`w-full p-4 bg-gray-50/50 border rounded-xl outline-none resize-none transition-colors ${errors.description ? 'border-red-400 focus:border-red-500' : 'border-orange-100 focus:border-amber-400'}`} />
                  {errors.description && <span className="text-xs text-red-500 font-medium">{errors.description}</span>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-400">To'lov turi</label>
                    <select name="paymentType" value={formData.paymentType} onChange={handleChange} className="w-full p-4 bg-gray-50/50 border border-orange-100 rounded-xl outline-none">
                      <option value="Kelishilgan narxda">Kelishilgan narxda</option>
                      <option value="Belgilangan narxda">Belgilangan narxda</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-400">Ish haqi / Narxi (So'mda)</label>
                    <div className="relative">
                      <input name="price" value={formData.price} onChange={handleChange} disabled={formData.paymentType === 'Kelishilgan narxda'} placeholder={formData.paymentType === 'Kelishilgan narxda' ? "Ixtiyoriy (Kelishuv asosida)" : "Masalan: 150 000"} className={`w-full p-4 bg-gray-50/50 border border-orange-100 rounded-xl outline-none pr-14 ${errors.price ? 'border-red-400' : ''} ${formData.paymentType === 'Kelishilgan narxda' ? 'opacity-40 cursor-not-allowed bg-gray-100' : ''}`} />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">UZS</span>
                    </div>
                    {errors.price && <span className="text-xs text-red-500 font-medium">{errors.price}</span>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: RASMLAR VA TASDIQLASH */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#334155]">Rasmlar va tasdiqlash</h2>
              <div className="space-y-6">
                <input type="file" multiple accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                
                {/* Rasm yuklash maydoni */}
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className="border-2 border-dashed border-orange-100 rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-orange-50/20 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-105 transition-transform">
                    <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <p className="text-sm font-bold text-slate-700 text-center">Ish joyidan yoki kutilayotgan natijadan rasmlar yuklang</p>
                  <p className="text-xs text-gray-400 mt-1">Maksimal 5 ta rasm. PNG, JPG formatlari (max 5MB)</p>
                  <span className="text-xs text-amber-600 font-bold mt-2 underline">Fayllarni tanlash</span>
                  {formData.images.length > 0 && <p className="text-xs text-emerald-600 font-bold mt-2">Yuklangan fayllar: {formData.images.length} ta</p>}
                </div>

                {/* Rozilik chekboksi */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-100 rounded-xl">
                    <input type="checkbox" name="agreed" checked={formData.agreed} onChange={handleChange} className="mt-1 w-5 h-5 accent-amber-500 cursor-pointer rounded" id="terms" />
                    <label htmlFor="terms" className="text-xs text-slate-500 leading-relaxed cursor-pointer select-none">
                      Men kiritilgan barcha ma'lumotlar to'g'ri va haqiqiy ekanligini tasdiqlayman hamda foydalanish shartlariga roziman. Mazkur e'lon platforma qoidalariga zid bo'lsa, u o'chirib tashlanishi mumkinligini tushunaman.
                    </label>
                  </div>
                  {errors.agreed && <span className="text-xs text-red-500 font-medium ml-1">{errors.agreed}</span>}
                </div>
              </div>
            </div>
          )}

          {/* QUYIDAGI NAVIGATSIYA TUGMALARI */}
          <div className="flex items-center justify-end gap-6 mt-10 pt-6 border-t border-slate-50">
            {step > 1 && (
              <button onClick={() => { setStep(s => s - 1); setErrors({}); }} className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                Orqaga qaytish
              </button>
            )}
            <button 
              onClick={step < 3 ? handleNext : () => validateStep() && alert('E\'lon muvaffaqiyatli topshirildi!')}
              className={`font-bold py-3.5 px-8 rounded-xl transition-all shadow-sm active:scale-[0.98] flex items-center gap-2 cursor-pointer ${
                step === 3 ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-orange-100 shadow-lg' : 'bg-[#525e75] text-white hover:bg-[#434e63]'
              }`}
            >
              {step === 3 ? "E'LONNI JOYLASHTIRISH" : "Keyingisi"}
              {step < 3 && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
            </button>
          </div>
        </div>

        {/* 3. INFO BOXES (Pastdagi aqlli maslahatlar oynasi) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto w-full">
          {/* Maslahat qutisi */}
          <div className="bg-amber-50/40 border border-amber-100 p-5 rounded-2xl flex gap-4">
            <div className="text-xl bg-amber-100 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">💡</div>
            <div>
              <h4 className="text-slate-800 font-bold text-sm mb-1">{step === 3 ? "Foydali maslahat" : "Maslahat"}</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {step === 3 
                  ? "Yaxshi sifatli rasmlar yuklangan e'lonlar odatda 40% ko'proq murojaatlarni jalb qiladi. Ish joyini turli burchaklardan ko'rsatishga harakat qiling."
                  : "Tavsif qancha batafsil bo'lsa, mutaxassislar shunchalik aniq narx taklif qila oladilar. Kerakli asbob-uskunalar haqida yozishni unutmang."}
              </p>
            </div>
          </div>
          
          {/* Xavfsizlik qutisi */}
          <div className="bg-blue-50/30 border border-blue-100 p-5 rounded-2xl flex gap-4">
            <div className="text-xl bg-blue-100 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">🛡️</div>
            <div>
              <h4 className="text-slate-800 font-bold text-sm mb-1">{step === 3 ? "Xavfsizlik kafolati" : "Xavfsizlik"}</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {step === 3
                  ? "Sizning barcha ma'lumotlaringiz shifrlangan holda saqlanadi. Platforma orqali tuzilgan kelishuvlar xavfsizlik nazorati ostida bo'ladi."
                  : "Sizning ma'lumotlaringiz himoyalangan. To'lovni faqat ish to'liq bajarilgandan so'ng amalga oshirishingizni tavsiya qilamiz."}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default JobPostFlow;
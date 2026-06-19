import { useState } from 'react';
import bk from '../../assets/Icon (3).png';
import san from '../../assets/san.png';
import sk from '../../assets/sk.png';
import uro from '../../assets/uro.png';
import ubo from '../../assets/ubo.png';
import cv from '../../assets/cv.png';
import tap from '../../assets/tap.png';
import box from '../../assets/box.png';
import tr from '../../assets/tr.png';
import chem from '../../assets/chem.png';
import qurilish from '../../assets/qurilish_tashish.png';
import omborxona from '../../assets/omborxona_yuklagich.png';
import traktor from '../../assets/traktor_dala.png';
import ofisTozalash from '../../assets/ofis_tozalash.png';
import daraxtKesish from '../../assets/daraxt_kesish.png';
import grass from '../../assets/13gg.png';
import gish from '../../assets/gish.png';
import workers from '../../assets/Background (6).png';

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-400 shrink-0">
    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-400 shrink-0">
    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 22C14 18 20 15.4 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 15.4 10 18 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#fca311] shrink-0 mt-1">
    <circle cx="12" cy="12" r="10" fill="#fca311" />
    <path d="M8.5 12.5L11 15L16 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const jobMatches = (item, query, cityQuery) => {
  const q = query.trim().toLowerCase();
  const c = cityQuery.trim().toLowerCase();

  if (!q && !c) return true;

  const haystack = [item.title, item.location, item.description].join(' ').toLowerCase();
  return (!q || haystack.includes(q)) && (!c || item.location.toLowerCase().includes(c));
};

const categoryJobs = [
  {
    title: 'Qurilish',
    count: "1280 ta e'lon",
    image: qurilish,
    icon: bk,
    alt: 'Qurilish maydoni',
    price: "250 000 so'm / kun",
    location: 'Toshkent shahri, Chilonzor tumani',
    date: 'Bugun, 08:00',
    description: "Yangi uy qurilishi uchun g'isht terish va beton quyish ishlari.",
  },
  {
    title: 'Yuk ortish',
    count: "610 ta e'lon",
    image: omborxona,
    icon: box,
    alt: 'Omborxonada yuk ortish',
    price: "180 000 so'm / kun",
    location: 'Toshkent shahri, Sergeli tumani',
    date: 'Bugun, 10:30',
    description: 'Omborxonada yuklarni tushirish va joylashtirish ishlari.',
  },
  {
    title: "Bog'bonchilik",
    count: "340 ta e'lon",
    image: uro,
    icon: cv,
    alt: "Bog'bonchilik ishlari",
    price: "220 000 so'm / kun",
    location: 'Samarqand viloyati, Urgut',
    date: 'Bugun, 07:00',
    description: "Bog'bonchilik va ko'chat parvarishi ishlari.",
  },
  {
    title: 'Santexnika',
    count: "290 ta e'lon",
    image: san,
    icon: tap,
    alt: 'Santexnika ishlari',
    price: "300 000 so'm / kun",
    location: 'Buxoro shahri, Kogon',
    date: 'Bugun, 09:15',
    description: "Uy va ofislar uchun santexnika ta'mirlash ishlari.",
  },
  {
    title: 'Mavsumiy terim',
    count: "180 ta e'lon",
    image: sk,
    icon: tr,
    alt: 'Mavsumiy terim ishlari',
    price: "160 000 so'm / kun",
    location: 'Andijon viloyati, Asaka',
    date: 'Bugun, 06:30',
    description: 'Dalada mavsumiy terim va saralash ishlari.',
  },
  {
    title: 'Uy xizmatlari',
    count: "150 ta e'lon",
    image: ubo,
    icon: chem,
    alt: 'Uy xizmatlari',
    price: "190 000 so'm / kun",
    location: 'Namangan shahri, markaz',
    date: 'Bugun, 11:00',
    description: 'Uy tozalash, tartibga keltirish va yordamchi ishlar.',
  },
  {
    title: "Ko'chat ekish",
    count: "118 ta e'lon",
    image: grass,
    icon: cv,
    alt: "Ko'chat ekish ishlari",
    price: "210 000 so'm / kun",
    location: 'Fargona viloyati, Qoqon',
    date: 'Bugun, 07:20',
    description: "Bog' va dala maydonlariga ko'chat ekish ishlari.",
  },
  {
    title: 'Tom yopish',
    count: "104 ta e'lon",
    image: qurilish,
    icon: bk,
    alt: 'Tom yopish ishlari',
    price: "340 000 so'm / kun",
    location: 'Toshkent viloyati, Angren',
    date: 'Bugun, 09:40',
    description: 'Tom yopish va ustki qoplama ishlari.',
  },
  {
    title: 'Elektr montaj',
    count: "92 ta e'lon",
    image: san,
    icon: tap,
    alt: 'Elektr montaj ishlari',
    price: "320 000 so'm / kun",
    location: 'Namangan shahri, Yangiobod',
    date: 'Bugun, 13:00',
    description: 'Uy va ofislar uchun elektr montaj ishlari.',
  },
];

const extraJobs = [
  {
    title: 'Traktor haydash',
    count: "94 ta e'lon",
    image: traktor,
    icon: tr,
    alt: 'Traktor haydash ishlari',
    price: "450 000 so'm / kun",
    location: 'Qarshi tumani, dalalar',
    date: 'Bugun, 05:30',
    description: 'Dalada traktor haydash va yer tayyorlash ishlari.',
  },
  {
    title: 'Yer tekislash',
    count: "88 ta e'lon",
    image: traktor,
    icon: tr,
    alt: 'Yer tekislash ishlari',
    price: "400 000 so'm / kun",
    location: 'Jizzax viloyati, Zomin',
    date: 'Bugun, 06:10',
    description: "Qishloq xo'jaligi uchun yer tekislash va tayyorlash.",
  },
  {
    title: 'Ofis tozalash',
    count: "126 ta e'lon",
    image: ofisTozalash,
    icon: chem,
    alt: 'Ofis tozalash ishlari',
    price: "230 000 so'm / kun",
    location: 'Toshkent shahri, Yunusobod',
    date: 'Bugun, 18:00',
    description: 'Ofis binolarini kechki tozalash va tartibga keltirish.',
  },
  {
    title: 'Daraxt kesish',
    count: "72 ta e'lon",
    image: daraxtKesish,
    icon: bk,
    alt: 'Daraxt kesish ishlari',
    price: "380 000 so'm / kun",
    location: 'Buxoro viloyati, Gijduvon',
    date: 'Bugun, 08:45',
    description: 'Xavfsiz daraxt kesish va shoxlarni olib tashlash ishlari.',
  },
  {
    title: "G'isht terish",
    count: "208 ta e'lon",
    image: gish,
    icon: bk,
    alt: 'Gisht terish ishlari',
    price: "260 000 so'm / kun",
    location: 'Samarqand shahri, markaz',
    date: 'Bugun, 07:15',
    description: "Uy va bino uchun g'isht terish ishlari.",
  },
  {
    title: 'Yuk tushirish',
    count: "102 ta e'lon",
    image: omborxona,
    icon: box,
    alt: 'Yuk tushirish ishlari',
    price: "175 000 so'm / kun",
    location: 'Toshkent shahri, Chilonzor',
    date: 'Bugun, 12:10',
    description: 'Ombor va savdo nuqtalarida yuk tushirish ishlari.',
  },
  {
    title: 'Bog\' parvarishi',
    count: "96 ta e'lon",
    image: uro,
    icon: cv,
    alt: 'Bog parvarishi ishlari',
    price: "205 000 so'm / kun",
    location: 'Samarqand viloyati, Pastdarg\'om',
    date: 'Bugun, 08:20',
    description: 'Bog\' va ekin maydonlarini parvarishlash ishlari.',
  },
  {
    title: 'Pichan yig\'ish',
    count: "84 ta e'lon",
    image: traktor,
    icon: tr,
    alt: 'Pichan yigish ishlari',
    price: "185 000 so'm / kun",
    location: 'Jizzax viloyati, Forish',
    date: 'Bugun, 06:50',
    description: 'Dalada pichan yig\'ish va tashish ishlari.',
  },
];

function HomePage({ onNavigate = () => {} }) {
  const [query, setQuery] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const popularSearches = ['Santexnika', 'Yuk tashish', "Bog'dorchilik"];

  const filteredCategories = categoryJobs.filter((item) => jobMatches(item, query, cityQuery));
  const filteredExtraJobs = extraJobs.filter((item) => jobMatches(item, query, cityQuery));
  const allJobs = [...categoryJobs, ...extraJobs];
  const hasSearch = Boolean(query.trim() || cityQuery.trim());

  const openJob = (job) => {
    try {
      window.sessionStorage.setItem('selectedJob', JSON.stringify(job));
    } catch {
      // sessionStorage unavailable; route still works with default data
    }

    onNavigate('/ishchi-paneli');
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (!hasSearch) return;

    const match = allJobs.find((item) => jobMatches(item, query, cityQuery));
    if (match) openJob(match);
  };

  return (
    <>
      <section className="w-full !max-w-none bg-gradient-to-b from-[#1E293B] to-[#334155] font-sans flex flex-col items-center pt-16 pb-24 px-4 select-none box-border">
        <div className="w-full max-w-[1240px] flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-bold text-white text-center leading-[1.2] tracking-tight mb-5">
            Ishonchli kunlik ishlarni <span className="text-[#fca311]">shu yerda</span> toping
          </h1>

          <p className="text-neutral-300 text-center max-w-[700px] text-[16px] md:text-[17px] font-normal leading-relaxed mb-10 opacity-90">
            Minglab ish beruvchilar va ishchilar orasidagi eng qulay va ishonchli bog'lovchi platforma.
          </p>

          <form
            className="bg-white rounded-[20px] p-2 flex flex-col md:flex-row items-center w-full max-w-[920px] shadow-2xl mb-8 min-h-[74px] box-border"
            onSubmit={handleSearchSubmit}
          >
            <div className="flex items-center flex-grow h-full py-3 px-4 border-b md:border-b-0 md:border-r border-neutral-200 w-full md:w-auto">
              <SearchIcon />
              <input
                type="text"
                placeholder="Qanday ish qidiryapsiz? (Masalan: yer og'darish)"
                className="flex-grow ml-3 text-[15px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none bg-transparent"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>

            <div className="flex items-center flex-grow h-full py-3 px-4 w-full md:w-auto md:max-w-[240px]">
              <LocationIcon />
              <input
                type="text"
                placeholder="Shahar..."
                className="flex-grow ml-3 text-[15px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none bg-transparent"
                value={cityQuery}
                onChange={(event) => setCityQuery(event.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-[#fca311] hover:bg-[#e0900f] text-neutral-900 font-bold text-[16px] h-[54px] px-10 rounded-[14px] transition-all duration-200 mt-2 md:mt-0 w-full md:w-auto shrink-0 active:scale-[0.98]"
            >
              Izlash
            </button>
          </form>

          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="text-neutral-400 text-[14px] font-medium">Ommabop:</span>
            <div className="flex flex-wrap gap-2 justify-center">
              {popularSearches.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setQuery(item)}
                  className="bg-[#3e4a63] text-neutral-200 text-[13px] py-1.5 px-4 rounded-full font-medium hover:bg-[#495773] transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 px-4">
        <div className="w-full max-w-[1280px] m-auto">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-[24px] font-[600] text-[#191C1E]">Yo'nalishlar bo'yicha qidiring</h1>
              <p className="text-[16px] text-[#545F73]">Sizga mos keladigan ish toifasini tanlang</p>
            </div>
            <div className="text-[15px] text-[#545F73]">
              {hasSearch ? `Natija: ${[query, cityQuery].filter(Boolean).join(' + ')} bo'yicha topildi.` : "Kartani bosing va toliq e'lon sahifasiga oting."}
            </div>
          </div>

          {hasSearch && (
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setCityQuery('');
                }}
                className="text-[13px] font-semibold text-[#f59e0b]"
              >
                Tozalash
              </button>
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => openJob(item)}
                  className="w-full rounded-[12px] shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden bg-white text-left flex flex-col"
                >
                  <div className="relative">
                    <img src={item.image} alt={item.alt} className="block w-full h-[180px] object-cover" />
                    <span className="absolute top-3 right-3 rounded-full bg-[#fca311] px-3 py-1 text-[13px] font-semibold text-[#191C1E] shadow-sm">
                      {item.count}
                    </span>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white flex-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDF2FF]">
                      <img src={item.icon} alt="" className="block h-6 w-6 object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <b className="block text-[20px] font-bold text-[#191C1E]">{item.title}</b>
                      <span className="block text-[13px] text-[#545F73] mt-1 line-clamp-1">{item.location}</span>
                      <div className="mt-3 flex items-center justify-between gap-3 text-[13px]">
                        <span className="font-semibold text-[#f59e0b]">{item.price}</span>
                        <span className="text-[#6b7280] whitespace-nowrap">{item.date}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="w-full rounded-[12px] border border-dashed border-slate-300 bg-white p-6 text-slate-500">
                Hech narsa topilmadi. Qidiruvni o'zgartirib ko'ring.
              </div>
            )}
          </div>

          <div className="mt-10">
            <h2 className="text-[24px] font-[600] text-[#191C1E]">Yana bir qancha e'lonlar</h2>
            <p className="text-[16px] text-[#545F73]">Ustiga bosilsa, to'liq ma'lumot panelda ochiladi.</p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 auto-rows-fr">
              {filteredExtraJobs.length > 0 ? (
                filteredExtraJobs.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => openJob(item)}
                    className="h-full rounded-[12px] overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300 text-left flex flex-col"
                  >
                    <div className="relative">
                      <img src={item.image} alt={item.alt} className="block w-full h-[176px] object-cover" />
                      <span className="absolute top-3 right-3 rounded-full bg-[#fca311] px-3 py-1 text-[13px] font-semibold text-[#191C1E] shadow-sm">
                        {item.count}
                      </span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDF2FF] shrink-0">
                          <img src={item.icon} alt="" className="block h-6 w-6 object-contain" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <b className="block text-[18px] font-bold text-[#191C1E]">{item.title}</b>
                          <span className="block text-[13px] text-[#545F73] mt-1 line-clamp-1">{item.location}</span>
                        </div>
                      </div>
                      <div className="mt-auto pt-3 flex items-center justify-between gap-3 text-[14px]">
                        <span className="font-semibold text-[#f59e0b]">{item.price}</span>
                        <span className="text-[#545F73] whitespace-nowrap">{item.date}</span>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="md:col-span-2 xl:col-span-4 rounded-[12px] border border-dashed border-slate-300 bg-white p-6 text-slate-500">
                  Qidiruvga mos qo'shimcha e'lon topilmadi.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-16 md:py-24 px-4 box-border select-none">
        <div className="w-full max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col max-w-[560px]">
            <span className="text-[#fca311] text-[13px] md:text-[14px] font-bold tracking-wider uppercase mb-3">
              NIMA UCHUN KUNLIKISH?
            </span>

            <h2 className="text-[#191C1E] text-3xl md:text-[36px] font-bold leading-[1.25] mb-8">
              Biznes va jismoniy shaxslar uchun eng tezkor yechim
            </h2>

            <div className="flex flex-col gap-6 mb-10">
              <div className="flex gap-4">
                <CheckIcon />
                <div>
                  <h4 className="text-[#191C1E] font-bold text-[16px] md:text-[17px] mb-1">Ishonchli xodimlar</h4>
                  <p className="text-[#545F73] text-[14px] md:text-[15px] leading-relaxed">
                    Har bir ishchining reytingi va avvalgi ishlari haqida fikrlar mavjud.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckIcon />
                <div>
                  <h4 className="text-[#191C1E] font-bold text-[16px] md:text-[17px] mb-1">Tezkor aloqa</h4>
                  <p className="text-[#545F73] text-[14px] md:text-[15px] leading-relaxed">
                    O'zingizga ma'qul nomzod bilan bir necha daqiqada bog'laning.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckIcon />
                <div>
                  <h4 className="text-[#191C1E] font-bold text-[16px] md:text-[17px] mb-1">Xavfsiz to'lovlar</h4>
                  <p className="text-[#545F73] text-[14px] md:text-[15px] leading-relaxed">
                    Ish yakunlangandan so'ng xizmat haqini to'lash kafolati.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="bg-[#545F73] hover:bg-[#434b5c] text-white font-semibold text-[15px] py-3.5 px-8 rounded-xl transition-all duration-200 active:scale-[0.98]">
                Hozir boshlash
              </button>
              <button className="bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300 font-semibold text-[15px] py-3.5 px-8 rounded-xl transition-all duration-200 active:scale-[0.98]">
                Ko'proq bilish
              </button>
            </div>
          </div>

          <div className="w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[600px] rounded-2xl overflow-hidden">
              <img src={workers} alt="Kunlikish" className="w-full h-auto object-cover block" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;

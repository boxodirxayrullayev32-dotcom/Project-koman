import React from 'react';
import first from '../../assets/Container.png';
import bk from '../../assets/Background.png';
import sad from '../../assets/sad.png';
import san from '../../assets/san.png';
import sk from '../../assets/sk.png';
import uro from '../../assets/uro.png';
import ubo from '../../assets/ubo.png';
import cv from '../../assets/cv.png';
import tap from '../../assets/tap.png';
import box from '../../assets/box.png';
import tr from '../../assets/tr.png';
import chem from '../../assets/chem.png';
import workers from '../../assets/Background (6).png';


const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  className="text-neutral-400 shrink-0">
    
    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

    </svg>  
     
   );

const LocationIcon = () => (
  <svg  width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-400 shrink-0">
  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"  strokeLinejoin="round"/>
  <path  d="M12 22C14 18 20 15.4 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 15.4 10 18 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

 </svg>
);

const CheckIcon = () => (
  <svg  width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#fca311] shrink-0 mt-1">
    
  <circle cx="12" cy="12" r="10" fill="#fca311" />
    <path d="M8.5 12.5L11 15L16 9"   stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  
 
   </svg>
);

function HomePage() {
  const popularSearches = ['Santexnika', 'Yuk tashish', "Bog'dorchilik"];

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

          <div className="bg-white rounded-[20px] p-2 flex flex-col md:flex-row items-center w-full max-w-[920px] shadow-2xl mb-8 min-h-[74px] box-border">
            
            <div className="flex items-center flex-grow h-full py-3 px-4 border-b md:border-b-0 md:border-r border-neutral-200 w-full md:w-auto">
              <SearchIcon />
              <input
                type="text"
                placeholder="Qanday ish qidiryapsiz? (Masalan: yer og'darish)"
                className="flex-grow ml-3 text-[15px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none bg-transparent"
              />
            </div>

            <div className="flex items-center flex-grow h-full py-3 px-4 w-full md:w-auto md:max-w-[240px]">
              <LocationIcon />
              <input type="text"  placeholder="Shahar..." className="flex-grow ml-3 text-[15px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none bg-transparent"/>
               
              </div>

            <button className="bg-[#fca311] hover:bg-[#e0900f] text-neutral-900 font-bold text-[16px] h-[54px] px-10 rounded-[14px] transition-all duration-200 mt-2 md:mt-0 w-full md:w-auto shrink-0 active:scale-[0.98]">
              Izlash
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="text-neutral-400 text-[14px] font-medium">Ommabop:</span>
            <div className="flex flex-wrap gap-2 justify-center">
              {popularSearches.map((job) => (
                <span key={job}  className="bg-[#3e4a63] text-neutral-200 text-[13px] py-1.5 px-4 rounded-full font-medium">

                 
                
                  {job}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      <section className="w-full py-16 px-4">
        <div className="w-full max-w-[1280px] m-auto"> 
          <h1 className="text-[24px] font-[600] text-[#191C1E]">Yo'nalishlar bo'yicha qidiring</h1>
          <p className="text-[16px] text-[#545F73]">Sizга mos keladigan ish toifasini tanlang</p>

          <div className='mt-8 flex flex-wrap justify-between gap-6'>
            
            <div className='w-[400px] h-[272px] rounded-[12px] shadow-md hover:shadow-lg transition-shadow duration-300'>
              <img src={first} alt="Container" className='object-cover rounded-[12px]' />
              <div className ="flex items-center gap-2 p-4">
                <img src={bk} alt="Background" className='object-cover rounded-[12px]' />
                <b className="text-[20px] font-bold text-[#191C1E]">Qurilish</b>
              </div>
            </div>

            <div className='w-[400px] h-[272px] rounded-[12px] shadow-md hover:shadow-lg transition-shadow duration-300'>
              <img src={sad} alt="Container" className='object-cover rounded-[12px]' />
              <div className ="flex items-center gap-2 p-4">
                <img src={cv} alt="Background" className='object-cover rounded-[12px]' />
                <b className="text-[20px] font-bold text-[#191C1E]">Bog'bonchilik</b>
              </div>
            </div>

            <div className='w-[400px] h-[272px] rounded-[12px] shadow-md hover:shadow-lg transition-shadow duration-300'>
              <img src={san} alt="Container" className='object-cover rounded-[12px] ' />
              <div className ="flex items-center gap-2 p-4">
                <img src={tap} alt="Background" className='object-cover rounded-[12px]' />
                <b className="text-[20px] font-bold text-[#191C1E]">Santexnika</b>
              </div>
            </div>

            <div className='w-[400px] h-[272px] rounded-[12px] shadow-md hover:shadow-lg transition-shadow duration-300'>
              <img src={sk} alt="Container" className='object-cover rounded-[12px]' />
              <div className ="flex items-center gap-2 p-4">
                <img src={box} alt="Background" className='object-cover rounded-[12px]' />
                <b className="text-[20px] font-bold text-[#191C1E]">Yuk ortish</b>
              </div>
            </div>

            <div className='w-[400px] h-[272px] rounded-[12px] shadow-md hover:shadow-lg transition-shadow duration-300'>
              <img src={uro} alt="Container" className='object-cover rounded-[12px]' />
              <div className ="flex items-center gap-2 p-4">
                <img src={tr} alt="Background" className='object-cover rounded-[12px]' />
                <b className="text-[20px] font-bold text-[#191C1E]">Mavsumiy terim</b>
              </div>
            </div>

            <div className='w-[400px] h-[272px] rounded-[12px] shadow-md hover:shadow-lg transition-shadow duration-300'>
              <img src={ubo} alt="Container" className='object-cover rounded-[12px]' />
              <div className ="flex items-center gap-2 p-4">
                <img src={chem} alt="Background" className='object-cover rounded-[12px]' />
                <b className="text-[20px] font-bold text-[#191C1E]">Uy xizmatlari</b>
              </div>
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
                  <h4 className="text-[#191C1E] font-bold text-[16px] md:text-[17px] mb-1">
                    Ishonchli xodimlar
                  </h4>
                  <p className="text-[#545F73] text-[14px] md:text-[15px] leading-relaxed">
                    Har bir ishchining reytingi va avvalgi ishlari haqida fikrlar mavjud.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckIcon />
                <div>
                  <h4 className="text-[#191C1E] font-bold text-[16px] md:text-[17px] mb-1">
                    Tezkor aloqa
                  </h4>
                  <p className="text-[#545F73] text-[14px] md:text-[15px] leading-relaxed">
                    O'zingizga ma'qul nomzod bilan bir necha daqiqada bog'laning.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckIcon />
                <div>
                  <h4 className="text-[#191C1E] font-bold text-[16px] md:text-[17px] mb-1">
                    Xavfsiz to'lovlar
                  </h4>
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
              <img src={workers} alt="Kunlikish"  className="w-full h-auto object-cover block"/>
               
                </div>
          </div>

        </div>
      </section>

    </>
  );
}

export default HomePage;
   
   
  
  


    
     
     
     
     
      
     
   
 

 
   
   
   

      
 
      
     
    


      
     
     
    
  
               
              
            
               
              
           
   
  
    
     
   
     
      
      
    
  
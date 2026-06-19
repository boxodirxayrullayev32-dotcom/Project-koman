import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#525e75] text-[#cbd5e1] py-8 px-4 flex flex-col items-center justify-center font-sans select-none">
      {/* Brend nomi */}
      <div className="text-[#f59e0b] text-xl font-bold mb-4 tracking-wide">
        KunlikIsh
      </div>

      {/* Navigatsiya havolalari */}
      <div className="flex flex-wrap justify-center items-center gap-4 text-sm md:text-base mb-4 opacity-90">
        <a href="#biz-haqimizda" className="hover:text-white transition-colors duration-200">
          Biz haqimizda
        </a>
        <a href="#foydalanish-shartlari" className="hover:text-white transition-colors duration-200">
          Foydalanish shartlari
        </a>
        <a href="#maxfiylik-siyosati" className="hover:text-white transition-colors duration-200">
          Maxfiylik siyosati
        </a>
        <a href="#boglanish" className="hover:text-white transition-colors duration-200">
          Bog'lanish
        </a>
      </div>

      {/* Mualliflik huquqi */}
      <div className="text-xs md:text-sm text-center opacity-70">
        &copy; 2026 KunlikIsh. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
};

export default Footer;
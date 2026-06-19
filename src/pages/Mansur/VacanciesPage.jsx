import React, { useState } from 'react';

function VacanciesPage() {
  const [chats, setChats] = useState([
    {
      id: 1,
      name: 'Laziza Karimova',
      status: 'Onlayn',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      job: "G'isht terish (Chilonzor)",
      price: '250,000 UZS / kun',
      lastMessageTime: '10:45',
      messages: [
        { id: 1, sender: 'them', text: "Assalomu alaykum, Usta. Chilonzordagi ob'ektimizga ertaga 3 kishi kerak edi. G'isht terish bo'yicha tajribangiz qanaqa?", time: '10:40' },
        { id: 2, sender: 'me', text: "Vaalaykum assalom. Ha, tajriba bor, 8 yildan beri shu sohadamiz. Jamoamiz tayyor. Narxi bo'yicha kelishsak, ertaga boramiz.", time: '10:42' },
        { id: 3, sender: 'them', text: "Yaxshi. Kunlik 250 mingdan beramiz. Transportni o'zimiz hal qilamiz, soat 07:30 da metro Chilonzor bekatidan olib ketamiz. Ovqatlanish ham bizdan.", time: '10:44' },
        { id: 4, sender: 'me', text: "Kelishdik. Transport va ovqat bo'lsa, ma'qul. Ish soat necha tugaydi?", time: '10:45' },
        { id: 5, sender: 'them', text: 'Kechki 18:00 gacha. Agar rozib bo\'lsangiz, "Kelishuvni tasdiqlash" tugmasini bosing, manzilni tashlayman.', time: '10:45' }
      ]
    },
    {
      id: 2,
      name: "Laziz To'rayev",
      status: 'Oflayn',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      job: "Santexnika xizmati",
      price: '300,000 UZS / kun',
      lastMessageTime: 'Kecha',
      messages: [
        { id: 1, sender: 'them', text: "To'lov muvaffaqiyatli amalga oshirildi.", time: 'Kecha' }
      ]
    },
    {
      id: 3,
      name: 'Saidmurod Aliyev',
      status: 'Onlayn',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
      job: "Yuk tashish xizmati",
      price: '180,000 UZS / kun',
      lastMessageTime: 'Dushanba',
      messages: [
        { id: 1, sender: 'them', text: "Transport masalasini gaplashsak bo'ladimi?", time: 'Dushanba' }
      ]
    }
  ]);

  const [activeChatId, setActiveChatId] = useState(1);
  const [inputText, setInputText] = useState('');

  const activeChat = chats.find(c => c.id === activeChatId);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newMessage = {
      id: Date.now(),
      sender: 'me',
      text: inputText,
      time: currentTime
    };

    setChats(chats.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          lastMessageTime: currentTime,
          messages: [...chat.messages, newMessage]
        };
      }
      return chat;
    }));

    setInputText('');
  };

  return (
    <section className="w-full bg-[#f8fafc] min-h-[calc(100vh-70px)] flex justify-center items-stretch font-sans select-none box-border">
      <div className="w-full max-w-[1440px] bg-white flex border-l border-r border-neutral-200">
        
        <div className="w-[360px] border-r border-neutral-200 flex flex-col bg-white shrink-0">
          <div className="p-4 flex justify-between items-center border-b border-neutral-100">
            <h2 className="text-[20px] font-bold text-neutral-900">Xabarlar</h2>
            <button className="text-neutral-400 hover:text-neutral-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={`p-4 flex items-center gap-3 cursor-pointer transition-all border-b border-neutral-50 ${
                  chat.id === activeChatId ? 'bg-amber-50/60 border-l-4 border-[#fca311]' : 'hover:bg-neutral-50'
                }`}
              >
                <div className="relative shrink-0">
                  <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover border border-neutral-200" />
                  {chat.status === 'Onlayn' && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="font-bold text-[15px] text-neutral-800 truncate">{chat.name}</h4>
                    <span className="text-[11px] text-neutral-400 shrink-0">{chat.lastMessageTime}</span>
                  </div>
                  <p className="text-[13px] text-neutral-500 truncate">
                    {chat.messages[chat.messages.length - 1]?.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {activeChat ? (
          <div className="flex-grow flex flex-col bg-[#F9FAFB]">
            
            <div className="bg-white p-4 border-b border-neutral-200 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h3 className="font-bold text-[16px] text-neutral-900 leading-tight">{activeChat.name}</h3>
                    <span className={`text-[12px] flex items-center gap-1 ${activeChat.status === 'Onlayn' ? 'text-green-500 font-medium' : 'text-neutral-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${activeChat.status === 'Onlayn' ? 'bg-green-500' : 'bg-neutral-300'}`}></span>
                      {activeChat.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-4 text-neutral-400">
                  <button className="hover:text-neutral-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </button>
                  <button className="hover:text-neutral-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </button>
                </div>
              </div>
              
              <div className="bg-[#FFFBEB] border border-amber-100 rounded-lg p-2.5 flex justify-between items-center text-[13px] mt-1">
                <div className="flex items-center gap-1.5 text-amber-950 font-medium">
                  <span>💼 Ish: {activeChat.job}</span>
                </div>
                <span className="font-bold text-amber-700">{activeChat.price}</span>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-4">
              <div className="mx-auto bg-neutral-200/60 text-neutral-600 text-[11px] font-medium py-1 px-3 rounded-full mb-2">
                Suhbat boshlandi
              </div>

              {activeChat.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[70%] ${msg.sender === 'me' ? 'self-end items-end' : 'self-start items-start'}`}
                >
                  <div
                    className={`p-3.5 rounded-[16px] text-[14px] leading-relaxed shadow-sm ${
                      msg.sender === 'me'
                        ? 'bg-[#fca311] text-neutral-900 rounded-tr-none font-medium'
                        : 'bg-white text-neutral-800 rounded-tl-none border border-neutral-100'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-neutral-400 mt-1 px-1 flex items-center gap-1">
                    {msg.time} {msg.sender === 'me' && '✓✓'}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-white p-4 border-t border-neutral-200 flex flex-col gap-3">
              <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Xabar yozing..."
                  className="flex-grow bg-neutral-100 text-[14px] text-neutral-800 placeholder:text-neutral-400 py-3 px-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all"
                />
                <button
                  type="submit"
                  className="bg-neutral-100 hover:bg-amber-100 text-amber-600 p-3 rounded-xl transition-colors shrink-0"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </form>
              
              <button className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-bold py-3 px-4 rounded-xl flex justify-center items-center gap-2 transition-all shadow-md active:scale-[0.99] text-[14px]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Kelishuvni tasdiqlash
              </button>
            </div>

          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center bg-neutral-50 text-neutral-400">
            Suhbatni boshlash uchun biron bir chatni tanlang.
          </div>
        )}

      </div>
    </section>
  );
}

export default VacanciesPage;
import "../globals.css";

export default function RootLayout({ children, params }) {
  const navLabels = { 
    en: "Search", id: "Cari", ja: "検索", ms: "Cari", 
    zh: "搜索", es: "Buscar", "es-MX": "Buscar" 
  };
  const locale = params?.locale || 'en';
  const label = navLabels[locale] || navLabels.en;

  return (
    <html lang={locale}>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-[#F0F2F5] text-slate-900 antialiased">
        <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="font-black text-2xl text-orange-600 italic tracking-tighter">CAVI'S</h1>
              <input type="text" placeholder={`${label}...`} className="hidden md:block bg-gray-100 border-none rounded-full px-6 py-2 w-80 focus:ring-2 ring-orange-500 outline-none" />
            </div>
            <div className="flex gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              {['en', 'id', 'ja', 'es', 'zh', 'ms'].map(l => (
                <a key={l} href={`/${l}`} className="hover:text-orange-500">{l}</a>
              ))}
            </div>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto py-8 px-4">{children}</main>
      </body>
    </html>
  );
    }
    

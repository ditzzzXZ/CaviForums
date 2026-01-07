import "../globals.css";

export default function RootLayout({ children, params }) {
  // Safe locale detection
  const locale = params?.locale || 'en';
  
  return (
    <html lang={locale}>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-[#F0F2F5] text-slate-900 antialiased">
        <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <h1 className="font-black text-2xl text-orange-600 italic tracking-tighter">CAVI'S</h1>
            <div className="flex gap-4 text-xs font-bold uppercase text-gray-400">
              <a href="/en" className="hover:text-orange-600">EN</a>
              <a href="/id" className="hover:text-orange-600">ID</a>
              <a href="/ja" className="hover:text-orange-600">JA</a>
            </div>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto py-8 px-4">{children}</main>
      </body>
    </html>
  );
}

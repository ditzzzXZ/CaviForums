import "../globals.css";

export default function RootLayout({ children, params }) {
  // Add a fallback so it doesn't crash without middleware
  const locale = params?.locale || 'en'; 
  
  const navLabels = { 
    en: "Search", id: "Cari", ja: "検索", ms: "Cari", 
    zh: "搜索", es: "Buscar", "es-MX": "Buscar" 
  };
  const label = navLabels[locale] || navLabels.en;

  return (
    <html lang={locale}>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-[#F0F2F5] text-slate-900 antialiased">
         {/* ... (keep the rest of the nav and main code the same) ... */}
         {children}
      </body>
    </html>
  );
}

import { getForums, createForum, addReply } from "../../lib/db";
import { revalidatePath } from "next/cache";

export default async function Page({ params }) {
  const forums = await getForums();
  const dict = {
    en: { table: "Discussion Tables", upload: "Upload Forum", name: "Your Name", title: "Forum Title", desc: "Description", btn: "Post" },
    id: { table: "Meja Diskusi", upload: "Unggah Forum", name: "Nama Anda", title: "Judul Forum", desc: "Deskripsi", btn: "Kirim" },
    ja: { table: "議論テーブル", upload: "フォーラムを投稿", name: "お名前", title: "タイトル", desc: "説明", btn: "投稿" },
    ms: { table: "Meja Perbincangan", upload: "Muat Naik Forum", name: "Nama Anda", title: "Tajuk Forum", desc: "Penerangan", btn: "Hantar" },
    zh: { table: "讨论桌", upload: "上传论坛", name: "您的姓名", title: "论坛标题", desc: "内容描述", btn: "发布" },
    es: { table: "Mesas de Discusión", upload: "Subir Foro", name: "Tu Nombre", title: "Título del Foro", desc: "Descripción", btn: "Publicar" },
    "es-MX": { table: "Mesas de Plática", upload: "Subir Foro", name: "Tu Nombre", title: "Título", desc: "Descripción", btn: "Publicar" }
  }[params.locale] || dict.en;

  async function handleUpload(formData) {
    "use server";
    await createForum({
      id: Math.random().toString(36).substring(7),
      author: formData.get("name"),
      title: formData.get("title"),
      desc: formData.get("desc"),
      replies: []
    });
    revalidatePath(`/${params.locale}`);
  }

  return (
    <div className="flex flex-col md:flex-row gap-10">
      {/* SIDEBAR: UPLOAD AREA */}
      <aside className="md:w-1/3">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-orange-100 sticky top-24">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="bg-orange-500 text-white p-1 rounded">＋</span> {dict.upload}
          </h2>
          <form action={handleUpload} className="flex flex-col gap-4">
            <input name="name" placeholder={dict.name} required className="p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 ring-orange-400" />
            <input name="title" placeholder={dict.title} required className="p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 ring-orange-400 font-bold" />
            <textarea name="desc" placeholder={dict.desc} rows="4" required className="p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 ring-orange-400" />
            <button className="bg-orange-600 hover:bg-black text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-orange-200 uppercase tracking-widest text-sm">
              {dict.btn}
            </button>
          </form>
        </div>
      </aside>

      {/* FEED: DISCUSSION TABLES */}
      <section className="flex-1 space-y-8">
        <h2 className="text-3xl font-black italic text-slate-400 uppercase tracking-tighter">{dict.table}</h2>
        {forums.map((f) => (
          <div key={f.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 pb-4">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-bold hover:text-orange-600 cursor-pointer">{f.title}</h3>
                <span className="text-[10px] bg-gray-100 px-2 py-1 rounded font-mono uppercase tracking-widest text-gray-500">ID: {f.id}</span>
              </div>
              <p className="text-sm text-gray-400 mb-4 font-medium uppercase tracking-wide">u/{f.author}</p>
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 text-gray-700 italic text-lg leading-relaxed">
                "{f.desc}"
              </div>
            </div>

            {/* THE DISCUSSION TABLE INTERFACE */}
            <div className="bg-slate-50 border-t p-6">
              <div className="space-y-4 mb-6">
                {f.replies?.map((r, i) => (
                  <div key={i} className="flex gap-3 text-sm animate-in fade-in slide-in-from-left-2">
                    <div className="w-1 bg-orange-200 rounded"></div>
                    <div>
                      <span className="font-bold text-orange-700">{r.user}</span>
                      <p className="text-gray-600">{r.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input placeholder="..." className="flex-1 bg-white border rounded-full px-4 text-sm outline-none focus:ring-1 ring-orange-500" />
                <button className="text-orange-600 font-black text-xs uppercase hover:scale-105 transition">Reply</button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
         }
                       

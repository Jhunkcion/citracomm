"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { catalogDefaults, galleryDefaults, getCatalogItems, getGalleryItems, saveCatalogItems, saveGalleryItems, type CatalogItem, type GalleryItem } from "../lib/store-data";

type OrderStatus = "Diproses" | "Menunggu" | "Selesai";

type Order = {
  id: string;
  customer: string;
  product: string;
  date: string;
  total: string;
  status: OrderStatus;
};

const orders: Order[] = [
  { id: "CC-2048", customer: "Nadia Pratama", product: "Undangan Pernikahan", date: "24 Agu 2026", total: "Rp1.250.000", status: "Diproses" },
  { id: "CC-2047", customer: "Bima Studio", product: "Spanduk & Banner", date: "24 Agu 2026", total: "Rp420.000", status: "Menunggu" },
  { id: "CC-2046", customer: "Rizky Maulana", product: "Stempel Otomatis", date: "23 Agu 2026", total: "Rp185.000", status: "Selesai" },
  { id: "CC-2045", customer: "Toko Melati", product: "Stiker Custom", date: "23 Agu 2026", total: "Rp760.000", status: "Diproses" },
  { id: "CC-2044", customer: "Salsa Amelia", product: "Undangan Khitanan", date: "22 Agu 2026", total: "Rp890.000", status: "Selesai" },
];

const products = [
  { name: "Elegant Rose Gold", category: "Undangan", stock: "Tersedia", orders: 42, tone: "rose" },
  { name: "Spanduk Premium", category: "Spanduk", stock: "Tersedia", orders: 28, tone: "blue" },
  { name: "Stempel Flash 38mm", category: "Stempel", stock: "Menipis", orders: 16, tone: "gold" },
];

const bars = [42, 58, 47, 76, 68, 88, 64];

export default function AdminPage() {
  const [activeView, setActiveView] = useState("Ikhtisar");
  const [statusFilter, setStatusFilter] = useState<"Semua" | OrderStatus>("Semua");
  const [menuOpen, setMenuOpen] = useState(false);
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>(() => getCatalogItems());
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => getGalleryItems());
  const [catalogForm, setCatalogForm] = useState({ name: "", category: "Pernikahan", accent: "template-style-1" });
  const [galleryForm, setGalleryForm] = useState({ label: "", tone: 1 });

  useEffect(() => {
    saveCatalogItems(catalogItems);
  }, [catalogItems]);

  useEffect(() => {
    saveGalleryItems(galleryItems);
  }, [galleryItems]);

  const filteredOrders = statusFilter === "Semua" ? orders : orders.filter((order) => order.status === statusFilter);

  function handleCatalogSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = catalogForm.name.trim();
    if (!name) return;

    setCatalogItems((current) => [
      ...current,
      {
        id: `catalog-${Date.now()}`,
        name,
        category: catalogForm.category,
        accent: catalogForm.accent,
      },
    ]);

    setCatalogForm({ name: "", category: catalogForm.category, accent: catalogForm.accent });
  }

  function handleGallerySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const label = galleryForm.label.trim();
    if (!label) return;

    setGalleryItems((current) => [
      ...current,
      {
        id: `gallery-${Date.now()}`,
        label,
        tone: galleryForm.tone,
      },
    ]);

    setGalleryForm({ label: "", tone: galleryForm.tone });
  }

  return (
    <main className="admin-shell">
      <aside className={`admin-sidebar${menuOpen ? " open" : ""}`}>
        <div className="admin-brand"><span className="admin-brand-mark">✦</span><span>Citra Com <small>ADMIN</small></span></div>
        <div className="admin-profile"><div className="admin-avatar">AR</div><div><strong>Andi Rahman</strong><span>Administrator</span></div><span className="admin-online" /></div>
        <nav className="admin-nav" aria-label="Navigasi admin">
          {[
            ["⌂", "Ikhtisar"], ["▦", "Pesanan"], ["◈", "Produk"], ["♙", "Pengguna"], ["▤", "Laporan"],
          ].map(([icon, label]) => <button key={label} className={activeView === label ? "active" : ""} onClick={() => { setActiveView(label); setMenuOpen(false); }}><span>{icon}</span>{label}{label === "Pesanan" && <b>8</b>}</button>)}
          <div className="admin-nav-label">Sistem</div>
          <button><span>⚙</span>Pengaturan</button>
          <button><span>?</span>Bantuan</button>
        </nav>
        <div className="admin-sidebar-footer"><Link href="/">← Kembali ke toko</Link><button>⇥ Keluar</button></div>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar">
          <button className="admin-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Buka menu">☰</button>
          <div><p className="admin-eyebrow">Senin, 24 Agustus 2026</p><h1>{activeView}</h1></div>
          <div className="admin-top-actions"><button className="admin-icon-button" aria-label="Notifikasi">♧<i /></button><div className="admin-top-avatar">AR</div></div>
        </header>

        {activeView === "Ikhtisar" ? <>
          <div className="admin-welcome"><div><span className="admin-kicker">Pusat kendali Citra Com</span><h2>Selamat datang kembali, Andi.</h2><p>Pantau operasional toko dan pesanan terbaru Anda hari ini.</p></div><button className="admin-primary-button" onClick={() => setActiveView("Produk")}>＋ Tambah produk</button></div>
          <div className="admin-stat-grid">
            <article className="admin-stat-card"><div className="stat-icon stat-blue">↗</div><span>Penjualan bulan ini</span><strong>Rp24.680.000</strong><small className="up">↑ 18,4% <em>dari bulan lalu</em></small></article>
            <article className="admin-stat-card"><div className="stat-icon stat-gold">▦</div><span>Pesanan aktif</span><strong>48</strong><small className="up">↑ 12,8% <em>dari bulan lalu</em></small></article>
            <article className="admin-stat-card"><div className="stat-icon stat-green">♙</div><span>Pelanggan baru</span><strong>126</strong><small className="up">↑ 8,2% <em>dari bulan lalu</em></small></article>
            <article className="admin-stat-card"><div className="stat-icon stat-pink">★</div><span>Produk terjual</span><strong>384</strong><small className="down">↓ 3,1% <em>dari bulan lalu</em></small></article>
          </div>

          <div className="admin-content-grid">
            <article className="admin-panel admin-chart-panel"><div className="admin-panel-heading"><div><span className="admin-kicker">Performa penjualan</span><h3>Ringkasan pendapatan</h3></div><select defaultValue="7"><option value="7">7 hari terakhir</option><option value="30">30 hari terakhir</option></select></div><div className="admin-chart"><div className="chart-y"><span>Rp5jt</span><span>Rp3jt</span><span>Rp1jt</span><span>Rp0</span></div><div className="chart-bars">{bars.map((height, index) => <div className="chart-column" key={index}><div className="chart-bar" style={{ height: `${height}%` }} /><span>{["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"][index]}</span></div>)}</div></div></article>
            <article className="admin-panel"><div className="admin-panel-heading"><div><span className="admin-kicker">Aktivitas terbaru</span><h3>Pembaruan toko</h3></div><button className="admin-text-button">Lihat semua</button></div><div className="admin-activity"><p><i className="activity-blue" /><span><strong>Pesanan baru masuk</strong><small>Nadia Pratama · CC-2048</small></span><time>5 mnt</time></p><p><i className="activity-gold" /><span><strong>Stok produk diperbarui</strong><small>Stempel Flash 38mm</small></span><time>1 jam</time></p><p><i className="activity-green" /><span><strong>Pembayaran diterima</strong><small>Pesanan CC-2046</small></span><time>2 jam</time></p><p><i className="activity-pink" /><span><strong>Pengguna baru terdaftar</strong><small>rani.design@email.com</small></span><time>3 jam</time></p></div></article>
          </div>

          <div className="admin-lower-grid"><article className="admin-panel admin-orders-panel"><div className="admin-panel-heading"><div><span className="admin-kicker">Transaksi</span><h3>Pesanan terbaru</h3></div><button className="admin-text-button" onClick={() => setActiveView("Pesanan")}>Kelola pesanan →</button></div><OrderTable orders={orders.slice(0, 4)} /></article><article className="admin-panel"><div className="admin-panel-heading"><div><span className="admin-kicker">Inventaris</span><h3>Produk terlaris</h3></div><button className="admin-text-button" onClick={() => setActiveView("Produk")}>Kelola</button></div><div className="admin-products">{products.map((product) => <div className="admin-product" key={product.name}><div className={`product-thumb ${product.tone}`}>✦</div><span><strong>{product.name}</strong><small>{product.category} · {product.orders} pesanan</small></span><b className={product.stock === "Menipis" ? "low-stock" : "in-stock"}>{product.stock}</b></div>)}</div></article></div>
        </> : activeView === "Produk" ? (
          <div className="admin-panel admin-full-panel">
            <div className="admin-panel-heading">
              <div><span className="admin-kicker">Katalog & Galeri</span><h2>Produk</h2></div>
              <button className="admin-primary-button" onClick={() => setActiveView("Ikhtisar")}>Selesai</button>
            </div>

            <div className="admin-content-grid">
              <article className="admin-panel">
                <div className="admin-panel-heading">
                  <div><span className="admin-kicker">Katalog</span><h3>Kelola template</h3></div>
                </div>

                <form onSubmit={handleCatalogSubmit} className="auth-form">
                  <label className="field-group">
                    <span>Nama template</span>
                    <input value={catalogForm.name} onChange={(event) => setCatalogForm((current) => ({ ...current, name: event.target.value }))} placeholder="Contoh: Royal Classic" />
                  </label>

                  <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <label className="field-group">
                      <span>Kategori</span>
                      <select value={catalogForm.category} onChange={(event) => setCatalogForm((current) => ({ ...current, category: event.target.value }))}>
                        <option value="Pernikahan">Pernikahan</option>
                        <option value="Khitanan">Khitanan</option>
                        <option value="Ulang Tahun">Ulang Tahun</option>
                        <option value="Formal">Formal</option>
                      </select>
                    </label>

                    <label className="field-group">
                      <span>Style</span>
                      <select value={catalogForm.accent} onChange={(event) => setCatalogForm((current) => ({ ...current, accent: event.target.value }))}>
                        <option value="template-style-1">Style 1</option>
                        <option value="template-style-2">Style 2</option>
                        <option value="template-style-3">Style 3</option>
                        <option value="template-style-4">Style 4</option>
                        <option value="template-style-5">Style 5</option>
                        <option value="template-style-6">Style 6</option>
                        <option value="template-style-khitan-1">Khitan 1</option>
                        <option value="template-style-khitan-2">Khitan 2</option>
                        <option value="template-style-khitan-3">Khitan 3</option>
                        <option value="template-style-ultah-1">Ulang Tahun 1</option>
                        <option value="template-style-ultah-2">Ulang Tahun 2</option>
                        <option value="template-style-ultah-3">Ulang Tahun 3</option>
                        <option value="template-style-formal-1">Formal 1</option>
                        <option value="template-style-formal-2">Formal 2</option>
                      </select>
                    </label>
                  </div>

                  <button type="submit" className="primary-auth-button">Tambah ke katalog</button>
                </form>

                <div className="admin-products" style={{ marginTop: "18px" }}>
                  {catalogItems.map((item) => (
                    <div key={item.id} className="admin-product" style={{ alignItems: "flex-start" }}>
                      <div className={`product-thumb ${item.accent.includes("khitan") ? "gold" : item.accent.includes("ultah") ? "rose" : item.accent.includes("formal") ? "blue" : "blue"}`}>✦</div>
                      <span>
                        <strong>{item.name}</strong>
                        <small>{item.category}</small>
                      </span>
                      <button type="button" className="text-button" onClick={() => setCatalogItems((current) => current.filter((entry) => entry.id !== item.id))}>Hapus</button>
                    </div>
                  ))}
                </div>
              </article>

              <article className="admin-panel">
                <div className="admin-panel-heading">
                  <div><span className="admin-kicker">Galeri</span><h3>Kelola tampilan galeri</h3></div>
                </div>

                <form onSubmit={handleGallerySubmit} className="auth-form">
                  <label className="field-group">
                    <span>Judul item</span>
                    <input value={galleryForm.label} onChange={(event) => setGalleryForm((current) => ({ ...current, label: event.target.value }))} placeholder="Contoh: Stiker Custom" />
                  </label>

                  <label className="field-group">
                    <span>Warna</span>
                    <select value={galleryForm.tone} onChange={(event) => setGalleryForm((current) => ({ ...current, tone: Number(event.target.value) }))}>
                      <option value={1}>Tone 1</option>
                      <option value={2}>Tone 2</option>
                      <option value={3}>Tone 3</option>
                      <option value={4}>Tone 4</option>
                      <option value={5}>Tone 5</option>
                      <option value={6}>Tone 6</option>
                    </select>
                  </label>

                  <button type="submit" className="primary-auth-button">Tambah ke galeri</button>
                </form>

                <div className="admin-products" style={{ marginTop: "18px" }}>
                  {galleryItems.map((item) => (
                    <div key={item.id} className="admin-product" style={{ alignItems: "flex-start" }}>
                      <div className={`product-thumb ${item.tone === 1 ? "rose" : item.tone === 2 ? "blue" : item.tone === 3 ? "gold" : item.tone === 4 ? "gold" : item.tone === 5 ? "rose" : "blue"}`}>✦</div>
                      <span>
                        <strong>{item.label}</strong>
                        <small>Gallery #{item.tone}</small>
                      </span>
                      <button type="button" className="text-button" onClick={() => setGalleryItems((current) => current.filter((entry) => entry.id !== item.id))}>Hapus</button>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        ) : (
          <div className="admin-panel admin-full-panel"><div className="admin-panel-heading"><div><span className="admin-kicker">Manajemen Citra Com</span><h2>{activeView}</h2></div><button className="admin-primary-button">＋ Tambah {activeView.toLowerCase()}</button></div>{activeView === "Pesanan" ? <><div className="admin-filters">{(["Semua", "Menunggu", "Diproses", "Selesai"] as const).map((filter) => <button key={filter} className={statusFilter === filter ? "active" : ""} onClick={() => setStatusFilter(filter)}>{filter}</button>)}</div><OrderTable orders={filteredOrders} /></> : <div className="admin-empty-state"><div>◈</div><h3>Ruang kerja {activeView.toLowerCase()}</h3><p>Modul pengelolaan ini siap dihubungkan ke data aplikasi.</p></div>}</div>
        )}
      </section>
    </main>
  );
}

function OrderTable({ orders: visibleOrders }: { orders: Order[] }) {
  return <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>ID Pesanan</th><th>Pelanggan</th><th>Produk</th><th>Tanggal</th><th>Total</th><th>Status</th></tr></thead><tbody>{visibleOrders.map((order) => <tr key={order.id}><td><strong>{order.id}</strong></td><td>{order.customer}</td><td>{order.product}</td><td>{order.date}</td><td><strong>{order.total}</strong></td><td><span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span></td></tr>)}</tbody></table></div>;
}

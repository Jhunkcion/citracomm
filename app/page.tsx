"use client";

import { FormEvent, PointerEvent, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { getCatalogItems, getGalleryItems, type CatalogItem, type GalleryItem } from "./lib/store-data";

const services = [
  {
    title: "Undangan Pernikahan",
    description: "Koleksi desain undangan pernikahan elegan dengan berbagai pilihan tema, bahan, dan finishing premium.",
    color: "#60a5fa",
  },
  { title: "Undangan Khitanan", description: "Desain undangan khitanan dengan nuansa Islami yang khas, tersedia dalam berbagai model menarik.", color: "#8b5cf6" },
  { title: "Undangan Ulang Tahun", description: "Undangan ulang tahun ceria dengan desain playful dan warna-warni yang meriah.", color: "#ec4899" },
  { title: "Undangan Acara Formal", description: "Undangan profesional untuk seminar, rapat, launching, dan acara korporat lainnya.", color: "#10b981" },
  {
    title: "Stempel Kayu & Otomatis",
    description: "Stempel untuk kantor, usaha, identitas brand, dan kebutuhan administrasi harian.",
    color: "#f59e0b",
  },
  {
    title: "Spanduk & Banner",
    description: "Cetak spanduk promosi dan banner event dengan material tahan lama dan warna tajam.",
    color: "#ef4444",
  },
  {
    title: "Stiker & Percetakan Umum",
    description: "Stiker custom, kartu nama, brosur, nota, kop surat, dan kebutuhan cetak lain.",
    color: "#a78bfa",
  },
  { title: "Percetakan Umum", description: "Kartu nama, brosur, nota, kop surat, amplop, dan berbagai kebutuhan cetak lainnya.", color: "#6366f1" },
];

const benefits = [
  "Desain sesuai kebutuhan bisnis dan acara",
  "Material premium dengan hasil cetak presisi",
  "Proses cepat, aman, dan komunikatif",
  "Konsultasi gratis untuk kebutuhan custom",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bannerWidth, setBannerWidth] = useState(100);
  const [bannerHeight, setBannerHeight] = useState(100);
  const [materialMultiplier, setMaterialMultiplier] = useState(1);
  const [notice, setNotice] = useState<string | null>(null);
  const [catalogFilter, setCatalogFilter] = useState("semua");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [catalogItems] = useState<CatalogItem[]>(() => getCatalogItems());
  const [galleryItems] = useState<GalleryItem[]>(() => getGalleryItems());

  const catalogCategories = Array.from(new Set(catalogItems.map((item) => item.category)));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bannerPrice = (bannerWidth / 100) * (bannerHeight / 100) * 35000 * materialMultiplier;
  const formatRupiah = (value: number) => new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      "Halo Citra Com,", "",
      `*Nama:* ${form.get("nama")}`, `*Telepon:* ${form.get("telepon")}`,
      `*Layanan:* ${form.get("layanan")}`, `*Pesan:* ${form.get("pesan")}`,
    ].join("\n");
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    event.currentTarget.reset();
    setNotice("Pesan Anda sedang dikirim via WhatsApp!");
  }

  function updateFromResize(event: PointerEvent<HTMLButtonElement>) {
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = bannerWidth;
    const startHeight = bannerHeight;
    const handleMove = (moveEvent: globalThis.PointerEvent) => {
      setBannerWidth(Math.min(600, Math.max(100, Math.round((startWidth + (moveEvent.clientX - startX) / 0.85) / 5) * 5)));
      setBannerHeight(Math.min(400, Math.max(100, Math.round((startHeight + (moveEvent.clientY - startY) / 0.85) / 5) * 5)));
    };
    const handleUp = () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp, { once: true });
  }

  return (
    <main className="citra-page">
      <nav className={`navbar${scrolled ? " scrolled" : ""}`} id="navbar">
        <div className="container nav-container">
          <a href="#beranda" className="nav-logo">Citra Com</a>

          <ul className={`nav-links${menuOpen ? " active" : ""}`}>
            <li><a href="#beranda" className="nav-link active">Beranda</a></li>
            <li><a href="#tentang" className="nav-link">Tentang</a></li>
            <li><a href="#layanan" className="nav-link">Layanan</a></li>
            <li><a href="#ukuran" className="nav-link">Spanduk</a></li>
            <li><a href="#katalog" className="nav-link">Katalog</a></li>
            <li><a href="#galeri" className="nav-link">Galeri</a></li>
            <li><a href="#kontak" className="nav-link">Kontak</a></li>
          </ul>

          <a href="#kontak" className="nav-cta">Hubungi Kami</a>
          <button className={`hamburger${menuOpen ? " active" : ""}`} type="button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <section className="hero" id="beranda">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <span className="hero-badge">Percetakan undangan, stempel, spanduk, dan stiker</span>
          <h1 className="hero-title">Cetak rapi untuk acara, usaha, dan kebutuhan harian.</h1>
          <p className="hero-subtitle">
            Citra Com membantu menyiapkan desain dan produksi cetak dengan proses jelas, hasil bersih,
            dan layanan yang mudah dihubungi di Medan dan sekitarnya.
          </p>
          <div className="hero-notice">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Saat ini melayani pemesanan &amp; pengiriman khusus <strong>wilayah Medan dan sekitarnya</strong>
          </div>
          <div className="hero-buttons">
            <a href="#katalog" className="btn btn-primary">Lihat Katalog</a>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="btn btn-secondary">WhatsApp Kami</a>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      <section className="section tentang" id="tentang">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Tentang Kami</span>
            <h2 className="section-title">Percetakan lokal yang mudah diajak bicara.</h2>
            <p className="section-desc">Kami bantu dari pemilihan bahan, penyesuaian desain, sampai hasil cetak siap ambil atau dikirim.</p>
          </div>

          <div className="tentang-content">
            <div className="tentang-text">
              <h3>Dikerjakan teliti, dikabari jelas.</h3>
              <p>Citra Com melayani kebutuhan cetak untuk acara keluarga, usaha kecil, kantor, dan promosi. Mulai dari undangan, stempel, spanduk, banner, stiker, sampai cetakan umum.</p>
              <p>Setiap pesanan dicek dari ukuran, file desain, bahan, dan estimasi pengerjaan supaya hasil akhirnya sesuai kebutuhan.</p>

              <div className="tentang-highlights">
                {benefits.map((benefit) => (
                  <div key={benefit} className="highlight-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="tentang-features">
              <div className="feature-card">
                <div className="feature-icon">★</div>
                <h4>Kualitas Terjamin</h4>
                <p>Menggunakan bahan premium dan teknologi cetak terkini untuk hasil maksimal.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⏱</div>
                <h4>Proses Cepat</h4>
                <p>Pengerjaan efisien dengan estimasi waktu yang jelas dan tepat.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">❤</div>
                <h4>Layanan Terbaik</h4>
                <p>Konsultasi gratis dan revisi desain hingga Anda puas dengan hasilnya.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">₨</div>
                <h4>Harga Terjangkau</h4>
                <p>Harga kompetitif untuk semua layanan tanpa mengurangi kualitas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section layanan" id="layanan">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Layanan Kami</span>
            <h2 className="section-title">Layanan cetak yang paling sering dipesan.</h2>
            <p className="section-desc">Pilih kebutuhan Anda, lalu hubungi kami untuk cek bahan, ukuran, harga, dan waktu pengerjaan.</p>
          </div>

          <div className="layanan-grid">
            {services.map((item) => (
              <div key={item.title} className="layanan-card" style={{ borderColor: `${item.color}88` }}>
                <div className="layanan-card-icon" style={{ background: `${item.color}22`, color: item.color }}>
                  ✦
                </div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <a href="#kontak" className="layanan-link">Pesan Sekarang →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section ukuran" id="ukuran">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Spanduk</span>
            <h2 className="section-title">Hitung estimasi harga spanduk.</h2>
            <p className="section-desc">Geser lebar dan tinggi dalam centimeter. Harga dasar Rp35.000 per 1 x 1 meter atau 100 x 100 cm, lalu disesuaikan dengan pilihan bahan.</p>
          </div>

          <div className="size-lab">
            <div className="size-controls">
              <div className="size-control">
                <div className="size-control-head">
                  <label htmlFor="boxWidthRange">Lebar</label>
                  <output id="boxWidthValue" htmlFor="boxWidthRange">{bannerWidth} cm</output>
                </div>
                <input type="range" id="boxWidthRange" min="100" max="600" step="5" value={bannerWidth} onChange={(event) => setBannerWidth(Number(event.target.value))} />
              </div>

              <div className="size-control">
                <div className="size-control-head">
                  <label htmlFor="boxHeightRange">Tinggi</label>
                  <output id="boxHeightValue" htmlFor="boxHeightRange">{bannerHeight} cm</output>
                </div>
                <input type="range" id="boxHeightRange" min="100" max="400" step="5" value={bannerHeight} onChange={(event) => setBannerHeight(Number(event.target.value))} />
              </div>

              <fieldset className="material-options">
                <legend>Bahan</legend>
                <label className="material-option">
                  <input type="radio" name="bannerMaterial" value="1" checked={materialMultiplier === 1} onChange={() => setMaterialMultiplier(1)} />
                  <span><strong>Bahan biasa</strong><small>Harga normal</small></span>
                </label>
                <label className="material-option">
                  <input type="radio" name="bannerMaterial" value="2" checked={materialMultiplier === 2} onChange={() => setMaterialMultiplier(2)} />
                  <span><strong>MMT / hitam</strong><small>2x harga sementara</small></span>
                </label>
              </fieldset>

              <div className="price-box">
                <span>Estimasi harga</span>
                <strong>{formatRupiah(bannerPrice)}</strong>
                <small>{(bannerWidth / 100).toFixed(2)} x {(bannerHeight / 100).toFixed(2)} m x Rp35.000 x {materialMultiplier}</small>
              </div>
            </div>

            <div className="size-stage">
                <div className="size-preview-box" style={{ "--box-width": `${180 + (bannerWidth - 100) * 0.85}px`, "--box-height": `${180 + (bannerHeight - 100) * 0.85}px` } as CSSProperties}>
                <div className="size-preview-content">
                  <span className="size-preview-kicker">Preview Spanduk</span>
                  <strong>{bannerWidth} x {bannerHeight} cm</strong>
                  <small>Tarik sudut untuk resize.</small>
                </div>
                <button className="size-resize-handle" type="button" aria-label="Tarik untuk mengubah ukuran spanduk" onPointerDown={updateFromResize} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section katalog" id="katalog">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Katalog Template</span>
            <h2 className="section-title">Contoh arah desain undangan.</h2>
            <p className="section-desc">Template dapat disesuaikan nama, warna, susunan teks, dan detail acara.</p>
          </div>

           <div className="catalog-filters">
             {["semua", ...catalogCategories].map((filterValue) => (
               <button key={filterValue} type="button" className={`filter-btn${catalogFilter === filterValue ? " active" : ""}`} onClick={() => setCatalogFilter(filterValue)}>{filterValue === "semua" ? "Semua" : filterValue}</button>
             ))}
           </div>
           <div className="catalog-grid">
             {catalogItems.map((item, index) => (
               <div key={item.id} className={`template-card${catalogFilter !== "semua" && item.category !== catalogFilter ? " hidden" : ""}`}>
                 <div className={`template-image ${item.accent}`}>
                   <div className="template-preview">
                     <div className="template-ornament">{index % 2 === 0 ? "❧" : "✿"}</div>
                     <span className="template-couple">{item.category === "Pernikahan" ? "Andi & Sari" : item.category === "Khitanan" ? "Rizky & Fadli" : item.category === "Ulang Tahun" ? "Bunga & Raka" : "Executive Team"}</span>
                     <span className="template-date-preview">12 . 06 . 2026</span>
                   </div>
                   <span className="template-badge">{item.category}</span>
                 </div>
                 <div className="template-info">
                   <h4>{item.name}</h4>
                   <a href="#kontak" className="btn-pesan">Pesan Template</a>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </section>

      <section className="section galeri" id="galeri">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Galeri</span>
            <h2 className="section-title">Cuplikan hasil cetak.</h2>
            <p className="section-desc">Beberapa contoh kategori pekerjaan yang bisa Anda pesan di Citra Com.</p>
          </div>

          <div className="gallery-grid">
            {galleryItems.map((item) => (
              <button key={item.id} type="button" className="gallery-item" onClick={() => setLightbox(item)}>
                <div className={`gallery-thumb gallery-bg-${item.tone}`} />
                <div className="gallery-overlay">
                  <span>{item.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="lightbox active" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}>
          <button type="button" className="lightbox-close" aria-label="Tutup" onClick={() => setLightbox(null)}>×</button>
          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <div className={`lightbox-image gallery-bg-${lightbox.tone}`} />
            <p className="lightbox-caption">{lightbox.label}</p>
          </div>
        </div>
      )}

      <section className="section kontak" id="kontak">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Hubungi Kami</span>
            <h2 className="section-title">Kirim detail pesanan Anda.</h2>
            <p className="section-desc">Ceritakan jenis cetakan, ukuran, jumlah, dan kapan dibutuhkan. Kami bantu cek estimasinya.</p>
          </div>

          <div className="kontak-content">
            <div className="kontak-info">
              <div className="kontak-info-card">
                <div className="kontak-icon">📍</div>
                <div>
                  <h4>Alamat</h4>
                  <p>Jl. Contoh Alamat No. 123<br />Medan, Sumatera Utara</p>
                </div>
              </div>
              <div className="kontak-info-card">
                <div className="kontak-icon">📞</div>
                <div>
                  <h4>Telepon</h4>
                  <p>0812-3456-7890</p>
                </div>
              </div>
              <div className="kontak-info-card">
                <div className="kontak-icon">✉</div>
                <div>
                  <h4>Email</h4>
                  <p>info@citracom.com</p>
                </div>
              </div>
              <div className="kontak-info-card">
                <div className="kontak-icon">🕒</div>
                <div>
                  <h4>Jam Operasional</h4>
                  <p>Senin — Sabtu: 08.00 — 17.00</p>
                </div>
              </div>
            </div>

            <div className="kontak-form-wrapper">
              <form className="kontak-form" onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label htmlFor="nama">Nama Lengkap</label>
                  <input type="text" id="nama" name="nama" placeholder="Masukkan nama Anda" required />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="telepon">No. Telepon</label>
                    <input type="tel" id="telepon" name="telepon" placeholder="08xxxxxxxxxx" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="layanan">Layanan</label>
                    <select id="layanan" name="layanan" required>
                      <option value="" disabled>Pilih layanan</option>
                      <option>Undangan Pernikahan</option>
                      <option>Undangan Khitanan</option>
                      <option>Undangan Ulang Tahun</option>
                      <option>Stempel</option>
                      <option>Spanduk &amp; Banner</option>
                      <option>Stiker</option>
                      <option>Percetakan Umum</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="pesan">Pesan</label>
                  <textarea id="pesan" name="pesan" rows={4} placeholder="Jelaskan kebutuhan Anda..." required />
                </div>

                <button type="submit" className="btn btn-primary btn-full">Kirim Pesan</button>
              </form>
              {notice && <p className="notification notification-success" role="status">{notice}</p>}
            </div>
          </div>
        </div>
      </section>

      <section className="map-section" id="map">
        <div className="container">
          <div className="map-header">
            <h3>Temukan Kami</h3>
            <p>Kunjungi toko kami langsung untuk melihat sampel produk dan konsultasi tatap muka.</p>
          </div>
          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127402.73031026046!2d98.60334260381665!3d3.595195610815252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303131ab1a123f05%3A0x7d0a256df5384666!2sMedan%2C%20Kota%20Medan%2C%20Sumatera%20Utara!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Citra Com"
            />
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <a href="#beranda" className="footer-logo">Citra Com</a>
              <p>Mitra percetakan terpercaya untuk setiap kebutuhan cetak Anda. Kualitas terbaik, harga terjangkau.</p>
            </div>

            <div className="footer-links">
              <h4>Navigasi</h4>
              <ul>
                <li><a href="#beranda">Beranda</a></li>
                <li><a href="#tentang">Tentang Kami</a></li>
                <li><a href="#layanan">Layanan</a></li>
                <li><a href="#katalog">Katalog</a></li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Layanan</h4>
              <ul>
                <li><a href="#katalog">Undangan</a></li>
                <li><a href="#layanan">Stempel</a></li>
                <li><a href="#ukuran">Spanduk</a></li>
                <li><a href="#layanan">Stiker</a></li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Kontak</h4>
              <ul>
                <li>Jl. Contoh Alamat No. 123, Medan</li>
                <li>0812-3456-7890</li>
                <li>info@citracom.com</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Citra Com. Seluruh hak cipta dilindungi.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

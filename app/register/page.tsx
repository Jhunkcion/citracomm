"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("Andi Rahman");
  const [email, setEmail] = useState("admin@citracom.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const safeName = name.trim();
    const safeEmail = email.trim().toLowerCase();
    const safePassword = password.trim();

    if (!safeName || !safeEmail || !safePassword) {
      setError("Semua field harus diisi.");
      return;
    }

    if (safeEmail.includes("@") && safePassword.length >= 6) {
      localStorage.setItem("citra_admin_authenticated", "true");
      router.push("/admin");
      return;
    }

    setError("Format data tidak valid.");
  }

  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <div className="auth-brand-block">
          <div className="auth-brand">
            <span className="auth-mark">✦</span>
            <div>
              <strong>Citra Com</strong>
              <small>Admin Portal</small>
            </div>
          </div>

          <h1>Buat akun admin baru</h1>
          <p>Daftarkan pengguna baru untuk membantu mengelola bisnis percetakan Anda.</p>

          <div className="auth-badges">
            <span>Tim</span>
            <span>Order</span>
            <span>Produk</span>
          </div>
        </div>

        <div className="auth-form-card">
          <div className="auth-header-row">
            <div>
              <span className="mini-tag">Akses admin</span>
              <h2>Register</h2>
            </div>
            <Link href="/" className="text-link">← Kembali</Link>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <label className="field-group">
              <span>Nama lengkap</span>
              <input type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Nama lengkap" required />
            </label>

            <label className="field-group">
              <span>Email</span>
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nama@email.com" required />
            </label>

            <label className="field-group">
              <span>Password</span>
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Minimal 6 karakter" required />
            </label>

            {error ? <p className="auth-error">{error}</p> : null}

            <button type="submit" className="primary-auth-button">Buat akun</button>
          </form>

          <p className="switch-copy">
            Sudah punya akun?
            <Link href="/login">Masuk sekarang</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

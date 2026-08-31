"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const CREDENTIALS: Record<string, { password: string; role: "admin" | "user" }> = {
  "admin@citracom.com": { password: "admin123", role: "admin" },
  "user@citracom.com": { password: "user123", role: "user" },
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@citracom.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validEmail = email.trim().toLowerCase();
    const validPassword = password.trim();

    if (!validEmail || !validPassword) {
      setError("Silakan isi email dan password.");
      return;
    }

    const account = CREDENTIALS[validEmail];
    if (!account || account.password !== validPassword) {
      setError("Email atau password tidak valid.");
      return;
    }

    localStorage.setItem(
      "citra_auth",
      JSON.stringify({
        authenticated: true,
        role: account.role,
        email: validEmail,
      }),
    );

    router.push(account.role === "admin" ? "/admin" : "/");
  }

  return (
    <main className="auth-shell">
      <section className="auth-panel auth-panel-single">
        <div className="auth-form-card auth-form-card-single">
          <div className="auth-header-row auth-header-row-single">
            <div>
              <span className="mini-tag">Akun</span>
              <h2>Masuk</h2>
            </div>
            <Link href="/" className="text-link">← Beranda</Link>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <label className="field-group">
              <span>Email</span>
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nama@email.com" required />
            </label>

            <label className="field-group">
              <span>Password</span>
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Masukkan password" required />
            </label>

            <div className="auth-row">
              <label className="remember-wrap">
                <input type="checkbox" defaultChecked />
                <span>Ingat saya</span>
              </label>
              <button type="button" className="text-button">Lupa password?</button>
            </div>

            {error ? <p className="auth-error">{error}</p> : null}

            <button type="submit" className="primary-auth-button">Masuk</button>
          </form>

          <p className="switch-copy">
            Belum punya akun?
            <Link href="/register">Daftar</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

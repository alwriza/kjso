"use client";

import { useState, useEffect } from "react";

type Mode = "register" | "edit";

// ── data ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Этапы", href: "/#stages" },
  { label: "О нас", href: "/#about" },
  { label: "Галерея", href: "/#gallery" },
  { label: "Партнёры", href: "/#partners" },
];

// ── shared styles ─────────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid rgba(13,13,20,0.12)",
  borderRadius: 12,
  padding: "12px 16px",
  fontSize: 14,
  fontFamily: "var(--font-body)",
  color: "var(--color-ink)",
  background: "#fff",
  outline: "none",
  transition: "border-color 0.2s",
  appearance: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "rgba(13,13,20,0.4)",
  marginBottom: 8,
  fontFamily: "var(--font-body)",
};

const btnPrimaryStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--color-violet)",
  color: "#fff",
  border: "none",
  borderRadius: 999,
  padding: "15px 24px",
  fontSize: 14,
  fontWeight: 700,
  fontFamily: "var(--font-body)",
  cursor: "pointer",
  letterSpacing: "0.03em",
  transition: "opacity 0.15s",
};
// ── Navbar ───────────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background 0.35s, backdrop-filter 0.35s, border-color 0.35s",
        background: scrolled ? "rgba(245,244,240,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(13,13,20,0.08)" : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          height: 68,
          display: "flex",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Logo */}
        <a href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <span
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontWeight: 800,
              fontSize: 18,
              letterSpacing: "-0.03em",
              color: "#4b16a3",
            }}
          >
            KJSO
          </span>
          <span
            style={{
              fontFamily: "Cocomat Pro, sans-serif",
              fontSize: 11,
              color: "rgba(13,13,20,0.45)",
              marginLeft: 8,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            2026
          </span>
        </a>

        {/* Links */}
        <div style={{ display: "flex", gap: 32, marginLeft: "auto", alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "Cocomat Pro, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: "rgba(13,13,20,0.55)",
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#4b16a3")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(13,13,20,0.55)")}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/registration"
            style={{
              fontFamily: "Cocomat Pro, sans-serif",
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
              background: "#4b16a3",
              borderRadius: 999,
              padding: "9px 22px",
              textDecoration: "none",
              letterSpacing: "0.04em",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Регистрация
          </a>
        </div>
      </div>
    </nav>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      style={{
        background: "#0D0D14",
        padding: "48px 40px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 24,
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontWeight: 800,
              fontSize: 18,
              color: "#fff",
              letterSpacing: "-0.03em",
            }}
          >
            KJSO
          </span>
          <span
            style={{
              fontFamily: "Cocomat Pro, sans-serif",
              fontSize: 11,
              color: "rgba(255,255,255,0.2)",
              marginLeft: 10,
              letterSpacing: "0.1em",
            }}
          >
            Kazakhstan Junior Science Olympiad
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: 32,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "Cocomat Pro, sans-serif",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.3)",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div
          style={{
            fontFamily: "Cocomat Pro, sans-serif",
            fontSize: 11,
            color: "rgba(255,255,255,0.18)",
            letterSpacing: "0.06em",
          }}
        >
          © 2026 KJSO
        </div>
      </div>
    </footer>
  );
}
// ── ErrorBox ──────────────────────────────────────────────────────────────────

function ErrorBox({ msg }: { msg: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        background: "rgba(220,38,38,0.06)",
        border: "1px solid rgba(220,38,38,0.2)",
        borderRadius: 12,
        padding: "14px 16px",
        marginBottom: 20,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
        <circle cx="8" cy="8" r="7" stroke="#dc2626" strokeWidth="1.5" />
        <path d="M8 5v4M8 11v.5" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#b91c1c", lineHeight: 1.5 }}>
        {msg}
      </p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RegistrationPage() {
  const [mode, setMode] = useState<Mode>("register");
  const [consent, setConsent] = useState(false);
  const [participantId, setParticipantId] = useState<number | null>(null);
  const [findEmail, setFindEmail] = useState("");
  const [error, setError] = useState("");
  const [findError, setFindError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successName, setSuccessName] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    fullNameLatin: "",
    email: "",
    grade: "",
    school: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const clearForm = () =>
    setFormData({ fullName: "", fullNameLatin: "", email: "", grade: "", school: "" });

  const handleSwitchMode = (newMode: Mode) => {
    setMode(newMode);
    clearForm();
    setError("");
    setFindError("");
    setConsent(false);
    setParticipantId(null);
    setFindEmail("");
  };

  const handleFindParticipant = async () => {
    const email = findEmail.trim();
    if (!email) return;
    setFindError("");
    setLoading(true);
    try {
      const res = await fetch(`/api/participants?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (!res.ok) { setFindError(data.error || "Ошибка при поиске"); return; }
      setFormData({
        fullName: data.full_name || "",
        fullNameLatin: data.full_name_latin || "",
        email: data.email || "",
        grade: data.grade || "",
        school: data.school || "",
      });
      setParticipantId(data.id);
    } catch {
      setFindError("Ошибка при поиске участника");
    } finally {
      setLoading(false);
    }
  };

  const resetFind = () => {
    setFindEmail("");
    setFindError("");
    clearForm();
    setParticipantId(null);
  };

  const validateForm = () => {
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.fullName.trim())       { setError("Введите ФИО на кириллице."); return false; }
    if (!formData.fullNameLatin.trim())  { setError("Введите ФИО на латинице."); return false; }
    if (!formData.email.trim())          { setError("Введите email."); return false; }
    if (!emailRx.test(formData.email))   { setError("Введите корректный email."); return false; }
    if (!formData.grade)                 { setError("Выберите класс."); return false; }
    if (!formData.school.trim())         { setError("Укажите школу."); return false; }
    if (mode === "register" && !consent) { setError("Согласитесь с условиями обработки данных."); return false; }
    return true;
  };

  const handleSubmit = async () => {
    setError("");
    if (!validateForm()) return;
    setLoading(true);
    try {
      const isRegister = mode === "register";
      const res = await fetch(isRegister ? "/api/register" : "/api/participants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isRegister
            ? { full_name: formData.fullName, full_name_latin: formData.fullNameLatin, email: formData.email, grade: formData.grade, school: formData.school }
            : { participant_id: participantId, full_name: formData.fullName, full_name_latin: formData.fullNameLatin, email: formData.email, grade: formData.grade, school: formData.school }
        ),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Ошибка"); return; }
      setSuccessName(formData.fullName);
      setSuccess(true);
    } catch {
      setError("Ошибка при отправке данных");
    } finally {
      setLoading(false);
    }
  };

  // ── SUCCESS SCREEN ──────────────────────────────────────────────────────────

  if (success) {
    return (
      <div
        style={{
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
          background: "var(--color-surface)",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 440 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "rgba(75,22,163,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 28px",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M5 14L11 20L23 8" stroke="#4b16a3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(22px,4vw,30px)",
              letterSpacing: "-0.03em",
              color: "var(--color-ink)",
              marginBottom: 12,
            }}
          >
            {mode === "register" ? "Регистрация прошла успешно!" : "Данные обновлены!"}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              lineHeight: 1.65,
              color: "var(--color-ink-60)",
              marginBottom: 36,
            }}
          >
            Участник <strong style={{ color: "var(--color-ink)" }}>{successName}</strong> успешно{" "}
            {mode === "register" ? "зарегистрирован" : "обновлён"}. Подтверждение отправлено на
            указанный email.
          </p>
          <button
            onClick={() => { setSuccess(false); handleSwitchMode("register"); }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: 700,
              color: "var(--color-violet)",
              background: "none",
              border: "none",
              borderBottom: "1px solid rgba(75,22,163,0.3)",
              cursor: "pointer",
              paddingBottom: 2,
            }}
          >
            {mode === "register" ? "Зарегистрировать ещё одного участника" : "Редактировать ещё одного участника"}
          </button>
        </div>
      </div>
    );
  }

  // ── MAIN PAGE ───────────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: "100svh", background: "var(--color-surface)", display: "flex", flexDirection: "column" }}>
      <Navbar />

      

      {/* FORM */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "120px 40px 52px", flex: 1 }}>

        {/* Mode switcher */}
        <div
          style={{
            display: "flex",
            background: "rgba(13,13,20,0.05)",
            borderRadius: 14,
            padding: 4,
            marginBottom: 40,
          }}
        >
          {(["register", "edit"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => handleSwitchMode(m)}
              style={{
                flex: 1,
                border: "none",
                borderRadius: 10,
                padding: "10px 16px",
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "var(--font-body)",
                cursor: "pointer",
                transition: "all 0.2s",
                background: mode === m ? "var(--color-violet)" : "transparent",
                color: mode === m ? "#fff" : "rgba(13,13,20,0.4)",
              }}
            >
              {m === "register" ? "Регистрация" : "Изменить данные"}
            </button>
          ))}
        </div>

        {/* Edit — find card */}
        {mode === "edit" && participantId === null && (
          <div
            style={{
              background: "#fff",
              border: "1px solid rgba(13,13,20,0.08)",
              borderRadius: 24,
              padding: "36px 40px",
              marginBottom: 40,
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: 20,
                letterSpacing: "-0.02em",
                color: "var(--color-ink)",
                marginBottom: 8,
              }}
            >
              Найти регистрацию
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "var(--color-ink-60)",
                marginBottom: 24,
                lineHeight: 1.6,
              }}
            >
              Введите email, который вы использовали при регистрации, чтобы загрузить и изменить
              свои данные.
            </p>
            <input
              type="email"
              value={findEmail}
              onChange={(e) => setFindEmail(e.target.value)}
              placeholder="example@mail.com"
              style={{ ...inputStyle, marginBottom: 16 }}
              onKeyDown={(e) => e.key === "Enter" && handleFindParticipant()}
            />
            {findError && <ErrorBox msg={findError} />}
            <button
              onClick={handleFindParticipant}
              disabled={loading}
              style={{ ...btnPrimaryStyle, opacity: loading ? 0.5 : 1 }}
            >
              {loading ? "Поиск..." : "Найти"}
            </button>
          </div>
        )}

        {/* Edit — found banner */}
        {mode === "edit" && participantId !== null && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "rgba(75,22,163,0.06)",
              border: "1px solid rgba(75,22,163,0.12)",
              borderRadius: 16,
              padding: "16px 20px",
              marginBottom: 36,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(75,22,163,0.5)",
                  marginBottom: 4,
                }}
              >
                Редактирование
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "var(--color-violet)",
                }}
              >
                {formData.fullName}
              </div>
            </div>
            <button
              onClick={resetFind}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                fontWeight: 700,
                color: "var(--color-violet)",
                background: "none",
                border: "none",
                borderBottom: "1px solid rgba(75,22,163,0.3)",
                cursor: "pointer",
                paddingBottom: 1,
              }}
            >
              Изменить
            </button>
          </div>
        )}

        {/* Main form fields */}
        {(mode === "register" || participantId !== null) && (
          <>
            {/* Section header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 28,
                paddingBottom: 20,
                borderBottom: "1px solid rgba(13,13,20,0.08)",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "var(--color-violet)",
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-body)",
                  flexShrink: 0,
                }}
              >
                1
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: 18,
                  letterSpacing: "-0.02em",
                  color: "var(--color-ink)",
                }}
              >
                Личные данные
              </h2>
            </div>

            {/* Field grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 20,
                marginBottom: 32,
              }}
            >
              <div>
                <label style={labelStyle}>ФИО (кириллица)</label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Алихан Сейткали"
                  style={inputStyle}
                />
                <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--color-ink-30)", marginTop: 6 }}>
                  Пример: Алихан Сейткали
                </p>
              </div>

              <div>
                <label style={labelStyle}>ФИО (латиница)</label>
                <input
                  type="text"
                  id="fullNameLatin"
                  value={formData.fullNameLatin}
                  onChange={handleInputChange}
                  placeholder="Alikhan Seitkali"
                  style={inputStyle}
                />
                <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--color-ink-30)", marginTop: 6 }}>
                  Example: Alikhan Seitkali
                </p>
              </div>

              <div>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@mail.com"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Класс</label>
                <div style={{ position: "relative" }}>
                  <select
                    id="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    style={{ ...inputStyle, paddingRight: 40, cursor: "pointer" }}
                  >
                    <option value="">Выберите класс</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                  </select>
                  <svg
                    style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                  >
                    <path d="M1 1L6 6L11 1" stroke="rgba(13,13,20,0.35)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Школа</label>
                <input
                  type="text"
                  id="school"
                  value={formData.school}
                  onChange={handleInputChange}
                  placeholder="NIS Алматы, химико-биологическое направление"
                  style={inputStyle}
                />
                <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--color-ink-30)", marginTop: 6 }}>
                  Укажите полное название школы и город
                </p>
              </div>
            </div>

            {/* Error */}
            {error && <ErrorBox msg={error} />}

            {/* Consent */}
            {mode === "register" && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 32 }}>
                <button
                  onClick={() => setConsent(!consent)}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 5,
                    flexShrink: 0,
                    marginTop: 2,
                    cursor: "pointer",
                    border: consent ? "none" : "2px solid rgba(13,13,20,0.2)",
                    background: consent ? "var(--color-violet)" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.15s",
                  }}
                >
                  {consent && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                </button>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.65, color: "var(--color-ink-60)" }}>
                  Я даю согласие на обработку персональных данных в соответствии с{" "}
                  <a
                    href="https://bc-pf.org/docs/personaldata/list1-matomo.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--color-violet)", textDecoration: "underline" }}
                  >
                    Политикой конфиденциальности
                  </a>{" "}
                  и подтверждаю, что ознакомлен(а) с{" "}
                  <a
                    href="https://bc-pf.org/personaldata"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--color-violet)", textDecoration: "underline" }}
                  >
                    условиями обработки данных
                  </a>
                  .
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{ ...btnPrimaryStyle, opacity: loading ? 0.5 : 1, cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading
                ? "Отправка..."
                : mode === "register"
                ? "Зарегистрироваться"
                : "Сохранить изменения"}
            </button>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
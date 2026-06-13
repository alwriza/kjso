"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useParams } from "next/navigation";

// ── mobile hook ───────────────────────────────────────────────────────────────
function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

type Mode = "register" | "edit";

// ── data ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { id: "stages", href: "/#stages" },
  { id: "about", href: "/#about" },
  { id: "gallery", href: "/#gallery" },
  { id: "partners", href: "/#partners" },
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
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  
  const currentLocale = params?.locale || "ru";

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  const changeLocale = (newLocale: string) => {
    let cleanPath = pathname;
    if (cleanPath.startsWith(`/${currentLocale}/`)) {
      cleanPath = cleanPath.slice(`/${currentLocale}`.length);
    } else if (cleanPath === `/${currentLocale}`) {
      cleanPath = "";
    }
    const nextPath = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
    let finalUrl = `/${newLocale}${nextPath}`;
    if (finalUrl.endsWith("/")) {
      finalUrl = finalUrl.slice(0, -1);
    }
    router.push(finalUrl || `/${newLocale}`);
  };

  // Общий переключатель языков для десктопа и мобилки
  const renderLanguageSwitcher = (isMobileMenu = false) => (
    <div 
      style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: 6, 
        borderLeft: isMobileMenu ? "none" : "1px solid rgba(13,13,20,0.12)", 
        paddingLeft: isMobileMenu ? 0 : 16,
        marginLeft: isMobileMenu ? 0 : 4,
        marginTop: isMobileMenu ? 12 : 0,
        marginBottom: isMobileMenu ? 12 : 0
      }}
    >
      {(["ru", "en", "kz"] as const).map((lang) => {
        const isActive = currentLocale === lang || (currentLocale === "kk" && lang === "kz");
        return (
          <button
            key={lang}
            onClick={() => changeLocale(lang)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "Cocomat Pro, sans-serif",
              fontSize: isMobileMenu ? 14 : 11,
              fontWeight: isActive ? 800 : 500,
              color: isActive ? "#4b16a3" : "rgba(13,13,20,0.4)",
              textTransform: "uppercase",
              padding: "4px 6px",
              transition: "color 0.15s",
            }}
          >
            {lang}
          </button>
        );
      })}
    </div>
  );

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background 0.35s, backdrop-filter 0.35s, border-color 0.35s",
        background: scrolled || menuOpen ? "rgba(245,244,240,0.96)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
        borderBottom: scrolled || menuOpen ? "1px solid rgba(13,13,20,0.08)" : "1px solid transparent",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 68, display: "flex", alignItems: "center" }}>
        {/* Logo */}
        <a href={`/${currentLocale}`} style={{ textDecoration: "none", flexShrink: 0 }}>
          <span style={{ fontFamily: "var(--font-display), sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.03em", color: "#4b16a3" }}>
            KJSO
          </span>
          <span style={{ fontFamily: "Cocomat Pro, sans-serif", fontSize: 11, color: "rgba(13,13,20,0.45)", marginLeft: 8, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {t("logoYear")}
          </span>
        </a>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 32, marginLeft: "auto", alignItems: "center" }}>
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`/${currentLocale}${l.href}`}
                style={{ fontFamily: "Cocomat Pro, sans-serif", fontSize: 13, fontWeight: 700, color: "rgba(13,13,20,0.55)", textDecoration: "none", letterSpacing: "0.04em", transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#4b16a3")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(13,13,20,0.55)")}
              >
                {t(`links.${l.id}`)}
              </a>
            ))}
            
            {renderLanguageSwitcher(false)}

            <a
              href={`/${currentLocale}/registration`}
              style={{ fontFamily: "Cocomat Pro, sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", background: "#4b16a3", borderRadius: 999, padding: "9px 22px", textDecoration: "none", letterSpacing: "0.04em", transition: "opacity 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {t("register")}
            </a>
          </div>
        )}

        {/* Mobile burger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen((o) => !o)}
            style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}
            aria-label={t("menu")}
          >
            <span style={{ display: "block", width: 22, height: 2, background: "#0D0D14", borderRadius: 2, transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ display: "block", width: 22, height: 2, background: "#0D0D14", borderRadius: 2, transition: "all 0.2s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: 22, height: 2, background: "#0D0D14", borderRadius: 2, transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        )}
      </div>

      {/* Mobile dropdown */}
      {isMobile && menuOpen && (
        <div style={{ padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: 4, borderTop: "1px solid rgba(13,13,20,0.06)" }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`/${currentLocale}${l.href}`}
              onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "Cocomat Pro, sans-serif", fontSize: 15, fontWeight: 700, color: "rgba(13,13,20,0.65)", textDecoration: "none", padding: "10px 0", letterSpacing: "0.03em" }}
            >
              {t(`links.${l.id}`)}
            </a>
          ))}
          
          {renderLanguageSwitcher(true)}

          <a
            href={`/${currentLocale}/registration`}
            onClick={() => setMenuOpen(false)}
            style={{ fontFamily: "Cocomat Pro, sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", background: "#4b16a3", borderRadius: 999, padding: "12px 24px", textDecoration: "none", letterSpacing: "0.04em", textAlign: "center", marginTop: 8 }}
          >
            {t("register")}
          </a>
        </div>
      )}
    </nav>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────────────
function Footer() {
  const isMobile = useIsMobile();
  const t = useTranslations("Navbar");
  const params = useParams();
  const currentLocale = params?.locale || "ru";

  const socialStyle: React.CSSProperties = {
    fontFamily: "Cocomat Pro, sans-serif",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.08em",
    color: "rgba(255,255,255,0.3)",
    textDecoration: "none",
    transition: "color 0.15s",
  };

  return (
    <footer
      style={{
        background: "#0D0D14",
        padding: isMobile ? "36px 20px" : "48px 40px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          flexWrap: "wrap",
          gap: isMobile ? 20 : 24,
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

        {/* Навигационные ссылки */}
        <div
          style={{
            display: "flex",
            gap: isMobile ? 20 : 32,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`/${currentLocale}${l.href}`}
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
              {t(`links.${l.id}`)}
            </a>
          ))}
        </div>

        {/* Социальные сети и контакты */}
        <div style={{ display: "flex", gap: isMobile ? 16 : 24, alignItems: "center" }}>
          <a
            href="https://t.me/gtijsokz" 
            target="_blank"
            rel="noopener noreferrer"
            style={socialStyle}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
          >
            Telegram
          </a>
          <a
            href="https://instagram.com/kjso.kz"
            target="_blank"
            rel="noopener noreferrer"
            style={socialStyle}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
          >
            Instagram
          </a>
          <a
            href="mailto:info@kjso.kz" 
            style={socialStyle}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
          >
            info@kjso.kz
          </a>
        </div>

        <div
          style={{
            fontFamily: "Cocomat Pro, sans-serif",
            fontSize: 11,
            color: "rgba(255,255,255,0.18)",
            letterSpacing: "0.06em",
          }}
        >
          © {t("logoYear")} KJSO
        </div>
      </div>
    </footer>
  );
}

// ── ErrorBox ──────────────────────────────────────────────────────────────────
function ErrorBox({ msg }: { msg: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
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
  const t = useTranslations("Registration");
  const [mode, setMode] = useState<Mode>("register");
  const [consent, setConsent] = useState(false);
  const [participantId, setParticipantId] = useState<number | null>(null);
  const [findEmail, setFindEmail] = useState("");
  const [error, setError] = useState("");
  const [findError, setFindError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successName, setSuccessName] = useState("");
  const isMobile = useIsMobile();

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
      if (!res.ok) { setFindError(data.error || t("errSearch")); return; }
      setFormData({
        fullName: data.full_name || "",
        fullNameLatin: data.full_name_latin || "",
        email: data.email || "",
        grade: data.grade || "",
        school: data.school || "",
      });
      setParticipantId(data.id);
    } catch {
      setFindError(t("errSearchParticipant"));
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
    if (!formData.fullName.trim())       { setError(t("errCyrillic")); return false; }
    if (!formData.fullNameLatin.trim())  { setError(t("errLatin")); return false; }
    if (!formData.email.trim())          { setError(t("errEmail")); return false; }
    if (!emailRx.test(formData.email))   { setError(t("errEmailInvalid")); return false; }
    if (!formData.grade)                 { setError(t("errGrade")); return false; }
    if (!formData.school.trim())         { setError(t("errSchool")); return false; }
    if (mode === "register" && !consent) { setError(t("errConsent")); return false; }
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
      if (!res.ok) { setError(data.error || t("errSubmit")); return; }
      setSuccessName(formData.fullName);
      setSuccess(true);
    } catch {
      setError(t("errSubmit"));
    } finally {
      setLoading(false);
    }
  };

  // ── SUCCESS SCREEN ──────────────────────────────────────────────────────────
  if (success) {
    return (
      <div style={{ minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px", background: "var(--color-surface)" }}>
        <div style={{ textAlign: "center", maxWidth: 440 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(75,22,163,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M5 14L11 20L23 8" stroke="#4b16a3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(22px,4vw,30px)", letterSpacing: "-0.03em", color: "var(--color-ink)", marginBottom: 12 }}>
            {mode === "register" ? t("successRegisterTitle") : t("successEditTitle")}
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.65, color: "var(--color-ink-60)", marginBottom: 36 }}>
            {t("successText", {
              name: successName,
              action: mode === "register" ? t("actionRegistered") : t("actionUpdated")
            })}
          </p>
          <button
            onClick={() => { setSuccess(false); handleSwitchMode("register"); }}
            style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 700, color: "var(--color-violet)", background: "none", border: "none", borderBottom: "1px solid rgba(75,22,163,0.3)", cursor: "pointer", paddingBottom: 2 }}
          >
            {mode === "register" ? t("btnSuccessRegisterMore") : t("btnSuccessEditMore")}
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
      <div style={{ maxWidth: 720, margin: "0 auto", padding: isMobile ? "100px 20px 52px" : "120px 40px 52px", flex: 1 }}>

        {/* Mode switcher */}
        <div style={{ display: "flex", background: "rgba(13,13,20,0.05)", borderRadius: 14, padding: 4, marginBottom: 40 }}>
          {(["register", "edit"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => handleSwitchMode(m)}
              style={{ flex: 1, border: "none", borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 700, fontFamily: "var(--font-body)", cursor: "pointer", transition: "all 0.2s", background: mode === m ? "var(--color-violet)" : "transparent", color: mode === m ? "#fff" : "rgba(13,13,20,0.4)" }}
            >
              {m === "register" ? t("titleRegister") : t("titleEdit")}
            </button>
          ))}
        </div>

        {/* Edit — find card */}
        {mode === "edit" && participantId === null && (
          <div style={{ background: "#fff", border: "1px solid rgba(13,13,20,0.08)", borderRadius: 24, padding: isMobile ? "24px 20px" : "36px 40px", marginBottom: 40 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, letterSpacing: "-0.02em", color: "var(--color-ink)", marginBottom: 8 }}>
              {t("findTitle")}
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-ink-60)", marginBottom: 24, lineHeight: 1.6 }}>
              {t("findDesc")}
            </p>
            <input
              type="email"
              value={findEmail}
              onChange={(e) => setFindEmail(e.target.value)}
              placeholder={t("findPlaceholder")}
              style={{ ...inputStyle, marginBottom: 16 }}
              onKeyDown={(e) => e.key === "Enter" && handleFindParticipant()}
            />
            {findError && <ErrorBox msg={findError} />}
            <button
              onClick={handleFindParticipant}
              disabled={loading}
              style={{ ...btnPrimaryStyle, opacity: loading ? 0.5 : 1 }}
            >
              {loading ? t("btnFinding") : t("btnFind")}
            </button>
          </div>
        )}

        {/* Edit — found banner */}
        {mode === "edit" && participantId !== null && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(75,22,163,0.06)", border: "1px solid rgba(75,22,163,0.12)", borderRadius: 16, padding: "16px 20px", marginBottom: 36 }}>
            <div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(75,22,163,0.5)", marginBottom: 4 }}>
                {t("editBanner")}
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, color: "var(--color-violet)" }}>
                {formData.fullName}
              </div>
            </div>
            <button
              onClick={resetFind}
              style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, color: "var(--color-violet)", background: "none", border: "none", borderBottom: "1px solid rgba(75,22,163,0.3)", cursor: "pointer", paddingBottom: 1 }}
            >
              {t("btnChange")}
            </button>
          </div>
        )}

        {/* Main form fields */}
        {(mode === "register" || participantId !== null) && (
          <>
            {/* Section header */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, paddingBottom: 20, borderBottom: "1px solid rgba(13,13,20,0.08)" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--color-violet)", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-body)", flexShrink: 0 }}>
                1
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em", color: "var(--color-ink)" }}>
                {t("sectionPersonal")}
              </h2>
            </div>

            {/* Field grid */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20, marginBottom: 32 }}>
              <div>
                <label style={labelStyle}>{t("labelFullName")}</label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder={t("placeholderFullName")}
                  style={inputStyle}
                />
                <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--color-ink-30)", marginTop: 6 }}>
                  {t("hintFullName")}
                </p>
              </div>

              <div>
                <label style={labelStyle}>{t("labelFullNameLatin")}</label>
                <input
                  type="text"
                  id="fullNameLatin"
                  value={formData.fullNameLatin}
                  onChange={handleInputChange}
                  placeholder={t("placeholderFullNameLatin")}
                  style={inputStyle}
                />
                <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--color-ink-30)", marginTop: 6 }}>
                  {t("hintFullNameLatin")}
                </p>
              </div>

              <div>
                <label style={labelStyle}>{t("labelEmail")}</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t("findPlaceholder")}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>{t("labelGrade")}</label>
                <div style={{ position: "relative" }}>
                  <select
                    id="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    style={{ ...inputStyle, paddingRight: 40, cursor: "pointer" }}
                  >
                    <option value="">{t("optionGrade")}</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                  </select>
                  <svg style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1L6 6L11 1" stroke="rgba(13,13,20,0.35)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              <div style={{ gridColumn: isMobile ? "1" : "1 / -1" }}>
                <label style={labelStyle}>{t("labelSchool")}</label>
                <input
                  type="text"
                  id="school"
                  value={formData.school}
                  onChange={handleInputChange}
                  placeholder={t("placeholderSchool")}
                  style={inputStyle}
                />
                <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--color-ink-30)", marginTop: 6 }}>
                  {t("hintSchool")}
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
                  style={{ width: 20, height: 20, borderRadius: 5, flexShrink: 0, marginTop: 2, cursor: "pointer", border: consent ? "none" : "2px solid rgba(13,13,20,0.2)", background: consent ? "var(--color-violet)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}
                >
                  {consent && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                </button>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.65, color: "var(--color-ink-60)" }}>
                  {t("consentText")}{" "}
                  <a href="https://bc-pf.org/docs/personaldata/list1-matomo.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-violet)", textDecoration: "underline" }}>
                    {t("privacyPolicy")}
                  </a>{" "}
                  {t("consentConfirm")}{" "}
                  <a href="https://bc-pf.org/personaldata" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-violet)", textDecoration: "underline" }}>
                    {t("dataTerms")}
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
                ? t("btnSubmitting")
                : mode === "register"
                ? t("btnSubmitRegister")
                : t("btnSubmitEdit")}
            </button>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
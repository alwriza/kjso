"use client";

import { useEffect, useRef, useState } from "react";
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

// ── tiny helpers ─────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── data id maps ─────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { id: "stages", href: "#stages" },
  { id: "about", href: "#about" },
  { id: "gallery", href: "#gallery" },
  { id: "partners", href: "#partners" },
];

const TEAM_HEADING: Record<string, string> = {
  ru: "Наша команда",
  kz: "Біздің командамыз",
  en: "Our Team",
};

// Подписи категорий на трёх языках.
// Если захочешь единственное число в русском — поменяй "Члены Оргкомитета"
// на "Член Оргкомитета" прямо здесь, в одном месте.
const TEAM_LABELS: Record<string, Record<string, string>> = {
  organizer: { ru: "Организатор", kz: "Ұйымдастырушы", en: "Organizer" },
  jury:      { ru: "Жюри",              kz: "Қазылар алқасы", en: "Jury" },
};

// Список людей. У каждого:
//   name        — имя (НЕ переводится, одно на все языки)
//   category    — "organizer" или "jury" (определяет подпись под фото)
//   achievement — достижение на 3 языках
//   img         — путь к фото из папки public, вида "/имя-файла.jpg"
// Блоки { ... } можно добавлять и удалять — сколько людей, столько блоков.
const TEAM: {
  name: string;
  category: string;
  achievement: Record<string, string>;
  img: string;
}[] = [
  {
    name: "Бектурсын Дария",
    category: "organizer",
    achievement: {
      ru: "Бронзовый призер IJSO, 2023, Серебряный призер Республиканской Олимпиады по химии, 2025",
      kz: "IJSO қола жүлдегері, Республикалық химия олимпиадасының күміс жүлдегері, 2025",
      en: "Bronze medalist IJSO, 2023, Silver medalist of National Chemistry Olympiad, 2025",
    },
    img: "/team_pic_001.jpg",
  },
  {
    name: "Сегизбаева Зарина",
    category: "organizer",
    achievement: {
      ru: "Лауреат Всероссийского конкурса юношеских исследовательских работ им. В. И. Вернадского, Призёр республиканского конкурса Шапагат 2023",
      kz: "В. И. Вернадский атындағы Ресейлік жас зерттеушілер конкурсының лауреаты, 2023 жылғы Шапағат республикалық конкурсының жүлдегері",
      en: "Laureate of the Russian competition of youth research works named after V. I. Vernadsky with International participants, Prize-winner of the republican competition Shapagat 2023",
    },
    img: "/team_pic_002.jpg",
  },
  {
    name: "Мүрсәлім Шынғыс",
    category: "organizer",
    achievement: {
      ru: "Золотой призер Республиканской Олимпиады по географии 2025, Серебряный призёр 2023, 2024, 2026",
      kz: "Республикалық география олимпиадасының алтын жүлдегері 2025, Күміс жүлдегері 2023, 2024, 2026",
      en: "Gold medalist of National Geography Olympiad 2025, Silver medalist 2023, 2024, 2026",
    },
    img: "/team_pic_003.jpg",
  },
  {
    name: "Сарин Дамир",
    category: "organizer",
    achievement: {
      ru: "Участник международной программы Virtual Visionaries, Учитель-наставник проекта OQU (при поддержке ЮНЕСКО и ЮНИСЕФ Казахстан)",
      kz: "Virtual Visionaries халықаралық бағдарламасының қатысушысы, OQU жобасының тәлімгер-ұстазы (ЮНЕСКО және ЮНИСЕФ Қазақстанның қолдауымен)",
      en: "Participant of the international program Virtual Visionaries, Teacher-Mentor of the OQU project (with support from UNESCO and UNICEF Kazakhstan)",
    },
    img: "/team_pic_004.jpg",
  },
  {
    name: "Кутырев Ратмир",
    category: "jury",
    achievement: {
      ru: "Серебряный призёр IJSO 2025, Серебряный призер Республиканской Олимпиады по физике, 2026, Серебряный призёр Жаутыковской Олимпиады по физике 2026",
      kz: "IJSO күміс жүлдегері 2025, Республикалық физика олимпиадасының күміс жүлдегері, Жәутіков олимпиадасының күміс жүлдегері 2026",
      en: "Silver medalist IJSO 2025, Silver medalist of National Physics Olympiad, 2026, Silver medalist of Zhautykov Physics Olympiad 2026",
    },
    img: "/team_pic_005.jpg",
  },
  {
    name: "Перепелица Даниил",
    category: "jury",
    achievement: {
      ru: "Серебряный призёр IJSO 2025, Серебряный призер Республиканской Олимпиады по физике, 2026, 2025, Бронзовый призёр Жаутыковской Олимпиады по физике 2026",
      kz: "IJSO күміс жүлдегері 2025, Республикалық физика олимпиадасының күміс жүлдегері 2026, 2025, Жәутіков олимпиадасының қола жүлдегері 2026",
      en: "Silver medalist IJSO 2025, Silver medalist of National Physics Olympiad, 2026, 2025, Bronze medalist of Zhautykov Physics Olympiad 2026",
    },
    img: "/team_pic_006.jpg",
  },
  {
    name: "Алпысбаев Тимур",
    category: "jury",
    achievement: {
      ru: "Бронзовый призёр IJSO 2025, Серебряный призер Республиканской Олимпиады по физике, 2026, Золотой призёр КБО по физике 2025",
      kz: "IJSO қола жүлдегері 2025, Республикалық физика олимпиадасының күміс жүлдегері 2026, Алтын жүлдегері 2025",
      en: "Bronze medalist IJSO 2025, Silver medalist of National Physics Olympiad, 2026, Gold medalist of Kazakh-British Olympiad in Physics 2025",
    },
    img: "/team_pic_007.jpg",
  },
  {
    name: "Желтова Софья",
    category: "jury",
    achievement: {
      ru: "Золотой призёр Open Biology Olympiad 2026, Золотой призер Республиканской Олимпиады по биологии, 2026, Серебряный призёр 2025",
      kz: "Open Biology Olympiad 2026 алтын жүлдегері, Республикалық биология олимпиадасының алтын жүлдегері 2026, күміс жүлдегері 2025",
      en: "Gold medalist Open Biology Olympiad 2026, Gold medalist of National Biology Olympiad 2026, Silver medalist 2025",
    },
    img: "/team_pic_008.jpg",
  },
  {
    name: "Билялов Нурали",
    category: "jury",
    achievement: {
      ru: "Серебряный призёр Open Biology Olympiad 2026, Золотой призер Республиканской Олимпиады по биологии, 2026, Серебряный призёр 2025",
      kz: "Open Biology Olympiad 2026 күміс жүлдегері, Республикалық биология олимпиадасының алтын жүлдегері 2026, күміс жүлдегері 2025",
      en: "Silver medalist Open Biology Olympiad 2026, Gold medalist of National Biology Olympiad 2026, Silver medalist 2025",
    },
    img: "/team_pic_009.jpg",
  },
  {
    name: "Махмутов Мансур",
    category: "jury",
    achievement: {
      ru: "Председатель академического комитета NChB 2025, Бронзовый призер Международной Менделеевской Олимпиады 2026, Серебряный призёр Республиканской Олимпиады по химии 2026",
      kz: "NChB 2025 академиялық комитетінің төрағасы, Менделеев халықаралық олимпиадасының қола жүлдегері 2026, Республикалық химия олимпиадасының күміс жүлдегері 2026",
      en: "Chairman of the academic committee of NChB 2025, Bronze medalist of International Mendeleev Olympiad 2026, Silver medalist of National Chemistry Olympiad 2026",
    },
    img: "/team_pic_010.jpg",
  },
  {
    name: "Сейітқазиев Нұрсейіт",
    category: "jury",
    achievement: {
      ru: "Бронзовый призер IJSO 2025, Серебряный призер Международной Менделеевской Олимпиады 2026, Золотой призёр Республиканской Олимпиады по химии 2026",
      kz: "IJSO қола жүлдегері 2025, Менделеев халықаралық олимпиадасының күміс жүлдегері 2026, Республикалық химия олимпиадасының алтын жүлдегері 2026",
      en: "Bronze medalist IJSO 2025, Silver medalist of International Mendeleev Olympiad 2026, Gold medalist of National Chemistry Olympiad 2026",
    },
    img: "/team_pic_011.jpg",
  },
  {
    name: "Айтжанов Алидар",
    category: "jury",
    achievement: {
      ru: "Бронзовый призер Международной Менделеевской Олимпиады 2026, Серебряный призёр Республиканской Олимпиады по химии 2026, Золотой призёр 2024",
      kz: "Менделеев халықаралық олимпиадасының қола жүлдегері 2026, Республикалық химия олимпиадасының күміс жүлдегері 2026, Алтын жүлдегері 2024",
      en: "Bronze medalist of International Mendeleev Olympiad 2026, Silver medalist of National Chemistry Olympiad 2026, Gold medalist 2024",
    },
    img: "/team_pic_012.jpg",
  },
];

const STAGES = [
  {
    id: "stage01",
    num: "01",
    accent: "#8654e8",
  },
  {
    id: "stage02",
    num: "02",
    accent: "#27BE6C",
  },
];

const STATS = [
  { id: "classes", value: "7–9" },
  { id: "stages", value: "2" },
  { id: "tours", value: "3" },
  { id: "year", value: "2026" },
];

const STATS_GREEN = [
  { id: "prizeFund", value: "500 тыс ₸" },
  { id: "participants", value: "200" },
  { id: "finalists", value: "30" },
  { id: "year", value: "2025" },
];

const PARTNERS = [
  { id: "kbtu" },
  { id: "ertis" },
  { id: "beyond" },
];

const GALLERY = [
  { src: "/IMG-20250626-WA0022.jpg" },
  { src: "/IMG-20250625-WA0075.jpg" },
  { src: "/IMG-20250625-WA0084.jpg" },
  { src: "/IMG-20250625-WA0085.jpg" },
  { src: "/IMG-20250625-WA0091.jpg" },
  { src: "/IMG-20250625-WA0092.jpg" }
];

// ── components ───────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  
  const currentLocale = params?.locale || "ru";
  const teamLabel = currentLocale === "en" ? "Team" : "Команда";

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
        const isActive = currentLocale === lang || (currentLocale === "kz" && lang === "kz");
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
              color: isActive ? "#5f20db" : "rgba(13,13,20,0.4)",
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
        background: "rgba(245,244,240,0.96)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(13,13,20,0.08)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 68, display: "flex", alignItems: "center" }}>
        {/* Logo */}
        <a href={`/${currentLocale}`} style={{ textDecoration: "none", flexShrink: 0 }}>
        <span style={{ fontFamily: "var(--font-display), sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.03em" }}>
            <span style={{ color: "#000000" }}>K</span>
            <span style={{ color: "#193f76" }}>J</span>
            <span style={{ color: "#5f20db" }}>S</span>
            <span style={{ color: "#27be6c" }}>O</span>
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
                onMouseEnter={(e) => (e.currentTarget.style.color = "#5f20db")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(13,13,20,0.55)")}
              >
                {t(`links.${l.id}`)}
              </a>
            ))}
            
            <a
              href={`/${currentLocale}#team`}
              style={{ fontFamily: "Cocomat Pro, sans-serif", fontSize: 13, fontWeight: 700, color: "rgba(13,13,20,0.55)", textDecoration: "none", letterSpacing: "0.04em", transition: "color 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#5f20db")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(13,13,20,0.55)")}
            >
              {teamLabel}
            </a>

            {renderLanguageSwitcher(false)}

            <a
              href={`/${currentLocale}/registration`}
              style={{ fontFamily: "Cocomat Pro, sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", background: "#5f20db", borderRadius: 999, padding: "9px 22px", textDecoration: "none", letterSpacing: "0.04em", transition: "opacity 0.15s" }}
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
          
          <a
            href={`/${currentLocale}#team`}
            onClick={() => setMenuOpen(false)}
            style={{ fontFamily: "Cocomat Pro, sans-serif", fontSize: 15, fontWeight: 700, color: "rgba(13,13,20,0.65)", textDecoration: "none", padding: "10px 0", letterSpacing: "0.03em" }}
          >
            {teamLabel}
          </a>

          {renderLanguageSwitcher(true)}

          <a
            href={`/${currentLocale}/registration`}
            onClick={() => setMenuOpen(false)}
            style={{ fontFamily: "Cocomat Pro, sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", background: "#5f20db", borderRadius: 999, padding: "12px 24px", textDecoration: "none", letterSpacing: "0.04em", textAlign: "center", marginTop: 8 }}
          >
            {t("register")}
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const t = useTranslations("Hero");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const tInterval = setInterval(() => setTick((n) => n + 1), 80);
    return () => clearInterval(tInterval);
  }, []);

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        minHeight: "100svh",
        background: "#F5F4F0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 40px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <h1
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(48px, 9vw, 120px)",
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            color: "#0D0D14",
            marginBottom: 40,
          }}
        >
          <span style={{ display: "block" }}>{t("title1")}</span>
          <span style={{ display: "block", color: "#193f76" }}>
            {t("title2")}{" "}
            <span
              style={{
                color: "#5f20db",
              }}
            >
              {t("title3")}
            </span>
          </span>
          <span style={{ display: "block", color: "#27be6c" }}>{t("title4")}</span>
        </h1>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 32,
          }}
        >
          <p
            style={{
              fontFamily: "Cocomat Pro, sans-serif",
              fontSize: "clamp(14px, 1.5vw, 17px)",
              lineHeight: 1.6,
              color: "rgba(13,13,20,0.55)",
              maxWidth: 420,
            }}
          >
            {t("description")}
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="/registration"
              style={{
                fontFamily: "Cocomat Pro, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#fff",
                background: "#5f20db",
                borderRadius: 999,
                padding: "14px 32px",
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "background 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#8654e8")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#5f20db")}
            >
              {t("btnRegister")}
            </a>
            <a
              href="#"
              style={{
                fontFamily: "Cocomat Pro, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "rgba(13,13,20,0.6)",
                border: "1px solid rgba(13,13,20,0.2)",
                borderRadius: 999,
                padding: "14px 32px",
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "border-color 0.2s, color 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(13,13,20,0.5)";
                e.currentTarget.style.color = "#0D0D14";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(13,13,20,0.2)";
                e.currentTarget.style.color = "rgba(13,13,20,0.6)";
              }}
            >
              {t("btnRules")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const t = useTranslations("Stats");

  return (
    <div
      className="stats-container"
      style={{
        background: "#5f20db",
        padding: "0 40px",
      }}
    >
      <div
        className="grid-stats"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderLeft: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        {STATS.map((s) => (
          <div
            key={s.id}
            className="stat-item"
            style={{
              padding: "28px 32px",
              borderRight: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display), sans-serif",
                fontWeight: 800,
                fontSize: "clamp(22px, 3vw, 36px)",
                color: "#fff",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                marginBottom: 4,
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontFamily: "Cocomat Pro, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {t(s.id)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsBarGreen() {
  const t = useTranslations("Stats");

  return (
    <div
      className="stats-container"
      style={{
        background: "#27be6c",
        padding: "0 40px",
      }}
    >
      <div
        className="grid-stats"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderLeft: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        {STATS_GREEN.map((s, i) => (
          <div
            key={i}
            className="stat-item"
            style={{
              padding: "28px 32px",
              borderRight: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display), sans-serif",
                fontWeight: 800,
                fontSize: "clamp(22px, 3vw, 36px)",
                color: "#fff",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                marginBottom: 4,
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontFamily: "Cocomat Pro, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {t(s.id)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function About() {
  const { ref, visible } = useInView();
  const t = useTranslations("About");

  return (
    <section
      id="about"
      ref={ref}
      className="mobile-pad"
      style={{
        padding: "120px 40px",
        background: "#F5F4F0",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(32px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            fontFamily: "Cocomat Pro, sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#5f20db",
            marginBottom: 24,
          }}
        >
          {t("badge")}
        </div>

        <div
          className="grid-about"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "start",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 52px)",
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              color: "#0D0D14",
            }}
          >
            {t("titleLine1")}<br />
            <span style={{ color: "#5f20db" }}>{t("titleLine2")}</span> {t("titleLine3")}<br />
            {t("titleLine4")}
          </h2>

          <div>
            <p
              style={{
                fontFamily: "Cocomat Pro, sans-serif",
                fontSize: 16,
                lineHeight: 1.75,
                color: "rgba(13,13,20,0.6)",
                marginBottom: 24,
              }}
            >
              {t("text1")}
            </p>
            <p
              style={{
                fontFamily: "Cocomat Pro, sans-serif",
                fontSize: 16,
                lineHeight: 1.75,
                color: "rgba(13,13,20,0.6)",
              }}
            >
              {t("text2")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stages() {
  const { ref, visible } = useInView(0.1);
  const t = useTranslations("Stages");

  return (
    <section
      id="stages"
      ref={ref}
      className="stages-section"
      style={{
        padding: "0 40px 120px",
        background: "#F5F4F0",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 64,
            paddingTop: 16,
            borderTop: "1px solid rgba(13,13,20,0.1)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px, 5vw, 56px)",
              letterSpacing: "-0.03em",
              color: "#0D0D14",
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            {t("title")}
          </h2>
        </div>

        <div style={{ position: "relative", paddingLeft: 48 }}>
          <div
            style={{
              position: "absolute",
              left: 8,
              top: 8,
              bottom: 8,
              width: 2,
              background: "linear-gradient(to bottom, #5f20db, #8654e8)",
              borderRadius: 2,
            }}
          />

          {STAGES.map((stage, i) => (
            <div
              key={stage.id}
              style={{
                position: "relative",
                marginBottom: i < STAGES.length - 1 ? 56 : 0,
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateX(-16px)",
                transition: `opacity 0.6s ease ${i * 0.2}s, transform 0.6s ease ${i * 0.2}s`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: -44,
                  top: 4,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: "#5f20db",
                  border: "3px solid #F5F4F0",
                  boxShadow: "0 0 0 2px #5f20db",
                  zIndex: 1,
                }}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 20,
                  marginBottom: 12,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(18px, 2.5vw, 26px)",
                    letterSpacing: "-0.02em",
                    color: "#0D0D14",
                  }}
                >
                  {t(`${stage.id}.title`)}
                </span>
                <span
                  style={{
                    fontFamily: "Cocomat Pro, sans-serif",
                    fontSize: "clamp(16px, 2vw, 22px)",
                    fontWeight: 400,
                    color: "#8654e8",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {t(`${stage.id}.tag`).toLowerCase().replace("–", "-")}
                </span>
              </div>

              <p
                style={{
                  fontFamily: "Cocomat Pro, sans-serif",
                  fontSize: "clamp(13px, 1.2vw, 15px)",
                  lineHeight: 1.7,
                  color: "rgba(13,13,20,0.5)",
                  maxWidth: 680,
                }}
              >
                {t(`${stage.id}.body`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const { ref, visible } = useInView(0.1);
  const t = useTranslations("Gallery");

  return (
    <section
      id="gallery"
      ref={ref}
      className="mobile-pad"
      style={{
        padding: "120px 40px",
        background: "#0D0D14",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: 48,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(24px, 3.5vw, 44px)",
              letterSpacing: "-0.035em",
              color: "#fff",
              margin: 0,
            }}
          >
            {t("title")}
          </h2>
          <span
            style={{
              fontFamily: "Cocomat Pro, sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
            }}
          >
            {t("subtitle")}
          </span>
        </div>

        <div
          className="grid-gallery"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: "240px", 
            gap: 12,
          }}
        >
          {GALLERY.map((item, i) => {
            const isWide = i === 0 || i === 4;

            return (
              <div
                key={i}
                className="gallery-item"
                style={{
                  gridColumn: isWide ? "span 2" : "span 1",
                  borderRadius: 16,
                  position: "relative",
                  overflow: "hidden",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "scale(0.96)",
                  transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
                  display: "flex",
                  alignItems: "flex-end",
                  padding: 20,
                  cursor: "pointer",
                }}
              >
                {item.src && (
                  <img
                    src={item.src}
                    alt=""
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      zIndex: 1,
                      transition: "transform 0.4s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                )}

                {!item.src && (
                  <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    pointerEvents: "none",
                  }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      border: "1px solid rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 8px",
                    }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect x="1" y="3" width="14" height="10" rx="2" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                        <circle cx="8" cy="8" r="2.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Team() {
  const { ref, visible } = useInView(0.1);

  // Берём текущий язык из адреса (ru / kz / en). По умолчанию ru.
  const params = useParams();
  const locale: string = String(params?.locale || "ru");

  // Маленький помощник: достаёт нужный язык, а если его нет — берёт русский.
  const pick = (obj: Record<string, string>) => obj[locale] || obj.ru;

  return (
    <section
      id="team"
      ref={ref}
      className="mobile-pad"
      style={{
        padding: "120px 30px 40px",
        background: "#F5F4F0",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(32px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Заголовок секции */}
        <h2
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(28px, 4vw, 52px)",
            letterSpacing: "-0.035em",
            color: "#0D0D14",
            margin: "0 0 56px",
          }}
        >
          {pick(TEAM_HEADING)}
        </h2>

        {/* Сетка карточек. auto-fit сам подстраивает число колонок под ширину
            экрана, поэтому отдельные правила для телефона не нужны. */}
        <div
          className="grid-team"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 48,
            justifyItems: "center",
          }}
        >
          {TEAM.map((person, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                maxWidth: 240,
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(20px)",
                transition: `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`,
              }}
            >
              {/* Круглое фото */}
              <div
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  overflow: "hidden",
                  margin: "0 auto 20px",
                  border: "1px solid rgba(13,13,20,0.1)",
                  background: "rgba(13,13,20,0.04)",
                }}
              >
                {person.img && (
                  <img
                    src={person.img}
                    alt={person.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                )}
              </div>

              {/* Имя (не переводится) */}
              <div
                style={{
                  fontFamily: "Cocomat Pro, sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(13,13,20,0.4)",
                  marginBottom: 6,
                }}
              >
                {person.name}
              </div>

              {/* Категория: Оргкомитет / Жюри (переводится) */}
              <div
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: 17,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "#0D0D14",
                  marginBottom: 8,
                }}
              >
                {pick(TEAM_LABELS[person.category])}
              </div>

              {/* Достижение (переводится) */}
              {person.achievement && (
                <div
                  style={{
                    fontFamily: "Cocomat Pro, sans-serif",
                    fontSize: 13,
                    lineHeight: 1.5,
                    color: "rgba(13,13,20,0.55)",
                  }}
                >
                  {pick(person.achievement)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Partners() {
  const { ref, visible } = useInView();
  const t = useTranslations("Partners");

  return (
    <section
      id="partners"
      ref={ref}
      className="mobile-pad"
      style={{
        padding: "120px 40px",
        background: "#F5F4F0",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            fontFamily: "Cocomat Pro, sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(13,13,20,0.35)",
            marginBottom: 48,
          }}
        >
          {t("badge")}
        </div>

        <div
          className="grid-partners"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            borderTop: "1px solid rgba(13,13,20,0.1)",
            borderLeft: "1px solid rgba(13,13,20,0.1)",
          }}
        >
          {PARTNERS.map((p, i) => (
            <div
              key={p.id}
              className="partner-item"
              style={{
                borderRight: "1px solid rgba(13,13,20,0.1)",
                borderBottom: "1px solid rgba(13,13,20,0.1)",
                padding: "40px 36px",
                opacity: visible ? 1 : 0,
                transition: `opacity 0.5s ease ${i * 0.12}s`,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(18px, 2vw, 26px)",
                  letterSpacing: "-0.02em",
                  color: "#0D0D14",
                  marginBottom: 8,
                }}
              >
                {t(`${p.id}.name`)}
              </div>
              <div
                style={{
                  fontFamily: "Cocomat Pro, sans-serif",
                  fontSize: 13,
                  color: "rgba(13,13,20,0.45)",
                  marginBottom: 16,
                  lineHeight: 1.4,
                }}
              >
                {t(`${p.id}.full`)}
              </div>
              <div
                style={{
                  display: "inline-block",
                  background: "rgba(95,32,219,0.08)",
                  borderRadius: 999,
                  padding: "4px 12px",
                  fontFamily: "Cocomat Pro, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#5f20db",
                }}
              >
                {t(`${p.id}.role`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const { ref, visible } = useInView();
  const t = useTranslations("CTA");

  return (
    <section
      ref={ref}
      className="mobile-pad"
      style={{
        padding: "120px 40px",
        background: "#5f20db",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-50%",
          left: "60%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(134,84,232,0.5) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-30%",
          left: "-10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(39,190,108,0.15) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(32px, 6vw, 72px)",
            letterSpacing: "-0.04em",
            color: "#fff",
            lineHeight: 0.95,
            marginBottom: 32,
          }}
        >
          {t("titleLine1")}<br />{t("titleLine2")}
        </h2>

        <p
          style={{
            fontFamily: "Cocomat Pro, sans-serif",
            fontSize: 16,
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.55)",
            marginBottom: 48,
            maxWidth: 480,
            margin: "0 auto 48px",
          }}
        >
          {t("description")}
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="/registration"
            style={{
              fontFamily: "Cocomat Pro, sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: "#5f20db",
              background: "#fff",
              borderRadius: 999,
              padding: "16px 40px",
              textDecoration: "none",
              letterSpacing: "0.03em",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {t("btnRegister")}
          </a>
          <a
            href="#"
            style={{
              fontFamily: "Cocomat Pro, sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: 999,
              padding: "16px 40px",
              textDecoration: "none",
              letterSpacing: "0.03em",
              transition: "color 0.15s, border-color 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
            }}
          >
            {t("btnRules")}
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navbar");

  return (
    <footer
      className="footer-section"
      style={{
        background: "#0D0D14",
        padding: "48px 40px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 24,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 24,
        }}
      >
        {/* Логотип */}
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
            {t("subtitle")}
          </span>
        </div>

        {/* Навигационные ссылки */}
        <div
          className="footer-links"
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
              {tNav(`links.${l.id}`)}
            </a>
          ))}
        </div>

        {/* Новые контакты: Telegram, Instagram, Почта */}
        <div
          className="footer-contacts"
          style={{
            display: "flex",
            gap: 24,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="https://t.me/gtijsokz"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "Cocomat Pro, sans-serif",
              fontSize: 12,
              fontWeight: 500,
              color: "rgba(255,255,255,0.35)",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#24A1DE")} // Цвет Telegram
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
          >
            Telegram
          </a>
          <a
            href="https://instagram.com/kjso.kz"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "Cocomat Pro, sans-serif",
              fontSize: 12,
              fontWeight: 500,
              color: "rgba(255,255,255,0.35)",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#E1306C")} // Цвет Instagram
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
          >
            Instagram
          </a>
          <a
            href="mailto:info@gettoijso.kz"
            style={{
              fontFamily: "Cocomat Pro, sans-serif",
              fontSize: 12,
              fontWeight: 500,
              color: "rgba(255,255,255,0.35)",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
          >
            info@gettoijso.kz
          </a>
        </div>

        {/* Копирайт */}
        <div
          style={{
            fontFamily: "Cocomat Pro, sans-serif",
            fontSize: 11,
            color: "rgba(255,255,255,0.18)",
            letterSpacing: "0.06em",
          }}
        >
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .mobile-pad { padding: 60px 20px !important; }
          .hero-section { padding: 0 20px 60px !important; }
          
          .nav-container { padding: 0 20px !important; gap: 20px !important; }
          .desktop-links { 
            overflow-x: auto; 
            padding-bottom: 4px; 
            -webkit-overflow-scrolling: touch; 
            scrollbar-width: none; 
          }
          .desktop-links::-webkit-scrollbar { display: none; }
          
          .stats-container { padding: 0 20px !important; }
          .grid-stats { 
            grid-template-columns: repeat(2, 1fr) !important; 
            border-left: none !important; 
          }
          .stat-item { 
            padding: 20px 16px !important; 
            border-bottom: 1px solid rgba(255,255,255,0.12); 
          }
          .stat-item:nth-child(even) { border-right: none !important; }
          .stat-item:nth-last-child(-n+2) { border-bottom: none !important; }
          
          .grid-about { grid-template-columns: 1fr !important; gap: 40px !important; }
          
          .stages-section { padding: 0 20px 80px !important; }
          
          .grid-gallery { 
            grid-template-columns: repeat(2, 1fr) !important; 
            grid-auto-rows: 160px !important; 
          }
          .grid-team { grid-template-columns: repeat(2, 1fr) !important; }
          .gallery-item { grid-column: span 1 !important; }
          
          .grid-partners { grid-template-columns: 1fr !important; border-left: none !important; }
          .partner-item { border-left: 1px solid rgba(13,13,20,0.1); }
          
          .footer-section { padding: 40px 20px !important; flex-direction: column !important; align-items: flex-start !important; gap: 24px !important; }
          .footer-links { justify-content: flex-start !important; gap: 16px !important; }
        }
      `}} />

      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <StatsBarGreen />
        <About />
        <Stages />
        <Gallery />
        <Team />
        <Partners />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
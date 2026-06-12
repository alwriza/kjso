"use client";

import { useEffect, useRef, useState } from "react";

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

// ── data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Этапы", href: "#stages" },
  { label: "О нас", href: "#about" },
  { label: "Галерея", href: "#gallery" },
  { label: "Партнёры", href: "#partners" },
];

const STAGES = [
  {
    num: "01",
    tag: "21–22 ИЮНЯ",
    title: "Отборочный этап",
    sub: "Онлайн",
    body: "Проходит на платформе AppFormative. После открытия доступа у участников есть 24 часа на выполнение заданий. Предусмотрена процедура апелляции.",
    accent: "#7B3FE4",
  },
  {
    num: "02",
    tag: "27–31 ИЮЛЯ",
    title: "Заключительный этап",
    sub: "Алматы · КБТУ",
    body: "Три тура — практический, теоретический и тестовый. Проводится очно на базе Казахстанско-Британского технического университета при поддержке Фонда Beyond Curriculum.",
    accent: "#27BE6C",
  },
];

const STATS = [
  { value: "7–9", label: "классы" },
  { value: "2", label: "этапа" },
  { value: "3", label: "тура финала" },
  { value: "2026", label: "год" },
];

const PARTNERS = [
  { name: "КБТУ", full: "Казахстанско-Британский технический университет", role: "Площадка финала" },
  { name: "Ертіс Дарыны", full: "Ертіс Дарыны, Павлодар", role: "Партнёр 2025" },
  { name: "Beyond Curriculum", full: "Фонд Beyond Curriculum", role: "Партнёр 2026" },
];

const GALLERY = [
  { src: "/IMG-20250625-WA0074.jpg" },
  { src: "/IMG-20250625-WA0075.jpg" },
  { src: "/IMG-20250625-WA0084.jpg" },
  { src: "/IMG-20250625-WA0085.jpg" },
  { src: "/IMG-20250625-WA0091.jpg" }, // Добавил слеш для корректного пути
  { src: "/IMG-20250625-WA0092.jpg" }
];

// ── components ───────────────────────────────────────────────────────────────

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
        className="nav-container"
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
        <a href="#" style={{ textDecoration: "none", flexShrink: 0 }}>
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

        {/* Desktop links */}
        <div className="desktop-links" style={{ display: "flex", gap: 32, marginLeft: "auto", alignItems: "center" }}>
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

function Hero() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 80);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        minHeight: "100svh",
        background: "#0D0D14",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 40px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(75,22,163,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(75,22,163,0.12) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "55%",
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(75,22,163,0.35) 0%, transparent 70%)",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "60%",
          left: "20%",
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(39,190,108,0.12) 0%, transparent 70%)",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <h1
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(48px, 9vw, 120px)",
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            color: "#fff",
            marginBottom: 40,
          }}
        >
          <span style={{ display: "block" }}>Kazakhstan</span>
          <span style={{ display: "block" }}>
            Junior{" "}
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "1px rgba(255,255,255,0.25)",
              }}
            >
              Science
            </span>
          </span>
          <span style={{ display: "block", color: "#7B3FE4" }}>Olympiad</span>
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
              color: "rgba(255,255,255,0.45)",
              maxWidth: 420,
            }}
          >
            Национальная олимпиада по естественным наукам для школьников 7–9 классов.
            Два этапа, одна цель — выйти за рамки школьной программы.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="/registration"
              style={{
                fontFamily: "Cocomat Pro, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#fff",
                background: "#4b16a3",
                borderRadius: 999,
                padding: "14px 32px",
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "background 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#7B3FE4")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#4b16a3")}
            >
              Зарегистрироваться
            </a>
            <a
              href="#"
              style={{
                fontFamily: "Cocomat Pro, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 999,
                padding: "14px 32px",
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "border-color 0.2s, color 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.color = "rgba(255,255,255,0.6)";
              }}
            >
              Регламент
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <div
      className="stats-container"
      style={{
        background: "#4b16a3",
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
            key={s.label}
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
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function About() {
  const { ref, visible } = useInView();

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
            color: "#4b16a3",
            marginBottom: 24,
          }}
        >
          О олимпиаде
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
            Наука —<br />
            <span style={{ color: "#4b16a3" }}>вне</span> школьной<br />
            программы
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
              KJSO — это не контрольная работа с усложнёнными задачами. Это среда, в которой школьники учатся работать с неопределённостью, выдвигать гипотезы и защищать их перед экспертами.
            </p>
            <p
              style={{
                fontFamily: "Cocomat Pro, sans-serif",
                fontSize: 16,
                lineHeight: 1.75,
                color: "rgba(13,13,20,0.6)",
              }}
            >
              Олимпиада открыта для учеников 7–9 классов из всех школ Казахстана. Отборочный этап — онлайн, финал — очно в Алматы.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stages() {
  const { ref, visible } = useInView(0.1);

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
            Этапы проведения Kazakhstan Junior Science Olympiad.
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
              background: "linear-gradient(to bottom, #4b16a3, #7B3FE4)",
              borderRadius: 2,
            }}
          />

          {STAGES.map((stage, i) => (
            <div
              key={stage.num}
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
                  background: "#4b16a3",
                  border: "3px solid #F5F4F0",
                  boxShadow: "0 0 0 2px #4b16a3",
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
                  {stage.title}
                </span>
                <span
                  style={{
                    fontFamily: "Cocomat Pro, sans-serif",
                    fontSize: "clamp(16px, 2vw, 22px)",
                    fontWeight: 400,
                    color: "#7B3FE4",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {stage.tag.toLowerCase().replace("–", "-")}
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
                {stage.body}
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
            Галерея
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
            KJSO 2025 · Павлодар
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

function Partners() {
  const { ref, visible } = useInView();

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
          Партнёры
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
              key={p.name}
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
                {p.name}
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
                {p.full}
              </div>
              <div
                style={{
                  display: "inline-block",
                  background: "rgba(75,22,163,0.08)",
                  borderRadius: 999,
                  padding: "4px 12px",
                  fontFamily: "Cocomat Pro, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#4b16a3",
                }}
              >
                {p.role}
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

  return (
    <section
      ref={ref}
      className="mobile-pad"
      style={{
        padding: "120px 40px",
        background: "#4b16a3",
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
          background: "radial-gradient(circle, rgba(123,63,228,0.5) 0%, transparent 60%)",
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
          Регистрация<br />открыта
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
          Отборочный этап — 21–22 июня онлайн. Успей зарегистрироваться и получить доступ к заданиям.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="/registration"
            style={{
              fontFamily: "Cocomat Pro, sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: "#4b16a3",
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
            Зарегистрироваться
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
            Регламент
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
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
        <About />
        <Stages />
        <Gallery />
        <Partners />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
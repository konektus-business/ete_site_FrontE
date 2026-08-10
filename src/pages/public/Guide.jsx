// ========== Core Imports ==========
import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

import GuideSkeleton from "../../components/skeleton/Guideskeleton.jsx";

// ========== Asset Imports ==========
import heroImage from "../../assets/guide/guides-hero.png";
import iconChevronRight from "../../assets/guide/chevron-right.svg";
import iconChevronRightSm from "../../assets/guide/chevron-right-sm.svg";
import iconCalendar from "../../assets/guide/calendar-outline.svg";
import iconPages from "../../assets/guide/pages-outline.svg";
import iconDownload from "../../assets/guide/download.svg";
import guideCloud1 from "../../assets/guide/guide-cloud-1.png";
import guideCloud2 from "../../assets/guide/guide-cloud-2.png";
import guideCloud3 from "../../assets/guide/guide-cloud-3.png";
import guideAi1 from "../../assets/guide/guide-ai-1.png";
import guideAi2 from "../../assets/guide/guide-ai-2.png";
import guideAi3 from "../../assets/guide/guide-ai-3.png";
import guideMigration1 from "../../assets/guide/guide-migration-1.png";
import guideMigration2 from "../../assets/guide/guide-migration-2.png";
import guideMigration3 from "../../assets/guide/guide-migration-3.png";
// Wave assets (shared with About page)
import imgStatsBg from "../../assets/about/wave-main.svg";
import imgStatsNumbersGlow from "../../assets/about/stats-numbers-glow.png";

// ========== Font Constant ==========
const F = "font-['Archivo']";

// ========== Animation Presets ==========
// Spring physics for smooth motion
const SPRING = { type: "spring", stiffness: 100, damping: 16, mass: 1 };
// Fade-up variants for reveal animations
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: SPRING },
};
// Stagger children for lists
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

// ========== Per‑digit Odometer Timing ==========
// From About page (same profiles)
const DIGIT_PROFILES = [
  { delay: 0.15, duration: 1.6, ease: "easeOut" },
  { delay: 0.3, duration: 1.4, ease: "easeOut" },
  { delay: 0.5, duration: 1.15, ease: "easeIn" },
  { delay: 0.45, duration: 1.6, ease: "easeOut" },
  { delay: 0.2, duration: 1.15, ease: "easeIn" },
];

// ========== Wave Lines Constants ==========
// SVG paths and spark animations (same as About)
const WAVE_PATHS = [
  "M0.359375 1.75655C134.329 140.171 282.518 201.571 474.117 201.571C665.716 201.571 730.081 201.571 967.332 201.571C1204.58 201.571 1347.92 101.486 1440.34 0.336914",
  "M0.359375 139.571C138.733 199.8 251.607 226.371 472.854 226.371C694.102 226.371 734.602 226.371 967.849 226.371C1201.1 226.371 1309.47 195.548 1440.34 139.571",
  "M0.359375 250.463H1440.34",
  "M0.359375 361C138.733 300.771 251.607 274.2 472.854 274.2C694.102 274.2 734.602 274.2 967.849 274.2C1201.1 274.2 1309.47 305.023 1440.34 361",
  "M0.359375 499.168C134.329 360.754 282.518 299.354 474.117 299.354C665.716 299.354 730.081 299.354 967.332 299.354C1204.58 299.354 1347.92 399.439 1440.34 500.588",
];
const SPARK_ANIMS = [
  { attr: "width", values: "70;20;20;70" },
  { attr: "x", values: "-70;-20;-20;-70" },
  { attr: "y", values: "-9;-1;-1;-9" },
];

// ========== Responsive helper ==========
// The odometer digits below are sized with raw pixel `height`/`width` props
// (not Tailwind classes), so a breakpoint check in JS is needed to scale
// them down on small screens alongside the responsive font-size classes.
function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

// ========== Content Data ==========
// Statistics for the wave section
const STATS = [
  { value: "18", label: "Guides disponibles" },
  { value: "+3200", label: "Téléchargements" },
  { value: "2025", label: "Mis à jour" },
];

// Guide categories and their guides
const GUIDE_CATEGORIES = [
  {
    id: "voip",
    title: "VoIP & Téléphonie",
    guides: [
      {
        id: "g1",
        badge: "GUIDE TECHNIQUE",
        image: guideCloud1,
        date: "Jan 2025",
        pages: "24 pages",
        title: "Migration Cloud : Le livre blanc",
        description:
          "Comment réussir votre transition vers une téléphonie 100% dématérialisée sans interruption de service.",
      },
      {
        id: "g2",
        badge: "GUIDE COMPLET",
        image: guideCloud2,
        date: "Jan 2025",
        pages: "24 pages",
        title: "Communication Multi-sites Afrique",
        description:
          "Optimiser la connectivité de vos filiales au Maghreb et en Afrique Subsaharienne avec la technologie SD-WAN.",
      },
      {
        id: "g3",
        badge: "GUIDE TECHNIQUE",
        image: guideCloud3,
        date: "Jan 2025",
        pages: "24 pages",
        title: "Centre d'appel performant",
        description:
          "Une check-list pratique pour auditer et améliorer l'efficacité opérationnelle de votre centre de relation.",
      },
    ],
  },
  {
    id: "ia",
    title: "Intelligence Artificielle",
    guides: [
      {
        id: "g4",
        badge: "GUIDE TECHNIQUE",
        image: guideAi1,
        date: "Jan 2025",
        pages: "24 pages",
        title: "L'IA au service de la relation client",
        description:
          "Comment l'IA générative transforme l'expérience client et booste la productivité de vos agents.",
      },
      {
        id: "g5",
        badge: "GUIDE COMPLET",
        image: guideAi2,
        date: "Jan 2025",
        pages: "24 pages",
        title: "Automatisation Intelligente",
        description:
          "Découvrez comment l'IPA (Intelligent Process Automation) réduit vos coûts opérationnels de 30%.",
      },
      {
        id: "g6",
        badge: "GUIDE TECHNIQUE",
        image: guideAi3,
        date: "Jan 2025",
        pages: "24 pages",
        title: "L'IA dans votre centre de contact",
        description:
          "Transcription, résumés, analyse des sentiments : passer de la théorie à l'usage quotidien en 30 jours.",
      },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & Migration",
    guides: [
      {
        id: "g7",
        badge: "GUIDE TECHNIQUE",
        image: guideMigration1,
        date: "Jan 2025",
        pages: "36 pages",
        title: "Migrer vers le cloud sans coupure",
        description:
          "De l'audit initial au go-live, plan de migration en 6 semaines pour les équipes IT. Destiné : DSI, responsables IT, architectes système.",
      },
      {
        id: "g8",
        badge: "GUIDE COMPLET",
        image: guideMigration2,
        date: "Jan 2025",
        pages: "24 pages",
        title: "Haute disponibilité 99,9%",
        description:
          "Traduction concrète du SLA cloud — ce que vous payez, ce que vous êtes en droit d'exiger.",
      },
      {
        id: "g9",
        badge: "LE GUIDE DU DSI",
        image: guideMigration3,
        date: "Jan 2025",
        pages: "24 pages",
        title: "Sécurité & Conformité dans le cloud",
        description:
          "RGPD, chiffrement E2EE, droits d'accès et audits — tout ce qu'un responsable IT doit exiger de son prestataire cloud.",
      },
    ],
  },
];

// ========== Sub‑components ==========

// ----- WaveLines (animated sparks on wave paths) -----
const WaveLines = React.memo(({ start }) => (
  <svg
    viewBox="0 0 1440 501"
    preserveAspectRatio="none"
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 h-full w-full"
  >
    <defs>
      <linearGradient id="spark-fade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#0B3F34" stopOpacity="0" />
        <stop offset="100%" stopColor="#0B3F34" stopOpacity="1" />
      </linearGradient>
    </defs>
    {start &&
      WAVE_PATHS.filter((_, i) => i !== 2).map((d, i) => (
        <rect key={i} y="-1.9" height="2.6" rx="1.3" fill="url(#spark-fade)">
          <animateMotion dur="4s" begin={`${i * 0.35}s`} repeatCount="indefinite" rotate="auto" path={d} />
          {SPARK_ANIMS.map((a) => (
            <animate
              key={a.attr}
              attributeName={a.attr}
              keyTimes="0; 0.33; 0.67; 1"
              values={a.values}
              dur="4s"
              begin={`${i * 0.35}s`}
              repeatCount="indefinite"
            />
          ))}
        </rect>
      ))}
  </svg>
));

// ----- RollingDigit (odometer digit) -----
const RollingDigit = React.memo(({ digit, start, height, width, extraDelay = 0, profile }) => {
  const totalSteps = 2 * 10 + digit;
  const sequence = Array.from({ length: totalSteps + 1 }, (_, i) => i % 10);
  return (
    <span className="relative inline-block overflow-hidden" style={{ height, width }}>
      <motion.span
        className="absolute left-0 top-0 flex flex-col items-center"
        initial={{ y: 0, filter: "blur(0px)" }}
        animate={
          start
            ? { y: -totalSteps * height, filter: ["blur(0px)", "blur(6px)", "blur(0px)"] }
            : { y: 0, filter: "blur(0px)" }
        }
        transition={{
          y: { duration: profile.duration, delay: profile.delay + extraDelay, ease: profile.ease },
          filter: { duration: profile.duration, delay: profile.delay + extraDelay, times: [0, 0.4, 1] },
        }}
      >
        {sequence.map((d, i) => (
          <span key={i} className="flex items-center justify-center" style={{ height, width }}>
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
});

// ----- StatDisplay (one statistic block with rolling numbers) -----
// digitHeight/digitWidth are the desktop pixel sizes; `isMobile` scales them
// down (~0.7x) to match the responsive font-size classes below.
const StatDisplay = React.memo(({ stat, start, index, isMobile }) => {
  const { value, label } = stat;
  const chars = value.split("");
  const scale = isMobile ? 0.68 : 1;
  const digitHeight = Math.round(48 * scale);
  const digitWidth = Math.round(28 * scale);

  return (
    <motion.div variants={fadeUp} className="flex flex-col items-center gap-2 text-center">
      <div className="flex h-9 items-end justify-center sm:h-12">
        <span
          className={`inline-flex items-end font-medium leading-none tracking-[-0.5px] text-[#0b3f34] tabular-nums text-[32px] sm:text-[48px] ${F}`}
        >
          {chars.map((ch, i) => {
            if (ch === "+") {
              return <span key={i} className="ml-1">+</span>;
            }
            const digit = Number(ch);
            if (!isNaN(digit)) {
              return (
                <RollingDigit
                  key={i}
                  digit={digit}
                  start={start}
                  height={digitHeight}
                  width={digitWidth}
                  extraDelay={index * 0.15 + i * 0.1 + 0.2}
                  profile={DIGIT_PROFILES[i % DIGIT_PROFILES.length]}
                />
              );
            }
            return <span key={i}>{ch}</span>;
          })}
        </span>
      </div>
      <span className={`${F} text-sm font-normal tracking-[-0.24px] text-[#0b3f34] sm:text-base`}>{label}</span>
    </motion.div>
  );
});

// ----- GuideCard (single guide preview) -----
const GuideCard = React.memo(({ guide }) => (
  <motion.article
    variants={fadeUp}
    className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#006b57]/70 bg-white shadow-[0px_4px_50px_5px_rgba(13,81,67,0.15)]"
  >
    <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-48">
      <img src={guide.image} alt={guide.title} className="size-full object-cover" />
      <span className="absolute left-4 top-4 rounded bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#006b57] backdrop-blur-sm">
        {guide.badge}
      </span>
    </div>
    <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#6c7a75]">
        <img src={iconCalendar} alt="" className="size-2.5" />
        <span>{guide.date}</span>
        <span>•</span>
        <img src={iconPages} alt="" className="size-2.5" />
        <span>{guide.pages}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <h4 className="text-lg text-[#171d1b] sm:text-xl">{guide.title}</h4>
        <p className="text-sm text-[#3c4a45]">{guide.description}</p>
      </div>
      <button
        type="button"
        className="mt-auto flex items-center justify-center gap-2 rounded-lg border border-[#006b57] px-6 py-3 text-sm font-bold text-[#006b57] transition-colors hover:bg-[#006b57] hover:text-white sm:px-8 sm:py-4 sm:text-base"
      >
        <img src={iconDownload} alt="" className="size-5" />
        Télécharger PDF
      </button>
    </div>
  </motion.article>
));

// ----- CategorySection (one category with its guides) -----
const CategorySection = React.memo(({ category }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
    className="flex w-full flex-col gap-8"
  >
    <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#1eb394]/20 pb-2">
      <h3 className="list-disc text-xl font-semibold text-[#171d1b] before:mr-3 before:inline-block before:size-2 before:rounded-full before:bg-[#171d1b] before:align-middle sm:text-2xl">
        {category.title}
      </h3>
      <a href="#" className="flex items-center gap-2 text-sm font-bold text-[#006b57] sm:text-base">
        Voir tout
        <img src={iconChevronRightSm} alt="" className="size-2" />
      </a>
    </div>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="grid w-full grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3"
    >
      {category.guides.map((guide) => (
        <GuideCard key={guide.id} guide={guide} />
      ))}
    </motion.div>
  </motion.div>
));

// ========== Main Component ==========
export default function Guide() {
  const [isLoaded, setIsLoaded] = useState(false);
  const statsRef = React.useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.4 });
  const isMobile = useIsMobile();

  useEffect(() => {
    const images = [
      heroImage,
      iconChevronRight,
      iconChevronRightSm,
      iconCalendar,
      iconPages,
      iconDownload,
      guideCloud1,
      guideCloud2,
      guideCloud3,
      guideAi1,
      guideAi2,
      guideAi3,
      guideMigration1,
      guideMigration2,
      guideMigration3,
      imgStatsBg,
      imgStatsNumbersGlow,
    ];

    let loadedCount = 0;
    const imageObjects = [];

    const onLoadOrError = () => {
      loadedCount += 1;
      if (loadedCount >= images.length) {
        setIsLoaded(true);
      }
    };

    images.forEach((src) => {
      const img = new Image();
      imageObjects.push(img);
      img.onload = onLoadOrError;
      img.onerror = onLoadOrError;
      img.src = src;
    });

    return () => {
      imageObjects.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  if (!isLoaded) return <GuideSkeleton />;

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#f8fcfb] to-[#e9f7f4]">
      {/* ===== CENTERED CONTENT CONTAINER (Hero, Guides, CTA) ===== */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 pt-28 sm:px-6 sm:pt-40 lg:pt-[260px]">
        {/* ----- HERO SECTION ----- */}
        <section className="flex w-full items-center justify-center gap-10 pb-12 sm:pb-16 lg:gap-20 lg:pb-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex max-w-[563px] flex-col gap-5 text-center sm:gap-7 lg:text-left"
          >
            <motion.h1 variants={fadeUp} className="text-[28px] font-extrabold leading-[1.3] tracking-[-0.5px] sm:text-[36px] sm:leading-[1.25] sm:tracking-[-0.8px] lg:text-[44px] lg:leading-[60px] lg:tracking-[-0.96px]">
              <span className="text-[#0f172a]">Guides pour </span>
              <span className="bg-gradient-to-r from-[#0d5143] to-[#1eb394] bg-clip-text text-transparent">
                transformer votre communication
              </span>
              <span className="text-[#0f172a]"> d'entreprise</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-base leading-7 text-black sm:text-lg sm:leading-8 lg:text-xl lg:leading-[35px]">
              Des ressources concrètes rédigées par les experts Konektus, téléchargeables gratuitement. De la
              migration VoIP à la transformation digitale au Maghreb et en Afrique.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:justify-start">
              <button
                type="button"
                className="flex items-center gap-3 rounded-3xl px-6 py-3 text-sm font-bold text-white sm:gap-4 sm:px-8 sm:py-4 sm:text-base"
                style={{ backgroundImage: "linear-gradient(154deg, #1eb394 15%, #006b57 84%)" }}
              >
                Explorer les guides
                <img src={iconChevronRight} alt="" className="size-3" />
              </button>
              <button
                type="button"
                className="flex items-center gap-3 rounded-3xl border-2 border-[#006b57] px-6 py-3 text-sm font-bold text-[#0d5143] sm:gap-4 sm:px-8 sm:py-4 sm:text-base"
              >
                Découvrir KonektUs
                <img src={iconChevronRight} alt="" className="size-3" />
              </button>
            </motion.div>
          </motion.div>
          <motion.img
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            src={heroImage}
            alt="Illustration guides KoneKtUS"
            className="hidden max-w-[658px] flex-1 lg:block"
          />
        </section>
      </div>

      {/* ===== STATISTICS SECTION – FULL WIDTH (matches About) ===== */}
      <section
        ref={statsRef}
        className="relative mt-10 flex w-full min-h-[320px] items-center justify-center overflow-hidden py-16 sm:mt-16 sm:min-h-[480px] sm:py-24 lg:py-32"
      >
        <img
          src={imgStatsBg}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        />
        <img
          src={imgStatsNumbersGlow}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[5] h-full w-full object-contain object-center opacity-70"
        />
        <WaveLines start={isStatsInView} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="relative z-10 mx-auto flex w-full max-w-[900px] flex-wrap items-start justify-center gap-x-6 gap-y-8 px-5 sm:gap-x-8 sm:gap-y-10 sm:px-6"
        >
          {STATS.map((stat, i) => (
            <StatDisplay key={stat.label} stat={stat} start={isStatsInView} index={i} isMobile={isMobile} />
          ))}
        </motion.div>
      </section>

      {/* ===== GUIDES BY CATEGORY ===== */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 sm:px-6">
        <section className="flex w-full flex-col items-center gap-12 py-16 sm:gap-16 sm:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex items-center gap-4 sm:gap-6"
          >
            <span className="hidden h-px w-[60px] bg-[#0d5143]/20 sm:block sm:w-[100px]" />
            <h2 className="text-center text-2xl font-black text-[#0d5143] sm:text-3xl lg:text-4xl">Nos guides par catégorie</h2>
            <span className="hidden h-px w-[60px] bg-[#0d5143]/20 sm:block sm:w-[100px]" />
          </motion.div>

          <div className="flex w-full flex-col gap-10 sm:gap-14">
            {GUIDE_CATEGORIES.map((category) => (
              <CategorySection key={category.id} category={category} />
            ))}
          </div>

          <button
            type="button"
            className="rounded-3xl border border-[#1eb394] bg-[#126b59] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0d5143] sm:text-base"
          >
            Voir plus
          </button>
        </section>

        {/* ===== FINAL CALL-TO-ACTION ===== */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="relative mb-16 flex w-full flex-col items-center gap-6 overflow-hidden rounded-[24px] bg-[#126b59] px-6 py-12 text-center sm:mb-24 sm:gap-8 sm:rounded-[48px] sm:px-8 sm:py-24"
        >
          <div className="pointer-events-none absolute -right-48 -top-40 size-[384px] rounded-full bg-[#77f9d6]/30 blur-[50px]" />
          <div className="pointer-events-none absolute -bottom-48 -left-48 size-[384px] rounded-full bg-[#003e32]/30 blur-[50px]" />
          <h2 className="relative max-w-[944px] text-2xl font-extrabold leading-tight tracking-[-0.5px] text-white sm:text-3xl lg:text-[44px] lg:leading-[60px] lg:tracking-[-1.5px]">
            Transformez votre communication dès aujourd'hui
          </h2>
          <div className="relative flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-6">
            <button
              type="button"
              className="w-full max-w-[279px] rounded-full bg-white px-8 py-4 text-base font-semibold text-[#2b6859] shadow-[0px_8px_10px_rgba(0,0,0,0.25)] sm:w-[279px] sm:text-lg"
            >
              Contactez-Nous
            </button>
            <button
              type="button"
              className="w-full max-w-[279px] rounded-full bg-white px-8 py-4 text-base font-bold text-[#2b6859] shadow-[0px_8px_10px_rgba(0,0,0,0.25)] sm:w-[279px] sm:text-lg"
            >
              Commencer maintenant
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
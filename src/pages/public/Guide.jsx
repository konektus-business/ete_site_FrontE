import React,{useState,useEffect} from "react";
import { motion, useInView } from "framer-motion";
import apiClient from "../../api/apiClient";

// ===== Assets =====
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

// Wave assets (from About)
import imgStatsBg from "../../assets/about/wave-main.svg";
import imgStatsNumbersGlow from "../../assets/about/stats-numbers-glow.png";

// ===== Font constant (matching About) =====
const F = "font-['Archivo']";

/* =========================================================================
   Animation constants (matches About)
   ========================================================================= */
const SPRING = { type: "spring", stiffness: 100, damping: 16, mass: 1 };
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: SPRING },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

// Per‑digit timing profiles (same as About)
const DIGIT_PROFILES = [
  { delay: 0.15, duration: 1.6, ease: "easeOut" },
  { delay: 0.3, duration: 1.4, ease: "easeOut" },
  { delay: 0.5, duration: 1.15, ease: "easeIn" },
  { delay: 0.45, duration: 1.6, ease: "easeOut" },
  { delay: 0.2, duration: 1.15, ease: "easeIn" },
];

// ===== Wave lines constants (copied from About) =====
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

/* =========================================================================
   WaveLines component (exactly as in About)
   ========================================================================= */
const WaveLines = ({ start }) => (
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
);

/* =========================================================================
   RollingDigit & StatDisplay (same as About – with Archivo font)
   ========================================================================= */
const RollingDigit = ({ digit, start, height, width, extraDelay = 0, profile }) => {
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
};

const StatDisplay = ({ stat, start, index }) => {
  const { value, label } = stat;
  const chars = value.split("");
  const digitHeight = 48;
  const digitWidth = 28;

  return (
    <motion.div variants={fadeUp} className="flex flex-col items-center gap-2 text-center">
      <div className="flex h-12 items-end justify-center">
        <span
          className={`inline-flex items-end font-medium leading-none tracking-[-0.5px] text-[#0b3f34] tabular-nums text-[48px] ${F}`}
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
      <span className={`${F} text-base font-normal tracking-[-0.24px] text-[#0b3f34]`}>{label}</span>
    </motion.div>
  );
};

/* =========================================================================
   Data
   ========================================================================= */
const STATS = [
  { value: "18", label: "Guides disponibles" },
  { value: "+3200", label: "Téléchargements" },
  { value: "2025", label: "Mis à jour" },
];


/* =========================================================================
   Sub‑components
   ========================================================================= */
const GuideCard = ({ guide }) => (
  <motion.article
    variants={fadeUp}
    className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#006b57]/70 bg-white shadow-[0px_4px_50px_5px_rgba(13,81,67,0.15)]"
  >
    <div className="relative h-48 w-full shrink-0 overflow-hidden">
      <img src={guide.image} alt={guide.title} className="size-full object-cover" />
      <span className="absolute left-4 top-4 rounded bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#006b57] backdrop-blur-sm">
        {guide.badge}
      </span>
    </div>
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div className="flex items-center gap-2 text-xs font-semibold text-[#6c7a75]">
        <img src={iconCalendar} alt="" className="size-2.5" />
        <span>{guide.date}</span>
        <span>•</span>
        <img src={iconPages} alt="" className="size-2.5" />
        <span>{guide.pages}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <h4 className="text-xl text-[#171d1b]">{guide.title}</h4>
        <p className="text-sm text-[#3c4a45]">{guide.description}</p>
      </div>
      <a
        href={`${import.meta.env.VITE_API_URL}/guides/${guide.id}/download`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto flex items-center justify-center gap-2 rounded-lg border border-[#006b57] px-8 py-4 text-base font-bold text-[#006b57] transition-colors hover:bg-[#006b57] hover:text-white"
      >
        <img src={iconDownload} alt="" className="size-5" />
        Télécharger PDF
      </a>
    </div>
  </motion.article>
);

const CategorySection = ({ category }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
    className="flex w-full flex-col gap-8"
  >
    <div className="flex items-end justify-between border-b border-[#1eb394]/20 pb-1">
      <h3 className="list-disc text-2xl font-semibold text-[#171d1b] before:mr-3 before:inline-block before:size-2 before:rounded-full before:bg-[#171d1b] before:align-middle">
        {category.title}
      </h3>
      <a href="#" className="flex items-center gap-2 text-base font-bold text-[#006b57]">
        Voir tout
        <img src={iconChevronRightSm} alt="" className="size-2" />
      </a>
    </div>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="grid w-full grid-cols-1 gap-8 md:grid-cols-3"
    >
      {category.guides.map((guide) => (
        <GuideCard key={guide.id} guide={guide} />
      ))}
    </motion.div>
  </motion.div>
);

/* =========================================================================
   Main Guide component – stats dimensions exactly like About
   ========================================================================= */
export default function Guide() {
  const statsRef = React.useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.4 });
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    apiClient.get("/guides", { params: { limit: 100 } }).then((res) => {
      const guides = res.data.items;
      const grouped = guides.reduce((acc, guide) => {
        const catId = guide.category.id;
        if (!acc[catId]) {
          acc[catId] = { id: catId, title: guide.category.nom, guides: [] };
        }
        acc[catId].guides.push({
          id: guide.id,
          badge: guide.badge,
          image: guide.imageUrl,
          date: guide.datePublication,
          pages: `${guide.nombrePages} pages`,
          title: guide.titre,
          description: guide.description,
        });
        return acc;
      }, {});
      setCategories(Object.values(grouped));
    });
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#f8fcfb] to-[#e9f7f4]">
      {/* ===== Centered content container (Hero, Guides, CTA) ===== */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-6 pt-[260px]">
        {/* ----- HERO ----- */}
        <section className="flex w-full items-center justify-center gap-20 pb-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex max-w-[563px] flex-col gap-7"
          >
            <motion.h1 variants={fadeUp} className="text-[44px] font-extrabold leading-[60px] tracking-[-0.96px]">
              <span className="text-[#0f172a]">Guides pour </span>
              <span className="bg-gradient-to-r from-[#0d5143] to-[#1eb394] bg-clip-text text-transparent">
                transformer votre communication
              </span>
              <span className="text-[#0f172a]"> d'entreprise</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl leading-[35px] text-black">
              Des ressources concrètes rédigées par les experts Konektus, téléchargeables gratuitement. De la
              migration VoIP à la transformation digitale au Maghreb et en Afrique.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="flex items-center gap-4 rounded-3xl px-8 py-4 text-base font-bold text-white"
                style={{ backgroundImage: "linear-gradient(154deg, #1eb394 15%, #006b57 84%)" }}
              >
                Explorer les guides
                <img src={iconChevronRight} alt="" className="size-3" />
              </button>
              <button
                type="button"
                className="flex items-center gap-4 rounded-3xl border-2 border-[#006b57] px-8 py-4 text-base font-bold text-[#0d5143]"
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

      {/* ===== STATS – FULL WIDTH, DIMENSIONS MATCH ABOUT ===== */}
      <section
        ref={statsRef}
        className="relative mt-16 flex w-full min-h-[480px] items-center justify-center overflow-hidden py-24 sm:py-32"
      >
        {/* Background wave image */}
        <img
          src={imgStatsBg}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Glow overlay */}
        <img
          src={imgStatsNumbersGlow}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[5] h-full w-full object-contain object-center opacity-70"
        />
        {/* Animated wave lines with sparks */}
        <WaveLines start={isStatsInView} />

        {/* Stats numbers – exactly like About's container */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="relative z-10 mx-auto flex w-full max-w-[900px] flex-wrap items-start justify-center gap-x-8 gap-y-10 px-6"
        >
          {STATS.map((stat, i) => (
            <StatDisplay key={stat.label} stat={stat} start={isStatsInView} index={i} />
          ))}
        </motion.div>
      </section>

      {/* ===== Rest of content – back inside max‑width container ===== */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-6">
        {/* ----- GUIDES BY CATEGORY ----- */}
        <section className="flex w-full flex-col items-center gap-16 py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex items-center gap-6"
          >
            <span className="hidden h-px w-[100px] bg-[#0d5143]/20 sm:block" />
            <h2 className="text-center text-4xl font-black text-[#0d5143]">Nos guides par catégorie</h2>
            <span className="hidden h-px w-[100px] bg-[#0d5143]/20 sm:block" />
          </motion.div>

          <div className="flex w-full flex-col gap-14">
            {categories.map((category) => (
              <CategorySection key={category.id} category={category} />
            ))}
          </div>

          <button
            type="button"
            className="rounded-3xl border border-[#1eb394] bg-[#126b59] px-6 py-3 text-base font-medium text-white transition-colors hover:bg-[#0d5143]"
          >
            Voir plus
          </button>
        </section>

        {/* ----- FINAL CTA ----- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="relative mb-24 flex w-full flex-col items-center gap-8 overflow-hidden rounded-[48px] bg-[#126b59] px-8 py-24 text-center"
        >
          <div className="pointer-events-none absolute -right-48 -top-40 size-[384px] rounded-full bg-[#77f9d6]/30 blur-[50px]" />
          <div className="pointer-events-none absolute -bottom-48 -left-48 size-[384px] rounded-full bg-[#003e32]/30 blur-[50px]" />
          <h2 className="relative max-w-[944px] text-[44px] font-extrabold leading-[60px] tracking-[-1.5px] text-white">
            Transformez votre communication dès aujourd'hui
          </h2>
          <div className="relative flex flex-wrap items-center justify-center gap-6">
            <button
              type="button"
              className="w-[279px] rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#2b6859] shadow-[0px_8px_10px_rgba(0,0,0,0.25)]"
            >
              Contactez-Nous
            </button>
            <button
              type="button"
              className="w-[279px] rounded-full bg-white px-8 py-4 text-lg font-bold text-[#2b6859] shadow-[0px_8px_10px_rgba(0,0,0,0.25)]"
            >
              Commencer maintenant
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
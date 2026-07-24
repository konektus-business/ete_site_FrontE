import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

// ===== Assets =====
import bgImage from "../../assets/about/about.png";
import imgHeroCircle from "../../assets/about/hero-circle.png";
import imgIconExperience from "../../assets/about/icon-experience.svg";
import imgIconGlobal from "../../assets/about/icon-global.svg";
import imgMission1 from "../../assets/about/mission-1.png";
import imgMission2 from "../../assets/about/mission-2.png";
import imgMission3 from "../../assets/about/mission-3.png";
import imgIconTransparency from "../../assets/about/icon-transparency.svg";
import imgIconInnovation from "../../assets/about/icon-innovation.svg";
import imgIconLicense from "../../assets/about/icon-license.svg";
import imgIconSecurity from "../../assets/about/icon-security.svg";
import imgIconEcosystem from "../../assets/about/icon-ecosystem.svg";
import imgTeamDirecteur from "../../assets/about/team-directeur.png";
import imgTeamMarketing from "../../assets/about/team-marketing.png";
import imgStatsBg from "../../assets/about/wave-main.svg";
import imgStatsNumbersGlow from "../../assets/about/stats-numbers-glow.png";
import imgArrowLeft from "../../assets/about/arrow-left.svg";
import imgArrowRight from "../../assets/about/arrow-right.svg";

const F = "font-['Archivo']";

// ===== Motion presets =====
const SPRING = { type: "spring", stiffness: 100, damping: 16, mass: 1 };
const sectionVars = { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0, transition: SPRING } };
const staggerParent = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } };
const staggerChild = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: SPRING } };

// Per‑digit odometer timing (from Figma's "After delay" reactions)
const DIGIT_PROFILES = [
  { delay: 0.15, duration: 1.6, ease: "easeOut" },
  { delay: 0.3, duration: 1.4, ease: "easeOut" },
  { delay: 0.5, duration: 1.15, ease: "easeIn" },
  { delay: 0.45, duration: 1.6, ease: "easeOut" },
  { delay: 0.2, duration: 1.15, ease: "easeIn" },
];

// ===== Static data =====
const MISSIONS = [
  { image: imgMission1, title: "Transformation Digitale", description: "Modernisation complète des infrastructures et processus métier." },
  { image: imgMission2, title: "Techniques de communication", description: "Optimisation des flux d'information internes et externes." },
  { image: imgMission3, title: "Relations professionnelles", description: "Développement d'écosystèmes collaboratifs durables." },
];

const VALUES = [
  { icon: imgIconTransparency, title: "Transparence Totale", description: "Une communication honnête et des processus ouverts à chaque étape du cycle de développement." },
  { icon: imgIconInnovation, title: "Innovation Continue", description: "Veille technologique permanente pour intégrer les dernières avancées Open Source." },
  { icon: imgIconLicense, title: "Zéro Licence Propriétaire", description: "Indépendance technologique totale garantie pour tous nos clients et partenaires." },
  { icon: imgIconSecurity, title: "Sécurité Renforcée", description: "Protocoles de cybersécurité de pointe intégrés nativement dans chaque solution." },
  { icon: imgIconEcosystem, title: "Écosystème Évolutif", description: "Architectures modulaires conçues pour grandir avec les ambitions de votre entreprise." },
];

const TEAM = [
  { name: "Ahmed Youssef", role: "Direction", title: "Directeur Général", bio: "Pilote la stratégie et l'entreprise.", image: imgTeamDirecteur, linkedin: "#", website: "#" },
  { name: "Salma Bouzid", role: "Marketing", title: "Responsable Marketing", bio: "Construit la marque et la croissance.", image: imgTeamMarketing, linkedin: "#", website: "#" },
  { name: "Ahmed Youssef", role: "Direction", title: "Directeur Général", bio: "Pilote la stratégie et l'entreprise.", image: imgTeamDirecteur, linkedin: "#", website: "#" },
  { name: "Salma Bouzid", role: "Marketing", title: "Responsable Marketing", bio: "Construit la marque et la croissance.", image: imgTeamMarketing, linkedin: "#", website: "#" },
];

const HERO_BADGES = [
  { icon: imgIconExperience, text: "+20 ans Expérience", iconClass: "h-[21px] w-[22px]" },
  { icon: imgIconGlobal, text: "Présence internationale", iconClass: "size-5" },
];

const STATS = [
  { value: 1, suffix: "", label: "Écosystème", fontSize: "text-[64px]", digitHeight: 64, digitWidth: 38 },
  { value: 40, suffix: "+", label: "Années", fontSize: "text-[64px]", digitHeight: 64, digitWidth: 38 },
  { value: 900, suffix: "k+", label: "Utilisateurs potentiels", fontSize: "text-[60px]", digitHeight: 60, digitWidth: 36 },
  { value: null, suffix: "", label: "Evolutivité garantie", fontSize: "" },
];

// ===== Mission slider constants =====
const CARD_STEP = 448;
const MISSION_EASE = [0.782000720500946, 0.012000122107565403, 0.17400024831295013, 0.996000349521637];
const LOOP_COPIES = 9;
const MISSION_START_INDEX = MISSIONS.length * Math.floor(LOOP_COPIES / 2);
const LOOPED_MISSIONS = Array.from({ length: MISSIONS.length * LOOP_COPIES }, (_, i) => MISSIONS[i % MISSIONS.length]);

// ===== Wave lines SVG paths =====
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

// ===== Reusable Icons =====
const ChevronIcon = ({ expanded }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"
    className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[18px] w-[18px]" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <line x1="7.5" y1="10" x2="7.5" y2="16.5" />
    <circle cx="7.5" cy="7" r="0.9" fill="currentColor" stroke="none" />
    <path d="M11 16.5v-4c0-1.4 1-2.5 2.3-2.5s2.2 1 2.2 2.5v4" />
  </svg>
);
const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[18px] w-[18px]" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <ellipse cx="12" cy="12" rx="4" ry="9" />
    <line x1="3" y1="12" x2="21" y2="12" />
  </svg>
);

// ===== Sub‑components =====

// Mission card (image with overlay)
const MissionCard = ({ mission }) => (
  <div className="relative h-[380px] w-full shrink-0 overflow-hidden rounded-[30px] sm:h-[412px] sm:w-[447px] sm:flex-none sm:min-w-[447px] group">
    <img src={mission.image} alt={mission.title} className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out group-hover:blur-sm group-hover:scale-105" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/0 from-[35%] to-black to-[100%]" />
    <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-8 text-white">
      <h3 className={`${F} text-xl font-extrabold`}>{mission.title}</h3>
      <p className={`${F} text-base leading-5 text-white/90 opacity-0 translate-y-2 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0`}>
        {mission.description}
      </p>
    </div>
  </div>
);

// Value card (with hover lift)
const ValueCard = ({ value }) => (
  <motion.div
    variants={staggerChild}
    whileHover={{ y: -8, boxShadow: "0px 20px 50px 0px #126b59, 0px 0px 0px 4px #ffffff" }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="relative flex w-full max-w-[336px] flex-col gap-8 overflow-hidden rounded-xl bg-white px-6 py-8 shadow-[0px_12px_40px_0px_#126b59,0px_0px_0px_4px_white]"
  >
    <motion.div whileHover={{ scale: 1.08, rotate: 4 }} transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex size-14 items-center justify-center rounded-xl bg-[#006b57]/10">
      <img src={value.icon} alt="" className="size-6" />
    </motion.div>
    <div className="flex flex-col gap-4">
      <h3 className={`${F} text-xl font-bold uppercase tracking-[-0.5px] text-[#1a1c1c]`}>{value.title}</h3>
      <p className={`${F} text-base leading-6 text-[#3c4a45]`}>{value.description}</p>
    </div>
  </motion.div>
);

// Team card with expandable bio
const TeamCard = ({ member }) => {
  const isMarketing = member.role === "Marketing";
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={staggerChild}
      className={`group relative h-[326px] w-[271px] shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-[#1eb395] via-[#16826c] to-[#0d5143] ${isMarketing ? "flex items-center justify-center" : ""}`}
      onMouseLeave={() => setExpanded(false)}
    >
      <img src={member.image} alt={member.name}
        className={`transition-transform duration-500 ease-out group-hover:scale-105 ${isMarketing ? "w-[226px] h-[321px] aspect-[69/98] object-cover" : "absolute inset-0 h-full w-full object-cover"}`}
      />
      <div className={`pointer-events-none absolute inset-x-0 bottom-0 opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 ${expanded ? "h-full" : "h-1/2"}`}
        style={{ background: expanded ? "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0) 80%)" : "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)" }}
      />
      <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
        <div className="flex items-center justify-between gap-2">
          <p className={`${F} text-base font-bold leading-tight text-white`}>{member.name}</p>
          <button type="button" aria-label={expanded ? "Réduire" : "Voir plus"} onClick={(e) => { e.stopPropagation(); setExpanded(v => !v); }}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition duration-300 ease-out hover:bg-white/25">
            <ChevronIcon expanded={expanded} />
          </button>
        </div>
        <p className={`mt-0.5 ${F} text-sm font-normal text-white/85`}>{member.title}</p>
        <div className={`grid transition-all duration-300 ease-out ${expanded ? "mt-1.5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden">
            <p className={`${F} text-xs leading-snug text-white/75`}>{member.bio}</p>
            <div className="mt-3 flex items-center gap-3">
              <a href={member.linkedin} aria-label={`LinkedIn de ${member.name}`} className="text-white/90 transition hover:text-white"><LinkedinIcon /></a>
              <a href={member.website} aria-label={`Site web de ${member.name}`} className="text-white/90 transition hover:text-white"><GlobeIcon /></a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ===== Odometer digit =====
const RollingDigit = ({ digit, start, height, width, extraDelay = 0, profile }) => {
  const totalSteps = 2 * 10 + digit;
  const sequence = Array.from({ length: totalSteps + 1 }, (_, i) => i % 10);
  return (
    <span className="relative inline-block overflow-hidden" style={{ height, width }}>
      <motion.span className="absolute left-0 top-0 flex flex-col items-center"
        initial={{ y: 0, filter: "blur(0px)" }}
        animate={start ? { y: -totalSteps * height, filter: ["blur(0px)", "blur(6px)", "blur(0px)"] } : { y: 0, filter: "blur(0px)" }}
        transition={{ y: { duration: profile.duration, delay: profile.delay + extraDelay, ease: profile.ease }, filter: { duration: profile.duration, delay: profile.delay + extraDelay, times: [0, 0.4, 1] } }}
      >
        {sequence.map((d, i) => <span key={i} className="flex items-center justify-center" style={{ height, width }}>{d}</span>)}
      </motion.span>
    </span>
  );
};

// Rolling number (digit group) or infinity icon
const StatDisplay = ({ stat, start, index }) => {
  const { value, suffix, fontSize, digitHeight, digitWidth, label } = stat;
  return (
    <motion.div className="flex flex-col items-center gap-2 text-center"
      initial={{ opacity: 0, y: 30 }} animate={start ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
    >
      <div className="flex h-16 items-end justify-center">
        {value == null ? (
          // Infinity symbol with stroke‑dasharray animation
          <div className="relative h-16 w-16" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
              {start && (
                <motion.path
                  d="M12 12c-2-2.67-4-4-6-4s-4 1.33-4 4 1.33 4 4 4 4-1.33 6-4c2 2.67 4 4 6 4s4-1.33 4-4-1.33-4-4-4-4 1.33-6 4"
                  stroke="#0b3f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  pathLength={1} strokeDasharray="1 1"
                  initial={{ strokeDashoffset: 1 }}
                  animate={{ strokeDashoffset: [1, 0.75, 0.4, 0] }}
                  transition={{ duration: 0.7, delay: index * 0.15 + 0.5, times: [0, 0.2, 0.5, 1], ease: "easeOut" }}
                />
              )}
            </svg>
          </div>
        ) : (
          <span className={`inline-flex items-end ${F} font-medium leading-none tracking-[-0.5px] text-[#0b3f34] tabular-nums ${fontSize}`}>
            {String(value).split("").map((ch, i) => (
              <RollingDigit key={i} digit={Number(ch)} start={start} height={digitHeight} width={digitWidth}
                extraDelay={index * 0.15 + i * 0.1 + 0.2} profile={DIGIT_PROFILES[i % DIGIT_PROFILES.length]} />
            ))}
            {suffix && <span className="ml-1">{suffix}</span>}
          </span>
        )}
      </div>
      <span className={`${F} text-base font-normal tracking-[-0.24px] text-[#0b3f34]`}>{label}</span>
    </motion.div>
  );
};

// ===== Wave lines with animated sparks =====
const WaveLines = ({ start }) => (
  <svg viewBox="0 0 1440 501" preserveAspectRatio="none" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full">
    <defs>
      <linearGradient id="spark-fade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#0B3F34" stopOpacity="0" />
        <stop offset="100%" stopColor="#0B3F34" stopOpacity="1" />
      </linearGradient>
    </defs>
    {start && WAVE_PATHS.filter((_, i) => i !== 2).map((d, i) => (
      <rect key={i} y="-1.9" height="2.6" rx="1.3" fill="url(#spark-fade)">
        <animateMotion dur="4s" begin={`${i * 0.35}s`} repeatCount="indefinite" rotate="auto" path={d} />
        {SPARK_ANIMS.map(a => <animate key={a.attr} attributeName={a.attr} keyTimes="0; 0.33; 0.67; 1" values={a.values} dur="4s" begin={`${i * 0.35}s`} repeatCount="indefinite" />)}
      </rect>
    ))}
  </svg>
);

// ===== Main About Component =====
export default function About() {
  const [missionIndex, setMissionIndex] = useState(MISSION_START_INDEX);
  const [missionInstant, setMissionInstant] = useState(false);
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.4 });

  const prevMission = () => { setMissionInstant(false); setMissionIndex(i => i - 1); };
  const nextMission = () => { setMissionInstant(false); setMissionIndex(i => i + 1); };

  // Re-center slider when reaching buffer boundaries
  const handleMissionAnimComplete = () => {
    const drift = missionIndex - MISSION_START_INDEX;
    const maxDrift = MISSIONS.length * (Math.floor(LOOP_COPIES / 2) - 1);
    if (Math.abs(drift) >= maxDrift) {
      const normalized = ((drift % MISSIONS.length) + MISSIONS.length) % MISSIONS.length;
      setMissionInstant(true);
      setMissionIndex(MISSION_START_INDEX + normalized);
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#ebf8f5] bg-cover bg-top bg-no-repeat" style={{ backgroundImage: `url(${bgImage})` }}>
      {/* ===== HERO ===== */}
      <div className="mx-auto flex max-w-[1440px] flex-col px-6 pt-[180px] sm:px-12 sm:pt-[200px] lg:px-24">
        <motion.section initial="hidden" animate="visible" variants={staggerParent}
          className="flex flex-col items-center gap-12 lg:flex-row lg:justify-between lg:gap-16"
        >
          <div className="flex max-w-[601px] flex-col items-start gap-8">
            <motion.div variants={staggerChild} className="flex flex-col gap-7">
              <h1 className={`${F} text-4xl font-extrabold leading-[1.5] text-[#0b3f34] sm:text-[44px]`}>
                Connecter le présent{" "}
                <span className="bg-gradient-to-r from-[#0b3f34] to-[#1da588] bg-clip-text text-transparent">à l'avenir digital</span>
              </h1>
              <p className={`${F} text-lg leading-[35px] text-black sm:text-xl`}>
                Konektus est une entreprise spécialisée en transformation digitale, opérant en Europe, au Maghreb et en
                Afrique. Forte de plus de 20 ans d'expérience certifiée, notre équipe accompagne les entreprises dans la
                modernisation de leurs systèmes.
              </p>
            </motion.div>
            <motion.div variants={staggerChild} className="flex flex-wrap items-center gap-4">
              {HERO_BADGES.map(b => (
                <div key={b.text} className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#17866f] to-[#0d5143] px-4 py-2">
                  <img src={b.icon} alt="" className={b.iconClass} />
                  <span className={`${F} text-sm font-semibold text-white`}>{b.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
          <motion.div variants={staggerChild} className="relative flex shrink-0 items-center justify-center size-[376px] max-w-full">
            <img src={imgHeroCircle} alt="Konektus" className="h-full w-full rounded-full object-cover" style={{ boxShadow: "0 4px 80px 15px #0D5143" }} />
          </motion.div>
        </motion.section>
      </div>

      {/* ===== STATS with wave lines and rolling numbers ===== */}
      <section ref={statsRef} className="relative mt-16 flex w-full min-h-[480px] items-center justify-center overflow-hidden py-24 sm:py-32">
        <img src={imgStatsBg} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center" />
        <WaveLines start={isStatsInView} />
        <img src={imgStatsNumbersGlow} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] h-full w-full object-contain object-center opacity-70" />
        <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-wrap items-start justify-center gap-x-8 gap-y-10 px-6">
          {STATS.map((stat, i) => <StatDisplay key={stat.label} stat={stat} start={isStatsInView} index={i} />)}
        </div>
      </section>

      {/* ===== MAIN CONTENT: Mission, Values, Team, CTA ===== */}
      <div className="mx-auto flex max-w-[1440px] flex-col gap-32 px-6 pb-32 sm:px-12 lg:px-24 mt-16">
        {/* Mission slider */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={staggerParent}
          className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between"
        >
          <motion.div variants={staggerChild} className="flex max-w-[500px] flex-col gap-4">
            <h2 className={`${F} text-3xl font-black leading-[1.5] text-[#0d5143] sm:text-4xl`}>Notre mission</h2>
            <p className={`${F} text-lg leading-[30px] text-black`}>
              Nous agissons comme un pont vers la nouvelle génération de leaders en proposant des solutions innovantes
              basées sur la transformation digitale, les techniques de communication et les relations professionnelles.
            </p>
          </motion.div>

          <motion.div variants={staggerChild} className="flex w-full max-w-[549px] items-center justify-between gap-4">
            <motion.button type="button" onClick={prevMission} aria-label="Précédent" whileHover={{ scale: 1.15, x: -2 }} whileTap={{ scale: 0.9 }} className="cursor-pointer shrink-0">
              <img src={imgArrowLeft} alt="" className="h-6 w-6" />
            </motion.button>
            <div className="relative h-[380px] w-full overflow-hidden rounded-[30px] sm:h-[412px] sm:w-[447px]">
              <motion.div className="flex h-full" animate={{ x: -missionIndex * CARD_STEP }}
                transition={missionInstant ? { duration: 0 } : { duration: 1.2, ease: MISSION_EASE }}
                onAnimationComplete={handleMissionAnimComplete}
              >
                {LOOPED_MISSIONS.map((mission, i) => (
                  <div key={i} className="h-full shrink-0" style={{ width: CARD_STEP }}>
                    <MissionCard mission={mission} />
                  </div>
                ))}
              </motion.div>
            </div>
            <motion.button type="button" onClick={nextMission} aria-label="Suivant" whileHover={{ scale: 1.15, x: 2 }} whileTap={{ scale: 0.9 }} className="cursor-pointer shrink-0">
              <img src={imgArrowRight} alt="" className="h-6 w-6" />
            </motion.button>
          </motion.div>
        </motion.section>

        {/* Values cards */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerParent}
          className="flex flex-col gap-16"
        >
          <motion.h2 variants={staggerChild} className={`${F} text-3xl font-black leading-[1.5] text-[#0d5143] sm:text-4xl`}>Nos valeurs</motion.h2>
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-wrap justify-center gap-8">
              {VALUES.slice(0, 3).map(v => <ValueCard key={v.title} value={v} />)}
            </div>
            <div className="flex flex-wrap justify-center gap-8 lg:-mt-4">
              {VALUES.slice(3).map(v => <ValueCard key={v.title} value={v} />)}
            </div>
          </div>
        </motion.section>

        {/* Team */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerParent}
          className="flex flex-col gap-11"
        >
          <motion.div variants={staggerChild} className="flex flex-col gap-4">
            <h2 className={`${F} text-3xl font-black leading-tight tracking-[-0.5px] text-[#0d5143] sm:text-4xl`}>Leadership &amp; Équipe</h2>
            <p className={`${F} text-lg text-black`}>Des experts passionnés par la résolution de problèmes complexes à l'échelle mondiale.</p>
          </motion.div>
          <div className="flex flex-col items-end gap-9">
            <motion.button variants={staggerChild} type="button" whileHover={{ x: 4 }}
              className={`flex items-center gap-2 ${F} text-base font-semibold text-[#006b57] transition-colors hover:text-[#126b59]`}
            >
              Voir toute l'équipe <span aria-hidden="true">→</span>
            </motion.button>
            <div className="grid w-full grid-cols-2 gap-8 sm:grid-cols-4">
              {TEAM.map((member, i) => <TeamCard key={`${member.name}-${i}`} member={member} />)}
            </div>
          </div>
        </motion.section>

        {/* CTA banner */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVars}
          className="flex flex-col items-center gap-7 rounded-[64px] bg-gradient-to-br from-[#006b57] to-[#1eb394] px-8 py-16 text-center shadow-[0px_25px_50px_-12px_#0d5143] sm:px-24"
        >
          <h2 className={`${F} text-3xl font-bold leading-[1.5] text-white sm:text-[40px] sm:leading-[60px]`}>
            Prêt à transformer votre<br />entreprise avec Konektus?
          </h2>
          <motion.button type="button" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className={`rounded-full bg-white px-10 py-5 ${F} text-lg font-bold text-[#0b3f34] shadow-[0px_8px_10px_rgba(0,0,0,0.25)] sm:text-xl`}
          >
            Contactez-nous
          </motion.button>
        </motion.section>
      </div>
    </div>
  );
}
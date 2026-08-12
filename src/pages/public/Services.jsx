// ========== Core Imports ==========
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import ServicesSkeleton from "../../components/skeleton/ServicesSkeleton";

// ========== Asset Imports ==========
import servicesBg from "../../assets/services/services-bg.png";
import heroImg from "../../assets/services/hero.png";
import telVoipImg from "../../assets/services/tel-voip.png";
import cloudImg from "../../assets/services/cloud.png";
import conseilImg from "../../assets/services/conseil.png";
import bigDataImg from "../../assets/services/big-data.png";
import supportImg from "../../assets/services/support.png";
import iconTelVoip from "../../assets/icons/icon-tel-voip.svg";
import iconCloud from "../../assets/icons/icon-cloud.svg";
import iconConseil from "../../assets/icons/icon-conseil.svg";
import iconBigData from "../../assets/icons/icon-big-data.svg";
import iconSupport from "../../assets/icons/icon-support.svg";
import iconCheck from "../../assets/icons/icon-check.svg";
import iconPerf from "../../assets/icons/icon-performance.svg";
import iconFlex from "../../assets/icons/icon-flexibilite.svg";
import iconIntegration from "../../assets/icons/icon-integration.svg";

// ========== Animation Presets ==========
// Spring physics for smooth, natural motion
const SPRING = { type: "spring", mass: 1, stiffness: 100, damping: 15 };
// Fade-up variants for reveal animations
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

// ========== Reusable Wrappers ==========
// Reveal on scroll with optional delay and viewport amount
const Reveal = ({ children, className = "", delay = 0, amount = 0.3 }) => (
  <motion.div
    className={className}
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount }}
    transition={{ ...SPRING, delay }}
  >
    {children}
  </motion.div>
);

// Section header with decorative lines on desktop
const SectionTitle = ({ title }) => (
  <Reveal className="flex items-center gap-3 sm:gap-5">
    <span className="hidden h-px w-[80px] bg-[#0d5143]/20 md:block md:w-[165px]" />
    <h2 className="text-center text-[24px] font-black uppercase text-[#0d5143] sm:text-[28px] md:text-[36px]">
      {title}
    </h2>
    <span className="hidden h-px w-[80px] bg-[#0d5143]/20 md:block md:w-[165px]" />
  </Reveal>
);

// ========== Content Data ==========
// Feature strip items (performance, flexibility, integration)
const FEATURES = [
  { id: "perf", icon: iconPerf, title: "Performance", desc: "Latence minimale et haute disponibilité" },
  { id: "flex", icon: iconFlex, title: "Flexibilité", desc: "Évoluez sans contrainte technique" },
  { id: "int", icon: iconIntegration, title: "Intégration", desc: "Compatible avec +2000 applications" },
];

// Services data with bullets and objective
const SERVICES = [
  {
    id: "tel-voip",
    icon: iconTelVoip,
    image: telVoipImg,
    title: "Téléphonie & VoIP",
    desc: "Révolutionnez vos échanges avec une infrastructure voix robuste et flexible. Connectez vos équipes partout dans le monde avec une qualité optimale.",
    bullets: [
      "Trunk SIP haute qualité avec gestion avancée des appels",
      "Webphone professionnel accessible de partout",
      "Numéros internationaux et portabilité facile",
      "Optimisation des coûts télécoms",
    ],
    objective: "Objectif : Communication fluide, sécurisée et sans interruption",
    imageSide: "right",
  },
  {
    id: "cloud",
    icon: iconCloud,
    image: cloudImg,
    title: "Cloud & Hébergement",
    desc: "Propulsez vos applications sur une infrastructure cloud sécurisée. Une scalabilité sans limite pour accompagner votre croissance.",
    bullets: [
      "Hébergement cloud sécurisé (multi-sites)",
      "Solutions de sauvegarde et continuité d'activité",
      "Haute disponibilité avec supervision 24/7",
      "Scalabilité adaptée à votre croissance",
    ],
    objective: "Objectif : Performance, sécurité et résilience garanties",
    imageSide: "left",
  },
  {
    id: "conseil",
    icon: iconConseil,
    image: conseilImg,
    title: "Intégration & Conseil",
    desc: "L'innovation ne vaut rien sans exécution. Nos experts vous accompagnent de l'audit initial à la maintenance opérationnelle pour garantir l'adoption de vos nouveaux outils.",
    bullets: [
      "Intégration téléphonie / CRM / systèmes métiers",
      "Automatisation des flux de communication",
      "Audit technique et conseils stratégiques",
      "Déploiement 100% sur mesure",
    ],
    objective: "Objectif : Transformer vos outils en levier de performance.",
    imageSide: "right",
  },
  {
    id: "data",
    icon: iconBigData,
    image: bigDataImg,
    title: "Data & Analyse",
    desc: "Transformez vos données brutes en décisions stratégiques. Nous déployons des pipelines de données robustes pour capturer la valeur à chaque interaction.",
    bullets: [
      "Collecte et centralisation des données (appels, messages, interactions)",
      "Reporting avancé et tableaux de bord personnalisés",
      "Analyse de performance opérationnelle",
      "Insights pour des décisions éclairées",
    ],
    objective: "Objectif : Transformer vos données en insights concrets et actionnables.",
    imageSide: "left",
  },
  {
    id: "support",
    icon: iconSupport,
    image: supportImg,
    title: "Support & Infogérance",
    desc: "Dormez sur vos deux oreilles. Nos équipes surveillent vos systèmes jour et nuit pour prévenir les incidents avant même qu'ils ne surviennent.",
    bullets: [
      "Supervision proactive en temps réel",
      "Maintenance et support technique dédié",
      "Gestion des incidents et optimisations régulières",
      "Assistance personnalisée",
    ],
    objective: "Objectif : Continuité et qualité de service assurées.",
    imageSide: "right",
  },
];

// Statistics data (trust indicators)
const STATS = [
  { id: "partners", value: "+100", label: "Entreprises partenaires", desc: "Nous font confiance au quotidien pour leurs opérations critiques." },
  { id: "uptime", value: "99.9%", label: "Disponibilté garanti", desc: "Engagement contractuel pour une continuité sans faille." },
  { id: "support", value: "24/7", label: "Support expert", desc: "Une équipe d'ingénieurs dédiée à votre écoute en permanence." },
];

// ========== Main Component ==========
export default function Services() {
  // Refs for scrolling
  const servicesRef = useRef(null);
  const location = useLocation();
  const scrollToSection = (ref) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Hero animation variants (text and image)
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const images = [
      servicesBg,
      heroImg,
      telVoipImg,
      cloudImg,
      conseilImg,
      bigDataImg,
      supportImg,
      iconTelVoip,
      iconCloud,
      iconConseil,
      iconBigData,
      iconSupport,
      iconCheck,
      iconPerf,
      iconFlex,
      iconIntegration,
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

  useEffect(() => {
    if (!isLoaded || location.hash !== "#services") return;

    const scrollToServices = () => {
      const servicesSection = servicesRef.current || document.getElementById("services");
      if (!servicesSection) return;

      const headerOffset = 110;
      const top = servicesSection.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: "auto" });
    };

    const frame = requestAnimationFrame(scrollToServices);
    return () => cancelAnimationFrame(frame);
  }, [isLoaded, location.hash]);

  if (!isLoaded) return <ServicesSkeleton />;

  const heroText = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: SPRING } };
  const heroImage = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { ...SPRING, delay: 0.15 } } };

  // Stagger presets for features, services, and stats
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1, ...SPRING } },
  };
  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: SPRING },
  };
  const statsContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, ...SPRING } },
  };
  const statsItem = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: SPRING },
  };

  return (
    // Fix: Add overflow-x-hidden to clip horizontal animations and prevent scrollbars
    <div
      className="relative w-full bg-repeat-y overflow-x-hidden"
      style={{
        backgroundImage: `url(${servicesBg})`,
        backgroundSize: "100% auto",
        backgroundPosition: "top center",
      }}
    >
      {/* ===== HERO SECTION ===== */}
      <section
        className="relative mx-auto flex max-w-[1390px] flex-col items-center gap-8 px-4 pt-14 sm:px-6 sm:pt-16 md:mt-[160px] md:flex-row md:gap-14 md:px-24 md:pt-24 mt-20 sm:mt-28"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={heroText}
          className="flex flex-1 flex-col items-center gap-6 text-center sm:gap-8 md:items-start md:text-left"
        >
          <div className="flex flex-col gap-3 sm:gap-4">
            <h1 className="text-[#0b3f34] text-[28px] font-extrabold leading-[1.3] sm:text-[36px] md:text-[44px] md:leading-[1.5]">
              Transformez votre{" "}
              <span className="bg-gradient-to-b from-[#0b3f34] to-[#1da588] bg-clip-text text-transparent">
                communication en levier de performance
              </span>
            </h1>
            <p className="text-black text-base leading-6 sm:text-lg sm:leading-7 md:text-xl md:leading-[1.75]">
              Optimisez vos flux opérationnels avec une infrastructure de pointe. Performance inégalée,
              flexibilité totale et intégration native pour propulser votre entreprise vers de nouveaux sommets.
            </p>
          </div>
          <button
            type="button"
            onClick={() => scrollToSection(servicesRef)}
            className="flex items-center gap-3 rounded-3xl px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02] sm:gap-4 sm:px-8 sm:py-4 sm:text-base"
            style={{ backgroundImage: "linear-gradient(155deg, #1eb394 15%, #006b57 84%)" }}
          >
            Découvrir nos services
            <svg className="size-3" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 4.5L6 8l3.5-3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </motion.div>

        {/* Fix: Add overflow-hidden to the motion wrapper to clip the image scale overshoot */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={heroImage}
          className="w-full flex-1 overflow-hidden"
        >
          <img src={heroImg} alt="Illustration KoneKtUS" className="w-full max-w-[612px] object-cover" />
        </motion.div>
      </section>

      {/* ===== FEATURE STRIP (desktop only) ===== */}
      <section className="relative mx-auto -mt-8 hidden max-w-[1024px] px-6 md:mt-16 md:block md:px-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-8 rounded-2xl border border-[rgba(45,212,191,0.1)] bg-[rgba(13,81,67,0.8)] p-8 shadow-[0px_8px_32px_0px_rgba(0,0,0,0.37)] sm:backdrop-blur-md md:grid-cols-3"
        >
          {FEATURES.map((f) => (
            <motion.div key={f.id} variants={staggerItem} className="flex items-center gap-4">
              <div className="shrink-0 rounded-lg bg-[rgba(45,212,191,0.1)] p-3">
                <img src={f.icon} alt="" className="size-8" />
              </div>
              <div className="flex flex-col text-white">
                <p className="font-bold text-base leading-6">{f.title}</p>
                <p className="text-sm leading-5">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ===== FEATURE STRIP (mobile / tablet) =====
          The desktop strip above is intentionally hidden below md: (per the
          original design) since it's a dense 3-column bar that doesn't fit a
          narrow viewport well. Rather than dropping this content on mobile
          entirely, show a stacked equivalent instead. */}
      <section className="relative mx-auto mt-6 px-4 sm:px-6 md:hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="flex flex-col gap-5 rounded-2xl border border-[rgba(45,212,191,0.1)] bg-[rgba(13,81,67,0.8)] p-5 shadow-[0px_8px_32px_0px_rgba(0,0,0,0.37)] sm:backdrop-blur-md sm:p-6"
        >
          {FEATURES.map((f) => (
            <motion.div key={f.id} variants={staggerItem} className="flex items-center gap-4">
              <div className="shrink-0 rounded-lg bg-[rgba(45,212,191,0.1)] p-3">
                <img src={f.icon} alt="" className="size-7" />
              </div>
              <div className="flex flex-col text-white">
                <p className="font-bold text-sm leading-5">{f.title}</p>
                <p className="text-xs leading-4">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ===== SERVICES LIST ===== */}
      <section id="services" ref={servicesRef} className="relative mx-auto flex max-w-[1390px] flex-col items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 md:gap-16 md:px-24 md:py-32">
        <SectionTitle title="Nos services" />

        <div className="flex w-full flex-col gap-16 sm:gap-20 md:gap-32">
          {SERVICES.map((s, idx) => {
            const isLeft = s.imageSide === "left";
            const textX = isLeft ? 40 : -40;
            const imgX = isLeft ? -40 : 40;
            return (
              <div key={s.id} className={`flex flex-col md:flex-row items-center gap-8 sm:gap-10 md:gap-12 w-full ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                {/* Service image */}
                <motion.div
                  initial={{ opacity: 0, x: imgX }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ ...SPRING, delay: idx * 0.08 + 0.05 }}
                  className="flex w-full flex-1 justify-center"
                >
                  <img src={s.image} alt={s.title} className="w-full max-w-[340px] object-cover sm:max-w-[420px] md:max-w-[496px]" />
                </motion.div>

                {/* Service text content */}
                <motion.div
                  initial={{ opacity: 0, x: textX }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ ...SPRING, delay: idx * 0.08 + 0.1 }}
                  className="flex flex-1 flex-col items-center gap-4 text-center md:items-start md:text-left"
                >
                  <div
                    className="flex size-12 items-center justify-center rounded-2xl shadow-[0px_10px_15px_-3px_rgba(0,107,87,0.2),0px_4px_6px_-4px_rgba(0,107,87,0.2)] sm:size-14 md:size-16"
                    style={{ backgroundImage: "linear-gradient(135deg, #1eb394 0%, #006b57 100%)" }}
                  >
                    <img src={s.icon} alt="" className="size-5 sm:size-6" />
                  </div>
                  <h3 className="text-black text-2xl font-bold leading-[1.2] tracking-[-0.5px] sm:text-3xl md:text-[36px] md:tracking-[-0.72px]">
                    {s.title}
                  </h3>
                  <p className="text-black text-sm leading-6 sm:text-base sm:leading-[1.5] md:text-lg md:leading-[1.6]">
                    {s.desc}
                  </p>
                  <ul className="flex w-full flex-col gap-3 pt-2 sm:gap-4">
                    {s.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-center gap-3 text-left">
                        <img src={iconCheck} alt="" className="size-5 shrink-0" />
                        <span className="flex-1 text-black text-sm leading-6 sm:text-base">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="pt-3 text-[#006b57] text-sm font-bold leading-6 sm:pt-4 sm:text-base">{s.objective}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== STATISTICS (trust) ===== */}
      <section className="relative mx-auto flex max-w-[1245px] flex-col items-center gap-10 px-4 pb-16 sm:gap-12 sm:px-6 sm:pb-20 md:gap-16 md:px-24 md:pb-24">
        <SectionTitle title="Ils nous font confiance" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={statsContainer}
          className="grid w-full grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 md:gap-16"
        >
          {STATS.map((stat) => (
            <motion.div key={stat.id} variants={statsItem}>
              <div className="flex flex-col items-center gap-2 text-center">
                <p className="text-[36px] font-black tracking-[-1.5px] text-[#006b57] sm:text-[40px] md:text-[48px] md:tracking-[-2.4px]">
                  {stat.value}
                </p>
                <p className="pt-2 text-base font-bold text-[#1a1c1c] sm:text-lg">{stat.label}</p>
                <p className="max-w-[330px] text-sm text-[#3c4a45]">{stat.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ===== FINAL CALL-TO-ACTION ===== */}
      <section className="relative mx-auto max-w-[1216px] px-4 pb-16 sm:px-6 sm:pb-20 md:px-0 md:pb-24">
        <Reveal>
          <div className="relative flex flex-col items-center gap-6 overflow-hidden rounded-[28px] bg-[#126b59] px-6 py-12 text-center sm:gap-8 sm:rounded-[36px] sm:px-8 sm:py-16 md:rounded-[48px] md:py-24">
            {/* Decorative blobs – reduced blur on mobile */}
            <div className="pointer-events-none absolute -right-24 -top-20 size-52 rounded-full bg-[rgba(119,249,214,0.3)] blur-[20px] sm:-right-36 sm:-top-28 sm:size-72 sm:blur-[40px] md:-right-48 md:-top-40 md:size-96 md:blur-[50px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 size-52 rounded-full bg-[rgba(0,62,50,0.3)] blur-[20px] sm:-bottom-36 sm:-left-36 sm:size-72 sm:blur-[40px] md:-bottom-48 md:-left-48 md:size-96 md:blur-[50px]" />

            <h2 className="max-w-[944px] text-[24px] font-extrabold leading-[1.3] tracking-[-0.5px] text-white sm:text-[32px] md:text-[44px] md:leading-[1.36] md:tracking-[-1.5px]">
              Transformez votre communication dès aujourd'hui
            </h2>

            <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:gap-6">
              {["Contactez-Nous", "Démarrer l'essai gratuit"].map((label) => (
                <button
                  key={label}
                  type="button"
                  className="w-full max-w-[320px] rounded-full bg-white px-6 py-3 text-base font-bold text-[#2b6859] shadow-[0px_8px_10px_rgba(0,0,0,0.25)] transition-transform hover:scale-[1.02] sm:w-[279px] sm:px-8 sm:py-4 sm:text-lg"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

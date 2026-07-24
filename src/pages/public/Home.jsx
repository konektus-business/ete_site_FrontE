// Core imports: React, Framer Motion for animations, and hooks
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ========== Animation Presets ==========
// Spring physics for smooth, natural motion
const S = { type: "spring", mass: 1, stiffness: 100, damping: 15 };
// Easing curves for hover interactions
const HOVER_EASE = [0.52, 0, 0.27, 1];
const HOVER_TRANS = { duration: 0.45, ease: HOVER_EASE };
// Custom spring configurations for specific elements (value cards, text, feature strip)
const VAL_SPRING = { type: "spring", mass: 1, stiffness: 80, damping: 20, visualDuration: 1.666831 };
const TXT_SPRING = { type: "spring", mass: 1, stiffness: 100, damping: 15, visualDuration: 1.91645 };
const FEA_SPRING = { type: "spring", mass: 1, stiffness: 100, damping: 15, visualDuration: 2.044188 };
const SERV_HOVER = { duration: 1.25, ease: [0.25, 0.1, 0.25, 1] }; // Service card hover transition

// ========== Asset Helpers ==========
const HERO_BG = { background: "linear-gradient(131deg, #061C18 0%, #0B3F34 38%, #128A72 78%, #1EB394 100%)" };
// Removed TypeScript type annotations
const asset = (f) => `src/assets/${f}`;
const icon = (f) => `src/assets/icons/${f}`;

// ========== Custom Hook: Reveal on Scroll ==========
// Uses useInView from Framer Motion to detect visibility (once, 20% threshold)
const useReveal = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  return { ref, isInView };
};

// ========== Reusable Reveal Wrapper ==========
// Animates children (opacity + y) when entering viewport
const Reveal = ({ children, className = "", delay = 0 }) => (
  <motion.div
    className={className}
    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    transition={{ ...S, delay }}
  >
    {children}
  </motion.div>
);

// ========== UI Primitives ==========
const PrimaryButton = ({ children, className = "", ...props }) => (
  <button className={`rounded-full bg-[#1EB394] px-4 py-2 text-white transition hover:bg-[#178f76] ${className}`} {...props}>
    {children}
  </button>
);

// CTA buttons for hero and final section
const CTAButtons = () => (
  <div className="flex flex-col items-center gap-6 sm:flex-row">
    {["Contactez-Nous", "Démarrer l'essai gratuit"].map(label => (
      <button key={label} className="w-[279px] rounded-full bg-white px-8 py-4 text-[18px] font-bold text-[#2B6859] shadow-[0_8px_10px_rgba(0,0,0,0.25)] transition hover:bg-gray-100">
        {label}
      </button>
    ))}
  </div>
);

// Section header with tag, title, and optional description
const SectionHeader = ({ tag, title, description }) => (
  <Reveal className="mb-[54px] flex flex-col items-start gap-4 text-left">
    {tag && <p className="text-sm font-bold uppercase tracking-[1.4px] text-[#1EB394]">{tag}</p>}
    <h2 className="text-[36px] font-black leading-[45px] text-[#0B3F34]">{title}</h2>
    {description && <p className="max-w-[576px] text-[18px] leading-6 text-black">{description}</p>}
  </Reveal>
);

// ========== Hero Orbs (animated background blobs) ==========
const heroOrbs = [
  { left: -156, top: 482, size: 651, blur: 50, color: "#1EB394", x: 534, y: 83 },
  { left: -145, top: 261, size: 347, blur: 75, color: "#126B59", x: 111, y: 373 },
  { left: 712, top: 291, size: 416, blur: 75, color: "#0D5143", x: 417, y: 58 },
  { left: 268, top: 241, size: 347, blur: 75, color: "#1EB394", x: -281, y: 84 },
  { left: 874, top: 509, size: 651, blur: 50, color: "#1EB394", x: 30, y: 6 },
];
const orbT = { duration: 3, ease: "linear", repeat: Infinity, repeatType: "mirror" };

// ========== Logo Data (Marquee) ==========
const logos = [
  { src: asset("open_project.png"), alt: "OpenProject" },
  { src: asset("sangoma.png"), alt: "Sangoma" },
  { src: asset("webmail.png"), alt: "Webmail" },
  { src: asset("php.png"), alt: "PHP" },
  { src: asset("maria_db.png"), alt: "MariaDB" },
  { src: asset("nodejs.png"), alt: "Node.js" },
];

// ========== Content Data ==========
const konvictions = [
  { n: "01", icon: "Kulture-icon.svg", iconSize: "h-[28px] w-[27px]", title: "Kulture", tag: "Le Mindset", text: "La bienveillance est le socle de notre collaboration. Nous cultivons un environnement d'amélioration continue où l'expérimentation est la règle, et non l'exception.", check: "Apprentissage par l'échec", img: "kulture-img.png" },
  { n: "02", icon: "katalyst-icon.svg", iconSize: "h-[28px] w-[28px]", title: "Katalyst", tag: "L'Action", text: "Nous agissons comme des catalyseurs de changement pour nos partenaires. Notre mission est de simplifier le complexe pour provoquer une évolution radicale.", check: "Création de valeur immédiate", img: "katalyst-img.png" },
  { n: "03", icon: "kality-icon.svg", iconSize: "h-[30px] w-[31px]", title: "Kality", tag: "L'Exigence", text: "Un engagement absolu envers l'excellence. Chaque pixel, chaque ligne de code est conçu pour offrir fiabilité, performance et une simplicité déconcertante.", check: "Excellence dans chaque détail", img: "kality-img.png" },
];

const values = [
  { icon: "transparence.svg", size: "h-[18.75px] w-[27.5px]", label: "Transparence" },
  { icon: "Kulture-icon.svg", size: "h-[25px] w-[23.765px]", label: "Innovation" },
  { icon: "licence.svg", size: "h-[25px] w-5", label: "Zéro licence propriétaire" },
  { icon: "securite.svg", size: "h-[25px] w-5", label: "Sécurité" },
  { icon: "ecosystem.svg", size: "h-[27.5px] w-[21.25px]", label: "Écosystème évolutif" },
];

const services = [
  { title: "Téléphonie & VoIP", description: "Révolutionnez vos échanges avec une infrastructure voix robuste et flexible.", bg: "rgba(30,179,148,0.28)", layers: [asset("tel-voip.png"), asset("tel-voip-2.png")] },
  { title: "Cloud & Hébergement", description: "Propulsez vos applications sur une infrastructure cloud sécurisée.", bg: "rgba(30,179,148,0.28)", layers: [asset("cloud.png"), asset("cloud-frame-2147223592.png")] },
  { title: "Intégration & Conseil", description: "Analyse approfondie de votre infrastructure et roadmap stratégique personnalisée.", bg: "rgba(30,179,148,0.28)", layers: [asset("integration.png")] },
  { title: "Data & Analyse", description: "Transformez vos données en décisions stratégiques grâce à des pipelines robustes.", bg: "rgba(30,179,148,0.28)", layers: [asset("big-data.png")] },
  { title: "Support & Infogérance", description: "Surveillance continue de vos systèmes pour prévenir les incidents.", bg: "rgba(30,179,148,0.28)", layers: [asset("support.png")] },
];

const testimonials = [
  { quote: "\"L'implémentation de Konektus a radicalement changé notre gestion des données. Nous avons gagné 40% d'efficacité opérationnelle en 6 mois.\"", avatar: "sarah-l.png", name: "Sarah Leclair", role: "CTO chez Visionary.io", quoteMark: true },
  { quote: '"Un outil puissant mais surtout un accompagnement premium qui comprend les enjeux business réels des ETI modernes."', avatar: "marc-a.png", name: "Marc Aubert", role: "Directeur Digital, Global Group" },
  { quote: '"La connectivité native entre nos différents ERP et outils de communication via VTM est tout simplement bluffante."', avatar: "julie-d.png", name: "Julie Dupont", role: "Responsable Opérations, TechScale" },
];

const featureStripItems = [
  { icon: "ouverte.svg", title: "Ouverte", text: "Technologies open source & standards" },
  { icon: "evolutive.svg", title: "Évolutive", text: "Conçue pour s'adapter à vos besoins" },
  { icon: "au-service.svg", title: "Au service", text: "Avec et pour la communauté mondiale" },
];

// ========== Card Components ==========
const KonvictionCard = ({ n, icon: iconName, iconSize, title, tag, text, check, img }) => (
  <div className="relative flex flex-1 flex-col rounded-[24px] border border-[#1EB394]/35 bg-[#F6F8F8] p-[41px] shadow-[0_25px_50px_-12px_rgba(30,179,149,0.4)]">
    <span className="absolute right-[32px] top-[8px] text-[96px] font-black leading-none text-[#0F172A]/5">{n}</span>
    <div className="mb-[32px] flex h-[64px] w-[64px] items-center justify-center rounded-[20px] bg-[#E9F7F4]">
      <img src={icon(iconName)} alt="" className={iconSize} />
    </div>
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h3 className="text-[24px] font-extrabold text-[#0F172A]">{title}</h3>
        <p className="text-sm font-bold uppercase tracking-[1.4px] text-[#1EB394]">{tag}</p>
      </div>
      <p className="text-[16px] leading-[26px] text-[#475569]">{text}</p>
      <div className="mt-auto flex items-center gap-2 pt-4">
        <img src={icon("check-icon.svg")} alt="" className="h-[15px] w-[15px]" />
        <span className="text-sm font-semibold text-[#0F172A]">{check}</span>
      </div>
      <div className="h-[160px] w-full overflow-hidden rounded-[12px] bg-[#F1F5F9]">
        <img src={asset(img)} alt={title} className="h-full w-full object-cover" />
      </div>
    </div>
  </div>
);

// Value card with hover effect and spring animation on entry
const ValueCard = ({ icon: iconName, size, label, index, isVisible }) => (
  <motion.div
    initial={{ opacity: 0, x: [352.7328, 98.9281, -154.8707, -408.7457, -662.5446][index], y: [260.0004, 267.9789, 267.9789, 271.8793, 280.9789][index], rotate: -90 }}
    animate={isVisible ? { opacity: 1, x: 0, y: 0, rotate: 0 } : {}}
    transition={VAL_SPRING}
    whileHover="hover"
    variants={{ rest: { backgroundColor: "#FFFFFF", transition: HOVER_TRANS }, hover: { backgroundColor: "#6BB3A5", transition: HOVER_TRANS } }}
    className="relative flex h-[178px] flex-col items-center justify-center gap-6 rounded-[16px] border border-white/40 p-6 text-center shadow-[0_8px_16px_rgba(0,107,87,0.15)] hover:shadow-[0_8px_32px_rgba(0,107,87,0.35)] bg-white"
  >
    <motion.div variants={{ rest: { opacity: 1 }, hover: { opacity: 0.18 } }} transition={HOVER_TRANS} className="flex flex-col items-center gap-6">
      <div className="flex h-[64px] w-[64px] items-center justify-center rounded-[16px] bg-[#B8EADA]/40">
        <img src={icon(iconName)} alt="" className={size} />
      </div>
      <p className="text-[16px] font-semibold text-[#1A1C1C]">{label}</p>
    </motion.div>
    <motion.div variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }} transition={{ ...HOVER_TRANS, delay: 0.05 }} className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
      Explorer
    </motion.div>
  </motion.div>
);

// Service card with hover animation (image shrinks, text appears)
const ServiceCard = ({ title, description, bg, layers }) => {
  const imgVariants = { rest: { height: "100%", transition: SERV_HOVER }, hover: { height: "50%", transition: SERV_HOVER } };
  const textVariants = { rest: { y: 20, opacity: 0 }, hover: { y: 0, opacity: 1, transition: SERV_HOVER } };
  return (
    <motion.div className="relative h-[356px] w-[260px] shrink-0 overflow-hidden rounded-[20px] border border-[#1EB394]/20 bg-white/70 shadow-[0_20px_25px_-5px_rgba(30,179,148,0.5)] backdrop-blur-[6px]" initial="rest" animate="rest" whileHover="hover">
      <motion.div className="absolute inset-x-0 top-0 w-full overflow-hidden" style={{ backgroundColor: bg }} variants={imgVariants}>
        <div className="pointer-events-none absolute inset-0 z-[1]" style={{ background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.6) 48%, transparent 62%)", mixBlendMode: "soft-light" }} />
        <img src={layers[0]} alt={title} className="absolute inset-0 h-full w-full object-contain" />
      </motion.div>
      <motion.div className="absolute inset-x-0 bottom-0 z-10 flex h-1/2 flex-col justify-center gap-[14px] bg-white/95 p-4 backdrop-blur-sm" variants={textVariants}>
        <div>
          <h3 className="text-[18px] font-bold leading-6 text-[#0D5143]">{title}</h3>
          <p className="mt-1.5 text-[13px] leading-[19px] text-[#64748B]">{description}</p>
        </div>
        <button className="flex items-center gap-1 text-[13px] font-bold text-[#1EB394]">
          Voir plus <img src={icon("arrow-right-sm.svg")} alt="" className="h-[14px] w-[14px]" />
        </button>
      </motion.div>
    </motion.div>
  );
};

const TestimonialCard = ({ quote, avatar, name, role, quoteMark }) => (
  <Reveal className="flex-1">
    <div className="relative flex h-full flex-col gap-8 rounded-[24px] bg-white p-10 shadow-[0_20px_25px_-5px_rgba(226,232,240,0.5),0_8px_10px_-6px_rgba(226,232,240,0.5)] drop-shadow-[0_4px_10px_#1EB394]">
      {quoteMark && <img src={asset("quote.png")} alt="" className="absolute -top-6 left-10 h-12 w-12" />}
      <p className="text-[16px] leading-6 text-[#475569] flex-1">{quote}</p>
      <div className="mt-auto flex items-center gap-4 border-t border-[#F1F5F9] pt-[25px]">
        <img src={asset(avatar)} alt={name} className="h-12 w-12 rounded-full object-cover" />
        <div>
          <p className="text-xs text-[#1EB394]">{role}</p>
          <p className="text-sm font-bold text-[#1E293B]">{name}</p>
        </div>
      </div>
    </div>
  </Reveal>
);

// ========== Main Component ==========
export default function Home() {
  // Refs and view states for each section to control animations on scroll
  // Removed TypeScript generics (<HTMLDivElement>, etc.)
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const logoRef = useRef(null);
  const isLogoInView = useInView(logoRef, { once: true, amount: 0.2 });
  const ctaRef = useRef(null);
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.2 });
  const visionRef = useRef(null);
  const isVisionInView = useInView(visionRef, { once: true, amount: 0.2 });
  const valuesRef = useRef(null);
  const areValuesInView = useInView(valuesRef, { once: true, amount: 0.15 });
  const valuesTextRef = useRef(null);
  const isValuesTextInView = useInView(valuesTextRef, { once: true, amount: 0.2 });
  const servicesRef = useRef(null);
  const areServicesInView = useInView(servicesRef, { once: true, amount: 0.15 });
  const konvictionsRef = useRef(null);
  const areKonvictionsInView = useInView(konvictionsRef, { once: true, amount: 0.15 });

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      {/* Animated background with floating orbs, title, subtitle, and email form */}
      <div className="relative flex h-[941px] w-full flex-col items-center overflow-hidden bg-[#0A1A17] pt-[210px] pb-[260px]">
        <div className="pointer-events-none absolute inset-0" style={HERO_BG}>
          {heroOrbs.map((orb, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{ left: orb.left, top: orb.top, width: orb.size, height: orb.size, backgroundColor: orb.color, filter: `blur(${orb.blur}px)` }}
              animate={{ x: [0, orb.x], y: [0, orb.y] }}
              transition={{ x: orbT, y: orbT }}
            />
          ))}
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_0%_0%,rgba(3,20,17,0.85),transparent_55%)]" />
        </div>
        <motion.section
          ref={heroRef}
          initial="hidden"
          animate={isHeroInView ? "visible" : "hidden"}
          className="relative z-10 flex w-full max-w-[1248px] flex-col items-center gap-14 px-4"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 120 }, visible: { opacity: 1, y: 0, transition: S } }} className="flex flex-col items-center gap-6 self-stretch">
            <h1 className="text-center text-[44px] font-black leading-normal text-white">KoneKtUS transforme vos canaux en un flux unique</h1>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: -89 },
                visible: { opacity: 1, y: 0, transition: { ...S, delay: 0.05 } }
              }}
              className="self-stretch text-center text-xl font-normal leading-[35px] text-white"
            >
              <span className="block">Simplifiez vos interactions, libérez vos équipes des complexités inutiles</span>
              <span className="block">et concentrez-vous sur ce qui compte vraiment.</span>
            </motion.p>
          </motion.div>
          <motion.form
            variants={{
              hidden: { opacity: 0, y: -208 },
              visible: { opacity: 1, y: 0, transition: { ...S, delay: 0.1 } }
            }}
            className="flex w-full max-w-[319px] items-center gap-2 rounded-full bg-white px-5 py-2.5"
          >
            <label htmlFor="email-cta" className="sr-only">E-mail professionnel</label>
            <input id="email-cta" type="email" placeholder="E-mail professionnel" className="min-w-0 flex-1 bg-transparent text-[13px] leading-5 text-[#B4C8C9] placeholder:text-[#B4C8C9] outline-none" />
            <PrimaryButton type="submit" className="px-4 py-2 text-sm font-medium">Accès gratuit</PrimaryButton>
          </motion.form>
        </motion.section>
      </div>

      {/* ===== DASHBOARD PREVIEW ===== */}
      {/* Appears as a card floating above the hero, with animated dots and hover effect */}
      <motion.div
        initial={{ opacity: 0, y: 150 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={S}
        whileHover="hover"
        className="group relative z-10 -mt-[380px] w-[1264px] max-w-[92%] cursor-pointer"
      >
        <img src={asset("dashboard.png")} alt="Aperçu du tableau de bord KoneKtUS" className="w-full rounded-2xl shadow-[0_25px_60px_-15px_rgba(30,179,148,0.5)]" />
        {/* Animated pulse dots on dashboard */}
        {[{ color: "#1EB394", top: "18%", left: "12%", delay: 0 }, { color: "#2E90FA", top: "34%", left: "68%", delay: 0.3 }, { color: "#F79009", top: "62%", left: "40%", delay: 0.6 }].map((dot, i) => (
          <motion.span
            key={i}
            className="absolute h-3 w-3 rounded-full"
            style={{ top: dot.top, left: dot.left, backgroundColor: dot.color }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ...S, delay: dot.delay }}
            animate={{ opacity: [1, 0.3, 1], scale: [1, 1.6, 1] }}
            transition={{ duration: 1, ease: "linear", repeat: Infinity, delay: dot.delay }}
          />
        ))}
        {/* Hover overlay label */}
        <motion.div
          variants={{ rest: { opacity: 0, y: 12 }, hover: { opacity: 1, y: 0 } }}
          initial="rest"
          transition={S}
          className="pointer-events-none absolute inset-x-0 bottom-4 mx-auto flex w-fit items-center gap-2 rounded-full bg-[#0B3F34]/90 px-4 py-2 text-sm font-semibold text-white opacity-0 group-hover:opacity-100"
        >
          Voir le tableau de bord en détail
        </motion.div>
      </motion.div>

      {/* ===== LOGO MARQUEE ===== */}
      {/* Infinite scroll of partner logos */}
      <div ref={logoRef}>
        <motion.div
          initial={{ opacity: 0, y: 62 }}
          animate={isLogoInView ? { opacity: 1, y: 4 } : {}}
          transition={S}
          className="mx-auto w-full max-w-[1248px] overflow-hidden py-[54px]"
        >
          <div className="marquee-rtl flex w-max items-center gap-[90px]">
            {[...logos, ...logos].map((logo, i) => (
              <div key={`${logo.alt}-${i}`} className="flex h-[55px] w-[149px] shrink-0 items-center justify-center opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0">
                <img src={logo.src} alt={logo.alt} className="max-h-full max-w-full object-contain" />
              </div>
            ))}
          </div>
          <style>{`@keyframes marquee-rtl { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } .marquee-rtl { animation: marquee-rtl 20s linear infinite; }`}</style>
        </motion.div>
      </div>

      {/* ===== MAIN CONTENT (with background layers) ===== */}
      <div className="relative w-full overflow-hidden">
        {/* Decorative background images at different scroll positions */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <img src={asset("bg.png")} alt="" className="absolute left-0 top-0 w-full object-cover" />
          <img src={asset("bg.png")} alt="" className="absolute left-0 top-[1900px] w-full -scale-y-100 object-cover" />
          <img src={asset("bg.png")} alt="" className="absolute left-0 top-[3800px] w-full object-cover" />
        </div>

        {/* ===== KONVICTIONS SECTION ===== */}
        {/* Three pillars: Kulture, Katalyst, Kality */}
        <section ref={konvictionsRef} className={`mx-auto w-full max-w-[1248px] px-4 py-[100px] ${areKonvictionsInView ? "overflow-visible" : "overflow-hidden"}`}>
          <motion.div
            initial={{ opacity: 0, y: -200 }}
            animate={areKonvictionsInView ? { opacity: 1, y: 0 } : {}}
            transition={S}
            className="mb-14 flex flex-col gap-7 lg:mb-16"
          >
            <h2 className="text-[36px] font-black leading-[1.5] text-[#0B3F34]">Nos Konvictions</h2>
            <p className="max-w-[900px] text-xl leading-[35px] text-black">Kulture, Katalyst, Kality : Nos principes fondamentaux pour innover et réussir. Nous ne nous contentons pas de bâtir des outils, nous forgeons l'avenir du B2B.</p>
          </motion.div>
          <div className="flex flex-col items-stretch gap-6 lg:flex-row">
            {konvictions.map(k => (
              <motion.div
                key={k.title}
                initial={{ opacity: 0, y: { Kulture: 552, Katalyst: 741, Kality: 752 }[k.title] }}
                animate={areKonvictionsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...S, delay: { Kulture: 0, Katalyst: 0.4, Kality: 0.8 }[k.title] }}
                whileHover={{ boxShadow: "0px 5px 50px 10px rgba(13,81,67,0.4)", transition: S }}
                className="flex flex-1 flex-col rounded-[24px]"
              >
                <KonvictionCard {...k} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== VALUES + VISION + FEATURE STRIP ===== */}
        <section className="relative mx-auto w-full max-w-[1248px] px-4 py-20">
          {/* Values heading */}
          <div ref={valuesTextRef} className="mb-16 flex flex-col items-start gap-7 text-left">
            <div className="w-full max-w-[770px]">
              <p className="text-sm font-bold uppercase tracking-[1.4px] text-[#1EB394]">Nos valeurs</p>
              <motion.h2
                initial={{ opacity: 0, y: -176, scaleX: 0.8026, scaleY: 0.7973 }}
                animate={isValuesTextInView ? { opacity: 1, y: 0, scaleX: 1, scaleY: 1 } : {}}
                transition={TXT_SPRING}
                style={{ originX: 0, originY: 0 }}
                className="text-[36px] font-black leading-[1.5] text-[#0B3F34]"
              >
                Pourquoi choisir KonektUS ?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: -196, scaleX: 0.8026, scaleY: 0.8 }}
                animate={isValuesTextInView ? { opacity: 1, y: 0, scaleX: 1, scaleY: 1 } : {}}
                transition={TXT_SPRING}
                style={{ originX: 0, originY: 0 }}
                className="mt-4 text-xl leading-[32.5px] text-black"
              >
                Les plus grandes entreprises technologiques au monde ont bâti leur réussite sur un principe fondamental : le pouvoir du code ouvert. Chez KoneKtUS, nous partageons exactement cette philosophie.
              </motion.p>
            </div>
          </div>

          {/* Values grid */}
          <div ref={valuesRef} className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {values.map((v, i) => <ValueCard key={v.label} {...v} index={i} isVisible={areValuesInView} />)}
            <div className="flex justify-end sm:col-start-3 lg:col-start-5">
              <button className="flex items-center gap-1 rounded-full bg-[#1EB394] px-4 py-2 text-white transition hover:bg-[#178f76]">
                En savoir plus <img src={icon("righticon.png")} alt="" className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Vision section with illustration */}
          <motion.section
            ref={visionRef}
            initial={{ opacity: 0 }}
            animate={isVisionInView ? { opacity: 1 } : {}}
            transition={S}
            className="mx-auto flex w-full max-w-[1248px] flex-col items-center gap-12 px-4 py-20 lg:flex-row overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, x: -600 }}
              animate={isVisionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ ...S, delay: 0.1 }}
              className="flex flex-1 flex-col items-start gap-4"
            >
              <p className="text-sm font-bold uppercase tracking-[1.4px] text-[#1EB394]">Notre vision</p>
              <h2 className="text-[36px] font-black leading-[1.5] text-[#0B3F34]">
                La technologie doit travailler pour vous, <span className="bg-gradient-to-r from-[#0B3F34] to-[#1DA588] bg-clip-text text-transparent">jamais l'inverse.</span>
              </h2>
              <p className="max-w-[619px] text-xl leading-[1.5] text-black">KonektUS est née d'une conviction simple : la technologie doit être ouverte, évolutive et au service des entreprises. Nous bâtissons aujourd'hui un écosystème ouvert, audité et continuellement amélioré, conçu avec et pour une communauté mondiale.</p>
              <PrimaryButton className="mt-2 flex items-center gap-1 px-4 py-2 text-sm font-bold">
                En savoir plus <img src={icon("arrow-right.svg")} alt="" className="h-3 w-3" />
              </PrimaryButton>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 600 }}
              animate={isVisionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ ...S, delay: 0.05 }}
              className="flex-1"
            >
              <img src={asset("vision-illustration.png")} alt="Notre vision" className="w-full object-cover" />
            </motion.div>
          </motion.section>

          {/* Feature strip: three key attributes */}
          <motion.div
            initial={{ opacity: 0, y: 192 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={FEA_SPRING}
            className="mx-auto mt-16 grid max-w-[1024px] grid-cols-1 gap-8 rounded-[16px] border border-[#2DD4BF]/10 bg-[#0D5143]/80 p-[33px] shadow-[0_8px_32px_rgba(0,0,0,0.37)] backdrop-blur-[6px] sm:grid-cols-3"
          >
            {featureStripItems.map(f => (
              <div key={f.title} className="flex items-center gap-4">
                <div className="flex shrink-0 items-center justify-center rounded-[8px] bg-[#2DD4BF]/10 p-3">
                  <img src={icon(f.icon)} alt="" className="h-8 w-8" />
                </div>
                <div className="text-white">
                  <p className="text-[16px] font-bold">{f.title}</p>
                  <p className="text-sm leading-5">{f.text}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ===== SERVICES ===== */}
        {/* Horizontal scrollable service cards */}
        <section ref={servicesRef} className="mx-auto w-full max-w-[1248px] px-4 py-[100px]">
          <motion.div
            initial={{ opacity: 0, y: -176, scaleX: 0.8026, scaleY: 0.7973 }}
            animate={areServicesInView ? { opacity: 1, y: 0, scaleX: 1, scaleY: 1 } : {}}
            transition={TXT_SPRING}
            style={{ originX: 0, originY: 0 }}
          >
            <SectionHeader tag="Expertise" title="Nos services" description="Solutions de communication unifiées conçues pour l'excellence opérationnelle." />
          </motion.div>
          <div className="flex gap-8 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: S } }}
                className="flex shrink-0 flex-col items-end gap-6"
              >
                <ServiceCard {...service} />
                {index === services.length - 2 && (
                  <button className="flex items-center gap-1 rounded-full bg-[#1EB394] px-4 py-2 text-white transition hover:bg-[#178f76]">
                    En savoir plus <img src={icon("righticon.png")} alt="" className="h-3 w-3" />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== TESTIMONIALS ===== */}
        <section className="mx-auto w-full max-w-[1248px] px-4 py-20">
          <Reveal className="mb-16 text-center text-[36px] font-extrabold text-[#0B3F34]">Approuvé par les leaders</Reveal>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1, ...S } } }}
            className="flex flex-col gap-8 lg:flex-row items-stretch"
          >
            {testimonials.map(t => <TestimonialCard key={t.name} {...t} />)}
          </motion.div>
        </section>

        {/* ===== FINAL CTA ===== */}
        <section ref={ctaRef} className="mx-auto w-full max-w-[1248px] px-4 py-[60px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={S}
            className="flex flex-col items-center gap-6 rounded-[24px] bg-gradient-to-r from-[#17866F] to-[#05201B] px-6 py-[60px] text-center sm:px-[88px]"
          >
            <h2 className="whitespace-nowrap text-[32px] font-bold leading-[1.3] text-white sm:text-[44px] sm:leading-[60px]">
              Prêt à transformer votre entreprise avec Konektus ?
            </h2>
            <CTAButtons />
          </motion.div>
        </section>
      </div>
    </>
  );
}
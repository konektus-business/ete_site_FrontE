import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, memo, useState, useEffect } from "react";
import arrowRightIcon from "../../assets/home/arrow-right.svg";
import HomeSkeleton from "../../components/skeleton/HomeSkeleton";

const S = { type: "spring", mass: 1, stiffness: 100, damping: 15 };
const HOVER_EASE = [0.52, 0, 0.27, 1];
const HOVER_TRANS = { duration: 0.45, ease: HOVER_EASE };
const asset = (f) => new URL(`../../assets/home/${f}`, import.meta.url).href;
const icon = (f) => new URL(`../../assets/icons/${f}`, import.meta.url).href;

const HERO_BG = {
  background:
    "linear-gradient(131deg, #061C18 0%, #0B3F34 38%, #128A72 78%, #1EB394 100%)",
};

const heroOrbs = [
  {
    left: -156,
    top: 482,
    size: 651,
    blur: 50,
    color: "#1EB394",
    x: 534,
    y: 83,
  },
  {
    left: -145,
    top: 261,
    size: 347,
    blur: 75,
    color: "#126B59",
    x: 111,
    y: 373,
  },
  { left: 712, top: 291, size: 416, blur: 75, color: "#0D5143", x: 417, y: 58 },
  {
    left: 268,
    top: 241,
    size: 347,
    blur: 75,
    color: "#1EB394",
    x: -281,
    y: 84,
  },
  { left: 874, top: 509, size: 651, blur: 50, color: "#1EB394", x: 30, y: 6 },
];
const orbT = {
  duration: 3,
  ease: "linear",
  repeat: Infinity,
  repeatType: "mirror",
};

const logos = [
  { src: asset("open_project.png"), alt: "OpenProject" },
  { src: asset("sangoma.png"), alt: "Sangoma" },
  { src: asset("webmail.png"), alt: "Webmail" },
  { src: asset("php.png"), alt: "PHP" },
  { src: asset("maria_db.png"), alt: "MariaDB" },
  { src: asset("nodejs.png"), alt: "Node.js" },
];

const konvictions = [
  {
    n: "01",
    icon: "Kulture-icon.svg",
    iconSize: "h-[28px] w-[27px]",
    title: "Kulture",
    tag: "Le Mindset",
    text: "La bienveillance est le socle de notre collaboration. Nous cultivons un environnement d'amélioration continue où l'expérimentation est la règle, et non l'exception.",
    check: "Apprentissage par l'échec",
    img: "kulture-img.png",
  },
  {
    n: "02",
    icon: "katalyst-icon.svg",
    iconSize: "h-[28px] w-[28px]",
    title: "Katalyst",
    tag: "L'Action",
    text: "Nous agissons comme des catalyseurs de changement pour nos partenaires. Notre mission est de simplifier le complexe pour provoquer une évolution radicale.",
    check: "Création de valeur immédiate",
    img: "katalyst-img.png",
  },
  {
    n: "03",
    icon: "kality-icon.svg",
    iconSize: "h-[30px] w-[31px]",
    title: "Kality",
    tag: "L'Exigence",
    text: "Un engagement absolu envers l'excellence. Chaque pixel, chaque ligne de code est conçu pour offrir fiabilité, performance et une simplicité déconcertante.",
    check: "Excellence dans chaque détail",
    img: "kality-img.png",
  },
];

const values = [
  {
    icon: "transparence.svg",
    size: "h-[18.75px] w-[27.5px]",
    label: "Transparence",
  },
  {
    icon: "Kulture-icon.svg",
    size: "h-[25px] w-[23.765px]",
    label: "Innovation",
  },
  {
    icon: "licence.svg",
    size: "h-[25px] w-5",
    label: "Zéro licence propriétaire",
  },
  { icon: "securite.svg", size: "h-[25px] w-5", label: "Sécurité" },
  {
    icon: "ecosystem.svg",
    size: "h-[27.5px] w-[21.25px]",
    label: "Écosystème évolutif",
  },
];

const services = [
  {
    title: "Téléphonie & VoIP",
    description:
      "Révolutionnez vos échanges avec une infrastructure voix robuste et flexible.",
    bg: "rgba(30,179,148,0.28)",
    layers: [asset("tel-voip.png"), asset("tel-voip-2.png")],
  },
  {
    title: "Cloud & Hébergement",
    description:
      "Propulsez vos applications sur une infrastructure cloud sécurisée.",
    bg: "rgba(30,179,148,0.28)",
    layers: [asset("cloud.png"), asset("cloud-frame-2147223592.png")],
  },
  {
    title: "Intégration & Conseil",
    description:
      "Analyse approfondie de votre infrastructure et roadmap stratégique personnalisée.",
    bg: "rgba(30,179,148,0.28)",
    layers: [asset("integration.png")],
  },
  {
    title: "Data & Analyse",
    description:
      "Transformez vos données en décisions stratégiques grâce à des pipelines robustes.",
    bg: "rgba(30,179,148,0.28)",
    layers: [asset("big-data.png")],
  },
  {
    title: "Support & Infogérance",
    description:
      "Surveillance continue de vos systèmes pour prévenir les incidents.",
    bg: "rgba(30,179,148,0.28)",
    layers: [asset("support.png")],
  },
];

const testimonials = [
  {
    quote:
      "\"L'implémentation de Konektus a radicalement changé notre gestion des données. Nous avons gagné 40% d'efficacité opérationnelle en 6 mois.\"",
    avatar: "sarah-l.png",
    name: "Sarah Leclair",
    role: "CTO chez Visionary.io",
    quoteMark: true,
  },
  {
    quote:
      '"Un outil puissant mais surtout un accompagnement premium qui comprend les enjeux business réels des ETI modernes."',
    avatar: "marc-a.png",
    name: "Marc Aubert",
    role: "Directeur Digital, Global Group",
  },
  {
    quote:
      '"La connectivité native entre nos différents ERP et outils de communication via VTM est tout simplement bluffante."',
    avatar: "julie-d.png",
    name: "Julie Dupont",
    role: "Responsable Opérations, TechScale",
  },
];

const featureStripItems = [
  {
    icon: "ouverte.svg",
    title: "Ouverte",
    text: "Technologies open source & standards",
  },
  {
    icon: "evolutive.svg",
    title: "Évolutive",
    text: "Conçue pour s'adapter à vos besoins",
  },
  {
    icon: "au-service.svg",
    title: "Au service",
    text: "Avec et pour la communauté mondiale",
  },
];

const KonvictionCard = memo(
  ({ n, icon: iconName, iconSize, title, tag, text, check, img }) => (
    <div className="relative flex flex-1 flex-col rounded-[24px] border border-[#1EB394]/35 bg-[#F6F8F8] p-6 shadow-[0_25px_50px_-12px_rgba(30,179,149,0.4)] sm:p-8 lg:p-[41px]">
      <span className="absolute right-4 top-1 text-[56px] font-black leading-none text-[#0F172A]/5 sm:right-6 sm:text-[72px] lg:right-[32px] lg:top-[8px] lg:text-[96px]">
        {n}
      </span>
      <div className="mb-6 flex h-[56px] w-[56px] items-center justify-center rounded-[20px] bg-[#E9F7F4] sm:mb-8 sm:h-[64px] sm:w-[64px] lg:mb-[32px]">
        <img
          src={icon(iconName)}
          alt=""
          className={iconSize}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="flex flex-1 flex-col gap-5 sm:gap-6">
        <div>
          <h3 className="text-xl font-extrabold text-[#0F172A] sm:text-[24px]">
            {title}
          </h3>
          <p className="text-xs font-bold uppercase tracking-[1.4px] text-[#1EB394] sm:text-sm">
            {tag}
          </p>
        </div>
        <p className="text-sm leading-6 text-[#475569] sm:text-[16px] sm:leading-[26px]">
          {text}
        </p>
        <div className="mt-auto flex items-center gap-2 pt-3 sm:pt-4">
          <img
            src={icon("check-icon.svg")}
            alt=""
            className="h-[15px] w-[15px]"
            loading="lazy"
            decoding="async"
          />
          <span className="text-sm font-semibold text-[#0F172A]">{check}</span>
        </div>
        <div className="h-[130px] w-full overflow-hidden rounded-[12px] bg-[#F1F5F9] sm:h-[150px] lg:h-[160px]">
          <img
            src={asset(img)}
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  ),
);

/**
 * Hook: returns true when viewport width is below the `sm` breakpoint (640px).
 * Used to tame large transform offsets on mobile so they don't blow out
 * the page's scrollable width (the cause of the horizontal-scroll bug).
 */
function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false,
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

const ValueCard = memo(({ icon: iconName, size, label, index, isVisible }) => {
  const xOffsets = [352.7328, 98.9281, -154.8707, -408.7457, -662.5446];
  const yOffsets = [260.0004, 267.9789, 267.9789, 271.8793, 280.9789];
  const isMobile = useIsMobile();
  // Scale down the horizontal travel distance on small screens so cards
  // never start far enough off-screen to expand the page's scroll width.
  const xScale = isMobile ? 0.25 : 1;
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: xOffsets[index] * xScale,
        y: yOffsets[index],
        rotate: -90,
      }}
      animate={isVisible ? { opacity: 1, x: 0, y: 0, rotate: 0 } : {}}
      transition={{
        type: "spring",
        mass: 1,
        stiffness: 80,
        damping: 20,
        visualDuration: 1.666831,
      }}
      whileHover="hover"
      variants={{
        rest: { backgroundColor: "#FFFFFF", transition: HOVER_TRANS },
        hover: { backgroundColor: "#6BB3A5", transition: HOVER_TRANS },
      }}
      className="relative flex h-[150px] flex-col items-center justify-center gap-4 rounded-[16px] border border-white/40 p-4 text-center shadow-[0_8px_16px_rgba(0,107,87,0.15)] hover:shadow-[0_8px_32px_rgba(0,107,87,0.35)] bg-white sm:h-[170px] sm:gap-6 sm:p-6 lg:h-[178px]"
    >
      <motion.div
        variants={{ rest: { opacity: 1 }, hover: { opacity: 0.18 } }}
        transition={HOVER_TRANS}
        className="flex flex-col items-center gap-4 sm:gap-6"
      >
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[16px] bg-[#B8EADA]/40 sm:h-[64px] sm:w-[64px]">
          <img
            src={icon(iconName)}
            alt=""
            className={size}
            loading="lazy"
            decoding="async"
          />
        </div>
        <p className="text-sm font-semibold text-[#1A1C1C] sm:text-[16px]">
          {label}
        </p>
      </motion.div>
      <motion.div
        variants={{
          rest: { color: "transparent" },
          hover: { color: "#ffffff" },
        }}
        transition={{ ...HOVER_TRANS, delay: 0.05 }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-bold text-transparent"
      >
        Explorer
      </motion.div>
    </motion.div>
  );
});

const ServiceCard = memo(({ title, description, bg, layers }) => {
  const imgVariants = {
    rest: {
      height: "100%",
      transition: { duration: 1.25, ease: [0.25, 0.1, 0.25, 1] },
    },
    hover: {
      height: "50%",
      transition: { duration: 1.25, ease: [0.25, 0.1, 0.25, 1] },
    },
  };
  const textVariants = {
    rest: { y: 20, opacity: 0 },
    hover: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.25, ease: [0.25, 0.1, 0.25, 1] },
    },
  };
  return (
    <motion.div
      className="relative h-[300px] w-[210px] shrink-0 rounded-[20px] shadow-[0_20px_35px_-8px_rgba(30,179,148,0.65)] sm:h-[330px] sm:w-[240px] lg:h-[356px] lg:w-[260px]"
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap="hover"
    >
      <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-white/70 sm:backdrop-blur-[6px]">
        <motion.div
          className="absolute inset-x-0 top-0 w-full overflow-hidden"
          style={{ backgroundColor: bg }}
          variants={imgVariants}
        >
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.6) 48%, transparent 62%)",
              mixBlendMode: "soft-light",
            }}
          />
          <img
            src={layers[0]}
            alt={title}
            className="absolute inset-0 h-full w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
        <motion.div
          className="absolute inset-x-0 bottom-0 z-10 flex h-1/2 flex-col justify-center gap-3 bg-white/95 p-3 sm:backdrop-blur-sm sm:gap-[14px] sm:p-4"
          variants={textVariants}
        >
          <div>
            <h3 className="text-[16px] font-bold leading-6 text-[#0D5143] sm:text-[18px]">
              {title}
            </h3>
            <p className="mt-1.5 text-xs leading-[18px] text-[#64748B] sm:text-[13px] sm:leading-[19px]">
              {description}
            </p>
          </div>
          <button className="flex items-center gap-1 text-xs font-bold text-[#1EB394] sm:text-[13px]">
            Voir plus{" "}
            <img
              src={icon("arrow-right.svg")}
              alt=""
              className="h-[14px] w-[14px]"
              loading="lazy"
              decoding="async"
            />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
});

const TestimonialCard = memo(({ quote, avatar, name, role, quoteMark }) => (
  <motion.div
    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    transition={{ ...S, delay: 0 }}
    className="flex-1"
  >
    <div className="relative flex h-full flex-col gap-6 rounded-[24px] bg-white p-6 shadow-[0_20px_25px_-5px_rgba(226,232,240,0.5),0_8px_10px_-6px_rgba(226,232,240,0.5),0_4px_10px_rgba(30,179,148,0.5)] sm:gap-8 sm:p-8 lg:p-10">
      {quoteMark && (
        <img
          src={asset("quote.png")}
          alt=""
          className="absolute -top-5 left-6 h-10 w-10 sm:-top-6 sm:left-10 sm:h-12 sm:w-12"
          loading="lazy"
          decoding="async"
        />
      )}
      <p className="flex-1 text-sm leading-6 text-[#475569] sm:text-[16px]">
        {quote}
      </p>
      <div className="mt-auto flex items-center gap-4 border-t border-[#F1F5F9] pt-5 sm:pt-[25px]">
        <img
          src={asset(avatar)}
          alt={name}
          className="h-12 w-12 rounded-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div>
          <p className="text-xs text-[#1EB394]">{role}</p>
          <p className="text-sm font-bold text-[#1E293B]">{name}</p>
        </div>
      </div>
    </div>
  </motion.div>
));

const HeroSection = () => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const isMobile = useIsMobile();

  return (
    <div className="relative flex min-h-[560px] w-full flex-col items-center overflow-hidden bg-[#0A1A17] px-4 pb-24 pt-28 sm:min-h-[720px] sm:pb-40 sm:pt-40 lg:h-[941px] lg:pb-[260px] lg:pt-[210px]">
      <div className="pointer-events-none absolute inset-0" style={HERO_BG}>
        <div className="absolute inset-0 scale-[0.55] sm:scale-75 lg:scale-100">
          {heroOrbs.map((orb, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: orb.left,
                top: orb.top,
                width: orb.size,
                height: orb.size,
                backgroundColor: orb.color,
                filter: `blur(${isMobile ? orb.blur * 0.35 : orb.blur}px)`,
              }}
              animate={
                isHeroInView ? { x: [0, orb.x], y: [0, orb.y] } : { x: 0, y: 0 }
              }
              transition={{ x: orbT, y: orbT }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_0%_0%,rgba(3,20,17,0.85),transparent_55%)]" />
      </div>
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={isHeroInView ? "visible" : "hidden"}
        className="relative z-10 flex w-full max-w-[1248px] flex-col items-center gap-8 sm:gap-14"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 60 },
            visible: { opacity: 1, y: 0, transition: S },
          }}
          className="flex flex-col items-center gap-4 self-stretch sm:gap-6"
        >
          <h1 className="text-center text-[28px] font-black leading-tight text-white sm:text-[36px] lg:text-[44px] lg:leading-normal">
            KoneKtUS transforme vos canaux en un flux unique
          </h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: -40 },
              visible: { opacity: 1, y: 0, transition: { ...S, delay: 0.05 } },
            }}
            className="self-stretch text-center text-base font-normal leading-6 text-white sm:text-lg sm:leading-8 lg:text-xl lg:leading-[35px]"
          >
            <span className="block sm:inline">
              Simplifiez vos interactions, libérez vos équipes des complexités
              inutiles
            </span>{" "}
            <span className="block sm:inline">
              et concentrez-vous sur ce qui compte vraiment.
            </span>
          </motion.p>
        </motion.div>
        <motion.form
          variants={{
            hidden: { opacity: 0, y: -80 },
            visible: { opacity: 1, y: 0, transition: { ...S, delay: 0.1 } },
          }}
          className="flex w-full max-w-[319px] items-center gap-2 rounded-full bg-white px-5 py-2.5"
        >
          <label htmlFor="email-cta" className="sr-only">
            E-mail professionnel
          </label>
          <input
            id="email-cta"
            type="email"
            placeholder="E-mail professionnel"
            className="min-w-0 flex-1 bg-transparent text-[13px] leading-5 text-[#B4C8C9] placeholder:text-[#B4C8C9] outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-[#1EB394] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#178f76]"
          >
            Accès gratuit
          </button>
        </motion.form>
      </motion.section>
    </div>
  );
};

const DashboardPreview = () => {
  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={S}
      whileHover="hover"
      className="group relative z-10 mx-auto -mt-16 w-full max-w-[92%] cursor-pointer sm:-mt-32 lg:-mt-[380px] lg:w-[1264px]"
    >
      <img
        src={asset("dashboard.png")}
        alt="Aperçu du tableau de bord KoneKtUS"
        className="w-full rounded-2xl shadow-[0_25px_60px_-15px_rgba(30,179,148,0.5)]"
        loading="lazy"
        decoding="async"
      />
      <div className="hidden sm:block">
        {[
          { color: "#1EB394", top: "18%", left: "12%", delay: 0 },
          { color: "#2E90FA", top: "34%", left: "68%", delay: 0.3 },
          { color: "#F79009", top: "62%", left: "40%", delay: 0.6 },
        ].map((dot, i) => (
          <motion.span
            key={i}
            className="absolute h-3 w-3 rounded-full"
            style={{ top: dot.top, left: dot.left, backgroundColor: dot.color }}
            initial={{ opacity: 0 }}
            animate={
              isCardInView
                ? {
                    opacity: [0, 1, 0.3, 1, 0.3, 1],
                    scale: [0.5, 1, 1.6, 1, 1.6, 1],
                  }
                : { opacity: 0, scale: 0.5 }
            }
            transition={{
              duration: 2,
              ease: "linear",
              repeat: isCardInView ? Infinity : 0,
              delay: dot.delay,
              times: [0, 0.15, 0.35, 0.55, 0.75, 1],
            }}
          />
        ))}
      </div>
      <motion.div
        variants={{ rest: { opacity: 0, y: 12 }, hover: { opacity: 1, y: 0 } }}
        initial="rest"
        transition={S}
        className="pointer-events-none absolute inset-x-0 bottom-4 mx-auto flex w-fit items-center gap-2 rounded-full bg-[#0B3F34]/90 px-4 py-2 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 sm:text-sm"
      >
        Voir le tableau de bord en détail
      </motion.div>
    </motion.div>
  );
};

const LogoMarquee = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 62 }}
        animate={isInView ? { opacity: 1, y: 4 } : {}}
        transition={S}
        className="mx-auto w-full max-w-[1248px] overflow-hidden py-8 sm:py-[54px]"
      >
        <div className="marquee-rtl flex w-max items-center gap-10 sm:gap-[90px]">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={`${logo.alt}-${i}`}
              className="flex h-[40px] w-[110px] shrink-0 items-center justify-center opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 sm:h-[55px] sm:w-[149px]"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
        <style>{`@keyframes marquee-rtl { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } .marquee-rtl { animation: marquee-rtl 20s linear infinite; }`}</style>
      </motion.div>
    </div>
  );
};

const KonvictionsSection = () => {
  const konvictionsRef = useRef(null);
  const areKonvictionsInView = useInView(konvictionsRef, {
    once: true,
    amount: 0.15,
  });
  const konvictionDelays = { Kulture: 0, Katalyst: 0.4, Kality: 0.8 };
  const konvictionYOffsets = { Kulture: 250, Katalyst: 340, Kality: 350 };
  return (
    <section
      ref={konvictionsRef}
      className="mx-auto w-full max-w-[1248px] overflow-visible px-4 py-16 sm:py-20 lg:py-[100px]"
    >
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={areKonvictionsInView ? { opacity: 1, y: 0 } : {}}
        transition={S}
        className="mb-10 flex flex-col gap-5 sm:mb-14 sm:gap-7 lg:mb-16"
      >
        <h2 className="text-[26px] font-black leading-snug text-[#0B3F34] sm:text-[32px] lg:text-[36px] lg:leading-[1.5]">
          Nos Konvictions
        </h2>
        <p className="max-w-[900px] text-base leading-6 text-black sm:text-lg sm:leading-8 lg:text-xl lg:leading-[35px]">
          Kulture, Katalyst, Kality : Nos principes fondamentaux pour innover et
          réussir. Nous ne nous contentons pas de bâtir des outils, nous
          forgeons l'avenir du B2B.
        </p>
      </motion.div>
      <div className="flex flex-col items-stretch gap-6 lg:flex-row">
        {konvictions.map((k) => (
          <motion.div
            key={k.title}
            initial={{ opacity: 0, y: konvictionYOffsets[k.title] }}
            animate={areKonvictionsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...S, delay: konvictionDelays[k.title] }}
            whileHover={{
              boxShadow: "0px 5px 50px 10px rgba(13,81,67,0.4)",
              transition: S,
            }}
            className="flex flex-1 flex-col rounded-[24px]"
          >
            <KonvictionCard {...k} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ValuesSection = () => {
  const valuesTextRef = useRef(null);
  const isValuesTextInView = useInView(valuesTextRef, {
    once: true,
    amount: 0.2,
  });
  const valuesRef = useRef(null);
  const areValuesInView = useInView(valuesRef, { once: true, amount: 0.15 });
  const visionRef = useRef(null);
  const isVisionInView = useInView(visionRef, { once: true, amount: 0.2 });
  const txtSpring = {
    type: "spring",
    mass: 1,
    stiffness: 100,
    damping: 15,
    visualDuration: 1.91645,
  };
  const feaSpring = {
    type: "spring",
    mass: 1,
    stiffness: 100,
    damping: 15,
    visualDuration: 2.044188,
  };
  return (
    <section className="relative mx-auto w-full max-w-[1248px] overflow-hidden px-4 py-14 sm:py-16 lg:py-20">
      <div
        ref={valuesTextRef}
        className="mb-10 flex flex-col items-start gap-5 text-left sm:mb-16 sm:gap-7"
      >
        <div className="w-full max-w-[770px]">
          <p className="text-xs font-bold uppercase tracking-[1.4px] text-[#1EB394] sm:text-sm">
            Nos valeurs
          </p>
          <motion.h2
            initial={{ opacity: 0, y: -80, scaleX: 0.8026, scaleY: 0.7973 }}
            animate={
              isValuesTextInView
                ? { opacity: 1, y: 0, scaleX: 1, scaleY: 1 }
                : {}
            }
            transition={txtSpring}
            style={{ originX: 0, originY: 0 }}
            className="text-[26px] font-black leading-snug text-[#0B3F34] sm:text-[32px] lg:text-[36px] lg:leading-[1.5]"
          >
            Pourquoi choisir KonektUS ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -90, scaleX: 0.8026, scaleY: 0.8 }}
            animate={
              isValuesTextInView
                ? { opacity: 1, y: 0, scaleX: 1, scaleY: 1 }
                : {}
            }
            transition={txtSpring}
            style={{ originX: 0, originY: 0 }}
            className="mt-3 text-base leading-6 text-black sm:mt-4 sm:text-lg sm:leading-8 lg:text-xl lg:leading-[32.5px]"
          >
            Les plus grandes entreprises technologiques au monde ont bâti leur
            réussite sur un principe fondamental : le pouvoir du code ouvert.
            Chez KoneKtUS, nous partageons exactement cette philosophie.
          </motion.p>
        </div>
      </div>
      <div
        ref={valuesRef}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5"
      >
        {values.map((v, i) => (
          <ValueCard
            key={v.label}
            {...v}
            index={i}
            isVisible={areValuesInView}
          />
        ))}
        <div className="col-span-2 flex justify-end sm:col-span-1 sm:col-start-3 sm:justify-end lg:col-start-5">
          <Link
            to="/about#valeurs"
            className="flex items-center gap-1 rounded-full bg-[#1EB394] px-4 py-2 text-sm text-white transition hover:bg-[#178f76]"
          >
            En savoir plus{" "}
            <img
              src={arrowRightIcon}
              alt=""
              className="h-3 w-3"
              loading="lazy"
              decoding="async"
            />
          </Link>
        </div>
      </div>
      <motion.section
        ref={visionRef}
        initial={{ opacity: 0 }}
        animate={isVisionInView ? { opacity: 1 } : {}}
        transition={S}
        className="mx-auto flex w-full max-w-[1248px] flex-col items-center gap-8 overflow-hidden px-4 py-14 sm:gap-12 sm:py-20 lg:flex-row"
      >
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={isVisionInView ? { opacity: 1, x: 0 } : {}}
          transition={{ ...S, delay: 0.1 }}
          className="flex flex-1 flex-col items-start gap-4"
        >
          <p className="text-xs font-bold uppercase tracking-[1.4px] text-[#1EB394] sm:text-sm">
            Notre vision
          </p>
          <h2 className="text-[26px] font-black leading-snug text-[#0B3F34] sm:text-[32px] lg:text-[36px] lg:leading-[1.5]">
            La technologie doit travailler pour vous,{" "}
            <span className="bg-gradient-to-r from-[#0B3F34] to-[#1DA588] bg-clip-text text-transparent">
              jamais l'inverse.
            </span>
          </h2>
          <p className="max-w-[619px] text-base leading-6 text-black sm:text-lg lg:text-xl lg:leading-[1.5]">
            KonektUS est née d'une conviction simple : la technologie doit être
            ouverte, évolutive et au service des entreprises. Nous bâtissons
            aujourd'hui un écosystème ouvert, audité et continuellement
            amélioré, conçu avec et pour une communauté mondiale.
          </p>
          <Link
            to="/about#mission"
            className="mt-2 flex items-center gap-1 rounded-full bg-[#1EB394] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#178f76]"
          >
            En savoir plus{" "}
            <img src={arrowRightIcon} alt="" className="h-3 w-3" />
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={isVisionInView ? { opacity: 1, x: 0 } : {}}
          transition={{ ...S, delay: 0.05 }}
          className="w-full flex-1"
        >
          <img
            src={asset("vision-illustration.png")}
            alt="Notre vision"
            className="w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      </motion.section>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={feaSpring}
        className="mx-auto mt-10 grid max-w-[1024px] grid-cols-1 gap-6 rounded-[16px] border border-[#2DD4BF]/10 bg-[#0D5143]/80 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.37)] sm:backdrop-blur-[6px] sm:mt-16 sm:gap-8 sm:p-6 sm:grid-cols-3 lg:p-[33px]"
      >
        {featureStripItems.map((f) => (
          <div key={f.title} className="flex items-center gap-4">
            <div className="flex shrink-0 items-center justify-center rounded-[8px] bg-[#2DD4BF]/10 p-3">
              <img
                src={icon(f.icon)}
                alt=""
                className="h-7 w-7 sm:h-8 sm:w-8"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="text-white">
              <p className="text-[15px] font-bold sm:text-[16px]">{f.title}</p>
              <p className="text-sm leading-5">{f.text}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

const ServicesSection = () => {
  const servicesRef = useRef(null);
  const areServicesInView = useInView(servicesRef, {
    once: true,
    amount: 0.15,
  });
  const txtSpring = {
    type: "spring",
    mass: 1,
    stiffness: 100,
    damping: 15,
    visualDuration: 1.91645,
  };
  return (
    <section
      ref={servicesRef}
      className="mx-auto w-full max-w-[1248px] px-4 py-16 sm:py-20 lg:py-[100px]"
    >
      <motion.div
        initial={{ opacity: 0, y: -100, scaleX: 0.8026, scaleY: 0.7973 }}
        animate={
          areServicesInView ? { opacity: 1, y: 0, scaleX: 1, scaleY: 1 } : {}
        }
        transition={txtSpring}
        style={{ originX: 0, originY: 0 }}
        className="mb-8 flex flex-col items-start gap-3 text-left sm:mb-10 sm:gap-4 lg:mb-[54px]"
      >
        <p className="text-xs font-bold uppercase tracking-[1.4px] text-[#1EB394] sm:text-sm">
          Expertise
        </p>
        <h2 className="text-[26px] font-black leading-[32px] text-[#0B3F34] sm:text-[30px] sm:leading-[38px] lg:text-[36px] lg:leading-[45px]">
          Nos services
        </h2>
        <p className="max-w-[576px] text-base leading-6 text-black sm:text-[18px]">
          Solutions de communication unifiées conçues pour l'excellence
          opérationnelle.
        </p>
      </motion.div>
      <div className="-mx-4 -my-10 overflow-x-auto px-4 py-10 sm:-my-12 sm:py-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-5 pb-4 sm:gap-8">
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: S },
              }}
              className="flex shrink-0 flex-col items-end gap-6"
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-center pr-0 sm:mt-8 sm:justify-end sm:pr-4">
        <Link
          to="/services#services"
          className="flex items-center gap-1 rounded-full bg-[#1EB394] px-4 py-2 text-sm text-white transition hover:bg-[#178f76]"
        >
          En savoir plus <img src={arrowRightIcon} alt="" className="h-3 w-3" />
        </Link>
      </div>
    </section>
  );
};

const TestimonialsSection = () => (
  <section className="mx-auto w-full max-w-[1248px] px-4 py-14 sm:py-20">
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...S, delay: 0 }}
      className="mb-10 text-center text-[26px] font-extrabold text-[#0B3F34] sm:mb-16 sm:text-[32px] lg:text-[36px]"
    >
      Approuvé par les leaders
    </motion.div>
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1, delayChildren: 0.1, ...S },
        },
      }}
      className="flex flex-col gap-6 sm:gap-8 lg:flex-row items-stretch"
    >
      {testimonials.map((t) => (
        <TestimonialCard key={t.name} {...t} />
      ))}
    </motion.div>
  </section>
);

const CtaSection = () => {
  const ctaRef = useRef(null);
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.2 });
  return (
    <section
      ref={ctaRef}
      className="mx-auto w-full max-w-[1248px] px-4 py-10 sm:py-[60px]"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
        transition={S}
        className="flex flex-col items-center gap-6 rounded-[24px] bg-gradient-to-r from-[#17866F] to-[#05201B] px-6 py-10 text-center sm:px-[88px] sm:py-[60px]"
      >
        <h2 className="text-[24px] font-bold leading-[1.3] text-white sm:text-[32px] sm:leading-[1.3] lg:text-[44px] lg:leading-[60px]">
          Prêt à transformer votre entreprise avec Konektus ?
        </h2>
        <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:gap-6">
          {["Contactez-Nous", "Démarrer l'essai gratuit"].map((label) => (
            <button
              key={label}
              className="w-full max-w-[320px] rounded-full bg-white px-6 py-3 text-[15px] font-bold text-[#2B6859] shadow-[0_8px_10px_rgba(0,0,0,0.25)] transition hover:bg-gray-100 sm:w-[279px] sm:px-8 sm:py-4 sm:text-[18px]"
            >
              {label}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = new URL("../../assets/home/dashboard.png", import.meta.url).href;
    img
      .decode()
      .catch(() => {})
      .finally(() => setIsLoaded(true));
  }, []);

  if (!isLoaded) return <HomeSkeleton />;

  return (
    <div className="w-full overflow-x-hidden">
      <HeroSection />
      <DashboardPreview />
      <LogoMarquee />
      <div className="relative w-full overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${asset("bg.png")})`,
            backgroundRepeat: "repeat-y",
            backgroundSize: "100% auto",
            backgroundPosition: "top center",
          }}
        />
        <KonvictionsSection />
        <ValuesSection />
        <ServicesSection />
        <TestimonialsSection />
        <CtaSection />
      </div>
    </div>
  );
}

// ========== Core Imports ==========
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import ContactSkeleton from "../../components/skeleton/Contactskeleton.jsx";

// ========== Asset Imports ==========
import mailIcon from "../../assets/contact/mail-icon.svg";
import arrowIcon from "../../assets/contact/arrow.svg";
import pinIcon from "../../assets/contact/pin-icon.svg";
import clockIcon from "../../assets/contact/clock-icon.svg";
import globeIcon from "../../assets/contact/globe-icon.svg";
import starIcon from "../../assets/contact/star-icon.svg";
import boltIcon from "../../assets/contact/bolt-icon.svg";
import officeTunisia from "../../assets/contact/office-tunisia.png";
import officeAlgeria from "../../assets/contact/office-algeria.png";
import officeEgypt from "../../assets/contact/office-egypt.png";
import user1 from "../../assets/contact/user1.png";
import user2 from "../../assets/contact/user2.png";
import user3 from "../../assets/contact/user3.png";
import headsetBadgeIcon from "../../assets/contact/headset-badge-icon.svg";
import bgContact from "../../assets/contact/bg-contact.png";

// ========== Animation Presets ==========
// Spring physics for smooth, natural motion
const SPRING = { type: "spring", mass: 1, stiffness: 100, damping: 15 };
// Fade-up variants (from bottom)
const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: SPRING } };
// Fade-down variants (from top)
const fadeDown = { hidden: { opacity: 0, y: -40 }, show: { opacity: 1, y: 0, transition: SPRING } };
// Slide in from left or right
const slideIn = (x) => ({ hidden: { opacity: 0, x }, show: { opacity: 1, x: 0, transition: SPRING } });
// Stagger children with optional delay
const stagger = (children = 0.15, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: children, delayChildren: delay } },
});

// ========== Responsive helper ==========
function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

// ========== Reusable Wrappers ==========
// Reveal on scroll with customizable variants and delay
const Reveal = ({ children, className, delay = 0, variants = fadeUp }) => (
  <motion.div
    className={className}
    variants={variants}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.3 }}
    transition={{ ...SPRING, delay }}
  >
    {children}
  </motion.div>
);

// ========== Sub‑components ==========

// Contact card – glass‑morphism card with icon, text, stats and CTA
// Was a fixed 560x378px box; now fluid width (capped at 560px) with a
// responsive min-height instead of a hard pixel height, so content never
// gets clipped on narrow screens.
const ContactCard = ({ icon, iconBg, title, description, stats, buttonText, buttonBg, buttonShadow, slideX }) => (
  <motion.div
    variants={slideIn(slideX)}
    className="relative w-full max-w-[560px] overflow-hidden rounded-3xl border border-white shadow-[0px_4px_15px_-1px_rgba(0,0,0,0.1),0px_10px_30px_-3px_#0d3f34,0px_20px_40px_-5px_rgba(0,0,0,0.05)] sm:min-h-[378px]"
  >
    {/* Glass background – lighter blur on mobile for performance */}
    <div className="absolute inset-0 rounded-3xl bg-[#ddf4ef] backdrop-blur-[6px] sm:backdrop-blur-[20px]" />
    <div className="absolute -top-10 left-1/2 size-40 -translate-x-1/2 rounded-full bg-[#1eb394]/10 blur-[32px]" />
    <div className="relative flex flex-col gap-6 p-6 sm:gap-8 sm:p-8">
      <div className={`flex size-14 items-center justify-center rounded-3xl ${iconBg}`}>
        <img src={icon} alt="" className="h-[22.5px] w-[25px]" />
      </div>
      <div className="flex flex-1 flex-col gap-6 sm:gap-8">
        <div className="flex flex-col gap-[10px]">
          <h3 className="text-xl font-bold text-[#0d5143] sm:text-2xl">{title}</h3>
          <p className="text-sm leading-6 text-[#475569] sm:text-base">{description}</p>
          <div className="flex flex-wrap items-center gap-3 pt-2 text-sm font-medium text-[#64748b] sm:gap-4">
            {stats.map((stat, i) => (
              <span key={i} className="flex items-center gap-2">
                <img src={stat.icon} alt="" className="h-[11.7px] w-auto" />
                {stat.label}
              </span>
            ))}
          </div>
        </div>
        <button className={`flex h-14 w-full items-center justify-center gap-2 rounded-3xl px-6 py-4 text-sm font-bold text-white transition-colors sm:px-8 sm:text-base ${buttonBg} ${buttonShadow}`}>
          {buttonText === "Envoyez-nous un courriel" && <img src={mailIcon} alt="" className="size-[11.667px]" />}
          {buttonText}
        </button>
      </div>
    </div>
    {/* Inner glow */}
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_4px_2px_#1e977e,inset_0px_1px_1px_1px_rgba(255,255,255,0.6)]" />
  </motion.div>
);

// Office card – with image, address and phone
// Was a fixed 389x406px box; now fluid width (capped at 389px) with the
// photo keeping a fixed height and everything below flowing naturally.
const OfficeCard = ({ image, alt, country, city, address, phone }) => (
  <motion.div
    variants={fadeUp}
    className="relative w-full max-w-[389px] overflow-hidden rounded-3xl border border-white/70 shadow-[0px_4px_15px_-1px_rgba(0,0,0,0.1),0px_10px_30px_-3px_rgba(30,179,148,0.1),0px_20px_40px_-5px_rgba(0,0,0,0.05)]"
  >
    <div
      className="absolute inset-0 rounded-3xl backdrop-blur-[6px] sm:backdrop-blur-[20px]"
      style={{ background: "linear-gradient(123deg, #b9e7de 0%, rgba(255,255,255,0.3) 100%)" }}
    />
    <div className="absolute -top-10 right-[-40px] size-40 rounded-full bg-[#1eb394]/10 blur-[32px]" />
    <div className="relative flex flex-col gap-4 p-4">
      <div className="h-44 w-full overflow-hidden rounded-3xl bg-slate-100 sm:h-48">
        <img src={image} alt={alt} className="size-full object-cover opacity-90" />
      </div>
      <div className="flex items-center gap-2 px-2">
        <img src={pinIcon} alt="" className="h-5 w-4" />
        <h4 className="text-lg font-bold text-[#0b3f34]">{country}</h4>
      </div>
      <div className="flex flex-col gap-4 px-2 pb-2 text-sm text-[#0b3f34]">
        <p className="leading-[22.75px]">
          {city}<br />{address}
        </p>
        <p className="text-sm font-bold text-[#1eb395]">{phone}</p>
      </div>
    </div>
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_4px_2px_#1e977e,inset_0px_1px_1px_1px_rgba(255,255,255,0.6)]" />
  </motion.div>
);

// ========== Content Data ==========

// Contact cards (sales & support)
const contactCards = [
  {
    icon: arrowIcon,
    iconBg: "bg-[#1eb395]/20",
    title: "Parler à la vente",
    description: "Découvrez comment Konektus peut transformer votre workflow. Nos experts vous aideront à choisir le plan idéal pour votre équipe.",
    stats: [
      { icon: clockIcon, label: "< 2h Response" },
      { icon: globeIcon, label: "Global Support" },
    ],
    buttonText: "Envoyez-nous un courriel",
    buttonBg: "bg-[#1eb395] hover:bg-[#189b7f]",
    buttonShadow: "shadow-[0px_4px_3px_rgba(30,179,148,0.3)]",
    slideX: -80,
  },
  {
    icon: headsetBadgeIcon,
    iconBg: "bg-[#0d5143]",
    title: "Support Technique",
    description: "Déjà partenaire ? Accédez à notre hub technique pour une assistance 24h/24 et 7j/7, une documentation API et un dépannage en temps réel.",
    stats: [
      { icon: boltIcon, label: "15m Avg Resolution" },
      { icon: starIcon, label: "Expert Level 3" },
    ],
    buttonText: "Support technique",
    buttonBg: "bg-[#0d5143] hover:bg-[#126b59]",
    buttonShadow: "shadow-[0px_4px_3px_rgba(13,81,67,0.3),0px_10px_7.5px_rgba(13,81,67,0.3)]",
    slideX: 80,
  },
];

// Office locations
const offices = [
  { image: officeTunisia, alt: "Tunis, Tunisie", country: "Tunisie", city: "Tunis", address: "Centre Urbain Nord", phone: "+216 21 000 200" },
  { image: officeAlgeria, alt: "Alger, Algérie", country: "Algérie", city: "Hydra, Alger", address: "12 Rue des Jardins", phone: "+213 21 000 000" },
  { image: officeEgypt, alt: "Le Caire, Égypte", country: "Egypte", city: "Cairo, Egypt", address: "11 Kasr Al Ainy", phone: "+20 125 478 587" },
];

// Hero decorative orbs (animated background blobs)
// Positions are authored for a ~1440px canvas; they're purely decorative and
// sit inside an overflow-hidden container, so they're left as-is — on
// narrow screens some simply drift further out of view, which is fine.
const heroOrbs = [
  { left: -156, top: 482, size: 651, blur: 50, color: "#1EB394", x: 534, y: 83 },
  { left: -145, top: 261, size: 347, blur: 75, color: "#126B59", x: 111, y: 373 },
  { left: 712, top: 291, size: 416, blur: 75, color: "#0D5143", x: 417, y: 58 },
  { left: 268, top: 241, size: 347, blur: 75, color: "#1EB394", x: -281, y: 84 },
  { left: 874, top: 509, size: 651, blur: 50, color: "#1EB394", x: 30, y: 6 },
];
const orbTransition = { duration: 3, ease: "linear", repeat: Infinity, repeatType: "mirror" };

// ========== Main Component ==========
export default function Contact() {
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const images = [
      bgContact,
      mailIcon,
      arrowIcon,
      pinIcon,
      clockIcon,
      globeIcon,
      starIcon,
      boltIcon,
      officeTunisia,
      officeAlgeria,
      officeEgypt,
      user1,
      user2,
      user3,
      headsetBadgeIcon,
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

  if (!isLoaded) return <ContactSkeleton />;

  return (
    <div className="min-h-screen w-full font-sans" style={{ backgroundImage: `url(${bgContact})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundColor: "#f8fcfb" }}>
      
      {/* ===== HERO SECTION with floating orbs and contact cards ===== */}
      {/* The fixed h-[941px] became min-h so stacked mobile content (hero
          text + two full-width cards) is never clipped by the container. */}
      <div className="relative min-h-[820px] w-full overflow-hidden bg-[#0A1A17] sm:min-h-[941px]">
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(131deg, #061C18 0%, #0B3F34 38%, #128A72 78%, #1EB394 100%)" }}>
          {heroOrbs.map((orb, idx) => (
            <motion.div
              key={idx}
              className="absolute rounded-full"
              style={{
                left: orb.left,
                top: orb.top,
                width: orb.size,
                height: orb.size,
                backgroundColor: orb.color,
                filter: `blur(${isMobile ? orb.blur * 0.35 : orb.blur}px)`,
              }}
              animate={{ x: [0, orb.x], y: [0, orb.y] }}
              transition={{ x: orbTransition, y: orbTransition }}
            />
          ))}
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_0%_0%,rgba(3,20,17,0.85),transparent_55%)]" />
        </div>

        <motion.section
          variants={stagger(0.18)}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto flex w-full max-w-[1248px] flex-col items-center gap-9 px-5 pb-16 pt-28 sm:gap-[46px] sm:px-8 sm:pt-40 lg:px-0 lg:pt-[206px]"
        >
          <div className="flex flex-col items-center gap-4 text-center text-white sm:gap-5">
            <motion.h1 variants={fadeUp} className="text-[32px] font-black leading-[1.25] tracking-[-0.8px] sm:text-[40px] sm:leading-[1.3] sm:tracking-[-1.2px] lg:text-[48px] lg:leading-[72px] lg:tracking-[-1.8px]">
              Contactez l’innovation
            </motion.h1>
            <motion.p variants={fadeUp} className="max-w-[726px] text-base leading-7 sm:text-lg sm:leading-8 lg:text-xl lg:leading-[35px]">
              Notre équipe d’experts est à votre disposition pour propulser votre connectivité business vers de nouveaux sommets. Parlons de votre projet dès aujourd’hui.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-2 flex w-full justify-center gap-4">
              <div className="flex h-auto w-full max-w-[307px] items-center rounded-full border border-white/10 bg-white/10 py-3 pl-5 pr-4 backdrop-blur-md sm:h-[62px] sm:py-0">
                <div className="flex shrink-0 items-center">
                  {[user1, user2, user3].map((u, i) => (
                    <img key={i} src={u} alt="" className={`-mr-3 size-9 shrink-0 rounded-full border-2 border-[#0b3f34] object-cover sm:size-10 ${i === 2 ? "-mr-0" : ""}`} />
                  ))}
                </div>
                <p className="ml-4 text-xs font-medium leading-snug tracking-[0.35px] text-white sm:text-sm">+500 entreprises nous<br />font confiance</p>
              </div>
            </motion.div>
          </div>

          <motion.div variants={stagger(0.15, 0.2)} className="flex w-full flex-col items-center gap-6 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-8">
            {contactCards.map((card, i) => (
              <ContactCard key={i} {...card} />
            ))}
          </motion.div>
        </motion.section>
      </div>

      {/* ===== OFFICES SECTION ===== */}
      <motion.section
        variants={stagger(0.15)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 mx-auto mt-16 flex w-full max-w-[1253px] flex-col gap-10 px-5 sm:mt-24 sm:gap-[62px] sm:px-8 lg:mt-[115px] lg:px-0"
      >
        <Reveal variants={fadeDown} className="flex flex-col gap-3 text-center sm:text-left">
          <h2 className="text-3xl font-black text-[#0b3f34] sm:text-4xl">Nos Bureaux</h2>
          <p className="text-base text-black sm:text-xl">Une présence stratégique pour vous servir partout dans la région MENA.</p>
        </Reveal>
        <div className="grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:flex lg:items-center lg:gap-[41px]">
          {offices.map((office, i) => (
            <OfficeCard key={i} {...office} />
          ))}
        </div>
      </motion.section>

      {/* ===== FINAL CALL-TO-ACTION BANNER ===== */}
      <section className="relative mx-5 mt-20 mb-16 flex min-h-[220px] items-center justify-center overflow-hidden rounded-3xl py-10 shadow-[0px_40px_80px_-15px_rgba(11,63,52,0.3)] sm:mx-8 sm:mt-28 sm:mb-24 sm:min-h-[280px] lg:mx-[86px] lg:mt-40 lg:mb-32" style={{ background: "linear-gradient(145deg, #0b3f34 0%, #1eb394 100%)" }}>
        <motion.div
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="relative flex flex-col items-center gap-6 px-4 text-center sm:gap-[34px]"
        >
          <motion.h2 variants={fadeUp} className="max-w-[876px] text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-[44px] lg:leading-[48px]">
            Prêt à transformer votre performance ?
          </motion.h2>
          <motion.button variants={fadeUp} className="rounded-3xl bg-[#1eb394] px-8 py-4 text-base font-bold text-white shadow-lg transition-colors hover:bg-[#189b7f] sm:px-10 sm:py-5 sm:text-lg">
            Démarrer l’essai gratuit
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
// ========== Core Imports ==========
import { motion } from "framer-motion";

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
const ContactCard = ({ icon, iconBg, title, description, stats, buttonText, buttonBg, buttonShadow, slideX }) => (
  <motion.div
    variants={slideIn(slideX)}
    className="relative h-[378px] w-[560px] overflow-hidden rounded-3xl border border-white shadow-[0px_4px_15px_-1px_rgba(0,0,0,0.1),0px_10px_30px_-3px_#0d3f34,0px_20px_40px_-5px_rgba(0,0,0,0.05)]"
  >
    {/* Glass background */}
    <div className="absolute inset-0 rounded-3xl bg-[#ddf4ef] backdrop-blur-[20px]" />
    <div className="absolute -top-10 left-[163px] size-40 rounded-full bg-[#1eb394]/10 blur-[32px]" />
    <div className="relative flex h-full flex-col gap-8 p-8">
      <div className={`flex size-14 items-center justify-center rounded-3xl ${iconBg}`}>
        <img src={icon} alt="" className="h-[22.5px] w-[25px]" />
      </div>
      <div className="flex flex-1 flex-col gap-8">
        <div className="flex flex-col gap-[10px]">
          <h3 className="text-2xl font-bold text-[#0d5143]">{title}</h3>
          <p className="text-base leading-6 text-[#475569]">{description}</p>
          <div className="flex items-center gap-4 pt-2 text-sm font-medium text-[#64748b]">
            {stats.map((stat, i) => (
              <span key={i} className="flex items-center gap-2">
                <img src={stat.icon} alt="" className="h-[11.7px] w-auto" />
                {stat.label}
              </span>
            ))}
          </div>
        </div>
        <button className={`flex h-14 w-full items-center justify-center rounded-3xl px-8 py-4 text-base font-bold text-white transition-colors ${buttonBg} ${buttonShadow}`}>
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
const OfficeCard = ({ image, alt, country, city, address, phone }) => (
  <motion.div
    variants={fadeUp}
    className="relative h-[406px] w-[389px] overflow-hidden rounded-3xl border border-white/70 shadow-[0px_4px_15px_-1px_rgba(0,0,0,0.1),0px_10px_30px_-3px_rgba(30,179,148,0.1),0px_20px_40px_-5px_rgba(0,0,0,0.05)]"
  >
    <div className="absolute inset-0 rounded-3xl backdrop-blur-[20px]" style={{ background: "linear-gradient(123deg, #b9e7de 0%, rgba(255,255,255,0.3) 100%)" }} />
    <div className="absolute -top-10 right-[-40px] size-40 rounded-full bg-[#1eb394]/10 blur-[32px]" />
    <div className="relative flex h-full flex-col gap-4 p-4">
      <div className="h-48 w-full overflow-hidden rounded-3xl bg-slate-100">
        <img src={image} alt={alt} className="size-full object-cover opacity-90" />
      </div>
      <div className="flex items-center gap-2 px-2">
        <img src={pinIcon} alt="" className="h-5 w-4" />
        <h4 className="text-lg font-bold text-[#0b3f34]">{country}</h4>
      </div>
      <div className="flex flex-col gap-4 px-2 text-sm text-[#0b3f34]">
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
  return (
    <div className="min-h-screen w-full font-sans" style={{ backgroundImage: `url(${bgContact})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundColor: "#f8fcfb" }}>
      
      {/* ===== HERO SECTION with floating orbs and contact cards ===== */}
      <div className="relative h-[941px] w-full overflow-hidden bg-[#0A1A17]">
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(131deg, #061C18 0%, #0B3F34 38%, #128A72 78%, #1EB394 100%)" }}>
          {heroOrbs.map((orb, idx) => (
            <motion.div
              key={idx}
              className="absolute rounded-full"
              style={{ left: orb.left, top: orb.top, width: orb.size, height: orb.size, backgroundColor: orb.color, filter: `blur(${orb.blur}px)` }}
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
          className="relative z-10 mx-auto flex w-[1248px] flex-col items-center gap-[46px] pt-[206px]"
        >
          <div className="flex flex-col items-center gap-5 text-center text-white">
            <motion.h1 variants={fadeUp} className="text-[48px] font-black leading-[72px] tracking-[-1.8px]">
              Contactez l’innovation
            </motion.h1>
            <motion.p variants={fadeUp} className="max-w-[726px] text-xl leading-[35px]">
              Notre équipe d’experts est à votre disposition pour propulser votre connectivité business vers de nouveaux sommets. Parlons de votre projet dès aujourd’hui.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-2 flex gap-4">
              <div className="flex h-[62px] w-[307px] items-center rounded-full border border-white/10 bg-white/10 pl-5 pr-4 backdrop-blur-md">
                <div className="flex items-center">
                  {[user1, user2, user3].map((u, i) => (
                    <img key={i} src={u} alt="" className={`-mr-3 size-10 rounded-full border-2 border-[#0b3f34] object-cover ${i === 2 ? "-mr-0" : ""}`} />
                  ))}
                </div>
                <p className="ml-4 text-sm font-medium tracking-[0.35px] text-white">+500 entreprises nous<br />font confiance</p>
              </div>
            </motion.div>
          </div>

          <motion.div variants={stagger(0.15, 0.2)} className="flex items-center gap-8">
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
        className="relative z-10 mx-auto mt-[115px] flex w-[1253px] flex-col gap-[62px]"
      >
        <Reveal variants={fadeDown} className="flex flex-col gap-3">
          <h2 className="text-4xl font-black text-[#0b3f34]">Nos Bureaux</h2>
          <p className="text-xl text-black">Une présence stratégique pour vous servir partout dans la région MENA.</p>
        </Reveal>
        <div className="flex items-center gap-[41px]">
          {offices.map((office, i) => (
            <OfficeCard key={i} {...office} />
          ))}
        </div>
      </motion.section>

      {/* ===== FINAL CALL-TO-ACTION BANNER ===== */}
      <section className="relative mx-[86px] mt-40 mb-32 flex h-[280px] items-center justify-center overflow-hidden rounded-3xl shadow-[0px_40px_80px_-15px_rgba(11,63,52,0.3)]" style={{ background: "linear-gradient(145deg, #0b3f34 0%, #1eb394 100%)" }}>
        <motion.div
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="relative flex flex-col items-center gap-[34px] px-4 text-center"
        >
          <motion.h2 variants={fadeUp} className="max-w-[876px] text-[44px] font-extrabold leading-[48px] text-white">
            Prêt à transformer votre performance ?
          </motion.h2>
          <motion.button variants={fadeUp} className="rounded-3xl bg-[#1eb394] px-10 py-5 text-lg font-bold text-white shadow-lg transition-colors hover:bg-[#189b7f]">
            Démarrer l’essai gratuit
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
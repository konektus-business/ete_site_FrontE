import React from "react";
import { motion } from "framer-motion";

// ---------------------------------------------------------------------------
// Import des assets locaux (dossier ../../assets/contact/)
// ---------------------------------------------------------------------------
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

// ⬇️ NOUVEAU : image de fond pour toute la page
import bgContact from "../../assets/contact/bg-contact.png"; // ← à adapter

// ---------------------------------------------------------------------------
// Regroupement dans un objet
// ---------------------------------------------------------------------------
const img = {
  mailIcon,
  arrowIcon,
  officeTunisia,
  officeAlgeria,
  officeEgypt,
  user1,
  user2,
  user3,
  pinIcon,
  clockIcon,
  globeIcon,
  starIcon,
  boltIcon,
  headsetBadgeIcon,
};

// ---------------------------------------------------------------------------
// Configuration des orbes animés
// ---------------------------------------------------------------------------
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
  {
    left: 712,
    top: 291,
    size: 416,
    blur: 75,
    color: "#0D5143",
    x: 417,
    y: 58,
  },
  {
    left: 268,
    top: 241,
    size: 347,
    blur: 75,
    color: "#1EB394",
    x: -281,
    y: 84,
  },
  {
    left: 874,
    top: 509,
    size: 651,
    blur: 50,
    color: "#1EB394",
    x: 30,
    y: 6,
  },
];

const heroOrbTransition = {
  duration: 3,
  ease: "linear",
  repeat: Infinity,
  repeatType: "mirror",
};

// ---------------------------------------------------------------------------
// Petits composants partagés
// ---------------------------------------------------------------------------

function MailIcon({ className = "size-[11.667px]" }) {
  return (
    <div className={`relative ${className}`}>
      <img
        alt=""
        className="absolute inset-0 block size-full max-w-none"
        src={img.mailIcon}
      />
    </div>
  );
}

function SocialProofPill() {
  return (
    <div className="flex h-[62px] w-[307px] items-center rounded-full border border-white/10 bg-white/10 pl-5 pr-4 backdrop-blur-md">
      <div className="flex items-center">
        <img
          alt=""
          src={img.user1}
          className="-mr-3 size-10 rounded-full border-2 border-[#0b3f34] object-cover"
        />
        <img
          alt=""
          src={img.user2}
          className="-mr-3 size-10 rounded-full border-2 border-[#0b3f34] object-cover"
        />
        <img
          alt=""
          src={img.user3}
          className="size-10 rounded-full border-2 border-[#0b3f34] object-cover"
        />
      </div>
      <p className="ml-4 text-sm font-medium tracking-[0.35px] text-white">
        +500 entreprises nous
        <br />
        font confiance
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Cartes contact (vente / support)
// ---------------------------------------------------------------------------

function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`relative h-[378px] overflow-hidden rounded-3xl border border-white shadow-[0px_4px_15px_-1px_rgba(0,0,0,0.1),0px_10px_30px_-3px_#0d3f34,0px_20px_40px_-5px_rgba(0,0,0,0.05)] ${className}`}
    >
      <div className="absolute inset-0 rounded-3xl bg-[#ddf4ef] backdrop-blur-[20px]" />
      <div className="absolute -top-10 left-[163px] size-40 rounded-full bg-[#1eb394]/10 blur-[32px]" />
      <div className="relative flex h-full flex-col gap-8 p-8">{children}</div>
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_4px_2px_#1e977e,inset_0px_1px_1px_1px_rgba(255,255,255,0.6)]" />
    </div>
  );
}

function SalesCard() {
  return (
    <GlassCard className="w-[560px]">
      <div className="flex size-14 items-center justify-center rounded-3xl bg-[#1eb395]/20">
        <img alt="" src={img.arrowIcon} className="size-[25px]" />
      </div>

      <div className="flex flex-1 flex-col gap-8">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-col gap-[9px]">
            <h3 className="text-2xl font-bold text-[#0d5143]">
              Parler à la vente
            </h3>
            <p className="text-base leading-6 text-[#475569]">
              Découvrez comment Konektus peut transformer votre workflow. Nos
              experts vous aideront à choisir le plan idéal pour votre équipe.
            </p>
          </div>

          <div className="flex items-center gap-4 pt-2 text-sm font-medium text-[#64748b]">
            <span className="flex items-center gap-2">
              <img alt="" src={img.clockIcon} className="size-[11.7px]" />
              &lt; 2h Response
            </span>
            <span className="flex items-center gap-2">
              <img alt="" src={img.globeIcon} className="size-[11.7px]" />
              Global Support
            </span>
          </div>
        </div>

        <button className="flex h-14 w-full items-center justify-center gap-3 rounded-3xl bg-[#1eb395] px-8 py-4 text-base font-bold text-white shadow-[0px_4px_3px_rgba(30,179,148,0.3)] transition-colors hover:bg-[#189b7f]">
          <MailIcon />
          Envoyez-nous un courriel
        </button>
      </div>
    </GlassCard>
  );
}

function SupportCard() {
  return (
    <GlassCard className="w-[560px]">
      <div className="flex size-14 items-center justify-center rounded-3xl bg-[#0d5143]">
        <img
          alt=""
          src={img.headsetBadgeIcon}
          className="h-[22.5px] w-[25px]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-8">
        <div className="flex flex-col gap-[31px]">
          <div className="flex flex-col gap-[9px]">
            <h3 className="text-2xl font-bold text-[#0d5143]">
              Support Technique
            </h3>
            <p className="text-base leading-6 text-[#475569]">
              Déjà partenaire ? Accédez à notre hub technique pour une
              assistance 24h/24 et 7j/7, une documentation API et un dépannage
              en temps réel.
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm font-medium text-[#64748b]">
            <span className="flex items-center gap-2">
              <img alt="" src={img.boltIcon} className="h-[11.7px] w-[9.3px]" />
              15m Avg Resolution
            </span>
            <span className="flex items-center gap-1">
              <img
                alt=""
                src={img.starIcon}
                className="h-[12.25px] w-[12.8px]"
              />
              Expert Level 3
            </span>
          </div>
        </div>

        <button className="flex h-14 w-full items-center justify-center rounded-3xl bg-[#0d5143] px-8 py-4 text-base font-bold text-white shadow-[0px_4px_3px_rgba(13,81,67,0.3),0px_10px_7.5px_rgba(13,81,67,0.3)] transition-colors hover:bg-[#126b59]">
          Support technique
        </button>
      </div>
    </GlassCard>
  );
}

// ---------------------------------------------------------------------------
// Section Hero
// ---------------------------------------------------------------------------

function HeroSection() {
  return (
    <section className="relative z-10 mx-auto flex w-[1248px] flex-col items-center gap-[46px] pt-[206px]">
      <div className="flex flex-col items-center gap-5 text-center text-white">
        <h1 className="text-[48px] font-black leading-[72px] tracking-[-1.8px]">
          Contactez l’innovation
        </h1>
        <p className="max-w-[726px] text-xl leading-[35px]">
          Notre équipe d’experts est à votre disposition pour propulser votre
          connectivité business vers de nouveaux sommets. Parlons de votre
          projet dès aujourd’hui.
        </p>

        <div className="mt-2 flex gap-4">
          <SocialProofPill />
        </div>
      </div>

      <div className="flex items-center gap-8">
        <SalesCard />
        <SupportCard />
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section "Nos Bureaux"
// ---------------------------------------------------------------------------

function OfficeCard({ image, imageAlt, country, city, address, phone }) {
  return (
    <div className="relative h-[406px] w-[389px] overflow-hidden rounded-3xl border border-white/70 shadow-[0px_4px_15px_-1px_rgba(0,0,0,0.1),0px_10px_30px_-3px_rgba(30,179,148,0.1),0px_20px_40px_-5px_rgba(0,0,0,0.05)]">
      <div
        aria-hidden
        className="absolute inset-0 rounded-3xl backdrop-blur-[20px]"
        style={{
          backgroundImage:
            "linear-gradient(123deg, rgb(185,231,222) 0%, rgba(255,255,255,0.3) 100%)",
        }}
      />
      <div className="absolute -top-10 right-[-40px] size-40 rounded-full bg-[#1eb394]/10 blur-[32px]" />

      <div className="relative flex h-full flex-col gap-4 p-4">
        <div className="h-48 w-full overflow-hidden rounded-3xl bg-slate-100">
          <img
            alt={imageAlt}
            src={image}
            className="size-full object-cover opacity-90"
          />
        </div>

        <div className="flex items-center gap-2 px-2">
          <img alt="" src={img.pinIcon} className="h-5 w-4" />
          <h4 className="text-lg font-bold text-[#0b3f34]">{country}</h4>
        </div>

        <div className="flex flex-col gap-4 px-2 text-sm text-[#0b3f34]">
          <p className="leading-[22.75px]">
            {city}
            <br />
            {address}
          </p>
          <p className="text-sm font-bold text-[#1eb395]">{phone}</p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_4px_2px_#1e977e,inset_0px_1px_1px_1px_rgba(255,255,255,0.6)]" />
    </div>
  );
}

function OfficesSection() {
  return (
    <section className="relative z-10 mx-auto mt-[115px] flex w-[1253px] flex-col gap-[62px]">
      <div className="flex flex-col gap-3">
        <h2 className="text-4xl font-black text-[#0b3f34]">Nos Bureaux</h2>
        <p className="text-xl text-black">
          Une présence stratégique pour vous servir partout dans la région MENA.
        </p>
      </div>

      <div className="flex items-center gap-[41px]">
        <OfficeCard
          image={img.officeTunisia}
          imageAlt="Tunis, Tunisie"
          country="Tunisie"
          city="Tunis"
          address="Centre Urbain Nord"
          phone="+216 21 000 200"
        />
        <OfficeCard
          image={img.officeAlgeria}
          imageAlt="Alger, Algérie"
          country="Algérie"
          city="Hydra, Alger"
          address="12 Rue des Jardins"
          phone="+213 21 000 000"
        />
        <OfficeCard
          image={img.officeEgypt}
          imageAlt="Le Caire, Égypte"
          country="Egypte"
          city="Cairo, Egypt"
          address="11 Kasr Al Ainy"
          phone="+20 125 478 587"
        />
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Bannière CTA en bas
// ---------------------------------------------------------------------------

function CTABanner() {
  return (
    <section
      className="relative mx-[86px] mt-40 mb-32 flex h-[280px] items-center justify-center overflow-hidden rounded-3xl shadow-[0px_40px_80px_-15px_rgba(11,63,52,0.3)]"
      style={{
        backgroundImage:
          "linear-gradient(145deg, rgb(11,63,52) 0%, rgb(30,179,148) 100%)",
      }}
    >
      <div className="relative flex flex-col items-center gap-[34px] px-4 text-center">
        <h2 className="max-w-[876px] text-[44px] font-extrabold leading-[48px] text-white">
          Prêt à transformer votre performance ?
        </h2>
        <button className="rounded-3xl bg-[#1eb394] px-10 py-5 text-lg font-bold text-white shadow-lg transition-colors hover:bg-[#189b7f]">
          Démarrer l’essai gratuit
        </button>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page Contact (exportée)
// ---------------------------------------------------------------------------

export default function Contact() {
  return (
    // ⬇️ Conteneur principal avec image de fond
    <div
      className="w-full min-h-screen font-sans"
      style={{
        backgroundImage: `url(${bgContact})`,
        backgroundSize: "cover", // ou "contain", "auto", etc.
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", // ou "repeat" selon votre image
        backgroundColor: "#f8fcfb", // couleur de secours
      }}
    >
      {/* Hero avec fond dégradé et orbes */}
      <div className="relative h-[941px] w-full overflow-hidden bg-[#0A1A17]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(131deg, #061C18 0%, #0B3F34 38%, #128A72 78%, #1EB394 100%)",
          }}
        >
          {heroOrbs.map((orb, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full"
              style={{
                left: orb.left,
                top: orb.top,
                width: orb.size,
                height: orb.size,
                backgroundColor: orb.color,
                filter: `blur(${orb.blur}px)`,
              }}
              animate={{ x: [0, orb.x], y: [0, orb.y] }}
              transition={{ x: heroOrbTransition, y: heroOrbTransition }}
            />
          ))}
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_0%_0%,rgba(3,20,17,0.85),transparent_55%)]" />
        </div>

        <HeroSection />
      </div>

      <OfficesSection />
      <CTABanner />
    </div>
  );
}

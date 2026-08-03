import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, ChevronDown } from "lucide-react";

// ---------- Assets ----------
import telephonieImg from "../../assets/solutions/telephonie-voip.png";
import chatImg from "../../assets/solutions/chat-collaboratif.png";
import visioImg from "../../assets/solutions/visioconference-hd.png";
import projetImg from "../../assets/solutions/gestion-de-projets-centralisee.png";
import iaImg from "../../assets/solutions/intelligence-artificielle.png";
import cloudCrmImg from "../../assets/solutions/integration-cloud-crm.png";

import commUnifieeImg from "../../assets/solutions/communication-unifiee.png";
import multicanaleImg from "../../assets/solutions/solution-multicanale.png";
import contactCenterImg from "../../assets/solutions/centre-de-contact-intelligent.png";
import dataImg from "../../assets/solutions/data-pilotage.png";
import collaboratifImg from "../../assets/solutions/collaboration-mobilite.png";
import infraImg from "../../assets/solutions/infrastructure-cloud.png";
import surMesureImg from "../../assets/solutions/solution-sur-mesure.png";
import heroImg from "../../assets/solutions/hero.png";
import globalBgImg from "../../assets/solutions/global-bg.png";

import avatarSarah from "../../assets/solutions/avatar-sarah.png";
import avatarKarim from "../../assets/solutions/avatar-karim.png";
import avatarLeila from "../../assets/solutions/avatar-leila.png";

import customIcon from "../../assets/solutions/custom-check-icon.svg"; // or .png

// Wave assets (from About page – adjust paths if needed)
import statsWaveBg from "../../assets/about/wave-main.svg";
import statsGlow from "../../assets/about/stats-numbers-glow.png";

// ---------- Styles & Subcomponents ----------
const PRIMARY_GRADIENT =
  "linear-gradient(149.6deg, rgb(30,179,148) 16%, rgb(0,107,87) 82%)";

// Approximates the Figma-exported spring curve (kf_2103_8059/60/61):
// a slow-ish rise that overshoots ~2.8% around the midpoint before settling,
// over roughly 2 seconds total. Using Framer Motion's duration-based spring
// syntax so the total time matches the original CSS animation (2.044188s)
// instead of being derived indirectly from stiffness/damping.
const HERO_SPRING = {
  type: "spring",
  duration: 2,
  bounce: 0.18,
};

function PrimaryButton({ children, className = "" }) {
  return (
    <button
      className={`inline-flex items-center gap-3 rounded-full px-6 py-3 text-white font-semibold text-base whitespace-nowrap ${className}`}
      style={{ backgroundImage: PRIMARY_GRADIENT }}
    >
      {children}
      <ChevronDown className="size-3 -rotate-90" strokeWidth={3} />
    </button>
  );
}

function SecondaryButton({ children, className = "" }) {
  return (
    <button
      className={`inline-flex items-center gap-3 rounded-full border-2 border-[#006b57] px-6 py-3 text-[#006b57] font-semibold text-base whitespace-nowrap ${className}`}
    >
      {children}
      <ChevronDown className="size-3 -rotate-90" strokeWidth={3} />
    </button>
  );
}

function FeatureList({ items }) {
  return (
    <ul className="flex flex-col gap-4 w-full">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          {/* Replace CheckCircle2 with your custom icon */}
          <img src={customIcon} alt="" className="size-5 shrink-0 mt-0.5" />
          <span className="text-base text-black">{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ---------- Data ----------
const stats = [
  { value: "7", label: "Solutions intégrées" },
  { value: "6", label: "Modules VTM" },
  { value: "48h", label: "Déploiement garanti" },
];

const modules = [
  {
    title: "Téléphonie & VoIP",
    description:
      "Appelez partout dans le monde, supervisez en temps réel, ne perdez plus aucun appel",
    items: [
      "Appels internes illimités + appels externes worldwide",
      "Enregistrements illimités et supervision temps réel",
      "Routage avancé, files d'attente et priorités",
      "Statistiques détaillées et tableaux de bord",
      "Nombre de canaux illimités",
    ],
    image: telephonieImg,
  },
  {
    title: "Chat Collaboratif",
    description:
      "Un chat professionnel, sécurisé, accessible depuis n'importe quel appareil, fini WhatsApp perso pour le travail.",
    items: [
      "Rooms privées et publiques avec mentions intelligentes",
      "Statistiques détaillées et tableaux de bord",
      "Routage avancé, files d'attente et priorités",
      "Chiffrement de bout en bout (E2EE)",
      "Nombre de canaux illimités",
    ],
    image: chatImg,
  },
  {
    title: "Visioconférence HD",
    description:
      "Un lien. Un clic. Tout le monde est là, sans installation, sans attente, en haute définition.",
    items: [
      "Mode présentation, optimisé mobile et desktop",
      "Chat intégré pendant la réunion",
      "Enregistrement des réunions",
      "Audio et vidéo haute qualité",
      "Partage d'écran intégré",
    ],
    image: visioImg,
  },
  {
    title: "Gestion de projets centralisée",
    description:
      "Gantt, Kanban, roadmap, wiki, tout ce dont votre équipe projet a besoin, centralisé dans VTM.",
    items: [
      "Diagramme de Gantt dynamique",
      "Gestion des risques et budgets",
      "Tableaux Kanban agiles",
      "Roadmap stratégique",
      "Time tracking intégré",
    ],
    image: projetImg,
  },
  {
    title: "Intelligence Artificielle",
    description:
      "Transcription automatique, résumé des appels, analyse des tendances, VTM transforme vos données en décisions.",
    items: [
      "Détection des tendances et comportements clients",
      "Analyse des performances équipes et campagnes",
      "Transcription automatique de chaque appel",
      "Résumé intelligent des échanges",
      "Suivi des KPIs",
    ],
    image: iaImg,
  },
  {
    title: "Intégration Cloud & CRM",
    description:
      "Synchronisation fluide, données unifiées en temps réel, VTM s'intègre à votre écosystème sans rupture.",
    items: [
      "Synchronisation fluide avec vos outils existants",
      "Données unifiées et mises à jour en temps réel",
      "Connecteurs intelligents CRM, ERP, métiers",
      "Optimisation des processus métiers",
      "Chiffrement des données",
    ],
    image: cloudCrmImg,
  },
];

const solutions = [
  {
    title: "Communication Unifiée",
    description:
      "Centralisez toutes vos communications en une seule interface. Une vision globale pour une meilleure prise de décision.",
    items: [
      "Appels VoIP, messagerie et interactions centralisés",
      "Webphone professionnel accessible partout",
      "Historique et suivi en temps réel",
      "Outils collaboratifs intégrés",
    ],
    imageFirst: false,
    image: commUnifieeImg,
  },
  {
    title: "Solution Multicanale",
    description:
      "Connectez tous vos canaux dans un seul écosystème. Une expérience client cohérente sur tous les points de contact.",
    items: [
      "Centralisation des conversations clients",
      "VoIP, Chat, Email et CRM unifiés",
      "Routage intelligent et priorisation",
      "Intégration WhatsApp, Telegram",
    ],
    imageFirst: true,
    image: multicanaleImg,
  },
  {
    title: "Centre de Contact Intelligent",
    description:
      "Optimisez votre relation client avec des outils avancés et améliorez la qualité de service et la performance des équipes.",
    items: [
      "Enregistrement et analyse des conversations",
      "Distribution intelligente des appels (ACD)",
      "Transcription automatique et résumé IA",
      "Intégration CRM native",
    ],
    imageFirst: false,
    image: contactCenterImg,
  },
  {
    title: "Data & Pilotage",
    description:
      "Exploitez toute la puissance de vos données. Passez d'une gestion opérationnelle à un pilotage intelligent.",
    items: [
      "Suivi KPIs, taux de réponse, conversion",
      "Analyse des flux de communication",
      "Détection des tendances clients",
      "Aide à la décision stratégique",
    ],
    imageFirst: true,
    image: dataImg,
  },
  {
    title: "Collaboration & Mobilité",
    description:
      "Travaillez efficacement, où que vous soyez. Favorisez le travail hybride sans contrainte.",
    items: [
      "Synchronisation automatique multi-appareils",
      "Accès sécurisé depuis tous les appareils",
      "Collaboration en temps réel",
    ],
    imageFirst: false,
    image: collaboratifImg,
  },
  {
    title: "Infrastructure Cloud",
    description:
      "Une base solide pour vos opérations. Une infrastructure conçue pour accompagner votre croissance.",
    items: [
      "Sauvegardes automatiques et chiffrement",
      "Gestion évolutive selon la croissance",
      "Hébergement haute performance",
      "Déploiement rapide et sécurisé",
    ],
    imageFirst: true,
    image: infraImg,
  },
  {
    title: "Solution Sur-Mesure",
    description:
      "Chaque entreprise est unique. Nous analysons vos besoins spécifiques, concevons une architecture VTM personnalisée et vous accompagnons de bout en bout.",
    items: [
      "Conception personnalisée selon vos contraintes",
      "Déploiement accompagné étape par étape",
      "Audit technique et analyse des besoins",
      "Support dédié et infogérance inclus",
    ],
    imageFirst: false,
    image: surMesureImg,
  },
];

const testimonials = [
  {
    quote:
      "Avec VTM, nous avons remplacé 4 outils différents. Nos équipes communiquent mieux, nos projets avancent plus vite — et nos coûts ont significativement baissé.",
    name: "Sarah Amri",
    role: "Directrice IT · PME Tech, Tunis",
    avatar: avatarSarah,
  },
  {
    quote:
      "La qualité des appels VoIP est excellente même pour nos équipes distribuées entre Paris et Casablanca. L'IA de résumé d'appels nous fait gagner un temps précieux chaque jour.",
    name: "Karim Benali",
    role: "DSI · Groupe Télécom, Paris",
    avatar: avatarKarim,
  },
  {
    quote:
      "Le support Konektus est réactif et comprend nos contraintes métiers africaines. VTM est la première plateforme qui répond vraiment à nos besoins terrain.",
    name: "Leila Mansouri",
    role: "DG · Société de services, Dakar",
    avatar: avatarLeila,
  },
];

// ---------- Wave Lines SVG ----------
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

function WaveLines({ start }) {
  return (
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
            <animateMotion
              dur="4s"
              begin={`${i * 0.35}s`}
              repeatCount="indefinite"
              rotate="auto"
              path={d}
            />
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
}

// ---------- Sections ----------
function Hero() {
  return (
    <section className="w-full flex flex-col items-center gap-8 px-6 pt-16 pb-8 max-w-6xl mx-auto mt-[150px]">
      <div className="flex flex-col gap-6 text-center max-w-3xl">
        {/* Headline: fades in while sliding DOWN into place (was offset -208px up) */}
        <motion.h1
          initial={{ opacity: 0, y: -208 }}
          animate={{ opacity: 1, y: 0 }}
          transition={HERO_SPRING}
          className="font-extrabold text-[32px] md:text-[44px] leading-[1.2] text-[#0b3f34]"
        >
          Simplifiez votre communication et{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0b3f34] to-[#1da588]">
            accélérez votre performance
          </span>
        </motion.h1>

        {/* Paragraph: fades in while sliding UP into place (was offset +256px down) */}
        <motion.p
          initial={{ opacity: 0, y: 256 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...HERO_SPRING, delay: 0.15 }}
          className="text-base text-black leading-[1.9] max-w-2xl mx-auto"
        >
          KoneKtUS VTM réunit communication, collaboration, gestion de projets
          et intelligence artificielle dans un seul écosystème fluide. Sept
          solutions. Une seule plateforme.
        </motion.p>

        {/* Buttons (Frame 2147223461 equivalent): fades in while sliding UP into place */}
        <motion.div
          initial={{ opacity: 0, y: 256 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...HERO_SPRING, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <PrimaryButton>Découvrir VTM</PrimaryButton>
          <SecondaryButton>Découvrir les solutions</SecondaryButton>
        </motion.div>
      </div>

      <motion.div
        className="w-full max-w-[1143px] mx-auto"
        initial={{ opacity: 0, scale: 650 / 1143 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...HERO_SPRING, delay: 0.15 }}
        style={{ transformOrigin: "center" }}
      >
        <img
          src={heroImg}
          alt="KoneKtUS VTM platform illustration"
          className="w-full h-auto"
          style={{ aspectRatio: "1143 / 762" }}
        />
      </motion.div>
    </section>
  );
}

// ---------- Stats with exact same dimensions as About ----------
function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      ref={ref}
      className="relative mt-16 flex w-full min-h-[480px] items-center justify-center overflow-hidden py-24 sm:py-32"
    >
      <img
        src={statsWaveBg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      />
      <img
        src={statsGlow}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5] h-full w-full object-contain object-center opacity-70"
      />
      <WaveLines start={isInView} />

      <div className="relative z-10 mx-auto grid w-full max-w-5xl grid-cols-1 sm:grid-cols-3 gap-10 text-center">
        {stats.map((s) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-2"
          >
            <span className="font-black text-5xl text-[#006b57] tracking-tight">
              {s.value}
            </span>
            <span className="font-bold text-lg text-black">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function SectionIntro() {
  return (
    <section className="w-full max-w-3xl mx-auto px-6 py-12 text-center flex flex-col gap-6">
      <span className="uppercase tracking-wide text-sm font-semibold text-[#006b57]">
        La plateforme VTM
      </span>
      <h2 className="font-bold text-3xl md:text-[40px] leading-tight text-black">
        Tout ce dont votre entreprise a besoin !
      </h2>
      <p className="text-base text-[#3c4a45] leading-relaxed">
        La plateforme qui rassemble tous vos outils essentiels dans un seul
        écosystème fluide et intelligent conçu pour simplifier votre
        communication et maximiser votre efficacité opérationnelle.
      </p>
    </section>
  );
}

function ModuleCards() {
  return (
    <section className="w-full px-6 py-8 flex flex-col gap-8">
      {modules.map((m) => (
        <div
          key={m.title}
          className="rounded-3xl border border-[#006b57] overflow-hidden mx-auto w-full max-w-6xl"
          style={{
            backgroundImage:
              "linear-gradient(113deg, rgb(236,253,250) 17%, rgb(123,204,188) 103%)",
          }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-10 p-8 lg:p-14">
            <div className="flex flex-col gap-4 w-full lg:w-1/2">
              <h3 className="font-bold text-3xl md:text-[36px] tracking-tight text-black">
                {m.title}
              </h3>
              <p className="text-lg text-black leading-[1.6]">
                {m.description}
              </p>
              <FeatureList items={m.items} />
            </div>
            <div className="w-full lg:w-1/2 aspect-[621/426] rounded-3xl overflow-hidden">
              <img
                src={m.image}
                alt={m.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

// ---------- UPDATED SolutionsSection with animated lines ----------
function SolutionsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      className="w-full px-6 py-12 relative z-10"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-16 max-w-6xl mx-auto">
        {/* ---- HEADING with horizontal slide + fade (matching your CSS) ---- */}
        <div className="flex items-center justify-center gap-5 overflow-hidden">
          {/* Left line: slides left from center */}
          <motion.span
            className="h-px w-24 md:w-40 bg-black/20 shrink-0"
            initial={{ x: 0, opacity: 0 }}
            animate={isInView ? { x: -616, opacity: 1 } : {}}
            transition={{ ...HERO_SPRING, delay: 0.1 }}
          />
          {/* Heading text: fades in */}
          <motion.h2
            className="font-black text-2xl md:text-4xl text-center whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ ...HERO_SPRING, delay: 0.1 }}
          >
            NOS SOLUTIONS
          </motion.h2>
          {/* Right line: slides right from center */}
          <motion.span
            className="h-px w-24 md:w-40 bg-black/20 shrink-0"
            initial={{ x: 0, opacity: 0 }}
            animate={isInView ? { x: 584, opacity: 1 } : {}}
            transition={{ ...HERO_SPRING, delay: 0.1 }}
          />
        </div>

        {/* ---- SOLUTION CARDS (unchanged, but now also staggered) ---- */}
        <div className="flex flex-col gap-20">
          {solutions.map((s, index) => (
            <motion.div
              key={s.title}
              className={`flex flex-col ${
                s.imageFirst ? "lg:flex-row-reverse" : "lg:flex-row"
              } items-center gap-10`}
              initial={{ opacity: 0, y: 256 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                type: "spring",
                duration: 1.8,
                bounce: 0.12,
                delay: 0.15 + index * 0.1,
              }}
            >
              <div className="w-full lg:w-1/2 flex flex-col gap-4">
                <h3 className="font-bold text-3xl tracking-tight text-black">
                  {s.title}
                </h3>
                <p className="text-lg text-black leading-[1.6]">
                  {s.description}
                </p>
                <FeatureList items={s.items} />
              </div>
              <div className="w-full lg:w-1/2 aspect-[16/10] rounded-3xl overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function Testimonials() {
  return (
    <section className="w-full px-6 py-16 flex flex-col items-center gap-16 max-w-6xl mx-auto">
      <div className="flex items-center gap-5">
        <span className="h-px w-24 md:w-40 bg-black/20" />
        <h2 className="font-black text-2xl md:text-4xl text-[#0d5143] text-center">
          Approuvé par les leaders
        </h2>
        <span className="h-px w-24 md:w-40 bg-black/20" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-white rounded-3xl p-10 flex flex-col gap-8 shadow-[0_20px_25px_-5px_rgba(226,232,240,0.5),0_8px_10px_-6px_rgba(226,232,240,0.5)]"
          >
            <p className="text-[#475569] text-base leading-relaxed">
              “{t.quote}”
            </p>
            <div className="flex items-center gap-4 border-t border-[#f1f5f9] pt-6">
              <img
                src={t.avatar}
                alt={t.name}
                className="size-12 rounded-full object-cover shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-xs text-[#1eb394]">{t.role}</span>
                <span className="text-sm font-bold text-[#1e293b]">
                  {t.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="w-full px-6 py-12 relative z-10">
      <div className="relative max-w-6xl mx-auto rounded-[48px] bg-[#126B59] overflow-hidden px-8 py-16 flex flex-col items-center gap-9 text-center">
        <div className="absolute -top-40 -right-40 size-96 rounded-full bg-[rgba(119,249,214,0.2)] blur-[60px]" />
        <div className="absolute -bottom-24 -left-24 size-96 rounded-full bg-[rgba(0,62,50,0.2)] blur-[60px]" />
        <div className="relative flex flex-col gap-4 max-w-3xl">
          <h2 className="font-extrabold text-3xl md:text-[44px] leading-tight text-white tracking-tight">
            Prêt à unifier votre communication d'entreprise ?
          </h2>
          <p className="text-lg md:text-xl text-white">
            Nos experts Konektus analysent vos besoins et configurent VTM en
            48h.
          </p>
        </div>
        <div className="relative flex flex-wrap justify-center gap-7">
          <button className="rounded-full bg-white px-8 py-4 text-[#2b6859] font-bold text-lg shadow-[0_8px_10px_rgba(0,0,0,0.25)]">
            Démarrer l'essai gratuit
          </button>
          <button className="rounded-full bg-white px-8 py-4 text-[#2b6859] font-bold text-lg shadow-[0_8px_10px_rgba(0,0,0,0.25)]">
            Télécharger nos guides
          </button>
        </div>
      </div>
    </section>
  );
}

// ---------- Page Component ----------
export default function Solutions() {
  return (
    <div
      className="w-full min-h-screen relative"
      style={{
        backgroundImage: `url(${globalBgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
      <div className="relative z-10 flex flex-col">
        <Hero />
        <Stats />
        <SectionIntro />
        <ModuleCards />
        <SolutionsSection />
        <Testimonials />
        <FinalCta />
      </div>
    </div>
  );
}
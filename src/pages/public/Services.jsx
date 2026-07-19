import { motion } from "framer-motion";

// --- Assets (local imports) ---
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

// --- Regroupement des assets pour faciliter l'import ---
const assets = {
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
};

// --- Données ---
const FEATURES = [
  { id: "performance", icon: assets.iconPerf, title: "Performance", description: "Latence minimale et haute disponibilité" },
  { id: "flexibilite", icon: assets.iconFlex, title: "Flexibilité", description: "Évoluez sans contrainte technique" },
  { id: "integration", icon: assets.iconIntegration, title: "Intégration", description: "Compatible avec +2000 applications" },
];

const SERVICES = [
  {
    id: "tel-voip",
    icon: assets.iconTelVoip,
    image: assets.telVoipImg,
    title: "Téléphonie & VoIP",
    description: "Révolutionnez vos échanges avec une infrastructure voix robuste et flexible. Connectez vos équipes partout dans le monde avec une qualité optimale.",
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
    icon: assets.iconCloud,
    image: assets.cloudImg,
    title: "Cloud & Hébergement",
    description: "Propulsez vos applications sur une infrastructure cloud sécurisée. Une scalabilité sans limite pour accompagner votre croissance.",
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
    icon: assets.iconConseil,
    image: assets.conseilImg,
    title: "Intégration & Conseil",
    description: "L'innovation ne vaut rien sans exécution. Nos experts vous accompagnent de l'audit initial à la maintenance opérationnelle pour garantir l'adoption de vos nouveaux outils.",
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
    icon: assets.iconBigData,
    image: assets.bigDataImg,
    title: "Data & Analyse",
    description: "Transformez vos données brutes en décisions stratégiques. Nous déployons des pipelines de données robustes pour capturer la valeur à chaque interaction.",
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
    icon: assets.iconSupport,
    image: assets.supportImg,
    title: "Support & Infogérance",
    description: "Dormez sur vos deux oreilles. Nos équipes surveillent vos systèmes jour et nuit pour prévenir les incidents avant même qu'ils ne surviennent.",
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

const STATS = [
  { id: "partners", value: "+100", label: "Entreprises partenaires", description: "Nous font confiance au quotidien pour leurs opérations critiques." },
  { id: "uptime", value: "99.9%", label: "Disponibilté garanti", description: "Engagement contractuel pour une continuité sans faille." },
  { id: "support", value: "24/7", label: "Support expert", description: "Une équipe d'ingénieurs dédiée à votre écoute en permanence." },
];

// --- Composants réutilisables ---

const SectionTitle = ({ title }) => (
  <div className="flex items-center gap-5">
    <span className="hidden h-px w-[165px] bg-[#0d5143]/20 md:block" />
    <h2 className="text-center text-[36px] font-black uppercase text-[#0d5143]">{title}</h2>
    <span className="hidden h-px w-[165px] bg-[#0d5143]/20 md:block" />
  </div>
);

const FeatureBadge = ({ icon, title, description }) => (
  <div className="flex items-center gap-4">
    <div className="shrink-0 rounded-lg bg-[rgba(45,212,191,0.1)] p-3">
      <img src={icon} alt="" className="size-8" />
    </div>
    <div className="flex flex-col text-white">
      <p className="font-bold text-base leading-6">{title}</p>
      <p className="text-sm leading-5">{description}</p>
    </div>
  </div>
);

const StatCard = ({ value, label, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center gap-2 text-center"
  >
    <p className="text-[48px] font-black tracking-[-2.4px] text-[#006b57]">{value}</p>
    <p className="pt-2 text-lg font-bold text-[#1a1c1c]">{label}</p>
    <p className="max-w-[330px] text-sm text-[#3c4a45]">{description}</p>
  </motion.div>
);

const ServiceBullet = ({ text }) => (
  <li className="flex items-center gap-3">
    <img src={assets.iconCheck} alt="" className="size-5 shrink-0" />
    <span className="flex-1 text-black text-base leading-6">{text}</span>
  </li>
);

// --- Composant principal de service (avec animation) ---
const ServiceSection = ({ service }) => {
  const { imageSide, icon, title, description, bullets, objective, image } = service;
  const isLeft = imageSide === "left";

  const MotionDiv = ({ children, x, className }) => (
    <motion.div
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );

  const textBlock = (
    <MotionDiv x={isLeft ? 40 : -40} className="flex flex-col items-start gap-4 flex-1">
      <div
        className="flex size-16 items-center justify-center rounded-2xl shadow-[0px_10px_15px_-3px_rgba(0,107,87,0.2),0px_4px_6px_-4px_rgba(0,107,87,0.2)]"
        style={{ backgroundImage: "linear-gradient(135deg, #1eb394 0%, #006b57 100%)" }}
      >
        <img src={icon} alt="" className="size-6" />
      </div>
      <h3 className="text-black text-[36px] font-bold leading-[1.2] tracking-[-0.72px]">{title}</h3>
      <p className="text-black text-lg leading-[1.6]">{description}</p>
      <ul className="flex flex-col gap-4 pt-2 w-full">
        {bullets.map((bullet, i) => (
          <ServiceBullet key={i} text={bullet} />
        ))}
      </ul>
      <p className="pt-4 text-[#006b57] text-base font-bold leading-6">{objective}</p>
    </MotionDiv>
  );

  const imageBlock = (
    <MotionDiv x={isLeft ? -40 : 40} className="flex-1 flex justify-center">
      <img src={image} alt={title} className="w-full max-w-[496px] object-cover" />
    </MotionDiv>
  );

  return (
    <div className={`flex flex-col md:flex-row items-center gap-12 w-full ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
      {imageBlock}
      {textBlock}
    </div>
  );
};

// --- Composant principal ---
export default function Services() {
  return (
    <div
      className="relative w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${assets.servicesBg})` }}
    >
      {/* Hero */}
      <section className="relative mx-auto flex max-w-[1390px] flex-col items-center gap-8 px-6 pt-16 md:flex-row md:gap-14 md:px-24 md:pt-24 mt-[160px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-1 flex-col items-start gap-8"
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-[#0b3f34] text-[44px] font-extrabold leading-[1.5]">
              Transformez votre{" "}
              <span className="bg-gradient-to-b from-[#0b3f34] to-[#1da588] bg-clip-text text-transparent">
                communication en levier de performance
              </span>
            </h1>
            <p className="text-black text-xl leading-[1.75]">
              Optimisez vos flux opérationnels avec une infrastructure de pointe. Performance inégalée, flexibilité totale et intégration native pour propulser votre entreprise vers de nouveaux sommets.
            </p>
          </div>

          <button
            type="button"
            className="flex items-center gap-4 rounded-3xl px-8 py-4 text-base font-medium text-white transition-transform hover:scale-[1.02]"
            style={{ backgroundImage: "linear-gradient(155deg, #1eb394 15%, #006b57 84%)" }}
          >
            Découvrir nos services
            <svg className="size-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 4.5L6 8l3.5-3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="flex-1"
        >
          <img src={assets.heroImg} alt="Illustration KoneKtUS" className="w-full max-w-[612px] object-cover" />
        </motion.div>
      </section>

      {/* Feature badges bar */}
      <section className="relative mx-auto -mt-8 hidden max-w-[1024px] px-6 md:mt-16 md:block md:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 gap-8 rounded-2xl border border-[rgba(45,212,191,0.1)] bg-[rgba(13,81,67,0.8)] p-8 shadow-[0px_8px_32px_0px_rgba(0,0,0,0.37)] backdrop-blur-md md:grid-cols-3"
        >
          {FEATURES.map((feature) => (
            <FeatureBadge key={feature.id} {...feature} />
          ))}
        </motion.div>
      </section>

      {/* Services */}
      <section className="relative mx-auto flex max-w-[1390px] flex-col items-center gap-16 px-6 py-24 md:px-24 md:py-32">
        <SectionTitle title="Nos services" />
        <div className="flex w-full flex-col gap-24 md:gap-32">
          {SERVICES.map((service) => (
            <ServiceSection key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* Trust stats */}
      <section className="relative mx-auto flex max-w-[1245px] flex-col items-center gap-16 px-6 pb-24 md:px-24">
        <SectionTitle title="Ils nous font confiance" />
        <div className="grid w-full grid-cols-1 gap-16 md:grid-cols-3">
          {STATS.map((stat) => (
            <StatCard key={stat.id} {...stat} />
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative mx-auto max-w-[1216px] px-6 pb-24 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col items-center gap-8 overflow-hidden rounded-[48px] bg-[#126b59] px-8 py-16 text-center md:py-24"
        >
          <div className="pointer-events-none absolute -right-48 -top-40 size-96 rounded-full bg-[rgba(119,249,214,0.3)] blur-[50px]" />
          <div className="pointer-events-none absolute -bottom-48 -left-48 size-96 rounded-full bg-[rgba(0,62,50,0.3)] blur-[50px]" />

          <h2 className="max-w-[944px] text-[44px] font-extrabold leading-[1.36] tracking-[-1.5px] text-white">
            Transformez votre communication dès aujourd'hui
          </h2>

          <div className="flex flex-col gap-6 sm:flex-row">
            {["Contactez-Nous", "Démarrer l'essai gratuit"].map((label, idx) => (
              <button
                key={idx}
                type="button"
                className="w-[279px] rounded-full bg-white px-8 py-4 text-lg font-bold text-[#2b6859] drop-shadow-[0px_8px_10px_rgba(0,0,0,0.25)] transition-transform hover:scale-[1.02]"
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
import { motion } from "framer-motion";

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

const heroOrbTransition = {
  duration: 3,
  ease: "linear",
  repeat: Infinity,
  repeatType: "mirror",
};

// ── Services section motion config ──────────────────────────────────────
const cardVariants = { rest: {}, hover: {} };

const illustrationVariants = {
  rest: { height: "100%", transition: { duration: 0.45, ease: "easeOut" } },
  hover: { height: "50%", transition: { duration: 0.45, ease: "easeOut" } },
};

const textVariants = {
  rest: { y: 20, opacity: 0 },
  hover: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, type: "spring", bounce: 0 },
  },
};

// layers: [{ src, hoverY }] — ordered bottom -> top
function ServiceCard({ title, description, bg, layers }) {
  return (
    <motion.div
      className="relative h-[356px] w-[260px] shrink-0 overflow-hidden rounded-[20px] border border-[#1EB394]/20 bg-white/70 shadow-[0_20px_25px_-5px_rgba(30,179,148,0.5)] backdrop-blur-[6px]"
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={cardVariants}
    >
      <motion.div
        className="absolute inset-x-0 top-0 w-full overflow-hidden"
        style={{ backgroundColor: bg }}
        variants={illustrationVariants}
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
          src={layers[0].src}
          alt={title}
          className="absolute inset-0 h-full w-full object-contain"
        />
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-0 z-10 flex h-1/2 flex-col justify-center gap-[14px] bg-white/95 p-[16px] backdrop-blur-sm"
        variants={textVariants}
      >
        <div>
          <h3 className="text-[18px] font-[700] leading-[24px] text-[#0D5143]">
            {title}
          </h3>
          <p className="mt-[6px] text-[13px] leading-[19px] text-[#64748B]">
            {description}
          </p>
        </div>
        <button className="flex items-center gap-[4px] text-[13px] font-[700] text-[#1EB394]">
          Voir plus
          <img
            src="src/assets/icons/arrow-right-sm.svg"
            alt=""
            className="h-[14px] w-[14px]"
          />
        </button>
      </motion.div>
    </motion.div>
  );
}

// ── Konviction card (Kulture / Katalyst / Kality) ────────────────────────
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

function KonvictionCard({ n, icon, iconSize, title, tag, text, check, img }) {
  return (
    <div className="relative flex-1 rounded-[24px] border border-[#1EB394]/35 bg-[#F6F8F8] p-[41px] shadow-[0_25px_50px_-12px_rgba(30,179,149,0.4)]">
      <span className="absolute right-[32px] top-[8px] text-[96px] font-[900] leading-none text-[#0F172A]/5">
        {n}
      </span>
      <div className="mb-[32px] flex h-[64px] w-[64px] items-center justify-center rounded-[20px] bg-[#E9F7F4]">
        <img src={`src/assets/icons/${icon}`} alt="" className={iconSize} />
      </div>
      <div className="flex flex-col gap-[24px]">
        <div>
          <h3 className="text-[24px] font-[800] text-[#0F172A]">{title}</h3>
          <p className="text-[14px] font-[700] uppercase tracking-[1.4px] text-[#1EB394]">
            {tag}
          </p>
        </div>
        <p className="text-[16px] leading-[26px] text-[#475569]">{text}</p>
        <div className="flex items-center gap-[8px] pt-[16px]">
          <img
            src="src/assets/icons/check-icon.svg"
            alt=""
            className="h-[15px] w-[15px]"
          />
          <span className="text-[14px] font-[600] text-[#0F172A]">{check}</span>
        </div>
        <div className="h-[160px] w-full overflow-hidden rounded-[12px] bg-[#F1F5F9]">
          <img
            src={`src/assets/${img}`}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

// ── Value card (Pourquoi choisir KonektUS) ────────────────────────────────
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
    size: "h-[25px] w-[20]",
    label: "Zéro licence propriétaire",
  },
  { icon: "securite.svg", size: "h-[25px] w-[20]", label: "Sécurité" },
  {
    icon: "ecosystem.svg",
    size: "h-[27.5px] w-[21.25px]",
    label: "Écosystème évolutif",
  },
];

function ValueCard({ icon, size, label }) {
  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={{
        rest: { backgroundColor: "#FFFFFF" },
        hover: { backgroundColor: "#6BB3A5" },
      }}
      transition={{ duration: 0.45, ease: [0.52, 0, 0.27, 1] }}
      className="relative flex h-[178px] flex-col items-center justify-center gap-[24px] overflow-hidden rounded-[16px] border border-white/40 p-[24px] text-center shadow-[0_8px_16px_rgba(0,107,87,0.15)] hover:shadow-[0_8px_32px_rgba(0,107,87,0.35)]"
    >
      <motion.div
        variants={{ rest: { opacity: 1 }, hover: { opacity: 0.18 } }}
        transition={{ duration: 0.3, ease: [0.52, 0, 0.27, 1] }}
        className="flex flex-col items-center gap-[24px]"
      >
        <div className="flex h-[64px] w-[64px] items-center justify-center rounded-[16px] bg-[#B8EADA]/40">
          <img src={`src/assets/icons/${icon}`} alt="" className={size} />
        </div>
        <p className="text-[16px] font-[600] text-[#1A1C1C]">{label}</p>
      </motion.div>

      <motion.div
        variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
        transition={{ duration: 0.3, ease: [0.52, 0, 0.27, 1], delay: 0.1 }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center text-[14px] font-[700] text-white"
      >
        Explorer
      </motion.div>
    </motion.div>
  );
}

// ── Testimonial card ───────────────────────────────────────────────────────
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

function TestimonialCard({ quote, avatar, name, role, quoteMark }) {
  return (
    <div className="relative flex flex-1 flex-col gap-[32px] rounded-[24px] bg-white p-[40px] shadow-[0_20px_25px_-5px_rgba(226,232,240,0.5),0_8px_10px_-6px_rgba(226,232,240,0.5)] drop-shadow-[0_4px_10px_#1EB394]">
      {quoteMark && (
        <img
          src="src\assets\quote.png"
          alt=""
          className="absolute -top-[24px] left-[40px] h-[48px] w-[48px]"
        />
      )}
      <p className="text-[16px] leading-[24px] text-[#475569]">{quote}</p>
      <div className="flex items-center gap-[16px] border-t border-[#F1F5F9] pt-[25px]">
        <img
          src={`src/assets/${avatar}`}
          alt={name}
          className="h-[48px] w-[48px] rounded-full object-cover"
        />
        <div>
          <p className="text-[12px] text-[#1EB394]">{role}</p>
          <p className="text-[14px] font-[700] text-[#1E293B]">{name}</p>
        </div>
      </div>
    </div>
  );
}

const services = [
  {
    title: "Téléphonie & VoIP",
    description:
      "Révolutionnez vos échanges avec une infrastructure voix robuste et flexible.",
    bg: "rgba(30,179,148,0.28)",
    layers: [
      { src: "src/assets/tel-voip.png", hoverY: 0 },
      { src: "src/assets/tel-voip-2.png", hoverY: -85 },
    ],
  },
  {
    title: "Cloud & Hébergement",
    description:
      "Propulsez vos applications sur une infrastructure cloud sécurisée.",
    bg: "rgba(30,179,148,0.28)",
    layers: [
      { src: "src/assets/cloud.png", hoverY: 0 },
      { src: "src/assets/cloud-frame-2147223592.png", hoverY: -200 },
    ],
  },
  {
    title: "Intégration & Conseil",
    description:
      "Analyse approfondie de votre infrastructure et roadmap stratégique personnalisée.",
    bg: "rgba(30,179,148,0.28)",
    layers: [{ src: "src/assets/integration.png", hoverY: 0 }],
  },
  {
    title: "Data & Analyse",
    description:
      "Transformez vos données en décisions stratégiques grâce à des pipelines robustes.",
    bg: "rgba(30,179,148,0.28)",
    layers: [{ src: "src/assets/big-data.png", hoverY: 0 }],
  },
  {
    title: "Support & Infogérance",
    description:
      "Surveillance continue de vos systèmes pour prévenir les incidents.",
    bg: "rgba(30,179,148,0.28)",
    layers: [{ src: "src/assets/support.png", hoverY: 0 }],
  },
];

const logos = [
  { src: "src/assets/open_project.png", alt: "OpenProject" },
  { src: "src/assets/sangoma.png", alt: "Sangoma" },
  { src: "src/assets/webmail.png", alt: "Webmail" },
  { src: "src/assets/php.png", alt: "PHP" },
  { src: "src/assets/maria_db.png", alt: "MariaDB" },
  { src: "src/assets/nodejs.png", alt: "Node.js" },
];

function EnSavoirPlusButton({ className = "" }) {
  return (
    <button
      className={`flex items-center gap-[4px] rounded-[12px] bg-[#1EB394] px-[16px] py-[8px] text-[14px] font-[700] text-white transition hover:bg-[#178f76] ${className}`}
    >
      En savoir plus
      <img
        src="src\assets\righticon.png"
        alt=""
        className="h-[11.667px] w-[11.667px]"
      />
    </button>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero + gradient background */}
      <div className="relative flex h-[941px] w-full flex-col items-center overflow-hidden bg-[#0A1A17] pt-[210px] pb-[260px]">
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

        <section className="relative z-10 flex w-full max-w-[1248px] flex-col items-center gap-[56px] px-4">
          <div className="flex flex-col items-center gap-[24px] self-stretch">
            <h1 className="text-[#FFF] text-center text-[44px] font-[900] leading-normal">
              KoneKtUS transforme vos canaux en un flux unique
            </h1>
            <p className="self-stretch text-[#FFF] text-center text-[20px] font-normal leading-[35px]">
              <span className="block">
                Simplifiez vos interactions, libérez vos équipes des complexités
                inutiles
              </span>
              <span className="block">
                et concentrez-vous sur ce qui compte vraiment.
              </span>
            </p>
          </div>

          <form className="flex w-full max-w-[319px] items-center justify-between gap-2 rounded-full bg-white px-5 py-2.5">
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
              className="shrink-0 whitespace-nowrap rounded-3xl bg-[#0D5143] text-sm font-medium leading-[1.4] text-white transition-colors hover:bg-[#0B3F34]"
              style={{ padding: "8px 16px" }}
            >
              Accès gratuit
            </button>
          </form>
        </section>
      </div>

      {/* Dashboard image */}
      <div className="relative z-10 -mt-[380px] w-[1264px] max-w-[92%]">
        <img
          src="src\assets\dashboard.png"
          alt="Aperçu du tableau de bord KoneKtUS"
          className="w-full rounded-2xl shadow-[0_25px_60px_-15px_rgba(30,179,148,0.5)]"
        />
      </div>

      {/* Logo marquee */}
      <div className="mx-auto w-full max-w-[1248px] overflow-hidden py-[54px]">
        <style>{`
          @keyframes marquee-rtl { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .marquee-rtl { animation: marquee-rtl 20s linear infinite; will-change: transform; }
        `}</style>
        <div className="marquee-rtl mx-auto flex w-max items-center justify-center gap-[90px]">
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={`${logo.alt}-${index}`}
              className="flex h-[55px] w-[149px] shrink-0 items-center justify-center opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Background image layers */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <img
            src="src/assets/bg.png"
            alt=""
            className="absolute left-0 top-0 w-full object-cover"
          />
          <img
            src="src/assets/bg.png"
            alt=""
            className="absolute left-0 top-[1900px] w-full -scale-y-100 object-cover"
          />
          <img
            src="src/assets/bg.png"
            alt=""
            className="absolute left-0 top-[3800px] w-full object-cover"
          />
        </div>

        {/* ===================== NOS KONVICTIONS ===================== */}
        <section className="mx-auto w-full max-w-[1248px] px-4 py-[100px]">
          <div className="mb-[64px] flex flex-col gap-[28px]">
            <h2 className="text-[36px] font-[900] leading-[1.5] text-[#0B3F34]">
              Nos Konvictions
            </h2>
            <p className="max-w-[900px] text-[20px] leading-[35px] text-black">
              Kulture, Katalyst, Kality : Nos principes fondamentaux pour
              innover et réussir. Nous ne nous contentons pas de bâtir des
              outils, nous forgeons l'avenir du B2B.
            </p>
          </div>
          <div className="flex flex-col gap-[24px] lg:flex-row">
            {konvictions.map((k) => (
              <KonvictionCard key={k.title} {...k} />
            ))}
          </div>
        </section>

        {/* ===================== POURQUOI CHOISIR KONEKTUS ===================== */}
        <section className="relative mx-auto w-full max-w-[1248px] px-4 py-[80px]">
          <div className="mb-[64px] flex flex-col items-start gap-[28px] text-left">
            <div className="w-full max-w-[770px]">
              <p className="text-[14px] font-[700] uppercase tracking-[1.4px] text-[#1EB394]">
                Nos valeurs
              </p>
              <h2 className="text-[36px] font-[900] leading-[1.5] text-[#0B3F34]">
                Pourquoi choisir KonektUS ?
              </h2>
              <p className="mt-[16px] text-[20px] leading-[32.5px] text-black">
                Les plus grandes entreprises technologiques au monde ont bâti
                leur réussite sur un principe fondamental : le pouvoir du code
                ouvert. Chez KoneKtUS, nous partageons exactement cette
                philosophie.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[24px] sm:grid-cols-3 lg:grid-cols-5">
            {values.map((v) => (
              <ValueCard key={v.label} {...v} />
            ))}
            <div className="flex justify-end sm:col-start-3 lg:col-start-5">
              <EnSavoirPlusButton />
            </div>
          </div>

          {/* ===================== NOTRE VISION ===================== */}
          <section className="mx-auto flex w-full max-w-[1248px] flex-col items-center gap-[48px] px-4 py-[80px] lg:flex-row">
            <div className="flex flex-1 flex-col items-start gap-[16px]">
              <p className="text-[14px] font-[700] uppercase tracking-[1.4px] text-[#1EB394]">
                Notre vision
              </p>
              <h2 className="text-[36px] font-[900] leading-[1.5] text-[#0B3F34]">
                La technologie doit travailler pour vous,{" "}
                <span className="bg-gradient-to-r from-[#0B3F34] to-[#1DA588] bg-clip-text text-transparent">
                  jamais l'inverse.
                </span>
              </h2>
              <p className="max-w-[619px] text-[20px] leading-[1.5] text-black">
                KonektUS est née d'une conviction simple : la technologie doit
                être ouverte, évolutive et au service des entreprises. Nous
                bâtissons aujourd'hui un écosystème ouvert, audité et
                continuellement amélioré, conçu avec et pour une communauté
                mondiale.
              </p>
              <button className="mt-[8px] flex items-center gap-[4px] rounded-full bg-[#1EB394] px-[16px] py-[8px] text-[14px] font-[700] text-white transition hover:bg-[#178f76]">
                En savoir plus
                <img
                  src="src/assets/icons/arrow-right.svg"
                  alt=""
                  className="h-[12px] w-[12px]"
                />
              </button>
            </div>
            <div className="flex-1">
              <img
                src="src/assets/vision-illustration.png"
                alt="Notre vision"
                className="w-full object-cover"
              />
            </div>
          </section>

          {/* Floating feature strip */}
          <div className="mx-auto mt-[64px] grid max-w-[1024px] grid-cols-1 gap-[32px] rounded-[16px] border border-[#2DD4BF]/10 bg-[#0D5143]/80 p-[33px] shadow-[0_8px_32px_rgba(0,0,0,0.37)] backdrop-blur-[6px] sm:grid-cols-3">
            {[
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
            ].map((f) => (
              <div key={f.title} className="flex items-center gap-[16px]">
                <div className="flex shrink-0 items-center justify-center rounded-[8px] bg-[#2DD4BF]/10 p-[12px]">
                  <img
                    src={`src/assets/icons/${f.icon}`}
                    alt=""
                    className="h-[32px] w-[32px]"
                  />
                </div>
                <div className="text-white">
                  <p className="text-[16px] font-[700]">{f.title}</p>
                  <p className="text-[14px] leading-[20px]">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===================== NOS SERVICES ===================== */}
        <section className="mx-auto w-full max-w-[1248px] px-4 py-[100px]">
          <div className="mb-[54px] flex flex-col items-start gap-[16px] text-left">
            <p className="text-[14px] font-[700] uppercase tracking-[1.4px] text-[#1EB394]">
              Expertise
            </p>
            <h2 className="text-[36px] font-[900] leading-[45px] text-[#0B3F34]">
              Nos services
            </h2>
            <p className="max-w-[576px] text-[18px] leading-[24px] text-black">
              Solutions de communication unifiées conçues pour l'excellence
              opérationnelle.
            </p>
          </div>

          <div className="flex gap-[32px] overflow-x-auto pb-[16px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="flex shrink-0 flex-col items-end gap-[24px]"
              >
                <ServiceCard {...service} />
                {index === services.length - 2 && <EnSavoirPlusButton />}
              </div>
            ))}
          </div>
        </section>

        {/* ===================== TESTIMONIALS ===================== */}
        <section className="mx-auto w-full max-w-[1248px] px-4 py-[80px]">
          <h2 className="mb-[64px] text-center text-[36px] font-[800] text-[#0B3F34]">
            Approuvé par les leaders
          </h2>
          <div className="flex flex-col gap-[32px] lg:flex-row">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </section>

        {/* ===================== CTA BANNER ===================== */}
        <section className="mx-auto w-full max-w-[1248px] px-4 py-[60px]">
          <div className="flex flex-col items-center gap-[26px] rounded-[24px] bg-gradient-to-r from-[#17866F] to-[#05201B] px-6 py-[60px] text-center sm:px-[88px]">
            <h2 className="whitespace-nowrap text-[32px] font-[700] leading-[1.3] text-white sm:text-[44px] sm:leading-[60px]">
              Prêt à transformer votre entreprise avec Konektus ?
            </h2>
            <div className="flex flex-col items-center gap-[24px] sm:flex-row">
              <button className="w-[279px] rounded-full bg-white px-[32px] py-[16px] text-[18px] font-[700] text-[#2B6859] shadow-[0_8px_10px_rgba(0,0,0,0.25)] transition hover:bg-gray-100">
                Contactez-Nous
              </button>
              <button className="w-[279px] rounded-full bg-white px-[32px] py-[16px] text-[18px] font-[700] text-[#2B6859] shadow-[0_8px_10px_rgba(0,0,0,0.25)] transition hover:bg-gray-100">
                Démarrer l'essai gratuit
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

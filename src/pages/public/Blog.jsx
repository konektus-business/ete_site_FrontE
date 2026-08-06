// ========== Core Imports ==========
import React from "react";

// ========== Asset Imports ==========
import bg from "../../assets/ressources/bg.png";
import hero from "../../assets/ressources/hero.png";
import post1 from "../../assets/ressources/post1.png";
import post2 from "../../assets/ressources/post2.png";
import post3 from "../../assets/ressources/post3.png";
import post4 from "../../assets/ressources/post4.png";
import post5 from "../../assets/ressources/post5.png";
import post6 from "../../assets/ressources/post6.png";
import post7 from "../../assets/ressources/post7.png";
import post8 from "../../assets/ressources/post8.png";
import post9 from "../../assets/ressources/post9.png";
import post10 from "../../assets/ressources/post10.png";
import post11 from "../../assets/ressources/post11.png";
import post12 from "../../assets/ressources/post12.png";
import post13 from "../../assets/ressources/post13.png";
import post14 from "../../assets/ressources/post14.png";
import post15 from "../../assets/ressources/post15.png";
import post16 from "../../assets/ressources/post16.png";
import post17 from "../../assets/ressources/post17.png";
import post18 from "../../assets/ressources/post18.png";
import post19 from "../../assets/ressources/post19.png";
import post20 from "../../assets/ressources/post20.png";
import post21 from "../../assets/ressources/post21.png";
import chevron from "../../assets/ressources/chevron.svg";

// ========== Content Data ==========

// Consolidated image object for easy access
const IMAGES = { bg, hero, post1, post2, post3, post4, post5, post6, post7, post8, post9, post10, post11, post12, post13, post14, post15, post16, post17, post18, post19, post20, post21, chevron };

// Categories for filtering
const CATEGORIES = ["Tous les articles", "VoIP", "IA", "Big Data"];

// Helper to create post objects
const createPost = (imgKey, tag, date, title) => ({
  image: IMAGES[imgKey],
  tag,
  date,
  title,
});

// Main posts (appear in "Tous les articles" and also included in category filters)
const MAIN_POSTS = [
  createPost("post1", "Voip", "Apr 23, 2025", "Trunk SIP vs VoIP hébergée : quelle solution pour votre entreprise en 2025?"),
  createPost("post2", "IA", "Apr 23, 2025", "L'IA dans les centres d'appels : résumés, analyse des sentiments en action"),
  createPost("post3", "CLOUD", "Apr 23, 2025", "Migrer votre IPBX on-premise vers le cloud : le guide complet"),
  createPost("post4", "BIG DATA", "Apr 23, 2025", "5 KPIs de communication que tout directeur commercial devrait suivre chaque semaine"),
  createPost("post5", "CRM", "Apr 23, 2025", "Intégrer votre CRM à VTM : Salesforce, HubSpot et Zoho — guide pratique étape par étape"),
  createPost("post6", "Agile", "Apr 23, 2025", "Scrum appliqué aux équipes de communication : retour d'expérience après 18 mois avec VTM"),
];

// Extra posts per category (only shown when that category is active)
const EXTRA_POSTS = {
  VoIP: [
    createPost("post7", "Voip", "Apr 23, 2025", "Comment réduire vos coûts télécoms de 40% en passant au VoIP"),
    createPost("post8", "Voip", "Apr 23, 2025", "Les 10 fonctionnalités VoIP indispensables pour un centre de contact moderne"),
    createPost("post9", "Voip", "Apr 23, 2025", "Distribuer les appels intelligemment sans perdre un seul client"),
    createPost("post10", "Voip", "Apr 23, 2025", "Webphone vs téléphone physique : pourquoi les entreprises abandonnent le matériel"),
    createPost("post11", "Voip", "Apr 23, 2025", "Numéros internationaux : comment créer une présence locale dans 20 pays"),
  ],
  IA: [
    createPost("post12", "IA", "Apr 23, 2025", "Transcription automatique des appels : comment ça marche vraiment dans VTM"),
    createPost("post13", "IA", "Apr 23, 2025", "Analyse des sentiments clients : détecter l'insatisfaction avant qu'elle devienne un churn"),
    createPost("post14", "IA", "Apr 23, 2025", "IA et coaching commercial : comment former vos nouveaux vendeurs 2 fois plus vite"),
    createPost("post15", "IA", "Apr 23, 2025", "Les limites de l'IA dans la communication d'entreprise"),
    createPost("post16", "IA", "Apr 23, 2025", "IA embarquée vs IA externe : quelle approche choisir pour votre centre de contact ?"),
  ],
  "Big Data": [
    createPost("post17", "BIG DATA", "Apr 23, 2025", "Reporting centre de contact"),
    createPost("post18", "BIG DATA", "Apr 23, 2025", "Comment construire un dashboard de communication qui aide vraiment à décider"),
    createPost("post19", "BIG DATA", "Apr 23, 2025", "Comportements clients au téléphone"),
    createPost("post20", "BIG DATA", "Apr 23, 2025", "Big Data au Maghreb"),
    createPost("post21", "BIG DATA", "Apr 23, 2025", "Analyse Prédictive & Intelligence Artificielle"),
  ],
};

// ========== Sub‑components ==========

// Hero section – featured article with title, description, and image
const Hero = React.memo(() => (
  <section className="mx-auto flex w-full max-w-[1187px] flex-col items-center gap-12 px-5 sm:gap-16 sm:px-8 lg:gap-[120px] lg:px-0">
    <div className="flex flex-col items-center gap-4 text-center">
      <h1 className="text-[26px] font-extrabold leading-[1.4] text-[#0B3F34] sm:text-[32px] sm:leading-[1.5] lg:text-[44px]" style={{ fontFamily: "Archivo, sans-serif" }}>
        Le futur de la communication{" "}
        <span className="bg-gradient-to-r from-[#0B3F34] to-[#1DA588] bg-clip-text text-transparent">
          d’entreprise commence ici
        </span>
      </h1>
      <p className="max-w-[745px] text-base leading-7 text-black sm:text-lg sm:leading-[35px] lg:text-xl">
        Découvrez les dernières innovations en matière de téléphonie cloud, d'intelligence artificielle et de
        stratégies omnicanales pour propulser votre entreprise.
      </p>
    </div>

    <div className="flex w-full flex-col items-center gap-8 sm:gap-11 lg:flex-row">
      <div className="relative h-[220px] w-full shrink-0 overflow-hidden rounded-[15px] sm:h-[280px] lg:h-[343px] lg:w-[642px]">
        <img src={IMAGES.hero} alt="Article à la une" className="h-full w-full object-cover" />
        <span className="absolute left-4 top-4 rounded-full bg-[#006B57]/90 px-4 py-1.5 text-xs font-bold uppercase tracking-[1.2px] text-white backdrop-blur-[2px] sm:left-5 sm:top-6">
          Tendance
        </span>
      </div>

      <div className="flex w-full flex-col items-start gap-3 lg:w-[502px]">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <span className="rounded bg-[#DDF4EF] px-3 py-0.5 text-sm font-medium leading-6 text-[#126B59] sm:text-base">
            Nouveau Post
          </span>
          <span className="text-sm leading-6 text-[#126B59] sm:text-base">Conseil</span>
        </div>
        <div className="flex flex-col items-start gap-4 sm:gap-5">
          <h2 className="text-xl font-medium leading-[1.3] tracking-[-0.5px] text-[#151515] sm:text-2xl sm:tracking-[-0.72px] lg:text-4xl">
            Comment l’IA transforme le support client en 2025
          </h2>
          <p className="text-base leading-7 text-[#3C4A45] sm:text-lg sm:leading-[1.6]">
            Explorez comment les nouveaux modèles de langage permettent une personnalisation sans précédent et une
            efficacité accrue pour vos centres d'appels.
          </p>
        </div>
        <span className="text-sm leading-6 text-[#808080] sm:text-base">Apr 24, 2026</span>
      </div>
    </div>
  </section>
));

// Post card – displays a single blog post preview
const PostCard = React.memo(({ post }) => (
  <article className="flex w-full max-w-[390px] flex-col items-start gap-5 sm:gap-8">
    <div className="aspect-[3/2] w-full overflow-hidden rounded-[15px]">
      <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
    </div>
    <div className="flex w-full flex-col items-start gap-3 sm:gap-4">
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        <span className="flex items-center gap-2.5 text-sm font-semibold text-[#126B59] sm:text-base">
          {post.tag}
          <span className="h-1.5 w-1.5 rounded-full bg-[#126B59]" />
        </span>
        <span className="whitespace-nowrap text-sm text-[#808080] sm:text-base">{post.date}</span>
      </div>
      <p className="text-lg leading-6 text-[#333333] sm:text-xl">{post.title}</p>
    </div>
  </article>
));

// Blog grid – category filtering and posts listing
const BlogGrid = React.memo(() => {
  const [activeCategory, setActiveCategory] = React.useState(CATEGORIES[0]);

  // Compute filtered posts based on active category
  const filteredPosts = React.useMemo(() => {
    if (activeCategory === "Tous les articles") return MAIN_POSTS;
    const mainMatches = MAIN_POSTS.filter(p => p.tag.toLowerCase() === activeCategory.toLowerCase());
    const extras = EXTRA_POSTS[activeCategory] || [];
    return [...mainMatches, ...extras];
  }, [activeCategory]);

  return (
    <section className="mx-auto mt-20 w-full max-w-[1244px] px-5 sm:mt-28 sm:px-8 lg:mt-40 lg:px-0">
      {/* Category tabs */}
      <div className="flex flex-wrap items-center gap-3 border-b border-[#e5e5e5] pb-1 sm:gap-6">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`relative px-3 py-2.5 text-sm whitespace-nowrap transition-colors sm:px-6 sm:py-3 sm:text-base ${
              activeCategory === category
                ? "font-semibold text-[#126B59]"
                : "font-medium text-[#808080] hover:text-[#126B59]"
            }`}
          >
            {category}
            {activeCategory === category && <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-[#126B59]" />}
          </button>
        ))}
        <a href="#" className="flex items-center gap-2 text-sm font-bold text-[#006B57] sm:gap-3 sm:text-base">
          Voir tout
          <img src={IMAGES.chevron} alt="" className="h-2 w-[17px]" />
        </a>
      </div>

      {/* Posts grid */}
      <div className="mt-10 grid grid-cols-1 gap-x-9 gap-y-10 sm:mt-14 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-3">
        {filteredPosts.map(post => (
          <PostCard key={post.title} post={post} />
        ))}
      </div>

      {/* Load more button */}
      <div className="mt-14 flex justify-center sm:mt-20">
        <button className="rounded-3xl border border-[#1EB394] bg-[#126B59] px-6 py-3 text-sm font-medium text-white sm:text-base">
          Voir plus
        </button>
      </div>
    </section>
  );
});

// Newsletter – call‑to‑action subscription form
const Newsletter = React.memo(() => (
  <section className="mx-auto mt-20 w-full max-w-[1244px] px-5 sm:mt-28 sm:px-8 lg:mt-40 lg:px-0">
    <div className="relative flex flex-col items-center overflow-hidden rounded-[24px] bg-[#006B57] px-6 py-12 text-center sm:rounded-[40px] sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-[#1EB394] opacity-40 blur-[50px]" />
      <div className="pointer-events-none absolute -bottom-48 -left-48 h-96 w-96 rounded-full bg-[#0D5143] opacity-60 blur-[60px]" />

      <div className="relative flex w-full max-w-[672px] flex-col items-center gap-5 sm:gap-6">
        <h2 className="text-2xl font-bold leading-[1.3] tracking-[-0.5px] text-white sm:text-3xl sm:tracking-[-0.72px] lg:text-4xl">
          Recevez les dernières tendances <br /> technologiques.
        </h2>
        <p className="text-base leading-7 text-white/90 sm:text-lg sm:leading-[1.6]">
          Rejoignez 5 000+ décideurs IT et recevez chaque mardi notre curation <br className="hidden sm:block" /> d'experts directement dans votre boîte mail.
        </p>

        <form className="flex w-full max-w-[512px] flex-col items-stretch gap-4 sm:flex-row">
          <input
            type="email"
            placeholder="Votre adresse email"
            className="w-full flex-1 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-base text-white placeholder-white/50 backdrop-blur-[2px] focus:outline-none focus:ring-2 focus:ring-white/40"
          />
          <button
            type="submit"
            className="whitespace-nowrap rounded-2xl bg-white px-8 py-4 text-base font-medium text-[#0B3F34] shadow-[0px_8px_10px_rgba(0,0,0,0.25)]"
          >
            S’inscrire
          </button>
        </form>

        <p className="text-[10px] uppercase tracking-[1px] text-white/50">
          Pas de spam. Désinscription possible à tout moment.
        </p>
      </div>
    </div>
  </section>
));

// ========== Main Component ==========
export default function Blog() {
  return (
    <div className="relative w-full overflow-hidden pt-28 pb-12 sm:pt-40 sm:pb-16 lg:pt-[220px] lg:pb-20">
      {/* Background image */}
      <img src={IMAGES.bg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
      <div className="relative z-10">
        <Hero />
        <BlogGrid />
        <Newsletter />
      </div>
    </div>
  );
}
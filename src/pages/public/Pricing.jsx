// ========== Core Imports ==========
import { useState } from "react";
import { motion } from "framer-motion";

// ========== Asset Imports ==========
import imgBg from "../../assets/pricing/bg.png";
import imgCheck from "../../assets/pricing/check.svg";
import imgChevron from "../../assets/pricing/chevron.svg";
import avatarAhmed from "../../assets/pricing/ahmed-landolsi.png";
import avatarAsma from "../../assets/pricing/asma-tekaya.png";
import avatarFatma from "../../assets/pricing/fatma-ladheri.png";
import avatarAymen from "../../assets/pricing/aymen-naccache.png";
import avatarAmeni from "../../assets/pricing/ameni-gharbi.png";
import avatarNour from "../../assets/pricing/nour-cherif.png";
import iconT from "../../assets/pricing/twitter.svg";
import iconI from "../../assets/pricing/instagram.svg";
import iconF from "../../assets/pricing/facebook.svg";

// ========== Animation Presets ==========
// Spring physics for smooth motion
const figmaSpring = { type: "spring", mass: 1, stiffness: 100, damping: 15 };
// Generic "fall/rise into place" variant used by every Figma-exported entrance animation
// Starts offset by `y` (and optionally scaled down), ends at rest.
const drop = (y, scale) => ({
  hidden: { opacity: 0, y, ...(scale && { scale }) },
  visible: { opacity: 1, y: 0, ...(scale && { scale: 1 }), transition: figmaSpring },
});

// Simple fade-up variants
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
// Stagger children for lists
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

// Pre-defined entrance animations
const heroHeadingIn = drop(-56);
const heroSubtitleIn = drop(-32);
const cardPopularIn = drop(-13, 0.95); // "Professionnel" card: also grows from 0.95 -> 1
const cardSideInLeft = drop(-56); // "Essentiel"
const cardSideInRight = drop(-56); // "Avancé"
const faqHeadingIn = drop(-160);
const testimonialsHeadingIn = drop(336);
const faqListIn = drop(528);
const tableIn = drop(-24);
const TESTIMONIAL_CARD_MOTION = [472, 504, 416, 480, 400, -120].map((y) => drop(y));

// Row entry for comparison table
const rowIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } } };
const rowStagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

// Map pricing tier IDs to their respective animation variants
const CARD_MOTION = { essentiel: cardSideInLeft, professionnel: cardPopularIn, avance: cardSideInRight };

// ========== Content Data ==========
// Pricing tiers
const PRICING_TIERS = [
  { id: "essentiel", name: "Essentiel", tagline: "L'essentiel pour démarrer.", price: "29€", popular: false,
    features: ["Enregistrement des appels", "Accès à la plateforme", "VoIP illimitée", "Chat d'équipe"] },
  { id: "professionnel", name: "Professionnel", tagline: "Performance et intégrations.", price: "59€", popular: true,
    features: ["Visioconférence jusqu'à 50 participants", "Appels internationaux illimités", "Transcription IA des appels", "Réunions HD illimitées", "Support prioritaire"] },
  { id: "avance", name: "Avancé", tagline: "Puissance et IA Enterprise.", price: "99€", popular: false,
    features: ["Intelligence Artificielle avancée", "API Publique & Webhooks", "Sécurité Enterprise SSO", "Intégrations sur mesure", "Chiffrement E2EE"] },
];

// Comparison table rows
const COMPARISON_ROWS = [
  { feature: "Appels VoIP illimités", essentiel: true, professionnel: true, avance: true },
  { feature: "Messagerie collaborative", essentiel: true, professionnel: true, avance: true },
  { feature: "Vidéoconférence HD", essentiel: false, professionnel: true, avance: true },
  { feature: "Intégrations CRM", essentiel: "Basique", professionnel: "Native", avance: "Avancée" },
  { feature: "Intelligence Artificielle", essentiel: false, professionnel: false, avance: true },
  { feature: "Security (SSO & SAML)", essentiel: false, professionnel: false, avance: true },
  { feature: "Support technique", essentiel: "Standard", professionnel: "24/7 Priority", avance: "Dédié" },
];

// FAQ items
const FAQ_ITEMS = [
  { q: "Puis-je changer de forfait à tout moment ?", a: "Oui, vous pouvez changer de forfait à tout moment depuis votre espace client, sans engagement." },
  { q: "Comment fonctionne l'essai gratuit ?", a: "Vous bénéficiez de 14 jours d'accès complet à toutes les fonctionnalités du forfait Business. Aucune carte bancaire n'est requise pour l'inscription." },
  { q: "Offrez-vous des tarifs pour les grandes entreprises ?", a: "Oui, contactez notre équipe commerciale pour obtenir une offre sur mesure adaptée à vos besoins." },
  { q: "Quelles sont les méthodes de paiement acceptées ?", a: "Nous acceptons les cartes bancaires, le prélèvement SEPA et le virement pour les comptes Enterprise." },
];

// Testimonials
const TESTIMONIALS = [
  { name: "Ahmed Landolsi", handle: "@ahmedlando", title: "Produit ultra-utile", text: "Grâce aux tableaux de bord conviviaux, la gestion de notre stratégie digitale est devenue bien plus simple.", img: avatarAhmed, socialIcon: iconT },
  { name: "Asma Tekaya", handle: "@asmatekaya", title: "Produit ultra-utile", text: "Un meilleur SEO et des données précieuses pour une croissance record.", img: avatarAsma, socialIcon: iconI },
  { name: "Fatma Ladheri", handle: "@fatmaladheri", title: "Produit ultra-utile", text: "Nous avons acquis des informations précieuses et amélioré notre référencement SEO, ce qui a entraîné une croissance significative de notre activité.", img: avatarFatma, socialIcon: iconF },
  { name: "Aymen Naccache", handle: "@aymennakkache", title: "Produit ultra-utile", text: "Grâce aux tableaux de bord conviviaux, la gestion de notre stratégie digitale est devenue bien plus simple.", img: avatarAymen, socialIcon: iconI },
  { name: "Ameni Gharbi", handle: "@amenigharbi", title: "Produit ultra-utile", text: "Un meilleur SEO et des données précieuses pour une croissance record.", img: avatarAmeni, socialIcon: iconT },
  { name: "Nour Cherif", handle: "@nourcherif", title: "Produit ultra-utile", text: "Un meilleur SEO et des données précieuses pour une croissance record.", img: avatarNour, socialIcon: iconI },
];

// ========== Sub‑components ==========
// Section heading with decorative lines
const SectionHeading = ({ children }) => (
  <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} className="flex items-center gap-[10px]">
    <div className="h-px w-[165px] bg-gradient-to-r from-transparent to-[#1eb394]/40" />
    <h2 className="text-[30px] font-bold leading-[36px] text-[#0b3f34] text-center whitespace-nowrap">{children}</h2>
    <div className="h-px w-[165px] bg-gradient-to-l from-transparent to-[#1eb394]/40" />
  </motion.div>
);

// FAQ accordion item
const FaqAccordionItem = ({ item, isOpen, onToggle }) => (
  <div className={`w-full overflow-hidden rounded-xl border-2 border-[#0d5143] bg-white shadow-[0px_12px_40px_0px_rgba(18,107,89,0.35)] transition-shadow ${isOpen ? "shadow-[0px_12px_40px_0px_rgba(18,107,89,0.55)]" : ""}`}>
    <button type="button" onClick={onToggle} className="flex w-full items-center justify-between gap-4 p-6 text-left">
      <span className="text-base font-semibold text-[#1a1c1c]">{item.q}</span>
      <img src={imgChevron} alt="" className={`h-[7.4px] w-3 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
    </button>
    <motion.div initial={false} animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
      <p className="px-6 pb-6 text-sm leading-[22.75px] text-[#3c4a45]">{item.a}</p>
    </motion.div>
  </div>
);

// Testimonial card
const TestimonialCard = ({ t, variants }) => (
  <motion.div variants={variants} className="flex w-full max-w-[336px] flex-col justify-between gap-5 rounded-xl bg-white p-6 shadow-[0px_12px_40px_0px_#126b59,0px_0px_0px_4px_white]">
    <div className="flex flex-col gap-4">
      <p className="text-[16px] font-medium tracking-[-0.26px] text-[#060b13]">{t.title}</p>
      <p className="text-sm leading-[23.8px] tracking-[-0.09px] text-[#363d4f]">{t.text}</p>
    </div>
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img src={t.img} alt={t.name} className="size-12 shrink-0 rounded-full object-cover" />
        <div>
          <p className="text-sm tracking-[-0.09px] text-[#060b13]">{t.name}</p>
          <p className="text-xs tracking-[0.01px] text-[#1ba185]">{t.handle}</p>
        </div>
      </div>
      <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#e9ebf1] bg-white">
        <img src={t.socialIcon} alt="" className="size-6" />
      </div>
    </div>
  </motion.div>
);

// ========== Main Component ==========
export default function Pricing() {
  // State for billing cycle and FAQ accordion
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [openFaq, setOpenFaq] = useState(1);
  const isAnnual = billingCycle === "annual";

  return (
    <div className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${imgBg})` }}>
      {/* ===== HERO + PRICING CARDS ===== */}
      <section className="relative mx-auto flex max-w-[1248px] flex-col items-center gap-12 px-6 pt-56 pb-16">
        <div className="relative z-10 flex flex-col items-center gap-6 text-center">
          <motion.h1 variants={heroHeadingIn} initial="hidden" animate="visible" className="text-[36px] font-extrabold leading-[1.15] tracking-[-1.2px] text-[#0b3f34] sm:text-[48px]">
            Des tarifs adaptés à votre{" "}
            <span className="bg-gradient-to-r from-[#0d5143] to-[#1db797] bg-clip-text text-transparent">croissance</span>
          </motion.h1>
          <motion.p variants={heroSubtitleIn} initial="hidden" animate="visible" className="max-w-2xl text-lg leading-[28px] text-[#3c4a45]">
            Propulsez votre communication d'entreprise avec une infrastructure robuste et des outils collaboratifs de pointe.
          </motion.p>
        </div>

        {/* Billing toggle */}
        <div className="relative z-10 flex items-center gap-3">
          <span className="text-lg font-medium text-black">Mensuel</span>
          <button type="button" onClick={() => setBillingCycle(isAnnual ? "monthly" : "annual")} className="flex h-6 w-[47px] items-center rounded-full bg-[#188f76] p-[2px] transition-colors" aria-label="Basculer entre mensuel et annuel">
            <span className={`size-5 rounded-full bg-white shadow transition-transform ${isAnnual ? "translate-x-[23px]" : "translate-x-0"}`} />
          </button>
          <span className="text-lg font-medium text-black">Annuel</span>
        </div>

        {/* Pricing cards with staggered entrance */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="relative z-10 grid w-full max-w-[1280px] grid-cols-1 items-start gap-7 md:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <motion.div key={tier.id} variants={CARD_MOTION[tier.id]} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
              className={`relative flex flex-col gap-2 rounded-[32px] bg-white p-10 ${tier.popular ? "border-2 border-[#1eb394] p-[42px] shadow-[0px_20px_30px_rgba(30,179,148,0.15)]" : "shadow-[-4px_4px_2px_rgba(30,179,148,0.42)]"}`}>
              {tier.popular && <span className="absolute left-1/2 top-[-16px] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#006b57] px-4 py-[6px] text-xs font-semibold uppercase tracking-[1.2px] text-white">Populaire</span>}
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold text-[#1a1c1c]">{tier.name}</h3>
                <p className="text-sm text-[#3c4a45]">{tier.tagline}</p>
              </div>
              <div className="flex items-end gap-1 py-4">
                <span className={`font-semibold text-[#006b57] ${tier.popular ? "text-5xl" : "text-4xl"}`}>
                  {isAnnual ? `${Math.round(parseInt(tier.price) * 10)}€` : tier.price}
                </span>
                <span className="pb-1 text-base text-[#3c4a45]">/{isAnnual ? "an" : "mois"}</span>
              </div>
              <button className={`flex h-[60px] w-full items-center justify-center rounded-2xl text-base font-semibold transition-colors ${tier.popular ? "bg-gradient-to-b from-[#006b57] to-[#1eb394] text-white hover:opacity-90" : "border-2 border-[#006b57] text-[#006b57] hover:bg-[#e9f7f4]"}`}>
                Essayer gratuitement
              </button>
              <ul className="flex flex-col gap-4 pt-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-[#1a1c1c]">
                    <img src={imgCheck} alt="" className="size-[12px] shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ===== COMPARISON TABLE ===== */}
      <section className="mx-auto flex max-w-[1280px] flex-col items-center gap-16 px-6 py-16">
        <SectionHeading>Comparez nos fonctionnalités</SectionHeading>
        <motion.div variants={tableIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="w-full">
          <div className="w-full overflow-x-auto rounded-[40px] bg-white shadow-[0px_20px_50px_0px_#0d5143]">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="shadow-[0px_4px_10px_rgba(0,0,0,0.02)]">
                  <th className="px-10 py-8 text-[16px] font-extrabold tracking-[-0.4px] text-[#006b57]">Fonctionnalités</th>
                  {["Essentiel", "Professionnel", "Avancé"].map((h) => (
                    <th key={h} className="px-10 py-8 text-center text-[16px] font-bold tracking-[-0.4px] text-black">{h}</th>
                  ))}
                </tr>
              </thead>
              <motion.tbody variants={rowStagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                {COMPARISON_ROWS.map((row, i) => (
                  <motion.tr key={row.feature} variants={rowIn} className={`border-t border-[rgba(238,238,238,0.6)] ${i % 2 === 1 ? "bg-[#e9f7f4]" : "bg-white"}`}>
                    <td className="px-10 py-7 text-sm font-semibold text-[rgba(26,28,28,0.8)]">{row.feature}</td>
                    {["essentiel", "professionnel", "avance"].map((key) => {
                      const val = row[key];
                      return (
                        <td key={key} className="px-10 py-7 text-center">
                          {val === true ? <img src={imgCheck} alt="Inclus" className="size-[16px] mx-auto opacity-70" />
                            : val === false ? <span className="mx-auto block h-px w-4 bg-[#d1d5db]" />
                            : <span className="inline-flex items-center justify-center rounded-full bg-[#77f9d6]/30 px-3 py-[3.5px] text-xs font-semibold text-[#006b57]">{val}</span>}
                        </td>
                      );
                    })}
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        </motion.div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="mx-auto flex max-w-[1242px] flex-col items-center gap-12 px-6 py-16">
        <motion.div variants={faqHeadingIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
          <SectionHeading>Questions fréquentes</SectionHeading>
        </motion.div>
        <motion.div variants={faqListIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="flex w-full max-w-3xl flex-col gap-4">
          {FAQ_ITEMS.map((item, i) => (
            <FaqAccordionItem key={item.q} item={item} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
          ))}
        </motion.div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="mx-auto flex max-w-[1246px] flex-col items-center gap-12 px-6 py-16">
        <motion.div variants={testimonialsHeadingIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
          <SectionHeading>Ce que disent nos clients</SectionHeading>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {TESTIMONIALS.map((t, i) => <TestimonialCard key={t.handle} t={t} variants={TESTIMONIAL_CARD_MOTION[i]} />)}
        </motion.div>
      </section>

      {/* ===== FINAL CALL-TO-ACTION ===== */}
      <section className="mx-auto max-w-[1216px] px-6 py-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} className="relative flex flex-col items-center justify-center gap-8 overflow-hidden rounded-[48px] bg-[#126b59] py-24">
          <div className="pointer-events-none absolute -right-48 -top-40 size-96 rounded-full bg-[#77f9d6]/30 blur-[50px]" />
          <div className="pointer-events-none absolute -bottom-48 -left-48 size-96 rounded-full bg-[#003e32]/30 blur-[50px]" />
          <h2 className="max-w-3xl text-center text-[32px] font-extrabold leading-tight text-white sm:text-[44px]">Prêt à transformer votre performance ?</h2>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <button className="w-[279px] rounded-full bg-white px-8 py-4 text-lg font-bold text-[#2b6859] shadow-[0px_8px_10px_rgba(0,0,0,0.25)] transition-transform hover:scale-[1.02]">Contactez-Nous</button>
            <button className="w-[279px] rounded-full bg-white px-8 py-4 text-lg font-bold text-[#2b6859] shadow-[0px_8px_10px_rgba(0,0,0,0.25)] transition-transform hover:scale-[1.02]">Démarrer l'essai gratuit</button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
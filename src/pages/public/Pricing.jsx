// ========== Core Imports ==========
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

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
// Softer spring physics for a more natural, less bouncy feel
const figmaSpring = { type: "spring", mass: 0.9, stiffness: 120, damping: 18 };
const smoothEase = { duration: 0.55, ease: [0.22, 1, 0.36, 1] }; // "expo out" style easing

// Generic "rise into place" variant. Distances are capped so nothing feels
// like it's flying in from off-screen — everything settles within ~1 viewport.
const drop = (y, scale) => ({
  hidden: { opacity: 0, y, ...(scale && { scale }) },
  visible: { opacity: 1, y: 0, ...(scale && { scale: 1 }), transition: figmaSpring },
});

// Simple fade-up variants
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: smoothEase } };
// Stagger children for lists
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

// Pre-defined entrance animations — distances tightened considerably from the
// original (some were 300-500px, which reads as jarring rather than elegant).
const heroHeadingIn = drop(-32);
const heroSubtitleIn = drop(-20);
const cardPopularIn = drop(-16, 0.96); // "Professionnel" card: also grows from 0.96 -> 1
const cardSideInLeft = drop(-40); // "Essentiel"
const cardSideInRight = drop(-40); // "Avancé"
const faqHeadingIn = drop(-28);
const testimonialsHeadingIn = drop(28);
const faqListIn = drop(48);
const tableIn = drop(-24);
const TESTIMONIAL_CARD_MOTION = [40, 56, 32, 48, 36, -24].map((y) => drop(y));

// Row entry for comparison table
const rowIn = { hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } } };
const rowStagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };

// Map pricing tier IDs to their respective animation variants
const CARD_MOTION = { essentiel: cardSideInLeft, professionnel: cardPopularIn, avance: cardSideInRight };

// Price crossfade/slide when the billing cycle toggles
const priceSwap = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeIn" } },
};

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
  <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} className="flex w-full items-center justify-center gap-3 sm:gap-[10px]">
    <div className="hidden h-px flex-1 max-w-[165px] bg-gradient-to-r from-transparent to-[#1eb394]/40 sm:block" />
    <h2 className="px-1 text-center text-2xl font-bold leading-snug text-[#0b3f34] sm:whitespace-nowrap sm:text-[30px] sm:leading-[36px]">{children}</h2>
    <div className="hidden h-px flex-1 max-w-[165px] bg-gradient-to-l from-transparent to-[#1eb394]/40 sm:block" />
  </motion.div>
);

// FAQ accordion item — smoother open/close via AnimatePresence + eased chevron
const FaqAccordionItem = ({ item, isOpen, onToggle }) => (
  <motion.div
    layout
    transition={{ layout: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
    className={`w-full overflow-hidden rounded-xl border-2 border-[#0d5143] bg-white shadow-[0px_12px_40px_0px_rgba(18,107,89,0.35)] transition-shadow duration-300 ${isOpen ? "shadow-[0px_12px_40px_0px_rgba(18,107,89,0.55)]" : ""}`}
  >
    <button type="button" onClick={onToggle} className="flex w-full items-center justify-between gap-4 p-4 text-left sm:p-6">
      <span className="text-sm font-semibold text-[#1a1c1c] sm:text-base">{item.q}</span>
      <motion.img
        src={imgChevron}
        alt=""
        className="h-[7.4px] w-3 shrink-0"
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.2 } }}
          className="overflow-hidden"
        >
          <p className="px-4 pb-4 text-sm leading-[22.75px] text-[#3c4a45] sm:px-6 sm:pb-6">{item.a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

// Testimonial card — lifts and deepens its shadow on hover
const TestimonialCard = ({ t, variants }) => (
  <motion.div
    variants={variants}
    whileHover={{ y: -6, boxShadow: "0px 20px 50px 0px #126b59, 0px 0px 0px 4px white" }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    className="flex w-full max-w-[336px] flex-col justify-between gap-5 rounded-xl bg-white p-6 shadow-[0px_12px_40px_0px_#126b59,0px_0px_0px_4px_white]"
  >
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

  // ---- In‑view detection for the CTA blobs ----
  const ctaRef = useRef(null);
  const isCtaVisible = useInView(ctaRef, { once: false, amount: 0.1 });
  const isMobile = useIsMobile();

  // ---- Responsive blob config ----
  const blobSize = isMobile ? "size-48" : "size-96";
  const blobBlur = isMobile ? "blur-[20px]" : "blur-[50px]";

  return (
    <div className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${imgBg})` }}>
      {/* ===== HERO + PRICING CARDS ===== */}
      <section className="relative mx-auto flex max-w-[1248px] flex-col items-center gap-8 px-5 pt-32 pb-16 sm:gap-12 sm:px-6 sm:pt-44 lg:pt-56">
        <div className="relative z-10 flex flex-col items-center gap-4 text-center sm:gap-6">
          <motion.h1 variants={heroHeadingIn} initial="hidden" animate="visible" className="text-[28px] font-extrabold leading-[1.2] tracking-[-1px] text-[#0b3f34] sm:text-[36px] sm:leading-[1.15] sm:tracking-[-1.2px] lg:text-[48px]">
            Des tarifs adaptés à votre{" "}
            <span className="bg-gradient-to-r from-[#0d5143] to-[#1db797] bg-clip-text text-transparent">croissance</span>
          </motion.h1>
          <motion.p variants={heroSubtitleIn} initial="hidden" animate="visible" className="max-w-2xl text-base leading-6 text-[#3c4a45] sm:text-lg sm:leading-[28px]">
            Propulsez votre communication d'entreprise avec une infrastructure robuste et des outils collaboratifs de pointe.
          </motion.p>
        </div>

        {/* Billing toggle — spring-driven knob instead of a flat CSS transition */}
        <div className="relative z-10 flex items-center gap-3">
          <span className={`text-sm font-medium transition-colors sm:text-lg ${!isAnnual ? "text-black" : "text-black/50"}`}>Mensuel</span>
          <motion.button
            type="button"
            onClick={() => setBillingCycle(isAnnual ? "monthly" : "annual")}
            whileTap={{ scale: 0.92 }}
            className="flex h-6 w-[47px] shrink-0 items-center rounded-full bg-[#188f76] p-[2px]"
            aria-label="Basculer entre mensuel et annuel"
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="size-5 rounded-full bg-white shadow"
              style={{ marginLeft: isAnnual ? 23 : 0 }}
            />
          </motion.button>
          <span className={`text-sm font-medium transition-colors sm:text-lg ${isAnnual ? "text-black" : "text-black/50"}`}>Annuel</span>
        </div>

        {/* Pricing cards with staggered entrance */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="relative z-10 grid w-full max-w-[1280px] grid-cols-1 items-start gap-6 sm:gap-7 md:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <motion.div
              key={tier.id}
              variants={CARD_MOTION[tier.id]}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -8 }}
              transition={{ ...figmaSpring }}
              className={`relative flex flex-col gap-2 rounded-[24px] bg-white p-6 sm:rounded-[32px] sm:p-10 ${tier.popular ? "border-2 border-[#1eb394] p-6 shadow-[0px_20px_30px_rgba(30,179,148,0.15)] sm:p-[42px]" : "shadow-[-4px_4px_2px_rgba(30,179,148,0.42)]"}`}
            >
              {tier.popular && (
                <>
                  {/* Slow, subtle glow pulse behind the popular card so it draws
                      the eye without looping distractingly fast */}
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 rounded-[24px] sm:rounded-[32px]"
                    animate={{ boxShadow: ["0px 20px 30px rgba(30,179,148,0.10)", "0px 24px 40px rgba(30,179,148,0.25)", "0px 20px 30px rgba(30,179,148,0.10)"] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span className="absolute left-1/2 top-[-14px] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#006b57] px-4 py-[6px] text-xs font-semibold uppercase tracking-[1.2px] text-white sm:top-[-16px]">
                    Populaire
                  </span>
                </>
              )}
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-[#1a1c1c] sm:text-2xl">{tier.name}</h3>
                <p className="text-sm text-[#3c4a45]">{tier.tagline}</p>
              </div>
              <div className="flex items-end gap-1 py-4">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isAnnual ? "annual" : "monthly"}
                    variants={priceSwap}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className={`font-semibold text-[#006b57] ${tier.popular ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"}`}
                  >
                    {isAnnual ? `${Math.round(parseInt(tier.price) * 10)}€` : tier.price}
                  </motion.span>
                </AnimatePresence>
                <span className="pb-1 text-sm text-[#3c4a45] sm:text-base">/{isAnnual ? "an" : "mois"}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className={`flex h-[52px] w-full items-center justify-center rounded-2xl text-sm font-semibold sm:h-[60px] sm:text-base ${tier.popular ? "bg-gradient-to-b from-[#006b57] to-[#1eb394] text-white" : "border-2 border-[#006b57] text-[#006b57] hover:bg-[#e9f7f4]"}`}
              >
                Essayer gratuitement
              </motion.button>
              <ul className="flex flex-col gap-3 pt-6 sm:gap-4 sm:pt-8">
                {tier.features.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i, duration: 0.3, ease: "easeOut" }}
                    className="flex items-center gap-3 text-sm text-[#1a1c1c]"
                  >
                    <img src={imgCheck} alt="" className="size-[12px] shrink-0" />
                    <span>{f}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ===== COMPARISON TABLE ===== */}
      <section className="mx-auto flex max-w-[1280px] flex-col items-center gap-10 px-5 py-16 sm:gap-16 sm:px-6">
        <SectionHeading>Comparez nos fonctionnalités</SectionHeading>
        <motion.div variants={tableIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="w-full">
          <div className="w-full overflow-x-auto rounded-[24px] bg-white shadow-[0px_20px_50px_0px_#0d5143] sm:rounded-[40px]">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="shadow-[0px_4px_10px_rgba(0,0,0,0.02)]">
                  <th className="px-6 py-5 text-sm font-extrabold tracking-[-0.4px] text-[#006b57] sm:px-10 sm:py-8 sm:text-[16px]">Fonctionnalités</th>
                  {["Essentiel", "Professionnel", "Avancé"].map((h) => (
                    <th key={h} className="px-6 py-5 text-center text-sm font-bold tracking-[-0.4px] text-black sm:px-10 sm:py-8 sm:text-[16px]">{h}</th>
                  ))}
                </tr>
              </thead>
              <motion.tbody variants={rowStagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                {COMPARISON_ROWS.map((row, i) => (
                  <motion.tr
                    key={row.feature}
                    variants={rowIn}
                    whileHover={{ backgroundColor: "rgba(233,247,244,0.9)" }}
                    transition={{ duration: 0.2 }}
                    className={`border-t border-[rgba(238,238,238,0.6)] ${i % 2 === 1 ? "bg-[#e9f7f4]" : "bg-white"}`}
                  >
                    <td className="px-6 py-5 text-sm font-semibold text-[rgba(26,28,28,0.8)] sm:px-10 sm:py-7">{row.feature}</td>
                    {["essentiel", "professionnel", "avance"].map((key) => {
                      const val = row[key];
                      return (
                        <td key={key} className="px-6 py-5 text-center sm:px-10 sm:py-7">
                          {val === true ? <img src={imgCheck} alt="Inclus" className="size-[16px] mx-auto opacity-70" />
                            : val === false ? <span className="mx-auto block h-px w-4 bg-[#d1d5db]" />
                            : <span className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#77f9d6]/30 px-3 py-[3.5px] text-xs font-semibold text-[#006b57]">{val}</span>}
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
      <section className="mx-auto flex max-w-[1242px] flex-col items-center gap-10 px-5 py-16 sm:gap-12 sm:px-6">
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
      <section className="mx-auto flex max-w-[1246px] flex-col items-center gap-10 px-5 py-16 sm:gap-12 sm:px-6">
        <motion.div variants={testimonialsHeadingIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
          <SectionHeading>Ce que disent nos clients</SectionHeading>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {TESTIMONIALS.map((t, i) => <TestimonialCard key={t.handle} t={t} variants={TESTIMONIAL_CARD_MOTION[i]} />)}
        </motion.div>
      </section>

      {/* ===== FINAL CALL-TO-ACTION ===== */}
      <section ref={ctaRef} className="mx-auto max-w-[1216px] px-5 py-8 sm:px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} className="relative flex flex-col items-center justify-center gap-6 overflow-hidden rounded-[32px] bg-[#126b59] px-6 py-14 sm:gap-8 sm:rounded-[48px] sm:py-24">
          {/* ---- Decorative blobs – only animate when the CTA is visible ---- */}
          <motion.div
            aria-hidden
            className={`pointer-events-none absolute -right-48 -top-40 ${blobSize} rounded-full bg-[#77f9d6]/30 ${blobBlur}`}
            animate={isCtaVisible ? { x: [0, 20, 0], y: [0, -15, 0] } : {}}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className={`pointer-events-none absolute -bottom-48 -left-48 ${blobSize} rounded-full bg-[#003e32]/30 ${blobBlur}`}
            animate={isCtaVisible ? { x: [0, -15, 0], y: [0, 20, 0] } : {}}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <h2 className="max-w-3xl text-center text-2xl font-extrabold leading-tight text-white sm:text-[32px] lg:text-[44px]">Prêt à transformer votre performance ?</h2>
          <div className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-6">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full max-w-[279px] rounded-full bg-white px-8 py-4 text-base font-bold text-[#2b6859] shadow-[0px_8px_10px_rgba(0,0,0,0.25)] sm:w-[279px] sm:text-lg">Contactez-Nous</motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full max-w-[279px] rounded-full bg-white px-8 py-4 text-base font-bold text-[#2b6859] shadow-[0px_8px_10px_rgba(0,0,0,0.25)] sm:w-[279px] sm:text-lg">Démarrer l'essai gratuit</motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
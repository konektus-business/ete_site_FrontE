import { NavLink } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import logo from "../../assets/company_logo.png";

// ----- Footer content data -----
// NOTE: Solutions & Services items currently all point to /services.
// If the Services page ends up with per-feature anchors (e.g. #voip, #cloud),
// switch these to `to: "/services#voip"` etc. instead of a flat string list.
const LINK_SECTIONS = {
  Solutions: [
    { label: "Plateforme VTM", to: "/services" },
    { label: "Communication Unifiée", to: "/services" },
    { label: "Solution Multicanale", to: "/services" },
    { label: "Centre de Contact", to: "/services" },
    { label: "Data & Pilotage", to: "/services" },
    { label: "Collaboration & Mobilité", to: "/services" },
  ],
  Services: [
    { label: "Téléphonie & VoIP", to: "/services" },
    { label: "Cloud & Hébergement", to: "/services" },
    { label: "Intégration & Conseil", to: "/services" },
    { label: "Data & Analyse", to: "/services" },
    { label: "Support & Infogérance", to: "/services" },
  ],
  "Entreprise & contact": [
    { label: "À propos", to: "/about" },
    // TODO: confirm if "Notre équipe" is its own route or a section on About.
    // If it's a section, change to "/about#team" once the section has an id.
    { label: "Notre équipe", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Prix", to: "/pricing" },
  ],
  Ressources: [
    // TODO: Blog page not built yet — leave as "#" until it exists.
    { label: "Blog", to: "ressources/blog" },
    { label: "Webinaires", to: "/ressources/webinar" },
    { label: "Nos Guides", to: "/ressources/guide" },
    // TODO: Support Technique page not built yet.
    { label: "Support Technique", to: "#" },
  ],
};

// TODO: legal pages (Mentions légales, Confidentialité, Cookies) don't exist yet.
// Confirm with Hassene whether they're in scope for this internship's deliverable.
const LEGAL_LINKS = ["Mentions légales", "Confidentialité", "Cookies"];

// Offsets per section (from Figma) – each child slides up from this distance
const OFFSETS = { brand: 208, col1: 104, col2: 176, col3: 32, col4: 32, newsletter: 400, bottom: 32 };

// ----- Animation presets -----
const SPRING = { type: "spring", mass: 1, stiffness: 100, damping: 15 };
const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
const item = (offset) => ({ hidden: { opacity: 0, y: offset }, visible: { opacity: 1, y: 0, transition: SPRING } });

// Scrolls the window to the top. Called on click for every footer link,
// since route changes don't reset scroll position by default in React Router.
const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });

// ----- Reusable icon component (share, globe) -----
// TODO: wire real URLs once social/company links are confirmed.
const Icon = ({ children, label, href = "#" }) => (
  <NavLink to={href} onClick={scrollToTop} aria-label={label} className="text-[#cbd5e1] hover:text-[#1EB394] transition-colors">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      {children}
    </svg>
  </NavLink>
);

// ----- Main Footer -----
export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={container}
      className="bg-[#0B3F34] px-6 md:px-12 pt-12 md:pt-16 pb-6 overflow-hidden"
    >
      <div className="max-w-[1376px] mx-auto">
        {/* Top grid: brand + link columns + newsletter */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Brand */}
          <motion.div variants={item(OFFSETS.brand)} className="w-full lg:w-[284px] shrink-0">
            <img src={logo} alt="KoneKtUS" className="h-[60px] w-auto" />
            <p className="mt-6 text-[14px] leading-[22.75px] text-[#cbd5e1]">
              La plateforme de communication intelligente pour les entreprises modernes. Connectez vos équipes partout dans le monde.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Icon label="Partager">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </Icon>
              <Icon label="Site web">
                <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </Icon>
            </div>
          </motion.div>

          {/* Link columns (4 sections) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 flex-1">
            {Object.entries(LINK_SECTIONS).map(([heading, items], idx) => {
              const offset = [OFFSETS.col1, OFFSETS.col2, OFFSETS.col3, OFFSETS.col4][idx];
              return (
                <motion.div key={heading} variants={item(offset)}>
                  <h4 className="text-[12px] font-bold uppercase tracking-[1.2px] text-white mb-6">{heading}</h4>
                  <ul className="flex flex-col gap-4">
                    {items.map(({ label, to }) => (
                      <li key={label}>
                        <NavLink to={to} onClick={scrollToTop} className="text-[14px] leading-[20px] text-[#cbd5e1] hover:text-[#1EB394] transition-colors">
                          {label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Newsletter */}
          <motion.div variants={item(OFFSETS.newsletter)} className="w-full lg:w-[284px] shrink-0">
            <h4 className="text-[12px] font-bold uppercase tracking-[1.2px] text-white mb-6">Newsletter</h4>
            <p className="text-[14px] leading-[20px] text-[#cbd5e1] mb-6">Recevez nos dernières actualités et conseils.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="votre@email.com" className="h-[43px] w-full rounded-lg bg-[#E9F7F4] px-3 text-[14px] text-[#6b7280] placeholder:text-[#6b7280] outline-none focus:ring-2 focus:ring-[#1EB394]" />
              <button type="submit" className="h-[44px] w-full rounded-lg bg-[#1EB394] text-[14px] font-bold text-white hover:bg-[#0D5143] transition-colors">
                S'abonner
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div variants={item(OFFSETS.bottom)} className="mt-10 pt-6 border-t border-[#1e293b] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] leading-[16px] text-[#cbd5e1]">© 2026 Konektus. Tous droits réservés.</p>
          <div className="flex items-center gap-8">
            {LEGAL_LINKS.map((link) => (
              <NavLink key={link} to="#" onClick={scrollToTop} className="text-[12px] leading-[16px] text-[#cbd5e1] hover:text-[#1EB394] transition-colors">
                {link}
              </NavLink>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
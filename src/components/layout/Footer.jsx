import { NavLink } from "react-router-dom";
import logo from "../../assets/company_logo.png"; // adapte le chemin selon ton dossier assets

const footerLinks = {
  Solutions: [
    "Plateforme VTM",
    "Communication Unifiée",
    "Solution Multicanale",
    "Centre de Contact",
    "Data & Pilotage",
    "Collaboration & Mobilité",
  ],
  Services: [
    "Téléphonie & VoIP",
    "Cloud & Hébergement",
    "Intégration & Conseil",
    "Data & Analyse",
    "Support & Infogérance",
  ],
  "Entreprise & contact": ["À propos", "Notre équipe", "Contact", "Prix"],
  Ressources: ["Blog", "Webinaires", "Nos Guides", "Support Technique"],
};

const legalLinks = ["Mentions légales", "Confidentialité", "Cookies"];

export default function Footer() {
  return (
    <footer className="bg-[#0B3F34] px-6 md:px-12 pt-12 md:pt-16 pb-6">
      <div className="max-w-[1376px] mx-auto">
        {/* Top area: brand + link columns + newsletter */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Brand */}
          <div className="w-full lg:w-[284px] shrink-0">
            <img src={logo} alt="KoneKtUS" className="h-[60px] w-auto" />
            <p className="mt-6 text-[14px] leading-[22.75px] text-[#cbd5e1]">
              La plateforme de communication intelligente pour les
              entreprises modernes. Connectez vos équipes partout dans le
              monde.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <NavLink
                to="#"
                aria-label="Partager"
                className="text-[#cbd5e1] hover:text-[#1EB394] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </NavLink>
              <NavLink
                to="#"
                aria-label="Site web"
                className="text-[#cbd5e1] hover:text-[#1EB394] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </NavLink>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 flex-1">
            {Object.entries(footerLinks).map(([heading, items]) => (
              <div key={heading}>
                <h4 className="text-[12px] font-bold uppercase tracking-[1.2px] text-white mb-6">
                  {heading}
                </h4>
                <ul className="flex flex-col gap-4">
                  {items.map((item) => (
                    <li key={item}>
                      <NavLink
                        to="#"
                        className="text-[14px] leading-[20px] text-[#cbd5e1] hover:text-[#1EB394] transition-colors"
                      >
                        {item}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="w-full lg:w-[284px] shrink-0">
            <h4 className="text-[12px] font-bold uppercase tracking-[1.2px] text-white mb-6">
              Newsletter
            </h4>
            <p className="text-[14px] leading-[20px] text-[#cbd5e1] mb-6">
              Recevez nos dernières actualités et conseils.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="votre@email.com"
                className="h-[43px] w-full rounded-lg bg-[#E9F7F4] px-3 text-[14px] text-[#6b7280] placeholder:text-[#6b7280] outline-none focus:ring-2 focus:ring-[#1EB394]"
              />
              <button
                type="submit"
                className="h-[44px] w-full rounded-lg bg-[#1EB394] text-[14px] font-bold text-white hover:bg-[#0D5143] transition-colors"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[#1e293b] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] leading-[16px] text-[#cbd5e1]">
            © 2026 Konektus. Tous droits réservés.
          </p>
          <div className="flex items-center gap-8">
            {legalLinks.map((link) => (
              <NavLink
                key={link}
                to="#"
                className="text-[12px] leading-[16px] text-[#cbd5e1] hover:text-[#1EB394] transition-colors"
              >
                {link}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
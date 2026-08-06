import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/company_logo.png";

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => { if (ref.current && !ref.current.contains(e.target)) handler(); };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

const Chevron = ({ open }) => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`ml-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HamburgerIcon = ({ open }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    {open ? (
      <>
        <line x1="6" y1="6" x2="18" y2="18" />
        <line x1="18" y1="6" x2="6" y2="18" />
      </>
    ) : (
      <>
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </>
    )}
  </svg>
);

function Dropdown({ trigger, triggerClassName, items, renderItem, menuClassName = "" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(false));
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className={triggerClassName}>
        {typeof trigger === "function" ? trigger(open) : trigger}
      </button>
      {open && (
        <ul className={`absolute mt-2 rounded-xl border border-white/10 bg-[#0d5143] backdrop-blur-md shadow-[0px_10px_30px_0px_rgba(0,0,0,0.5)] py-1 z-10 ${menuClassName}`}>
          {items.map((item, idx) => (
            <li key={idx}>{renderItem(item, () => setOpen(false))}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function LanguageDropdown() {
  const langs = [
    { code: "FR", label: "Français" },
    { code: "EN", label: "English" },
  ];
  const [selected, setSelected] = useState(langs[0]);
  return (
    <Dropdown
      trigger={(open) => (
        <>
          <span className="font-medium text-sm leading-5 whitespace-nowrap">{selected.code}</span>
          <Chevron open={open} />
        </>
      )}
      triggerClassName="flex items-center justify-center gap-2 p-2 text-white"
      items={langs}
      renderItem={(lang, close) => (
        <button
          onClick={() => { setSelected(lang); close(); }}
          className={`w-full text-left px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
            selected.code === lang.code ? "text-[#1eb394]" : "text-white hover:text-[#1eb394]"
          }`}
        >
          {lang.label}
        </button>
      )}
      menuClassName="right-0 w-32"
    />
  );
}

// Shared source of truth so both the desktop dropdown and the mobile menu
// render the same Ressources links without duplicating the list.
const RESSOURCES_ITEMS = [
  { label: "Blog", to: "ressources/blog" },
  { label: "Webinaires", to: "/ressources/webinar" },
  { label: "Nos Guides", to: "ressources/guide" },
  { label: "Support Technique", to: "/support" },
];

function RessourcesDropdown() {
  return (
    <Dropdown
      trigger={(open) => (
        <>
          <span>Ressources</span>
          <Chevron open={open} />
        </>
      )}
      triggerClassName="flex items-center gap-1 font-medium text-sm leading-5 whitespace-nowrap text-white transition-colors hover:text-[#1eb394]"
      items={RESSOURCES_ITEMS}
      renderItem={(item, close) => (
        <NavLink
          to={item.to}
          onClick={close}
          className={({ isActive }) =>
            `block px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              isActive ? "text-[#1eb394]" : "text-white hover:text-[#1eb394]"
            }`
          }
        >
          {item.label}
        </NavLink>
      )}
      menuClassName="left-0 w-48"
    />
  );
}

export function PublicHeader() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NAV_LINKS = [
    { label: "Solutions", href: "/solutions" },
    { label: "Services", href: "/services" },
    { label: "Entreprise", href: "/about" },
    { label: "Prix", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];
  const specialPaths = new Set(["/services", "/about", "/pricing", "/ressources/blog", "/ressources/webinar", "/ressources/guide", "/solutions"]);
  const headerBg = specialPaths.has(location.pathname) ? "bg-[#0d5143]/80" : "bg-[#0d5143]/40";

  // Close the mobile menu on route change so it doesn't stay open after navigating.
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="w-full max-w-[1248px] px-4 py-2 mt-4 sm:mt-8 lg:mt-[52px] lg:px-0">
      <div
        className={`w-full rounded-[24px] lg:rounded-full border border-white/5 backdrop-blur-md shadow-[0px_10px_30px_0px_rgba(0,0,0,0.5)] transition-colors duration-300 ${headerBg}`}
      >
        {/* Top bar: logo, desktop nav, actions, mobile toggle */}
        <div className="flex items-center justify-between gap-4 h-[64px] lg:h-[78px] pl-[15px] pr-3 lg:gap-[90px] lg:pr-[40px]">
          <NavLink to="/" end className="shrink-0 p-2" aria-label="KoneKtUS home">
            <img src={logo} alt="KoneKtUS logo" className="h-8 w-auto lg:h-10" />
          </NavLink>

          <nav className="hidden lg:flex flex-1 items-center gap-7">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                className="font-medium text-sm leading-5 whitespace-nowrap text-white transition-colors hover:text-[#1eb394]"
              >
                {link.label}
              </NavLink>
            ))}
            <RessourcesDropdown />
          </nav>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <div className="hidden lg:flex items-center gap-[14px]">
              <NavLink
                to="/login"
                className="flex items-center justify-center gap-2 rounded-full border border-[#1eb394] bg-[#126b59] hover:bg-[#0d5143] px-4 py-2 font-medium text-sm leading-[1.4] text-white whitespace-nowrap transition-colors"
              >
                Connexion
              </NavLink>
              <NavLink
                to="/essai-gratuit"
                className="flex items-center justify-center gap-2 rounded-full bg-[#1eb394] hover:bg-[#189c82] px-4 py-2 font-medium text-sm leading-[1.4] text-white whitespace-nowrap transition-colors"
              >
                Essai gratuit
              </NavLink>
            </div>

            <div className="hidden sm:block lg:hidden">
              <LanguageDropdown />
            </div>
            <div className="hidden lg:block">
              <LanguageDropdown />
            </div>

            {/* Mobile / tablet menu toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileOpen}
              className="flex items-center justify-center rounded-full p-2 text-white transition-colors hover:text-[#1eb394] lg:hidden"
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>
        </div>

        {/* Mobile / tablet dropdown panel */}
        {mobileOpen && (
          <div className="flex flex-col gap-1 border-t border-white/10 px-4 pb-5 pt-3 lg:hidden">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-2 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? "text-[#1eb394]" : "text-white hover:text-[#1eb394]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <p className="mt-2 px-2 text-xs font-bold uppercase tracking-[1.2px] text-white/50">Ressources</p>
            {RESSOURCES_ITEMS.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-2 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? "text-[#1eb394]" : "text-white hover:text-[#1eb394]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="mt-3 flex flex-col gap-2 sm:hidden">
              <NavLink
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full border border-[#1eb394] bg-[#126b59] hover:bg-[#0d5143] px-4 py-2.5 font-medium text-sm text-white transition-colors"
              >
                Connexion
              </NavLink>
              <NavLink
                to="/essai-gratuit"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-[#1eb394] hover:bg-[#189c82] px-4 py-2.5 font-medium text-sm text-white transition-colors"
              >
                Essai gratuit
              </NavLink>
            </div>

            <div className="mt-3 hidden items-center gap-4 border-t border-white/10 pt-3 sm:flex lg:hidden">
              <NavLink
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#1eb394] bg-[#126b59] hover:bg-[#0d5143] px-4 py-2.5 font-medium text-sm text-white transition-colors"
              >
                Connexion
              </NavLink>
              <NavLink
                to="/essai-gratuit"
                onClick={() => setMobileOpen(false)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1eb394] hover:bg-[#189c82] px-4 py-2.5 font-medium text-sm text-white transition-colors"
              >
                Essai gratuit
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
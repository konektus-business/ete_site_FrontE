import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/company_logo.png"; // <-- IMPORT the image

// ----- Custom hook for outside clicks -----
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (ref.current && !ref.current.contains(e.target)) handler();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

// ----- Language dropdown -----
function LanguageDropdown() {
  const LANGUAGES = [
    { code: "FR", label: "Français" },
    { code: "EN", label: "English" },
  ];
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(LANGUAGES[0]);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center justify-center gap-2 p-2 text-white"
      >
        <span className="font-medium text-sm leading-5 whitespace-nowrap">{selected.code}</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-32 rounded-xl border border-white/10 bg-[#0d5143] backdrop-blur-md shadow-[0px_10px_30px_0px_rgba(0,0,0,0.5)] py-1 z-10"
        >
          {LANGUAGES.map((lang) => (
            <li key={lang.code}>
              <button
                type="button"
                role="option"
                aria-selected={selected.code === lang.code}
                onClick={() => {
                  setSelected(lang);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  selected.code === lang.code
                    ? "text-[#1eb394]"
                    : "text-white hover:text-[#1eb394]"
                }`}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ----- Ressources dropdown -----
function RessourcesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(false));
  const items = [
    { label: "Blog", to: "ressources/blog" },
    { label: "Webinaires", to: "/webinaires" },
    { label: "Nos Guides", to: "/guides" },
    { label: "Support Technique", to: "/support" },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-1 font-medium text-sm leading-5 whitespace-nowrap text-white transition-colors hover:text-[#1eb394]"
      >
        Ressources
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className={`ml-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <ul className="absolute left-0 mt-2 w-48 rounded-xl border border-white/10 bg-[#0d5143] backdrop-blur-md shadow-[0px_10px_30px_0px_rgba(0,0,0,0.5)] py-1 z-10">
          {items.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive ? "text-[#1eb394]" : "text-white hover:text-[#1eb394]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ----- Public header -----
export function PublicHeader() {
  const location = useLocation();
  const NAV_LINKS = [
    { label: "Solutions", href: "#solutions" },
    { label: "Services", href: "/services" },
    { label: "Cas d’usage", href: "#cas-dusage" },
    { label: "Entreprise", href: "/about" },
    { label: "Prix", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];
  const isSpecialPage =
    location.pathname === "/services" ||
    location.pathname === "/about" ||
    location.pathname === "/pricing" ||
    location.pathname === "/ressources/blog";
  const headerBg = isSpecialPage ? "bg-[#0d5143]/80" : "bg-[#0d5143]/40";

  return (
    <header className="flex w-[1248px] items-start gap-[10px] py-2 mt-[52px]">
      <div
        className={`flex flex-[1_0_0] items-center justify-end gap-[90px] rounded-full border border-white/5 backdrop-blur-md shadow-[0px_10px_30px_0px_rgba(0,0,0,0.5)] h-[78px] pl-[15px] pr-[40px] py-0 transition-colors duration-300 ${headerBg}`}
      >
        <NavLink to="/" end className="shrink-0 p-2" aria-label="KoneKtUS home">
          <img src={logo} alt="KoneKtUS logo" className="h-10 w-auto" />
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
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:flex items-center gap-[14px]">
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
          <LanguageDropdown />
        </div>
      </div>
    </header>
  );
}
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

function RessourcesDropdown() {
  const items = [
    { label: "Blog", to: "ressources/blog" },
    { label: "Webinaires", to: "/ressources/webinar" },
    { label: "Nos Guides", to: "ressources/guide" },
    { label: "Support Technique", to: "/support" },
  ];
  return (
    <Dropdown
      trigger={(open) => (
        <>
          <span>Ressources</span>
          <Chevron open={open} />
        </>
      )}
      triggerClassName="flex items-center gap-1 font-medium text-sm leading-5 whitespace-nowrap text-white transition-colors hover:text-[#1eb394]"
      items={items}
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
  const NAV_LINKS = [
    { label: "Solutions", href: "#solutions" },
    { label: "Services", href: "/services" },
    { label: "Cas d’usage", href: "#cas-dusage" },
    { label: "Entreprise", href: "/about" },
    { label: "Prix", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];
  const specialPaths = new Set(["/services", "/about", "/pricing", "/ressources/blog", "/ressources/webinar", "/ressources/guide"]);
  const headerBg = specialPaths.has(location.pathname) ? "bg-[#0d5143]/80" : "bg-[#0d5143]/40";

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
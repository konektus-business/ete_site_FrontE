// ========== Core Imports ==========
import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

import WebinarSkeleton from "../../components/skeleton/Webinarskeleton.jsx";

// ========== Asset Imports ==========
// Background and hero
import bg from "../../assets/webinar/bg-gradient.png";
import heroImage from "../../assets/webinar/webinar-hero.png";

// Icons
import iconClock from "../../assets/webinar/clock.svg";
import iconCalendarModal from "../../assets/webinar/calendar-modal.svg";
import iconCalendarCard from "../../assets/webinar/calendar-card.svg";
import iconGlobe from "../../assets/webinar/globe.svg";
import iconPlay from "../../assets/webinar/play.png";
import iconSlides from "../../assets/webinar/slides.svg";
import iconGuide from "../../assets/webinar/guide.svg";
import iconChevronRight from "../../assets/webinar/chevron-right.svg";
import iconEvents from "../../assets/webinar/events.svg";
import iconLearning from "../../assets/webinar/learning.svg";
import iconCommunity from "../../assets/webinar/community.svg";
import iconNetwork from "../../assets/webinar/network.svg";
import iconChevronDown from "../../assets/webinar/chevron-down.svg";
import iconChevronDownGreen from "../../assets/webinar/chevron-down-green.svg";

// Avatars (old and new)
import avatar3 from "../../assets/webinar/avatar-3.png";
import avatar4 from "../../assets/webinar/avatar-4.png";
import newAvatar1 from "../../assets/webinar/new-avatar-1.png";
import newAvatar2 from "../../assets/webinar/new-avatar-2.png";

// Thumbnails for replays and webinars
import replayThumb1 from "../../assets/webinar/replay-1.png";
import replayThumb2 from "../../assets/webinar/replay-2.png";
import replayThumb3 from "../../assets/webinar/replay-3.png";
import replayThumb4 from "../../assets/webinar/replay-4.png";
import webinarThumb1 from "../../assets/webinar/webinar-thumb-1.png";
import webinarThumb2 from "../../assets/webinar/webinar-thumb-2.png";

// Custom icons for registration modal
import customVideoIcon from "../../assets/webinar/video.svg";
import customCasesIcon from "../../assets/webinar/cases.svg";
import customQAIcon from "../../assets/webinar/qa.svg";
import customCheckIcon from "../../assets/webinar/check.svg";
import customCloseIcon from "../../assets/webinar/close.svg";

// ========== Animation Presets ==========
// Spring curve – custom easing array for smooth, natural motion
const SPRING_CURVE = [
  0, 0.0188, 0.0679, 0.1374, 0.2195, 0.308, 0.3978, 0.4856, 0.5686, 0.6452,
  0.7142, 0.7753, 0.8283, 0.8735, 0.9113, 0.9423, 0.9671, 0.9866, 1.0014,
  1.0123, 1.0198, 1.0247, 1.0274, 1.0283, 1.0281, 1.0268, 1.025, 1.0227, 1.0202,
  1.0177, 1.0152, 1.0128, 1.0106, 1.0085, 1.0068, 1.0052, 1.0039, 1.0028,
  1.0018, 1.0011, 1.0005, 1, 0.9997, 0.9995, 0.9993, 0.9992, 0.9992, 0.9992,
  0.9992, 0.9993, 0.9993,
];
const SPRING_TIMES = SPRING_CURVE.map((_, i) => i / (SPRING_CURVE.length - 1));
const SPRING_DURATION = 2.044188;

// Offsets for the four feature cards (alternating left/right)
const FEATURE_OFFSETS = [424, -432, 424, -432];

// ========== Reusable Wrapper: SpringReveal ==========
// Scroll-triggered reveal with custom spring curve (translates from offsetX)
// Note: the large pixel offsets below can only cause horizontal scroll
// *during* the entrance animation, and the page root already has
// `overflow-hidden`, so they clip safely on mobile without extra changes.
const SpringReveal = ({ offsetX, children, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, x: -offsetX }}
        animate={
          inView
            ? {
                opacity: SPRING_CURVE,
                x: SPRING_CURVE.map((v) => -offsetX * (1 - v)),
              }
            : undefined
        }
        transition={{
          duration: SPRING_DURATION,
          times: SPRING_TIMES,
          ease: "linear",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// ========== Sub‑components ==========

// ----- Avatars component (stacked circular images) -----
const Avatars = ({ images, extra }) => (
  <div className="flex items-start">
    {images.map((src, i) => (
      <div
        key={i}
        className="relative size-10 shrink-0 rounded-full border-2 border-white -mr-3 overflow-hidden"
      >
        <img src={src} alt="" className="size-full object-cover" />
      </div>
    ))}
    {extra && (
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#f3f4f6]">
        <span className="text-[10px] font-bold text-[#6b7280]">{extra}</span>
      </div>
    )}
  </div>
);

// ----- ChipRow: renders a list of tags with "+" separators -----
const ChipRow = ({ items }) => (
  <div className="flex flex-wrap items-center gap-2 pt-2">
    {items.map((label, i) => (
      <React.Fragment key={label}>
        {i > 0 && <span className="text-xs font-bold text-[#1eb394]">+</span>}
        <span className="rounded-md bg-[#f4fbf9] p-1 text-xs font-bold text-[#1eb394]">
          {label}
        </span>
      </React.Fragment>
    ))}
  </div>
);

// ----- PrimaryButton (reusable CTA) -----
const PrimaryButton = ({ children, className = "", ...rest }) => (
  <button
    type="button"
    className={`flex items-center justify-center gap-3 rounded-2xl border border-[#1eb394] bg-[#126b59] px-6 py-3 text-base font-bold text-white transition-colors hover:bg-[#0d5143] ${className}`}
    {...rest}
  >
    {children}
    <img src={iconChevronRight} alt="" className="size-3" />
  </button>
);

// ----- WebinarThumbnail: card thumbnail with index and play button -----
// Fixed 297x223 → fluid width (full width until the card switches to a row
// layout at `lg`, where it locks back to the original 297px column).
const WebinarThumbnail = ({ index, title, thumbnail }) => (
  <div className="relative h-[180px] w-full shrink-0 overflow-hidden rounded-2xl bg-[#0d5143] sm:h-[223px] lg:h-[223px] lg:w-[297px]">
    <img
      src={thumbnail}
      alt={title}
      className="absolute inset-0 h-full w-full object-cover opacity-40"
    />
    <div className="absolute inset-0 bg-black/10" />
    <div className="absolute left-4 top-4 flex size-8 items-center justify-center rounded-full bg-white backdrop-blur-[4px]">
      <span className="text-base font-bold text-black">{index}</span>
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <img src={iconPlay} alt="" className="size-16" />
    </div>
  </div>
);

// ----- WebinarCard: main webinar listing card -----
// Was a rigid 3-column flex row (fixed 297px thumbnail + flexible middle +
// fixed 295px sidebar) that could never fit a phone screen. Now stacks
// vertically (thumbnail → content → sidebar) below `lg`, and only becomes
// the original side-by-side row at `lg` and up.
const WebinarCard = ({
  index,
  live,
  category,
  title,
  date,
  duration,
  timezones,
  tags,
  avatars,
  extraAvatars,
  spots,
  highlighted,
  thumbnail,
  onReserve,
}) => (
  <article
    className={`relative flex w-full flex-col items-stretch gap-6 rounded-[24px] p-5 shadow-[0px_10px_40px_-10px_rgba(13,81,67,0.1)] sm:p-6 lg:flex-row lg:items-start lg:gap-8 lg:rounded-[32px] lg:p-8 ${
      highlighted
        ? "border border-[#006b57] bg-white/80"
        : "border border-[#006b57] bg-white"
    }`}
  >
    <WebinarThumbnail index={index} title={title} thumbnail={thumbnail} />
    <div className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4">
      <div className="flex flex-wrap items-center gap-3">
        {live && (
          <span className="rounded-sm bg-[#ef4444] px-2 py-0.5 text-[10px] font-bold uppercase text-white">
            ● Live
          </span>
        )}
        <span className="text-xs font-bold uppercase tracking-[1.2px] text-[#9ca3af]">
          {category}
        </span>
      </div>
      <h3 className="text-xl font-extrabold leading-tight text-[#0d5143] sm:text-2xl">
        {title}
      </h3>
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-3">
          <img src={iconCalendarCard} alt="" className="h-4 w-[15px]" />
          <span className="text-sm font-semibold text-[#0d5143]">{date}</span>
        </div>
        <div className="flex items-center gap-3">
          <img src={iconClock} alt="" className="size-3.5" />
          <span className="text-sm font-semibold text-[#0d5143]">
            {duration}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <img src={iconGlobe} alt="" className="h-5 w-[10px]" />
          <span className="text-sm text-[#6b7280]">{timezones}</span>
        </div>
      </div>
      <ChipRow items={tags} />
    </div>
    <div className="flex w-full shrink-0 flex-col justify-between gap-6 border-t border-[#f3f4f6] pt-6 lg:h-full lg:w-[295px] lg:gap-0 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
      <div className="flex flex-col gap-3 lg:pb-4">
        <span className="text-[10px] font-bold uppercase text-[#9ca3af]">
          Intervenants
        </span>
        <Avatars images={avatars} extra={extraAvatars} />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#9ca3af]">
            Places limitées
          </span>
          <span className="text-xs font-bold text-[#1eb394]">{spots}</span>
        </div>
        <PrimaryButton className="h-12 w-full rounded-xl" onClick={onReserve}>
          Réserver ma place
        </PrimaryButton>
      </div>
    </div>
  </article>
);

// ----- ReplayCard: for past webinar recordings -----
const ReplayCard = ({ thumbnail, duration, category, title, date, dimmed }) => (
  <div
    className={`group flex flex-col overflow-hidden rounded-3xl border border-[#f3f4f6] bg-white shadow-[0px_10px_40px_-10px_rgba(13,81,67,0.5)] ${
      dimmed ? "opacity-90" : ""
    }`}
  >
    <div className="relative h-[164px] w-full shrink-0 overflow-hidden">
      <img src={thumbnail} alt="" className="size-full object-cover" />
      <div className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1">
        <span className="text-[10px] font-bold text-white">{duration}</span>
      </div>
    </div>
    <div className="flex flex-col gap-2 p-6">
      <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#1eb394]">
        {category}
      </span>
      <h4 className="text-base font-bold leading-tight text-[#0d5143]">
        {title}
      </h4>
      <span className="pt-1 text-xs text-[#9ca3af]">{date}</span>
      <div className="flex gap-4 border-t border-[#f3f4f6] pt-4">
        <button className="flex items-center gap-1.5 text-[10px] font-bold text-[#6b7280]">
          <img src={iconSlides} alt="" className="size-4" />
          Slides
        </button>
        <button className="flex items-center gap-1.5 text-[10px] font-bold text-[#6b7280]">
          <img src={iconGuide} alt="" className="size-4" />
          Guide associé
        </button>
      </div>
    </div>
  </div>
);

// ----- FeatureCard: for the "Events & Community" section -----
const FeatureCard = ({ icon, title, description }) => (
  <div className="flex w-full max-w-[327px] flex-col gap-3 rounded-[24px] border border-[#1eb394] bg-white p-6 shadow-[0px_10px_40px_-10px_rgba(13,81,67,0.5)] sm:rounded-[32px] sm:p-8 lg:h-[254px]">
    <div className="flex size-14 items-center justify-center rounded-2xl bg-[#f4fbf9]">
      <img src={icon} alt="" className="size-8" />
    </div>
    <h4 className="pt-3 text-lg font-extrabold text-[#0d5143] sm:text-xl">{title}</h4>
    <p className="text-sm leading-relaxed text-[#343434]">{description}</p>
  </div>
);

// ----- StatCard: used in the impact stats panel -----
// Fixed 184x107 → fluid width so two cards always fit the grid column,
// no matter how narrow the parent panel gets.
const StatCard = ({ value, label }) => (
  <div className="flex h-full min-h-[90px] w-full flex-col justify-center gap-2 rounded-2xl border border-[#02473e] bg-[#003730] p-3 sm:min-h-[107px] sm:gap-2.5">
    <span className="text-2xl font-extrabold text-white sm:text-4xl">{value}</span>
    <span className="text-[10px] font-bold uppercase tracking-[0.6px] text-white/60 sm:text-xs">
      {label}
    </span>
  </div>
);

// ========== Registration Modal ==========
const MODAL_HIGHLIGHTS = [
  {
    icon: customVideoIcon,
    title: "Démo live VTM",
    description: "Découvrez l'interface en temps réel",
  },
  {
    icon: customCasesIcon,
    title: "Études de cas concrètes",
    description: "Retours d'expérience clients B2B",
  },
  {
    icon: customQAIcon,
    title: "Q&A en direct",
    description: "Posez vos questions aux experts",
  },
];
const MODAL_AFTER_SIGNUP = [
  "Lien d'accès Zoom envoyé instantanément par email",
  "Calendrier synchronisé avec rappel 15min avant le début",
  "Accès exclusif au replay et aux slides de présentation",
  'Guide PDF "Optimiser sa téléphonie B2B" offert',
];
const MODAL_COMPANY_SIZES = [
  "1-10 collaborateurs",
  "11-50 collaborateurs",
  "51-200 collaborateurs",
  "200+ collaborateurs",
];

const WebinarRegistrationModal = ({ open, onClose, webinar, onSubmit }) => {
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    company: "",
    companySize: MODAL_COMPANY_SIZES[0],
  });
  const [submitting, setSubmitting] = useState(false);

  // Reset form and handle Escape key when modal opens
  useEffect(() => {
    if (open)
      setForm({
        firstName: "",
        email: "",
        company: "",
        companySize: MODAL_COMPANY_SIZES[0],
      });
    if (open) {
      const onKey = (e) => e.key === "Escape" && onClose?.();
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [open, webinar, onClose]);

  if (!open || !webinar) return null;

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit?.({ ...form, webinarId: webinar.id });
      onClose?.();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="webinar-modal-title"
      onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div className="relative flex w-full max-w-[1024px] max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-5 top-5 z-10 flex size-8 items-center justify-center text-[#3c4a45]/50 transition-colors hover:text-[#3c4a45]"
        >
          <img src={customCloseIcon} alt="Fermer" className="size-[16px]" />
        </button>
        {/* Left panel – webinar info. Only shown from `lg` up: at `sm` a
            45%/55% split leaves both halves too cramped to read. */}
        <div
          className="relative hidden w-[45%] shrink-0 flex-col justify-between overflow-hidden p-7 lg:flex"
          style={{
            backgroundImage: "linear-gradient(90deg, #0d5143 0%, #0d5143 100%)",
          }}
        >
          <div className="pointer-events-none absolute -bottom-20 -left-20 size-[320px] rounded-full bg-[#006b57]/20 blur-[50px]" />
          <div className="pointer-events-none absolute right-0 top-10 size-[160px] rounded-full bg-[#1eb394]/10 blur-[30px]" />
          <div className="relative flex flex-col gap-3">
            {webinar.live && (
              <span className="flex w-fit items-center gap-2 rounded-full bg-[#ba1a1a] px-3 py-1">
                <span className="size-2 rounded-full bg-white" />
                <span className="text-xs font-bold uppercase leading-[12px] tracking-[1.2px] text-white">
                  Live
                </span>
              </span>
            )}
            <h2
              id="webinar-modal-title"
              className="pt-1 text-2xl font-normal leading-[30px] text-white"
            >
              {webinar.title}
            </h2>
            <div className="flex items-center gap-3">
              <img src={iconCalendarModal} alt="" className="h-4 w-[15px]" />
              <span className="text-sm font-semibold text-[#9ef3d9]">
                {webinar.date} — {webinar.duration}
              </span>
            </div>
            <div className="flex flex-col gap-3 pt-3">
              {MODAL_HIGHLIGHTS.map(({ icon, title, description }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <img src={icon} alt="" className="size-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">
                      {title}
                    </span>
                    <span className="text-xs text-white/80">{description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex items-center">
            <div className="flex items-start">
              {[newAvatar1, newAvatar2].map((src, i) => (
                <div
                  key={i}
                  className="relative -mr-3 size-10 shrink-0 overflow-hidden rounded-full border-2 border-[#006b57]"
                >
                  <img src={src} alt="" className="size-full object-cover" />
                </div>
              ))}
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-[#006b57] bg-[#1eb394]">
                <span className="text-xs font-bold text-white">+1</span>
              </div>
            </div>
            <div className="flex flex-col pl-3">
              <span className="text-xs font-bold uppercase tracking-[1.2px] text-[#58dcbb]">
                Intervenants experts
              </span>
              <span className="text-xs text-white/80">
                +1 248 professionnels inscrits
              </span>
            </div>
          </div>
        </div>
        {/* Right panel – registration form */}
        <div className="flex w-full flex-col overflow-y-auto px-5 py-6 sm:px-10 sm:py-8">
          <div className="flex w-full flex-col gap-5">
            <div className="flex flex-col gap-1.5 pr-8">
              <h3 className="text-lg font-semibold leading-tight text-[#171d1b] sm:text-xl">
                Réservez votre place gratuitement
              </h3>
              <p className="text-sm leading-snug text-[#3c4a45]">
                Participez à notre webinar exclusif et échangez directement avec
                les experts KonektUs.
              </p>
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="px-1 text-xs font-semibold uppercase text-black">
                    Prénom
                  </span>
                  <input
                    required
                    type="text"
                    value={form.firstName}
                    onChange={handleChange("firstName")}
                    placeholder="Ex: Sami"
                    className="w-full rounded-lg border border-[#b3b3b3]/50 px-4 py-2.5 text-sm text-[#171d1b] placeholder:text-[#b3b3b3] outline-none focus:border-[#1eb394]"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="px-1 text-xs font-semibold uppercase text-black">
                    Email professionnel
                  </span>
                  <div className="relative">
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={handleChange("email")}
                      placeholder="sami@entreprise.com"
                      className="w-full rounded-lg border border-[#bbcac3]/50 py-2.5 pl-4 pr-9 text-sm text-[#171d1b] placeholder:text-[#b3b3b3] outline-none focus:border-[#1eb394]"
                    />
                    {/^\S+@\S+\.\S+$/.test(form.email) && (
                      <img
                        src={customCheckIcon}
                        alt=""
                        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2"
                      />
                    )}
                  </div>
                </label>
              </div>
              <label className="flex flex-col gap-1.5">
                <span className="px-1 text-xs font-semibold uppercase text-black">
                  Nom de votre entreprise
                </span>
                <input
                  required
                  type="text"
                  value={form.company}
                  onChange={handleChange("company")}
                  placeholder="Votre société"
                  className="w-full rounded-lg border border-[#bbcac3]/50 px-4 py-2.5 text-sm text-[#171d1b] placeholder:text-[#b3b3b3] outline-none focus:border-[#1eb394]"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="px-1 text-xs font-semibold uppercase text-black">
                  Taille de l'entreprise
                </span>
                <div className="relative">
                  <select
                    value={form.companySize}
                    onChange={handleChange("companySize")}
                    className="w-full appearance-none rounded-lg border border-[#b3b3b3]/50 px-4 py-2.5 text-sm text-[#3c4a45] outline-none focus:border-[#1eb394]"
                  >
                    {MODAL_COMPANY_SIZES.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <img
                    src={iconChevronDown}
                    alt=""
                    className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2"
                  />
                </div>
              </label>
              <button
                type="submit"
                disabled={submitting}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-xl text-base font-bold text-white transition-opacity disabled:opacity-60"
                style={{
                  backgroundImage:
                    "linear-gradient(166deg, #1eb394 15%, #006b57 84%)",
                }}
              >
                {submitting ? "Envoi..." : "Réserver ma place"}
              </button>
            </form>
            <div className="flex flex-col gap-2 border-t border-[#bbcac3]/20 pt-4">
              <span className="text-[10px] font-bold uppercase tracking-[1.1px] text-[#3c4a45]/70">
                Après votre inscription :
              </span>
              <ul className="flex flex-col gap-0.5 pl-4 text-[11px] text-[#3c4a45]/60">
                {MODAL_AFTER_SIGNUP.map((item) => (
                  <li key={item} className="list-none leading-4">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========== Content Data ==========
// Webinar cards data (upcoming)
const WEBINARS = [
  {
    id: 1,
    live: true,
    category: "VoIP & Téléphonie",
    title: "Transformer votre téléphonie en levier commercial — Live démo VTM",
    date: "12 Février 2025",
    duration: "75 min",
    timezones: "14h00 (Paris) / 15h00 (Tunis) / 15h00 (Rabat)",
    tags: ["Démo live", "témoignage", "Q&A"],
    avatars: [newAvatar1, newAvatar2],
    extraAvatars: "+1",
    spots: "200 places",
    highlighted: false,
    thumbnail: webinarThumb1,
  },
  {
    id: 2,
    live: true,
    category: "Service client",
    title: "Service client omnicanal au Maghreb — De la théorie à la pratique",
    date: "12 Février 2025",
    duration: "75 min",
    timezones: "14h00 (Paris) / 15h00 (Tunis) / 15h00 (Rabat)",
    tags: ["Présentation", "cas concret", "débat"],
    avatars: [avatar3, avatar4, newAvatar1],
    extraAvatars: "+1",
    spots: "200 places",
    highlighted: true,
    thumbnail: webinarThumb2,
  },
];

// Replay cards (past webinars)
const REPLAYS = [
  {
    id: 1,
    thumbnail: replayThumb1,
    duration: "54:32",
    category: "VoIP",
    title: "Optimiser vos appels commerciaux avec l'IA",
    date: "18 Déc. 2024",
    dimmed: false,
  },
  {
    id: 2,
    thumbnail: replayThumb2,
    duration: "47:18",
    category: "Service client",
    title: "WhatsApp Business API : le guide complet",
    date: "4 Déc. 2024",
    dimmed: true,
  },
  {
    id: 3,
    thumbnail: replayThumb3,
    duration: "1:02:45",
    category: "Cloud",
    title: "Sécurité cloud : protéger vos données vocales",
    date: "27 Nov. 2024",
    dimmed: true,
  },
  {
    id: 4,
    thumbnail: replayThumb4,
    duration: "58:11",
    category: "IA",
    title: "Analyse des sentiments : le guide pratique",
    date: "12 Nov. 2024",
    dimmed: true,
  },
];

// Feature cards for "Events & Community" section
const FEATURES = [
  {
    icon: iconEvents,
    title: "Événements exclusifs",
    description:
      "Participez à nos événements privés et rencontres VIP avec nos experts et partenaires.",
  },
  {
    icon: iconCommunity,
    title: "Communauté de décideurs",
    description:
      "Rejoignez une communauté de plus de 3 000 décideurs en Europe, au Maghreb et en Afrique.",
  },
  {
    icon: iconLearning,
    title: "Apprentissage continu",
    description:
      "Accédez à des contenus exclusifs, études, guides et formations régulièrement mis à jour.",
  },
  {
    icon: iconNetwork,
    title: "Networking & Partenariats",
    description:
      "Développez votre réseau et créez des opportunités business avec des entreprises innovantes.",
  },
];

// Statistics for the impact panel
const STATS = [
  ["+25", "Webinars organisés"],
  ["+18 000", "Inscriptions"],
  ["+97%", "Satisfaction"],
  ["+3 000", "Membres actifs"],
];

// ========== Main Component ==========
export default function Webinar() {
  const [selectedWebinar, setSelectedWebinar] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const webinarsRef = useRef(null);
  const replaysRef = useRef(null);

  useEffect(() => {
    const images = [
      bg,
      heroImage,
      iconClock,
      iconCalendarModal,
      iconCalendarCard,
      iconGlobe,
      iconPlay,
      iconSlides,
      iconGuide,
      iconChevronRight,
      iconEvents,
      iconLearning,
      iconCommunity,
      iconNetwork,
      iconChevronDown,
      iconChevronDownGreen,
      avatar3,
      avatar4,
      newAvatar1,
      newAvatar2,
      replayThumb1,
      replayThumb2,
      replayThumb3,
      replayThumb4,
      webinarThumb1,
      webinarThumb2,
      customVideoIcon,
      customCasesIcon,
      customQAIcon,
      customCheckIcon,
      customCloseIcon,
    ];

    let loadedCount = 0;
    const imageObjects = [];
    const onLoadOrError = () => {
      loadedCount += 1;
      if (loadedCount >= images.length) {
        setIsLoaded(true);
      }
    };

    images.forEach((src) => {
      const img = new Image();
      imageObjects.push(img);
      img.onload = onLoadOrError;
      img.onerror = onLoadOrError;
      img.src = src;
    });

    return () => {
      imageObjects.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  const handleRegistrationSubmit = async (data) =>
    console.log("Registration submitted:", data);

  const scrollToSection = (ref) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  if (!isLoaded) return <WebinarSkeleton />;

  return (
    <div className="relative w-full overflow-hidden">
      <img
        src={bg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-top"
      />
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 pt-28 sm:px-6 sm:pt-40 lg:pt-[220px]">
        {/* ===== HERO SECTION ===== */}
        <section className="flex w-full flex-col items-center gap-5 text-center sm:gap-6">
          <motion.h1
            initial={{ opacity: 0, y: -168 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[746px] text-[28px] font-extrabold leading-[1.3] tracking-[-0.5px] text-[#0b3f34] sm:text-[36px] sm:leading-[1.25] sm:tracking-[-0.8px] lg:text-[44px] lg:leading-[60px] lg:tracking-[-0.96px]"
          >
            Apprenez des meilleurs experts{" "}
            <span className="bg-gradient-to-r from-[#0b3f34] to-[#1da588] bg-clip-text text-transparent">
              en transformation digitale
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 192 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[746px] text-sm leading-6 text-black sm:text-base sm:leading-[35px]"
          >
            Webinars en direct, replays disponibles et événements exclusifs,
            rejoignez une communauté de décideurs qui façonnent le futur de la
            communication B2B.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 192 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2 sm:gap-4"
          >
            <button
              type="button"
              onClick={() => scrollToSection(webinarsRef)}
              className="flex items-center gap-3 rounded-2xl px-5 py-2.5 text-sm font-semibold text-white sm:px-6 sm:py-3 sm:text-base"
              style={{
                backgroundImage:
                  "linear-gradient(153deg, #1eb394 16%, #006b57 82%)",
              }}
            >
              Voir les webinaires
              <img src={iconChevronDown} alt="" className="size-3" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection(replaysRef)}
              className="flex items-center gap-3 rounded-2xl border-2 border-[#006b57] px-5 py-2.5 text-sm font-semibold text-[#006b57] sm:px-6 sm:py-3 sm:text-base"
            >
              Voir les replays
              <img src={iconChevronDownGreen} alt="" className="size-3" />
            </button>
          </motion.div>
          <motion.img
            src={heroImage}
            alt="Illustration webinaires KoneKtUS"
            initial={{ opacity: 0, scale: 0.6, x: 254, y: 704 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="w-full max-w-[1265px]"
            style={{ transformOrigin: "center" }}
          />
        </section>

        {/* ===== PROCHAINS WEBINAIRES ===== */}
        <section ref={webinarsRef} className="mt-16 flex w-full flex-col gap-8 sm:mt-20 sm:gap-10 lg:mt-24 lg:gap-12">
          <motion.h2
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl font-black text-[#0b3f34] sm:text-3xl lg:text-4xl"
          >
            Les prochaines webinars
          </motion.h2>
          <div className="flex flex-col gap-6 sm:gap-8">
            {WEBINARS.map((w, i) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 1.4,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.15,
                }}
              >
                <WebinarCard {...w} onReserve={() => setSelectedWebinar(w)} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== REPLAYS & RESSOURCES ===== */}
        <section ref={replaysRef} className="mt-16 flex w-full flex-col gap-8 sm:mt-20 sm:gap-10 lg:mt-24 lg:gap-12">
          <motion.h2
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl font-black text-[#0b3f34] sm:text-3xl lg:text-4xl"
          >
            Les replays & Ressources
          </motion.h2>
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {REPLAYS.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.1,
                }}
              >
                <ReplayCard {...r} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== ÉVÉNEMENTS & COMMUNAUTÉ ===== */}
        <section className="mt-16 flex w-full flex-col gap-10 sm:mt-20 sm:gap-12 lg:mt-24 lg:gap-16">
          <SpringReveal offsetX={728}>
            <h2 className="text-2xl font-extrabold text-[#0b3f34] sm:text-3xl lg:text-4xl">
              Événements & Communauté KonektUs
            </h2>
          </SpringReveal>

          <div className="flex flex-col items-stretch gap-8 lg:flex-row lg:items-end lg:gap-10">
            <div className="flex flex-1 flex-wrap justify-center gap-6 sm:gap-7 lg:justify-start">
              {FEATURES.map((f, i) => (
                <SpringReveal key={f.title} offsetX={FEATURE_OFFSETS[i]}>
                  <FeatureCard {...f} />
                </SpringReveal>
              ))}
            </div>

            <SpringReveal
              offsetX={-536}
              className="relative w-full max-w-[514px] shrink-0 self-center lg:h-[542px] lg:self-auto"
            >
              <div className="flex h-full w-full flex-col overflow-hidden rounded-[24px] bg-[#0d5143] p-6 sm:rounded-[40px] sm:p-9">
                <div className="pointer-events-none absolute right-0 top-0 size-32 rounded-full bg-[#1eb394]/20 blur-3xl" />
                <h3 className="text-lg font-bold text-white sm:text-xl">
                  Notre impact en 2026
                </h3>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4">
                  {STATS.map(([val, lbl]) => (
                    <StatCard key={lbl} value={val} label={lbl} />
                  ))}
                </div>
                <div className="mt-auto pt-6 sm:pt-8">
                  <Avatars images={[avatar3, avatar4, newAvatar1]} extra="+1" />
                </div>
              </div>
            </SpringReveal>
          </div>
        </section>

        {/* ===== FINAL CALL-TO-ACTION ===== */}
        <section className="relative mt-16 mb-16 w-full overflow-hidden rounded-[24px] bg-[#0d5143] px-6 py-10 sm:mt-20 sm:mb-20 sm:rounded-[32px] sm:px-8 sm:py-12 lg:mt-24 lg:mb-24 lg:rounded-[40px]">
          <div className="pointer-events-none absolute -bottom-20 -left-20 size-[320px] rounded-full bg-[#1eb394]/10 blur-3xl" />
          <div className="mx-auto flex max-w-[818px] flex-col items-center gap-8 text-center sm:gap-11">
            <div className="flex flex-col gap-3 sm:gap-4">
              <h2 className="text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
                Recevez les prochains webinars avant tout le monde
              </h2>
              <p className="text-base text-white/80 sm:text-lg">
                Inscrivez-vous et ne manquez aucun événement exclusif,
                invitation privée ou ressource premium.
              </p>
            </div>
            <div className="flex w-full max-w-[550px] flex-col items-center gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Votre email professionnel"
                className="h-14 w-full flex-1 rounded-2xl px-6 text-[#6b7280] outline-none"
              />
              <PrimaryButton className="w-full sm:w-auto">
                Je m'inscris
              </PrimaryButton>
            </div>
          </div>
        </section>
      </div>

      {/* Registration modal */}
      <WebinarRegistrationModal
        open={!!selectedWebinar}
        webinar={selectedWebinar}
        onClose={() => setSelectedWebinar(null)}
        onSubmit={handleRegistrationSubmit}
      />
    </div>
  );
}
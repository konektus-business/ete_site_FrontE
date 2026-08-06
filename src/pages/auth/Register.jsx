import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Building2,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
} from "lucide-react";
import logo from "../../assets/company_logo_black.png";
import robotLogo from "../../assets/company_logo_black_robot.png";
import googleIcon from "../../assets/icons/google-icon.svg";
import { motion } from "framer-motion";

// --- Validation helpers ---
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESERVED_EMAILS = ["test@konektus.com", "admin@konektus.com"];

function validateNomPrenom(value) {
  if (!value.trim()) return "Le nom et prénom sont requis.";
  return "";
}
function validatePhone(value) {
  if (!value.trim()) return "Le numéro de téléphone est requis.";
  return "";
}
function validateEmail(value) {
  if (!value.trim()) return "L'e-mail est requis.";
  if (!EMAIL_REGEX.test(value.trim())) {
    return "Format d'email invalide. Vérifiez votre saisie.";
  }
  if (RESERVED_EMAILS.includes(value.trim().toLowerCase())) {
    return "Cet email est déjà associé à un compte.";
  }
  return "";
}
function validateCompany(value) {
  if (!value.trim()) return "Le nom de l'entreprise est requis.";
  return "";
}
function getPasswordStrength(password) {
  if (!password) return null;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) {
    return {
      score,
      label: "Mot de passe est trop faible !",
      colorClass: "text-red-500",
      barClass: "bg-red-500 w-1/3",
    };
  }
  if (score <= 2) {
    return {
      score,
      label: "Mot de passe moyen",
      colorClass: "text-amber-500",
      barClass: "bg-amber-500 w-2/3",
    };
  }
  return {
    score,
    label: "Mot de passe fort",
    colorClass: "text-[#1eb394]",
    barClass: "bg-[#1eb394] w-full",
  };
}
function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return "Veuillez confirmer votre mot de passe.";
  if (password !== confirmPassword) return "Mot de passe non identique !";
  return "";
}

// --- Field config (data-driven, replaces 4 duplicated JSX blocks) ---
const TEXT_FIELDS = [
  { name: "nomPrenom", label: "Nom et Prénom", icon: User, type: "text", placeholder: "Nom et Prénom", iconClass: "w-[16px] h-[16px]" },
  { name: "phone", label: "Téléphone", icon: Phone, type: "tel", placeholder: "+216", iconClass: "w-[15px] h-[16px]" },
  { name: "email", label: "E-mail", icon: Mail, type: "email", placeholder: "votre@email.com", iconClass: "w-[16px] h-[16px]" },
  { name: "company", label: "Nom de l'entreprise", icon: Building2, type: "text", placeholder: "Nom de l'entreprise", iconClass: "w-[16px] h-[16px]" },
];

const inputBaseClass =
  "w-full h-[44px] lg:h-[36px] box-border bg-white/60 border rounded-[10px] pl-[40px] pr-[14px] text-[13px] lg:text-[12px] font-normal text-[#334155] placeholder:text-[#696f6e] focus:outline-none focus:ring-2 transition-colors";
const inputValidClass = "border-[#bfc9c6] focus:ring-[#1eb394]/40";
const inputErrorClass = "border-red-500 focus:ring-red-500/30 pr-[40px]";

// --- Background animations (same as Login) ---
const orbVariants = {
  animate: (custom) => ({
    x: custom.x,
    y: custom.y,
    scale: custom.scale,
    transition: {
      duration: custom.duration,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  }),
};

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: 2 + Math.random() * 3,
  duration: 8 + Math.random() * 10,
  delay: Math.random() * 8,
}));

// ---------- AnimatedRobot (same as Login) ----------
function AnimatedRobot({ hasError = false }) {
  return (
    <div className="hidden lg:block absolute right-[6%] bottom-[6%] w-[40%] max-w-[440px] min-w-[260px] pointer-events-none">
      <motion.div
        animate={hasError ? "error" : "idle"}
        variants={{
          idle: { x: [0, 10, 0, -10, 0], rotate: [0, 1, 0, -1, 0] },
          error: { x: [0, 8, -8, 8, -8, 0], rotate: [0, 2, -2, 2, -2, 0] },
        }}
        transition={{
          duration: hasError ? 0.5 : 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          animate={{ y: [0, -14, 0, -4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0 rounded-full blur-[70px]"
            style={{ background: hasError ? "#e74c3c" : "#1eb394" }}
            animate={{ opacity: [0.15, 0.3, 0.15], scale: [0.9, 1.06, 0.9] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          />

          <svg viewBox="0 0 300 380" className="relative w-full h-auto">
            <defs>
              <linearGradient id="botBodyReg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#dff5f0" />
                <stop offset="100%" stopColor="#bfe6dc" />
              </linearGradient>
              <linearGradient id="botHeadReg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#eafaf6" />
                <stop offset="100%" stopColor="#cfeee5" />
              </linearGradient>
              <radialGradient id="visorGlowReg" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#7ff0d4" />
                <stop offset="100%" stopColor="#0d5143" />
              </radialGradient>
              <clipPath id="logoClipReg">
                <circle cx="150" cy="242" r="17" />
              </clipPath>
            </defs>

            <line x1="150" y1="12" x2="150" y2="46" stroke="#8fb9ae" strokeWidth="4" strokeLinecap="round" />
            <motion.circle
              cx="150"
              cy="10"
              r="8"
              fill={hasError ? "#e74c3c" : "#1eb394"}
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.875, 1.125, 0.875] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{
                filter: `drop-shadow(0 0 6px ${hasError ? "#e74c3c" : "#1eb394"})`,
                transformOrigin: "150px 10px",
              }}
            />

            <motion.rect
              x="52" y="90" width="18" height="46" rx="9"
              fill="#cfeee5" stroke="#8fb9ae" strokeWidth="2"
              animate={{ rotate: [0, 6, 0, -6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "61px 95px" }}
            />
            <motion.rect
              x="230" y="90" width="18" height="46" rx="9"
              fill="#cfeee5" stroke="#8fb9ae" strokeWidth="2"
              animate={{ rotate: [0, -6, 0, 6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "239px 95px" }}
            />

            <rect x="75" y="48" width="150" height="120" rx="42" fill="url(#botHeadReg)" stroke="#8fb9ae" strokeWidth="3" />
            <rect x="98" y="86" width="104" height="52" rx="26" fill="#0b3f34" />

            <motion.g
              animate={{ scaleY: [1, 1, 0.1, 1, 1, 1, 1, 0.1, 1] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                times: [0, 0.42, 0.46, 0.5, 0.7, 0.9, 0.94, 0.97, 1],
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "150px 112px" }}
            >
              <circle cx="128" cy="112" r="11" fill={hasError ? "#e74c3c" : "url(#visorGlowReg)"} />
              <circle cx="172" cy="112" r="11" fill={hasError ? "#e74c3c" : "url(#visorGlowReg)"} />
            </motion.g>

            <circle cx="93" cy="140" r="7" fill="#1eb394" opacity="0.25" />
            <circle cx="207" cy="140" r="7" fill="#1eb394" opacity="0.25" />

            <rect x="132" y="168" width="36" height="14" rx="6" fill="#bfe6dc" stroke="#8fb9ae" strokeWidth="2" />
            <rect x="70" y="182" width="160" height="140" rx="34" fill="url(#botBodyReg)" stroke="#8fb9ae" strokeWidth="3" />
            <rect x="118" y="210" width="64" height="64" rx="16" fill="#0b3f34" />

            <motion.circle
              cx="150" cy="242" r="19"
              fill="#eafaf6"
              animate={{ scale: [1, 1.08, 1], opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 0 8px #1eb394)", transformOrigin: "150px 242px" }}
            />

            <motion.image
              href={robotLogo}
              x="129" y="221" width="42" height="42"
              clipPath="url(#logoClipReg)"
              preserveAspectRatio="xMidYMid slice"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "150px 242px" }}
            />

            {[0, 1].map((i) => (
              <motion.circle
                key={i}
                cx="150" cy="242" r="19"
                fill="none" stroke="#1eb394" strokeWidth="1.5"
                animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: i * 1 }}
                style={{ transformOrigin: "150px 242px" }}
              />
            ))}

            <motion.g
              animate={{ rotate: [0, -22, 0, -22, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "74px 200px" }}
            >
              <rect x="40" y="192" width="34" height="18" rx="9" fill="#bfe6dc" stroke="#8fb9ae" strokeWidth="2" />
              <circle cx="38" cy="201" r="12" fill="#dff5f0" stroke="#8fb9ae" strokeWidth="2" />
            </motion.g>

            <motion.g
              animate={{ rotate: [0, 8, 0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "226px 210px" }}
            >
              <rect x="226" y="204" width="34" height="18" rx="9" fill="#bfe6dc" stroke="#8fb9ae" strokeWidth="2" />
              <circle cx="262" cy="213" r="12" fill="#dff5f0" stroke="#8fb9ae" strokeWidth="2" />
            </motion.g>

            <motion.rect
              x="104" y="316" width="26" height="46" rx="12"
              fill="#bfe6dc" stroke="#8fb9ae" strokeWidth="2"
              animate={{ y: [316, 308, 316], rotate: [0, -4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "117px 320px" }}
            />
            <motion.rect
              x="170" y="316" width="26" height="46" rx="12"
              fill="#bfe6dc" stroke="#8fb9ae" strokeWidth="2"
              animate={{ y: [316, 308, 316], rotate: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              style={{ transformOrigin: "183px 320px" }}
            />
          </svg>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute left-1/2 -translate-x-1/2 bottom-[0%] w-[48%] h-[16px] rounded-full bg-black/40 blur-[8px]"
        animate={{ scaleX: [1, 0.72, 1, 0.9, 1], opacity: [0.4, 0.2, 0.4, 0.3, 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

// ---------- FormField: single reusable component for every input ----------
// Handles: icon-prefixed text inputs AND password inputs (show/hide toggle +
// optional strength meter), replacing the 6 near-identical JSX blocks.
function FormField({
  id,
  label,
  icon: Icon,
  iconClass = "w-[16px] h-[16px]",
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  isPassword = false,
  show,
  onToggleShow,
  strength,
}) {
  return (
    <div className="flex flex-col gap-[6px] lg:gap-[3px] w-full">
      <label
        htmlFor={id}
        className="font-semibold text-[12px] lg:text-[10px] tracking-[0.6px] uppercase text-[#334155]"
      >
        {label}
      </label>
      <div className="relative w-full">
        <Icon className={`absolute left-[14px] top-1/2 -translate-y-1/2 text-[#696f6e] ${iconClass}`} />
        <input
          id={id}
          type={isPassword ? (show ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={`${id}-error`}
          className={`${inputBaseClass} ${isPassword ? "pr-[40px]" : ""} ${
            error ? inputErrorClass : inputValidClass
          }`}
          required
        />
        {isPassword ? (
          <button
            type="button"
            onClick={onToggleShow}
            className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#696f6e]"
            aria-label={show ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            {show ? <EyeOff className="w-[17px] h-[14px]" /> : <Eye className="w-[17px] h-[14px]" />}
          </button>
        ) : (
          error && (
            <AlertTriangle className="absolute right-[14px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-red-500" />
          )
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="text-[12px] leading-[18px] lg:text-[10px] lg:leading-[14px] text-red-500">
          {error}
        </p>
      )}
      {!error && strength && (
        <div className="flex flex-col gap-[4px]">
          <div className="h-[3px] w-full rounded-full bg-[#e2e8f0] overflow-hidden">
            <div className={`h-full rounded-full transition-all ${strength.barClass}`} />
          </div>
          <p className={`text-[12px] leading-[18px] ${strength.colorClass}`}>{strength.label}</p>
        </div>
      )}
    </div>
  );
}

export default function Register() {
  // --- Form state ---
  const [form, setForm] = useState({
    nomPrenom: "",
    phone: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [termsError, setTermsError] = useState("");

  const passwordStrength = getPasswordStrength(form.password);

  const validators = {
    nomPrenom: validateNomPrenom,
    phone: validatePhone,
    email: validateEmail,
    company: validateCompany,
    confirmPassword: (value) => validateConfirmPassword(form.password, value),
    password: (value) => (!value ? "Le mot de passe est requis." : ""),
  };

  const runValidation = (field, value) => {
    const validator = validators[field];
    return validator ? validator(value) : "";
  };

  const handleChange = (field) => (e) => {
    const { value } = e.target;
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      if (touched[field]) {
        next[field] = runValidation(field, value);
      }
      if (field === "password" && touched.confirmPassword) {
        next.confirmPassword = validateConfirmPassword(value, form.confirmPassword);
      }
      return next;
    });
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: runValidation(field, form[field]) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    Object.keys(validators).forEach((field) => {
      nextErrors[field] = runValidation(field, form[field]);
    });
    setErrors(nextErrors);
    setTouched({
      nomPrenom: true,
      phone: true,
      email: true,
      company: true,
      password: true,
      confirmPassword: true,
    });
    const nextTermsError = acceptTerms ? "" : "Vous devez accepter les conditions d'utilisation.";
    setTermsError(nextTermsError);
    const hasErrors = Object.values(nextErrors).some(Boolean) || Boolean(nextTermsError);
    if (hasErrors) return;
    // TODO: wire up to auth API
    console.log({ ...form, acceptTerms });
  };

  const fieldError = (field) => (touched[field] ? errors[field] : "");
  const hasError =
    Object.keys(touched).some((field) => touched[field] && errors[field]) || Boolean(termsError);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center lg:justify-start overflow-hidden bg-[#0b3f34]">
      {/* ---------- Animated background ---------- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,#0d5143_0%,#0b3f34_55%,#062822_100%)]" />

      <motion.div
        className="absolute top-[-10%] right-[5%] w-[520px] h-[520px] rounded-full bg-[#1eb394] opacity-[0.18] blur-[110px]"
        variants={orbVariants}
        animate="animate"
        custom={{ x: [0, 40, -20, 0], y: [0, 30, 60, 0], scale: [1, 1.15, 0.95, 1], duration: 22 }}
      />
      <motion.div
        className="absolute bottom-[-15%] left-[-5%] w-[420px] h-[420px] rounded-full bg-[#006b57] opacity-[0.22] blur-[100px]"
        variants={orbVariants}
        animate="animate"
        custom={{ x: [0, -30, 20, 0], y: [0, -40, -10, 0], scale: [1, 0.9, 1.1, 1], duration: 26 }}
      />
      <motion.div
        className="absolute top-[35%] left-[35%] w-[300px] h-[300px] rounded-full bg-[#0d5143] opacity-[0.15] blur-[90px]"
        variants={orbVariants}
        animate="animate"
        custom={{ x: [0, 25, -15, 0], y: [0, -20, 15, 0], scale: [1, 1.2, 1, 1], duration: 18 }}
      />

      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06]"
        style={{ maskImage: "radial-gradient(circle at 65% 40%, black 0%, transparent 70%)" }}
      >
        <defs>
          <pattern id="registerGrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#ffffff" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#registerGrid)" />
      </svg>

      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-[#1eb394]"
          style={{ left: p.left, bottom: "-10px", width: p.size, height: p.size }}
          animate={{ y: ["0vh", "-100vh"], opacity: [0, 0.6, 0.6, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}

      <AnimatedRobot hasError={hasError} />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,#0b3f34_0%,rgba(11,63,52,0.75)_30%,rgba(11,63,52,0)_60%)]" />

      {/* ---------- Register card ---------- */}
      <div className="relative z-10 w-full min-h-screen flex flex-col sm:block sm:min-h-0 sm:max-w-[760px] sm:mx-auto sm:px-4 sm:pt-8 sm:pb-6 lg:max-w-[600px] lg:mx-0 lg:ml-[6%] lg:mr-auto lg:flex lg:justify-center lg:min-h-screen lg:pt-0 lg:pb-0">
        <div
          className="relative w-full flex-1 flex flex-col sm:flex-none rounded-none sm:rounded-[40px] overflow-hidden lg:max-h-[92vh] lg:overflow-y-auto"
          style={{
            boxShadow: `
              0 45px 90px rgba(0,0,0,0.18),
              0 20px 40px rgba(0,0,0,0.10),
              0 8px 16px rgba(0,0,0,0.05),
              0 0 40px rgba(255,255,255,0.8)
            `,
          }}
        >
          {/* Frosted-glass background with lighting */}
          <div
            className="absolute inset-0 rounded-none sm:rounded-[40px] backdrop-blur-[20px]"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%),
                linear-gradient(to bottom, #ffffff, #F7F7F7)
              `,
            }}
          />

          {/* Border + inset highlights */}
          <div
            className="absolute inset-0 rounded-none sm:rounded-[40px] border border-white/70 pointer-events-none"
            style={{
              boxShadow: `
                inset 0 1px 1px rgba(255,255,255,0.8),
                inset 0 -1px 1px rgba(255,255,255,0.2)
              `,
            }}
          />

          {/* Glossy rim highlight */}
          <div className="absolute inset-0 rounded-none sm:rounded-[40px] pointer-events-none before:absolute before:inset-0 before:rounded-none sm:before:rounded-[40px] before:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.9)]" />

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="relative z-10 w-full flex-1 flex flex-col items-center gap-[20px] px-5 py-6 sm:px-[56px] sm:py-[48px] lg:gap-[12px] lg:px-[36px] lg:py-[22px]"
          >
            <img alt="KonektUs" src={logo} className="h-[56px] w-[90px] object-contain lg:h-[38px] lg:w-[62px]" />

            <div className="flex flex-col items-center gap-[4px] text-center w-full">
              <h1 className="font-bold text-[22px] leading-[27px] lg:text-[17px] lg:leading-[21px] text-[#0d5143]">
                Créer un compte
              </h1>
              <p className="font-medium text-[13px] leading-[19px] lg:text-[11px] lg:leading-[15px] text-[#696f6e]">
                Rejoignez l'écosystème professionnel Konektus VTM
              </p>
            </div>

            {/* Fields grid – 2 columns, now generated from TEXT_FIELDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[24px] gap-y-[12px] lg:gap-x-[16px] lg:gap-y-[6px] w-full">
              {TEXT_FIELDS.map((f) => (
                <FormField
                  key={f.name}
                  id={f.name}
                  label={f.label}
                  icon={f.icon}
                  iconClass={f.iconClass}
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.name]}
                  onChange={handleChange(f.name)}
                  onBlur={handleBlur(f.name)}
                  error={fieldError(f.name)}
                />
              ))}

              <FormField
                id="password"
                label="Mot de passe"
                icon={Lock}
                iconClass="w-[15px] h-[16px]"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                error={fieldError("password")}
                isPassword
                show={showPassword}
                onToggleShow={() => setShowPassword((v) => !v)}
                strength={passwordStrength}
              />

              <FormField
                id="confirmPassword"
                label="Confirmer le mot de passe"
                icon={Lock}
                iconClass="w-[15px] h-[16px]"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                error={fieldError("confirmPassword")}
                isPassword
                show={showConfirmPassword}
                onToggleShow={() => setShowConfirmPassword((v) => !v)}
              />
            </div>

            {/* Terms, Submit, Google, Footer link */}
            <div className="flex flex-col items-center gap-[14px] lg:gap-[8px] w-[486px] max-w-full">
              {/* Terms checkbox */}
              <div className="flex flex-col gap-[6px] lg:gap-[3px] w-full">
                <label className="flex items-start justify-center gap-[10px] cursor-pointer w-full">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => {
                      setAcceptTerms(e.target.checked);
                      if (e.target.checked) setTermsError("");
                    }}
                    className={`mt-[2px] size-[17px] rounded-[4px] border bg-white/50 accent-[#1eb394] shrink-0 ${
                      termsError ? "border-red-500" : "border-[#cbd5e1]"
                    }`}
                    required
                  />
                  <span className="font-normal text-[13px] leading-[18px] lg:text-[11px] lg:leading-[15px] text-[#64748b] text-center">
                    J'accepte les{" "}
                    <NavLink to="/conditions" className="text-[#1eb395] hover:underline">
                      conditions d'utilisation
                    </NavLink>{" "}
                    et la{" "}
                    <NavLink to="/confidentialite" className="text-[#1eb394] hover:underline">
                      politique de confidentialité
                    </NavLink>
                  </span>
                </label>
                {termsError && (
                  <p className="text-[12px] leading-[18px] lg:text-[10px] lg:leading-[14px] text-red-500 text-center">
                    {termsError}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full h-[56px] lg:h-[42px] box-border bg-[#1eb394] hover:bg-[#0d5143] transition-colors rounded-[10px] font-semibold text-[14px] lg:text-[13px] text-white"
              >
                Créer mon compte
              </button>

              {/* Divider */}
              <div className="flex items-center gap-[8px] w-full">
                <div className="flex-1 border-t border-[rgba(105,111,110,0.25)]" />
                <span className="font-medium text-[10px] lg:text-[9px] tracking-[1.1px] uppercase text-[#696f6e] whitespace-nowrap">
                  Ou
                </span>
                <div className="flex-1 border-t border-[rgba(105,111,110,0.25)]" />
              </div>

              {/* Google sign up – matches submit button size */}
              <button
                type="button"
                className="w-full h-[56px] lg:h-[42px] box-border bg-white border border-[#e2e8f0] rounded-[10px] flex items-center justify-center gap-[8px] font-medium text-[14px] lg:text-[13px] text-[#334155] px-[12px] hover:bg-gray-50 transition-colors"
              >
                <img src={googleIcon} alt="" className="w-[16px] h-[16px] shrink-0 object-contain" />
                <span className="truncate">S'inscrire avec Google</span>
              </button>

              {/* Footer link */}
              <p className="font-normal text-[13px] lg:text-[11px] text-[#64748b] text-center">
                Vous avez déjà un compte ?{" "}
                <NavLink to="/login" className="font-bold text-[#1eb395] hover:underline">
                  Se connecter
                </NavLink>
              </p>
            </div>
          </form>

          {/* ---------- Card footer links ---------- */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 px-5 py-4 border-t border-[rgba(100,116,139,0.15)] sm:px-6 lg:py-2">
            <NavLink
              to="/aide"
              className="font-medium text-[11px] tracking-[1.2px] uppercase text-[#64748b] hover:text-[#1eb394] transition-colors"
            >
              Aide
            </NavLink>
            <span className="size-[4px] rounded-full bg-[#cbd5e1]" />
            <NavLink
              to="/confidentialite"
              className="font-medium text-[11px] tracking-[1.2px] uppercase text-[#64748b] hover:text-[#1eb394] transition-colors"
            >
              Confidentialité
            </NavLink>
            <span className="size-[4px] rounded-full bg-[#cbd5e1]" />
            <NavLink
              to="/conditions"
              className="font-medium text-[11px] tracking-[1.2px] uppercase text-[#64748b] hover:text-[#1eb394] transition-colors"
            >
              Conditions
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
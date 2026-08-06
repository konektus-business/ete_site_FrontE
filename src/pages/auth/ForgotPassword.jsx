import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, AlertTriangle } from "lucide-react";
import logo from "../../assets/company_logo_black.png";
import robotLogo from "../../assets/company_logo_black_robot.png";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

// ---------- AnimatedRobot ----------
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
              <linearGradient id="botBodyFp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#dff5f0" />
                <stop offset="100%" stopColor="#bfe6dc" />
              </linearGradient>
              <linearGradient id="botHeadFp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#eafaf6" />
                <stop offset="100%" stopColor="#cfeee5" />
              </linearGradient>
              <radialGradient id="visorGlowFp" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#7ff0d4" />
                <stop offset="100%" stopColor="#0d5143" />
              </radialGradient>
              <clipPath id="logoClipFp">
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

            <rect x="75" y="48" width="150" height="120" rx="42" fill="url(#botHeadFp)" stroke="#8fb9ae" strokeWidth="3" />
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
              <circle cx="128" cy="112" r="11" fill={hasError ? "#e74c3c" : "url(#visorGlowFp)"} />
              <circle cx="172" cy="112" r="11" fill={hasError ? "#e74c3c" : "url(#visorGlowFp)"} />
            </motion.g>

            <circle cx="93" cy="140" r="7" fill="#1eb394" opacity="0.25" />
            <circle cx="207" cy="140" r="7" fill="#1eb394" opacity="0.25" />

            <rect x="132" y="168" width="36" height="14" rx="6" fill="#bfe6dc" stroke="#8fb9ae" strokeWidth="2" />
            <rect x="70" y="182" width="160" height="140" rx="34" fill="url(#botBodyFp)" stroke="#8fb9ae" strokeWidth="3" />
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
              clipPath="url(#logoClipFp)"
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

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState({ email: "", form: "" });

  const validate = (value) => {
    if (!value.trim()) return "L'e-mail est requis.";
    if (!EMAIL_REGEX.test(value.trim())) {
      return "Format d'email invalide. Vérifiez votre saisie.";
    }
    return "";
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email || errors.form) setErrors({ email: "", form: "" });
    if (isSent) setIsSent(false);
  };

  const handleBlur = () => {
    setErrors((prev) => ({ ...prev, email: validate(email) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validate(email);
    if (emailError) {
      setErrors({ email: emailError, form: "" });
      return;
    }

    setErrors({ email: "", form: "" });
    setIsSubmitting(true);

    try {
      // TODO: wire up to auth API (Rahma's endpoint) — send reset link
      console.log({ email });
      setIsSent(true);
    } catch {
      setErrors((prev) => ({
        ...prev,
        form: "Impossible d'envoyer le lien pour le moment. Réessayez.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasError = Boolean(errors.email || errors.form);

  return (
    <div className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#0b3f34]">
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
          <pattern id="forgotGrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#ffffff" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#forgotGrid)" />
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

      {/* ---------- Forgot password card ---------- */}
      {/*
        Mobile (default): the wrapper takes the full viewport, no side padding/margins,
        so the card itself can go edge-to-edge — same pattern as Login/Register.
        sm+: reverts to a constrained, centered floating card.
      */}
      <div className="relative z-10 w-full min-h-screen flex flex-col sm:block sm:min-h-0 sm:max-w-[440px] sm:mx-auto sm:mt-12 md:max-w-[460px] lg:max-w-[420px] sm:px-6 lg:mx-0 lg:ml-[10%] lg:mr-auto lg:px-0 sm:pb-6">
        <div className="relative w-full flex-1 flex flex-col sm:flex-none rounded-none sm:rounded-[34px] bg-white shadow-none sm:shadow-[0_28px_72px_-28px_rgba(0,0,0,0.33)] sm:[box-shadow:0_45px_90px_rgba(0,0,0,0.18),0_20px_40px_rgba(0,0,0,0.10),0_8px_16px_rgba(0,0,0,0.05),0_0_40px_rgba(255,255,255,0.8)]">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="relative z-10 flex-1 w-full flex flex-col items-center justify-center gap-5 px-5 py-6 sm:gap-6 sm:px-7 sm:py-8 lg:px-8"
          >
            <img alt="KonektUs" src={logo} className="h-[56px] w-[90px] object-contain" />

            <div className="flex flex-col items-center gap-[5px] text-center w-full">
              <h1 className="font-bold text-[19px] leading-[24px] text-[#0d5143]">
                Réinitialiser le mot de passe
              </h1>
              <p className="font-normal text-[13px] leading-[18px] text-[#696f6e] max-w-[320px] mx-auto">
                Saisissez votre adresse email pour recevoir un lien pour réinitialiser votre mot de passe.
              </p>
            </div>

            {errors.form && (
              <div
                role="alert"
                className="w-full flex items-start gap-[8px] rounded-[10px] border border-red-300 bg-red-50 px-[14px] py-[10px]"
              >
                <AlertTriangle className="w-[16px] h-[16px] mt-[1px] shrink-0 text-red-500" />
                <p className="font-normal text-[12px] leading-[18px] text-red-600">{errors.form}</p>
              </div>
            )}

            {isSent && !hasError && (
              <div
                role="status"
                className="w-full flex items-start gap-[8px] rounded-[10px] border border-[#9fdcc9] bg-[#eafaf6] px-[14px] py-[10px]"
              >
                <p className="font-normal text-[12px] leading-[18px] text-[#0d5143]">
                  Un lien de réinitialisation a été envoyé à <span className="font-semibold">{email}</span>.
                </p>
              </div>
            )}

            <div className="flex flex-col gap-[13px] w-full">
              {/* Email */}
              <div className="flex flex-col gap-[6px] w-full">
                <label
                  htmlFor="email"
                  className="font-semibold text-[12px] tracking-[0.6px] uppercase text-[#334155]"
                >
                  E-mail
                </label>
                <div className="relative w-full">
                  <Mail
                    className={`absolute left-[14px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] ${
                      errors.email ? "text-red-500" : "text-[#696f6e]"
                    }`}
                  />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleBlur}
                    placeholder="votre@email.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`w-full h-[46px] box-border bg-white/60 border rounded-[10px] pl-[40px] pr-[40px] text-[13px] font-normal placeholder:text-[#696f6e] focus:outline-none focus:ring-2 ${
                      errors.email
                        ? "border-red-500 text-red-600 focus:ring-red-400/40"
                        : "border-[#bfc9c6] text-[#334155] focus:ring-[#1eb394]/40"
                    }`}
                  />
                  {errors.email && (
                    <AlertTriangle className="absolute right-[14px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-red-500" />
                  )}
                </div>
                {errors.email && (
                  <p id="email-error" className="font-medium text-[12px] leading-[18px] text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[48px] box-border bg-[#1eb394] hover:bg-[#0d5143] disabled:opacity-60 disabled:cursor-not-allowed transition-colors rounded-[14px] font-semibold text-[15px] text-white"
              >
                {isSubmitting ? "Envoi..." : "Réinitialiser mon mot de passe"}
              </button>
            </div>

            {/* Footer link */}
            <p className="font-normal text-[12px] text-[#64748b] text-center">
              Vous n'avez pas de compte ?{" "}
              <NavLink to="/register" className="font-semibold text-[#1eb394] hover:underline">
                Créer un compte
              </NavLink>
            </p>
          </form>

          {/* ---------- Card footer links ---------- */}
          <div className="flex flex-wrap items-center justify-center gap-2 px-5 py-4 border-t border-[rgba(100,116,139,0.15)] sm:px-6 sm:rounded-b-[34px]">
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
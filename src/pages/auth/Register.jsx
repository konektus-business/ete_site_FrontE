import { useState } from "react";
import { NavLink } from "react-router-dom";
import { User, Mail, Phone, Building2, Lock, Eye, EyeOff } from "lucide-react";
import robotImage from "../../assets/login-robot.png";
import logo from "../../assets/company_logo_black.png";
import cardBackground from "../../assets/bg_form_1.png"; // asset dédié à la page signup (994x921)
import googleIcon from "../../assets/icons/google-icon.svg"; // adapte le nom si différent

export default function Register() {
  const [form, setForm] = useState({
    nomPrenom: "",
    phone: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to auth API (Rahma's endpoint)
    console.log({ ...form, acceptTerms });
  };

  return (
    <div
      className="relative min-h-screen w-full bg-[#0b3f34] bg-cover bg-center flex items-center justify-center py-10"
      style={{ backgroundImage: `url(${robotImage})` }}
    >
      {/* Sign up card */}
      <div className="relative z-10 w-full max-w-[760px] mx-auto px-4">
        {/* Card background asset — stretched via CSS background instead of aspect-ratio lock,
            so the card can grow with content instead of clipping/overflowing */}
        <div
          className="relative w-full rounded-[24px] overflow-hidden"
          style={{
            backgroundImage: `url(${cardBackground})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="relative z-10 w-full flex flex-col items-center gap-[20px] px-[56px] py-[48px]"
          >
            {/* Logo */}
            <img
              alt="KonektUs"
              src={logo}
              className="h-[56px] w-[90px] object-contain"
            />

            {/* Header */}
            <div className="flex flex-col items-center gap-[6px] text-center w-full">
              <h1 className="font-bold text-[22px] leading-[27px] text-[#0d5143]">
                Créer un compte
              </h1>
              <p className="font-medium text-[13px] leading-[19px] text-[#696f6e]">
                Rejoignez l'écosystème professionnel Konektus VTM
              </p>
            </div>

            {/* Fields grid — 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[24px] gap-y-[12px] w-full">
              {/* Nom et Prénom */}
              <div className="flex flex-col gap-[6px] w-full">
                <label
                  htmlFor="nomPrenom"
                  className="font-semibold text-[12px] tracking-[0.6px] uppercase text-[#334155]"
                >
                  Nom et Prénom
                </label>
                <div className="relative w-full">
                  <User className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[#696f6e]" />
                  <input
                    id="nomPrenom"
                    type="text"
                    value={form.nomPrenom}
                    onChange={handleChange("nomPrenom")}
                    placeholder="Nom et Prénom"
                    className="w-full h-[44px] box-border bg-white/60 border border-[#bfc9c6] rounded-[10px] pl-[40px] pr-[14px] text-[13px] font-normal text-[#334155] placeholder:text-[#696f6e] focus:outline-none focus:ring-2 focus:ring-[#1eb394]/40"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-[6px] w-full">
                <label
                  htmlFor="phone"
                  className="font-semibold text-[12px] tracking-[0.6px] uppercase text-[#334155]"
                >
                  Téléphone
                </label>
                <div className="relative w-full">
                  <Phone className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[15px] h-[16px] text-[#696f6e]" />
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    placeholder="+216"
                    className="w-full h-[44px] box-border bg-white/60 border border-[#bfc9c6] rounded-[10px] pl-[40px] pr-[14px] text-[13px] font-normal text-[#334155] placeholder:text-[#696f6e] focus:outline-none focus:ring-2 focus:ring-[#1eb394]/40"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-[6px] w-full">
                <label
                  htmlFor="email"
                  className="font-semibold text-[12px] tracking-[0.6px] uppercase text-[#334155]"
                >
                  E-mail
                </label>
                <div className="relative w-full">
                  <Mail className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[#696f6e]" />
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    placeholder="votre@email.com"
                    className="w-full h-[44px] box-border bg-white/60 border border-[#bfc9c6] rounded-[10px] pl-[40px] pr-[14px] text-[13px] font-normal text-[#334155] placeholder:text-[#696f6e] focus:outline-none focus:ring-2 focus:ring-[#1eb394]/40"
                    required
                  />
                </div>
              </div>

              {/* Company */}
              <div className="flex flex-col gap-[6px] w-full">
                <label
                  htmlFor="company"
                  className="font-semibold text-[12px] tracking-[0.6px] uppercase text-[#334155]"
                >
                  Nom de l'entreprise
                </label>
                <div className="relative w-full">
                  <Building2 className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[#696f6e]" />
                  <input
                    id="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange("company")}
                    placeholder="Nom de l'entreprise"
                    className="w-full h-[44px] box-border bg-white/60 border border-[#bfc9c6] rounded-[10px] pl-[40px] pr-[14px] text-[13px] font-normal text-[#334155] placeholder:text-[#696f6e] focus:outline-none focus:ring-2 focus:ring-[#1eb394]/40"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-[6px] w-full">
                <label
                  htmlFor="password"
                  className="font-semibold text-[12px] tracking-[0.6px] uppercase text-[#334155]"
                >
                  Mot de passe
                </label>
                <div className="relative w-full">
                  <Lock className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[15px] h-[16px] text-[#696f6e]" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange("password")}
                    placeholder="••••••••"
                    className="w-full h-[44px] box-border bg-white/60 border border-[#bfc9c6] rounded-[10px] pl-[40px] pr-[40px] text-[13px] font-normal text-[#334155] placeholder:text-[#696f6e] focus:outline-none focus:ring-2 focus:ring-[#1eb394]/40"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#696f6e]"
                    aria-label={
                      showPassword
                        ? "Masquer le mot de passe"
                        : "Afficher le mot de passe"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-[17px] h-[14px]" />
                    ) : (
                      <Eye className="w-[17px] h-[14px]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-[6px] w-full">
                <label
                  htmlFor="confirmPassword"
                  className="font-semibold text-[12px] tracking-[0.6px] uppercase text-[#334155]"
                >
                  Confirmer le mot de passe
                </label>
                <div className="relative w-full">
                  <Lock className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[15px] h-[16px] text-[#696f6e]" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    placeholder="••••••••"
                    className="w-full h-[44px] box-border bg-white/60 border border-[#bfc9c6] rounded-[10px] pl-[40px] pr-[40px] text-[13px] font-normal text-[#334155] placeholder:text-[#696f6e] focus:outline-none focus:ring-2 focus:ring-[#1eb394]/40"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#696f6e]"
                    aria-label={
                      showConfirmPassword
                        ? "Masquer le mot de passe"
                        : "Afficher le mot de passe"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-[17px] h-[14px]" />
                    ) : (
                      <Eye className="w-[17px] h-[14px]" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms, Submit, Google sign up, Footer link */}
            <div className="flex flex-col items-center gap-[14px] w-[486px] max-w-full">
              {/* Terms checkbox */}
              <label className="flex items-start justify-center gap-[10px] cursor-pointer w-full">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-[2px] size-[17px] rounded-[4px] border border-[#cbd5e1] bg-white/50 accent-[#1eb394] shrink-0"
                  required
                />
                <span className="font-normal text-[13px] leading-[18px] text-[#64748b] text-center">
                  J'accepte les{" "}
                  <NavLink
                    to="/conditions"
                    className="text-[#1eb395] hover:underline"
                  >
                    conditions d'utilisation
                  </NavLink>{" "}
                  et la{" "}
                  <NavLink
                    to="/confidentialite"
                    className="text-[#1eb394] hover:underline"
                  >
                    politique de confidentialité
                  </NavLink>
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                className="w-full h-[56px] box-border bg-[#1eb394] hover:bg-[#0d5143] transition-colors rounded-[10px] font-semibold text-[14px] text-white"
              >
                Créer mon compte
              </button>

              {/* Divider */}
              <div className="flex items-center gap-[8px] w-full">
                <div className="flex-1 border-t border-[rgba(105,111,110,0.25)]" />
                <span className="font-medium text-[10px] tracking-[1.1px] uppercase text-[#696f6e] whitespace-nowrap">
                  Ou
                </span>
                <div className="flex-1 border-t border-[rgba(105,111,110,0.25)]" />
              </div>

              {/* Google sign up */}
              <button
                type="button"
                className="w-full h-[56px] box-border bg-white/60 border border-[#e2e8f0] rounded-[9px] flex items-center justify-center gap-[8px] font-medium text-[12px] text-[#334155] px-[12px]"
              >
                <img
                  src={googleIcon}
                  alt=""
                  className="w-[15px] h-[15px] shrink-0 object-contain"
                />
                <span className="truncate">S'inscrire avec Google</span>
              </button>

              {/* Footer link */}
              <p className="font-normal text-[13px] text-[#64748b] text-center">
                Vous avez déjà un compte ?{" "}
                <NavLink
                  to="/login"
                  className="font-bold text-[#1eb395] hover:underline"
                >
                  Se connecter
                </NavLink>
              </p>
            </div>
          </form>
        </div>

        {/* Bottom links */}
        <div className="flex items-center justify-center gap-[24px] mt-[20px]">
          <NavLink
            to="/aide"
            className="font-medium text-[12px] tracking-[1.2px] uppercase text-white"
          >
            Aide
          </NavLink>
          <span className="size-[4px] rounded-full bg-[#cbd5e1]" />
          <NavLink
            to="/confidentialite"
            className="font-medium text-[12px] tracking-[1.2px] uppercase text-white"
          >
            Confidentialité
          </NavLink>
          <span className="size-[4px] rounded-full bg-[#cbd5e1]" />
          <NavLink
            to="/conditions"
            className="font-medium text-[12px] tracking-[1.2px] uppercase text-white"
          >
            Conditions
          </NavLink>
        </div>
      </div>
    </div>
  );
}

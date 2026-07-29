import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import robotImage from "../../assets/login-robot.png";
import logo from "../../assets/company_logo_black.png";
import cardBackground from "../../assets/card-background.png";
import googleIcon from "../../assets/icons/google-icon.svg"; // adapte le nom si différent (.svg, etc.)

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to auth API (Rahma's endpoint)
    console.log({ email, password, rememberMe });
  };

  return (
    <div
      className="relative min-h-screen w-full bg-[#0b3f34] bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${robotImage})` }}
    >
      {/* Login card */}
      <div className="relative z-10 w-full max-w-[520px] mx-auto lg:ml-[10%] lg:mr-0 px-4">
        {/* Card background asset — locked to its native 688:898 aspect ratio so it never stretches */}
        <div className="relative w-full" style={{ aspectRatio: "688 / 898" }}>
          <img
            src={cardBackground}
            alt=""
            className="absolute inset-0 w-full h-full pointer-events-none select-none"
          />

          <form
            onSubmit={handleSubmit}
            className="relative z-10 h-full w-full flex flex-col items-center justify-center gap-[17px] px-[54px] py-[54px]"
          >
            {/* Logo */}
            <img
              alt="KonektUs"
              src={logo}
              className="h-[56px] w-[90px] object-contain"
            />

            {/* Header */}
            <div className="flex flex-col items-center gap-[5px] text-center w-full">
              <h1 className="font-semibold text-[19px] leading-[24px] text-[#0d5143]">
                Connexion à votre compte
              </h1>
              <p className="font-normal text-[13px] leading-[18px] text-[#696f6e]">
                Accédez à votre espace professionnel Konektus VTM
              </p>
            </div>

            {/* Fields */}
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
                  <Mail className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[#696f6e]" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full h-[46px] box-border bg-white/60 border border-[#bfc9c6] rounded-[10px] pl-[40px] pr-[14px] text-[13px] font-normal text-[#334155] placeholder:text-[#696f6e] focus:outline-none focus:ring-2 focus:ring-[#1eb394]/40"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-[46px] box-border bg-white/60 border border-[#bfc9c6] rounded-[10px] pl-[40px] pr-[40px] text-[13px] font-normal text-[#334155] placeholder:text-[#696f6e] focus:outline-none focus:ring-2 focus:ring-[#1eb394]/40"
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

              {/* Remember me / forgot password */}
              <div className="flex items-center justify-between w-full">
                <label className="flex items-center gap-[6px] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="size-[16px] rounded-[4px] border border-[#cbd5e1] bg-white/50 accent-[#1eb394]"
                  />
                  <span className="font-normal text-[12px] text-[#475569]">
                    Se souvenir de moi
                  </span>
                </label>
                <NavLink
                  to="/forgot-password"
                  className="font-medium text-[12px] text-[#1eb394] hover:underline"
                >
                  Mot de passe oublié?
                </NavLink>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full h-[46px] box-border bg-[#1eb394] hover:bg-[#0d5143] transition-colors rounded-[10px] font-semibold text-[14px] text-white"
              >
                Se connecter
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-[9px] w-full">
              <div className="flex-1 border-t border-[rgba(105,111,110,0.25)]" />
              <span className="font-medium text-[11px] tracking-[1.2px] uppercase text-[#696f6e] whitespace-nowrap">
                Ou
              </span>
              <div className="flex-1 border-t border-[rgba(105,111,110,0.25)]" />
            </div>

            {/* Google login */}
            <button
              type="button"
              className="w-full h-[46px] box-border bg-white/60 border border-[#e2e8f0] rounded-[10px] flex items-center justify-center gap-[9px] font-medium text-[13px] text-[#334155] px-[12px]"
            >
              <img
                src={googleIcon}
                alt=""
                className="w-[16px] h-[16px] shrink-0 object-contain"
              />
              <span className="truncate">Continuer avec Google</span>
            </button>

            {/* Footer link */}
            <p className="font-normal text-[12px] text-[#64748b] text-center">
              Vous n'avez pas de compte ?{" "}
              <NavLink
                to="/register"
                className="font-semibold text-[#1eb394] hover:underline"
              >
                Créer un compte
              </NavLink>
            </p>
          </form>
        </div>

        {/* Bottom links */}
        <div className="flex items-center justify-center gap-[24px] -mt-[15px]">
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

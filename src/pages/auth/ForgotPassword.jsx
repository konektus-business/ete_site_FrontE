import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Mail } from "lucide-react";
import robotImage from "../../assets/login-robot.png";
import logo from "../../assets/company_logo_black.png";
import cardBackground from "../../assets/card-background.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to auth API (Rahma's endpoint) — send reset link
    console.log({ email });
  };

  return (
    <div
      className="relative min-h-screen w-full bg-[#0b3f34] bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${robotImage})` }}
    >
      {/* Forgot password card */}
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
            className="relative z-10 h-full w-full flex flex-col px-[54px] py-[54px]"
          >
            {/* Logo + header, pinned to the top */}
            <div className="flex flex-col items-center gap-[17px] w-full">
              <img alt="KonektUs" src={logo} className="h-[56px] w-[90px] object-contain" />

              <div className="flex flex-col items-center gap-[5px] text-center w-full">
                <h1 className="font-bold text-[19px] leading-[24px] text-[#0d5143]">
                  Réinitialiser le mot de passe
                </h1>
                <p className="font-normal text-[13px] leading-[18px] text-[#696f6e]">
                  Saisissez votre adresse email pour recevoir un lien pour réinitialiser votre mot de passe.
                </p>
              </div>
            </div>

            {/* Email field + everything beneath it, perfectly centered in the card */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-[17px] px-[54px]">
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

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full h-[46px] box-border bg-[#1eb394] hover:bg-[#0d5143] transition-colors rounded-[10px] font-semibold text-[14px] text-white"
                >
                  Réinitialiser mon mot de passe
                </button>
              </div>

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
            </div>
          </form>
        </div>

        {/* Bottom links */}
        <div className="flex items-center justify-center gap-[24px] -mt-[22px]">
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
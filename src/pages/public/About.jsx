import { CheckCircle2 } from "lucide-react";

const values = [
  "Des interfaces claires pour les equipes non techniques.",
  "Une approche centree sur les workflows reels de l'entreprise.",
  "Des outils qui reduisent la dispersion entre CRM, support et facturation.",
];

export default function About() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
        <div>
          <span className="text-sm font-bold uppercase tracking-wider text-teal-700">
            A propos
          </span>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            Nous construisons des solutions numeriques utiles, simples et durables.
          </h1>
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-lg leading-8 text-slate-700">
            KoneKtUS est une entreprise specialisee dans le developpement de
            solutions numeriques pour aider les entreprises a mieux gerer leur
            relation client. Notre equipe combine expertise technique et
            connaissance du terrain pour livrer des outils simples et efficaces.
          </p>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            Notre mission : simplifier la gestion client, du premier contact
            jusqu'a la facturation.
          </p>

          <div className="mt-8 space-y-4">
            {values.map((value) => (
              <div key={value} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-teal-600" />
                <p className="text-sm font-medium leading-6 text-slate-700">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

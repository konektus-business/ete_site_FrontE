import { CircleDollarSign, Headphones, UsersRound } from "lucide-react";

const services = [
  {
    icon: UsersRound,
    title: "Gestion clients (CRM)",
    description: "Centralisez les profils clients, l'historique, les notes et les suivis commerciaux.",
    accent: "text-teal-600 bg-teal-50",
  },
  {
    icon: Headphones,
    title: "Support & tickets",
    description: "Priorisez les demandes, assignez les tickets et gardez une vision claire des urgences.",
    accent: "text-amber-600 bg-amber-50",
  },
  {
    icon: CircleDollarSign,
    title: "Facturation",
    description: "Creez, suivez et organisez vos factures sans multiplier les outils.",
    accent: "text-rose-600 bg-rose-50",
  },
];

export default function Services() {
  return (
    <section className="public-section services-page bg-white">
      <div className="public-container mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="section-heading max-w-2xl">
          <span className="section-kicker text-sm font-bold uppercase tracking-wider text-teal-700">
            Services
          </span>
          <h1 className="section-title mt-3 text-4xl font-black tracking-tight text-slate-950">
            Des outils simples pour gerer la relation client.
          </h1>
          <p className="section-description mt-4 text-lg leading-8 text-slate-600">
            KoneKtUS rassemble les operations importantes dans une interface
            claire pour aider votre equipe a travailler plus vite.
          </p>
        </div>

        <div className="services-grid mt-10 grid gap-6 md:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="service-card rounded-md border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-slate-900/10"
              >
                <span className={`service-card__icon inline-grid h-12 w-12 place-items-center rounded-md ${service.accent}`}>
                  <Icon size={24} />
                </span>
                <h2 className="service-card__title mt-5 text-xl font-black text-slate-950">
                  {service.title}
                </h2>
                <p className="service-card__text mt-3 text-sm leading-6 text-slate-600">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

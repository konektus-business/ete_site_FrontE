import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Le nom est requis.";
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Adresse email invalide.";
    }
    if (!form.message.trim()) newErrors.message = "Le message est requis.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:py-20">
        <div>
          <span className="text-sm font-bold uppercase tracking-wider text-teal-700">
            Contact
          </span>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            Parlons de votre prochain espace client.
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Une question, un projet ou une idee a cadrer ? Ecrivez-nous, nous
            revenons vers vous rapidement.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 p-4">
              <Mail className="h-5 w-5 text-teal-600" />
              <span className="text-sm font-semibold text-slate-700">contact@konektus.tech</span>
            </div>
            <div className="flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 p-4">
              <MapPin className="h-5 w-5 text-teal-600" />
              <span className="text-sm font-semibold text-slate-700">Tunis, Tunisie</span>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-md border border-slate-200 bg-slate-50 p-6 shadow-lg shadow-slate-900/5 sm:p-8"
        >
          <div className="grid gap-5">
            <Input
              label="Nom complet"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Votre nom"
              error={errors.name}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="vous@exemple.com"
              error={errors.email}
              required
            />
            <Input
              label="Message"
              name="message"
              as="textarea"
              rows={6}
              value={form.message}
              onChange={handleChange}
              placeholder="Decrivez votre demande..."
              error={errors.message}
              required
            />
          </div>

          <Button
            type="submit"
            variant="accent"
            size="lg"
            className="mt-6 w-full"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Envoi..." : "Envoyer le message"}
            <Send size={18} />
          </Button>

          {status === "success" && (
            <p className="mt-4 rounded-md bg-teal-50 px-4 py-3 text-sm font-medium text-teal-700">
              Message envoye avec succes. Merci !
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              Une erreur est survenue. Reessayez plus tard.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

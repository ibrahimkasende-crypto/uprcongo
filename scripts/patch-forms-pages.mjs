import fs from "fs";

function write(file, content) {
  fs.writeFileSync(file, content);
  console.log("wrote", file);
}

write("components/AdhesionForm.tsx", `"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";
import { COORDINATEUR_WHATSAPP, PROVINCES_RDC } from "@/lib/constants";
import { buildAdhesionMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const adhesionSchema = z.object({
  nom: z.string().min(2, "Le nom complet est requis"),
  sexe: z.string().min(1, "Veuillez sélectionner le sexe"),
  dateNaissance: z.string().min(1, "La date de naissance est requise"),
  province: z.string().min(1, "Veuillez sélectionner une province"),
  ville: z.string().min(2, "Ville requise"),
  quartier: z.string().min(2, "Quartier requis"),
  telephone: z.string().min(8, "Numéro de téléphone requis"),
  email: z.string().email("Adresse email invalide"),
  profession: z.string().min(2, "Profession requise"),
  niveauEtude: z.string().min(1, "Veuillez indiquer le niveau d'étude"),
  motivation: z.string().min(10, "Décrivez votre motivation (min. 10 caractères)"),
  consentement: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter d'être contacté par l'UPR",
  }),
});

type AdhesionFormValues = z.infer<typeof adhesionSchema>;

const NIVEAUX_ETUDE = [
  "Primaire",
  "Secondaire",
  "Graduat",
  "Licence",
  "Master",
  "Doctorat",
  "Autre",
];

export function AdhesionForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<AdhesionFormValues | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AdhesionFormValues>({
    resolver: zodResolver(adhesionSchema),
    defaultValues: {
      nom: "",
      sexe: "",
      dateNaissance: "",
      email: "",
      telephone: "",
      province: "",
      ville: "",
      quartier: "",
      profession: "",
      niveauEtude: "",
      motivation: "",
      consentement: false,
    },
  });

  const consentement = watch("consentement");
  const province = watch("province");
  const sexe = watch("sexe");
  const niveauEtude = watch("niveauEtude");

  const openWhatsApp = (data: AdhesionFormValues) => {
    const message = buildAdhesionMessage(data);
    const url = buildWhatsAppUrl(COORDINATEUR_WHATSAPP, message);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const onSubmit = (data: AdhesionFormValues) => {
    setFormData(data);
    setSubmitted(true);
  };

  if (submitted && formData) {
    return (
      <div className="glass-strong space-y-5 rounded-2xl p-6 text-center md:p-8">
        <CheckCircle2 className="mx-auto h-16 w-16 text-upr-gold" />
        <h3 className="text-xl font-bold text-upr-navy dark:text-white">Demande d&apos;adhésion enregistrée</h3>
        <p className="text-muted-foreground">
          Merci {formData.nom.split(" ")[0]}. Votre demande a été préparée. Un responsable de l&apos;UPR vous contactera
          pour finaliser votre adhésion.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            variant="gold"
            onClick={() => {
              setSubmitted(false);
              setFormData(null);
              reset();
            }}
          >
            Nouvelle demande
          </Button>
          <Button variant="secondary" onClick={() => openWhatsApp(formData)}>
            Contacter directement sur WhatsApp
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-strong space-y-5 rounded-2xl p-6 md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="nom">Nom complet</Label>
          <Input id="nom" autoComplete="name" {...register("nom")} />
          {errors.nom && <p className="text-sm text-upr-red">{errors.nom.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="sexe">Sexe</Label>
          <Select value={sexe} onValueChange={(value) => setValue("sexe", value, { shouldValidate: true })}>
            <SelectTrigger id="sexe">
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Masculin">Masculin</SelectItem>
              <SelectItem value="Féminin">Féminin</SelectItem>
            </SelectContent>
          </Select>
          {errors.sexe && <p className="text-sm text-upr-red">{errors.sexe.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateNaissance">Date de naissance</Label>
          <Input id="dateNaissance" type="date" {...register("dateNaissance")} />
          {errors.dateNaissance && <p className="text-sm text-upr-red">{errors.dateNaissance.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="province">Province</Label>
          <Select value={province} onValueChange={(value) => setValue("province", value, { shouldValidate: true })}>
            <SelectTrigger id="province">
              <SelectValue placeholder="Sélectionnez une province" />
            </SelectTrigger>
            <SelectContent>
              {PROVINCES_RDC.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.province && <p className="text-sm text-upr-red">{errors.province.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="ville">Ville / Commune</Label>
          <Input id="ville" {...register("ville")} />
          {errors.ville && <p className="text-sm text-upr-red">{errors.ville.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="quartier">Quartier</Label>
          <Input id="quartier" {...register("quartier")} />
          {errors.quartier && <p className="text-sm text-upr-red">{errors.quartier.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="telephone">Téléphone</Label>
          <Input id="telephone" type="tel" autoComplete="tel" {...register("telephone")} />
          {errors.telephone && <p className="text-sm text-upr-red">{errors.telephone.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Adresse email</Label>
          <Input id="email" type="email" autoComplete="email" {...register("email")} />
          {errors.email && <p className="text-sm text-upr-red">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="profession">Profession</Label>
          <Input id="profession" {...register("profession")} />
          {errors.profession && <p className="text-sm text-upr-red">{errors.profession.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="niveauEtude">Niveau d&apos;étude</Label>
          <Select
            value={niveauEtude}
            onValueChange={(value) => setValue("niveauEtude", value, { shouldValidate: true })}
          >
            <SelectTrigger id="niveauEtude">
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              {NIVEAUX_ETUDE.map((n) => (
                <SelectItem key={n} value={n}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.niveauEtude && <p className="text-sm text-upr-red">{errors.niveauEtude.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="motivation">Motivation</Label>
        <Textarea id="motivation" rows={5} {...register("motivation")} />
        {errors.motivation && <p className="text-sm text-upr-red">{errors.motivation.message}</p>}
      </div>

      <div className="flex items-start gap-3 rounded-xl bg-upr-blue/5 p-4 dark:bg-white/5">
        <Checkbox
          id="consentement"
          checked={consentement}
          onCheckedChange={(checked) => setValue("consentement", checked === true, { shouldValidate: true })}
        />
        <Label htmlFor="consentement" className="cursor-pointer text-sm leading-relaxed">
          J&apos;accepte d&apos;être contacté par l&apos;UPR pour finaliser mon adhésion.
        </Label>
      </div>
      {errors.consentement && <p className="text-sm text-upr-red">{errors.consentement.message}</p>}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" variant="gold" className="flex-1" disabled={isSubmitting}>
          Soumettre ma demande
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="flex-1"
          onClick={handleSubmit(openWhatsApp)}
        >
          Contacter directement sur WhatsApp
        </Button>
      </div>
    </form>
  );
}
`);

write("components/ContactForm.tsx", `"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle } from "lucide-react";
import { CONTACT } from "@/lib/constants";

const contactSchema = z.object({
  nom: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Adresse email invalide"),
  sujet: z.string().min(1, "Veuillez sélectionner un sujet"),
  message: z.string().min(10, "Message requis (min. 10 caractères)"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const SUBJECTS = [
  "Information générale",
  "Adhésion",
  "Presse et médias",
  "Partenariat",
  "Autre",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { nom: "", email: "", sujet: "", message: "" },
  });

  const sujet = watch("sujet");

  const onSubmit = () => {
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div className="glass-strong flex flex-col items-center gap-4 rounded-2xl p-8 text-center">
        <AlertCircle className="h-16 w-16 text-upr-gold" />
        <h3 className="text-xl font-bold text-upr-navy dark:text-white">Aucun envoi automatique disponible</h3>
        <p className="max-w-lg text-muted-foreground">
          Ce formulaire ne dispose pas encore de backend. Pour une réponse officielle, contactez l&apos;UPR directement
          par email à{" "}
          <a href={\`mailto:\${CONTACT.emails[0]}\`} className="font-semibold text-upr-blue hover:underline">
            {CONTACT.emails[0]}
          </a>{" "}
          ou via le{" "}
          <a
            href={CONTACT.whatsappChannel}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-upr-blue hover:underline"
          >
            canal WhatsApp officiel
          </a>
          .
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Retour au formulaire
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-strong space-y-5 rounded-2xl p-6 md:p-8">
      <div className="space-y-2">
        <Label htmlFor="contact-nom">Nom complet</Label>
        <Input id="contact-nom" autoComplete="name" {...register("nom")} />
        {errors.nom && <p className="text-sm text-upr-red">{errors.nom.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-email">Adresse email</Label>
        <Input id="contact-email" type="email" autoComplete="email" {...register("email")} />
        {errors.email && <p className="text-sm text-upr-red">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-sujet">Sujet</Label>
        <Select value={sujet} onValueChange={(value) => setValue("sujet", value, { shouldValidate: true })}>
          <SelectTrigger id="contact-sujet">
            <SelectValue placeholder="Sélectionnez un sujet" />
          </SelectTrigger>
          <SelectContent>
            {SUBJECTS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.sujet && <p className="text-sm text-upr-red">{errors.sujet.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea id="contact-message" rows={5} {...register("message")} />
        {errors.message && <p className="text-sm text-upr-red">{errors.message.message}</p>}
      </div>

      <Button type="submit" className="w-full">
        Envoyer le message
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Ce formulaire ne transmet pas automatiquement votre message. Utilisez les coordonnées officielles pour une réponse garantie.
      </p>
    </form>
  );
}
`);

write("app/page.tsx", `import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { ValuesSection } from "@/components/ValuesSection";
import { PresidentSection } from "@/components/PresidentSection";
import { VisionSection } from "@/components/VisionSection";
import { StatsSection } from "@/components/StatsSection";
import { ProjectAxes } from "@/components/ProjectAxes";
import { NewsCard } from "@/components/NewsCard";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { NEWS } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ValuesSection />
      <PresidentSection />
      <VisionSection />
      <StatsSection />
      <ProjectAxes />

      <section className="section-padding bg-white dark:bg-upr-dark/50">
        <div className="container-upr">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <SectionTitle eyebrow="Vie du parti" title="Actualités de l'UPR" className="mb-0" />
            <Link
              href="/actualites/"
              className="text-sm font-semibold text-upr-blue transition-colors hover:text-upr-red dark:text-upr-gold"
            >
              Toutes les actualités →
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {NEWS.map((news, i) => (
              <NewsCard
                key={news.slug}
                title={news.title}
                excerpt={news.excerpt}
                date={news.date}
                category={news.category}
                image={news.image}
                imageAlt={news.imageAlt}
                slug={news.slug}
                featured={news.featured}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="hero-bg section-padding">
        <div className="container-upr text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Rejoindre l&apos;UPR</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/85">
            Rejoignez un mouvement patriotique et républicain engagé pour servir le Congo sans se servir.
          </p>
          <Button asChild variant="gold" size="lg">
            <Link href="/adhesion/">Devenir membre</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
`);

let layout = fs.readFileSync("app/layout.tsx", "utf8");
layout = layout.replace(
  '<ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>',
  '<ThemeProvider attribute="class" defaultTheme="light" enableSystem>'
);
fs.writeFileSync("app/layout.tsx", layout);
console.log("updated app/layout.tsx");

write("app/actualites/page.tsx", `import type { Metadata } from "next";
import { NewsList } from "@/components/NewsList";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "Actualités officielles de l'UPR - Union des Patriotes pour la République. Mobilisation, déclarations et vie du parti.",
};

export default function ActualitesPage() {
  return (
    <>
      <section className="hero-bg section-padding">
        <div className="container-upr">
          <p className="eyebrow mb-3 text-upr-gold">Vie du parti</p>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Actualités de l&apos;UPR</h1>
          <p className="max-w-3xl text-lg text-white/85">
            Suivez les prises de position, mobilisations et annonces officielles de l&apos;Union des Patriotes pour la République.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-upr">
          <SectionTitle eyebrow="Dernières nouvelles" title="Publications récentes" />
          <NewsList />
        </div>
      </section>
    </>
  );
}
`);
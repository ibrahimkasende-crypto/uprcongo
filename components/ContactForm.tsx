"use client";

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
          <a href={`mailto:${CONTACT.emails[0]}`} className="font-semibold text-upr-blue hover:underline">
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

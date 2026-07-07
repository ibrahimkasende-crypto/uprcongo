"use client";

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

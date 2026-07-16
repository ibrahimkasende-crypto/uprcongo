"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ARTICLE_CATEGORIES, slugify, type Article } from "@/lib/articles";
import { supabase } from "@/lib/supabase/client";

const schema = z.object({
  title: z.string().min(4, "Le titre doit contenir au moins 4 caractères."),
  slug: z
    .string()
    .min(3, "Le slug est requis.")
    .regex(/^[a-z0-9-]+$/, "Utilisez seulement des minuscules, chiffres et tirets."),
  category: z.string().min(1),
  excerpt: z.string().min(10, "Le résumé doit contenir au moins 10 caractères."),
  content: z.string().min(20, "Le contenu doit contenir au moins 20 caractères."),
  image_alt: z.string().optional(),
  status: z.enum(["draft", "published"]),
  featured: z.boolean(),
  published_at: z.string().optional(),
});

type Values = z.infer<typeof schema>;

export function ArticleForm({ article }: { article?: Article }) {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: article?.title || "",
      slug: article?.slug || "",
      category: article?.category || ARTICLE_CATEGORIES[0],
      excerpt: article?.excerpt || "",
      content: article?.content || "",
      image_alt: article?.image_alt || "",
      status: article?.status || "draft",
      featured: article?.featured || false,
      published_at: article?.published_at ? article.published_at.slice(0, 16) : "",
    },
  });

  const status = watch("status");

  const uploadImage = async () => {
    if (!image) return article?.image_url || null;
    const extension = image.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from("article-images").upload(path, image, {
      upsert: false,
      contentType: image.type,
    });
    if (error) throw error;
    return supabase.storage.from("article-images").getPublicUrl(path).data.publicUrl;
  };

  const submit = async (values: Values) => {
    setSaving(true);
    setMessage("");
    try {
      const { data: userData } = await supabase.auth.getUser();
      const image_url = await uploadImage();
      const published_at =
        values.status === "published"
          ? values.published_at
            ? new Date(values.published_at).toISOString()
            : new Date().toISOString()
          : null;
      const payload = {
        ...values,
        image_url,
        published_at,
        author_email: article?.author_email || userData.user?.email || null,
      };
      const result = article
        ? await supabase.from("articles").update(payload).eq("id", article.id)
        : await supabase.from("articles").insert(payload);
      if (result.error) throw result.error;
      router.push("/admin/articles/");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "La sauvegarde a échoué.");
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!article) return;
    if (!confirm(`Supprimer définitivement « ${article.title} » ?`)) return;
    const { error } = await supabase.from("articles").delete().eq("id", article.id);
    if (error) {
      setMessage(error.message);
      return;
    }
    router.push("/admin/articles/");
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5 rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Titre" error={errors.title?.message}>
          <input
            {...register("title", {
              onChange: (event) => {
                if (!article) setValue("slug", slugify(event.target.value));
              },
            })}
            className="admin-input"
          />
        </Field>
        <Field label="Slug" error={errors.slug?.message}>
          <input {...register("slug")} className="admin-input" />
        </Field>
        <Field label="Catégorie">
          <select {...register("category")} className="admin-input">
            {ARTICLE_CATEGORIES.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </Field>
        <Field label="Statut">
          <select {...register("status")} className="admin-input">
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
          </select>
        </Field>
      </div>

      <Field label="Image principale">
        <input
          type="file"
          accept="image/*"
          onChange={(event) => setImage(event.target.files?.[0] || null)}
          className="block w-full text-sm text-white/80"
        />
        {article?.image_url && (
          <p className="mt-1 text-xs text-white/60">
            Une image est déjà associée. Sélectionnez-en une nouvelle pour la remplacer.
          </p>
        )}
      </Field>

      <Field label="Texte alternatif de l’image">
        <input {...register("image_alt")} className="admin-input" />
      </Field>

      <Field label="Résumé court" error={errors.excerpt?.message}>
        <textarea {...register("excerpt")} rows={3} className="admin-input" />
      </Field>

      <Field label="Contenu complet" error={errors.content?.message}>
        <textarea
          {...register("content")}
          rows={14}
          className="admin-input"
          placeholder="Vous pouvez utiliser du Markdown simple."
        />
      </Field>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Date de publication">
          <input
            type="datetime-local"
            disabled={status !== "published"}
            {...register("published_at")}
            className="admin-input disabled:opacity-50"
          />
        </Field>
        <label className="flex items-center gap-3 self-end rounded-lg border border-white/15 p-3">
          <input type="checkbox" {...register("featured")} />
          Article à la une
        </label>
      </div>

      {message && <p role="alert" className="rounded-lg bg-upr-red/20 p-3 text-sm text-red-100">{message}</p>}

      <div className="flex flex-wrap gap-3">
        <button
          disabled={saving}
          className="rounded-lg bg-upr-gold px-5 py-3 font-bold text-upr-navy disabled:opacity-60"
        >
          {saving ? "Sauvegarde…" : "Enregistrer"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-white/20 px-5 py-3 font-semibold"
        >
          Retour
        </button>
        {article && (
          <button
            type="button"
            onClick={() => void remove()}
            className="rounded-lg border border-red-400/40 px-5 py-3 font-semibold text-red-300"
          >
            Supprimer
          </button>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <span className="mt-2 block">{children}</span>
      {error && <span className="mt-1 block text-xs text-red-300">{error}</span>}
    </label>
  );
}

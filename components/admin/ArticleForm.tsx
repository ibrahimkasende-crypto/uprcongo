"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  Bold,
  Eye,
  Heading2,
  ImagePlus,
  Link as LinkIcon,
  List,
  Quote,
  Save,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { MarkdownContent } from "@/components/MarkdownContent";
import { ARTICLE_CATEGORIES, slugify, type Article } from "@/lib/articles";
import { supabase } from "@/lib/supabase/client";

const schema = z.object({
  title: z.string().min(4, "Le titre est obligatoire (min. 4 caractères)."),
  slug: z
    .string()
    .min(3, "Le slug est obligatoire.")
    .regex(/^[a-z0-9-]+$/, "Utilisez seulement des minuscules, chiffres et tirets."),
  category: z.string().min(1, "La catégorie est obligatoire."),
  excerpt: z.string().min(10, "Le résumé est obligatoire (min. 10 caractères)."),
  content: z.string().min(20, "Le contenu est obligatoire (min. 20 caractères)."),
  image_alt: z.string().optional(),
  status: z.enum(["draft", "published"]),
  featured: z.boolean(),
  published_at: z.string().optional(),
});

type Values = z.infer<typeof schema>;

export function ArticleForm({ article }: { article?: Article }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(article?.image_url || null);
  const [removeExistingImage, setRemoveExistingImage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

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
  const content = watch("content");
  const { ref: contentRegisterRef, ...contentRegister } = register("content");

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const pickImage = (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setMessageType("error");
      setMessage("Erreur pendant l’upload de l’image. Choisissez un fichier image.");
      return;
    }
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setImageFile(file);
    setRemoveExistingImage(false);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const clearImage = () => {
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setImageFile(null);
    setPreviewUrl(null);
    setRemoveExistingImage(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const uploadImage = async () => {
    if (!imageFile) {
      if (removeExistingImage) return null;
      return article?.image_url || null;
    }
    setUploading(true);
    const extension = imageFile.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from("article-images").upload(path, imageFile, {
      upsert: false,
      contentType: imageFile.type,
    });
    setUploading(false);
    if (error) throw new Error("Erreur pendant l’upload de l’image.");
    return supabase.storage.from("article-images").getPublicUrl(path).data.publicUrl;
  };

  const insertMarkdown = (before: string, after = "", placeholder = "") => {
    const el = contentRef.current;
    if (!el) {
      setValue("content", `${content}${before}${placeholder}${after}`);
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = content.slice(start, end) || placeholder;
    const next = `${content.slice(0, start)}${before}${selected}${after}${content.slice(end)}`;
    setValue("content", next, { shouldValidate: true });
    requestAnimationFrame(() => {
      el.focus();
      const cursor = start + before.length + selected.length + after.length;
      el.setSelectionRange(cursor, cursor);
    });
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
        image_alt: values.image_alt || values.title,
        published_at,
        author_email: article?.author_email || userData.user?.email || null,
      };
      const result = article
        ? await supabase.from("articles").update(payload).eq("id", article.id)
        : await supabase.from("articles").insert(payload);
      if (result.error) throw result.error;
      setMessageType("success");
      setMessage(
        values.status === "published"
          ? article
            ? "Article modifié avec succès."
            : "Article publié avec succès."
          : "Brouillon enregistré."
      );
      setTimeout(() => router.push("/admin/articles/"), 700);
    } catch (error) {
      setMessageType("error");
      setMessage(error instanceof Error ? error.message : "Erreur de connexion Supabase.");
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!article) return;
    setDeleting(true);
    const { error } = await supabase.from("articles").delete().eq("id", article.id);
    setDeleting(false);
    setConfirmDelete(false);
    if (error) {
      setMessageType("error");
      setMessage(error.message);
      return;
    }
    router.push("/admin/articles/");
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className="space-y-6 rounded-xl border border-white/10 bg-white/5 p-5">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Titre *" error={errors.title?.message}>
            <input
              {...register("title", {
                onChange: (event) => {
                  if (!article) setValue("slug", slugify(event.target.value));
                },
              })}
              className="admin-input"
              placeholder="Titre de l’article officiel"
            />
          </Field>
          <Field label="Slug *" error={errors.slug?.message}>
            <input {...register("slug")} className="admin-input" />
          </Field>
          <Field label="Catégorie *" error={errors.category?.message}>
            <select {...register("category")} className="admin-input">
              {ARTICLE_CATEGORIES.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </Field>
          <Field label="Statut *">
            <select {...register("status")} className="admin-input">
              <option value="draft">Brouillon</option>
              <option value="published">Publié</option>
            </select>
          </Field>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Image principale</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(event) => pickImage(event.target.files?.[0])}
          />
          {!previewUrl ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/25 bg-black/20 px-6 py-12 text-center transition hover:border-upr-gold hover:bg-upr-gold/5"
            >
              <UploadCloud className="h-10 w-10 text-upr-gold" />
              <div>
                <p className="font-semibold">Cliquez pour choisir une image</p>
                <p className="mt-1 text-sm text-white/55">PNG, JPG, WEBP — recommandé : 1200 x 700 px</p>
              </div>
              <span className="mt-2 inline-flex items-center gap-2 rounded-lg bg-upr-gold px-4 py-2 text-sm font-bold text-upr-navy">
                <ImagePlus className="h-4 w-4" />
                Choisir une image
              </span>
            </button>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-white/15">
              <div className="relative aspect-[16/9] bg-black/40">
                <Image src={previewUrl} alt="Aperçu" fill className="object-cover" unoptimized={previewUrl.startsWith("blob:")} />
              </div>
              <div className="flex flex-wrap gap-2 p-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-lg border border-white/20 px-3 py-2 text-sm font-semibold hover:bg-white/10"
                >
                  Changer l’image
                </button>
                <button
                  type="button"
                  onClick={clearImage}
                  className="inline-flex items-center gap-1 rounded-lg border border-red-400/30 px-3 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/10"
                >
                  <X className="h-4 w-4" />
                  Retirer l’image
                </button>
              </div>
            </div>
          )}
          {uploading && <p className="mt-2 text-sm text-upr-gold">Upload de l’image en cours…</p>}
        </div>

        <Field label="Texte alternatif de l’image">
          <input {...register("image_alt")} className="admin-input" placeholder="Description de l’image" />
        </Field>

        <Field label="Résumé court *" error={errors.excerpt?.message}>
          <textarea {...register("excerpt")} rows={3} className="admin-input" placeholder="Résumé visible sur la page Actualités" />
        </Field>

        <div>
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-medium">Contenu complet *</p>
            <button
              type="button"
              onClick={() => setShowPreview((value) => !value)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-upr-gold"
            >
              <Eye className="h-4 w-4" />
              {showPreview ? "Masquer l’aperçu" : "Aperçu"}
            </button>
          </div>
          <div className="mb-2 flex flex-wrap gap-1 rounded-lg border border-white/10 bg-black/20 p-2">
            <ToolbarButton label="Titre" onClick={() => insertMarkdown("\n## ", "\n", "Titre")}>
              <Heading2 className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton label="Gras" onClick={() => insertMarkdown("**", "**", "texte")}>
              <Bold className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton label="Liste" onClick={() => insertMarkdown("\n- ", "\n", "élément")}>
              <List className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton label="Citation" onClick={() => insertMarkdown("\n> ", "\n", "citation")}>
              <Quote className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton label="Lien" onClick={() => insertMarkdown("[", "](https://)", "texte du lien")}>
              <LinkIcon className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton label="Image" onClick={() => insertMarkdown("\n![", "](/chemin/image.jpg)\n", "légende")}>
              <ImagePlus className="h-4 w-4" />
            </ToolbarButton>
          </div>
          <textarea
            {...contentRegister}
            ref={(element) => {
              contentRegisterRef(element);
              contentRef.current = element;
            }}
            rows={14}
            className="admin-input"
            placeholder="Rédigez ici le contenu complet de l’article officiel…"
          />
          {errors.content?.message && <p className="mt-1 text-xs text-red-300">{errors.content.message}</p>}
          {showPreview && (
            <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-upr-gold">Aperçu</p>
              <MarkdownContent markdown={content || "_Aucun contenu_"} className="prose-invert space-y-3 text-sm text-white/80" />
            </div>
          )}
        </div>

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

        {message && (
          <p
            role="status"
            className={`rounded-lg p-3 text-sm ${
              messageType === "error" ? "bg-upr-red/20 text-red-100" : "bg-green-500/20 text-green-100"
            }`}
          >
            {message}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            disabled={saving || uploading}
            className="inline-flex items-center gap-2 rounded-lg bg-upr-gold px-5 py-3 font-bold text-upr-navy disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {saving ? "Sauvegarde…" : article ? "Enregistrer les modifications" : "Enregistrer"}
          </button>
          {article?.status === "published" && (
            <Link
              href={`/actualites/article/?slug=${encodeURIComponent(article.slug)}`}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 font-semibold"
            >
              <Eye className="h-4 w-4" />
              Voir l’article
            </Link>
          )}
          <Link
            href="/admin/articles/"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux articles
          </Link>
          {article && (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-red-400/40 px-5 py-3 font-semibold text-red-300"
            >
              <Trash2 className="h-4 w-4" />
              Supprimer
            </button>
          )}
        </div>
      </form>

      <ConfirmDialog
        open={confirmDelete}
        title="Supprimer cet article ?"
        description="Voulez-vous vraiment supprimer cet article ? Cette action est irréversible."
        loading={deleting}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={() => void remove()}
      />
    </>
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

function ToolbarButton({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className="rounded-md p-2 text-white/80 hover:bg-white/10 hover:text-upr-gold"
    >
      {children}
    </button>
  );
}

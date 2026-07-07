"use client";

import { useState } from "react";
import { FounderDocumentCard } from "@/components/FounderDocumentCard";
import { SectionTitle } from "@/components/SectionTitle";
import { FOUNDING_DOCUMENTS } from "@/lib/constants";

export function FoundingDocumentsSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <section className="section-padding">
      <div className="container-upr">
        <SectionTitle eyebrow="Documents institutionnels" title="Projet de société et textes fondateurs" />
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {FOUNDING_DOCUMENTS.map((doc, i) => (
            <FounderDocumentCard
              key={doc.id}
              id={doc.id}
              title={doc.title}
              date={doc.date}
              excerpt={doc.excerpt}
              image={doc.image}
              imageAlt={doc.imageAlt}
              fullContent={doc.fullContent}
              isExpanded={expandedId === doc.id}
              onToggle={() => handleToggle(doc.id)}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
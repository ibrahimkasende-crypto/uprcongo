import Image from "next/image";
import { SectionTitle } from "@/components/SectionTitle";
import { RDC_CITIES_STRIP } from "@/lib/constants";

function CityCard({ label, src, alt }: { label: string; src: string; alt: string }) {
  return (
    <div className="territory-city-card relative snap-start">
      <Image
        src={src}
        alt={alt}
        width={384}
        height={224}
        className="h-full w-full object-cover"
        sizes="(max-width: 768px) 288px, 384px"
        loading="lazy"
      />
      <span className="absolute bottom-3 left-3 rounded-full bg-black/65 px-3 py-1 text-sm font-semibold text-white">
        {label}
      </span>
    </div>
  );
}

export function RdcTerritoryStrip() {
  const loop = [...RDC_CITIES_STRIP, ...RDC_CITIES_STRIP];

  return (
    <section className="section-padding overflow-hidden">
      <div className="container-upr mb-8">
        <SectionTitle
          eyebrow="Territoire national"
          title="Kinshasa, Kisangani, Goma et Lubumbashi"
          align="center"
        />
      </div>
      <div className="territory-strip-mask overflow-hidden">
        <div className="territory-marquee">
          {loop.map((city, index) => (
            <CityCard key={`${city.label}-${index}`} label={city.label} src={city.src} alt={city.alt} />
          ))}
        </div>
      </div>
    </section>
  );
}
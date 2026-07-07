import Link from "next/link";
import Image from "next/image";
import { CONTACT, NAVIGATION, PARTY } from "@/lib/constants";

export function Footer() {
  const quickLinks = NAVIGATION.filter((item) => item.href !== "/");

  return (
    <footer className="border-t border-upr-blue/10 bg-upr-navy text-white">
      <div className="container-upr grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Image src={PARTY.logoWhite} alt={PARTY.logoAlt} width={72} height={72} />
          <h2 className="text-2xl font-bold">{PARTY.name}</h2>
          <p className="text-sm text-white/80">{PARTY.fullName}</p>
          <p className="gradient-text text-lg font-bold">{PARTY.motto}</p>
          <p className="text-sm italic text-upr-gold">{PARTY.slogan}</p>
          <p className="text-sm font-semibold text-white">{PARTY.officialMessage}</p>
          <p className="text-sm font-medium text-upr-yellow">{PARTY.rallyingCall}</p>
        </div>

        <nav aria-label="Liens rapides" className="space-y-4">
          <h2 className="text-lg font-semibold text-upr-gold">Liens rapides</h2>
          <div className="flex flex-col gap-2">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/80 transition-colors hover:text-upr-gold"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-upr-gold">Contacts</h2>
          {CONTACT.emails.map((email) => (
            <a
              key={email}
              href={`mailto:${email}`}
              className="block text-sm text-white/80 transition-colors hover:text-upr-gold"
            >
              {email}
            </a>
          ))}
          <p className="text-sm text-white/80">{CONTACT.location}</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-upr-gold">Réseaux</h2>
          <a
            href={CONTACT.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-white/80 transition-colors hover:text-upr-gold"
          >
            Facebook
          </a>
          <a
            href={CONTACT.whatsappChannel}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-white/80 transition-colors hover:text-upr-gold"
          >
            WhatsApp
          </a>
          <Link href="/contact/" className="block text-sm text-white/80 transition-colors hover:text-upr-gold">
            Mentions légales
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-sm text-white/60">
        © {new Date().getFullYear()} {PARTY.fullName}. Tous droits réservés.
      </div>
    </footer>
  );
}


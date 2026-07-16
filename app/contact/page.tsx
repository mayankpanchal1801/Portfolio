import ContactPageView from "@/components/pages/ContactPage";
import { contact, site } from "@/constants/personal";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Contact",
  description:
    `Get in touch with ${site.name}. Available for freelance and full-time frontend roles. Email ${contact.email}, phone ${contact.phone}, based in ${contact.city}, ${contact.country}.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact — ${site.name}`,
    description: `Available for frontend and full-stack engineering roles. Based in ${contact.city}, India — happy to work remote.`,
    url: `${site.url}/contact`,
    type: "website",
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: `Contact — ${site.name}` }],
  },
};

const contactLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${site.url}/contact#page`,
  url: `${site.url}/contact`,
  name: `Contact — ${site.name}`,
  mainEntity: { "@id": `${site.url}/#person` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Contact", item: `${site.url}/contact` },
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactPageView />
      <Script
        id="ld-contact"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactLd) }}
      />
    </>
  );
}

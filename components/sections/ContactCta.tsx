import Reveal from "@/components/primitives/Reveal";
import { contact } from "@/constants/personal";
import Link from "next/link";

type Props = { index?: string; headingId?: string };

export default function ContactCta({
  index = "05",
  headingId = "contact-cta-heading",
}: Props) {
  return (
    <section className="band shell" aria-labelledby={headingId}>
      <div className="grid-12 items-end gap-y-10 border-t border-rule pt-10">
        <div className="col-span-12 lg:col-span-8">
          <div className="flex items-baseline gap-3">
            <span className="marginal text-accent-ink">{index}</span>
            <span className="marginal">Contact</span>
          </div>

          <Reveal
            as="h2"
            id={headingId}
            mode="words"
            className="mt-6 font-display text-d1 text-ink"
          >
            Have a project, a role, or just a question?
          </Reveal>

          <Reveal as="p" mode="fade" delay={0.12} className="measure mt-6 text-lede text-ink-2">
            Email is fastest. Based in {contact.city} - happy to work remote with
            teams anywhere.
          </Reveal>
        </div>

        <div className="col-span-12 flex flex-col items-start gap-4 lg:col-span-4">
          <Link href="/contact" className="btn btn-solid">
            Start a conversation
          </Link>
          <a href={`mailto:${contact.email}`} className="uline font-display text-ink">
            {contact.email}
          </a>
          {contact.phone && (
            <a href={contact.phoneHref} className="font-mono text-sm text-ink-3">
              {contact.phone}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

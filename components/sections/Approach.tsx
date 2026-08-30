import Reveal from "@/components/primitives/Reveal";
import SectionHead from "@/components/primitives/SectionHead";
import { about } from "@/constants/personal";
import Link from "next/link";

export default function Approach() {
  return (
    <section id="approach" className="band bg-paper-2" aria-labelledby="approach-heading">
      <div className="shell">
        <SectionHead
          index="02"
          label="Approach"
          headingId="approach-heading"
          title={about.headline}
        />

        <div className="grid-12 mt-14 md:mt-20">
          <div className="col-span-12 space-y-6 text-ink-2 lg:col-span-6">
            <Reveal mode="fade" className="text-lede text-ink">
              {about.bio[0]}
            </Reveal>
            <Reveal mode="fade" delay={0.06}>
              {about.bio[1]}
            </Reveal>
            <Reveal mode="fade" delay={0.12}>
              {about.bio[3]}
            </Reveal>

            <Reveal mode="fade" delay={0.18} className="pt-2">
              <Link href="/about" className="uline text-accent-ink">
                Read the full story
              </Link>
            </Reveal>
          </div>

          <ol className="col-span-12 mt-12 lg:col-span-5 lg:col-start-8 lg:mt-0">
            {about.values.map((v, i) => (
              <Reveal
                as="li"
                key={v.title}
                mode="fade"
                delay={i * 0.06}
                className="border-t border-rule py-5 last:border-b"
              >
                <div className="flex items-baseline gap-4">
                  <span className="marginal text-accent-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-ink">{v.title}</h3>
                    <p className="mt-2 text-sm text-ink-2">{v.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

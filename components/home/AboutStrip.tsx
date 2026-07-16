"use client";

import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { about } from "@/constants/personal";
import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";

export default function AboutStrip() {
  const statsRef = useRef<HTMLDListElement>(null);

  useGSAP(() => {
    const el = statsRef.current;
    if (!el) return;
    const numbers = el.querySelectorAll<HTMLElement>("[data-stat-value]");
    numbers.forEach((n) => {
      const target = n.dataset.statValue ?? "";
      const numeric = parseFloat(target.replace(/[^\d.]/g, ""));
      if (isNaN(numeric)) return;
      const suffix = target.replace(/[\d.]/g, "");
      const obj = { v: 0 };
      gsap.to(obj, {
        v: numeric,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: { trigger: n, start: "top 90%", toggleActions: "play none none reset" },
        onUpdate: () => {
          const val = numeric >= 100 ? Math.floor(obj.v) : Number(obj.v.toFixed(1));
          n.textContent = `${val}${suffix}`;
        },
      });
    });
  }, []);

  return (
    <section id="about" className="section relative bg-char" aria-labelledby="about-heading">
      <span className="ghost-num right-[-3rem] top-8">03</span>

      <div className="container relative z-10">
        <SectionHeading number="03" eyebrow="About" title={about.headline} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7 space-y-6 text-pearl">
            <Reveal mode="fade" className="text-lede text-bone">
              {about.bio[0]}
            </Reveal>
            <Reveal mode="fade" delay={0.08}>{about.bio[1]}</Reveal>
            <Reveal mode="fade" delay={0.16}>{about.bio[2]}</Reveal>

            <Link href="/about" className="inline-block mt-4 link-underline text-acid" data-cursor="hover">
              Read the full story
            </Link>
          </div>

          <aside className="lg:col-span-5">
            <dl ref={statsRef} className="grid grid-cols-2 gap-6">
              {about.stats.map((s) => (
                <div key={s.label} className="border-t border-fog pt-4">
                  <dt className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ash">
                    {s.label}
                  </dt>
                  <dd
                    data-stat-value={s.value}
                    className="font-serif text-4xl md:text-6xl text-bone mt-1 tabular-nums"
                  >
                    0
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="mt-10 space-y-5">
              {about.values.map((v) => (
                <li key={v.title} className="border-t border-fog pt-4">
                  <p className="font-serif italic-wonk text-xl text-acid">{v.title}</p>
                  <p className="text-sm text-pearl mt-1">{v.body}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

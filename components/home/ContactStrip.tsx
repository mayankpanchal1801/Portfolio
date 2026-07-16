"use client";

import { contact } from "@/constants/personal";
import { gsap } from "@/lib/gsap-config";
import { splitText } from "@/lib/text-splitter";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";
import { BsArrowUpRight } from "react-icons/bs";

export default function ContactStrip() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const h = headingRef.current;
    if (!h) return;
    const words = splitText(h, "words");
    gsap.from(words, {
      yPercent: 110,
      duration: 1,
      stagger: 0.06,
      ease: "expo.out",
      scrollTrigger: { trigger: h, start: "top 82%", toggleActions: "play none none reverse" },
    });
  }, []);

  return (
    <section id="contact-cta" className="section relative" aria-labelledby="contact-heading">
      <span className="ghost-num left-[-4rem] top-6">06</span>

      <div className="container relative z-10">
        <div className="rule mb-14" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow eyebrow--acid mb-6">06 · Contact</p>
            <h2 ref={headingRef} id="contact-heading" className="font-serif text-h2 text-bone max-w-3xl">
              Have a project, a role, or just a question?{" "}
              <em className="italic-wonk text-acid">Let&rsquo;s talk.</em>
            </h2>
            <p className="mt-6 max-w-measure text-pearl text-lede">
              Fastest way to reach me is email. Based in {contact.city} — happy to work remote with teams anywhere.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3">
            <Link href="/contact" className="btn btn-primary self-start" data-cursor="hover">
              Start a conversation
              <BsArrowUpRight />
            </Link>
            <a href={`mailto:${contact.email}`} className="link-underline text-bone text-lg font-serif" data-cursor="hover">
              {contact.email}
            </a>
            <a href={contact.phoneHref} className="font-mono text-sm text-pearl" data-cursor="hover">
              {contact.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import FigureTicks from "@/components/shared/FigureTicks";
import PageRibbon from "@/components/shared/PageRibbon";
import Reveal from "@/components/ui/Reveal";
import { contact, socials } from "@/constants/personal";
import Link from "next/link";
import { useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent(`[Portfolio] ${data.get("subject") ?? "Hello"}`);
    const body = encodeURIComponent(
      `From: ${data.get("name") ?? ""} <${data.get("email") ?? ""}>\n\n${data.get("message") ?? ""}`,
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
    form.reset();
  };

  return (
    <main className="pt-24 md:pt-32">
      {/* ─── Ribbon + lede ─── */}
      <section className="container relative" aria-labelledby="contact-title">
        <span className="ghost-num right-[-2rem] top-0">C</span>

        <PageRibbon section="Contact" index="C" />

        <Reveal
          as="h1"
          mode="words"
          className="mt-10 md:mt-14 font-serif text-bone"
        >
          <span
            className="inline-block"
            style={{
              fontSize: "clamp(2.5rem, 9vw, 8rem)",
              lineHeight: 0.94,
              letterSpacing: "-0.04em",
            }}
          >
            Let&rsquo;s make <em className="italic-wonk text-acid">something</em>{" "}
            together.
          </span>
        </Reveal>

        <Reveal
          mode="fade"
          delay={0.1}
          className="mt-6 max-w-measure text-lede text-pearl"
        >
          Fastest way to reach me is email — I reply within a business day.
          Prefer LinkedIn or GitHub? Both are below.
        </Reveal>
      </section>

      {/* ─── Form + Aside ─── */}
      <section className="section container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <form onSubmit={onSubmit} className="lg:col-span-7 space-y-8">
            <div className="flex items-baseline justify-between border-b border-fog pb-3 mb-2">
              <span className="eyebrow eyebrow--acid">C1 · Message</span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ash">
                4 fields
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <label className="block">
                <span className="eyebrow block mb-2">
                  <span className="text-acid mr-1">01</span> Name
                </span>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="field"
                />
              </label>
              <label className="block">
                <span className="eyebrow block mb-2">
                  <span className="text-acid mr-1">02</span> Email
                </span>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  className="field"
                />
              </label>
            </div>

            <label className="block">
              <span className="eyebrow block mb-2">
                <span className="text-acid mr-1">03</span> Subject
              </span>
              <input
                name="subject"
                type="text"
                placeholder="What's this about?"
                className="field"
              />
            </label>

            <label className="block">
              <span className="eyebrow block mb-2">
                <span className="text-acid mr-1">04</span> Message
              </span>
              <textarea
                required
                name="message"
                rows={6}
                placeholder="A few sentences about your project, timeline, and stack."
                className="field"
              />
            </label>

            <div className="flex items-center justify-between pt-2 flex-wrap gap-4">
              <button
                type="submit"
                className="btn btn-primary"
                data-cursor="hover"
                data-cursor-magnetic
              >
                Send message <BsArrowUpRight />
              </button>
              {status === "sent" && (
                <span className="font-mono text-xs text-acid uppercase tracking-[0.14em]">
                  Your mail client just opened
                </span>
              )}
            </div>

            <p className="text-xs text-ash">
              This form opens your default email client with a pre-filled
              message. No data is sent to any server.
            </p>
          </form>

          {/* Aside — direct contact card */}
          <aside className="lg:col-span-5 lg:pl-10 lg:border-l lg:border-fog">
            <div className="flex items-baseline justify-between border-b border-fog pb-3 mb-6">
              <span className="eyebrow eyebrow--acid">C2 · Direct</span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ash">
                Preferred
              </span>
            </div>

            <ul className="space-y-6">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="block font-serif text-2xl md:text-3xl text-bone link-underline break-all"
                  data-cursor="hover"
                >
                  {contact.email}
                </a>
                <span className="font-mono text-xs text-ash uppercase tracking-[0.14em]">
                  Email — preferred
                </span>
              </li>
              <li>
                <a
                  href={contact.phoneHref}
                  className="block font-mono text-lg text-bone link-underline"
                  data-cursor="hover"
                >
                  {contact.phone}
                </a>
                <span className="font-mono text-xs text-ash uppercase tracking-[0.14em]">
                  Phone / WhatsApp
                </span>
              </li>
            </ul>

            {/* Location spec card */}
            <div className="mt-10 relative border border-fog p-6 bg-char/40">
              <FigureTicks />
              <p className="eyebrow mb-4">C3 · Location</p>
              <p className="font-serif text-2xl md:text-3xl text-bone leading-tight">
                {contact.city}
              </p>
              <p className="font-serif italic-wonk text-acid text-lg mt-1">
                {contact.region}, {contact.country}
              </p>
              <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ash">
                <dt>Coord.</dt>
                <dd className="text-right text-bone tabular-nums">
                  {contact.coords.lat.toFixed(4)}°N · {contact.coords.lng.toFixed(4)}°E
                </dd>
                <dt>Tz.</dt>
                <dd className="text-right">{contact.timezone}</dd>
                <dt>Region</dt>
                <dd className="text-right">{contact.regionCode}</dd>
              </dl>
            </div>

            {/* Elsewhere */}
            <div className="mt-10">
              <p className="eyebrow mb-4">C4 · Elsewhere</p>
              <ul className="space-y-3">
                {socials.map((s) => (
                  <li key={s.label} className="flex items-baseline justify-between border-b border-fog/70 pb-2">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="link-underline text-bone"
                      data-cursor="hover"
                    >
                      {s.label}
                    </a>
                    <span className="font-mono text-[0.7rem] text-ash">/ {s.handle}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <Link
                href="/about"
                className="link-underline text-acid"
                data-cursor="hover"
              >
                About Mayank →
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

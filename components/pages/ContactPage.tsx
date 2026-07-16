"use client";

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
    <main className="pt-32 md:pt-40">
      <section className="container relative" aria-labelledby="contact-title">
        <span className="ghost-num right-[-2rem] top-0">C</span>
        <p className="eyebrow eyebrow--acid">Contact · Say hello</p>
        <Reveal
          as="h1"
          mode="words"
          className="mt-6 font-serif text-bone"
        >
          <span
            className="inline-block"
            style={{ fontSize: "clamp(2.5rem, 9vw, 8rem)", lineHeight: 0.94, letterSpacing: "-0.04em" }}
          >
            Let&rsquo;s make <em className="italic-wonk text-acid">something</em> together.
          </span>
        </Reveal>
        <Reveal mode="fade" delay={0.1} className="mt-6 max-w-measure text-lede text-pearl">
          Fastest way to reach me is email. Fill in the form and I&rsquo;ll get back within a business day.
          Prefer LinkedIn or GitHub? Both are down below.
        </Reveal>
      </section>

      <section className="section container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <form onSubmit={onSubmit} className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <label className="block">
                <span className="eyebrow block mb-2">Name</span>
                <input required name="name" type="text" placeholder="Your name" className="field" />
              </label>
              <label className="block">
                <span className="eyebrow block mb-2">Email</span>
                <input required name="email" type="email" placeholder="you@company.com" className="field" />
              </label>
            </div>
            <label className="block">
              <span className="eyebrow block mb-2">Subject</span>
              <input name="subject" type="text" placeholder="What's this about?" className="field" />
            </label>
            <label className="block">
              <span className="eyebrow block mb-2">Message</span>
              <textarea required name="message" rows={6} placeholder="A few sentences about your project, timeline, and stack." className="field" />
            </label>
            <div className="flex items-center justify-between pt-2">
              <button type="submit" className="btn btn-primary" data-cursor="hover" data-cursor-magnetic>
                Send message <BsArrowUpRight />
              </button>
              {status === "sent" && (
                <span className="font-mono text-xs text-acid uppercase tracking-[0.14em]">
                  Your mail client just opened
                </span>
              )}
            </div>
            <p className="text-xs text-ash">
              This form opens your default email client with a pre-filled message. No data is sent to any server.
            </p>
          </form>

          <aside className="lg:col-span-5 lg:pl-10 lg:border-l lg:border-fog">
            <p className="eyebrow mb-4">Direct</p>
            <ul className="space-y-4">
              <li>
                <a href={`mailto:${contact.email}`} className="block font-serif text-2xl md:text-3xl text-bone link-underline" data-cursor="hover">
                  {contact.email}
                </a>
                <span className="font-mono text-xs text-ash uppercase tracking-[0.14em]">Email — preferred</span>
              </li>
              <li>
                <a href={contact.phoneHref} className="block font-mono text-lg text-bone link-underline" data-cursor="hover">
                  {contact.phone}
                </a>
                <span className="font-mono text-xs text-ash uppercase tracking-[0.14em]">Phone / WhatsApp</span>
              </li>
            </ul>

            <hr className="border-0 h-px bg-fog my-8" />

            <p className="eyebrow mb-4">Elsewhere</p>
            <ul className="space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noreferrer" className="link-underline text-bone" data-cursor="hover">
                    {s.label} <span className="text-ash">/ {s.handle}</span>
                  </a>
                </li>
              ))}
            </ul>

            <hr className="border-0 h-px bg-fog my-8" />

            <p className="eyebrow mb-4">Location</p>
            <address className="not-italic space-y-1 text-pearl">
              <p className="text-bone">{contact.city}</p>
              <p>{contact.region}, {contact.country}</p>
              <p className="font-mono text-xs text-ash mt-2">
                {contact.coords.lat.toFixed(4)}°N · {contact.coords.lng.toFixed(4)}°E
              </p>
              <p className="font-mono text-xs text-ash">{contact.timezone}</p>
            </address>

            <div className="mt-8">
              <Link href="/about" className="link-underline text-acid" data-cursor="hover">About Mayank →</Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

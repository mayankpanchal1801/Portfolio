"use client";

import { contact } from "@/constants/personal";
import { useState } from "react";

const FIELDS = [
  { n: "01", name: "name", label: "Name", type: "text", placeholder: "Your name", required: true },
  { n: "02", name: "email", label: "Email", type: "email", placeholder: "you@company.com", required: true },
] as const;

export default function ContactForm() {
  const [handedOff, setHandedOff] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const subject = encodeURIComponent(
      `[Portfolio] ${String(data.get("subject") || "Hello")}`,
    );
    const body = encodeURIComponent(
      `From: ${String(data.get("name") ?? "")} <${String(data.get("email") ?? "")}>\n\n${String(
        data.get("message") ?? "",
      )}`,
    );

    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setHandedOff(true);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="flex items-baseline justify-between border-b border-rule pb-3">
        <span className="tag tag--accent">Message</span>
        <span className="tag">4 fields</span>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {FIELDS.map((f) => (
          <label key={f.name} className="block">
            <span className="tag mb-2 block">
              <span className="text-accent-ink">{f.n}</span> {f.label}
            </span>
            <input
              required={f.required}
              name={f.name}
              type={f.type}
              placeholder={f.placeholder}
              autoComplete={f.name === "email" ? "email" : "name"}
              className="field"
            />
          </label>
        ))}
      </div>

      <label className="block">
        <span className="tag mb-2 block">
          <span className="text-accent-ink">03</span> Subject
        </span>
        <input name="subject" type="text" placeholder="What is this about?" className="field" />
      </label>

      <label className="block">
        <span className="tag mb-2 block">
          <span className="text-accent-ink">04</span> Message
        </span>
        <textarea
          required
          name="message"
          rows={6}
          placeholder="A few sentences about the project, the timeline, and the stack."
          className="field"
        />
      </label>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <button type="submit" className="btn btn-solid w-full sm:w-auto text-center cursor-pointer">
          Send message ↗
        </button>
        {handedOff && (
          <p aria-live="polite" className="tag tag--accent text-xs">
            ✓ Your mail client should have opened
          </p>
        )}
      </div>

      <p className="text-xs sm:text-sm text-ink-3">
        This form composes the message in your own email client — nothing is sent
        to a server, and nothing is stored.
      </p>
    </form>
  );
}

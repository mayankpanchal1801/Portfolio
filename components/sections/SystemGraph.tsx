"use client";

import Mark from "@/components/primitives/Mark";
import { prefersReducedMotion } from "@/lib/split-text";
import { useTilt } from "@/lib/use-tilt";
import clsx from "clsx";
import { useEffect, useState } from "react";

type NodeId = "client" | "edge" | "api" | "worker" | "pg" | "redis" | "ci";

const NODES: Record<NodeId, { x: number; y: number; label: string; sub: string; note: string }> = {
  client: { x: 64, y: 200, label: "Next.js", sub: "React 19 · RSC", note: "Type-safe App Router UIs, tuned to Core Web Vitals budgets." },
  edge: { x: 198, y: 200, label: "Nginx", sub: "TLS · gzip", note: "Reverse proxy and edge caching in front of every container." },
  api: { x: 342, y: 110, label: "FastAPI", sub: "async · pydantic", note: "Async REST with typed contracts, JWT auth and role-based access." },
  worker: { x: 342, y: 290, label: "Celery", sub: "jobs · queues", note: "Background work and WebSocket fan-out kept off the request path." },
  pg: { x: 488, y: 52, label: "PostgreSQL", sub: "SQLAlchemy", note: "Relational source of truth - schema-first, migration-driven." },
  redis: { x: 488, y: 170, label: "Redis", sub: "cache · broker", note: "Distributed cache and the broker behind the task queue." },
  ci: { x: 112, y: 340, label: "CI/CD", sub: "GitHub Actions", note: "Every merge is built, tested and shipped to AWS EC2 on Docker." },
};

const EDGES: { id: string; from: NodeId; to: NodeId; dur: number; begin: number; dashed?: boolean }[] = [
  { id: "e1", from: "client", to: "edge", dur: 2.2, begin: 0 },
  { id: "e2", from: "edge", to: "api", dur: 2.6, begin: 0.6 },
  { id: "e3", from: "api", to: "pg", dur: 2.4, begin: 1.1 },
  { id: "e4", from: "api", to: "redis", dur: 2.1, begin: 0.3 },
  { id: "e5", from: "api", to: "worker", dur: 3, begin: 1.6 },
  { id: "e6", from: "ci", to: "edge", dur: 3.4, begin: 0.9, dashed: true },
];

const LOG = [
  "GET   /api/v1/projects        200   14ms",
  "POST  /api/v1/auth/token      201   38ms",
  "GET   /api/v1/workspaces/42   200    9ms  (cache hit)",
  "WS    /ws/notifications       101   open",
  "POST  /api/v1/tasks           201   22ms",
  "CI    deploy main → aws-ec2   ✓ 2m 41s",
  "GET   /api/v1/reports?p=3     200   31ms",
];

const W = 104;
const H = 48;

function path(from: NodeId, to: NodeId) {
  const a = NODES[from];
  const b = NODES[to];
  const mx = (a.x + b.x) / 2;
  return `M${a.x} ${a.y} C${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
}

/**
 * The hero's centrepiece: a live architecture diagram - the instrument
 * panel in place of the reference's hand-drawn specimen plate. Packets
 * travel the real request path (client → edge → API → data), nodes light
 * up on hover with a one-line note, and a request log scrolls underneath.
 *
 * The card swings toward the pointer on both axes and a specular band
 * crosses it as you enter - the depth is what stops a wireframe diagram
 * from reading as a screenshot.
 *
 * `tilt` is a prop because an owner may want to swing a larger assembly
 * around the card instead (see HeroInstrument); 0 keeps the pointer
 * tracking that feeds the spotlight and drops the rotation.
 */
export default function SystemGraph({ tilt = 9 }: { tilt?: number }) {
  const [hover, setHover] = useState<NodeId | null>(null);
  const [lines, setLines] = useState<string[]>(LOG.slice(0, 3));
  const cardRef = useTilt<HTMLDivElement>({ max: tilt, lift: 18, perspective: 1100 });

  // Rolling request log.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let i = 3;
    const id = setInterval(() => {
      setLines((prev) => [...prev.slice(-2), LOG[i % LOG.length]]);
      i++;
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const focus = hover ? NODES[hover] : null;

  return (
    <div
      ref={cardRef}
      className="group plate plate--flush glass overflow-hidden"
      style={{ boxShadow: "inset 0 1px 0 var(--c-sheen), 0 40px 90px -40px var(--c-shadow)" }}
    >
      <Mark preset="brackets" seed="system-graph" accent />
      <span aria-hidden className="gleam" />

      <div className="flex items-center gap-2.5 border-b border-rule px-4 py-3">
        <span className="h-1.5 w-1.5 bg-rule-strong" />
        <span className="h-1.5 w-1.5 bg-rule-strong" />
        <span className="h-1.5 w-1.5 bg-accent" />
        <span className="tag ml-2.5 truncate">fig. 00.2 — architecture · live</span>
      </div>

      <svg
        viewBox="0 0 560 400"
        className="block w-full"
        role="img"
        aria-label="Architecture diagram: Next.js client, Nginx edge, FastAPI service, PostgreSQL, Redis and Celery, deployed through CI/CD."
      >
        {EDGES.map((e) => (
          <path
            key={e.id}
            id={e.id}
            d={path(e.from, e.to)}
            fill="none"
            className={clsx(
              "stroke-rule-strong transition-colors",
              hover && (hover === e.from || hover === e.to) && "!stroke-accent",
            )}
            strokeWidth="1"
            strokeDasharray={e.dashed ? "4 5" : undefined}
          />
        ))}

        {EDGES.map((e) => (
          <g key={`p-${e.id}`} className="packet">
            <circle r="7" className="fill-accent opacity-20" />
            <circle r="3" className="fill-accent" />
            <animateMotion dur={`${e.dur}s`} begin={`${e.begin}s`} repeatCount="indefinite">
              <mpath href={`#${e.id}`} />
            </animateMotion>
          </g>
        ))}

        {(Object.keys(NODES) as NodeId[]).map((id) => {
          const n = NODES[id];
          const on = hover === id;
          return (
            <g
              key={id}
              tabIndex={0}
              role="button"
              aria-label={`${n.label}: ${n.note}`}
              onPointerEnter={() => setHover(id)}
              onPointerLeave={() => setHover(null)}
              onFocus={() => setHover(id)}
              onBlur={() => setHover(null)}
              className="cursor-pointer outline-none"
            >
              <rect
                x={n.x - W / 2}
                y={n.y - H / 2}
                width={W}
                height={H}
                rx="2"
                className={clsx(
                  "transition-all duration-300",
                  on ? "fill-accent-soft stroke-accent" : "fill-paper stroke-rule-strong",
                )}
                strokeWidth="1"
              />
              <text
                x={n.x}
                y={n.y - 3}
                textAnchor="middle"
                className={clsx(
                  "font-display text-[13px] font-medium [letter-spacing:-0.02em]",
                  on ? "fill-accent" : "fill-ink",
                )}
              >
                {n.label}
              </text>
              <text x={n.x} y={n.y + 14} textAnchor="middle" className="fill-ink-3 font-mono text-[9px]">
                {n.sub}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="border-t border-rule px-4 py-3">
        <p className="min-h-[2.6em] text-[0.8rem] leading-snug text-ink-2" aria-live="polite">
          {focus ? (
            <>
              <span className="text-accent">{hover && NODES[hover].label}</span> — {focus.note}
            </>
          ) : (
            <span className="text-ink-3">Hover a node — this is the shape of most things I ship.</span>
          )}
        </p>
      </div>

      <div className="border-t border-rule bg-paper px-4 py-3 font-mono text-[0.68rem] leading-relaxed text-ink-3">
        {lines.map((l, i) => (
          <p key={`${l}-${i}`} className={clsx("whitespace-pre truncate", i === lines.length - 1 && "text-ink-2")}>
            <span className="text-accent">$</span> {l}
          </p>
        ))}
      </div>
    </div>
  );
}

import Figure from "@/components/primitives/Figure";
import Reveal from "@/components/primitives/Reveal";
import type { Project } from "@/constants/projects";
import Link from "next/link";

type Props = {
  project: Project;
  nextProject: Project;
};

export default function ProjectCase({ project, nextProject }: Props) {
  const facts = [
    { k: "Role", v: project.role },
    { k: "Client", v: project.client ?? "Personal" },
    { k: "Year", v: project.year },
    { k: "Category", v: project.category },
  ];

  return (
    <article itemScope itemType="https://schema.org/CreativeWork">
      {/* ── Header ── */}
      <header className="relative border-b border-rule pb-14 pt-36 md:pb-20 md:pt-44">
        <div className="shell relative z-[1]">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="tag hover:text-ink">
                  Home
                </Link>
              </li>
              <li aria-hidden className="tag text-rule-strong">
                /
              </li>
              <li>
                <Link href="/projects" className="tag hover:text-ink">
                  Projects
                </Link>
              </li>
              <li aria-hidden className="tag text-rule-strong">
                /
              </li>
              <li className="tag text-ink">{project.category}</li>
            </ol>
          </nav>

          <p className="tag tag--accent mt-8">
            {project.category} · {project.year}
          </p>

          <Reveal
            as="h1"
            mode="words"
            immediate
            itemProp="name"
            className="mt-5 max-w-[16ch] font-display text-mark font-normal text-ink"
          >
            {project.title}
          </Reveal>

          {project.subtitle && (
            <p className="mt-3 font-mono text-sm text-ink-3">
              {project.subtitle}
            </p>
          )}

          <Reveal
            as="p"
            mode="rise"
            delay={0.24}
            immediate
            className="measure mt-7 text-lede text-ink-2"
          >
            {project.description}
          </Reveal>

          <Reveal
            mode="fade"
            delay={0.36}
            immediate
            className="mt-8 sm:mt-9 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3"
          >
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-solid text-center"
                itemProp="url"
              >
                Visit live ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline text-center"
              >
                Source ↗
              </a>
            )}
            <Link href="/projects" className="btn btn-quiet text-center">
              ← All projects
            </Link>
          </Reveal>
        </div>
      </header>

      {/* ── Cover ── */}
      {project.imgSrc && (
        <div className="shell pt-14 md:pt-20">
          <Figure
            src={project.imgSrc}
            alt={`${project.title} - interface screenshot`}
            className="aspect-[16/9] rounded-2xl border border-rule-strong"
            sizes="(max-width: 1320px) 100vw, 1320px"
            priority
          />
        </div>
      )}

      {/* ── Facts ── */}
      <div className="shell pt-14 md:pt-20">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-6 rounded-2xl border border-rule bg-paper-2/60 p-6 md:grid-cols-4">
          {facts.map((f) => (
            <div key={f.k}>
              <dt className="tag tag--accent">{f.k}</dt>
              <dd className="mt-2 text-sm text-ink">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ── Overview + stack ── */}
      <section className="band shell pt-14 md:pt-20" aria-labelledby="overview-heading">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-7">
            <h2 id="overview-heading" className="tag tag--accent">
              Overview
            </h2>
            <Reveal
              as="p"
              mode="fade"
              className="mt-6 text-lede text-ink"
              itemProp="abstract"
            >
              {project.longDescription}
            </Reveal>
          </div>

          <aside className="col-span-12 mt-12 lg:col-span-4 lg:col-start-9 lg:mt-0">
            <h2 className="tag">Stack</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-rule px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-2"
                >
                  {t}
                </li>
              ))}
            </ul>

            {project.services && project.services.length > 0 && (
              <>
                <h2 className="tag mt-8">Services</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.services.map((s) => (
                    <li
                      key={s}
                      className="marginal rounded-sm border border-rule bg-paper-2 px-2.5 py-1 text-ink"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </aside>
        </div>

        {/* ── Highlights ── */}
        <div className="mt-16 md:mt-24">
          <h2 className="tag tag--accent">Highlights</h2>
          <ol className="mt-6 border-t border-rule">
            {project.highlights.map((h, i) => (
              <Reveal
                as="li"
                key={h.slice(0, 40)}
                mode="fade"
                delay={Math.min(i, 4) * 0.05}
                className="grid-12 gap-y-2 border-b border-rule py-6"
              >
                <span className="marginal col-span-2 text-accent-ink md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="col-span-10 text-ink md:col-span-11">{h}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Next ── */}
      <nav aria-label="Next project" className="shell pb-20 md:pb-28">
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group grid-12 items-center gap-y-4 border-t border-rule py-10"
        >
          <span className="marginal col-span-12 text-accent-ink md:col-span-2">
            Next project
          </span>
          <span className="col-span-12 font-display text-d2 font-normal text-ink transition-colors group-hover:text-accent-ink md:col-span-8">
            {nextProject.title}
          </span>
          <span className="col-span-12 flex md:col-span-2 md:justify-end">
            <span
              aria-hidden
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-rule-strong text-ink transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent"
            >
              ↗
            </span>
          </span>
        </Link>
      </nav>
    </article>
  );
}

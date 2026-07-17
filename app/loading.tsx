export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[400] bg-obsidian/95 backdrop-blur-sm flex flex-col items-start justify-end p-6 md:p-12"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="container flex items-center justify-between">
        <span className="eyebrow eyebrow--acid inline-flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-acid opacity-70 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acid" />
          </span>
          Fetching
        </span>

        <div className="flex items-center gap-4">
          <div className="relative w-40 md:w-60 h-px bg-fog overflow-hidden">
            <span
              className="absolute inset-y-0 w-1/3 bg-acid"
              style={{ animation: "loadingSlide 1.2s cubic-bezier(0.2, 0.9, 0.2, 1) infinite" }}
            />
          </div>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ash">
            Stand by
          </span>
        </div>
      </div>

      <style>{`
        @keyframes loadingSlide {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}

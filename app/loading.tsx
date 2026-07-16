export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[99999] bg-obsidian flex flex-col items-center justify-center gap-6"
      aria-busy="true"
      aria-live="polite"
    >
      <span
        className="font-serif italic-wonk text-bone"
        style={{ fontSize: "clamp(3rem, 10vw, 6rem)", lineHeight: 1 }}
      >
        Loading&hellip;
      </span>
      <div className="relative w-56 h-px bg-fog overflow-hidden">
        <span
          className="absolute inset-y-0 w-1/3 bg-acid"
          style={{ animation: "loadingSlide 1.2s cubic-bezier(0.2, 0.9, 0.2, 1) infinite" }}
        />
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

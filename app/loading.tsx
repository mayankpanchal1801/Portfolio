export default function Loading() {
  return (
    <div
      className="shell flex min-h-[60vh] items-center py-20"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="w-full border-t border-rule pt-6">
        <div className="flex items-center justify-between gap-6">
          <span className="tag tag--accent">Loading</span>
          <span className="relative h-px w-40 overflow-hidden bg-rule md:w-64">
            <span
              className="absolute inset-y-0 w-1/3 bg-accent"
              style={{ animation: "loadingSweep 1.1s cubic-bezier(0.4,0,0.2,1) infinite" }}
            />
          </span>
        </div>
      </div>

      <style>{`
        @keyframes loadingSweep {
          from { transform: translateX(-100%); }
          to   { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}

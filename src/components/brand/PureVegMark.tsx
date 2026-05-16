type Props = {
  className?: string;
  size?: "sm" | "md";
};

export function PureVegMark({ className = "", size = "md" }: Props) {
  const pad = size === "sm" ? "px-2.5 py-1" : "px-3 py-1.5";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-emerald-600/25 bg-gradient-to-r from-emerald-50/95 to-lime-50/90 shadow-sm shadow-emerald-900/5 ${pad} ${className}`}
      title="100% vegetarian · homemade small batches"
    >
      <svg
        className="h-5 w-5 shrink-0 text-emerald-700"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3c-4 3.5-6 7.5-6 11a6 6 0 1012 0c0-3.5-2-7.5-6-11z"
        />
        <path
          strokeLinecap="round"
          d="M12 14v4M9 18h6"
        />
      </svg>
      <span className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-900/90">
        Pure veg
      </span>
    </span>
  );
}

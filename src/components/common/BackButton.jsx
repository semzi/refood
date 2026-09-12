import { useApp } from "../../context/AppContext";
import { IconChevronRight, ICON_SIZE } from "./Icons";

export function BackButton({ label = "Back", fallback = "home", hideIfNoHistory = false, className = "" }) {
  const { goBack, canGoBack } = useApp();
  if (hideIfNoHistory && !canGoBack) return null;
  return (
    <button
      onClick={() => goBack(fallback)}
      aria-label={label}
      title={label}
      className={`inline-flex items-center gap-1.5 rounded-full bg-white border border-[#eef3ec] shadow-sm pl-2 pr-3.5 py-1.5 text-sm font-bold text-[#0f2815] hover:bg-[#f1f6ef] transition cursor-pointer ${className}`}
    >
      <span className="w-7 h-7 rounded-full bg-[#f1f6ef] grid place-items-center">
        <IconChevronRight size={ICON_SIZE} className="rotate-180" />
      </span>
      {label}
    </button>
  );
}

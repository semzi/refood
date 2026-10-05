import React from "react";
import { useApp } from "../../context/AppContext";
import { IconLeaf } from "./Icons";

export function SdgImpactCard({ className = "" }) {
  const { orders = [] } = useApp();
  const mealsSaved = orders
    .filter((o) => o.status !== "cancelled")
    .reduce(
      (sum, o) =>
        sum +
        (o.items?.reduce((s, i) => s + (i.qty ?? i.quantity ?? 1), 0) ?? 1),
      0
    );

  return (
    <div
      className={`bg-gradient-to-br from-[#f2f8f2] via-[#ebf5ea] to-[#e4f0e2] rounded-2xl p-4 border border-[#d8ead8] shadow-[0_2px_8px_rgba(15,122,59,0.06)] ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold text-[#5a6b5a]">
          Meals saved by you
        </span>
        <img
          src="/sdg.png"
          alt="UN SDG 12: Responsible Consumption"
          className="w-9 h-9 rounded-lg object-contain bg-white border border-[#cfdfcf] p-0.5 shrink-0"
        />
      </div>
      <p className="mt-1 flex items-center gap-1.5 text-[#0f2815]">
        <span className="text-[26px] font-black tracking-tight leading-none">
          {mealsSaved.toLocaleString()}
        </span>
        <span className="text-[#0f7a3b]">
          <IconLeaf size={18} />
        </span>
      </p>
      <div className="mt-2">
        <span className="text-[10px] uppercase font-black tracking-wider text-[#0f7a3b] bg-white/80 px-2 py-0.5 rounded-md border border-[#cbe0cb]">
          UN SDG 12.3
        </span>
      </div>
    </div>
  );
}

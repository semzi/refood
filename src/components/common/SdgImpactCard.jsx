import React from "react";
import { IconLeaf, IconChevronRight, ICON_SM } from "./Icons";

export function SdgImpactCard({ className = "" }) {
  return (
    <div className={`bg-gradient-to-br from-[#f2f8f2] via-[#ebf5ea] to-[#e4f0e2] rounded-2xl p-3.5 sm:p-4 border border-[#d8ead8] shadow-[0_2px_8px_rgba(15,122,59,0.06)] relative overflow-hidden group ${className}`}>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-white shadow-2xs border border-[#cfdfcf] p-1 flex items-center justify-center shrink-0">
          <img
            src="/sdg.png"
            alt="UN SDG 12: Responsible Consumption"
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[19px] sm:text-[20px] font-black text-[#0f2815] tracking-tight leading-none">
            12,450
          </p>
          <p className="text-[11.5px] sm:text-[12px] text-[#2d5232] font-extrabold mt-1 flex items-center gap-1">
            <span className="text-[#0f7a3b]"><IconLeaf size={13} /></span>
            <span>meals saved in Nigeria</span>
          </p>
        </div>
        <span className="text-[#0f7a3b]/70 group-hover:text-[#0f7a3b] group-hover:translate-x-0.5 transition-all shrink-0">
          <IconChevronRight size={ICON_SM} />
        </span>
      </div>
      
      <div className="mt-2.5 pt-2.5 border-t border-[#d5e7d5] flex items-center justify-between gap-2">
        <span className="text-[10px] sm:text-[10.5px] uppercase font-black tracking-wider text-[#0f7a3b] bg-white/80 px-2 py-0.5 rounded-md border border-[#cbe0cb] shrink-0">
          UN SDG 12.3
        </span>
        <span className="text-[10.5px] sm:text-[11px] font-bold text-[#3d5e3d] truncate">
          Responsible Consumption 🌱
        </span>
      </div>
    </div>
  );
}

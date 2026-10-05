import { useState, useMemo } from "react";
import { useApp } from "../../context/AppContext";
import { formatNaira, getListingPrice } from "../../utils/formatters";
import { IconSearch, IconArrowRight, IconChevronRight, ICON_SIZE, ICON_SM } from "../../components/common/Icons";
import { HeroBanner } from "../../components/common/HeroBanner";
import { FoodCard } from "../../components/customer/FoodCard";
import { Empty } from "../../components/common/Empty";

import { SdgImpactCard } from "../../components/common/SdgImpactCard";

export function Home() {
  const { listings, businesses, navigate } = useApp();
  const [q, setQ] = useState("");
  const [searching, setSearching] = useState(false);

  const filtered = useMemo(() => listings.filter(l =>
    l.name.toLowerCase().includes(q.toLowerCase()) ||
    businesses.find(b => b.id === l.businessId)?.name.toLowerCase().includes(q.toLowerCase())
  ), [q, listings, businesses]);

  return (
    <div className="space-y-5 sm:space-y-7">
      {/* Mobile search — desktop uses the TopBar search pill */}
      <div className="md:hidden">
        <div className="relative min-w-0">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8aa08a] z-10"><IconSearch size={ICON_SIZE} /></span>
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            onFocus={() => setSearching(true)}
            onClick={() => setSearching(true)}
            placeholder="Search food, restaurants or cuisines…"
            className="w-full bg-white border border-[#e2ece2] rounded-full pl-10 sm:pl-11 pr-4 py-3 sm:py-3.5 text-[13px] sm:text-[14px] text-[#0f2815] placeholder:text-[#8aa08a] placeholder:font-medium focus:outline-none focus:border-[#c8e0c8] focus:ring-4 focus:ring-[#eef6ec] font-medium transition-all"
          />
        </div>
        {!searching && <p className="text-xs text-[#5a6b5a] mt-2.5 font-medium px-1"><span className="text-[#0f7a3b] font-bold">Try:</span> Jollof rice, Suya, Pounded Yam…</p>}
      </div>

      {searching && (
        <div className="fixed inset-0 z-50 bg-white/60 backdrop-blur-sm" onClick={() => { setSearching(false); setQ(""); }}>
          <div className="bg-[#f7f8f6] min-h-screen" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-[#f7f8f6]/90 backdrop-blur-xl px-4 py-3 flex items-center gap-3 border-b border-[#eef3ec]">
              <button onClick={() => { setSearching(false); setQ(""); }} className="w-9 h-9 grid place-items-center rounded-full hover:bg-[#eef3ec] transition shrink-0 cursor-pointer">
                <IconChevronRight size={ICON_SIZE} className="rotate-180" />
              </button>
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8aa08a]"><IconSearch size={ICON_SIZE} /></span>
                <input
                  autoFocus
                  value={q}
                  onChange={e => setQ(e.target.value)}
                  placeholder="Search for food or restaurants…"
                  className="w-full bg-white border border-[#e2ece2] rounded-full pl-10 pr-4 py-2.5 text-[14px] text-[#0f2815] placeholder:text-[#8aa08a] font-medium focus:outline-none focus:border-[#c8e0c8] focus:ring-4 focus:ring-[#eef6ec]"
                />
              </div>
            </div>
            <div className="px-4 py-4">
              {q.length === 0 ? (
                <div className="space-y-4">
                  <p className="text-[12px] font-bold text-[#8aa08a] uppercase tracking-wide">Recent searches</p>
                  <div className="flex flex-wrap gap-2">
                    {["Jollof Rice", "Suya", "Pounded Yam", "Moi Moi", "Plantain"].map(s => (
                      <button key={s} onClick={() => setQ(s)} className="bg-white border border-[#eef3ec] rounded-full px-4 py-2 text-[13px] font-semibold text-[#3a4a3a] hover:bg-[#eef3ec] transition cursor-pointer">{s}</button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-[12px] font-bold text-[#8aa08a]">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>
                  <div className="space-y-2.5">
                    {filtered.map(l => {
                      const b = businesses.find(x => x.id === l.businessId);
                      return (
                        <button
                          key={l.id}
                          onClick={() => { setSearching(false); setQ(""); navigate("foodDetail", { id: l.id }); }}
                          className="w-full bg-white rounded-xl p-3 flex gap-3 items-center shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-md transition text-left cursor-pointer"
                        >
                          <img src={l.image} alt={l.name} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-[13px] text-[#0f2815] truncate">{l.name}</p>
                            <p className="text-[11px] text-[#5a6b5a] font-medium truncate">{b?.name}</p>
                            <p className="text-[13px] font-extrabold text-[#0f2815] mt-0.5">{formatNaira(getListingPrice(l))}</p>
                          </div>
                          <IconChevronRight size={ICON_SIZE} className="text-[#8aa08a] shrink-0" />
                        </button>
                      );
                    })}
                    {filtered.length === 0 && (
                      <div className="text-center py-10">
                        <p className="text-[14px] font-bold text-[#0f2815]">No results for "{q}"</p>
                        <p className="text-[13px] text-[#5a6b5a] mt-1">Try a different search term</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <HeroBanner />

      <div>
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-extrabold text-[17px] sm:text-[19px] text-[#0f2815] tracking-tight">Popular near you</h2>
          <button onClick={() => navigate("browse")} className="text-[13px] font-bold text-[#0f7a3b] inline-flex items-center gap-1 shrink-0 hover:underline cursor-pointer">See all <IconArrowRight size={ICON_SM} /></button>
        </div>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
          {filtered.slice(0, 8).map(l => <FoodCard key={l.id} listing={l} />)}
        </div>
        {filtered.length === 0 && <Empty text="No food found for your search." actionLabel="Clear search" onAction={() => setQ("")} />}
        
        {/* UN SDG Impact Box below products on Mobile View */}
        <div className="lg:hidden mt-6">
          <SdgImpactCard />
        </div>
      </div>
    </div>
  );
}

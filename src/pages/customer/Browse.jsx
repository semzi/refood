import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { categories } from "../../data/demoData";
import { formatNaira, getListingPrice } from "../../utils/formatters";
import { IconSearch, ICON_SIZE } from "../../components/common/Icons";
import { FoodCard } from "../../components/customer/FoodCard";
import { Empty } from "../../components/common/Empty";
import { SdgImpactCard } from "../../components/common/SdgImpactCard";

export function Browse() {
  const { listings, businesses, route } = useApp();
  const [q, setQ] = useState(route.params?.q || "");
  const [prevParamQ, setPrevParamQ] = useState(route.params?.q);
  const [cat, setCat] = useState("All");
  const [maxPrice, setMaxPrice] = useState(3000);
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  if (route.params?.q !== prevParamQ) {
    setPrevParamQ(route.params?.q);
    if (typeof route.params?.q === "string") {
      setQ(route.params.q);
    }
  }

  const filtered = listings.filter(l => {
    if (cat !== "All" && l.category !== cat) return false;
    if (getListingPrice(l) > maxPrice) return false;
    if (onlyAvailable && l.quantity <= 0) return false;
    const b = businesses.find(b => b.id === l.businessId);
    const text = (l.name + " " + b?.name + " " + l.category).toLowerCase();
    if (q && !text.includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-[24px] font-bold tracking-tight text-[#0f2815]">Browse Surplus</h1>
        <p className="text-[13.5px] text-[#3a4a3a] mt-1 font-medium">Discover affordable surplus near you</p>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-[0_2px_16px_rgba(0,0,0,0.05)] space-y-3 border border-[#eef3ec]">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 relative">
            <span className="absolute left-3.5 top-3.5 text-[#8aa08a]"><IconSearch size={ICON_SIZE} /></span>
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search food or restaurant…"
              className="w-full bg-[#f7f8f6] rounded-xl pl-10 pr-4 py-3 text-sm text-[#0f2815] placeholder:text-[#8aa08a] font-medium focus:outline-none focus:ring-2 focus:ring-[#0f7a3b]/15"
            />
          </div>
          <select
            value={cat}
            onChange={e => setCat(e.target.value)}
            className="bg-[#f7f8f6] rounded-xl px-4 py-3 text-sm text-[#0f2815] font-medium focus:outline-none border border-transparent"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <label className="flex items-center gap-2 text-sm bg-[#f7f8f6] rounded-xl px-4 py-2.5 font-semibold text-[#0f2815] cursor-pointer">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={e => setOnlyAvailable(e.target.checked)}
              className="accent-[#0f7a3b]"
            /> Only available
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="text-[#3a4a3a] font-semibold">Max price: <span className="text-[#0f2815] font-bold">{formatNaira(maxPrice)}</span></span>
          <input
            type="range"
            min={500}
            max={3000}
            step={100}
            value={maxPrice}
            onChange={e => setMaxPrice(Number(e.target.value))}
            className="flex-1 min-w-[180px] accent-[#0f7a3b]"
          />
          <button
            onClick={() => { setQ(""); setCat("All"); setMaxPrice(3000); setOnlyAvailable(false); }}
            className="text-[#0f7a3b] font-bold text-sm hover:underline cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
        {filtered.map(l => <FoodCard key={l.id} listing={l} />)}
      </div>
      {filtered.length === 0 && <Empty text="No food found for your search." actionLabel="Clear filters" onAction={() => { setQ(""); setCat("All"); }} />}

      {/* UN SDG Impact Box below products on Mobile View */}
      <div className="lg:hidden mt-6">
        <SdgImpactCard />
      </div>
    </div>
  );
}

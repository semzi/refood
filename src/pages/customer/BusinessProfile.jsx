import { useApp } from "../../context/AppContext";
import { IconCheck, IconStar, ICON_SM } from "../../components/common/Icons";
import { BackButton } from "../../components/common/BackButton";
import { FoodCard } from "../../components/customer/FoodCard";
import { Empty } from "../../components/common/Empty";

export function BusinessProfile({ id }) {
  const { businesses, listings } = useApp();
  const b = businesses.find(x => x.id === id);
  if (!b) return <Empty text="Business not found" />;
  const bizListings = listings.filter(l => l.businessId === id);

  return (
    <div className="space-y-6">
      <div><BackButton label="Back" fallback="home" /></div>
      {/* Banner + profile card */}
      <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.07)] border border-[#eef3ec]">
        {/* Green banner with dotted pattern */}
        <div className="h-[116px] md:h-[132px] bg-[#157a3b] relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.32]" style={{ backgroundImage: "radial-gradient(circle, white 1.35px, transparent 1.35px)", backgroundSize: "20px 20px" }}></div>
          <div className="absolute right-[72px] top-[18px] w-[96px] h-[96px] bg-white/[0.09] rounded-full"></div>
          <div className="absolute right-[36px] top-[42px] w-[96px] h-[96px] bg-white/[0.06] rounded-full"></div>
        </div>
        <div className="px-5 md:px-7 pb-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-5 -mt-[44px] relative">
            <img src={b.image} alt={b.name} className="w-[88px] h-[88px] md:w-[96px] md:h-[96px] rounded-2xl object-cover shadow-[0_4px_16px_rgba(0,0,0,0.12)] ring-[4px] ring-white shrink-0 bg-white" />
            <div className="flex-1 min-w-0 pt-0 md:pt-[54px]">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="leading-none">
                  <p className="text-[10px] font-bold tracking-[0.14em] text-[#6b7f6e] uppercase leading-none">Partner</p>
                  <h1 className="text-[19px] md:text-[20px] font-bold tracking-tight text-[#0f1f0f] leading-none mt-[2px]">{b.name}</h1>
                </div>
                {b.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] bg-white text-[#157a3b] px-2.5 py-1 rounded-full font-bold shadow-[0_1px_6px_rgba(0,0,0,0.08)] border border-[#e2eee2]">
                    <IconCheck size={ICON_SM} /> Verified
                  </span>
                )}
              </div>
              <p className="text-[12.5px] text-[#3d4f3d] mt-2.5 flex flex-wrap items-center gap-1 font-medium">
                <span>{b.location}</span>
                <span className="w-1 h-1 bg-[#9ab09a] rounded-full mx-1"></span>
                <span className="inline-flex items-center gap-1 text-[#0f1f0f] font-bold"><IconStar size={ICON_SM} className="text-[#0f1f0f]" /> {b.rating}</span>
                <span className="text-[#6b7f6e]">({b.reviews} reviews)</span>
                <span className="w-1 h-1 bg-[#9ab09a] rounded-full mx-1"></span>
                <span>{b.category}</span>
              </p>
              <p className="text-[13px] leading-[1.6] text-[#5a6b5a] mt-2 max-w-[640px] font-normal">{b.description}</p>
              <div className="mt-3.5 flex flex-wrap gap-2">
                <span className="text-[12px] font-semibold px-3 py-1 rounded-full bg-[#eef5ee] text-[#1a5a2e] border border-[#d4e6d4]">Pickup available</span>
                <span className="text-[12px] font-semibold px-3 py-1 rounded-full bg-[#eef5ee] text-[#1a5a2e] border border-[#d4e6d4]">Delivery available</span>
                <span className="text-[12px] font-bold px-3 py-1 rounded-full bg-[#0f2815] text-white">Open today • 9am – 8pm</span>
              </div>
            </div>
            <div className="flex md:flex-col gap-2.5 shrink-0 md:pt-[54px] md:w-[148px]">
              <button className="flex-1 md:w-full bg-[#157a3b] hover:bg-[#126a33] text-white py-[13px] rounded-xl text-[13.5px] font-bold shadow-sm transition cursor-pointer">Contact</button>
              <button className="flex-1 md:w-full bg-[#f1f6ef] hover:bg-[#e8f0e8] text-[#0f2815] py-[13px] rounded-xl text-[13.5px] font-bold transition cursor-pointer">Share</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-[#0f2815]">Available surplus <span className="text-[#8aa08a] font-semibold text-sm">· {bizListings.length} items</span></h3>
          <span className="text-xs text-[#5a6b5a] font-medium">Updated today</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
          {bizListings.map(l => <FoodCard key={l.id} listing={l} />)}
        </div>
        {bizListings.length === 0 && <Empty text="No listings yet — this business hasn’t posted surplus today." />}
      </div>
    </div>
  );
}

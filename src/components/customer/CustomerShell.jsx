import { useApp } from "../../context/AppContext";
import {
  IconLeaf, IconHome, IconGrid, IconClipboard, IconHeart, IconUser,
  IconBell, IconSearch, IconClock, IconChevronRight, ICON_SIZE, ICON_SM
} from "../common/Icons";
import { TopBar } from "./TopBar";
import { SdgImpactCard } from "../common/SdgImpactCard";

export function CustomerShell({ children }) {
  const { route, navigate } = useApp();

  const navigateTo = (p) => {
    window.history.pushState({}, "", p);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-[#1a2e1a]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[264px] bg-white flex-col justify-between fixed top-0 left-0 bottom-0 h-screen overflow-hidden border-r border-[#eef3ec] z-30">
        <div className="p-6 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-[#0f7a3b]"><IconLeaf size={30} /></span>
            <span className="font-extrabold text-[28px] tracking-[-0.04em] text-[#0f7a3b]">ReFood</span>
          </div>
          <p className="text-[12px] leading-[1.5] mt-1.5 text-[#0f2815] font-medium">Good food. Less waste.<br />Stronger communities.</p>
          <nav className="mt-6 space-y-1">
            <NavItem label="Home" icon={<IconHome />} active={route.name === "home"} onClick={() => navigate("home")} />
            <NavItem label="Browse Surplus" icon={<IconGrid />} active={route.name === "browse"} onClick={() => navigate("browse")} />
            <NavItem label="My Orders" icon={<IconClipboard />} active={["orders", "orderDetail", "trackOrder"].includes(route.name)} onClick={() => navigate("orders")} />
            <NavItem label="Favourites" icon={<IconHeart size={ICON_SIZE} />} active={route.name === "favorites"} onClick={() => navigate("favorites")} />
            <NavItem label="Profile" icon={<IconUser />} active={route.name === "profile"} onClick={() => navigate("profile")} />
          </nav>
        </div>
        <div className="p-5 pt-2">
          <SdgImpactCard />
          <button onClick={() => navigateTo("/business")} className="mt-2.5 w-full bg-[#0f2815] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#163a1f] transition cursor-pointer">Business portal →</button>
          <p className="text-[10px] text-[#8aa08a] text-center mt-1 font-medium">Are you a business? Manage at /business</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:pl-[264px] flex flex-col min-h-screen">
        <TopBar />
        <main className="px-3 sm:px-4 lg:px-8 pt-6 sm:pt-8 lg:pt-10 pb-24 sm:pb-24 lg:pb-8 max-w-[1100px] mx-auto w-full flex-1">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 pointer-events-none select-none">
        <div className="pointer-events-auto relative max-w-[500px] mx-auto">
          {/* Background SVG scooped notch */}
          <div className="relative h-[28px] overflow-visible pointer-events-none -mb-[1px]">
            <svg
              viewBox="0 0 400 28"
              preserveAspectRatio="none"
              className="w-full h-full block drop-shadow-[0_-5px_14px_rgba(0,0,0,0.18)]"
            >
              <path
                d="M 0,28 L 0,16 Q 0,0 18,0 L 142,0 C 156,0 165,6 172,16 C 179,28 188,34 200,34 C 212,34 221,28 228,16 C 235,6 244,0 258,0 L 382,0 Q 400,0 400,16 L 400,28 Z"
                fill="#18191a"
              />
            </svg>

            {/* Elevated Center Floating Action Button */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-6 z-30 pointer-events-auto">
              <button
                onClick={() => navigate("browse")}
                aria-label="Discover surplus meals"
                className="w-[56px] h-[56px] rounded-full bg-[#18191a] p-1.5 shadow-[0_6px_20px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.06)] flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
              >
                <div className="w-full h-full rounded-full bg-[#00e676] flex items-center justify-center text-[#18191a] shadow-[0_0_16px_rgba(0,230,118,0.6)]">
                  <span className="text-[22px] font-black leading-none select-none mb-0.5">+</span>
                </div>
              </button>
            </div>
          </div>

          {/* Nav Items Row */}
          <div className="bg-[#18191a] px-3 pt-0 pb-[max(0.75rem,calc(env(safe-area-inset-bottom,0px)+0.35rem))]">
            <div className="flex justify-around items-center">
              {/* Home */}
              <button
                onClick={() => navigate("home")}
                className="flex-1 flex flex-col items-center justify-center gap-1 py-1 transition active:scale-95 cursor-pointer"
              >
                <div className={`transition-colors ${route.name === "home" ? "text-[#00e676]" : "text-[#d1d5db]"}`}>
                  <IconHome size={20} />
                </div>
                <span className={`text-[10px] tracking-tight ${route.name === "home" ? "font-bold text-[#00e676]" : "font-medium text-[#9ca3af]"}`}>
                  Home
                </span>
              </button>

              {/* My Pickup */}
              <button
                onClick={() => navigate("orders")}
                className="flex-1 flex flex-col items-center justify-center gap-1 py-1 transition active:scale-95 cursor-pointer"
              >
                <div className={`transition-colors ${["orders", "orderDetail", "trackOrder"].includes(route.name) ? "text-[#00e676]" : "text-[#d1d5db]"}`}>
                  <IconGrid size={20} />
                </div>
                <span className={`text-[10px] tracking-tight ${["orders", "orderDetail", "trackOrder"].includes(route.name) ? "font-bold text-[#00e676]" : "font-medium text-[#9ca3af]"}`}>
                  My Pickup
                </span>
              </button>

              {/* Center Spacer for Floating Button */}
              <div className="w-16 shrink-0 pointer-events-none" />

              {/* Notification */}
              <button
                onClick={() => navigate("notifications")}
                className="flex-1 flex flex-col items-center justify-center gap-1 py-1 transition active:scale-95 cursor-pointer"
              >
                <div className={`transition-colors ${route.name === "notifications" ? "text-[#00e676]" : "text-[#d1d5db]"}`}>
                  <IconBell size={20} />
                </div>
                <span className={`text-[10px] tracking-tight ${route.name === "notifications" ? "font-bold text-[#00e676]" : "font-medium text-[#9ca3af]"}`}>
                  Notification
                </span>
              </button>

              {/* Profile */}
              <button
                onClick={() => navigate("profile")}
                className="flex-1 flex flex-col items-center justify-center gap-1 py-1 transition active:scale-95 cursor-pointer"
              >
                <div className={`transition-colors ${route.name === "profile" ? "text-[#00e676]" : "text-[#d1d5db]"}`}>
                  <IconUser size={20} />
                </div>
                <span className={`text-[10px] tracking-tight ${route.name === "profile" ? "font-bold text-[#00e676]" : "font-medium text-[#9ca3af]"}`}>
                  Profile
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-[13.5px] transition flex items-center gap-2.5 cursor-pointer ${
        active ? 'bg-[#e9f4e9] text-[#0f5c2e] font-bold shadow-none' : 'font-semibold text-[#0f2815] hover:bg-[#f1f6ef]'
      }`}
    >
      <span className={`${active ? 'text-[#0f7a3b]' : 'text-[#0f2815]'}`}>{icon}</span>
      {label}
    </button>
  );
}

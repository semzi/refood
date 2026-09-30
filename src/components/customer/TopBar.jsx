import { useState, useEffect, useRef } from "react";
import { useApp } from "../../context/AppContext";
import { IconSearch, IconBell, IconCart, IconChevronDown, ICON_SIZE, ICON_SM } from "../common/Icons";

export function TopBar() {
  const { currentUser, navigate, route, cart, notifications, setNotifications } = useApp();
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const unread = notifications.filter(n => !n.read).length;
  const [openNoti, setOpenNoti] = useState(false);
  const notiRef = useRef(null);
  const [tq, setTq] = useState("");

  useEffect(() => {
    const close = (e) => {
      if (notiRef.current && !notiRef.current.contains(e.target)) setOpenNoti(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const dicebear = (seed) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed || "Mercy S.")}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc`;
  const iconBtn = "relative w-10 h-10 grid place-items-center rounded-full bg-white border border-[#eef3ec] shadow-sm hover:bg-[#eef3ec] transition text-[#0f2815] cursor-pointer";

  return (
    <div className="min-h-[56px] sm:min-h-[64px] flex items-center justify-between gap-3 px-4 sm:px-5 lg:px-8 py-2 sticky top-0 z-20 bg-[#f7f8f6]/80 backdrop-blur-xl">
      <div className="flex items-center gap-1 lg:hidden">
        <span className="text-[22px] sm:text-[26px] font-extrabold tracking-[-0.06em] text-[#0f2815]">ReFood</span>
      </div>

      {/* Desktop search pill → Browse */}
      <form onSubmit={(e) => { e.preventDefault(); navigate("browse", { q: tq }); }} className="hidden md:flex flex-1 max-w-[560px] relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0f2815]"><IconSearch size={ICON_SIZE} /></span>
        <input
          value={tq}
          onChange={e => setTq(e.target.value)}
          placeholder="Search food, restaurants or cuisines…"
          className="w-full bg-white border border-[#e2ece2] rounded-full pl-11 pr-4 py-2.5 text-[13.5px] text-[#0f2815] placeholder:text-[#8aa08a] font-medium focus:outline-none focus:border-[#c8e0c8] focus:ring-4 focus:ring-[#eef6ec]"
        />
      </form>

      <div className="flex items-center gap-2 ml-auto">
        {/* Notifications */}
        <div className="relative" ref={notiRef}>
          <button
            onClick={() => setOpenNoti(!openNoti)}
            aria-label="Notifications"
            title="Notifications"
            className={`${iconBtn} border-transparent shadow-none hover:bg-[#eef3ec]`}
          >
            <IconBell size={ICON_SIZE} />
            {unread > 0 && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#0f7a3b] rounded-full ring-2 ring-[#f7f8f6]"></span>}
          </button>
          {openNoti && (
            <div className="absolute right-0 top-full mt-2 w-[320px] sm:w-[360px] bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-[#eef3ec] overflow-hidden z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#eef3ec]">
                <span className="font-bold text-[14px] text-[#0f2815]">Notifications</span>
                <button
                  onClick={() => { setNotifications(prev => prev.map(n => ({ ...n, read: true }))); }}
                  className="text-[12px] font-bold text-[#0f7a3b] cursor-pointer hover:underline"
                >
                  Mark all read
                </button>
              </div>
              <div className="max-h-[320px] overflow-y-auto">
                {notifications.length === 0 && <p className="text-center text-[13px] text-[#8aa08a] py-8 font-medium">No notifications yet</p>}
                {notifications.map(n => (
                  <div key={n.id} className={`px-4 py-3 flex gap-3 hover:bg-[#f7f8f6] transition cursor-pointer ${!n.read ? "bg-[#f0f7f0]" : ""}`}>
                    <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!n.read ? "bg-[#0f7a3b]" : "bg-transparent"}`}></span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-[#0f2815] leading-tight">{n.title}</p>
                      <p className="text-[12px] text-[#5a6b5a] mt-0.5 leading-snug">{n.body}</p>
                      <p className="text-[11px] text-[#8aa08a] mt-1">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => { setOpenNoti(false); navigate("notifications"); }}
                className="w-full text-center py-2.5 text-[13px] font-bold text-[#0f7a3b] border-t border-[#eef3ec] hover:bg-[#f7f8f6] transition cursor-pointer"
              >
                View all
              </button>
            </div>
          )}
        </div>

        {/* Cart */}
        <button
          onClick={() => navigate("cart")}
          aria-label="Cart"
          title="Cart"
          className={`${iconBtn} border-transparent shadow-none hover:bg-[#eef3ec] ${route?.name === "cart" ? "bg-[#eef3ec]" : ""}`}
        >
          <IconCart size={ICON_SIZE} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-[#0f7a3b] text-white text-[11px] font-extrabold rounded-full grid place-items-center ring-2 ring-[#f7f8f6]">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </button>

        {/* Profile */}
        <button onClick={() => navigate("profile")} className="flex items-center gap-2 hover:opacity-80 transition ml-1 cursor-pointer">
          <img
            src={currentUser?.avatar && !currentUser.avatar.includes("unsplash.com") ? currentUser.avatar : dicebear(currentUser?.name || "Mercy S.")}
            alt="avatar"
            className="w-10 h-10 rounded-full bg-white border border-[#eef3ec] shadow-sm object-cover"
          />
          <span className="hidden lg:inline text-[14px] font-bold text-[#0f2815]">{currentUser?.name || "Mercy S."}</span>
          <span className="hidden lg:inline text-[#0f2815]"><IconChevronDown size={ICON_SM} /></span>
        </button>
      </div>
    </div>
  );
}

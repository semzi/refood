import { IconLeaf, IconGrid, IconStore, IconClipboard, ICON_SIZE } from "../common/Icons";

export function BusinessShell({ path, activePage, navigate, navigateBusiness, children }) {
  const currentPath = path || (typeof window !== 'undefined' ? window.location.pathname : '');
  
  const active = activePage
    ? activePage === "dashboard"
      ? "overview"
      : activePage
    : currentPath.startsWith("/business/orders")
    ? "orders"
    : currentPath.startsWith("/business/listings")
    ? "listings"
    : "overview";

  const handleNav = (targetPath, pageName) => {
    if (navigateBusiness && pageName) {
      navigateBusiness(pageName);
    } else if (navigate) {
      navigate(targetPath);
    } else {
      window.history.pushState({}, "", targetPath);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  const logout = () => {
    localStorage.removeItem("refood_business_auth");
    if (navigateBusiness) {
      navigateBusiness("login");
    } else if (navigate) {
      navigate("/business/login");
    } else {
      window.location.href = "/business/login";
    }
  };

  const navigateToCustomer = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-[#1a2e1a]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[264px] bg-white flex-col justify-between fixed top-0 left-0 bottom-0 h-screen overflow-hidden border-r border-[#eef3ec] z-30">
        <div className="p-6">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 bg-[#0f2815] rounded-xl grid place-items-center text-white"><IconLeaf size={ICON_SIZE} /></span>
            <span className="font-extrabold text-[22px] tracking-[-0.05em] text-[#0f2815]">ReFood</span>
            <span className="text-[11px] bg-[#0f7a3b] text-white px-2 py-0.5 rounded-full font-bold">BUSINESS</span>
          </div>
          <p className="text-[11px] mt-2 text-[#5a6b5a] font-medium">Mama B Kitchen • Business portal</p>
          <nav className="mt-6 space-y-1">
            <button
              onClick={() => handleNav("/business", "dashboard")}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-[13.5px] font-bold flex items-center gap-2.5 cursor-pointer transition ${
                active === "overview" ? "bg-[#0f2815] text-white" : "text-[#3a4a3a] hover:bg-[#f1f6ef]"
              }`}
            >
              <IconGrid size={ICON_SIZE} /> Overview
            </button>
            <button
              onClick={() => handleNav("/business/listings", "listings")}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-[13.5px] font-bold flex items-center gap-2.5 cursor-pointer transition ${
                active === "listings" ? "bg-[#0f2815] text-white" : "text-[#3a4a3a] hover:bg-[#f1f6ef]"
              }`}
            >
              <IconStore size={ICON_SIZE} /> Listings
            </button>
            <button
              onClick={() => handleNav("/business/orders", "orders")}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-[13.5px] font-bold flex items-center gap-2.5 cursor-pointer transition ${
                active === "orders" ? "bg-[#0f2815] text-white" : "text-[#3a4a3a] hover:bg-[#f1f6ef]"
              }`}
            >
              <IconClipboard size={ICON_SIZE} /> Orders
            </button>
          </nav>
        </div>
        <div className="p-5 border-t border-[#eef3ec]">
          <button
            onClick={navigateToCustomer}
            className="w-full bg-[#f7f8f6] border border-[#eef3ec] py-2.5 rounded-xl text-xs font-bold text-[#0f2815] hover:bg-[#eef3ec] transition cursor-pointer"
          >
            ← Customer view
          </button>
          <button
            onClick={logout}
            className="w-full mt-2 bg-white border border-red-200 text-red-600 py-2.5 rounded-xl text-xs font-bold hover:bg-red-50 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="lg:pl-[264px] flex flex-col min-h-screen">
        <div className="min-h-[56px] flex items-center justify-between gap-2 px-3 sm:px-4 lg:px-8 py-2 border-b border-[#eef3ec] sticky top-0 z-10 bg-[#f7f8f6]/80 backdrop-blur-xl">
          <span className="lg:hidden font-extrabold text-[20px] tracking-[-0.06em] text-[#0f2815]">ReFood</span>
          <div className="flex items-center gap-2 shrink-0 ml-auto">
            <span className="hidden md:inline text-[11px] font-bold bg-[#0f7a3b]/10 text-[#0f7a3b] px-2.5 py-1 rounded-full">Verified</span>
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=MamaB&backgroundColor=b6e3f4,c0aede`} alt="" className="w-8 h-8 rounded-full bg-[#eef3ec]" />
          </div>
        </div>
        <main className="px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 pb-28 sm:pb-6 w-full max-w-[1360px] mx-auto flex-1">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Bar for Business */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0f2815] flex justify-around items-center pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] px-2 z-30">
        <button
          onClick={() => handleNav("/business", "dashboard")}
          className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all cursor-pointer"
          style={{ background: active === "overview" ? "rgba(15,122,59,0.15)" : "transparent" }}
        >
          <div className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all ${active === "overview" ? "bg-[#0f7a3b] text-white shadow-[0_2px_10px_rgba(15,122,59,0.35)]" : "text-white/50"}`}>
            <IconGrid size={ICON_SIZE} />
            {active === "overview" && <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#0f7a3b] rounded-full"></span>}
          </div>
          <span className={`text-[10px] leading-none ${active === "overview" ? "font-bold text-white" : "font-medium text-white/50"}`}>Overview</span>
        </button>
        <button
          onClick={() => handleNav("/business/listings", "listings")}
          className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all cursor-pointer"
          style={{ background: active === "listings" ? "rgba(15,122,59,0.15)" : "transparent" }}
        >
          <div className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all ${active === "listings" ? "bg-[#0f7a3b] text-white shadow-[0_2px_10px_rgba(15,122,59,0.35)]" : "text-white/50"}`}>
            <IconStore size={ICON_SIZE} />
            {active === "listings" && <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#0f7a3b] rounded-full"></span>}
          </div>
          <span className={`text-[10px] leading-none ${active === "listings" ? "font-bold text-white" : "font-medium text-white/50"}`}>Listings</span>
        </button>
        <button
          onClick={() => handleNav("/business/orders", "orders")}
          className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all cursor-pointer"
          style={{ background: active === "orders" ? "rgba(15,122,59,0.15)" : "transparent" }}
        >
          <div className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all ${active === "orders" ? "bg-[#0f7a3b] text-white shadow-[0_2px_10px_rgba(15,122,59,0.35)]" : "text-white/50"}`}>
            <IconClipboard size={ICON_SIZE} />
            {active === "orders" && <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#0f7a3b] rounded-full"></span>}
          </div>
          <span className={`text-[10px] leading-none ${active === "orders" ? "font-bold text-white" : "font-medium text-white/50"}`}>Orders</span>
        </button>
      </div>
    </div>
  );
}

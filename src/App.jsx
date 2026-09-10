import { useState, useMemo, useEffect, useRef } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { categories } from "./data/demoData";

function formatNaira(n) { return "₦" + n.toLocaleString(); }

import {
  Leaf, Bell, Search, MapPin, Clock, Heart, Check, ChevronDown, ChevronRight,
  Package, Bike, Home as HomeIcon, LayoutGrid, ClipboardList, Store, User, Star, Utensils,
  ShieldCheck, Truck, Share2, Sparkles, Info, ShoppingCart, CreditCard, Landmark,
  Upload, Pencil, Mail, Phone, Camera, LogOut, Globe, CircleHelp, Headset, Sprout,
  BadgeCheck, ArrowRight,
} from "lucide-react";

// --- Lucide icons: uniform sizes (ICON_SIZE = 20, small meta = 16) ---
const ICON_SIZE = 20;
const ICON_SM = 16;
const IconLeaf = ({ size = ICON_SIZE, className = "" }) => (<Leaf size={size} className={className} />);
const IconBell = ({ size = ICON_SIZE, className = "" }) => (<Bell size={size} className={className} />);
const IconSearch = ({ size = ICON_SIZE, className = "" }) => (<Search size={size} className={className} />);
const IconMapPin = ({ size = ICON_SIZE, className = "" }) => (<MapPin size={size} className={className} />);
const IconClock = ({ size = ICON_SIZE, className = "" }) => (<Clock size={size} className={className} />);
const IconHeart = ({ filled, size = ICON_SIZE, className = "" }) => (<Heart size={size} className={className} fill={filled ? "currentColor" : "none"} />);
const IconCheck = ({ size = ICON_SM, className = "" }) => (<Check size={size} className={className} strokeWidth={3} />);
const IconChevronDown = ({ size = ICON_SIZE, className = "" }) => (<ChevronDown size={size} className={className} />);
const IconChevronRight = ({ size = ICON_SIZE, className = "" }) => (<ChevronRight size={size} className={className} />);
const IconPackage = ({ size = ICON_SIZE, className = "" }) => (<Package size={size} className={className} />);
const IconBike = ({ size = ICON_SIZE, className = "" }) => (<Bike size={size} className={className} />);
const IconHome = ({ size = ICON_SIZE, className = "" }) => (<HomeIcon size={size} className={className} />);
const IconGrid = ({ size = ICON_SIZE, className = "" }) => (<LayoutGrid size={size} className={className} />);
const IconClipboard = ({ size = ICON_SIZE, className = "" }) => (<ClipboardList size={size} className={className} />);
const IconStore = ({ size = ICON_SIZE, className = "" }) => (<Store size={size} className={className} />);
const IconUser = ({ size = ICON_SIZE, className = "" }) => (<User size={size} className={className} />);
const IconStar = ({ size = ICON_SM, className = "" }) => (<Star size={size} className={className} fill="currentColor" strokeWidth={0} />);
const IconUtensils = ({ size = ICON_SIZE, className = "" }) => (<Utensils size={size} className={className} />);
const IconShield = ({ size = ICON_SIZE, className = "" }) => (<ShieldCheck size={size} className={className} />);
const IconTruck = ({ size = ICON_SIZE, className = "" }) => (<Truck size={size} className={className} />);
const IconShare = ({ size = ICON_SIZE, className = "" }) => (<Share2 size={size} className={className} />);
const IconSparkles = ({ size = ICON_SIZE, className = "" }) => (<Sparkles size={size} className={className} />);
const IconInfo = ({ size = ICON_SIZE, className = "" }) => (<Info size={size} className={className} />);
const IconCart = ({ size = ICON_SIZE, className = "" }) => (<ShoppingCart size={size} className={className} />);
const IconCard = ({ size = ICON_SIZE, className = "" }) => (<CreditCard size={size} className={className} />);
const IconBank = ({ size = ICON_SIZE, className = "" }) => (<Landmark size={size} className={className} />);
const IconUpload = ({ size = ICON_SIZE, className = "" }) => (<Upload size={size} className={className} />);
const IconEdit = ({ size = ICON_SIZE, className = "" }) => (<Pencil size={size} className={className} />);
const IconMail = ({ size = ICON_SIZE, className = "" }) => (<Mail size={size} className={className} />);
const IconPhone = ({ size = ICON_SIZE, className = "" }) => (<Phone size={size} className={className} />);
const IconCamera = ({ size = ICON_SM, className = "" }) => (<Camera size={size} className={className} />);
const IconLogout = ({ size = ICON_SIZE, className = "" }) => (<LogOut size={size} className={className} />);
const IconGlobe = ({ size = ICON_SIZE, className = "" }) => (<Globe size={size} className={className} />);
const IconHelp = ({ size = ICON_SIZE, className = "" }) => (<CircleHelp size={size} className={className} />);
const IconHeadset = ({ size = ICON_SIZE, className = "" }) => (<Headset size={size} className={className} />);
const IconSprout = ({ size = ICON_SIZE, className = "" }) => (<Sprout size={size} className={className} />);
const IconBadgeCheck = ({ size = ICON_SM, className = "" }) => (<BadgeCheck size={size} className={className} />);
const IconArrowRight = ({ size = ICON_SIZE, className = "" }) => (<ArrowRight size={size} className={className} />);
// Hero banners (public/). Add more paths here — the carousel fades every 5s.
const BANNERS = ["re%20food.png", "re%20food%20(1).png"].map(f => `/${f}`);
// SDG 12 – Responsible Consumption & Production wheel
const IconSDG = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <rect x="2" y="2" width="44" height="44" rx="6" fill="#BF8B2E" />
    <circle cx="24" cy="24" r="11" fill="none" stroke="#fff" strokeWidth="2.4" />
    <circle cx="24" cy="24" r="4.5" fill="none" stroke="#fff" strokeWidth="2" />
    <path d="M24 13v-4M24 39v-4M13 24H9M39 24h-4M16.3 16.3l-2.8-2.8M34.5 34.5l-2.8-2.8M31.7 16.3l2.8-2.8M13.5 34.5l2.8-2.8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <text x="24" y="44" textAnchor="middle" fontSize="7" fontWeight="800" fill="#fff" fontFamily="sans-serif">12</text>
  </svg>
);


function Shell() {
  const [path, setPath] = useState(() => typeof window !== 'undefined' ? window.location.pathname : "/");
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const isBusiness = path.startsWith("/business");
  if (isBusiness) return <BusinessRouter path={path} setPath={setPath} />;
  return <CustomerShell />;
}

function navigateTo(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function BusinessRouter({ path, setPath }) {
  const isAuthed = typeof window !== 'undefined' ? localStorage.getItem("refood_business_auth") === "true" : false;
  const navigate = (p) => { window.history.pushState({}, "", p); setPath(p); window.scrollTo(0, 0); };
  useEffect(() => { if (!isAuthed && path !== "/business/login" && path.startsWith("/business")) { navigate("/business/login"); } }, [path, isAuthed]);
  if (path === "/business/login") return <BusinessLogin onLogin={() => { localStorage.setItem("refood_business_auth", "true"); navigate("/business"); }} />;
  if (!isAuthed) return <BusinessLogin onLogin={() => { localStorage.setItem("refood_business_auth", "true"); navigate("/business"); }} />;
  // business authenticated layout
  return <BusinessShell path={path} navigate={navigate} />;
}

function BusinessLogin({ onLogin }) {
  const [email, setEmail] = useState("mama@kitchen.ng");
  const [pass, setPass] = useState("password");
  return (
    <div className="min-h-screen bg-[#f7f8f6] grid place-items-center p-6">
      <div className="max-w-[420px] w-full bg-white rounded-[24px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-[#eef3ec]">
        <div className="flex items-center gap-2.5 justify-center">
          <span className="w-9 h-9 bg-[#0f7a3b] rounded-xl grid place-items-center text-white"><IconLeaf size={ICON_SIZE} /></span>
          <span className="font-bold text-xl text-[#0f2815]">ReFood Business</span>
        </div>
        <h1 className="text-[22px] font-bold text-[#0f2815] text-center mt-6">Business login</h1>
        <p className="text-sm text-[#5a6b5a] text-center mt-2 font-medium">List surplus food, manage orders & track sales</p>
        <div className="mt-6 space-y-3">
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Business email" className="w-full bg-[#f7f8f6] rounded-xl px-4 py-3 text-sm font-medium border border-[#eef3ec] focus:outline-none focus:ring-2 focus:ring-[#0f7a3b]/15" />
          <input value={pass} onChange={e => setPass(e.target.value)} type="password" placeholder="Password" className="w-full bg-[#f7f8f6] rounded-xl px-4 py-3 text-sm font-medium border border-[#eef3ec] focus:outline-none focus:ring-2 focus:ring-[#0f7a3b]/15" />
          <button onClick={onLogin} className="w-full bg-[#0f7a3b] hover:bg-[#126a33] text-white py-3.5 rounded-xl font-bold shadow-sm">Login to business portal</button>
          <p className="text-xs text-[#8aa08a] text-center font-medium">Demo: any email / password works • same listings & orders as customers</p>
          <button onClick={() => navigateTo("/")} className="w-full bg-white border border-[#eef3ec] py-3 rounded-xl font-bold text-sm text-[#0f2815]">← Back to customer view</button>
        </div>
      </div>
    </div>
  )
}

function BusinessShell({ path, navigate }) {
  const active = path.startsWith("/business/orders") ? "orders" : path.startsWith("/business/listings") ? "listings" : "overview";
  const logout = () => { localStorage.removeItem("refood_business_auth"); navigate("/business/login"); };
  return (
    <div className="min-h-screen bg-[#f7f8f6] text-[#1a2e1a]">
      <aside className="hidden lg:flex w-[264px] bg-white flex-col justify-between fixed top-0 left-0 bottom-0 h-screen overflow-hidden border-r border-[#eef3ec] z-30">
        <div className="p-6">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 bg-[#0f2815] rounded-xl grid place-items-center text-white"><IconLeaf size={ICON_SIZE} /></span>
            <span className="font-extrabold text-[22px] tracking-[-0.05em] text-[#0f2815]">ReFood</span><span className="text-[11px] bg-[#0f7a3b] text-white px-2 py-0.5 rounded-full font-bold">BUSINESS</span>
          </div>
          <p className="text-[11px] mt-2 text-[#5a6b5a] font-medium">Mama B Kitchen • Business portal</p>
          <nav className="mt-6 space-y-1">
            <button onClick={() => navigate("/business")} className={`w-full text-left px-3.5 py-2.5 rounded-xl text-[13.5px] font-bold flex items-center gap-2.5 ${active === "overview" ? "bg-[#0f2815] text-white" : "text-[#3a4a3a] hover:bg-[#f1f6ef]"}`}><IconGrid size={ICON_SIZE} /> Overview</button>
            <button onClick={() => navigate("/business/listings")} className={`w-full text-left px-3.5 py-2.5 rounded-xl text-[13.5px] font-bold flex items-center gap-2.5 ${active === "listings" ? "bg-[#0f2815] text-white" : "text-[#3a4a3a] hover:bg-[#f1f6ef]"}`}><IconStore size={ICON_SIZE} /> Listings</button>
            <button onClick={() => navigate("/business/orders")} className={`w-full text-left px-3.5 py-2.5 rounded-xl text-[13.5px] font-bold flex items-center gap-2.5 ${active === "orders" ? "bg-[#0f2815] text-white" : "text-[#3a4a3a] hover:bg-[#f1f6ef]"}`}><IconClipboard size={ICON_SIZE} /> Orders</button>
          </nav>
        </div>
        <div className="p-5 border-t border-[#eef3ec]">
          <button onClick={() => navigateTo("/")} className="w-full bg-[#f7f8f6] border border-[#eef3ec] py-2.5 rounded-xl text-xs font-bold text-[#0f2815] hover:bg-[#eef3ec] transition">← Customer view</button>
          <button onClick={logout} className="w-full mt-2 bg-white border border-red-200 text-red-600 py-2.5 rounded-xl text-xs font-bold hover:bg-red-50 transition">Logout</button>
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
          <BusinessRoutes path={path} navigate={navigate} />
        </main>
      </div>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0f2815] flex justify-around items-center pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] px-2 z-30">
        <button onClick={() => navigate("/business")} className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all" style={{ background: active === "overview" ? "rgba(15,122,59,0.15)" : "transparent" }}>
          <div className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all ${active === "overview" ? "bg-[#0f7a3b] text-white shadow-[0_2px_10px_rgba(15,122,59,0.35)]" : "text-white/50"}`}>
            <IconGrid size={ICON_SIZE} />
            {active === "overview" && <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#0f7a3b] rounded-full"></span>}
          </div>
          <span className={`text-[10px] leading-none ${active === "overview" ? "font-bold text-white" : "font-medium text-white/50"}`}>Overview</span>
        </button>
        <button onClick={() => navigate("/business/listings")} className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all" style={{ background: active === "listings" ? "rgba(15,122,59,0.15)" : "transparent" }}>
          <div className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all ${active === "listings" ? "bg-[#0f7a3b] text-white shadow-[0_2px_10px_rgba(15,122,59,0.35)]" : "text-white/50"}`}>
            <IconStore size={ICON_SIZE} />
            {active === "listings" && <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#0f7a3b] rounded-full"></span>}
          </div>
          <span className={`text-[10px] leading-none ${active === "listings" ? "font-bold text-white" : "font-medium text-white/50"}`}>Listings</span>
        </button>
        <button onClick={() => navigate("/business/orders")} className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all" style={{ background: active === "orders" ? "rgba(15,122,59,0.15)" : "transparent" }}>
          <div className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all ${active === "orders" ? "bg-[#0f7a3b] text-white shadow-[0_2px_10px_rgba(15,122,59,0.35)]" : "text-white/50"}`}>
            <IconClipboard size={ICON_SIZE} />
            {active === "orders" && <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#0f7a3b] rounded-full"></span>}
          </div>
          <span className={`text-[10px] leading-none ${active === "orders" ? "font-bold text-white" : "font-medium text-white/50"}`}>Orders</span>
        </button>
      </div>
    </div>
  )
}

function BusinessRoutes({ path, navigate }) {
  // handle sub-routes
  if (path === "/business" || path === "/business/") return <BusinessDashboardBusiness navigate={navigate} path={path} />;
  if (path.startsWith("/business/listings")) {
    if (path === "/business/listings/new") return <BusinessListingFormBusiness navigate={navigate} />;
    const editMatch = path.match(/\/business\/listings\/(.+)\/edit/);
    if (editMatch) return <BusinessListingFormBusiness navigate={navigate} editId={editMatch[1]} />;
    return <BusinessListingsBusiness navigate={navigate} />;
  }
  if (path.startsWith("/business/orders")) {
    const detailMatch = path.match(/\/business\/orders\/(.+)/);
    if (detailMatch && detailMatch[1] !== "") return <BusinessOrderDetailBusiness navigate={navigate} id={detailMatch[1]} />;
    return <BusinessOrdersBusiness navigate={navigate} />;
  }
  return <BusinessDashboardBusiness navigate={navigate} path={path} />;
}

// wrappers to reuse existing business components with business navigation
function BusinessDashboardBusiness({ navigate }) {
  const { listings, orders } = useApp();
  const myListings = listings.filter(l => l.businessId === "business_001");
  const myOrders = orders.filter(o => o.businessId === "business_001");
  const revenue = myOrders.reduce((s, o) => s + o.total, 0);
  return (
    <div className="space-y-6">
      <div><h1 className="text-[22px] sm:text-[24px] font-bold tracking-tight text-[#0f2815] break-words">Overview</h1><p className="text-[13px] sm:text-[13.5px] text-[#3a4a3a] font-medium">Track surplus, orders and impact</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Stat label="Active listings" value={myListings.filter(l => l.status === "active").length} />
        <Stat label="Orders" value={myOrders.length} />
        <Stat label="Revenue" value={formatNaira(revenue)} />
        <Stat label="Meals rescued" value={myOrders.reduce((s, o) => s + o.items.reduce((a, i) => a + i.qty, 0), 0)} />
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[#eef3ec]">
          <div className="flex justify-between items-center"><p className="font-bold text-[#0f2815]">Listings</p><button onClick={() => navigate("/business/listings")} className="text-sm font-bold text-[#0f7a3b]">Manage →</button></div>
          <div className="mt-4 space-y-2.5">
            {myListings.slice(0, 3).map(l => <div key={l.id} className="flex gap-3 text-sm bg-[#f7f8f6] rounded-2xl p-3"><img src={l.image} alt={l.name} className="w-12 h-12 rounded-xl object-cover" /><div><p className="font-bold text-[#0f2815]">{l.name}</p><p className="text-xs text-[#5a6b5a] font-medium">{l.quantity} left • {formatNaira(l.surplusPrice)}</p></div><span className={`ml-auto text-xs px-2.5 py-1 rounded-full h-fit font-bold border ${l.status === "active" ? "bg-[#eef6ec] text-[#0f7a3b] border-[#c8e0c8]" : "bg-[#f1f6ef] text-[#5a6b5a] border-transparent"}`}>{l.status}</span></div>)}
          </div>
          <button onClick={() => navigate("/business/listings/new")} className="mt-4 w-full bg-[#0f7a3b] text-white py-3 rounded-xl text-sm font-bold">+ Add surplus food</button>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[#eef3ec]">
          <div className="flex justify-between items-center"><p className="font-bold text-[#0f2815]">Incoming orders</p><button onClick={() => navigate("/business/orders")} className="text-sm font-bold text-[#0f7a3b]">View all →</button></div>
          <div className="mt-4 space-y-2.5">
            {myOrders.slice(0, 3).map(o => <div key={o.id} onClick={() => navigate(`/business/orders/${o.id}`)} className="bg-[#f7f8f6] rounded-2xl p-3 cursor-pointer hover:bg-[#eef3ec]"><p className="text-sm font-bold text-[#0f2815]">#{o.id} • {o.status.replaceAll("_", " ")}</p><p className="text-xs text-[#5a6b5a] mt-1 font-medium">{o.items.map(i => i.name).join(", ")} • {formatNaira(o.total)}</p></div>)}
            {myOrders.length === 0 && <p className="text-sm text-[#5a6b5a] bg-[#f7f8f6] rounded-2xl p-4 text-center font-medium">No orders yet</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
function BusinessListingsBusiness({ navigate }) {
  const { listings, updateListing, deleteListing } = useApp();
  const my = listings.filter(l => l.businessId === "business_001");
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center"><h1 className="text-[24px] font-bold tracking-tight text-[#0f2815]">My Listings</h1><button onClick={() => navigate("/business/listings/new")} className="bg-[#0f7a3b] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm">+ New listing</button></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {my.map(l => (
          <div key={l.id} className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-[#eef3ec]">
            <img src={l.image} alt={l.name} className="w-full h-36 object-cover" />
            <div className="p-4">
              <p className="font-bold text-sm text-[#0f2815]">{l.name}</p>
              <p className="text-xs text-[#5a6b5a] mt-1 font-medium">{l.category} • {formatNaira(l.surplusPrice)} <span className="line-through">was {formatNaira(l.originalPrice)}</span></p>
              <p className="text-xs font-bold mt-2 text-[#3a4a3a]">Qty: {l.quantity} • <span className="capitalize">{l.status}</span></p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => navigate(`/business/listings/${l.id}/edit`)} className="flex-1 bg-[#f1f6ef] py-2 rounded-xl text-xs font-bold text-[#0f2815]">Edit</button>
                <button onClick={() => updateListing(l.id, { status: l.status === "active" ? "paused" : "active" })} className="flex-1 bg-[#0f2815] text-white py-2 rounded-xl text-xs font-bold">{l.status === "active" ? "Pause" : "Resume"}</button>
                <button onClick={() => deleteListing(l.id)} className="text-xs font-bold text-red-600 px-2">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
function ListingImageField({ value, onChange }) {
  const fileRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const pickFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
  };
  return (
    <div>
      <p className="text-[13px] font-bold text-[#0f2815]">Food photo</p>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); pickFile(e.dataTransfer.files?.[0]); }}
        onClick={() => fileRef.current?.click()}
        className={`mt-2 rounded-2xl border-2 border-dashed cursor-pointer overflow-hidden transition ${dragOver ? "border-[#0f7a3b] bg-[#eef6ec]" : "border-[#d4e6d4] bg-[#f7f8f6] hover:border-[#0f7a3b]/50"}`}
      >
        {value ? (
          <div className="relative">
            <img src={value} alt="listing preview" className="w-full h-44 object-cover" />
            <span className="absolute bottom-2 right-2 bg-[#0f2815]/90 text-white text-[11px] font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1.5"><IconUpload size={ICON_SM} /> Change photo</span>
          </div>
        ) : (
          <div className="py-8 px-4 text-center">
            <span className="w-11 h-11 rounded-full bg-white shadow-sm grid place-items-center mx-auto text-[#0f7a3b]"><IconUpload size={ICON_SIZE} /></span>
            <p className="text-[13px] font-bold text-[#0f2815] mt-2">Upload image</p>
            <p className="text-[12px] text-[#5a6b5a] font-medium">Drag & drop or click to browse · PNG/JPG</p>
          </div>
        )}
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => pickFile(e.target.files?.[0])} />
      <div className="mt-2 flex gap-2">
        <input placeholder="…or paste image URL" value={value?.startsWith("data:") ? "" : (value || "")} onChange={e => onChange(e.target.value)} onClick={e => e.stopPropagation()} className="flex-1 bg-[#f7f8f6] rounded-xl px-4 py-2.5 text-[13px] font-medium border border-[#eef3ec] focus:outline-none focus:ring-2 focus:ring-[#0f7a3b]/15" />
        {value && <button type="button" onClick={() => onChange("")} className="text-[12px] font-bold text-red-600 bg-red-50 px-3 rounded-xl">Clear</button>}
      </div>
    </div>
  );
}
function BusinessListingFormBusiness({ navigate, editId }) {
  const { listings, addListing, updateListing } = useApp();
  const edit = listings.find(l => l.id === editId);
  const [form, setForm] = useState(edit || { name: "", description: "", category: "Meals", originalPrice: 2000, surplusPrice: 1000, quantity: 5, pickupWindow: "Today, 6:00 PM - 8:00 PM", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop", location: "Wuse 2, Abuja • 1.2km", delivery: true });
  const [err, setErr] = useState("");
  const submit = () => {
    if (!form.name || !form.surplusPrice || !form.originalPrice) { setErr("Please fill required fields"); return; }
    if (Number(form.surplusPrice) >= Number(form.originalPrice)) { setErr("Surplus price must be less than original"); return; }
    if (edit) updateListing(edit.id, { ...form, originalPrice: Number(form.originalPrice), surplusPrice: Number(form.surplusPrice), quantity: Number(form.quantity) });
    else addListing({ ...form, originalPrice: Number(form.originalPrice), surplusPrice: Number(form.surplusPrice), quantity: Number(form.quantity) });
    navigate("/business/listings");
  };
  return (
    <div className="max-w-xl space-y-4">
      <button onClick={() => navigate("/business/listings")} className="text-sm font-bold text-[#0f7a3b] inline-flex items-center gap-1"><IconChevronRight size={ICON_SIZE} className="rotate-180" /> Back</button>
      <h1 className="text-[22px] font-bold tracking-tight text-[#0f2815]">{edit ? "Edit listing" : "Add surplus food"}</h1>
      <div className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[#eef3ec] space-y-3">
        <input placeholder="Food name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-[#f7f8f6] rounded-xl px-4 py-3 text-sm font-medium border border-[#eef3ec] focus:outline-none focus:ring-2 focus:ring-[#0f7a3b]/15" />
        <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full bg-[#f7f8f6] rounded-xl px-4 py-3 text-sm font-medium border border-[#eef3ec] focus:outline-none" rows={3} />
        <div className="grid grid-cols-2 gap-3">
          <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="bg-[#f7f8f6] rounded-xl px-4 py-3 text-sm font-medium border border-[#eef3ec] focus:outline-none">{categories.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}</select>
          <input placeholder="Location e.g. Wuse 2, Abuja" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="bg-[#f7f8f6] rounded-xl px-4 py-3 text-sm font-medium border border-[#eef3ec] focus:outline-none" />
        </div>
        <ListingImageField value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
        <div className="grid grid-cols-3 gap-3">
          <input type="number" placeholder="Original" value={form.originalPrice} onChange={e => setForm({ ...form, originalPrice: e.target.value })} className="bg-[#f7f8f6] rounded-xl px-4 py-3 text-sm font-medium border border-[#eef3ec] focus:outline-none" />
          <input type="number" placeholder="Surplus" value={form.surplusPrice} onChange={e => setForm({ ...form, surplusPrice: e.target.value })} className="bg-[#f7f8f6] rounded-xl px-4 py-3 text-sm font-medium border border-[#eef3ec] focus:outline-none" />
          <input type="number" placeholder="Qty" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} className="bg-[#f7f8f6] rounded-xl px-4 py-3 text-sm font-medium border border-[#eef3ec] focus:outline-none" />
        </div>
        <input placeholder="Pickup window e.g. Today, 6:00 PM - 8:00 PM" value={form.pickupWindow} onChange={e => setForm({ ...form, pickupWindow: e.target.value })} className="w-full bg-[#f7f8f6] rounded-xl px-4 py-3 text-sm font-medium border border-[#eef3ec] focus:outline-none" />
        <label className="flex items-center gap-2 text-sm font-bold text-[#0f2815]"><input type="checkbox" checked={form.delivery} onChange={e => setForm({ ...form, delivery: e.target.checked })} className="accent-[#0f7a3b]" /> Delivery available</label>
        {err && <p className="text-sm text-red-600 bg-red-50 rounded-xl p-3 font-medium">{err}</p>}
        <button onClick={submit} className="w-full bg-[#0f7a3b] text-white py-3.5 rounded-xl font-bold shadow-sm">{edit ? "Save changes" : "Create listing"}</button>
        <p className="text-xs text-[#8aa08a] text-center font-medium">Listing will appear instantly in customer browse & home.</p>
      </div>
    </div>
  )
}
function BusinessOrdersBusiness({ navigate }) {
  const { orders } = useApp();
  const my = orders.filter(o => o.businessId === "business_001");
  return (
    <div className="space-y-4">
      <h1 className="text-[24px] font-bold tracking-tight text-[#0f2815]">Incoming Orders</h1>
      <div className="space-y-3">
        {my.map(o => (
          <div key={o.id} onClick={() => navigate(`/business/orders/${o.id}`)} className="bg-white rounded-2xl p-4 flex gap-3 cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.05)] border border-[#eef3ec] hover:shadow-md">
            <div className="w-10 h-10 rounded-xl bg-[#f1f6ef] grid place-items-center text-[#0f7a3b]"><IconClipboard size={ICON_SIZE} /></div>
            <div className="flex-1"><div className="flex items-center gap-2"><span className="font-bold text-sm text-[#0f2815]">#{o.id}</span><span className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full font-bold border border-amber-200">{o.status.replaceAll("_", " ")}</span></div><p className="text-[13px] text-[#3a4a3a] mt-1 font-medium">{o.items.map(i => `${i.name} ×${i.qty}`).join(", ")} • {formatNaira(o.total)} • {o.fulfillment}</p><p className="text-xs text-[#8aa08a] font-medium">{new Date(o.createdAt).toLocaleString()}</p></div>
            <span className="text-[#c5d6c5] self-center"><IconChevronRight size={ICON_SIZE} /></span>
          </div>
        ))}
        {my.length === 0 && <div className="bg-white rounded-2xl p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.05)] border border-[#eef3ec]"><p className="text-[#3a4a3a] font-medium">No orders yet. New customer orders will appear here.</p></div>}
      </div>
    </div>
  )
}
function BusinessOrderDetailBusiness({ navigate, id }) {
  const { orders, updateOrderStatus } = useApp();
  const order = orders.find(o => o.id === id);
  if (!order) return <div className="bg-white rounded-2xl p-8 text-center border border-[#eef3ec]">Order not found</div>;
  const flowDelivery = ["confirmed", "preparing", "on_the_way", "delivered", "completed"];
  const flowPickup = ["confirmed", "preparing", "ready_for_pickup", "completed"];
  const flow = order.fulfillment === "delivery" ? flowDelivery : flowPickup;
  const idx = flow.indexOf(order.status);
  const next = flow[idx + 1];
  const code = order.id.replace(/\D/g, '').slice(-7).padStart(7, '7').slice(0, 7);
  return (
    <div className="max-w-xl space-y-4">
      <button onClick={() => navigate("/business/orders")} className="text-sm font-bold text-[#0f7a3b] inline-flex items-center gap-1"><IconChevronRight size={ICON_SIZE} className="rotate-180" /> Back</button>
      <h1 className="text-[22px] font-bold tracking-tight text-[#0f2815]">Order #{order.id}</h1>
      <div className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[#eef3ec]">
        <p className="text-sm text-[#0f2815] font-bold">Customer: Mercy S. • 070 1234 5678</p>
        <p className="text-sm text-[#5a6b5a] font-medium">Fulfillment: {order.fulfillment} • {formatNaira(order.total)}</p>
        <div className="mt-3 bg-[#f7f8f6] rounded-xl p-3 border border-dashed border-[#c8e0c8] flex justify-between items-center">
          <div><p className="text-[11px] font-bold tracking-widest text-[#5a6b5a] uppercase">Customer code</p><p className="text-xs text-[#8aa08a] font-medium">Ask for this 7-digit code</p></div>
          <div className="flex gap-1">{code.split("").map((d, i) => <span key={i} className="w-7 h-7 bg-white border border-[#d4e6d4] rounded-lg grid place-items-center font-bold text-sm shadow-sm">{d}</span>)}</div>
        </div>
        <div className="mt-4 space-y-2">
          {order.items.map(it => <div key={it.listingId} className="flex justify-between text-sm bg-[#f7f8f6] rounded-xl p-3 font-medium"><span className="text-[#0f2815]">{it.name} × {it.qty}</span><span className="font-bold text-[#0f2815]">{formatNaira(it.price * it.qty)}</span></div>)}
        </div>
        <div className="mt-5">
          <p className="text-sm font-bold text-[#0f2815]">Status: <span className="capitalize">{order.status.replaceAll("_", " ")}</span></p>
          <div className="flex flex-wrap gap-2 mt-3">
            {flow.map((s, i) => <span key={s} className={`text-xs px-3 py-1.5 rounded-full font-bold border ${i <= idx ? "bg-[#0f7a3b] text-white border-[#0f7a3b]" : "bg-[#f1f6ef] text-[#5a6b5a] border-transparent"}`}>{s.replaceAll("_", " ")}</span>)}
          </div>
          {next && <button onClick={() => updateOrderStatus(order.id, next)} className="mt-4 w-full bg-[#0f7a3b] text-white py-3 rounded-xl font-bold shadow-sm">Advance to {next.replaceAll("_", " ")}</button>}
          {!next && <p className="mt-4 text-sm font-bold text-[#0f7a3b] bg-[#eef6ec] p-3 rounded-xl text-center border border-[#c8e0c8]">Order completed ✓</p>}
        </div>
      </div>
    </div>
  )
}

function CustomerShell() {
  const { route, navigate } = useApp();
  useEffect(() => { if (route.name === "welcome") navigate("home"); }, [route.name]);
  if (route.name === "welcome") return null;
  return (
    <div className="min-h-screen bg-[#f7f8f6] text-[#1a2e1a]">
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
          <div className="bg-[#f2f7f1] rounded-2xl p-4 border border-[#eef3ec]">
            <div className="flex items-center gap-2.5">
              <IconSDG size={40} />
              <span className="text-[#0f7a3b]"><IconLeaf size={ICON_SIZE} /></span>
              <div className="flex-1">
                <p className="text-[20px] font-extrabold text-[#0f2815] tracking-tight leading-none">12,450</p>
                <p className="text-[11px] text-[#5a6b5a] font-medium mt-1">meals saved</p>
              </div>
              <span className="text-[#0f2815]"><IconChevronRight size={ICON_SM} /></span>
            </div>
            <p className="text-[11px] text-[#0f7a3b] font-semibold mt-3 pt-3 border-t border-[#e2ece2]">Thank you! · Keep sharing</p>
          </div>
          <button onClick={() => navigateTo("/business/login")} className="mt-2.5 w-full bg-[#0f2815] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#163a1f] transition">Business login →</button>
          <p className="text-[10px] text-[#8aa08a] text-center mt-1 font-medium">Are you a business? Manage at /business</p>
        </div>
      </aside>
      <div className="lg:pl-[264px] flex flex-col min-h-screen">
        <TopBar />
        <main className="px-3 sm:px-4 lg:px-8 pt-6 sm:pt-8 lg:pt-10 pb-20 sm:pb-20 lg:pb-8 max-w-[1100px] mx-auto w-full flex-1">
          <RouterView />
        </main>
      </div>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 pointer-events-none">
        <div className="pointer-events-auto relative bg-[#0f2815] pb-[max(0.85rem,calc(env(safe-area-inset-bottom,0px)+0.5rem))]">
          {/* Background SVG notch (extends above base bar) */}
          <div className="absolute -top-3.5 inset-x-0 h-[26px] pointer-events-none overflow-hidden">
            <svg viewBox="0 0 400 26" preserveAspectRatio="none" className="w-full h-full block">
              <path d="M 0,13 L 168,13 C 176,13 180,16 183,20 C 187,28 192,38 200,38 C 208,38 213,28 217,20 C 220,16 224,13 232,13 L 400,13 L 400,26 L 0,26 Z" fill="#0f2815" />
            </svg>
          </div>
          {/* Nav Items Container */}
          <div className="relative flex justify-around items-center px-1.5 pt-3 pb-1 z-10">
            <button onClick={() => navigate("home")} className="flex flex-col items-center justify-center gap-1 px-2.5 py-1 rounded-lg transition-all" style={{ background: route.name === "home" ? "rgba(15,122,59,0.25)" : "transparent" }}>
              <div className={`relative w-7 h-7 rounded-full flex items-center justify-center transition-all ${route.name === "home" ? "bg-[#0f7a3b] text-white shadow-xs" : "text-white/60"}`}>
                <IconHome size={ICON_SIZE} className={route.name === "home" ? "fill-current" : ""} />
                {route.name === "home" && <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#0f7a3b] rounded-full"></span>}
              </div>
              <span className={`text-[9.5px] leading-none ${route.name === "home" ? "font-bold text-white" : "font-medium text-white/60"}`}>Home</span>
            </button>
            <button onClick={() => navigate("favorites")} className="flex flex-col items-center justify-center gap-1 px-2.5 py-1 rounded-lg transition-all" style={{ background: route.name === "favorites" ? "rgba(15,122,59,0.25)" : "transparent" }}>
              <div className={`relative w-7 h-7 rounded-full flex items-center justify-center transition-all ${route.name === "favorites" ? "bg-[#0f7a3b] text-white shadow-xs" : "text-white/60"}`}>
                <IconHeart size={ICON_SIZE} filled={route.name === "favorites"} />
                {route.name === "favorites" && <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#0f7a3b] rounded-full"></span>}
              </div>
              <span className={`text-[9.5px] leading-none ${route.name === "favorites" ? "font-bold text-white" : "font-medium text-white/60"}`}>Favourites</span>
            </button>

            {/* Center Discover - raised into notch */}
            <div className="flex flex-col items-center justify-center -mt-7">
              <button onClick={() => navigate("browse")} className={`w-[48px] h-[48px] rounded-full flex items-center justify-center transition-all shadow-[0_3px_14px_rgba(0,0,0,0.3)] ${route.name === "browse" ? "bg-[#0f7a3b] text-white shadow-[0_3px_18px_rgba(15,122,59,0.45)]" : "bg-white text-[#0f7a3b] active:scale-95"}`}>
                <IconSearch size={20} />
              </button>
              <span className={`text-[9.5px] leading-none mt-1 ${route.name === "browse" ? "font-bold text-white" : "font-medium text-white/70"}`}>Discover</span>
            </div>

            <button onClick={() => navigate("orders")} className="flex flex-col items-center justify-center gap-1 px-2.5 py-1 rounded-lg transition-all" style={{ background: ["orders", "orderDetail", "trackOrder"].includes(route.name) ? "rgba(15,122,59,0.25)" : "transparent" }}>
              <div className={`relative w-7 h-7 rounded-full flex items-center justify-center transition-all ${["orders", "orderDetail", "trackOrder"].includes(route.name) ? "bg-[#0f7a3b] text-white shadow-xs" : "text-white/60"}`}>
                <IconClock size={ICON_SIZE} />
                {["orders", "orderDetail", "trackOrder"].includes(route.name) && <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#0f7a3b] rounded-full"></span>}
              </div>
              <span className={`text-[9.5px] leading-none ${["orders", "orderDetail", "trackOrder"].includes(route.name) ? "font-bold text-white" : "font-medium text-white/60"}`}>History</span>
            </button>
            <button onClick={() => navigate("profile")} className="flex flex-col items-center justify-center gap-1 px-2.5 py-1 rounded-lg transition-all" style={{ background: route.name === "profile" ? "rgba(15,122,59,0.25)" : "transparent" }}>
              <div className={`relative w-7 h-7 rounded-full flex items-center justify-center transition-all ${route.name === "profile" ? "bg-[#0f7a3b] text-white shadow-xs" : "text-white/60"}`}>
                <IconUser size={ICON_SIZE} />
                {route.name === "profile" && <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#0f7a3b] rounded-full"></span>}
              </div>
              <span className={`text-[9.5px] leading-none ${route.name === "profile" ? "font-bold text-white" : "font-medium text-white/60"}`}>Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function NavItem({ label, icon, active, onClick }) {
  return <button onClick={onClick} className={`w-full text-left px-3.5 py-2.5 rounded-xl text-[13.5px] transition flex items-center gap-2.5 ${active ? 'bg-[#e9f4e9] text-[#0f5c2e] font-bold shadow-none' : 'font-semibold text-[#0f2815] hover:bg-[#f1f6ef]'}`}><span className={`${active ? 'text-[#0f7a3b]' : 'text-[#0f2815]'}`}>{icon}</span>{label}</button>
}
function MobileNav({ name, label }) {
  const { route, navigate } = useApp();
  const isActive = name === "orders" ? ["orders", "orderDetail", "trackOrder"].includes(route.name) : route.name === name;
  const icons = {
    home: <IconHome size={isActive ? 20 : 18} />,
    browse: <IconSearch size={isActive ? 20 : 18} />,
    orders: <IconClipboard size={isActive ? 20 : 18} />,
    favorites: <IconHeart size={isActive ? 18 : 16} filled={isActive} />,
    profile: <IconUser size={isActive ? 20 : 18} />,
  };
  return (
    <button onClick={() => navigate(name)} className={`flex flex-col items-center justify-center gap-1 px-3 sm:px-4 py-2 rounded-2xl transition-all min-w-[60px] ${isActive ? 'text-[#0f7a3b] bg-[#eef6ec] scale-[1.04] shadow-sm' : 'text-[#8aa08a]'}`}>
      <span className="relative grid place-items-center">
        {isActive && <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#0f7a3b] rounded-full"></span>}
        <span className={`${isActive ? 'text-[#0f7a3b]' : 'text-[#8aa08a]'} transition-transform ${isActive ? 'scale-110' : ''}`}>{icons[name]}</span>
      </span>
      <span className={`text-[11px] leading-none ${isActive ? 'font-bold text-[#0f7a3b]' : 'font-semibold'}`}>{label}</span>
    </button>
  )
}
function BusinessMobileNav({ label, active, onClick, icon }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-2xl transition-all min-w-[72px] ${active ? 'text-[#0f2815] bg-[#eef6ec] scale-[1.04] shadow-sm' : 'text-[#8aa08a]'}`}>
      <span className="relative grid place-items-center">
        {active && <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#0f2815] rounded-full"></span>}
        <span className={`${active ? 'text-[#0f2815]' : 'text-[#8aa08a]'} ${active ? 'scale-110' : ''}`}>{icon}</span>
      </span>
      <span className={`text-[11px] leading-none ${active ? 'font-bold' : 'font-semibold'}`}>{label}</span>
    </button>
  )
}
function TopBar() {
  const { currentUser, navigate, route, cart, notifications, setNotifications } = useApp();
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const unread = notifications.filter(n => !n.read).length;
  const [openNoti, setOpenNoti] = useState(false);
  const notiRef = useRef(null);
  useEffect(() => {
    const close = (e) => { if (notiRef.current && !notiRef.current.contains(e.target)) setOpenNoti(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  const dicebear = (seed) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc`;
  const iconBtn = "relative w-10 h-10 grid place-items-center rounded-full bg-white border border-[#eef3ec] shadow-sm hover:bg-[#eef3ec] transition text-[#0f2815]";
  const [tq, setTq] = useState("");
  return (
    <div className="min-h-[56px] sm:min-h-[64px] flex items-center justify-between gap-3 px-4 sm:px-5 lg:px-8 py-2 sticky top-0 z-20 bg-[#f7f8f6]/80 backdrop-blur-xl">
      <div className="flex items-center gap-1 lg:hidden">
        <span className="text-[22px] sm:text-[26px] font-extrabold tracking-[-0.06em] text-[#0f2815]">ReFood</span>
      </div>
      {/* Desktop search pill → Browse */}
      <form onSubmit={(e) => { e.preventDefault(); navigate("browse", { q: tq }); }} className="hidden md:flex flex-1 max-w-[560px] relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0f2815]"><IconSearch size={ICON_SIZE} /></span>
        <input value={tq} onChange={e => setTq(e.target.value)} placeholder="Search food, restaurants or cuisines…" className="w-full bg-white border border-[#e2ece2] rounded-full pl-11 pr-4 py-2.5 text-[13.5px] text-[#0f2815] placeholder:text-[#8aa08a] font-medium focus:outline-none focus:border-[#c8e0c8] focus:ring-4 focus:ring-[#eef6ec]" />
      </form>
      <div className="flex items-center gap-2 ml-auto">
        {/* Notifications */}
        <div className="relative" ref={notiRef}>
          <button onClick={() => setOpenNoti(!openNoti)} aria-label="Notifications" title="Notifications" className={`${iconBtn} border-transparent shadow-none hover:bg-[#eef3ec]`}>
            <IconBell size={ICON_SIZE} />
            {unread > 0 && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#0f7a3b] rounded-full ring-2 ring-[#f7f8f6]"></span>}
          </button>
          {openNoti && (
            <div className="absolute right-0 top-full mt-2 w-[320px] sm:w-[360px] bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-[#eef3ec] overflow-hidden z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#eef3ec]">
                <span className="font-bold text-[14px] text-[#0f2815]">Notifications</span>
                <button onClick={() => { setNotifications(prev => prev.map(n => ({ ...n, read: true }))); }} className="text-[12px] font-bold text-[#0f7a3b]">Mark all read</button>
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
              <button onClick={() => { setOpenNoti(false); navigate("notifications"); }} className="w-full text-center py-2.5 text-[13px] font-bold text-[#0f7a3b] border-t border-[#eef3ec] hover:bg-[#f7f8f6] transition">View all</button>
            </div>
          )}
        </div>
        {/* Cart */}
        <button onClick={() => navigate("cart")} aria-label="Cart" title="Cart" className={`${iconBtn} border-transparent shadow-none hover:bg-[#eef3ec] ${route?.name === "cart" ? "bg-[#eef3ec]" : ""}`}>
          <IconCart size={ICON_SIZE} />
          {cartCount > 0 && <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-[#0f7a3b] text-white text-[11px] font-extrabold rounded-full grid place-items-center ring-2 ring-[#f7f8f6]">{cartCount > 99 ? "99+" : cartCount}</span>}
        </button>
        {/* Profile */}
        <button onClick={() => navigate("profile")} className="flex items-center gap-2 hover:opacity-80 transition ml-1">
          <img src={dicebear(currentUser.name)} alt="avatar" className="w-10 h-10 rounded-full bg-white border border-[#eef3ec] shadow-sm" />
          <span className="hidden lg:inline text-[14px] font-bold text-[#0f2815]">Mercy S.</span>
          <span className="hidden lg:inline text-[#0f2815]"><IconChevronDown size={ICON_SM} /></span>
        </button>
      </div>
    </div>
  )
}
function RouterView() {
  const { route } = useApp();
  switch (route.name) {
    case "home": return <Home />;
    case "browse": return <Browse />;
    case "foodDetail": return <FoodDetail id={route.params.id} />;
    case "businessProfile": return <BusinessProfile id={route.params.id} />;
    case "favorites": return <Favorites />;
    case "cart": return <Cart />;
    case "checkout": return <Checkout />;
    case "orderSuccess": return <OrderSuccess id={route.params.id} />;
    case "orders": return <Orders />;
    case "orderDetail": return <OrderDetail id={route.params.id} />;
    case "trackOrder": return <TrackOrder id={route.params.id} />;
    case "notifications": return <Notifications />;
    case "profile": return <Profile />;
    case "addresses": return <Addresses />;
    case "businessDashboard": return <BusinessDashboard />;
    case "businessListings": return <BusinessListings />;
    case "businessOrders": return <BusinessOrders />;
    case "businessOrderDetail": return <BusinessOrderDetail id={route.params.id} />;
    case "businessListingForm": return <BusinessListingForm editId={route.params.editId} />;
    case "businessProfileEdit": return <BusinessProfileEdit />;
    default: return <Home />;
  }
}
function Welcome() {
  const { navigate, setRole } = useApp();
  return (
    <div className="min-h-screen grid place-items-center bg-[#f7f8f6] p-6">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 items-center bg-white rounded-[28px] p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
        <div>
          <div className="font-extrabold text-[28px] tracking-[-0.06em] text-[#0f2815]">ReFood</div>
          <h1 className="text-[38px] font-bold leading-[0.95] tracking-tight mt-6 text-[#0f2815]">Good food.<br /><span className="text-[#0f7a3b]">Less waste.</span><br />Stronger communities.</h1>
          <p className="text-[15px] leading-relaxed text-[#3a4a3a] mt-4 max-w-[420px]">Join the surplus marketplace connecting Abuja with affordable, quality food while reducing waste.</p>
          <div className="mt-7 grid grid-cols-2 gap-3">
            <button onClick={() => { setRole("customer"); navigate("home"); }} className="bg-[#0f7a3b] text-white py-3.5 rounded-2xl font-semibold shadow-sm">Continue as Customer</button>
            <button onClick={() => { setRole("business"); navigate("businessDashboard"); }} className="bg-[#0f2815] text-white py-3.5 rounded-2xl font-semibold">Continue as Business</button>
          </div>
          <div className="mt-4 flex gap-3 text-[13px]">
            <button onClick={() => { setRole("customer"); navigate("home"); }} className="text-[#0f7a3b] font-semibold">Demo: Mercy S.</button>
            <span className="text-[#c5d6c5]">·</span>
            <button onClick={() => { setRole("business"); navigate("businessDashboard"); }} className="text-[#0f7a3b] font-semibold">Demo: Mama B Kitchen</button>
          </div>
        </div>
        <div className="bg-[#f1f6ef] rounded-[24px] p-4">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&h=500&fit=crop" alt="food" className="rounded-2xl w-full h-[300px] object-cover" />
          <div className="mt-4 bg-white rounded-2xl p-4 shadow-sm">
            <p className="font-semibold text-[#0f2815]">Delicious food. Better planet.</p>
            <p className="text-sm leading-relaxed text-[#3a4a3a] mt-1">Find affordable surplus food near you and make an impact.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hero banner carousel — crossfades through public/ banners every 5s.
function HeroBanner() {
  const { navigate } = useApp();
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (BANNERS.length < 2) return;
    const t = setInterval(() => setIdx(i => (i + 1) % BANNERS.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#e9f2e9] shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
      <button onClick={() => navigate("browse")} aria-label="Browse surplus food" className="block w-full text-left">
        <div className="grid w-full">
          {BANNERS.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={i === 0 ? "Enjoy good food at a better price" : "Eat well, spend less"}
              loading={i === 0 ? "eager" : "lazy"}
              className={`col-start-1 row-start-1 w-full h-auto transition-opacity duration-1000 ${i === idx ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
      </button>
      {BANNERS.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {BANNERS.map((src, i) => (
            <button key={src} onClick={() => setIdx(i)} aria-label={`Banner ${i + 1}`} className={`h-2 rounded-full transition-all ${i === idx ? "w-6 bg-white shadow" : "w-2 bg-white/60 hover:bg-white/90"}`} />
          ))}
        </div>
      )}
    </div>
  );
}
function Home() {
  const { listings, businesses, navigate } = useApp();
  const [q, setQ] = useState("");
  const [searching, setSearching] = useState(false);
  const filtered = useMemo(() => listings.filter(l => l.name.toLowerCase().includes(q.toLowerCase()) || businesses.find(b => b.id === l.businessId)?.name.toLowerCase().includes(q.toLowerCase())), [q, listings, businesses]);
  return (
    <div className="space-y-5 sm:space-y-7">
      {/* Mobile search — desktop uses the TopBar search pill */}
      <div className="md:hidden">
        <div className="relative min-w-0">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8aa08a] z-10"><IconSearch size={ICON_SIZE} /></span>
          <input value={q} onChange={e => setQ(e.target.value)} onFocus={() => setSearching(true)} onClick={() => setSearching(true)} placeholder="Search food, restaurants or cuisines…" className="w-full bg-white border border-[#e2ece2] rounded-full pl-10 sm:pl-11 pr-4 py-3 sm:py-3.5 text-[13px] sm:text-[14px] text-[#0f2815] placeholder:text-[#8aa08a] placeholder:font-medium focus:outline-none focus:border-[#c8e0c8] focus:ring-4 focus:ring-[#eef6ec] font-medium transition-all" />
        </div>
        {!searching && <p className="text-xs text-[#5a6b5a] mt-2.5 font-medium px-1"><span className="text-[#0f7a3b] font-bold">Try:</span> Jollof rice, Suya, Pounded Yam…</p>}
      </div>

      {searching && (
        <div className="fixed inset-0 z-50 bg-white/60 backdrop-blur-sm" onClick={() => { setSearching(false); setQ(""); }}>
          <div className="bg-[#f7f8f6] min-h-screen" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-[#f7f8f6]/90 backdrop-blur-xl px-4 py-3 flex items-center gap-3 border-b border-[#eef3ec]">
              <button onClick={() => { setSearching(false); setQ(""); }} className="w-9 h-9 grid place-items-center rounded-full hover:bg-[#eef3ec] transition shrink-0">
                <IconChevronRight size={ICON_SIZE} className="rotate-180" />
              </button>
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8aa08a]"><IconSearch size={ICON_SIZE} /></span>
                <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search for food or restaurants…" className="w-full bg-white border border-[#e2ece2] rounded-full pl-10 pr-4 py-2.5 text-[14px] text-[#0f2815] placeholder:text-[#8aa08a] font-medium focus:outline-none focus:border-[#c8e0c8] focus:ring-4 focus:ring-[#eef6ec]" />
              </div>
            </div>
            <div className="px-4 py-4">
              {q.length === 0 ? (
                <div className="space-y-4">
                  <p className="text-[12px] font-bold text-[#8aa08a] uppercase tracking-wide">Recent searches</p>
                  <div className="flex flex-wrap gap-2">
                    {["Jollof Rice", "Suya", "Pounded Yam", "Moi Moi", "Chin Chin"].map(s => (
                      <button key={s} onClick={() => setQ(s)} className="bg-white border border-[#eef3ec] rounded-full px-4 py-2 text-[13px] font-semibold text-[#3a4a3a] hover:bg-[#eef3ec] transition">{s}</button>
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
                        <button key={l.id} onClick={() => { setSearching(false); setQ(""); navigate("foodDetail", { id: l.id }); }} className="w-full bg-white rounded-xl p-3 flex gap-3 items-center shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-md transition text-left">
                          <img src={l.image} alt={l.name} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-[13px] text-[#0f2815] truncate">{l.name}</p>
                            <p className="text-[11px] text-[#5a6b5a] font-medium truncate">{b?.name}</p>
                            <p className="text-[13px] font-extrabold text-[#0f2815] mt-0.5">{formatNaira(l.surplusPrice)}</p>
                          </div>
                          <IconChevronRight size={ICON_SIZE} className="text-[#8aa08a] shrink-0" />
                        </button>
                      )
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
          <button onClick={() => navigate("browse")} className="text-[13px] font-bold text-[#0f7a3b] inline-flex items-center gap-1 shrink-0 hover:underline">See all <IconArrowRight size={ICON_SM} /></button>
        </div>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
          {filtered.slice(0, 8).map(l => <FoodCard key={l.id} listing={l} />)}
        </div>
        {filtered.length === 0 && <Empty text="No food found for your search." actionLabel="Clear search" onAction={() => setQ("")} />}
      </div>
    </div>
  )
}
function FoodCard({ listing }) {
  const { businesses, toggleFavorite, favorites, navigate, addToCart, removeFromCart, cart } = useApp();
  const b = businesses.find(x => x.id === listing.businessId);
  const discount = Math.round((1 - listing.surplusPrice / listing.originalPrice) * 100);
  const fav = favorites.includes(listing.id);
  const inCart = cart.some(c => c.listingId === listing.id);
  const soldOut = listing.status === "sold_out" || listing.quantity <= 0;
  return (
    <div className="bg-white rounded-[20px] overflow-hidden border border-[#eef3ec] shadow-[0_1px_6px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] transition flex flex-col p-2">
      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#f7f8f6]">
        <img src={listing.image} alt={listing.name} className="w-full h-full object-cover cursor-pointer" onClick={() => navigate("foodDetail", { id: listing.id })} />
        {discount >= 10 && <span className="absolute top-2 left-2 bg-[#0f7a3b] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow">-{discount}%</span>}
        {soldOut && <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] grid place-items-center"><span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-md">Sold out</span></div>}
      </div>
      <div className="px-1.5 pt-1.5 pb-1 flex flex-col flex-1">
        <p className="text-[10px] font-medium text-[#8aa08a] truncate flex items-center gap-1"><IconMapPin size={12} className="shrink-0" />{listing.location}</p>
        <div className="mt-1 flex items-baseline gap-1.5">
          <p className="font-extrabold text-[16px] text-[#0f2815] whitespace-nowrap">{formatNaira(listing.surplusPrice)}</p>
          <p className="text-[11px] line-through text-[#9ab09a]">{formatNaira(listing.originalPrice)}</p>
        </div>
        <p className="mt-0.5 font-semibold sm:font-bold text-[12.5px] leading-snug text-[#0f2815] line-clamp-2 cursor-pointer" onClick={() => navigate("foodDetail", { id: listing.id })}>{listing.name}</p>
        <div className="mt-auto pt-2.5 flex gap-1.5 sm:gap-2">
          <button onClick={(e) => { e.stopPropagation(); toggleFavorite(listing.id); }} title={fav ? "Remove from favourites" : "Save to favourites"} aria-label={fav ? "Remove from favourites" : "Save to favourites"} className={`w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full grid place-items-center transition active:scale-90 ${fav ? "bg-red-500 text-white" : "bg-[#FFA726] text-[#0f2815]"}`}>
            <IconHeart filled={fav} size={18} />
          </button>
          {!soldOut ? (
            <button onClick={(e) => { e.stopPropagation(); inCart ? removeFromCart(listing.id) : addToCart(listing.id, 1); }} title={inCart ? "Remove from cart" : "Add to cart"} className={`flex-1 min-w-0 h-10 sm:h-11 px-2 rounded-full text-[10px] sm:text-[12.5px] font-extrabold tracking-wide truncate transition active:scale-[0.98] ${inCart ? "bg-red-500 hover:bg-red-600 text-white" : "bg-[#0f2815] hover:bg-black text-white"}`}>
              {inCart ? "REMOVE ✕" : "ADD TO CART"}
            </button>
          ) : <div className="flex-1 min-w-0 h-10 sm:h-11 px-2 rounded-full text-[10px] sm:text-[12.5px] font-extrabold bg-[#f7f8f6] text-[#8aa08a] grid place-items-center truncate">UNAVAILABLE</div>}        </div>
      </div>
    </div>
  )
}
function Browse() {
  const { listings, businesses, route } = useApp();
  const [q, setQ] = useState(route.params?.q || "");
  const [cat, setCat] = useState("All");
  const [maxPrice, setMaxPrice] = useState(3000);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  useEffect(() => { if (typeof route.params?.q === "string") setQ(route.params.q); }, [route.params?.q]);
  const filtered = listings.filter(l => {
    if (cat !== "All" && l.category !== cat) return false;
    if (l.surplusPrice > maxPrice) return false;
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
      <div className="bg-white rounded-2xl p-4 shadow-[0_2px_16px_rgba(0,0,0,0.05)] space-y-3">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 relative">
            <span className="absolute left-3.5 top-3.5 text-[#8aa08a]"><IconSearch size={ICON_SIZE} /></span>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search food or restaurant…" className="w-full bg-[#f7f8f6] rounded-xl pl-10 pr-4 py-3 text-sm text-[#0f2815] placeholder:text-[#8aa08a] font-medium focus:outline-none focus:ring-2 focus:ring-[#0f7a3b]/15" />
          </div>
          <select value={cat} onChange={e => setCat(e.target.value)} className="bg-[#f7f8f6] rounded-xl px-4 py-3 text-sm text-[#0f2815] font-medium focus:outline-none">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <label className="flex items-center gap-2 text-sm bg-[#f7f8f6] rounded-xl px-4 py-2.5 font-semibold text-[#0f2815]">
            <input type="checkbox" checked={onlyAvailable} onChange={e => setOnlyAvailable(e.target.checked)} className="accent-[#0f7a3b]" /> Only available
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="text-[#3a4a3a] font-semibold">Max price: <span className="text-[#0f2815] font-bold">{formatNaira(maxPrice)}</span></span>
          <input type="range" min={500} max={3000} step={100} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="flex-1 min-w-[180px] accent-[#0f7a3b]" />
          <button onClick={() => { setQ(""); setCat("All"); setMaxPrice(3000); setOnlyAvailable(false); }} className="text-[#0f7a3b] font-bold text-sm">Clear filters</button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
        {filtered.map(l => <FoodCard key={l.id} listing={l} />)}
      </div>
      {filtered.length === 0 && <Empty text="No food found for your search." actionLabel="Clear filters" onAction={() => { setQ(""); setCat("All"); }} />}
    </div>
  )
}
function FoodDetail({ id }) {
  const { listings, businesses, favorites, toggleFavorite, addToCart, navigate, cart } = useApp();
  const listing = listings.find(l => l.id === id);
  const [qty, setQty] = useState(1);
  const [deliveryType, setDeliveryType] = useState("pickup");

  if (!listing) return <Empty text="Listing not found" actionLabel="Browse" onAction={() => navigate("browse")} />;
  const b = businesses.find(x => x.id === listing.businessId) || {
    name: "Partner Kitchen",
    location: "Abuja",
    rating: 4.8,
    reviews: 120,
    category: "Meals"
  };

  const discount = Math.round((1 - listing.surplusPrice / listing.originalPrice) * 100);
  const fav = favorites.includes(listing.id);
  const inCart = cart.find(c => c.listingId === id);
  const sameKitchen = listings.filter(l => l.businessId === b.id && l.id !== id).slice(0, 4);
  const others = listings.filter(l => l.businessId !== b.id && l.id !== id).slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Back navigation */}
      <div>
        <BackButton label="Back" fallback="browse" />
      </div>

      {/* Clean 2-column Product Card */}
      <div className="bg-white rounded-2xl border border-[#eef3ec] shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left: Product Image */}
        <div className="relative min-h-[300px] sm:min-h-[380px] md:min-h-[440px] bg-[#f7f8f6]">
          <img
            src={listing.image}
            alt={listing.name}
            className="w-full h-full object-cover"
          />
          {discount > 0 && (
            <span className="absolute top-4 left-4 bg-[#0f7a3b] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md">
              {discount}% OFF
            </span>
          )}
          <button
            onClick={() => toggleFavorite(id)}
            title={fav ? "Remove from favourites" : "Save to favourites"}
            className={`absolute top-4 right-4 h-11 pl-3 pr-4 rounded-full shadow-md grid place-items-center transition active:scale-95 border ${fav ? "bg-red-500 border-red-500 text-white" : "bg-white border-white text-[#0f2815] hover:text-red-500"}`}
            aria-label={fav ? "Remove from favourites" : "Save to favourites"}
          >
            <span className="flex items-center gap-1.5"><IconHeart filled={fav} size={ICON_SIZE} /><span className="text-xs font-extrabold">{fav ? "Saved" : "Save"}</span></span>
          </button>
        </div>

        {/* Right: Product Details & Actions */}
        <div className="flex flex-col p-6 sm:p-8 lg:p-10 justify-between">
          {/* Merchant info link */}
          <div className="flex items-center gap-2 text-xs font-medium text-[#5a6b5a] flex-wrap">
            <button onClick={() => navigate("businessProfile", { id: b.id })} className="text-[#0f7a3b] hover:underline font-semibold">
              {b.name}
            </button>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#0f2815]">
              <IconStar size={ICON_SM} className="text-[#d4a017]" /> {b.rating} ({b.reviews})
            </span>
            <span>•</span>
            <span>{b.location}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f2815] mt-2 tracking-tight leading-tight">
            {listing.name}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-3 mt-4">
            <span className="text-3xl font-black text-[#0f2815]">
              {formatNaira(listing.surplusPrice)}
            </span>
            <span className="text-base line-through text-[#8aa08a]">
              {formatNaira(listing.originalPrice)}
            </span>
            <span className="text-xs font-bold text-[#0f7a3b] bg-[#eef6ec] px-2 py-1 rounded">
              Save {formatNaira(listing.originalPrice - listing.surplusPrice)}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-[#5a6b5a] mt-4 leading-relaxed">
            {listing.description}
          </p>

          {/* Order specifications */}
          <div className="mt-6 pt-5 border-t border-[#eef3ec] space-y-2.5 text-xs text-[#3a4a3a]">
            <div className="flex justify-between py-1 border-b border-[#f7f8f6]">
              <span className="text-[#8aa08a]">Pickup Window</span>
              <span className="font-semibold text-[#0f2815]">{listing.pickupWindow}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#f7f8f6]">
              <span className="text-[#8aa08a]">Location</span>
              <span className="font-semibold text-[#0f2815]">{listing.location}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#f7f8f6]">
              <span className="text-[#8aa08a]">Availability</span>
              <span className="font-semibold text-[#0f7a3b]">{listing.quantity} remaining</span>
            </div>
          </div>

          {/* Delivery/Pickup Option */}
          {listing.delivery && (
            <div className="mt-5 space-y-2">
              <label className="text-xs font-semibold text-[#5a6b5a]">Order Option</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryType("pickup")}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${deliveryType === "pickup" ? "border-[#0f7a3b] bg-[#eef6ec] text-[#0f7a3b]" : "border-[#e2ece2] text-[#5a6b5a] hover:bg-[#f7f8f6]"}`}
                >
                  <IconStore size={ICON_SIZE} /> Self Pickup (Free)
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryType("delivery")}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${deliveryType === "delivery" ? "border-[#0f7a3b] bg-[#eef6ec] text-[#0f7a3b]" : "border-[#e2ece2] text-[#5a6b5a] hover:bg-[#f7f8f6]"}`}
                >
                  <IconBike size={ICON_SIZE} /> Delivery (+₦500)
                </button>
              </div>
            </div>
          )}

          {/* Quantity & Actions */}
          {listing.status !== "sold_out" && listing.quantity > 0 ? (
            <div className="mt-6 pt-5 border-t border-[#eef3ec] space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#d6e2d6] rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-9 h-9 grid place-items-center text-sm font-bold text-[#0f2815] hover:bg-[#f7f8f6] transition"
                  >−</button>
                  <span className="w-10 text-center text-sm font-bold text-[#0f2815]">{qty}</span>
                  <button
                    onClick={() => setQty(Math.min(listing.quantity, qty + 1))}
                    className="w-9 h-9 grid place-items-center text-sm font-bold text-[#0f2815] hover:bg-[#f7f8f6] transition"
                  >+</button>
                </div>
                <button
                  onClick={() => { for (let i = 0; i < qty; i++) addToCart(id, 1); }}
                  className="flex-1 bg-[#0f7a3b] hover:bg-[#126a33] text-white py-2.5 px-4 rounded-xl font-bold text-sm shadow-sm transition"
                >
                  Add to cart • {formatNaira(listing.surplusPrice * qty)}
                </button>
              </div>

              <button
                onClick={() => { for (let i = 0; i < qty; i++) addToCart(id, 1); navigate("checkout"); }}
                className="w-full bg-[#0f2815] hover:bg-black text-white py-2.5 rounded-xl font-bold text-sm transition"
              >
                Buy Now
              </button>

              {inCart && (
                <p className="text-xs text-center text-[#0f7a3b] font-medium pt-1">
                  ✓ {inCart.qty} already in your cart • <button onClick={() => navigate("cart")} className="underline font-bold">View Cart</button>
                </p>
              )}
            </div>
          ) : (
            <div className="mt-6 p-3.5 bg-red-50 text-red-600 rounded-xl text-center font-bold text-xs border border-red-100">
              Sold Out — Check back for the next batch
            </div>
          )}

        </div>
      </div>

      {/* More from this kitchen */}
      {sameKitchen.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#0f2815]">More from {b.name}</h3>
            <button onClick={() => navigate("businessProfile", { id: b.id })} className="text-xs font-bold text-[#0f7a3b] hover:underline">
              View restaurant →
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {sameKitchen.map(l => <FoodCard key={l.id} listing={l} />)}
          </div>
        </div>
      )}

      {/* Similar deals */}
      {others.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-bold text-base text-[#0f2815]">You might also like</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {others.map(l => <FoodCard key={l.id} listing={l} />)}
          </div>
        </div>
      )}
    </div>
  );
}
function BusinessProfile({ id }) {
  const { businesses, listings, navigate } = useApp();
  const b = businesses.find(x => x.id === id);
  if (!b) return <Empty text="Business not found" />;
  const bizListings = listings.filter(l => l.businessId === id);
  return (
    <div className="space-y-6">
      <div><BackButton label="Back" fallback="home" /></div>
      {/* Banner + profile card - redesigned to match screenshot exactly */}
      <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.07)]">
        {/* Green banner with dotted pattern - full width, rounded top */}
        <div className="h-[116px] md:h-[132px] bg-[#157a3b] relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.32]" style={{ backgroundImage: "radial-gradient(circle, white 1.35px, transparent 1.35px)", backgroundSize: "20px 20px" }}></div>
          {/* decorative translucent circles top-right like screenshot */}
          <div className="absolute right-[72px] top-[18px] w-[96px] h-[96px] bg-white/[0.09] rounded-full"></div>
          <div className="absolute right-[36px] top-[42px] w-[96px] h-[96px] bg-white/[0.06] rounded-full"></div>
        </div>
        <div className="px-5 md:px-7 pb-6">
          {/* overlapping image + header row straddling banner edge */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-5 -mt-[44px] relative">
            <img src={b.image} alt={b.name} className="w-[88px] h-[88px] md:w-[96px] md:h-[96px] rounded-2xl object-cover shadow-[0_4px_16px_rgba(0,0,0,0.12)] ring-[4px] ring-white shrink-0 bg-white" />
            <div className="flex-1 min-w-0 pt-0 md:pt-[54px]">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="leading-none">
                  <p className="text-[10px] font-bold tracking-[0.14em] text-[#6b7f6e] uppercase leading-none">Partner</p>
                  <h1 className="text-[19px] md:text-[20px] font-bold tracking-tight text-[#0f1f0f] leading-none mt-[2px]">{b.name}</h1>
                </div>
                {b.verified && <span className="inline-flex items-center gap-1 text-[11px] bg-white text-[#157a3b] px-2.5 py-1 rounded-full font-bold shadow-[0_1px_6px_rgba(0,0,0,0.08)] border border-[#e2eee2]"><span className="text-[#157a3b]"><IconCheck size={ICON_SM} /></span>Verified</span>}
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
            {/* Right actions - stacked, fixed width like screenshot */}
            <div className="flex md:flex-col gap-2.5 shrink-0 md:pt-[54px] md:w-[148px]">
              <button className="flex-1 md:w-full bg-[#157a3b] hover:bg-[#126a33] text-white py-[13px] rounded-xl text-[13.5px] font-bold shadow-sm transition">Contact</button>
              <button className="flex-1 md:w-full bg-[#f1f6ef] hover:bg-[#e8f0e8] text-[#0f2815] py-[13px] rounded-xl text-[13.5px] font-bold transition">Share</button>
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
  )
}
function Favorites() {
  const { favorites, listings, navigate } = useApp();
  const favListings = listings.filter(l => favorites.includes(l.id));
  return (
    <div className="space-y-4">
      <h1 className="text-[24px] font-bold tracking-tight text-[#0f2815]">Favourites</h1>
      {favListings.length === 0 ? <Empty text="No saved food yet." actionLabel="Explore surplus food" onAction={() => navigate("browse")} /> : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
          {favListings.map(l => <FoodCard key={l.id} listing={l} />)}
        </div>
      )}
    </div>
  )
}
function Cart() {
  const { cart, listings, updateCartQty, removeFromCart, navigate } = useApp();
  const items = cart.map(c => ({ ...c, listing: listings.find(l => l.id === c.listingId) })).filter(x => x.listing);
  const subtotal = items.reduce((s, i) => s + i.listing.surplusPrice * i.qty, 0);
  const delivery = items.some(i => i.listing.delivery) ? 500 : 0;
  const total = subtotal + delivery + (items.length ? 100 : 0);
  if (items.length === 0) return <Empty text="Your cart is empty" actionLabel="Find food" onAction={() => navigate("browse")} />;
  return (
    <div className="max-w-[720px] space-y-5">
      <div><BackButton label="Back" fallback="browse" /></div>
      <h1 className="text-[24px] font-bold tracking-tight text-[#0f2815]">Your Cart</h1>
      <div className="space-y-3">
        {items.map(i => (
          <div key={i.listingId} className="bg-white rounded-2xl p-4 flex gap-4 shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
            <img src={i.listing.image} alt={i.listing.name} className="w-20 h-20 object-cover rounded-xl" />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[14px] text-[#0f2815] truncate">{i.listing.name}</p>
              <p className="text-xs text-[#5a6b5a] font-medium">{formatNaira(i.listing.surplusPrice)} each</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center bg-[#f7f8f6] rounded-full p-1">
                  <button onClick={() => updateCartQty(i.listingId, i.qty - 1)} className="w-7 h-7 bg-white rounded-full grid place-items-center shadow-sm text-[#0f2815] font-bold">−</button>
                  <span className="text-sm w-8 text-center font-bold text-[#0f2815]">{i.qty}</span>
                  <button onClick={() => updateCartQty(i.listingId, i.qty + 1)} className="w-7 h-7 bg-white rounded-full grid place-items-center shadow-sm text-[#0f2815] font-bold">+</button>
                </div>
                <button onClick={() => removeFromCart(i.listingId)} className="ml-auto text-xs font-bold text-[#8aa08a] hover:text-red-600">Remove</button>
              </div>
            </div>
            <div className="font-bold text-[14px] text-[#0f2815]">{formatNaira(i.listing.surplusPrice * i.qty)}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)] text-sm space-y-2.5">
        <div className="flex justify-between text-[#5a6b5a] font-medium"><span>Subtotal</span><span className="font-bold text-[#0f2815]">{formatNaira(subtotal)}</span></div>
        <div className="flex justify-between text-[#5a6b5a] font-medium"><span>Delivery fee</span><span className="font-bold text-[#0f2815]">{formatNaira(delivery)}</span></div>
        <div className="flex justify-between text-[#5a6b5a] font-medium"><span>Service fee</span><span className="font-bold text-[#0f2815]">{formatNaira(100)}</span></div>
        <div className="flex justify-between font-bold text-[16px] border-t border-[#eef3ec] pt-3 mt-1 text-[#0f2815]"><span>Total</span><span className="text-[#0f7a3b]">{formatNaira(total)}</span></div>
      </div>
      <button onClick={() => navigate("checkout")} className="w-full bg-[#0f7a3b] text-white py-4 rounded-2xl font-bold shadow-sm">Proceed to checkout</button>
    </div>
  )
}
function Checkout() {
  const { cart, listings, addresses, createOrder, navigate } = useApp();
  const [fulfillment, setFulfillment] = useState("delivery");
  const [addressId, setAddressId] = useState(addresses.find(a => a.isDefault)?.id || addresses[0]?.id);
  const [payment, setPayment] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [procStep, setProcStep] = useState("");
  const [error, setError] = useState("");
  const [card, setCard] = useState({ holder: "Mercy S.", number: "", expiry: "", cvc: "" });
  const [cardErr, setCardErr] = useState({});
  const [saveCard, setSaveCard] = useState(true);
  const [bank, setBank] = useState("GTBank");
  const [transferSent, setTransferSent] = useState(false);
  const [copied, setCopied] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);
  const items = cart.map(c => ({ ...c, listing: listings.find(l => l.id === c.listingId) })).filter(x => x.listing);
  const subtotal = items.reduce((s, i) => s + i.listing.surplusPrice * i.qty, 0);
  const deliveryFee = fulfillment === "delivery" ? 500 : 0;
  const total = subtotal + deliveryFee + 100;
  const savings = items.reduce((s, i) => s + (i.listing.originalPrice - i.listing.surplusPrice) * i.qty, 0);
  const vAccount = useMemo(() => "812" + String(total).padStart(7, "0").slice(-7), [total]);
  useEffect(() => {
    if (payment !== "transfer") return;
    setSecondsLeft(15 * 60);
    const t = setInterval(() => setSecondsLeft(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [payment, total]);
  const mmss = `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}`;
  if (items.length === 0) return <Empty text="No items to checkout" actionLabel="Browse" onAction={() => navigate("browse")} />;
  const brand = card.number.startsWith("4") ? "VISA" : card.number.startsWith("5") ? "Mastercard" : card.number.startsWith("506") || card.number.startsWith("507") ? "Verve" : "CARD";
  const fmtNum = (v) => v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
  const fmtExp = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    if (d.length <= 2) return d;
    return d.slice(0, 2) + "/" + d.slice(2);
  };
  const validateCard = () => {
    const e = {};
    if (card.holder.trim().length < 3) e.holder = "Enter name on card";
    if (card.number.replace(/\s/g, "").length !== 16) e.number = "Card number must be 16 digits (try 4242 4242 4242 4242)";
    const m = card.expiry.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
    if (!m) e.expiry = "Use MM/YY";
    else {
      const yy = 2000 + Number(m[2]); const mm = Number(m[1]);
      if (yy < 2026 || (yy === 2026 && mm < 9)) e.expiry = "Card expired";
    }
    if (!/^\d{3,4}$/.test(card.cvc)) e.cvc = "3–4 digits";
    setCardErr(e);
    return Object.keys(e).length === 0;
  };
  const copy = (label, text) => { try { navigator.clipboard.writeText(text); } catch {} setCopied(label); setTimeout(() => setCopied(""), 1500); };
  const handlePay = () => {
    setError("");
    if (payment === "card" && !validateCard()) return;
    if (payment === "transfer" && !transferSent) { setError("Tap “I have sent the money” after your transfer so we can verify it."); return; }
    setProcessing(true);
    const steps = payment === "card" ? ["Encrypting card…", "Contacting bank…", "Confirming payment…"] : ["Verifying transfer…", "Confirming with bank…"];
    steps.forEach((s, i) => setTimeout(() => setProcStep(s), i * 700));
    setTimeout(() => {
      const method = payment === "card" ? `Card ${brand} •••• ${card.number.replace(/\s/g, "").slice(-4)}` : `Transfer • ${bank} ${vAccount}`;
      const order = createOrder({ fulfillment, addressId, paymentMethod: method });
      setProcessing(false); setProcStep("");
      if (!order) { setError("Some items are no longer available. Please update your cart."); return; }
      navigate("orderSuccess", { id: order.id });
    }, steps.length * 700 + 500);
  };
  const inputCls = (bad) => `w-full bg-[#f7f8f6] rounded-xl px-3.5 py-3 text-sm text-[#0f2815] placeholder:text-[#8aa08a] font-medium focus:outline-none focus:ring-2 ${bad ? "ring-2 ring-red-300 border border-red-200" : "focus:ring-[#0f7a3b]/15 border border-transparent"}`;
  return (
    <div className="max-w-5xl grid lg:grid-cols-[1.15fr_0.85fr] gap-6">
      <div className="space-y-4">
        <div><BackButton label="Back" fallback="cart" /></div>
        <h1 className="text-[24px] font-bold tracking-tight text-[#0f2815]">Checkout</h1>
        <div className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[#eef3ec]">
          <p className="font-bold text-sm text-[#0f2815]">Fulfillment</p>
          <div className="mt-3 flex gap-2 p-1 bg-[#f1f6ef] rounded-xl">
            <button onClick={() => setFulfillment("delivery")} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition ${fulfillment === "delivery" ? "bg-white shadow-sm text-[#0f2815]" : "text-[#5a6b5a]"}`}>Delivery</button>
            <button onClick={() => setFulfillment("pickup")} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition ${fulfillment === "pickup" ? "bg-white shadow-sm text-[#0f2815]" : "text-[#5a6b5a]"}`}>Pickup</button>
          </div>
          {fulfillment === "delivery" && (
            <div className="mt-5">
              <p className="text-sm font-bold text-[#0f2815]">Delivery address</p>
              <div className="mt-3 space-y-2.5">
                {addresses.map(a => (
                  <label key={a.id} className={`flex gap-3 p-4 rounded-2xl cursor-pointer transition border ${addressId === a.id ? "bg-[#f1f6ef] border-[#0f7a3b]/20" : "bg-[#f7f8f6] border-transparent"}`}>
                    <input type="radio" checked={addressId === a.id} onChange={() => setAddressId(a.id)} className="accent-[#0f7a3b] mt-0.5" />
                    <div className="text-sm"><p className="font-bold text-[#0f2815]">{a.label}</p><p className="text-[#3a4a3a] leading-relaxed font-medium">{a.address}</p></div>
                  </label>
                ))}
              </div>
              <button onClick={() => navigate("addresses")} className="text-xs font-bold text-[#0f7a3b] mt-3 inline-flex items-center gap-1">Manage addresses <IconChevronRight /></button>
            </div>
          )}
          {fulfillment === "pickup" && <p className="text-[13.5px] leading-relaxed text-[#3a4a3a] mt-4 bg-[#f7f8f6] rounded-xl p-4 font-medium">Pickup at restaurant during window. You will receive pickup code after payment.</p>}
        </div>
        {/* Stripe-like payment section */}
        <div className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[#eef3ec]">
          <div className="flex items-center justify-between">
            <p className="font-bold text-sm text-[#0f2815]">Payment</p>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0f7a3b] bg-[#eef6ec] px-2.5 py-1 rounded-full border border-[#c8e0c8]"><IconShield size={ICON_SM} /> Secured · ReFood Pay</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 p-1 bg-[#f1f6ef] rounded-xl">
            <button onClick={() => setPayment("card")} className={`py-2.5 rounded-lg text-sm font-bold inline-flex items-center justify-center gap-2 transition ${payment === "card" ? "bg-white shadow-sm text-[#0f2815]" : "text-[#5a6b5a]"}`}><IconCard size={ICON_SIZE} /> Card</button>
            <button onClick={() => setPayment("transfer")} className={`py-2.5 rounded-lg text-sm font-bold inline-flex items-center justify-center gap-2 transition ${payment === "transfer" ? "bg-white shadow-sm text-[#0f2815]" : "text-[#5a6b5a]"}`}><IconBank size={ICON_SIZE} /> Transfer</button>
          </div>
          {payment === "card" ? (
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl p-4 text-white bg-gradient-to-br from-[#0f2815] via-[#14532d] to-[#0f7a3b] shadow-sm">
                <div className="flex justify-between items-center"><span className="text-[11px] font-bold tracking-widest text-white/70">REFOOD PAY</span><span className="text-[12px] font-extrabold italic">{brand}</span></div>
                <p className="mt-3 text-[17px] font-bold tracking-[0.12em]">{card.number || "•••• •••• •••• ••••"}</p>
                <div className="mt-2 flex justify-between text-[11px] font-semibold text-white/80"><span>{card.holder.toUpperCase() || "YOUR NAME"}</span><span>{card.expiry || "MM/YY"}</span></div>
              </div>
              <div>
                <input placeholder="Name on card" value={card.holder} onChange={e => setCard({ ...card, holder: e.target.value })} className={inputCls(cardErr.holder)} />
                {cardErr.holder && <p className="text-xs text-red-600 mt-1 font-medium">{cardErr.holder}</p>}
              </div>
              <div>
                <div className="relative">
                  <input inputMode="numeric" placeholder="4242 4242 4242 4242" value={card.number} onChange={e => setCard({ ...card, number: fmtNum(e.target.value) })} className={`${inputCls(cardErr.number)} pr-20`} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-extrabold text-[#0f7a3b] bg-white border border-[#eef3ec] px-2 py-1 rounded-md">{brand}</span>
                </div>
                {cardErr.number && <p className="text-xs text-red-600 mt-1 font-medium">{cardErr.number}</p>}
                <p className="text-[11px] text-[#8aa08a] mt-1 font-medium">Demo: use 4242 4242 4242 4242 · any future expiry · any CVC</p>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <input inputMode="numeric" placeholder="MM/YY" value={card.expiry} onChange={e => setCard({ ...card, expiry: fmtExp(e.target.value) })} className={inputCls(cardErr.expiry)} />
                  {cardErr.expiry && <p className="text-xs text-red-600 mt-1 font-medium">{cardErr.expiry}</p>}
                </div>
                <div>
                  <input inputMode="numeric" placeholder="CVC" value={card.cvc} onChange={e => setCard({ ...card, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })} className={inputCls(cardErr.cvc)} />
                  {cardErr.cvc && <p className="text-xs text-red-600 mt-1 font-medium">{cardErr.cvc}</p>}
                </div>
              </div>
              <label className="flex items-center gap-2 text-[13px] font-semibold text-[#3a4a3a]"><input type="checkbox" checked={saveCard} onChange={e => setSaveCard(e.target.checked)} className="accent-[#0f7a3b]" /> Save card for faster checkout</label>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              <div className="flex gap-2 flex-wrap">
                {["GTBank", "Access", "FirstBank", "UBA"].map(b => (
                  <button key={b} onClick={() => setBank(b)} className={`px-3.5 py-2 rounded-xl text-[13px] font-bold border transition ${bank === b ? "bg-[#0f2815] text-white border-[#0f2815]" : "bg-[#f7f8f6] text-[#3a4a3a] border-transparent"}`}>{b}</button>
                ))}
              </div>
              <div className="bg-[#f7f8f6] rounded-2xl p-4 border border-dashed border-[#c8e0c8]">
                <p className="text-[11px] font-bold tracking-widest text-[#5a6b5a] uppercase">Transfer {formatNaira(total)} to</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[22px] font-extrabold tracking-[0.15em] text-[#0f2815]">{vAccount}</span>
                  <button onClick={() => copy("acct", vAccount)} className="text-[12px] font-bold bg-white border border-[#eef3ec] px-3 py-1.5 rounded-lg shadow-sm">{copied === "acct" ? "Copied!" : "Copy"}</button>
                </div>
                <p className="text-[12.5px] text-[#3a4a3a] font-medium mt-1">{bank} · ReFood Pay · Mercy S.</p>
                <p className="text-[12px] font-bold mt-2 text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">Expires in {mmss} — use this account for this order only</p>
              </div>
              <button onClick={() => setTransferSent(!transferSent)} className={`w-full py-3 rounded-xl text-sm font-bold border transition ${transferSent ? "bg-[#eef6ec] text-[#0f7a3b] border-[#0f7a3b]/30" : "bg-white text-[#0f2815] border-[#d4e6d4]"}`}>{transferSent ? "✓ I have sent the money — tap to undo" : "I have sent the money"}</button>
              <p className="text-[11px] text-[#8aa08a] font-medium text-center">We verify automatically — no receipt upload needed in this demo.</p>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[#eef3ec] sticky top-20">
          <p className="font-bold text-[#0f2815]">Order summary</p>
          <div className="mt-4 space-y-3">
            {items.map(i => (
              <div key={i.listingId} className="flex gap-3 text-sm">
                <img src={i.listing.image} alt={i.listing.name} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1"><p className="font-bold text-[#0f2815]">{i.listing.name}</p><p className="text-xs text-[#5a6b5a] font-medium">Qty: {i.qty}</p></div>
                <span className="font-bold text-[#0f2815]">{formatNaira(i.listing.surplusPrice * i.qty)}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-[#eef3ec] pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-[#5a6b5a] font-medium"><span>Subtotal</span><span className="font-bold text-[#0f2815]">{formatNaira(subtotal)}</span></div>
            <div className="flex justify-between text-[#5a6b5a] font-medium"><span>Delivery fee</span><span className="font-bold text-[#0f2815]">{formatNaira(deliveryFee)}</span></div>
            <div className="flex justify-between text-[#5a6b5a] font-medium"><span>Service fee</span><span className="font-bold text-[#0f2815]">{formatNaira(100)}</span></div>
            <div className="flex justify-between text-[#0f7a3b] font-bold"><span>You save</span><span>{formatNaira(savings)}</span></div>
            <div className="flex justify-between font-bold text-base border-t border-[#eef3ec] pt-3 text-[#0f2815]"><span>Total</span><span className="text-[#0f7a3b]">{formatNaira(total)}</span></div>
          </div>
          {error && <p className="text-sm text-red-600 mt-3 bg-red-50 rounded-xl p-3 font-medium">{error}</p>}
          <button onClick={handlePay} disabled={processing} className="mt-5 w-full bg-[#0f7a3b] hover:bg-[#126a33] text-white py-3.5 rounded-xl font-bold shadow-sm disabled:opacity-60 transition">
            {processing ? (procStep || "Processing…") : payment === "card" ? `Pay ${formatNaira(total)} with card` : `Verify transfer • ${formatNaira(total)}`}
          </button>
          <p className="text-[11px] text-[#8aa08a] mt-2 text-center font-medium inline-flex items-center justify-center gap-1 w-full"><IconShield size={ICON_SM} /> 256-bit encrypted · Demo — no real charge.</p>
        </div>
      </div>
    </div>
  )
}
function OrderSuccess({ id }) {
  const { orders, navigate } = useApp();
  const order = orders.find(o => o.id === id);
  if (!order) return <Empty text="Order not found" />;
  return (
    <div className="max-w-xl mx-auto space-y-4">
      <div><BackButton label="Back" fallback="orders" /></div>
      <div className="bg-white rounded-[24px] p-7 text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
        <div className="w-16 h-16 bg-[#eef6ec] rounded-full grid place-items-center mx-auto text-[#0f7a3b]"><IconCheck size={ICON_SIZE} /></div>
        <h1 className="text-[20px] font-bold tracking-tight mt-4 text-[#0f2815]">Payment successful!</h1>
        <p className="text-[13.5px] leading-relaxed text-[#3a4a3a] mt-1 font-medium">Order #{order.id} is confirmed. Estimated window: {order.estimatedWindow}</p>
        <div className="mt-5 bg-[#f7f8f6] rounded-2xl p-4 text-left text-sm">
          <p className="font-bold text-[#0f2815]">Order summary</p>
          {order.items.map(it => <div key={it.listingId} className="flex justify-between mt-2 text-[#3a4a3a] font-medium"><span>{it.name} × {it.qty}</span><span className="font-bold text-[#0f2815]">{formatNaira(it.price * it.qty)}</span></div>)}
          <div className="flex justify-between font-bold border-t border-[#e0e8e0] mt-3 pt-3 text-[#0f2815]"><span>Total paid</span><span>{formatNaira(order.total)}</span></div>
          <p className="text-xs text-[#5a6b5a] mt-2 font-medium">{order.fulfillment === "delivery" ? "Delivery" : "Pickup"} • {order.paymentMethod}</p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <button onClick={() => navigate("trackOrder", { id: order.id })} className="bg-[#0f7a3b] text-white py-3 rounded-xl font-bold">Track order</button>
          <button onClick={() => navigate("orders")} className="bg-[#f1f6ef] py-3 rounded-xl font-bold text-[#0f2815]">View all orders</button>
        </div>
        <button onClick={() => navigate("home")} className="mt-3 text-sm font-bold text-[#0f7a3b] inline-flex items-center gap-1">Continue browsing <IconChevronRight size={ICON_SIZE} /></button>
      </div>
    </div>
  )
}
function Orders() {
  const { orders, businesses, navigate } = useApp();
  const [tab, setTab] = useState("active");
  const active = orders.filter(o => !["completed", "delivered", "cancelled"].includes(o.status));
  const completed = orders.filter(o => ["completed", "delivered"].includes(o.status));
  const cancelled = orders.filter(o => o.status === "cancelled");
  const list = tab === "active" ? active : tab === "completed" ? completed : cancelled;
  const pickupCode = (id) => id.replace(/\D/g, '').slice(-7).padStart(7, '7').slice(0, 7) || "7328145";

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-[24px] font-bold tracking-tight text-[#0f2815]">My Orders</h1>
        <p className="text-[13px] text-[#5a6b5a] font-medium">Track your orders, pickups and deliveries</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-[#eef3ec] overflow-x-auto no-scrollbar">
        {[{ k: "active", l: "Active", c: active.length }, { k: "completed", l: "Completed", c: completed.length }, { k: "cancelled", l: "Cancelled", c: cancelled.length }].map(t => (
          <button key={t.k} onClick={() => setTab(t.k)} className={`relative px-4 py-3 text-[13px] font-bold whitespace-nowrap transition ${tab === t.k ? "text-[#0f7a3b]" : "text-[#8aa08a] hover:text-[#5a6b5a]"}`}>
            {t.l} <span className={`ml-1 text-[11px] px-1.5 py-0.5 rounded-full font-bold ${tab === t.k ? "bg-[#0f7a3b]/10 text-[#0f7a3b]" : "bg-[#f1f6ef] text-[#8aa08a]"}`}>{t.c}</span>
            {tab === t.k && <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0f7a3b] rounded-full"></span>}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.7fr_0.9fr] gap-6">
        {/* Main */}
        <div className="space-y-6">
          {tab === "active" && (
            <>
              <div>
                <h3 className="text-[13px] font-bold tracking-wide text-[#0f2815] uppercase">Active Orders <span className="text-[#8aa08a] font-semibold normal-case">• {active.length} ongoing</span></h3>
                <div className="mt-3 space-y-4">
                  {active.map(o => {
                    const b = businesses.find(x => x.id === o.businessId);
                    const isPickup = o.fulfillment === "pickup";
                    const code = pickupCode(o.id);
                    const steps = isPickup
                      ? [{ k: "confirmed", l: "Confirmed" }, { k: "preparing", l: "Preparing" }, { k: "ready_for_pickup", l: "Ready" }, { k: "completed", l: "Picked up" }]
                      : [{ k: "confirmed", l: "Confirmed" }, { k: "preparing", l: "Preparing" }, { k: "on_the_way", l: "On the way" }, { k: "delivered", l: "Delivered" }];
                    const activeIdx = steps.findIndex(s => s.k === o.status);
                    return (
                      <div key={o.id} className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-[#eef3ec]">
                        <div className="p-4 flex gap-3">
                          <img src={o.items[0]?.image} alt="" className="w-[56px] h-[56px] md:w-[68px] md:h-[68px] rounded-xl object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-[14px] text-[#0f2815] leading-tight truncate">{o.items[0]?.name} {o.items.length > 1 && <span className="text-[#5a6b5a] font-medium">+{o.items.length - 1}</span>}</p>
                            <p className="text-[12.5px] text-[#3a4a3a] font-medium mt-0.5 flex flex-wrap items-center gap-1">
                              <span>{b?.name}</span><span className="w-1 h-1 bg-[#c5d6c5] rounded-full"></span><span>{o.items[0]?.qty}× {formatNaira(o.items[0]?.price)}</span>
                            </p>
                            <p className="text-[12px] text-[#5a6b5a] font-medium mt-1 flex items-center gap-1.5"><IconMapPin size={ICON_SM} />{b?.location} <span className="w-1 h-1 bg-[#c5d6c5] rounded-full"></span> {isPickup ? "Pickup" : "Delivery"} <span className="w-1 h-1 bg-[#c5d6c5] rounded-full"></span> {o.estimatedWindow}</p>
                          </div>
                        </div>

                        {/* stepper like screenshot */}
                        <div className="px-4">
                          <div className="flex items-center gap-1">
                            {steps.map((s, i) => {
                              const done = i < activeIdx;
                              const cur = i === activeIdx;
                              return (
                                <div key={s.k} className="flex items-center gap-1.5 flex-1">
                                  <div className={`w-6 h-6 rounded-full grid place-items-center font-bold shrink-0 border-2 ${done ? "bg-[#157a3b] border-[#157a3b] text-white" : cur ? "bg-white border-[#157a3b] text-[#157a3b]" : "bg-white border-[#d4e6d4] text-[#8aa08a]"}`}>
                                    {done ? <span className="w-2 h-2 bg-white rounded-full"></span> : cur ? <span className="w-2 h-2 bg-[#157a3b] rounded-full"></span> : <span className="w-1.5 h-1.5 bg-[#c5d6c5] rounded-full"></span>}
                                  </div>
                                  <span className={`text-[11px] font-bold hidden sm:inline whitespace-nowrap ${i <= activeIdx ? "text-[#0f2815]" : "text-[#8aa08a]"}`}>{s.l}</span>
                                  {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-1 ${i < activeIdx ? "bg-[#157a3b]" : "bg-[#e5ebe5]"}`}></div>}
                                </div>
                              )
                            })}
                          </div>
                          <p className="text-[11px] text-[#5a6b5a] font-medium mt-2">Estimated: {o.estimatedWindow} • {b?.name} to 12 Example St</p>
                        </div>

                        {/* 7-digit code - shown for pickup or delivery as requested */}
                        <div className="mx-3 sm:mx-4 mt-3 bg-[#f7f8f6] rounded-xl p-3 border border-[#d4e6d4] border-dashed flex flex-col sm:flex-row items-center sm:justify-between gap-3">
                          <div className="text-center sm:text-left">
                            <p className="text-[10px] font-bold tracking-widest text-[#5a6b5a] uppercase">{isPickup ? "Show this code at pickup" : "Show this code at delivery"}</p>
                            <p className="text-[11px] text-[#8aa08a] font-medium">Share with rider/store to confirm</p>
                          </div>
                          <div className="flex gap-1 flex-wrap justify-center">
                            {code.split("").map((d, i) => (
                              <span key={i} className="w-7 h-7 bg-white rounded-lg grid place-items-center font-extrabold text-[#0f2815] text-[13px] shadow-sm border border-[#d4e6d4]">{d}</span>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 flex gap-2">
                          <button onClick={() => navigate("orderDetail", { id: o.id })} className="flex-1 bg-white border border-[#d4e6d4] py-2.5 rounded-xl text-xs font-bold text-[#0f2815] hover:bg-[#f1f6ef]">View details</button>
                          <button onClick={() => navigate("trackOrder", { id: o.id })} className="flex-1 bg-[#157a3b] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#126a33] shadow-sm">Track order</button>
                        </div>
                      </div>
                    )
                  })}
                  {active.length === 0 && <Empty text="No active orders. Your upcoming pickups and deliveries will appear here." actionLabel="Find food" onAction={() => navigate("browse")} />}
                </div>
              </div>

              {/* Completed preview like middle screenshot bottom */}
              {completed.length > 0 && (
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-[13px] font-bold tracking-wide text-[#0f2815] uppercase">Completed Orders</h3>
                    <button onClick={() => setTab("completed")} className="text-xs font-bold text-[#157a3b]">View all →</button>
                  </div>
                  <div className="mt-3 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden border border-[#eef3ec]">
                    <div className="hidden md:grid grid-cols-[1.2fr_1fr_1fr_0.7fr_0.8fr] gap-3 px-4 py-2.5 bg-[#f7f8f6] text-[11px] font-bold tracking-wide text-[#5a6b5a] uppercase border-b border-[#eef3ec]">
                      <span>Item</span><span>Business</span><span>Date</span><span>Total</span><span>Status</span>
                    </div>
                    {completed.slice(0, 2).map(o => {
                      const b = businesses.find(x => x.id === o.businessId);
                      return (
                        <div key={o.id} className="flex md:grid md:grid-cols-[1.2fr_1fr_1fr_0.7fr_0.8fr] gap-3 px-4 py-3 items-center border-b border-[#eef3ec] last:border-0 hover:bg-[#f7f8f6]/60">
                          <div className="flex items-center gap-2">
                            <img src={o.items[0]?.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                            <div><p className="text-xs font-bold text-[#0f2815]">{o.items[0]?.name}</p><p className="text-[11px] text-[#5a6b5a]">{o.fulfillment}</p></div>
                          </div>
                          <span className="hidden md:block text-xs font-medium text-[#3a4a3a]">{b?.name}</span>
                          <span className="hidden md:block text-xs text-[#5a6b5a]">{new Date(o.createdAt).toLocaleDateString()}</span>
                          <span className="text-xs font-bold text-[#0f2815]">{formatNaira(o.total)}</span>
                          <span className="hidden md:inline-flex text-[11px] font-bold px-2 py-1 rounded-full bg-[#eef6ec] text-[#157a3b] w-fit">Completed</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </>
          )}

          {tab === "completed" && (
            <div>
              <h3 className="text-[13px] font-bold tracking-wide text-[#0f2815] uppercase">Completed Orders <span className="text-[#8aa08a] normal-case">• {completed.length}</span></h3>
              <div className="mt-3 space-y-3">
                {completed.map(o => {
                  const b = businesses.find(x => x.id === o.businessId);
                  return (
                    <div key={o.id} onClick={() => navigate("orderDetail", { id: o.id })} className="bg-white rounded-2xl p-4 flex gap-3 cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-[#eef3ec]">
                      <img src={o.items[0]?.image} alt="" className="w-14 h-14 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2"><span className="font-bold text-sm text-[#0f2815]">{o.items[0]?.name}</span><span className="text-[11px] font-bold px-2 py-1 rounded-full bg-[#eef6ec] text-[#157a3b]">Completed</span></div>
                        <p className="text-[12.5px] text-[#3a4a3a] font-medium">{b?.name} • {new Date(o.createdAt).toLocaleDateString()} • {formatNaira(o.total)} • {o.fulfillment}</p>
                      </div>
                      <span className="text-[#c5d6c5] self-center"><IconChevronRight size={ICON_SIZE} /></span>
                    </div>
                  )
                })}
                {completed.length === 0 && <Empty text="No completed orders yet." />}
              </div>
            </div>
          )}

          {tab === "cancelled" && (
            <div>
              <h3 className="text-[13px] font-bold tracking-wide text-[#0f2815] uppercase">Cancelled Orders <span className="text-[#8aa08a] normal-case">• {cancelled.length}</span></h3>
              <div className="mt-3 space-y-3">
                {cancelled.map(o => {
                  const b = businesses.find(x => x.id === o.businessId);
                  return (
                    <div key={o.id} className="bg-white rounded-2xl p-4 flex gap-3 shadow-[0_2px_12px_rgba(0,0,0,0.05)] border border-[#f3dede]">
                      <img src={o.items[0]?.image} alt="" className="w-14 h-14 rounded-xl object-cover grayscale" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2"><span className="font-bold text-sm text-[#0f2815] line-through">{o.items[0]?.name}</span><span className="text-[11px] font-bold px-2 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">Cancelled</span></div>
                        <p className="text-[12.5px] text-[#5a6b5a] font-medium">{b?.name} • {new Date(o.createdAt).toLocaleDateString()} • {formatNaira(o.total)}</p>
                      </div>
                    </div>
                  )
                })}
                {cancelled.length === 0 && <Empty text="No cancelled orders." />}
              </div>
            </div>
          )}

          {tab !== "active" && list.length === 0 && list.length === 0 && null}
          {list.length === 0 && tab !== "active" && null}
        </div>

        {/* Right sidebar - Order summary + How it works + Need help like rightmost screenshot */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-[#eef3ec]">
            <p className="font-bold text-sm text-[#0f2815]">Order summary</p>
            <div className="mt-4 space-y-2.5 text-sm">
              <div className="flex justify-between font-medium"><span className="text-[#5a6b5a] flex items-center gap-2"><span className="w-2 h-2 bg-[#157a3b] rounded-full"></span>Active orders</span><span className="font-bold text-[#0f2815]">{active.length}</span></div>
              <div className="flex justify-between font-medium"><span className="text-[#5a6b5a] flex items-center gap-2"><span className="w-2 h-2 bg-amber-400 rounded-full"></span>Scheduled</span><span className="font-bold text-[#0f2815]">{active.filter(o => o.fulfillment === "pickup").length}</span></div>
              <div className="flex justify-between font-medium"><span className="text-[#5a6b5a] flex items-center gap-2"><span className="w-2 h-2 bg-[#c5d6c5] rounded-full"></span>Completed</span><span className="font-bold text-[#0f2815]">{completed.length}</span></div>
              <div className="flex justify-between font-medium"><span className="text-[#5a6b5a] flex items-center gap-2"><span className="w-2 h-2 bg-red-300 rounded-full"></span>Cancelled</span><span className="font-bold text-[#0f2815]">{cancelled.length}</span></div>
              <div className="border-t border-[#eef3ec] pt-3 mt-3 flex justify-between font-bold"><span className="text-[#0f2815]">Total</span><span className="text-[#157a3b]">{orders.length}</span></div>
            </div>
            <button onClick={() => navigate("browse")} className="mt-4 w-full bg-[#157a3b] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#126a33]">Browse surplus</button>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-[#eef3ec]">
            <p className="font-bold text-sm text-[#0f2815]">How it works</p>
            <div className="mt-4 space-y-4">
              <div className="flex gap-3">
                <span className="w-7 h-7 rounded-full bg-[#157a3b] text-white grid place-items-center text-xs font-bold shrink-0">1</span>
                <div><p className="text-xs font-bold text-[#0f2815]">Choose your surplus food</p><p className="text-[11.5px] text-[#5a6b5a] leading-relaxed font-medium">Pick from nearby restaurants at 50% off.</p></div>
              </div>
              <div className="flex gap-3">
                <span className="w-7 h-7 rounded-full bg-[#157a3b] text-white grid place-items-center text-xs font-bold shrink-0">2</span>
                <div><p className="text-xs font-bold text-[#0f2815]">Food is reserved</p><p className="text-[11.5px] text-[#5a6b5a] leading-relaxed font-medium">We prepare your order and notify when ready.</p></div>
              </div>
              <div className="flex gap-3">
                <span className="w-7 h-7 rounded-full bg-[#157a3b] text-white grid place-items-center text-xs font-bold shrink-0">3</span>
                <div><p className="text-xs font-bold text-[#0f2815]">Pick it up</p><p className="text-[11.5px] text-[#5a6b5a] leading-relaxed font-medium">Show your code or track delivery to your door.</p></div>
              </div>
            </div>
            <button className="mt-4 text-xs font-bold text-[#157a3b] inline-flex items-center gap-1">Learn more about pickups <IconChevronRight size={ICON_SM} /></button>
          </div>

          <div className="bg-[#f1f6ef] rounded-2xl p-5 border border-[#d4e6d4]">
            <p className="font-bold text-sm text-[#0f2815]">Need help with your order?</p>
            <p className="text-[12.5px] text-[#5a6b5a] font-medium mt-1">Questions about pickups, deliveries or payments.</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button onClick={() => navigate("notifications")} className="bg-white border border-[#d4e6d4] py-2 rounded-xl text-xs font-bold text-[#0f2815]">Contact</button>
              <button className="bg-[#0f2815] text-white py-2 rounded-xl text-xs font-bold">Help center</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
function OrderDetail({ id }) {
  const { orders, businesses, advanceOrderStatus, addReview, navigate } = useApp();
  const order = orders.find(o => o.id === id);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  if (!order) return <Empty text="Order not found" />;
  const b = businesses.find(x => x.id === order.businessId);
  const canReview = ["completed", "delivered"].includes(order.status) && !order.reviewed;
  return (
    <div className="max-w-3xl space-y-5">
      <div><BackButton label="Back" fallback="orders" /></div>
      <div>
        <h1 className="text-[22px] font-bold tracking-tight text-[#0f2815]">Order #{order.id}</h1>
        <p className="text-[13px] text-[#5a6b5a] mt-1 font-medium">{b?.name} • {new Date(order.createdAt).toLocaleString()}</p>
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center">
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${order.status === "completed" ? "bg-[#eef6ec] text-[#0f7a3b]" : "bg-amber-50 text-amber-700"}`}>{order.status.replaceAll("_", " ")}</span>
          <button onClick={() => advanceOrderStatus(order.id)} className="text-xs font-bold bg-[#f1f6ef] text-[#0f2815] px-3.5 py-1.5 rounded-full hover:bg-[#e8f0e8]">Advance status (demo)</button>
        </div>
        <div className="mt-4 space-y-3 text-sm">
          {order.items.map(it => (
            <div key={it.listingId} className="flex gap-3 bg-[#f7f8f6] rounded-2xl p-3">
              <img src={it.image} alt={it.name} className="w-14 h-14 rounded-xl object-cover" />
              <div><p className="font-bold text-[#0f2815]">{it.name}</p><p className="text-xs text-[#5a6b5a] font-medium">Qty: {it.qty} • {formatNaira(it.price)}</p></div>
              <span className="ml-auto font-bold self-center text-[#0f2815]">{formatNaira(it.price * it.qty)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-[#f7f8f6] rounded-2xl p-4 text-sm space-y-2">
          <div className="flex justify-between text-[#5a6b5a] font-medium"><span>Subtotal</span><span className="font-bold text-[#0f2815]">{formatNaira(order.subtotal)}</span></div>
          <div className="flex justify-between text-[#5a6b5a] font-medium"><span>Delivery</span><span className="font-bold text-[#0f2815]">{formatNaira(order.deliveryFee)}</span></div>
          <div className="flex justify-between text-[#5a6b5a] font-medium"><span>Service</span><span className="font-bold text-[#0f2815]">{formatNaira(order.serviceFee)}</span></div>
          <div className="flex justify-between font-bold text-[#0f2815] border-t border-[#e0e8e0] pt-2"><span>Total</span><span className="text-[#0f7a3b]">{formatNaira(order.total)}</span></div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <button onClick={() => navigate("trackOrder", { id: order.id })} className="bg-[#0f7a3b] text-white py-3 rounded-xl font-bold">Track order</button>
          <button onClick={() => navigate("home")} className="bg-[#f1f6ef] py-3 rounded-xl font-bold text-[#0f2815]">Reorder</button>
        </div>
      </div>
      {canReview && (
        <div className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
          <p className="font-bold text-[#0f2815]">Leave a review</p>
          <div className="flex gap-1 mt-3">
            {[1, 2, 3, 4, 5].map(n => <button key={n} onClick={() => setRating(n)} className={`text-2xl ${n <= rating ? "text-amber-500" : "text-[#e0e8e0]"}`}>★</button>)}
          </div>
          <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="How was your food?" className="mt-3 w-full bg-[#f7f8f6] rounded-xl p-4 text-sm text-[#0f2815] placeholder:text-[#8aa08a] font-medium focus:outline-none focus:ring-2 focus:ring-[#0f7a3b]/15" rows={3} />
          <button onClick={() => { addReview(order.id, order.items[0].listingId, rating, comment); }} className="mt-3 bg-[#0f2815] text-white px-6 py-2.5 rounded-xl text-sm font-bold">Submit review</button>
        </div>
      )}
      {order.reviewed && <p className="text-sm text-[#0f7a3b] bg-[#eef6ec] p-4 rounded-2xl font-bold">You reviewed this order. Thank you!</p>}
    </div>
  )
}
function TrackOrder({ id }) {
  const { orders, businesses, advanceOrderStatus, navigate } = useApp();
  const order = orders.find(o => o.id === id);
  if (!order) return <Empty text="Order not found" />;
  const b = businesses.find(x => x.id === order.businessId);
  const isDelivery = order.fulfillment === "delivery";
  const stepsDelivery = [
    { key: "confirmed", label: "Confirmed", time: "9:20 AM" },
    { key: "preparing", label: "Preparing", time: "10:30 AM" },
    { key: "on_the_way", label: "On the way", time: "11:30 AM" },
    { key: "delivered", label: "Delivered", time: "Est. 12:30 - 1:00 PM" },
  ];
  const stepsPickup = [
    { key: "confirmed", label: "Confirmed", time: "9:20 AM" },
    { key: "preparing", label: "Preparing", time: "10:30 AM" },
    { key: "ready_for_pickup", label: "On the way", time: "11:30 AM" },
    { key: "completed", label: "Delivered", time: "Est. 12:30 - 1:00 PM" },
  ];
  const steps = isDelivery ? stepsDelivery : stepsPickup;
  const currentIdx = steps.findIndex(s => s.key === order.status);
  const activeIdx = currentIdx === -1 ? 2 : currentIdx;
  const code = order.id.replace(/\D/g, '').slice(-7).padStart(7, '7').slice(0, 7);
  return (
    <div className="max-w-5xl space-y-4">
      <div><BackButton label="Back" fallback="orders" /></div>
      <div>
        <h1 className="text-[22px] font-bold tracking-tight text-[#0f2815]">Track your order</h1>
        <p className="text-[13.5px] text-[#3a4a3a] mt-1 font-medium">Real-time updates on your {isDelivery ? "delivery" : "pickup"}.</p>
      </div>
      <div className="grid lg:grid-cols-[1.65fr_0.85fr] gap-6">
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[#eef3ec]">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="bg-[#eef6ec] text-[#157a3b] px-3 py-1 rounded-full font-bold border border-[#c8e0c8]">{isDelivery ? "Delivery" : "Pickup"}</span>
            <span className="text-[#5a6b5a] font-semibold">Order ID: {order.id}</span><span className="text-[#c5d6c5]">•</span><span className="text-[#5a6b5a] font-medium">Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}</span>
          </div>
          <div className="mt-7 flex justify-between relative">
            <div className="absolute top-4 left-[12%] right-[12%] h-0.5 bg-[#e5ebe5]"></div>
            <div className="absolute top-4 left-[12%] h-0.5 bg-[#157a3b] transition-all" style={{ width: `${activeIdx >= 0 ? (activeIdx / (steps.length - 1)) * 76 : 0}%` }}></div>
            {steps.map((s, i) => (
              <div key={s.key} className="flex-1 flex flex-col items-center text-center relative">
                <div className={`w-8 h-8 rounded-full grid place-items-center font-bold shadow-sm border-2 ${i < activeIdx ? "bg-[#157a3b] border-[#157a3b] text-white" : i === activeIdx ? "bg-white border-[#157a3b] text-[#157a3b]" : "bg-white border-[#d4e6d4] text-[#8aa08a]"}`}>
                  {i < activeIdx ? <IconCheck size={ICON_SM} /> : i === activeIdx ? <span className="w-2 h-2 bg-[#157a3b] rounded-full"></span> : <span className="w-1.5 h-1.5 bg-[#c5d6c5] rounded-full"></span>}
                </div>
                <p className={`text-[12px] mt-2 font-bold ${i <= activeIdx ? "text-[#0f2815]" : "text-[#8aa08a]"}`}>{s.label}</p>
                <p className="text-[11px] text-[#8aa08a] font-medium mt-0.5">{s.time}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-[#f1f6ef] rounded-2xl p-4 flex gap-3 items-center border border-[#e2ece2]">
            <span className="w-9 h-9 bg-white rounded-xl grid place-items-center shadow-sm text-[#157a3b]"><IconBike size={ICON_SIZE} /></span>
            <div className="flex-1"><p className="text-sm font-bold text-[#0f2815]">Your order is on the way!</p><p className="text-xs text-[#3a4a3a] font-medium">Our rider is heading to your location.</p></div>
            <div className="text-right hidden sm:block"><p className="text-xs text-[#5a6b5a] font-medium">Estimated arrival</p><p className="text-sm font-bold text-[#157a3b]">{order.estimatedWindow}</p></div>
          </div>

          {/* 7-digit code for pickup/delivery */}
          <div className="mt-4 bg-white rounded-2xl p-4 border-2 border-dashed border-[#c8e0c8] flex flex-col sm:flex-row items-center sm:justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-[11px] font-bold tracking-widest text-[#5a6b5a] uppercase">{isDelivery ? "Delivery code" : "Pickup code"}</p>
              <p className="text-[11px] text-[#8aa08a] font-medium mt-0.5">Show this 7-digit code {isDelivery ? "to rider" : "at store"}</p>
              <p className="text-[11px] text-[#5a6b5a] font-bold mt-1 lg:hidden">Estimated: {order.estimatedWindow}</p>
            </div>
            <div className="flex gap-1 flex-wrap justify-center">
              {code.split("").map((d, i) => (
                <span key={i} className="w-7 h-7 bg-[#f7f8f6] rounded-lg grid place-items-center font-extrabold text-[#0f2815] text-[13px] border border-[#d4e6d4] shadow-sm">{d}</span>
              ))}
            </div>
          </div>

          <div className="mt-4 h-52 bg-[#f1f6ef] rounded-2xl relative overflow-hidden border border-[#e2ece2]">
            <div className="absolute left-4 top-4 bg-white rounded-full px-3 py-1.5 text-xs font-bold shadow-sm text-[#0f2815] flex items-center gap-1.5 border border-[#eef3ec]"><IconMapPin size={ICON_SM} />{b?.name} • {b?.location}</div>
            <div className="absolute right-4 bottom-4 bg-white rounded-2xl px-3.5 py-2.5 text-xs shadow-md leading-relaxed font-medium text-[#0f2815] border border-[#eef3ec]">Your location<br /><span className="text-[#5a6b5a]">12 Example St, Wuse 2, Abuja</span></div>
            <div className="absolute left-1/2 top-1/2 w-9 h-9 bg-white rounded-full grid place-items-center shadow-md -translate-x-1/2 -translate-y-1/2 text-[#157a3b] border border-[#eef3ec]"><IconBike size={ICON_SIZE} /></div>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 208"><path d="M 38 92 Q 118 152 198 92 T 362 130" fill="none" stroke="#157a3b" strokeWidth="2" strokeDasharray="7 7" opacity="0.7" /></svg>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <img src="https://i.pravatar.cc/150?img=12" alt="rider" className="w-11 h-11 rounded-full object-cover" />
            <div className="text-sm">
              <p className="font-bold text-[#0f2815] flex items-center gap-2">Ahmed Ibrahim <span className="inline-flex items-center gap-1 text-amber-600 font-bold"><IconStar size={ICON_SM} /> 4.8</span></p>
              <p className="text-xs text-[#5a6b5a] font-medium">Your rider • 070 1234 5678</p>
            </div>
            <button className="ml-auto bg-[#f1f6ef] text-[#0f2815] px-4 py-2 rounded-xl text-sm font-bold">Message</button>
            <button onClick={() => advanceOrderStatus(order.id)} className="bg-[#0f7a3b] text-white px-4 py-2 rounded-xl text-sm font-bold">Advance</button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
            <p className="font-bold text-sm text-[#0f2815]">Order summary</p>
            <div className="mt-4 flex gap-3">
              <img src={order.items[0]?.image} alt={order.items[0]?.name} className="w-14 h-14 rounded-xl object-cover" />
              <div className="text-sm flex-1">
                <p className="font-bold text-[#0f2815]">{order.items[0]?.name}</p>
                <p className="text-xs text-[#5a6b5a] font-medium flex items-center gap-1">{b?.name} <span className="w-3 h-3 bg-[#0f7a3b] text-white rounded-full grid place-items-center"><IconCheck size={ICON_SM} /></span></p>
                <p className="text-xs text-[#5a6b5a] font-medium">Qty: {order.items[0]?.qty}</p>
              </div>
              <span className="text-sm font-bold text-[#0f2815]">{formatNaira(order.items[0]?.price || 0)}</span>
            </div>
            <div className="mt-4 space-y-2 text-sm bg-[#f7f8f6] rounded-2xl p-4">
              <div className="flex justify-between text-[#5a6b5a] font-medium"><span>Delivery fee</span><span className="font-bold text-[#0f2815]">{formatNaira(order.deliveryFee)}</span></div>
              <div className="flex justify-between text-[#5a6b5a] font-medium"><span>Service fee</span><span className="font-bold text-[#0f2815]">{formatNaira(order.serviceFee)}</span></div>
              <div className="flex justify-between font-bold text-[#0f2815] border-t border-[#e0e8e0] pt-2"><span>Total</span><span className="text-[#0f7a3b]">{formatNaira(order.total)}</span></div>
            </div>
            <div className="mt-3 bg-[#f1f6ef] rounded-2xl p-3.5 text-xs leading-relaxed">
              <p className="font-bold text-[#0f2815]">Delivering to</p>
              <div className="flex justify-between gap-2 mt-1"><span className="text-[#3a4a3a] font-medium">12 Example Street, Wuse 2, Abuja, Nigeria</span><button className="text-[#0f7a3b] font-bold shrink-0">Change</button></div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
            <p className="font-bold text-sm text-[#0f2815]">Need help?</p>
            <div className="mt-3 space-y-1 text-sm font-medium">
              <button className="w-full flex justify-between items-center py-3 border-b border-[#eef3ec] text-[#0f2815]">Contact support <IconChevronRight size={ICON_SIZE} /></button>
              <button className="w-full flex justify-between items-center py-3 border-b border-[#eef3ec] text-[#0f2815]">View help center <IconChevronRight size={ICON_SIZE} /></button>
              <button className="w-full flex justify-between items-center py-3 text-[#0f2815]">Report an issue <IconChevronRight size={ICON_SIZE} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
function Notifications() {
  const { notifications, setNotifications } = useApp();
  return (
    <div className="max-w-xl space-y-4">
      <div><BackButton label="Back" fallback="home" /></div>
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-bold tracking-tight text-[#0f2815]">Notifications</h1>
        <button onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))} className="text-xs font-bold text-[#0f7a3b] bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#eef3ec]">Mark all read</button>
      </div>
      <div className="space-y-2.5">
        {notifications.map(n => (
          <div key={n.id} className={`bg-white rounded-2xl p-4 flex gap-3 shadow-[0_2px_12px_rgba(0,0,0,0.05)] border ${!n.read ? "border-[#c8e0c8]" : "border-transparent"}`}>
            <span className={`w-2 h-2 rounded-full mt-2 shrink-0 ${!n.read ? "bg-[#0f7a3b]" : "bg-[#d6e2d6]"}`}></span>
            <div className="flex-1"><p className="text-sm font-bold text-[#0f2815]">{n.title}</p><p className="text-[13px] leading-relaxed text-[#3a4a3a] mt-0.5 font-medium">{n.body}</p><p className="text-xs text-[#8aa08a] mt-1.5 font-medium">{n.time}</p></div>
            {!n.read && <span className="text-[10px] bg-[#0f7a3b] text-white px-2 py-1 rounded-full h-fit font-bold">NEW</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
function Profile() {
  const { currentUser, navigate } = useApp();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Mercy Sylvester");
  const [email, setEmail] = useState("mercy.sylvester@gmail.com");
  const [phone, setPhone] = useState("070 1234 5678");
  const [avatar, setAvatar] = useState(null);
  const avatarRef = useRef(null);
  const pickAvatar = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const r = new FileReader();
    r.onload = () => setAvatar(r.result);
    r.readAsDataURL(file);
  };
  const rowIcon = "text-[#0f2815] shrink-0";
  const Row = ({ icon, title, sub, right, onClick }) => (
    <button onClick={onClick} className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-[#f7f8f6] transition">
      <span className={rowIcon}>{icon}</span>
      <span className="flex-1 min-w-0">
        <span className="font-bold text-[14px] text-[#0f2815] block leading-tight">{title}</span>
        {sub && <span className="text-[12.5px] text-[#5a6b5a] font-medium block mt-0.5">{sub}</span>}
      </span>
      {right && <span className="text-[13px] font-semibold text-[#0f2815] shrink-0">{right}</span>}
      <span className="text-[#0f2815] shrink-0"><IconChevronRight size={ICON_SIZE} /></span>
    </button>
  );
  const Section = ({ title, children }) => (
    <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[#eef3ec] overflow-hidden">
      <p className="px-5 pt-4 pb-1 font-extrabold text-[16px] text-[#0f2815]">{title}</p>
      <div className="divide-y divide-[#eef3ec]">{children}</div>
    </div>
  );
  return (
    <div className="max-w-[720px] mx-auto space-y-4 pb-4">
      <div>
        <h1 className="text-[26px] font-extrabold tracking-tight text-[#0f2815]">Profile</h1>
        <p className="text-[13.5px] text-[#5a6b5a] font-medium mt-0.5">Manage your account and preferences.</p>
      </div>
      {/* Identity card */}
      <div className="bg-[#f4f6f0] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 border border-[#eef3ec]">
        <div className="relative shrink-0 w-fit">
          <img src={avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.avatar}&backgroundColor=ffd5dc`} alt="avatar" className="w-24 h-24 rounded-full object-cover bg-white ring-4 ring-white shadow-sm" />
          <button onClick={() => avatarRef.current?.click()} aria-label="Change photo" className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#eef6ec] border border-[#c8e0c8] grid place-items-center text-[#0f2815] shadow-sm hover:bg-white transition"><IconCamera /></button>
          <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={(e) => pickAvatar(e.target.files?.[0])} />
        </div>
        <div className="flex-1 min-w-0">
          {editing ? (
            <div className="space-y-2">
              <input value={name} onChange={e => setName(e.target.value)} className="w-full bg-white rounded-xl px-3 py-2 text-sm font-bold text-[#0f2815] border border-[#eef3ec] focus:outline-none focus:ring-2 focus:ring-[#0f7a3b]/20" />
              <input value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-white rounded-xl px-3 py-2 text-sm font-medium text-[#0f2815] border border-[#eef3ec] focus:outline-none focus:ring-2 focus:ring-[#0f7a3b]/20" />
              <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-white rounded-xl px-3 py-2 text-sm font-medium text-[#0f2815] border border-[#eef3ec] focus:outline-none focus:ring-2 focus:ring-[#0f7a3b]/20" />
            </div>
          ) : (
            <>
              <p className="font-extrabold text-[20px] text-[#0f2815] leading-tight flex items-center gap-2 flex-wrap">{name}
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0f7a3b]">Verified <IconBadgeCheck /></span>
              </p>
              <p className="text-[13.5px] text-[#3a4a3a] font-medium mt-2 flex items-center gap-2"><IconMail size={ICON_SIZE} />{email}</p>
              <p className="text-[13.5px] text-[#3a4a3a] font-medium mt-1.5 flex items-center gap-2"><IconPhone size={ICON_SIZE} />{phone}</p>
            </>
          )}
        </div>
        <button onClick={() => setEditing(!editing)} className="shrink-0 inline-flex items-center gap-2 border border-[#0f7a3b]/40 text-[#0f7a3b] px-4 py-2.5 rounded-xl text-[13px] font-bold hover:bg-white transition self-start sm:self-center"><IconEdit size={ICON_SM} />{editing ? "Done" : "Edit profile"}</button>
      </div>
      <Section title="Account">
        <Row icon={<IconUser size={ICON_SIZE} />} title="Personal information" sub="Manage your personal details" onClick={() => setEditing(true)} />
        <Row icon={<IconMapPin size={ICON_SIZE} />} title="Saved addresses" sub="Manage your delivery addresses" onClick={() => navigate("addresses")} />
        <Row icon={<IconCard size={ICON_SIZE} />} title="Payment methods" sub="Add or manage your payment methods" onClick={() => navigate("checkout")} />
        <Row icon={<IconBell size={ICON_SIZE} />} title="Notifications" sub="Manage how you receive updates" onClick={() => navigate("notifications")} />
        <Row icon={<IconShield size={ICON_SIZE} />} title="Privacy & security" sub="Manage your privacy and security" />
      </Section>
      <Section title="Preferences">
        <Row icon={<IconSprout size={ICON_SIZE} />} title="Dietary preferences" sub="Tell us your food preferences" />
        <Row icon={<IconGlobe size={ICON_SIZE} />} title="Language" sub="Choose your preferred language" right="English" />
      </Section>
      <Section title="Support">
        <Row icon={<IconHelp size={ICON_SIZE} />} title="Help Center" sub="FAQs and helpful articles" />
        <Row icon={<IconHeadset size={ICON_SIZE} />} title="Contact support" sub="Chat or email our support team" />
      </Section>
      <Section title="Business">
        <Row icon={<IconStore size={ICON_SIZE} />} title="Switch to business account" sub="List surplus food and reach more people" onClick={() => navigateTo("/business/login")} />
      </Section>
      <button onClick={() => { localStorage.clear(); location.reload(); }} className="w-full bg-[#fdf3f2] border border-[#f3dede] rounded-2xl px-5 py-4 flex items-center gap-4 hover:bg-[#fbe9e8] transition text-left">
        <span className="text-[#b3261e]"><IconLogout size={ICON_SIZE} /></span>
        <span className="flex-1 font-bold text-[14px] text-[#b3261e]">Log out</span>
        <span className="text-[#0f2815]"><IconChevronRight size={ICON_SIZE} /></span>
      </button>
    </div>
  )
}
function Addresses() {
  const { addresses, setAddresses, navigate } = useApp();
  const [label, setLabel] = useState(""); const [addr, setAddr] = useState("");
  const add = () => {
    if (!label || !addr) return;
    setAddresses(prev => [...prev, { id: "addr_" + Date.now(), label, address: addr, isDefault: false }]);
    setLabel(""); setAddr("");
  };
  return (
    <div className="max-w-xl space-y-4">
      <div><BackButton label="Back" fallback="profile" /></div>
      <h1 className="text-[22px] font-bold tracking-tight text-[#0f2815]">Saved addresses</h1>
      <div className="space-y-3">
        {addresses.map(a => (
          <div key={a.id} className="bg-white rounded-2xl p-4 flex justify-between items-center shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
            <div><p className="font-bold text-sm text-[#0f2815]">{a.label} {a.isDefault && <span className="text-xs bg-[#eef6ec] text-[#0f7a3b] px-2 py-0.5 rounded-full font-bold border border-[#c8e0c8]">Default</span>}</p><p className="text-sm text-[#3a4a3a] leading-relaxed font-medium">{a.address}</p></div>
            <button onClick={() => setAddresses(prev => prev.filter(x => x.id !== a.id))} className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-full">Delete</button>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
        <p className="font-bold text-sm text-[#0f2815]">Add new address</p>
        <input value={label} onChange={e => setLabel(e.target.value)} placeholder="Label e.g. Home" className="mt-3 w-full bg-[#f7f8f6] rounded-xl px-4 py-3 text-sm text-[#0f2815] placeholder:text-[#8aa08a] font-medium focus:outline-none focus:ring-2 focus:ring-[#0f7a3b]/15" />
        <input value={addr} onChange={e => setAddr(e.target.value)} placeholder="Full address" className="mt-3 w-full bg-[#f7f8f6] rounded-xl px-4 py-3 text-sm text-[#0f2815] placeholder:text-[#8aa08a] font-medium focus:outline-none" />
        <button onClick={add} className="mt-4 bg-[#0f7a3b] text-white px-6 py-3 rounded-xl text-sm font-bold shadow-sm">Add address</button>
      </div>
    </div>
  )
}

// Business
function BusinessDashboard() {
  const { listings, orders, navigate } = useApp();
  const myListings = listings.filter(l => l.businessId === "business_001");
  const myOrders = orders.filter(o => o.businessId === "business_001");
  const revenue = myOrders.reduce((s, o) => s + o.total, 0);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[24px] font-bold tracking-tight text-[#0f2815]">Business Dashboard</h1>
        <p className="text-[13.5px] text-[#3a4a3a] font-medium">Mama B Kitchen • Overview</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Active listings" value={myListings.filter(l => l.status === "active").length} />
        <Stat label="Orders today" value={myOrders.length} />
        <Stat label="Revenue" value={formatNaira(revenue)} />
        <Stat label="Meals rescued" value={myOrders.reduce((s, o) => s + o.items.reduce((a, i) => a + i.qty, 0), 0)} />
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-center"><p className="font-bold text-[#0f2815]">Listings</p><button onClick={() => navigate("businessListings")} className="text-sm font-bold text-[#0f7a3b]">Manage →</button></div>
          <div className="mt-4 space-y-2.5">
            {myListings.slice(0, 3).map(l => <div key={l.id} className="flex gap-3 text-sm bg-[#f7f8f6] rounded-2xl p-3"><img src={l.image} alt={l.name} className="w-12 h-12 rounded-xl object-cover" /><div><p className="font-bold text-[#0f2815]">{l.name}</p><p className="text-xs text-[#5a6b5a] font-medium">{l.quantity} left • {formatNaira(l.surplusPrice)}</p></div><span className={`ml-auto text-xs px-2.5 py-1 rounded-full h-fit font-bold border ${l.status === "active" ? "bg-[#eef6ec] text-[#0f7a3b] border-[#c8e0c8]" : "bg-[#f1f6ef] text-[#5a6b5a] border-transparent"}`}>{l.status}</span></div>)}
          </div>
          <button onClick={() => navigate("businessListingForm")} className="mt-4 w-full bg-[#0f7a3b] text-white py-3 rounded-xl text-sm font-bold">+ Add surplus food</button>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-center"><p className="font-bold text-[#0f2815]">Incoming orders</p><button onClick={() => navigate("businessOrders")} className="text-sm font-bold text-[#0f7a3b]">View all →</button></div>
          <div className="mt-4 space-y-2.5">
            {myOrders.slice(0, 3).map(o => <div key={o.id} onClick={() => navigate("businessOrderDetail", { id: o.id })} className="bg-[#f7f8f6] rounded-2xl p-3 cursor-pointer hover:bg-[#eef3ec]"><p className="text-sm font-bold text-[#0f2815]">#{o.id} • {o.status}</p><p className="text-xs text-[#5a6b5a] mt-1 font-medium">{o.items.map(i => i.name).join(", ")} • {formatNaira(o.total)}</p></div>)}
            {myOrders.length === 0 && <p className="text-sm text-[#5a6b5a] bg-[#f7f8f6] rounded-2xl p-4 text-center font-medium">No orders yet</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
function Stat({ label, value }) { return <div className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)]"><p className="text-xs font-bold text-[#5a6b5a] uppercase tracking-wide">{label}</p><p className="text-[22px] font-bold tracking-tight mt-1 text-[#0f2815]">{value}</p></div> }
function BusinessListings() {
  const { listings, navigate, updateListing, deleteListing } = useApp();
  const my = listings.filter(l => l.businessId === "business_001");
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center"><h1 className="text-[24px] font-bold tracking-tight text-[#0f2815]">My Listings</h1><button onClick={() => navigate("businessListingForm")} className="bg-[#0f7a3b] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm">+ New listing</button></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {my.map(l => (
          <div key={l.id} className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
            <img src={l.image} alt={l.name} className="w-full h-36 object-cover" />
            <div className="p-4">
              <p className="font-bold text-sm text-[#0f2815]">{l.name}</p>
              <p className="text-xs text-[#5a6b5a] mt-1 font-medium">{l.category} • {formatNaira(l.surplusPrice)} <span className="line-through">was {formatNaira(l.originalPrice)}</span></p>
              <p className="text-xs font-bold mt-2 text-[#3a4a3a]">Qty: {l.quantity} • <span className="capitalize">{l.status}</span></p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => navigate("businessListingForm", { editId: l.id })} className="flex-1 bg-[#f1f6ef] py-2 rounded-xl text-xs font-bold text-[#0f2815]">Edit</button>
                <button onClick={() => updateListing(l.id, { status: l.status === "active" ? "paused" : "active" })} className="flex-1 bg-[#0f2815] text-white py-2 rounded-xl text-xs font-bold">{l.status === "active" ? "Pause" : "Resume"}</button>
                <button onClick={() => deleteListing(l.id)} className="text-xs font-bold text-red-600 px-2">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
function BusinessListingForm({ editId }) {
  const { listings, addListing, updateListing, navigate } = useApp();
  const edit = listings.find(l => l.id === editId);
  const [form, setForm] = useState(edit || { name: "", description: "", category: "Meals", originalPrice: 2000, surplusPrice: 1000, quantity: 5, pickupWindow: "Today, 6:00 PM - 8:00 PM", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop", location: "Wuse 2, Abuja • 1.2km", delivery: true });
  const [err, setErr] = useState("");
  const submit = () => {
    if (!form.name || !form.surplusPrice || !form.originalPrice) { setErr("Please fill required fields"); return; }
    if (Number(form.surplusPrice) >= Number(form.originalPrice)) { setErr("Surplus price must be less than original"); return; }
    if (edit) updateListing(edit.id, { ...form, originalPrice: Number(form.originalPrice), surplusPrice: Number(form.surplusPrice), quantity: Number(form.quantity) });
    else addListing({ ...form, originalPrice: Number(form.originalPrice), surplusPrice: Number(form.surplusPrice), quantity: Number(form.quantity) });
    navigate("businessListings");
  };
  return (
    <div className="max-w-xl space-y-4">
      <button onClick={() => navigate("businessListings")} className="text-sm font-bold text-[#0f7a3b] inline-flex items-center gap-1"><IconChevronRight size={ICON_SIZE} className="rotate-180" /> Back</button>
      <h1 className="text-[22px] font-bold tracking-tight text-[#0f2815]">{edit ? "Edit listing" : "Add surplus food"}</h1>
      <div className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)] space-y-3">
        <input placeholder="Food name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-[#f7f8f6] rounded-xl px-4 py-3 text-sm text-[#0f2815] placeholder:text-[#8aa08a] font-medium focus:outline-none focus:ring-2 focus:ring-[#0f7a3b]/15" />
        <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full bg-[#f7f8f6] rounded-xl px-4 py-3 text-sm text-[#0f2815] placeholder:text-[#8aa08a] font-medium focus:outline-none" rows={3} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="bg-[#f7f8f6] rounded-xl px-4 py-3 text-sm text-[#0f2815] font-medium focus:outline-none">{categories.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}</select>
          <input placeholder="Location e.g. Wuse 2, Abuja" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="bg-[#f7f8f6] rounded-xl px-4 py-3 text-sm text-[#0f2815] placeholder:text-[#8aa08a] font-medium focus:outline-none" />
        </div>
        <ListingImageField value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input type="number" placeholder="Original" value={form.originalPrice} onChange={e => setForm({ ...form, originalPrice: e.target.value })} className="bg-[#f7f8f6] rounded-xl px-4 py-3 text-sm text-[#0f2815] focus:outline-none font-medium" />
          <input type="number" placeholder="Surplus" value={form.surplusPrice} onChange={e => setForm({ ...form, surplusPrice: e.target.value })} className="bg-[#f7f8f6] rounded-xl px-4 py-3 text-sm text-[#0f2815] focus:outline-none font-medium" />
          <input type="number" placeholder="Qty" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} className="bg-[#f7f8f6] rounded-xl px-4 py-3 text-sm text-[#0f2815] focus:outline-none font-medium" />
        </div>
        <input placeholder="Pickup window e.g. Today, 6:00 PM - 8:00 PM" value={form.pickupWindow} onChange={e => setForm({ ...form, pickupWindow: e.target.value })} className="w-full bg-[#f7f8f6] rounded-xl px-4 py-3 text-sm text-[#0f2815] placeholder:text-[#8aa08a] font-medium focus:outline-none" />
        <label className="flex items-center gap-2 text-sm font-bold text-[#0f2815]"><input type="checkbox" checked={form.delivery} onChange={e => setForm({ ...form, delivery: e.target.checked })} className="accent-[#0f7a3b]" /> Delivery available</label>
        {err && <p className="text-sm text-red-600 bg-red-50 rounded-xl p-3 font-medium">{err}</p>}
        <button onClick={submit} className="w-full bg-[#0f7a3b] text-white py-3.5 rounded-xl font-bold shadow-sm">{edit ? "Save changes" : "Create listing"}</button>
        <p className="text-xs text-[#8aa08a] text-center font-medium">Listing will appear instantly in customer browse & home.</p>
      </div>
    </div>
  )
}
function BusinessOrders() {
  const { orders, navigate } = useApp();
  const my = orders.filter(o => o.businessId === "business_001");
  return (
    <div className="space-y-4">
      <h1 className="text-[24px] font-bold tracking-tight text-[#0f2815]">Incoming Orders</h1>
      <div className="space-y-3">
        {my.map(o => (
          <div key={o.id} onClick={() => navigate("businessOrderDetail", { id: o.id })} className="bg-white rounded-2xl p-4 flex gap-3 cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition">
            <div className="w-10 h-10 rounded-xl bg-[#f1f6ef] grid place-items-center text-[#0f7a3b]"><IconClipboard size={ICON_SIZE} /></div>
            <div className="flex-1"><div className="flex items-center gap-2"><span className="font-bold text-sm text-[#0f2815]">#{o.id}</span><span className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full font-bold">{o.status.replaceAll("_", " ")}</span></div><p className="text-[13px] text-[#3a4a3a] mt-1 font-medium">{o.items.map(i => `${i.name} ×${i.qty}`).join(", ")} • {formatNaira(o.total)} • {o.fulfillment}</p><p className="text-xs text-[#8aa08a] font-medium">{new Date(o.createdAt).toLocaleString()}</p></div>
            <span className="text-[#c5d6c5] self-center"><IconChevronRight size={ICON_SIZE} /></span>
          </div>
        ))}
        {my.length === 0 && <Empty text="No orders yet. New customer orders will appear here." />}
      </div>
    </div>
  )
}
function BusinessOrderDetail({ id }) {
  const { orders, updateOrderStatus, navigate } = useApp();
  const order = orders.find(o => o.id === id);
  if (!order) return <Empty text="Order not found" />;
  const flowDelivery = ["confirmed", "preparing", "on_the_way", "delivered", "completed"];
  const flowPickup = ["confirmed", "preparing", "ready_for_pickup", "completed"];
  const flow = order.fulfillment === "delivery" ? flowDelivery : flowPickup;
  const idx = flow.indexOf(order.status);
  const next = flow[idx + 1];
  return (
    <div className="max-w-xl space-y-4">
      <button onClick={() => navigate("businessOrders")} className="text-sm font-bold text-[#0f7a3b] inline-flex items-center gap-1"><IconChevronRight size={ICON_SIZE} className="rotate-180" /> Back</button>
      <h1 className="text-[22px] font-bold tracking-tight text-[#0f2815]">Order #{order.id}</h1>
      <div className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
        <p className="text-sm text-[#0f2815] font-bold">Customer: Mercy S. • 070 1234 5678</p>
        <p className="text-sm text-[#5a6b5a] font-medium">Fulfillment: {order.fulfillment} • {formatNaira(order.total)}</p>
        <div className="mt-4 space-y-2">
          {order.items.map(it => <div key={it.listingId} className="flex justify-between text-sm bg-[#f7f8f6] rounded-xl p-3 font-medium"><span className="text-[#0f2815]">{it.name} × {it.qty}</span><span className="font-bold text-[#0f2815]">{formatNaira(it.price * it.qty)}</span></div>)}
        </div>
        <div className="mt-5">
          <p className="text-sm font-bold text-[#0f2815]">Status: <span className="capitalize">{order.status.replaceAll("_", " ")}</span></p>
          <div className="flex flex-wrap gap-2 mt-3">
            {flow.map((s, i) => <span key={s} className={`text-xs px-3 py-1.5 rounded-full font-bold border ${i <= idx ? "bg-[#0f7a3b] text-white border-[#0f7a3b]" : "bg-[#f1f6ef] text-[#5a6b5a] border-transparent"}`}>{s.replaceAll("_", " ")}</span>)}
          </div>
          {next && <button onClick={() => updateOrderStatus(order.id, next)} className="mt-4 w-full bg-[#0f7a3b] text-white py-3 rounded-xl font-bold shadow-sm">Advance to {next.replaceAll("_", " ")}</button>}
          {!next && <p className="mt-4 text-sm font-bold text-[#0f7a3b] bg-[#eef6ec] p-3 rounded-xl text-center border border-[#c8e0c8]">Order completed ✓</p>}
        </div>
      </div>
    </div>
  )
}
function BusinessProfileEdit() { return <Empty text="Business profile edit — use dashboard for demo" /> }

function Empty({ text, actionLabel, onAction }) {
  return (
    <div className="bg-white rounded-2xl p-8 text-center shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
      <p className="text-[#3a4a3a] leading-relaxed font-medium">{text}</p>
      {actionLabel && <button onClick={onAction} className="mt-4 bg-[#0f7a3b] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm">{actionLabel}</button>}
    </div>
  )
}

// Reusable back button: goes to previous page in app history, falls back if none.
// hideIfNoHistory=true renders nothing when there's nowhere to go (for tab roots).
function BackButton({ label = "Back", fallback = "home", hideIfNoHistory = false, className = "" }) {
  const { goBack, canGoBack } = useApp();
  if (hideIfNoHistory && !canGoBack) return null;
  return (
    <button
      onClick={() => goBack(fallback)}
      aria-label={label}
      title={label}
      className={`inline-flex items-center gap-1.5 rounded-full bg-white border border-[#eef3ec] shadow-sm pl-2 pr-3.5 py-1.5 text-sm font-bold text-[#0f2815] hover:bg-[#f1f6ef] transition ${className}`}
    >
      <span className="w-7 h-7 rounded-full bg-[#f1f6ef] grid place-items-center"><IconChevronRight size={ICON_SIZE} className="rotate-180" /></span>
      {label}
    </button>
  )
}

export default function App() {
  return <AppProvider><Shell /></AppProvider>;
}

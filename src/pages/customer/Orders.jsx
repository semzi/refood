import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { formatNaira } from "../../utils/formatters";
import {
  IconMapPin, IconChevronRight, IconCheck, ICON_SIZE, ICON_SM
} from "../../components/common/Icons";
import { Empty } from "../../components/common/Empty";

export function Orders() {
  const { orders, businesses, navigate } = useApp();
  const [tab, setTab] = useState("active");
  const active = orders.filter(o => !["completed", "delivered", "cancelled"].includes(o.status));
  const completed = orders.filter(o => ["completed", "delivered"].includes(o.status));
  const cancelled = orders.filter(o => o.status === "cancelled");
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
          <button key={t.k} onClick={() => setTab(t.k)} className={`relative px-4 py-3 text-[13px] font-bold whitespace-nowrap transition cursor-pointer ${tab === t.k ? "text-[#0f7a3b]" : "text-[#8aa08a] hover:text-[#5a6b5a]"}`}>
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

                        {/* Stepper */}
                        <div className="px-4">
                          <div className="flex items-center gap-1">
                            {steps.map((s, i) => {
                              const done = i < activeIdx;
                              const cur = i === activeIdx;
                              return (
                                <div key={s.k} className="flex items-center gap-1.5 flex-1">
                                  <div className={`w-6 h-6 rounded-full grid place-items-center font-bold shrink-0 border-2 ${done ? "bg-[#157a3b] border-[#157a3b] text-white" : cur ? "bg-white border-[#157a3b] text-[#157a3b]" : "bg-white border-[#d4e6d4] text-[#8aa08a]"}`}>
                                    {done ? <IconCheck size={12} /> : cur ? <span className="w-2 h-2 bg-[#157a3b] rounded-full"></span> : <span className="w-1.5 h-1.5 bg-[#c5d6c5] rounded-full"></span>}
                                  </div>
                                  <span className={`text-[11px] font-bold hidden sm:inline whitespace-nowrap ${i <= activeIdx ? "text-[#0f2815]" : "text-[#8aa08a]"}`}>{s.l}</span>
                                  {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-1 ${i < activeIdx ? "bg-[#157a3b]" : "bg-[#e5ebe5]"}`}></div>}
                                </div>
                              );
                            })}
                          </div>
                          <p className="text-[11px] text-[#5a6b5a] font-medium mt-2">Estimated: {o.estimatedWindow} • {b?.name} to 12 Example St</p>
                        </div>

                        {/* 7-digit code */}
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
                          <button onClick={() => navigate("orderDetail", { id: o.id })} className="flex-1 bg-white border border-[#d4e6d4] py-2.5 rounded-xl text-xs font-bold text-[#0f2815] hover:bg-[#f1f6ef] cursor-pointer">View details</button>
                          <button onClick={() => navigate("trackOrder", { id: o.id })} className="flex-1 bg-[#157a3b] hover:bg-[#126a33] text-white py-2.5 rounded-xl text-xs font-bold shadow-sm cursor-pointer">Track order</button>
                        </div>
                      </div>
                    );
                  })}
                  {active.length === 0 && <Empty text="No active orders. Your upcoming pickups and deliveries will appear here." actionLabel="Find food" onAction={() => navigate("browse")} />}
                </div>
              </div>

              {completed.length > 0 && (
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-[13px] font-bold tracking-wide text-[#0f2815] uppercase">Completed Orders</h3>
                    <button onClick={() => setTab("completed")} className="text-xs font-bold text-[#157a3b] cursor-pointer hover:underline">View all →</button>
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
                      );
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
                  );
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
                  );
                })}
                {cancelled.length === 0 && <Empty text="No cancelled orders." />}
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar */}
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
            <button onClick={() => navigate("browse")} className="mt-4 w-full bg-[#157a3b] hover:bg-[#126a33] text-white py-2.5 rounded-xl text-xs font-bold cursor-pointer transition">Browse surplus</button>
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
          </div>
        </div>
      </div>
    </div>
  );
}

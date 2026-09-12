import { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  IconShield,
  IconCheck,
  IconArrowRight,
  IconChefHat,
  IconBike,
  IconPackage,
  IconStar,
  IconShoppingBag,
  ICON_SM
} from "../common/Icons";

export function BusinessOrderStatusManager({ order }) {
  const { updateOrderStatus } = useApp();
  const [feedback, setFeedback] = useState("");
  const isDelivery = order.fulfillment === "delivery";

  const flowDelivery = [
    { key: "confirmed", label: "Confirmed", icon: IconCheck, desc: "Order confirmed by kitchen" },
    { key: "preparing", label: "Preparing", icon: IconChefHat, desc: "Packaging surplus meals" },
    { key: "on_the_way", label: "On the way", icon: IconBike, desc: "Dispatched with rider" },
    { key: "delivered", label: "Delivered", icon: IconPackage, desc: "Delivered to customer" },
    { key: "completed", label: "Completed", icon: IconStar, desc: "Order finalized & closed" },
  ];

  const flowPickup = [
    { key: "confirmed", label: "Confirmed", icon: IconCheck, desc: "Order confirmed by kitchen" },
    { key: "preparing", label: "Preparing", icon: IconChefHat, desc: "Packaging surplus meals" },
    { key: "ready_for_pickup", label: "Ready for pickup", icon: IconShoppingBag, desc: "Ready at kitchen counter" },
    { key: "completed", label: "Completed", icon: IconStar, desc: "Picked up by customer" },
  ];

  const flow = isDelivery ? flowDelivery : flowPickup;
  const idx = flow.findIndex(s => s.key === order.status);
  const next = idx !== -1 && idx < flow.length - 1 ? flow[idx + 1] : null;

  const handleSetStatus = (newStatus) => {
    updateOrderStatus(order.id, newStatus);
    const label = flow.find(s => s.key === newStatus)?.label || newStatus;
    setFeedback(`Status updated to "${label}"`);
    setTimeout(() => setFeedback(""), 3500);
  };

  return (
    <div className="mt-6 border-t border-[#eef3ec] pt-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0f7a3b] animate-pulse"></span>
          <p className="text-sm font-bold text-[#0f2815]">Set Tracking Status</p>
        </div>
        <span className="text-[11px] font-bold bg-[#0f2815] text-white px-2.5 py-1 rounded-full flex items-center gap-1">
          <IconShield size={12} /> Business Owner Control
        </span>
      </div>
      <p className="text-xs text-[#5a6b5a] mt-1 font-medium">
        Only you (business owner) can update the tracking status. Changes sync live to the customer's tracking screen.
      </p>

      {/* Visual Stepper */}
      <div className="mt-4 bg-[#f7f8f6] p-4 rounded-2xl border border-[#e2ece2] space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#0f2815]">
          <span>Current Active Status:</span>
          <span className="capitalize text-[#0f7a3b] bg-white px-3 py-1 rounded-lg border border-[#c8e0c8] shadow-xs font-extrabold">
            {order.status.replaceAll("_", " ")}
          </span>
        </div>

        {/* Step buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
          {flow.map((s, i) => {
            const isCurrent = s.key === order.status;
            const isPassed = idx !== -1 && i < idx;
            const IconComp = s.icon;
            return (
              <button
                key={s.key}
                onClick={() => handleSetStatus(s.key)}
                className={`p-2.5 rounded-xl text-left border transition text-xs flex flex-col justify-between min-h-[64px] cursor-pointer ${
                  isCurrent
                    ? "bg-[#0f7a3b] text-white border-[#0f7a3b] shadow-sm ring-2 ring-[#0f7a3b]/20"
                    : isPassed
                    ? "bg-[#eef6ec] text-[#0f7a3b] border-[#c8e0c8] hover:bg-[#e4f2e2]"
                    : "bg-white text-[#3a4a3a] border-[#e2ece2] hover:bg-[#f1f6ef]"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-extrabold flex items-center gap-1.5">
                    <IconComp size={14} />
                    {s.label}
                  </span>
                  {isCurrent && <span className="text-[9px] bg-white/20 text-white font-bold px-1.5 py-0.5 rounded">Active</span>}
                  {isPassed && <IconCheck size={12} className="text-[#0f7a3b]" />}
                </div>
                <span className={`text-[10px] leading-tight font-medium mt-1 truncate ${isCurrent ? "text-white/85" : "text-[#8aa08a]"}`}>
                  {s.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {feedback && (
        <div className="mt-3 p-3 bg-[#eef6ec] border border-[#c8e0c8] text-[#0f7a3b] text-xs font-bold rounded-xl text-center flex items-center justify-center gap-1.5">
          <IconCheck size={14} /> {feedback} — Synced with customer view!
        </div>
      )}

      {/* Primary advance button */}
      {next && (() => {
        const NextIcon = next.icon;
        return (
          <button
            onClick={() => handleSetStatus(next.key)}
            className="mt-4 w-full bg-[#0f7a3b] hover:bg-[#126a33] text-white py-3.5 rounded-xl font-bold text-sm shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              Advance to: <NextIcon size={16} /> {next.label}
            </span>
            <IconArrowRight size={ICON_SM} />
          </button>
        );
      })()}

      {!next && (
        <div className="mt-4 bg-[#eef6ec] border border-[#c8e0c8] p-3.5 rounded-xl text-center flex flex-col items-center justify-center">
          <p className="text-sm font-bold text-[#0f7a3b] flex items-center gap-1.5">
            <IconCheck size={16} /> Order Fulfilled & Completed
          </p>
          <p className="text-xs text-[#5a6b5a] mt-0.5">All delivery/pickup milestones have been completed.</p>
        </div>
      )}
    </div>
  );
}

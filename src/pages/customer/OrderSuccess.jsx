import { useApp } from "../../context/AppContext";
import { formatNaira } from "../../utils/formatters";
import { IconCheck, IconChevronRight, ICON_SIZE } from "../../components/common/Icons";
import { BackButton } from "../../components/common/BackButton";
import { Empty } from "../../components/common/Empty";

export function OrderSuccess({ id }) {
  const { orders, navigate } = useApp();
  const order = orders.find(o => o.id === id);

  if (!order) return <Empty text="Order not found" />;

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <div><BackButton label="Back" fallback="orders" /></div>
      <div className="bg-white rounded-[24px] p-7 text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[#eef3ec]">
        <div className="w-16 h-16 bg-[#eef6ec] rounded-full grid place-items-center mx-auto text-[#0f7a3b]"><IconCheck size={ICON_SIZE} /></div>
        <h1 className="text-[20px] font-bold tracking-tight mt-4 text-[#0f2815]">Payment successful!</h1>
        <p className="text-[13.5px] leading-relaxed text-[#3a4a3a] mt-1 font-medium">Order #{order.id} is confirmed. Estimated window: {order.estimatedWindow}</p>
        <div className="mt-5 bg-[#f7f8f6] rounded-2xl p-4 text-left text-sm border border-[#eef3ec]">
          <p className="font-bold text-[#0f2815]">Order summary</p>
          {order.items.map(it => <div key={it.listingId} className="flex justify-between mt-2 text-[#3a4a3a] font-medium"><span>{it.name} × {it.qty}</span><span className="font-bold text-[#0f2815]">{formatNaira(it.price * it.qty)}</span></div>)}
          <div className="flex justify-between font-bold border-t border-[#e0e8e0] mt-3 pt-3 text-[#0f2815]"><span>Total paid</span><span>{formatNaira(order.total)}</span></div>
          <p className="text-xs text-[#5a6b5a] mt-2 font-medium">{order.fulfillment === "delivery" ? "Delivery" : "Pickup"} • {order.paymentMethod}</p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <button onClick={() => navigate("trackOrder", { id: order.id })} className="bg-[#0f7a3b] hover:bg-[#126a33] text-white py-3 rounded-xl font-bold shadow-xs cursor-pointer transition">Track order</button>
          <button onClick={() => navigate("orders")} className="bg-[#f1f6ef] hover:bg-[#e4ece4] py-3 rounded-xl font-bold text-[#0f2815] cursor-pointer transition">View all orders</button>
        </div>
        <button onClick={() => navigate("home")} className="mt-3 text-sm font-bold text-[#0f7a3b] inline-flex items-center gap-1 cursor-pointer hover:underline">Continue browsing <IconChevronRight size={ICON_SIZE} /></button>
      </div>
    </div>
  );
}

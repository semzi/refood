import { useApp } from "../../context/AppContext";
import { formatNaira, getListingPrice } from "../../utils/formatters";
import { BackButton } from "../../components/common/BackButton";
import { Empty } from "../../components/common/Empty";

export function Cart() {
  const { cart, listings, updateCartQty, removeFromCart, navigate } = useApp();
  const items = cart.map(c => ({ ...c, listing: listings.find(l => l.id === c.listingId) })).filter(x => x.listing);
  const subtotal = items.reduce((s, i) => s + getListingPrice(i.listing) * i.qty, 0);
  const delivery = items.some(i => i.listing.delivery) ? 500 : 0;
  const total = subtotal + delivery + (items.length ? 100 : 0);

  if (items.length === 0) return <Empty text="Your cart is empty" actionLabel="Find food" onAction={() => navigate("browse")} />;

  return (
    <div className="max-w-[720px] space-y-5">
      <div><BackButton label="Back" fallback="browse" /></div>
      <h1 className="text-[24px] font-bold tracking-tight text-[#0f2815]">Your Cart</h1>
      <div className="space-y-3">
        {items.map(i => (
          <div key={i.listingId} className="bg-white rounded-2xl p-4 flex gap-4 shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[#eef3ec]">
            <img src={i.listing.image} alt={i.listing.name} className="w-20 h-20 object-cover rounded-xl" />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[14px] text-[#0f2815] truncate">{i.listing.name}</p>
              <p className="text-xs text-[#5a6b5a] font-medium">{formatNaira(getListingPrice(i.listing))} each</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center bg-[#f7f8f6] rounded-full p-1 border border-[#eef3ec]">
                  <button onClick={() => updateCartQty(i.listingId, i.qty - 1)} className="w-7 h-7 bg-white rounded-full grid place-items-center shadow-sm text-[#0f2815] font-bold cursor-pointer">−</button>
                  <span className="text-sm w-8 text-center font-bold text-[#0f2815]">{i.qty}</span>
                  <button onClick={() => updateCartQty(i.listingId, i.qty + 1)} className="w-7 h-7 bg-white rounded-full grid place-items-center shadow-sm text-[#0f2815] font-bold cursor-pointer">+</button>
                </div>
                <button onClick={() => removeFromCart(i.listingId)} className="ml-auto text-xs font-bold text-[#8aa08a] hover:text-red-600 cursor-pointer">Remove</button>
              </div>
            </div>
            <div className="font-bold text-[14px] text-[#0f2815]">{formatNaira(getListingPrice(i.listing) * i.qty)}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[#eef3ec] text-sm space-y-2.5">
        <div className="flex justify-between text-[#5a6b5a] font-medium"><span>Subtotal</span><span className="font-bold text-[#0f2815]">{formatNaira(subtotal)}</span></div>
        <div className="flex justify-between text-[#5a6b5a] font-medium"><span>Delivery fee</span><span className="font-bold text-[#0f2815]">{formatNaira(delivery)}</span></div>
        <div className="flex justify-between text-[#5a6b5a] font-medium"><span>Service fee</span><span className="font-bold text-[#0f2815]">{formatNaira(100)}</span></div>
        <div className="flex justify-between font-bold text-[16px] border-t border-[#eef3ec] pt-3 mt-1 text-[#0f2815]"><span>Total</span><span className="text-[#0f7a3b]">{formatNaira(total)}</span></div>
      </div>
      <button onClick={() => navigate("checkout")} className="w-full bg-[#0f7a3b] hover:bg-[#126a33] text-white py-4 rounded-2xl font-bold shadow-sm transition cursor-pointer">Proceed to checkout</button>
    </div>
  );
}

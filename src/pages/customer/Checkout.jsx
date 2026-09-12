import { useState, useMemo, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { formatNaira } from "../../utils/formatters";
import {
  IconShield, IconCard, IconBank, IconChevronRight, ICON_SIZE, ICON_SM
} from "../../components/common/Icons";
import { BackButton } from "../../components/common/BackButton";
import { Empty } from "../../components/common/Empty";

export function Checkout() {
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
    const t = setInterval(() => setSecondsLeft(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [payment]);

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

  const copy = (label, textToCopy) => {
    try { navigator.clipboard.writeText(textToCopy); } catch {}
    setCopied(label);
    setTimeout(() => setCopied(""), 1500);
  };

  const handlePay = () => {
    setError("");
    if (payment === "card" && !validateCard()) return;
    if (payment === "transfer" && !transferSent) {
      setError("Tap “I have sent the money” after your transfer so we can verify it.");
      return;
    }
    setProcessing(true);
    const steps = payment === "card" ? ["Encrypting card…", "Contacting bank…", "Confirming payment…"] : ["Verifying transfer…", "Confirming with bank…"];
    steps.forEach((s, i) => setTimeout(() => setProcStep(s), i * 700));
    setTimeout(() => {
      const method = payment === "card" ? `Card ${brand} •••• ${card.number.replace(/\s/g, "").slice(-4)}` : `Transfer • ${bank} ${vAccount}`;
      const order = createOrder({ fulfillment, addressId, paymentMethod: method });
      setProcessing(false);
      setProcStep("");
      if (!order) {
        setError("Some items are no longer available. Please update your cart.");
        return;
      }
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
            <button onClick={() => setFulfillment("delivery")} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition cursor-pointer ${fulfillment === "delivery" ? "bg-white shadow-sm text-[#0f2815]" : "text-[#5a6b5a]"}`}>Delivery</button>
            <button onClick={() => setFulfillment("pickup")} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition cursor-pointer ${fulfillment === "pickup" ? "bg-white shadow-sm text-[#0f2815]" : "text-[#5a6b5a]"}`}>Pickup</button>
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
              <button onClick={() => navigate("addresses")} className="text-xs font-bold text-[#0f7a3b] mt-3 inline-flex items-center gap-1 cursor-pointer hover:underline">Manage addresses <IconChevronRight size={14} /></button>
            </div>
          )}
          {fulfillment === "pickup" && <p className="text-[13.5px] leading-relaxed text-[#3a4a3a] mt-4 bg-[#f7f8f6] rounded-xl p-4 font-medium border border-[#eef3ec]">Pickup at restaurant during window. You will receive pickup code after payment.</p>}
        </div>

        {/* Payment section */}
        <div className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[#eef3ec]">
          <div className="flex items-center justify-between">
            <p className="font-bold text-sm text-[#0f2815]">Payment</p>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0f7a3b] bg-[#eef6ec] px-2.5 py-1 rounded-full border border-[#c8e0c8]"><IconShield size={ICON_SM} /> Secured · ReFood Pay</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 p-1 bg-[#f1f6ef] rounded-xl">
            <button onClick={() => setPayment("card")} className={`py-2.5 rounded-lg text-sm font-bold inline-flex items-center justify-center gap-2 transition cursor-pointer ${payment === "card" ? "bg-white shadow-sm text-[#0f2815]" : "text-[#5a6b5a]"}`}><IconCard size={ICON_SIZE} /> Card</button>
            <button onClick={() => setPayment("transfer")} className={`py-2.5 rounded-lg text-sm font-bold inline-flex items-center justify-center gap-2 transition cursor-pointer ${payment === "transfer" ? "bg-white shadow-sm text-[#0f2815]" : "text-[#5a6b5a]"}`}><IconBank size={ICON_SIZE} /> Transfer</button>
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
              <label className="flex items-center gap-2 text-[13px] font-semibold text-[#3a4a3a] cursor-pointer"><input type="checkbox" checked={saveCard} onChange={e => setSaveCard(e.target.checked)} className="accent-[#0f7a3b]" /> Save card for faster checkout</label>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              <div className="flex gap-2 flex-wrap">
                {["GTBank", "Access", "FirstBank", "UBA"].map(b => (
                  <button key={b} onClick={() => setBank(b)} className={`px-3.5 py-2 rounded-xl text-[13px] font-bold border transition cursor-pointer ${bank === b ? "bg-[#0f2815] text-white border-[#0f2815]" : "bg-[#f7f8f6] text-[#3a4a3a] border-transparent"}`}>{b}</button>
                ))}
              </div>
              <div className="bg-[#f7f8f6] rounded-2xl p-4 border border-dashed border-[#c8e0c8]">
                <p className="text-[11px] font-bold tracking-widest text-[#5a6b5a] uppercase">Transfer {formatNaira(total)} to</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[22px] font-extrabold tracking-[0.15em] text-[#0f2815]">{vAccount}</span>
                  <button onClick={() => copy("acct", vAccount)} className="text-[12px] font-bold bg-white border border-[#eef3ec] px-3 py-1.5 rounded-lg shadow-sm cursor-pointer">{copied === "acct" ? "Copied!" : "Copy"}</button>
                </div>
                <p className="text-[12.5px] text-[#3a4a3a] font-medium mt-1">{bank} · ReFood Pay · Mercy S.</p>
                <p className="text-[12px] font-bold mt-2 text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">Expires in {mmss} — use this account for this order only</p>
              </div>
              <button onClick={() => setTransferSent(!transferSent)} className={`w-full py-3 rounded-xl text-sm font-bold border transition cursor-pointer ${transferSent ? "bg-[#eef6ec] text-[#0f7a3b] border-[#0f7a3b]/30" : "bg-white text-[#0f2815] border-[#d4e6d4]"}`}>{transferSent ? "✓ I have sent the money — tap to undo" : "I have sent the money"}</button>
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
          <button onClick={handlePay} disabled={processing} className="mt-5 w-full bg-[#0f7a3b] hover:bg-[#126a33] text-white py-3.5 rounded-xl font-bold shadow-sm disabled:opacity-60 transition cursor-pointer">
            {processing ? (procStep || "Processing…") : payment === "card" ? `Pay ${formatNaira(total)} with card` : `Verify transfer • ${formatNaira(total)}`}
          </button>
          <p className="text-[11px] text-[#8aa08a] mt-2 text-center font-medium inline-flex items-center justify-center gap-1 w-full"><IconShield size={ICON_SM} /> 256-bit encrypted · Demo — no real charge.</p>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BackButton } from '../../components/common/BackButton';
import {
  IconTruck,
  IconMapPin,
  IconPhone,
  IconMessage,
  IconCheck,
  IconClock,
  IconShieldCheck,
  IconChefHat,
  IconPackageCheck,
  IconNavigation,
  IconEye,
  IconStar,
} from '../../components/common/Icons';
import { MessageDriverModal } from '../../components/customer/MessageDriverModal';

const STATUS_STEPS = [
  { key: 'placed', label: 'Order Placed', time: '12:30 PM', icon: IconClock },
  { key: 'preparing', label: 'In Kitchen', time: '12:35 PM', icon: IconChefHat },
  { key: 'ready', label: 'On the Way', time: '12:48 PM', icon: IconTruck },
  { key: 'delivered', label: 'Delivered', time: '1:05 PM', icon: IconPackageCheck },
];

export function TrackOrder({ orderId, id }) {
  const { orders, navigate } = useApp();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [driverCallModal, setDriverCallModal] = useState(false);

  const targetId = orderId || id;
  const order = orders.find((o) => o.id === targetId) || orders[0];

  if (!order) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>No active order found to track.</p>
        <button onClick={() => navigate('orders')} className="mt-3 text-emerald-600 font-semibold underline cursor-pointer">
          View All Orders
        </button>
      </div>
    );
  }

  // Map any legacy or custom status strings into the 4 primary steps
  const normalizedStatus =
    order.status === 'confirmed'
      ? 'placed'
      : order.status === 'on_the_way' || order.status === 'ready_for_pickup'
      ? 'ready'
      : order.status === 'completed'
      ? 'delivered'
      : order.status;

  const currentStepIndex = Math.max(0, STATUS_STEPS.findIndex((s) => s.key === normalizedStatus));
  const isDelivered = normalizedStatus === 'delivered';

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn pb-16">
      {/* Back button above header */}
      <div>
        <BackButton defaultRoute="orders" />
      </div>

      {/* Main Title & Action block */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Live Delivery Tracking</h1>
          <p className="text-xs text-gray-500 mt-0.5">Order #{order.id} • Arriving in ~18 mins</p>
        </div>
        <button
          onClick={() => navigate('orderDetail', { id: order.id, orderId: order.id })}
          className="text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-2 rounded-xl transition cursor-pointer"
        >
          View Receipt
        </button>
      </div>

      {/* Interactive Map Simulation */}
      <div className="relative h-64 md:h-80 w-full rounded-3xl overflow-hidden bg-emerald-950/90 shadow-md border border-gray-100">
        {/* Stylized vector map grid background */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, #10b981 1px, transparent 1px),
              linear-gradient(to right, #064e3b 1px, transparent 1px),
              linear-gradient(to bottom, #064e3b 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px, 60px 60px, 60px 60px',
          }}
        />

        {/* Pulsing route line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 80 180 Q 200 100, 360 140 T 580 80"
            fill="none"
            stroke="#10b981"
            strokeWidth="4"
            strokeDasharray="8 8"
            className="animate-pulse"
          />
        </svg>

        {/* Restaurant Point */}
        <div className="absolute left-16 top-36 flex flex-col items-center group">
          <div className="bg-white text-emerald-700 p-2.5 rounded-2xl shadow-lg border-2 border-emerald-500 transition-transform group-hover:scale-110">
            <IconChefHat size={20} />
          </div>
          <span className="mt-1 text-[11px] font-bold bg-black/75 text-white px-2 py-0.5 rounded-md backdrop-blur-sm">
            {order.businessName || 'Restaurant'}
          </span>
        </div>

        {/* Driver / Rider Marker with subtle bounce */}
        <div className="absolute left-1/2 top-28 -translate-x-1/2 flex flex-col items-center">
          <div className="relative">
            <div className="absolute -inset-2 bg-emerald-400/40 rounded-full animate-ping" />
            <div className="relative bg-emerald-500 text-white p-3 rounded-2xl shadow-xl border-2 border-white ring-4 ring-emerald-300/40">
              <IconNavigation size={22} className="rotate-45" />
            </div>
          </div>
          <div className="mt-1.5 flex items-center gap-1 bg-emerald-900/90 text-emerald-200 border border-emerald-500/40 text-[11px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Musa (Rider) • 0.8 km away
          </div>
        </div>

        {/* Customer Destination */}
        <div className="absolute right-12 top-14 flex flex-col items-center">
          <div className="bg-red-500 text-white p-2.5 rounded-2xl shadow-lg border-2 border-white">
            <IconMapPin size={20} />
          </div>
          <span className="mt-1 text-[11px] font-bold bg-black/75 text-white px-2 py-0.5 rounded-md backdrop-blur-sm">
            Your Delivery Location
          </span>
        </div>

        {/* Map Overlay Stats */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 px-4 flex items-center justify-between shadow-lg border border-white/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
              18<span className="text-[10px] font-normal">m</span>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Estimated Delivery Time</p>
              <p className="text-[11px] text-gray-500">Traffic is moderate on Admiralty Way</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Live GPS Synced
            </span>
          </div>
        </div>
      </div>

      {/* Driver Card & Action Controls */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"
              alt="Driver"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
            />
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white">
              <IconShieldCheck size={12} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-gray-900">Musa Ibrahim</h3>
              <span className="text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded flex items-center gap-1">
                <IconStar size={11} className="text-amber-500 fill-amber-500" /> 4.92 (480+ deliveries)
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">ReFood Express Partner • TVS Dispatch Bike (LAG-482-XA)</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* Functional Message Driver CTA */}
          <button
            onClick={() => setIsChatOpen(true)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-emerald-600/20 transition active:scale-95 cursor-pointer"
          >
            <IconMessage size={16} />
            <span>Message Rider</span>
          </button>
          <button
            onClick={() => setDriverCallModal(true)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-2xl text-xs font-bold transition active:scale-95 border border-gray-200 cursor-pointer"
          >
            <IconPhone size={16} />
            <span>Call</span>
          </button>
        </div>
      </div>

      {/* Delivery PIN Code */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-700">
            <IconShieldCheck size={22} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900">Handover Verification PIN</p>
            <p className="text-[11px] text-gray-600">Share this code with Musa upon meal arrival.</p>
          </div>
        </div>
        <div className="px-4 py-2 bg-white rounded-xl border border-amber-300 shadow-xs font-mono font-extrabold text-lg text-amber-800 tracking-widest">
          {order.deliveryPin || '4 8 2 9'}
        </div>
      </div>

      {/* Live Order Timeline (Customer Read-Only) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h2 className="text-base font-bold text-gray-900">Delivery Status Timeline</h2>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <IconEye size={13} className="text-gray-400" /> Managed in real-time by kitchen
          </span>
        </div>

        {/* Clean, perfectly spaced timeline column */}
        <div className="space-y-7 pl-1">
          {STATUS_STEPS.map((step, idx) => {
            const isDone = idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const isLast = idx === STATUS_STEPS.length - 1;
            const Icon = step.icon;

            return (
              <div key={step.key} className="relative flex items-start gap-4 sm:gap-5">
                {/* Left Step Indicator + Connecting Line */}
                <div className="flex flex-col items-center shrink-0 relative">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs z-10 transition-all ${
                      isDone
                        ? 'bg-emerald-600 text-white shadow-sm ring-4 ring-emerald-100'
                        : 'bg-white border-2 border-gray-300 text-gray-400'
                    }`}
                  >
                    {isDone ? <IconCheck size={14} /> : <Icon size={14} />}
                  </div>
                  {!isLast && (
                    <div
                      className={`w-0.5 absolute top-8 bottom-[-28px] ${
                        idx < currentStepIndex ? 'bg-emerald-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>

                {/* Right Step Content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-bold ${isDone ? 'text-gray-900' : 'text-gray-400'}`}>
                        {step.label}
                      </p>
                      {isCurrent && !isDelivered && (
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full animate-pulse">
                          In Progress
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400 font-medium shrink-0">{step.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {step.key === 'placed' && 'Order received and confirmed by kitchen.'}
                    {step.key === 'preparing' && 'Kitchen is carefully packing your surplus meal.'}
                    {step.key === 'ready' && 'Rider is en route with your insulated bag.'}
                    {step.key === 'delivered' && 'Delivered successfully at your doorstep.'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulated Call Modal */}
      {driverCallModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-gray-900 text-white rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl border border-gray-800 animate-scaleUp">
            <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-emerald-500">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                alt="Driver"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold">Calling Musa Ibrahim...</h3>
              <p className="text-xs text-emerald-400 mt-0.5">ReFood Secure Voice Line</p>
            </div>
            <div className="p-3 bg-gray-800 rounded-xl text-xs text-gray-300">
              "Hello! I am just turning into your street now, will be there in 3 minutes."
            </div>
            <button
              onClick={() => setDriverCallModal(false)}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl transition cursor-pointer"
            >
              End Call
            </button>
          </div>
        </div>
      )}

      {/* Driver Interactive Chat Modal */}
      <MessageDriverModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        driverName="Musa Ibrahim"
        orderId={order.id}
      />
    </div>
  );
}

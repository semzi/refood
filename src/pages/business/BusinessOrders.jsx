import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  IconArrowRight,
  IconMapPin,
  IconPhone,
  IconShieldCheck,
} from '../../components/common/Icons';
import { formatNaira, getOrderItemPrice, getOrderItemQty } from '../../utils/formatters';

const STATUS_FILTERS = [
  { key: 'all', label: 'All Orders' },
  { key: 'placed', label: 'Placed (New)' },
  { key: 'preparing', label: 'Preparing (Kitchen)' },
  { key: 'ready', label: 'Ready (With Rider)' },
  { key: 'delivered', label: 'Delivered' },
];

const STATUS_CONFIG = {
  placed: { label: 'New Placed', bg: 'bg-amber-100 text-amber-800 border-amber-200', next: 'preparing', actionText: 'Accept & Cook' },
  preparing: { label: 'In Kitchen', bg: 'bg-blue-100 text-blue-800 border-blue-200', next: 'ready', actionText: 'Hand to Rider' },
  ready: { label: 'Out with Rider', bg: 'bg-purple-100 text-purple-800 border-purple-200', next: 'delivered', actionText: 'Confirm Delivered' },
  delivered: { label: 'Completed', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200', next: null, actionText: null },
};

export function BusinessOrders({ navigateBusiness }) {
  const { orders, advanceOrderStatus } = useApp();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredOrders = orders.filter((o) => {
    if (activeFilter === 'all') return true;
    return o.status === activeFilter;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">Live Kitchen Orders</h1>
        <p className="text-xs text-gray-500">
          Advance order stages as kitchen cooks, packs, and dispatches food
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {STATUS_FILTERS.map((tab) => {
          const isActive = activeFilter === tab.key;
          const count = tab.key === 'all' ? orders.length : orders.filter((o) => o.status === tab.key).length;

          return (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition shrink-0 flex items-center gap-2 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Order Cards List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-gray-100 text-gray-400">
            <p className="text-sm font-semibold">No orders in this status category.</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.placed;

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-sm sm:text-base font-black text-gray-900">Order #{order.id}</span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${cfg.bg}`}>
                      {cfg.label}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(order.date || order.createdAt || new Date()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-sm sm:text-base font-black text-emerald-700">{formatNaira(order.total)}</span>
                  </div>
                </div>

                {/* Items & Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5 bg-slate-50/70 p-3 rounded-2xl border border-gray-100">
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Ordered Items</p>
                    {order.items?.map((item, idx) => {
                      const qty = getOrderItemQty(item);
                      const name = item.name || item.title || 'Surplus Meal';
                      const itemPrice = getOrderItemPrice(item);
                      return (
                        <div key={idx} className="text-xs text-gray-800 flex items-center justify-between gap-2">
                          <span className="font-semibold text-gray-900">
                            <strong className="text-emerald-700 font-extrabold">{qty}x</strong> {name}
                          </span>
                          <span className="font-semibold text-gray-500 shrink-0">
                            {formatNaira(itemPrice * qty)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-1.5 bg-slate-50/70 p-3 rounded-2xl border border-gray-100 text-xs text-gray-600">
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Customer & Delivery</p>
                    <p className="flex items-center gap-1.5 text-gray-700">
                      <IconMapPin size={14} className="text-emerald-600 shrink-0" />
                      <span className="truncate">{order.deliveryAddress || (order.fulfillment === 'pickup' ? 'Store Pickup' : '12 Admiralty Way, Lekki Phase 1')}</span>
                    </p>
                    <p className="flex items-center gap-1.5 text-gray-700">
                      <IconPhone size={14} className="text-emerald-600 shrink-0" />
                      <span>Customer: {order.customerPhone || '+234 802 345 6789'}</span>
                    </p>
                  </div>
                </div>

                {/* Action Toolbar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-3 border-t border-gray-100 gap-2.5">
                  <button
                    onClick={() => navigateBusiness('order-detail', { orderId: order.id })}
                    className="w-full sm:w-auto px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-xs transition text-center cursor-pointer active:scale-98"
                  >
                    Open Full Manager
                  </button>

                  {cfg.next ? (
                    <button
                      onClick={() => advanceOrderStatus(order.id)}
                      className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-sm transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <span>Advance to: {STATUS_CONFIG[cfg.next]?.label}</span>
                      <IconArrowRight size={14} />
                    </button>
                  ) : (
                    <span className="inline-flex items-center justify-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200/50">
                      <IconShieldCheck size={14} /> Order Fulfilled
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

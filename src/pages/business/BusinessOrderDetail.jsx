import React from 'react';
import { useApp } from '../../context/AppContext';
import { BusinessOrderStatusManager } from '../../components/business/BusinessOrderStatusManager';
import { IconArrowLeft, IconMapPin, IconShieldCheck } from '../../components/common/Icons';
import { formatNaira, getOrderItemPrice, getOrderItemQty } from '../../utils/formatters';

export function BusinessOrderDetail({ orderId, id, navigateBusiness }) {
  const { orders } = useApp();
  const targetId = orderId || id;
  const order = orders.find((o) => o.id === targetId) || orders[0];

  if (!order) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>Order not found.</p>
        <button
          onClick={() => navigateBusiness('orders')}
          className="mt-3 text-emerald-600 font-semibold underline cursor-pointer"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn pb-16">
      {/* Back button above */}
      <div>
        <button
          type="button"
          onClick={() => navigateBusiness('orders')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold transition cursor-pointer shadow-2xs"
        >
          <IconArrowLeft size={16} />
          <span>Back</span>
        </button>
      </div>

      {/* Main Title block */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">Order Management #{order.id}</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Placed on {new Date(order.date || order.createdAt || new Date()).toLocaleString()}
        </p>
      </div>

      {/* Business Order Status Manager - Dedicated Interactive Operator Controls */}
      <BusinessOrderStatusManager order={order} />

      {/* Order Item Details */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
        <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider">Kitchen Order Slip</h2>
        <div className="divide-y divide-gray-100">
          {order.items?.map((item, idx) => {
            const itemTitle = item.name || item.title || 'Surplus Meal';
            const itemQty = getOrderItemQty(item);
            const itemPrice = getOrderItemPrice(item);

            return (
              <div key={idx} className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  {item.image && (
                    <img src={item.image} alt={itemTitle} className="w-14 h-14 rounded-xl object-cover" />
                  )}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{itemTitle}</h3>
                    <p className="text-xs text-gray-500">
                      Qty: <strong className="text-emerald-700">{itemQty}</strong> × {formatNaira(itemPrice)}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-extrabold text-gray-900">
                  {formatNaira(itemPrice * itemQty)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Customer & Courier Handover Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-3">
          <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
            <IconMapPin size={16} className="text-emerald-600" /> Delivery Destination
          </h3>
          <p className="text-xs text-gray-700 font-medium">{order.deliveryAddress || '12 Admiralty Way, Lekki Phase 1, Lagos'}</p>
          <p className="text-xs text-gray-500">Phone: {order.customerPhone || '+234 802 345 6789'}</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-3">
          <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
            <IconShieldCheck size={16} className="text-emerald-600" /> Dispatch Verification
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Assigned Driver:</span>
            <span className="text-xs font-bold text-gray-900">Musa Ibrahim (Bike)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Verification PIN:</span>
            <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
              {order.deliveryPin || '4 8 2 9'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

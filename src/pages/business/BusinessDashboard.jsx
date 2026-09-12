import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  IconDollarSign,
  IconShoppingBag,
  IconChefHat,
  IconPlus,
  IconArrowRight,
  IconTrendingUp,
  IconClock,
} from '../../components/common/Icons';
import { formatNaira } from '../../utils/formatters';

export function BusinessDashboard({ navigateBusiness }) {
  const { orders, foods, advanceOrderStatus } = useApp();

  const activeOrders = orders.filter((o) => o.status !== 'delivered');
  const deliveredOrders = orders.filter((o) => o.status === 'delivered');
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalMealsSaved = deliveredOrders.length * 2 + 18;

  const STATUS_CONFIG = {
    placed: { label: 'New Placed', bg: 'bg-amber-100 text-amber-800 border-amber-200', next: 'preparing', actionText: 'Accept & Cook' },
    preparing: { label: 'In Kitchen', bg: 'bg-blue-100 text-blue-800 border-blue-200', next: 'ready', actionText: 'Mark Ready' },
    ready: { label: 'Out with Rider', bg: 'bg-purple-100 text-purple-800 border-purple-200', next: 'delivered', actionText: 'Mark Delivered' },
    delivered: { label: 'Completed', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200', next: null, actionText: null },
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-700/60">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Kitchen Live Operations
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome back, Mega Kitchen Lekki
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            You have <strong className="text-emerald-400">{activeOrders.length} active orders</strong> currently in fulfillment. Control order preparation stages below.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => navigateBusiness('new-listing')}
            className="inline-flex items-center gap-2 px-4 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition active:scale-95"
          >
            <IconPlus size={18} /> Add Surplus Meal
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Total Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <IconDollarSign size={18} />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-black text-gray-900 mt-2">{formatNaira(totalRevenue)}</p>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
            <IconTrendingUp size={12} /> +18.4% from last week
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Live Active Orders</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <IconClock size={18} />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-black text-amber-600 mt-2">{activeOrders.length}</p>
          <p className="text-[11px] text-gray-500 mt-1">Requiring kitchen action</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Surplus Rescued</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <IconChefHat size={18} />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-black text-teal-700 mt-2">{totalMealsSaved} Meals</p>
          <p className="text-[11px] text-teal-600 font-medium mt-1">~38.4 kg CO₂ saved</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Active Listings</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <IconShoppingBag size={18} />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-black text-purple-900 mt-2">{foods.length}</p>
          <p className="text-[11px] text-gray-500 mt-1">Available in store</p>
        </div>
      </div>

      {/* Live Order Stage Control Station */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-sm space-y-4 sm:space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h2 className="text-base sm:text-lg font-black text-gray-900">Live Kitchen Fulfillment Station</h2>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
              Real-time dispatch controls. Advance kitchen preparation and rider handover stages.
            </p>
          </div>
          <button
            onClick={() => navigateBusiness('orders')}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/60 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer"
          >
            <span>All Orders</span>
            <IconArrowRight size={13} />
          </button>
        </div>

        <div className="space-y-3.5">
          {orders.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-xs font-medium">
              No live orders at the moment.
            </div>
          ) : (
            orders.map((order) => {
              const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.placed;
              const itemsList = order.items?.map((i) => {
                const qty = i.quantity || i.qty || 1;
                const name = i.name || i.title || 'Surplus Meal';
                return `${qty}x ${name}`;
              }).join(', ') || '1x Surplus Meal';
              const deliveryAddress = order.deliveryAddress || (order.fulfillment === 'pickup' ? 'Store Pickup' : 'Lekki Phase 1, Lagos');
              const orderDate = order.createdAt || order.date;
              const orderTime = orderDate ? new Date(orderDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now';

              return (
                <div
                  key={order.id}
                  className="p-4 sm:p-5 rounded-2xl border border-gray-100 hover:border-emerald-200 transition-all flex flex-col gap-3.5 bg-[#fbfdfa] shadow-2xs"
                >
                  {/* Top Bar: Order ID, Time & Status Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm sm:text-base font-black text-gray-900 tracking-tight">Order #{order.id}</span>
                      <span className="text-[11px] text-gray-400 font-medium hidden xs:inline">• {orderTime}</span>
                    </div>
                    <span
                      className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border shadow-2xs shrink-0 ${cfg.bg}`}
                    >
                      {cfg.label}
                    </span>
                  </div>

                  {/* Order Items Description */}
                  <div className="bg-white rounded-xl p-3 border border-gray-100/90 text-xs text-gray-800 space-y-2">
                    <p className="line-clamp-2 leading-relaxed font-bold text-gray-900">
                      {itemsList}
                    </p>
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-50 text-[11.5px] text-gray-500">
                      <span>Total: <strong className="text-emerald-700 font-extrabold text-xs sm:text-sm">{formatNaira(order.total)}</strong></span>
                      <span className="truncate max-w-[55%] text-right font-medium text-gray-500">
                        {order.fulfillment === 'pickup' ? '📦 Pickup' : `📍 ${deliveryAddress}`}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons: Stacked on Mobile, Inline on Desktop */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 pt-0.5">
                    <button
                      onClick={() => navigateBusiness('order-detail', { orderId: order.id })}
                      className="w-full sm:w-auto px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl text-xs font-bold transition text-center active:scale-98 cursor-pointer shadow-2xs"
                    >
                      Manage Stages
                    </button>

                    {cfg.next && (
                      <button
                        onClick={() => advanceOrderStatus(order.id)}
                        className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold shadow-sm transition flex items-center justify-center gap-1.5 active:scale-98 cursor-pointer"
                      >
                        <span>{cfg.actionText}</span>
                        <IconArrowRight size={14} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Active Listings Quick Section */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Active Surplus Listings</h2>
          <button
            onClick={() => navigateBusiness('listings')}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition"
          >
            Manage Catalog <IconArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {foods.slice(0, 3).map((food) => {
            const itemTitle = food.name || food.title || 'Surplus Item';
            const price = food.discountPrice || food.surplusPrice || 1800;
            const stock = food.quantityLeft !== undefined ? food.quantityLeft : (food.quantity !== undefined ? food.quantity : 4);

            return (
              <div
                key={food.id}
                className="p-3.5 rounded-2xl border border-gray-100 bg-white hover:shadow-md transition flex items-center gap-3"
              >
                <img
                  src={food.image}
                  alt={itemTitle}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs font-bold text-gray-900 truncate">{itemTitle}</h3>
                  <p className="text-[11px] text-emerald-600 font-extrabold">{formatNaira(price)}</p>
                  <span className="inline-block mt-1 text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                    {stock} left in stock
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

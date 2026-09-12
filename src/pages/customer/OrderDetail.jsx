import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BackButton } from '../../components/common/BackButton';
import { Empty } from '../../components/common/Empty';
import { IconStar } from '../../components/common/Icons';
import { formatNaira } from '../../utils/formatters';

export function OrderDetail({ orderId, id }) {
  const { orders, businesses, addReview, navigate } = useApp();
  const targetId = orderId || id;
  const order = orders.find((o) => o.id === targetId) || orders[0];
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  if (!order) return <Empty text="Order not found" />;

  const b = businesses.find((x) => x.id === order.businessId) || {
    name: order.businessName || 'Mega Kitchen Lekki',
  };

  const orderDate = order.date || order.createdAt || new Date().toISOString();
  const isCompleted = order.status === 'completed' || order.status === 'delivered';
  const canReview = isCompleted && !order.reviewed;

  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-fadeIn pb-16">
      {/* Back button on top */}
      <div>
        <BackButton label="Back" fallback="orders" defaultRoute="orders" />
      </div>

      {/* Title & Metadata */}
      <div>
        <h1 className="text-[22px] font-bold tracking-tight text-[#0f2815]">Order #{order.id}</h1>
        <p className="text-[13px] text-[#5a6b5a] mt-1 font-medium">
          {b?.name} • {new Date(orderDate).toLocaleString()}
        </p>
      </div>

      {/* Main Order Card */}
      <div className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[#eef3ec]">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize ${
              isCompleted ? 'bg-[#eef6ec] text-[#0f7a3b]' : 'bg-amber-50 text-amber-700'
            }`}
          >
            {order.status.replaceAll('_', ' ')}
          </span>
          <span className="text-xs font-semibold text-[#5a6b5a]">
            Estimated window: <strong className="text-[#0f2815]">{order.estimatedWindow || '12:30 PM - 1:00 PM'}</strong>
          </span>
        </div>

        {/* Item Rows */}
        <div className="mt-4 space-y-3 text-sm">
          {order.items?.map((it, idx) => {
            const itemTitle = it.name || it.title || 'Surplus Meal';
            const itemQty = it.qty || it.quantity || 1;
            const itemPrice = it.price || it.discountPrice || it.surplusPrice || 1500;

            return (
              <div key={idx} className="flex gap-3 bg-[#f7f8f6] rounded-2xl p-3 items-center">
                {it.image && (
                  <img src={it.image} alt={itemTitle} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                )}
                <div>
                  <p className="font-bold text-[#0f2815]">{itemTitle}</p>
                  <p className="text-xs text-[#5a6b5a] font-medium">
                    Qty: {itemQty} • {formatNaira(itemPrice)}
                  </p>
                </div>
                <span className="ml-auto font-bold self-center text-[#0f2815]">
                  {formatNaira(itemPrice * itemQty)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Pricing Summary */}
        <div className="mt-4 bg-[#f7f8f6] rounded-2xl p-4 text-sm space-y-2">
          <div className="flex justify-between text-[#5a6b5a] font-medium">
            <span>Subtotal</span>
            <span className="font-bold text-[#0f2815]">{formatNaira(order.subtotal || order.total - 600)}</span>
          </div>
          <div className="flex justify-between text-[#5a6b5a] font-medium">
            <span>Delivery</span>
            <span className="font-bold text-[#0f2815]">{formatNaira(order.deliveryFee ?? 500)}</span>
          </div>
          <div className="flex justify-between text-[#5a6b5a] font-medium">
            <span>Service</span>
            <span className="font-bold text-[#0f2815]">{formatNaira(order.serviceFee ?? 100)}</span>
          </div>
          <div className="flex justify-between font-bold text-[#0f2815] border-t border-[#e0e8e0] pt-2">
            <span>Total</span>
            <span className="text-[#0f7a3b]">{formatNaira(order.total)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <button
            onClick={() => navigate('trackOrder', { id: order.id, orderId: order.id })}
            className="bg-[#0f7a3b] hover:bg-[#126a33] text-white py-3 rounded-xl font-bold transition cursor-pointer"
          >
            Track order
          </button>
          <button
            onClick={() => navigate('home')}
            className="bg-[#f1f6ef] hover:bg-[#e4ece4] py-3 rounded-xl font-bold text-[#0f2815] transition cursor-pointer"
          >
            Reorder
          </button>
        </div>
      </div>

      {/* Review Box */}
      {canReview && (
        <div className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[#eef3ec]">
          <p className="font-bold text-[#0f2815]">Leave a review</p>
          <div className="flex gap-1.5 mt-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                className="cursor-pointer transition-transform hover:scale-110 p-1"
                aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
              >
                <IconStar
                  size={24}
                  className={n <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
                />
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="How was your food?"
            className="mt-3 w-full bg-[#f7f8f6] rounded-xl p-4 text-sm text-[#0f2815] placeholder:text-[#8aa08a] font-medium focus:outline-none focus:ring-2 focus:ring-[#0f7a3b]/15"
            rows={3}
          />
          <button
            onClick={() => {
              if (addReview) {
                addReview(order.id, order.items?.[0]?.listingId, rating, comment);
              }
            }}
            className="mt-3 bg-[#0f2815] text-white px-6 py-2.5 rounded-xl text-sm font-bold cursor-pointer"
          >
            Submit review
          </button>
        </div>
      )}

      {order.reviewed && (
        <p className="text-sm text-[#0f7a3b] bg-[#eef6ec] p-4 rounded-2xl font-bold">
          You reviewed this order. Thank you!
        </p>
      )}
    </div>
  );
}

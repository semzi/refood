import React from 'react';
import { useApp } from '../../context/AppContext';
import { BackButton } from '../../components/common/BackButton';
import { Empty } from '../../components/common/Empty';
import { IconBell, IconTruck, IconSparkles, IconClock } from '../../components/common/Icons';

export function Notifications() {
  const { notifications, markAllNotificationsRead, navigate } = useApp();

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn pb-16">
      {/* Back button above header */}
      <div>
        <BackButton defaultRoute="home" />
      </div>

      {/* Main Title & Action block */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-xs text-gray-500 mt-0.5">Order updates, flash surplus drops & alerts</p>
        </div>
        {notifications.some((n) => !n.read) && (
          <button
            onClick={markAllNotificationsRead}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-2 rounded-xl transition cursor-pointer"
          >
            Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <Empty
          title="No notifications yet"
          description="When restaurants drop surplus discounts or your order updates, you'll see alerts here."
          icon={IconBell}
          actionLabel="Explore Meals"
          onAction={() => navigate('browse')}
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => {
            const isUnread = !n.read;
            return (
              <div
                key={n.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  isUnread
                    ? 'bg-emerald-50/60 border-emerald-200 shadow-xs'
                    : 'bg-white border-gray-100 hover:border-gray-200'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    n.type === 'order'
                      ? 'bg-emerald-100 text-emerald-700'
                      : n.type === 'promo'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-teal-100 text-teal-700'
                  }`}
                >
                  {n.type === 'order' ? (
                    <IconTruck size={20} />
                  ) : n.type === 'promo' ? (
                    <IconSparkles size={20} />
                  ) : (
                    <IconBell size={20} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`text-sm ${isUnread ? 'font-bold text-gray-900' : 'font-medium text-gray-800'}`}>
                      {n.title}
                    </h3>
                    <span className="text-[11px] text-gray-400 shrink-0 flex items-center gap-1">
                      <IconClock size={12} /> {n.time || 'Just now'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{n.body || n.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

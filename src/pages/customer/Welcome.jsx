import React from 'react';
import { useApp } from '../../context/AppContext';
import { IconShoppingBag, IconStore, IconSparkles, IconCheck } from '../../components/common/Icons';

export function Welcome() {
  const { navigate, switchRole } = useApp();

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side: Brand Story & Impact */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
            <IconSparkles size={14} className="text-emerald-600" />
            <span>Nigeria's #1 Surplus Food Marketplace</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            Delicious Food,{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Zero Waste.
            </span>
          </h1>

          <p className="text-gray-600 text-sm leading-relaxed">
            Rescue freshly prepared surplus meals from top Lagos restaurants, bakeries, and cafes at up to 70% off.
            Save money while saving the planet.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-xs font-semibold text-gray-700">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <IconCheck size={14} />
              </div>
              <span>Daily discounts from verified premium food vendors</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold text-gray-700">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <IconCheck size={14} />
              </div>
              <span>Live dispatch tracking & driver in-app chat simulation</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold text-gray-700">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <IconCheck size={14} />
              </div>
              <span>Directly supporting UN Sustainable Development Goal 12.3</span>
            </div>
          </div>
        </div>

        {/* Right Side: Role Selector Cards */}
        <div className="space-y-4">
          {/* Customer Option */}
          <div
            onClick={() => {
              switchRole('customer');
              navigate('home');
            }}
            className="group cursor-pointer p-6 bg-white hover:bg-emerald-50/50 rounded-3xl border-2 border-gray-100 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all duration-200 relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition">
                <IconShoppingBag size={24} />
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full">
                Order Meals
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition">
                I am a Hungry Customer
              </h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Browse surprise bags, surplus jollof, fresh bakery pastries, and place orders with live tracking.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-600">
              <span>Start Exploring</span> →
            </div>
          </div>

          {/* Business Owner Option */}
          <div
            onClick={() => {
              switchRole('business');
              window.location.href = '/business';
            }}
            className="group cursor-pointer p-6 bg-white hover:bg-teal-50/50 rounded-3xl border-2 border-gray-100 hover:border-teal-500 shadow-sm hover:shadow-xl transition-all duration-200 relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-teal-800 text-white flex items-center justify-center shadow-md shadow-teal-800/20 group-hover:scale-105 transition">
                <IconStore size={24} />
              </div>
              <span className="text-xs font-bold text-teal-800 bg-teal-100/70 px-2.5 py-1 rounded-full">
                Vendor Portal
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-800 transition">
                I am a Restaurant / Business Owner
              </h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                List end-of-day surplus inventory, manage active kitchen preparation, and advance live delivery stages.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-teal-700">
              <span>Open Business Portal</span> →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

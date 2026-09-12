import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  IconPlus,
  IconSearch,
  IconEdit,
  IconTrash2,
  IconClock,
} from '../../components/common/Icons';
import { formatNaira } from '../../utils/formatters';

export function BusinessListings({ navigateBusiness }) {
  const { foods = [], deleteFood } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredFoods = (foods || []).filter((f) => {
    if (!f) return false;
    const title = (f.name || f.title || '').toLowerCase();
    const matchesSearch = !search || title.includes(search.toLowerCase());
    const matchesCat =
      selectedCategory === 'all' ||
      (f.category || '').toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Surplus Food Inventory</h1>
          <p className="text-xs text-gray-500">
            Publish daily surplus portions, mystery bags, and rescue packs
          </p>
        </div>
        <button
          onClick={() => navigateBusiness('new-listing')}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-emerald-600/20 transition active:scale-95 cursor-pointer"
        >
          <IconPlus size={16} /> Add Surplus Item
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <IconSearch size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search items by name or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['all', 'Meals', 'Bakery', 'Groceries', 'Beverages'].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition capitalize cursor-pointer shrink-0 ${
                selectedCategory.toLowerCase() === c.toLowerCase()
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Food Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFoods.map((food) => {
          const itemTitle = food.name || food.title || 'Surplus Item';
          const originalPrice = food.originalPrice || 3500;
          const discountPrice = food.discountPrice || food.surplusPrice || 1800;
          const quantityLeft = food.quantityLeft !== undefined ? food.quantityLeft : (food.quantity !== undefined ? food.quantity : 5);
          const pickupWindow = food.pickupTime || food.pickupWindow || '5:00 PM - 8:00 PM';
          const discountPercent = originalPrice > 0 ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100) : 0;

          return (
            <div
              key={food.id}
              className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden flex flex-col justify-between group hover:shadow-md transition"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-gray-100">
                  <img
                    src={food.image}
                    alt={itemTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {discountPercent > 0 && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-md">
                      -{discountPercent}% OFF
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-lg flex items-center gap-1">
                    <IconClock size={12} /> {pickupWindow}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-black tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {food.category || 'Surplus'}
                    </span>
                    <span className="text-xs font-semibold text-gray-500">
                      Stock: <strong className="text-gray-900">{quantityLeft}</strong>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{itemTitle}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{food.description}</p>

                  <div className="pt-2 flex items-baseline gap-2">
                    <span className="text-base font-black text-emerald-600">
                      {formatNaira(discountPrice)}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      {formatNaira(originalPrice)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 flex items-center justify-between gap-2 border-t border-gray-100 mt-2">
                <button
                  onClick={() => navigateBusiness('new-listing', { editId: food.id })}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <IconEdit size={14} /> Edit
                </button>
                <button
                  onClick={() => deleteFood(food.id)}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition cursor-pointer"
                  title="Delete item"
                >
                  <IconTrash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

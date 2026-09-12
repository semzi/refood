import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ListingImageField } from '../../components/common/ListingImageField';
import { IconArrowLeft } from '../../components/common/Icons';

export function BusinessListingForm({ editId, navigateBusiness }) {
  const { foods, addFood, updateFood } = useApp();

  const existingFood = editId ? foods.find((f) => f.id === editId) : null;

  const [title, setTitle] = useState(existingFood?.name || existingFood?.title || '');
  const [description, setDescription] = useState(existingFood?.description || '');
  const [category, setCategory] = useState(existingFood?.category || 'Meals');
  const [originalPrice, setOriginalPrice] = useState(existingFood?.originalPrice || 4500);
  const [discountPrice, setDiscountPrice] = useState(existingFood?.discountPrice || existingFood?.surplusPrice || 2200);
  const [quantityLeft, setQuantityLeft] = useState(existingFood?.quantityLeft !== undefined ? existingFood.quantityLeft : (existingFood?.quantity !== undefined ? existingFood.quantity : 5));
  const [pickupTime, setPickupTime] = useState(existingFood?.pickupTime || existingFood?.pickupWindow || '5:00 PM - 8:30 PM');
  const [image, setImage] = useState(
    existingFood?.image ||
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemData = {
      name: title,
      title,
      description,
      category,
      originalPrice: Number(originalPrice),
      discountPrice: Number(discountPrice),
      surplusPrice: Number(discountPrice),
      quantity: Number(quantityLeft),
      quantityLeft: Number(quantityLeft),
      pickupTime,
      pickupWindow: pickupTime,
      image,
      businessName: 'Mega Kitchen Lekki',
      location: 'Admiralty Way, Lekki Phase 1',
      businessLocation: 'Admiralty Way, Lekki Phase 1',
      rating: 4.8,
      status: 'active',
    };

    if (existingFood) {
      updateFood(existingFood.id, itemData);
    } else {
      addFood(itemData);
    }

    navigateBusiness('listings');
  };

  const discountPercent =
    originalPrice > 0 ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100) : 0;

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn pb-16">
      {/* Back button above */}
      <div>
        <button
          type="button"
          onClick={() => navigateBusiness('listings')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold transition cursor-pointer shadow-2xs"
        >
          <IconArrowLeft size={16} />
          <span>Back</span>
        </button>
      </div>

      {/* Main Title block */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">
          {existingFood ? 'Edit Surplus Meal' : 'Publish Surplus Meal'}
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Make surplus fresh food available to Lagos customers at reduced prices
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        {/* Image Upload/URL Component */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-2">Item Photo</label>
          <ListingImageField value={image} onChange={setImage} />
        </div>

        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">Meal Title</label>
          <input
            type="text"
            required
            placeholder="e.g. Smoky Jollof Rice + Grilled Chicken Combo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
          />
        </div>

        {/* Category & Quantity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium bg-white"
            >
              <option value="Rice & Mains">Rice & Mains</option>
              <option value="Bakery & Pastries">Bakery & Pastries</option>
              <option value="Grills & Suya">Grills & Suya</option>
              <option value="Soups & Swallows">Soups & Swallows</option>
              <option value="Salads & Healthy">Salads & Healthy</option>
              <option value="Mystery Bags">Mystery Bags (Surprise Pack)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Quantity Available</label>
            <input
              type="number"
              min="1"
              max="50"
              required
              value={quantityLeft}
              onChange={(e) => setQuantityLeft(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Original Price (₦)</label>
            <input
              type="number"
              step="100"
              required
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-emerald-800 mb-1.5">Discount Price (₦)</label>
            <input
              type="number"
              step="100"
              required
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-black text-emerald-700"
            />
          </div>

          <div className="flex flex-col justify-center text-center">
            <span className="text-xs text-gray-500 font-medium">Customer Savings</span>
            <span className="text-lg font-black text-emerald-700">{discountPercent}% OFF</span>
          </div>
        </div>

        {/* Pickup / Prep Window */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">Pickup / Delivery Window</label>
          <input
            type="text"
            required
            placeholder="e.g. 5:30 PM - 8:30 PM"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">Description & Contents</label>
          <textarea
            rows={3}
            required
            placeholder="Detail the meal portion, freshness guarantee, dietary notes (e.g., contains pepper, nuts, gluten)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
          />
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigateBusiness('listings')}
            className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl text-xs sm:text-sm transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition active:scale-98 cursor-pointer"
          >
            {existingFood ? 'Save Changes' : 'Publish Listing'}
          </button>
        </div>
      </form>
    </div>
  );
}

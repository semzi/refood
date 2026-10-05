import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { formatNaira, getListingPrice, getListingOriginalPrice } from "../../utils/formatters";
import {
  IconHeart, IconStar, IconStore, IconBike, ICON_SIZE, ICON_SM
} from "../../components/common/Icons";
import { BackButton } from "../../components/common/BackButton";
import { FoodCard } from "../../components/customer/FoodCard";
import { Empty } from "../../components/common/Empty";

export function FoodDetail({ id }) {
  const { listings, businesses, favorites, toggleFavorite, addToCart, navigate, cart } = useApp();
  const listing = listings.find(l => l.id === id);
  const [qty, setQty] = useState(1);
  const [deliveryType, setDeliveryType] = useState("pickup");

  if (!listing) return <Empty text="Listing not found" actionLabel="Browse" onAction={() => navigate("browse")} />;
  const b = businesses.find(x => x.id === listing.businessId) || {
    name: "Partner Kitchen",
    location: "Abuja",
    rating: 4.8,
    reviews: 120,
    category: "Meals"
  };

  const discount = getListingOriginalPrice(listing) > 0 ? Math.round((1 - getListingPrice(listing) / getListingOriginalPrice(listing)) * 100) : 0;
  const fav = favorites.includes(listing.id);
  const inCart = cart.find(c => c.listingId === id);
  const sameKitchen = listings.filter(l => l.businessId === b.id && l.id !== id).slice(0, 4);
  const others = listings.filter(l => l.businessId !== b.id && l.id !== id).slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Back navigation */}
      <div>
        <BackButton label="Back" fallback="browse" />
      </div>

      {/* Clean 2-column Product Card */}
      <div className="bg-white rounded-2xl border border-[#eef3ec] shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left: Product Image */}
        <div className="relative min-h-[300px] sm:min-h-[380px] md:min-h-[440px] bg-[#f7f8f6]">
          <img
            src={listing.image}
            alt={listing.name}
            className="w-full h-full object-cover"
          />
          {discount > 0 && (
            <span className="absolute top-4 left-4 bg-[#0f7a3b] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md">
              {discount}% OFF
            </span>
          )}
          <button
            onClick={() => toggleFavorite(id)}
            title={fav ? "Remove from favourites" : "Save to favourites"}
            className={`absolute top-4 right-4 h-11 pl-3 pr-4 rounded-full shadow-md grid place-items-center transition active:scale-95 border cursor-pointer ${fav ? "bg-red-500 border-red-500 text-white" : "bg-white border-white text-[#0f2815] hover:text-red-500"}`}
            aria-label={fav ? "Remove from favourites" : "Save to favourites"}
          >
            <span className="flex items-center gap-1.5"><IconHeart filled={fav} size={ICON_SIZE} /><span className="text-xs font-extrabold">{fav ? "Saved" : "Save"}</span></span>
          </button>
        </div>

        {/* Right: Product Details & Actions */}
        <div className="flex flex-col p-6 sm:p-8 lg:p-10 justify-between">
          {/* Merchant info link */}
          <div className="flex items-center gap-2 text-xs font-medium text-[#5a6b5a] flex-wrap">
            <button onClick={() => navigate("businessProfile", { id: b.id })} className="text-[#0f7a3b] hover:underline font-semibold cursor-pointer">
              {b.name}
            </button>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#0f2815]">
              <IconStar size={ICON_SM} className="text-[#d4a017]" /> {b.rating} ({b.reviews})
            </span>
            <span>•</span>
            <span>{b.location}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f2815] mt-2 tracking-tight leading-tight">
            {listing.name}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-3 mt-4">
            <span className="text-3xl font-black text-[#0f2815]">
              {formatNaira(getListingPrice(listing))}
            </span>
            <span className="text-base line-through text-[#8aa08a]">
              {formatNaira(getListingOriginalPrice(listing))}
            </span>
            <span className="text-xs font-bold text-[#0f7a3b] bg-[#eef6ec] px-2 py-1 rounded">
              Save {formatNaira(getListingOriginalPrice(listing) - getListingPrice(listing))}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-[#5a6b5a] mt-4 leading-relaxed">
            {listing.description}
          </p>

          {/* Order specifications */}
          <div className="mt-6 pt-5 border-t border-[#eef3ec] space-y-2.5 text-xs text-[#3a4a3a]">
            <div className="flex justify-between py-1 border-b border-[#f7f8f6]">
              <span className="text-[#8aa08a]">Pickup Window</span>
              <span className="font-semibold text-[#0f2815]">{listing.pickupWindow}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#f7f8f6]">
              <span className="text-[#8aa08a]">Location</span>
              <span className="font-semibold text-[#0f2815]">{listing.location}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#f7f8f6]">
              <span className="text-[#8aa08a]">Availability</span>
              <span className="font-semibold text-[#0f7a3b]">{listing.quantity} remaining</span>
            </div>
          </div>

          {/* Delivery/Pickup Option */}
          {listing.delivery && (
            <div className="mt-5 space-y-2">
              <label className="text-xs font-semibold text-[#5a6b5a]">Order Option</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryType("pickup")}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${deliveryType === "pickup" ? "border-[#0f7a3b] bg-[#eef6ec] text-[#0f7a3b]" : "border-[#e2ece2] text-[#5a6b5a] hover:bg-[#f7f8f6]"}`}
                >
                  <IconStore size={ICON_SIZE} /> Self Pickup (Free)
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryType("delivery")}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${deliveryType === "delivery" ? "border-[#0f7a3b] bg-[#eef6ec] text-[#0f7a3b]" : "border-[#e2ece2] text-[#5a6b5a] hover:bg-[#f7f8f6]"}`}
                >
                  <IconBike size={ICON_SIZE} /> Delivery (+₦500)
                </button>
              </div>
            </div>
          )}

          {/* Quantity & Actions */}
          {listing.status !== "sold_out" && listing.quantity > 0 ? (
            <div className="mt-6 pt-5 border-t border-[#eef3ec] space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#d6e2d6] rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-9 h-9 grid place-items-center text-sm font-bold text-[#0f2815] hover:bg-[#f7f8f6] transition cursor-pointer"
                  >−</button>
                  <span className="w-10 text-center text-sm font-bold text-[#0f2815]">{qty}</span>
                  <button
                    onClick={() => setQty(Math.min(listing.quantity, qty + 1))}
                    className="w-9 h-9 grid place-items-center text-sm font-bold text-[#0f2815] hover:bg-[#f7f8f6] transition cursor-pointer"
                  >+</button>
                </div>
                <button
                  onClick={() => { for (let i = 0; i < qty; i++) addToCart(id, 1); }}
                  className="flex-1 bg-[#0f7a3b] hover:bg-[#126a33] text-white py-2.5 px-4 rounded-xl font-bold text-sm shadow-sm transition cursor-pointer"
                >
                  Add to cart • {formatNaira(getListingPrice(listing) * qty)}
                </button>
              </div>

              <button
                onClick={() => { for (let i = 0; i < qty; i++) addToCart(id, 1); navigate("checkout"); }}
                className="w-full bg-[#0f2815] hover:bg-black text-white py-2.5 rounded-xl font-bold text-sm transition cursor-pointer"
              >
                Buy Now
              </button>

              {inCart && (
                <p className="text-xs text-center text-[#0f7a3b] font-medium pt-1">
                  ✓ {inCart.qty} already in your cart • <button onClick={() => navigate("cart")} className="underline font-bold cursor-pointer">View Cart</button>
                </p>
              )}
            </div>
          ) : (
            <div className="mt-6 p-3.5 bg-red-50 text-red-600 rounded-xl text-center font-bold text-xs border border-red-100">
              Sold Out — Check back for the next batch
            </div>
          )}

        </div>
      </div>

      {/* More from this kitchen */}
      {sameKitchen.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#0f2815]">More from {b.name}</h3>
            <button onClick={() => navigate("businessProfile", { id: b.id })} className="text-xs font-bold text-[#0f7a3b] hover:underline cursor-pointer">
              View restaurant →
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {sameKitchen.map(l => <FoodCard key={l.id} listing={l} />)}
          </div>
        </div>
      )}

      {/* Similar deals */}
      {others.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-bold text-base text-[#0f2815]">You might also like</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {others.map(l => <FoodCard key={l.id} listing={l} />)}
          </div>
        </div>
      )}
    </div>
  );
}

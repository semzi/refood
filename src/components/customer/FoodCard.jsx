import { useApp } from "../../context/AppContext";
import { formatNaira } from "../../utils/formatters";
import { IconHeart, IconMapPin, IconTrash2 } from "../common/Icons";

export function FoodCard({ listing }) {
  const { toggleFavorite, favorites, navigate, addToCart, removeFromCart, cart } = useApp();
  const discount = Math.round((1 - listing.surplusPrice / listing.originalPrice) * 100);
  const fav = favorites.includes(listing.id);
  const inCart = cart.some(c => c.listingId === listing.id);
  const soldOut = listing.status === "sold_out" || listing.quantity <= 0;

  return (
    <div className="bg-white rounded-[20px] overflow-hidden border border-[#eef3ec] shadow-[0_1px_6px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] transition flex flex-col p-2">
      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#f7f8f6]">
        <img
          src={listing.image}
          alt={listing.name}
          className="w-full h-full object-cover cursor-pointer hover:scale-102 transition duration-300"
          onClick={() => navigate("foodDetail", { id: listing.id })}
        />
        {discount >= 10 && (
          <span className="absolute top-2 left-2 bg-[#0f7a3b] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow">
            -{discount}%
          </span>
        )}
        {soldOut && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] grid place-items-center">
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-md">Sold out</span>
          </div>
        )}
      </div>
      <div className="px-1.5 pt-1.5 pb-1 flex flex-col flex-1">
        <p className="text-[10px] font-medium text-[#8aa08a] truncate flex items-center gap-1">
          <IconMapPin size={12} className="shrink-0" />{listing.location}
        </p>
        <div className="mt-1 flex items-baseline gap-1.5">
          <p className="font-extrabold text-[16px] text-[#0f2815] whitespace-nowrap">{formatNaira(listing.surplusPrice)}</p>
          <p className="text-[11px] line-through text-[#9ab09a]">{formatNaira(listing.originalPrice)}</p>
        </div>
        <p
          className="mt-0.5 font-semibold sm:font-bold text-[12.5px] leading-snug text-[#0f2815] line-clamp-2 cursor-pointer hover:text-[#0f7a3b] transition"
          onClick={() => navigate("foodDetail", { id: listing.id })}
        >
          {listing.name}
        </p>
        <div className="mt-auto pt-2.5 flex gap-1.5 sm:gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); toggleFavorite(listing.id); }}
            title={fav ? "Remove from favourites" : "Save to favourites"}
            aria-label={fav ? "Remove from favourites" : "Save to favourites"}
            className={`w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full grid place-items-center transition active:scale-90 cursor-pointer ${fav ? "bg-red-500 text-white" : "bg-[#FFA726] text-[#0f2815]"}`}
          >
            <IconHeart filled={fav} size={18} />
          </button>
          {!soldOut ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (inCart) {
                  removeFromCart(listing.id);
                } else {
                  addToCart(listing.id, 1);
                }
              }}
              title={inCart ? "Remove from cart" : "Add to cart"}
              className={`flex-1 min-w-0 h-10 sm:h-11 px-2 rounded-full text-[10px] sm:text-[12.5px] font-extrabold tracking-wide truncate transition active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5 ${inCart ? "bg-red-500 hover:bg-red-600 text-white" : "bg-[#0f2815] hover:bg-black text-white"}`}
            >
              {inCart ? (
                <>
                  <IconTrash2 size={13} />
                  <span>REMOVE</span>
                </>
              ) : (
                "ADD TO CART"
              )}
            </button>
          ) : (
            <div className="flex-1 min-w-0 h-10 sm:h-11 px-2 rounded-full text-[10px] sm:text-[12.5px] font-extrabold bg-[#f7f8f6] text-[#8aa08a] grid place-items-center truncate">
              UNAVAILABLE
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

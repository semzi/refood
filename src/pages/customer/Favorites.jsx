import { useApp } from "../../context/AppContext";
import { FoodCard } from "../../components/customer/FoodCard";
import { Empty } from "../../components/common/Empty";

export function Favorites() {
  const { favorites, listings, navigate } = useApp();
  const favListings = listings.filter(l => favorites.includes(l.id));

  return (
    <div className="space-y-4">
      <h1 className="text-[24px] font-bold tracking-tight text-[#0f2815]">Favourites</h1>
      {favListings.length === 0 ? (
        <Empty text="No saved food yet." actionLabel="Explore surplus food" onAction={() => navigate("browse")} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
          {favListings.map(l => <FoodCard key={l.id} listing={l} />)}
        </div>
      )}
    </div>
  );
}

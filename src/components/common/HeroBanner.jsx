import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";

const BANNERS = ["re%20food.png", "re%20food%20(1).png"].map(f => `/${f}`);

export function HeroBanner() {
  const { navigate } = useApp();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (BANNERS.length < 2) return;
    const t = setInterval(() => setIdx(i => (i + 1) % BANNERS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#e9f2e9] shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
      <button onClick={() => navigate("browse")} aria-label="Browse surplus food" className="block w-full text-left cursor-pointer">
        <div className="grid w-full">
          {BANNERS.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={i === 0 ? "Enjoy good food at a better price" : "Eat well, spend less"}
              loading={i === 0 ? "eager" : "lazy"}
              className={`col-start-1 row-start-1 w-full h-auto transition-opacity duration-1000 ${i === idx ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
      </button>
      {BANNERS.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {BANNERS.map((src, i) => (
            <button
              key={src}
              onClick={() => setIdx(i)}
              aria-label={`Banner ${i + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${i === idx ? "w-6 bg-white shadow" : "w-2 bg-white/60 hover:bg-white/90"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Stat({ label, value }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[#eef3ec]">
      <p className="text-xs font-bold text-[#5a6b5a] uppercase tracking-wide">{label}</p>
      <p className="text-[22px] font-bold tracking-tight mt-1 text-[#0f2815]">{value}</p>
    </div>
  );
}

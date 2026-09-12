export function Empty({ text, actionLabel, onAction }) {
  return (
    <div className="bg-white rounded-2xl p-8 text-center shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[#eef3ec]">
      <p className="text-[#3a4a3a] leading-relaxed font-medium">{text}</p>
      {actionLabel && (
        <button
          onClick={onAction}
          className="mt-4 bg-[#0f7a3b] hover:bg-[#126a33] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm transition cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

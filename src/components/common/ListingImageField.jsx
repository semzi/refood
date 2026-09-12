import { useRef, useState } from "react";
import { IconUpload, ICON_SIZE, ICON_SM } from "./Icons";

export function ListingImageField({ value, onChange }) {
  const fileRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const pickFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <p className="text-[13px] font-bold text-[#0f2815]">Food photo</p>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); pickFile(e.dataTransfer.files?.[0]); }}
        onClick={() => fileRef.current?.click()}
        className={`mt-2 rounded-2xl border-2 border-dashed cursor-pointer overflow-hidden transition ${dragOver ? "border-[#0f7a3b] bg-[#eef6ec]" : "border-[#d4e6d4] bg-[#f7f8f6] hover:border-[#0f7a3b]/50"}`}
      >
        {value ? (
          <div className="relative">
            <img src={value} alt="listing preview" className="w-full h-44 object-cover" />
            <span className="absolute bottom-2 right-2 bg-[#0f2815]/90 text-white text-[11px] font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1.5"><IconUpload size={ICON_SM} /> Change photo</span>
          </div>
        ) : (
          <div className="py-8 px-4 text-center">
            <span className="w-11 h-11 rounded-full bg-white shadow-sm grid place-items-center mx-auto text-[#0f7a3b]"><IconUpload size={ICON_SIZE} /></span>
            <p className="text-[13px] font-bold text-[#0f2815] mt-2">Upload image</p>
            <p className="text-[12px] text-[#5a6b5a] font-medium">Drag & drop or click to browse · PNG/JPG</p>
          </div>
        )}
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => pickFile(e.target.files?.[0])} />
      <div className="mt-2 flex gap-2">
        <input placeholder="…or paste image URL" value={value?.startsWith("data:") ? "" : (value || "")} onChange={e => onChange(e.target.value)} onClick={e => e.stopPropagation()} className="flex-1 bg-[#f7f8f6] rounded-xl px-4 py-2.5 text-[13px] font-medium border border-[#eef3ec] focus:outline-none focus:ring-2 focus:ring-[#0f7a3b]/15" />
        {value && <button type="button" onClick={() => onChange("")} className="text-[12px] font-bold text-red-600 bg-red-50 px-3 rounded-xl cursor-pointer">Clear</button>}
      </div>
    </div>
  );
}

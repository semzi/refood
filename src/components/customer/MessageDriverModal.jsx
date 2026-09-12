import { useState, useEffect, useRef, useMemo } from "react";
import { useApp } from "../../context/AppContext";
import {
  IconStar, IconPhoneCall, IconPhoneOff, IconX, IconSend, IconHeadset, IconBell
} from "../common/Icons";

export function MessageDriverModal({ isOpen = true, order, orderId, driverName = "Musa Ibrahim", onClose }) {
  const { driverMessages, driverTyping, sendDriverMessage, orders } = useApp();
  const [text, setText] = useState("");
  const [calling, setCalling] = useState(false);
  const [callTime, setCallTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const messagesEndRef = useRef(null);

  const activeOrderId = order?.id || orderId || orders?.[0]?.id || "RF842915";

  const defaultMessages = useMemo(() => [
    {
      id: "m_default",
      sender: "driver",
      text: `Hello! 👋 I have received your order #${activeOrderId} and I am on my way with your meal.`,
      time: "Just now",
      timestamp: 0,
    }
  ], [activeOrderId]);

  const messages = driverMessages?.[activeOrderId] || defaultMessages;
  const isTyping = driverTyping?.[activeOrderId] || false;

  const quickReplies = [
    "Where are you now?",
    "Please call when you reach the gate",
    "I am outside waiting",
    "Leave package with security",
  ];

  const handleSend = (msgToSend) => {
    const val = msgToSend || text;
    if (!val || !val.trim()) return;
    sendDriverMessage(activeOrderId, val);
    setText("");
  };

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    let timer;
    if (calling && isOpen) {
      timer = setInterval(() => setCallTime(prev => prev + 1), 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [calling, isOpen]);

  const fmtCallTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? "0" : ""}${sec}`;
  };

  if (isOpen === false) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-[460px] h-[600px] max-h-[92vh] rounded-[24px] shadow-[0_16px_48px_rgba(0,0,0,0.22)] border border-[#eef3ec] flex flex-col overflow-hidden relative animate-scaleUp" onClick={e => e.stopPropagation()}>
        
        {/* Calling Overlay Screen */}
        {calling ? (
          <div className="absolute inset-0 bg-[#0f2815] text-white z-20 flex flex-col items-center justify-between p-8">
            <div className="text-center pt-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8aa08a]">ReFood In-App Secure Call</span>
              <p className="text-[22px] font-extrabold mt-2 text-white">{driverName}</p>
              <p className="text-sm text-emerald-400 font-medium mt-1">
                {callTime > 1 ? `Connected (${fmtCallTime(callTime)})` : "Ringing..."}
              </p>
              <p className="text-xs text-white/60 mt-0.5">+234 802 345 6789 • TVS Dispatch Bike (LAG-482-XA)</p>
            </div>

            <div className="relative my-auto">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-emerald-500 shadow-2xl relative">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" alt={driverName} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -inset-3 rounded-full border-2 border-emerald-400/40 animate-ping pointer-events-none"></div>
            </div>

            <div className="w-full space-y-6">
              <div className="flex justify-center gap-6">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`w-12 h-12 rounded-full grid place-items-center transition cursor-pointer ${isMuted ? "bg-white text-[#0f2815]" : "bg-white/15 text-white hover:bg-white/25"}`}
                >
                  <IconHeadset size={20} />
                </button>
                <button
                  onClick={() => setIsSpeaker(!isSpeaker)}
                  className={`w-12 h-12 rounded-full grid place-items-center transition cursor-pointer ${isSpeaker ? "bg-white text-[#0f2815]" : "bg-white/15 text-white hover:bg-white/25"}`}
                >
                  <IconBell size={20} />
                </button>
              </div>

              <button
                onClick={() => setCalling(false)}
                className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center gap-2 shadow-lg transition active:scale-95 cursor-pointer"
              >
                <IconPhoneOff size={20} /> End Call
              </button>
            </div>
          </div>
        ) : null}

        {/* Modal Header */}
        <div className="p-4 bg-[#f7f8f6] border-b border-[#eef3ec] flex items-center gap-3">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80" alt={driverName} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs" />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#0f7a3b] border-2 border-white rounded-full"></span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="font-extrabold text-[15px] text-[#0f2815] truncate">{driverName}</p>
              <span className="text-[11px] font-bold text-amber-600 inline-flex items-center gap-0.5">
                <IconStar size={12} /> 4.9
              </span>
            </div>
            <p className="text-[11.5px] text-[#5a6b5a] font-medium truncate">TVS Dispatch Bike • LAG-482-XA</p>
            <p className="text-[10.5px] text-[#0f7a3b] font-bold">● Active on delivery for #{activeOrderId}</p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCalling(true)}
              title={`Call ${driverName}`}
              aria-label={`Call ${driverName}`}
              className="w-9 h-9 rounded-full bg-[#0f7a3b] hover:bg-[#126a33] text-white grid place-items-center shadow-xs transition active:scale-95 cursor-pointer"
            >
              <IconPhoneCall size={16} />
            </button>
            <button
              onClick={onClose}
              title="Close chat"
              aria-label="Close chat"
              className="w-9 h-9 rounded-full bg-white hover:bg-[#eef3ec] text-[#5a6b5a] border border-[#eef3ec] grid place-items-center transition cursor-pointer"
            >
              <IconX size={18} />
            </button>
          </div>
        </div>

        {/* Chat Messages List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#ffffff]">
          <div className="text-center my-2">
            <span className="text-[11px] font-bold bg-[#f1f6ef] text-[#5a6b5a] px-3 py-1 rounded-full border border-[#e2ece2]">
              Live Delivery Chat • Order #{activeOrderId}
            </span>
          </div>

          {messages.map((m) => {
            const isUser = m.sender === "user";
            return (
              <div key={m.id} className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed font-medium shadow-xs ${
                    isUser
                      ? "bg-[#0f7a3b] text-white rounded-br-xs"
                      : "bg-[#f1f6ef] text-[#0f2815] border border-[#e2ece2] rounded-bl-xs"
                  }`}
                >
                  <p>{m.text}</p>
                </div>
                <div className="flex items-center gap-1 mt-1 px-1">
                  <span className="text-[10px] text-[#8aa08a] font-medium">{m.time}</span>
                  {isUser && <span className="text-[10px] text-[#0f7a3b] font-bold">✓✓</span>}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2">
              <div className="bg-[#f1f6ef] border border-[#e2ece2] rounded-2xl rounded-bl-xs px-4 py-2 text-[12px] text-[#5a6b5a] font-medium flex items-center gap-1.5 shadow-xs">
                <span className="text-[#0f7a3b] font-bold">{driverName} is typing</span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#0f7a3b] rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-[#0f7a3b] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-[#0f7a3b] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="px-3 pt-2 pb-1 bg-[#f7f8f6] border-t border-[#eef3ec] overflow-x-auto no-scrollbar flex gap-1.5">
          {quickReplies.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="text-[11.5px] font-semibold bg-white hover:bg-[#eef6ec] hover:border-[#0f7a3b]/40 text-[#0f2815] px-3 py-1.5 rounded-full border border-[#d4e6d4] shrink-0 transition active:scale-95 shadow-2xs cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message Input Footer */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="p-3 bg-[#f7f8f6] flex items-center gap-2"
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Message ${driverName} (rider)...`}
            className="flex-1 bg-white border border-[#d4e6d4] rounded-full px-4 py-2.5 text-[13px] text-[#0f2815] placeholder:text-[#8aa08a] font-medium focus:outline-none focus:ring-2 focus:ring-[#0f7a3b]/20"
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="w-10 h-10 rounded-full bg-[#0f7a3b] hover:bg-[#126a33] disabled:opacity-40 text-white grid place-items-center shadow-xs transition shrink-0 active:scale-95 cursor-pointer"
          >
            <IconSend size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}

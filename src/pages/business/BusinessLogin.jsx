import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IconLeaf, ICON_SIZE } from '../../components/common/Icons';

export function BusinessLogin({ onLogin }) {
  const { switchRole } = useApp();
  const [email, setEmail] = useState('mama@kitchen.ng');
  const [pass, setPass] = useState('password');

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    if (onLogin) {
      onLogin();
    } else {
      localStorage.setItem('refood_business_auth', 'true');
      switchRole('business');
      window.location.href = '/business/dashboard';
    }
  };

  const handleBackToCustomer = () => {
    switchRole('customer');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#f7f8f6] grid place-items-center p-6 animate-fadeIn">
      <div className="max-w-[420px] w-full bg-white rounded-[24px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-[#eef3ec]">
        <div className="flex items-center gap-2.5 justify-center">
          <span className="w-9 h-9 bg-[#0f7a3b] rounded-xl grid place-items-center text-white">
            <IconLeaf size={ICON_SIZE} />
          </span>
          <span className="font-bold text-xl text-[#0f2815]">ReFood Business</span>
        </div>
        <h1 className="text-[22px] font-bold text-[#0f2815] text-center mt-6">Business login</h1>
        <p className="text-sm text-[#5a6b5a] text-center mt-2 font-medium">
          List surplus food, manage orders & track sales
        </p>
        <form onSubmit={handleLogin} className="mt-6 space-y-3">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Business email"
            required
            className="w-full bg-[#f7f8f6] rounded-xl px-4 py-3 text-sm font-medium border border-[#eef3ec] focus:outline-none focus:ring-2 focus:ring-[#0f7a3b]/15"
          />
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="Password"
            required
            className="w-full bg-[#f7f8f6] rounded-xl px-4 py-3 text-sm font-medium border border-[#eef3ec] focus:outline-none focus:ring-2 focus:ring-[#0f7a3b]/15"
          />
          <button
            type="submit"
            className="w-full bg-[#0f7a3b] hover:bg-[#126a33] text-white py-3.5 rounded-xl font-bold shadow-sm transition cursor-pointer"
          >
            Login to business portal
          </button>
          <p className="text-xs text-[#8aa08a] text-center font-medium">
            Demo: any email / password works • same listings & orders as customers
          </p>
          <button
            type="button"
            onClick={handleBackToCustomer}
            className="w-full bg-white border border-[#eef3ec] hover:bg-[#f1f6ef] py-3 rounded-xl font-bold text-sm text-[#0f2815] transition cursor-pointer"
          >
            ← Back to customer view
          </button>
        </form>
      </div>
    </div>
  );
}

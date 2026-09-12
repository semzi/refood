import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  IconUser,
  IconMapPin,
  IconCard,
  IconHeart,
  IconShoppingBag,
  IconBell,
  IconShield,
  IconChevronRight,
  IconStore,
  IconLeaf,
  IconCamera,
  IconEdit,
  IconMail,
  IconPhone,
  IconBadgeCheck,
  IconSprout,
  IconGlobe,
  IconHelp,
  IconHeadset,
  IconLogout,
  ICON_SIZE,
  ICON_SM,
} from '../../components/common/Icons';

const rowIcon = 'text-[#0f2815] shrink-0';

function ProfileRow({ icon, title, sub, right, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-[#f7f8f6] transition cursor-pointer"
    >
      <span className={rowIcon}>{icon}</span>
      <span className="flex-1 min-w-0">
        <span className="font-bold text-[14px] text-[#0f2815] block leading-tight">{title}</span>
        {sub && <span className="text-[12.5px] text-[#5a6b5a] font-medium block mt-0.5">{sub}</span>}
      </span>
      {right && <span className="text-[13px] font-semibold text-[#0f2815] shrink-0">{right}</span>}
      <span className="text-[#0f2815] shrink-0">
        <IconChevronRight size={ICON_SIZE} />
      </span>
    </button>
  );
}

function ProfileSection({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[#eef3ec] overflow-hidden">
      <p className="px-5 pt-4 pb-1 font-extrabold text-[16px] text-[#0f2815]">{title}</p>
      <div className="divide-y divide-[#eef3ec]">{children}</div>
    </div>
  );
}

export function Profile() {
  const { user, currentUser, favorites, orders, navigate, switchRole } = useApp();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || currentUser?.name || 'Mercy Sylvester');
  const [email, setEmail] = useState(user?.email || currentUser?.email || 'mercy.sylvester@gmail.com');
  const [phone, setPhone] = useState(user?.phone || currentUser?.phone || '070 1234 5678');
  const [avatar, setAvatar] = useState(user?.avatar || null);
  const avatarRef = useRef(null);

  const pickAvatar = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const r = new FileReader();
    r.onload = () => setAvatar(r.result);
    r.readAsDataURL(file);
  };

  const deliveredCount = orders.filter((o) => o.status === 'delivered' || o.status === 'completed').length;
  const totalSavedMeals = deliveredCount > 0 ? deliveredCount * 2 : 6;
  const co2SavedKg = (totalSavedMeals * 1.8).toFixed(1);

  return (
    <div className="max-w-[720px] mx-auto space-y-4 pb-16 animate-fadeIn">
      {/* Title Header */}
      <div>
        <h1 className="text-[26px] font-extrabold tracking-tight text-[#0f2815]">Profile</h1>
        <p className="text-[13.5px] text-[#5a6b5a] font-medium mt-0.5">Manage your account and preferences.</p>
      </div>

      {/* Identity Card */}
      <div className="bg-[#f4f6f0] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 border border-[#eef3ec]">
        <div className="relative shrink-0 w-fit">
          <img
            src={avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover bg-white ring-4 ring-white shadow-sm"
          />
          <button
            onClick={() => avatarRef.current?.click()}
            aria-label="Change photo"
            className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#eef6ec] border border-[#c8e0c8] grid place-items-center text-[#0f2815] shadow-sm hover:bg-white transition cursor-pointer"
          >
            <IconCamera size={15} />
          </button>
          <input
            ref={avatarRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => pickAvatar(e.target.files?.[0])}
          />
        </div>

        <div className="flex-1 min-w-0">
          {editing ? (
            <div className="space-y-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full bg-white rounded-xl px-3.5 py-2 text-sm font-bold text-[#0f2815] border border-[#eef3ec] focus:outline-none focus:ring-2 focus:ring-[#0f7a3b]/20"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full bg-white rounded-xl px-3.5 py-2 text-sm font-medium text-[#0f2815] border border-[#eef3ec] focus:outline-none focus:ring-2 focus:ring-[#0f7a3b]/20"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full bg-white rounded-xl px-3.5 py-2 text-sm font-medium text-[#0f2815] border border-[#eef3ec] focus:outline-none focus:ring-2 focus:ring-[#0f7a3b]/20"
              />
            </div>
          ) : (
            <>
              <p className="font-extrabold text-[20px] text-[#0f2815] leading-tight flex items-center gap-2 flex-wrap">
                {name}
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0f7a3b] bg-white px-2 py-0.5 rounded-md border border-[#c8e0c8]">
                  Verified <IconBadgeCheck size={14} />
                </span>
              </p>
              <p className="text-[13.5px] text-[#3a4a3a] font-medium mt-2 flex items-center gap-2">
                <IconMail size={16} />
                {email}
              </p>
              <p className="text-[13.5px] text-[#3a4a3a] font-medium mt-1.5 flex items-center gap-2">
                <IconPhone size={16} />
                {phone}
              </p>
            </>
          )}
        </div>

        <button
          onClick={() => setEditing(!editing)}
          className="shrink-0 inline-flex items-center gap-2 border border-[#0f7a3b]/40 text-[#0f7a3b] px-4 py-2.5 rounded-xl text-[13px] font-bold hover:bg-white transition self-start sm:self-center cursor-pointer"
        >
          <IconEdit size={ICON_SM} />
          {editing ? 'Done' : 'Edit profile'}
        </button>
      </div>

      {/* Eco Impact Stats Widget */}
      <div className="grid grid-cols-2 gap-3.5">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eef3ec] shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#eef6ec] text-[#0f7a3b] grid place-items-center font-extrabold shrink-0">
            <IconShoppingBag size={22} />
          </div>
          <div>
            <p className="text-2xl font-black text-[#0f2815] leading-none">{totalSavedMeals}</p>
            <p className="text-xs font-bold text-[#5a6b5a] mt-1.5">Surplus Meals Rescued</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eef3ec] shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#eef6ec] text-[#0f7a3b] grid place-items-center font-extrabold shrink-0">
            <IconLeaf size={22} />
          </div>
          <div>
            <p className="text-2xl font-black text-[#0f2815] leading-none">{co2SavedKg} kg</p>
            <p className="text-xs font-bold text-[#5a6b5a] mt-1.5">CO₂ Emissions Prevented</p>
          </div>
        </div>
      </div>

      {/* Account Section */}
      <ProfileSection title="Account">
        <ProfileRow
          icon={<IconUser size={ICON_SIZE} />}
          title="Personal information"
          sub="Manage your personal details"
          onClick={() => setEditing(true)}
        />
        <ProfileRow
          icon={<IconShoppingBag size={ICON_SIZE} />}
          title="My Orders"
          sub={`${orders.length} active and completed orders`}
          onClick={() => navigate('orders')}
        />
        <ProfileRow
          icon={<IconHeart size={ICON_SIZE} />}
          title="Saved Meals & Places"
          sub={`${favorites.length} saved favorites`}
          onClick={() => navigate('favorites')}
        />
        <ProfileRow
          icon={<IconMapPin size={ICON_SIZE} />}
          title="Saved addresses"
          sub="Manage your delivery addresses"
          onClick={() => navigate('addresses')}
        />
        <ProfileRow
          icon={<IconCard size={ICON_SIZE} />}
          title="Payment methods"
          sub="Add or manage your payment methods"
          onClick={() => navigate('checkout')}
        />
        <ProfileRow
          icon={<IconBell size={ICON_SIZE} />}
          title="Notifications"
          sub="Manage how you receive updates"
          onClick={() => navigate('notifications')}
        />
        <ProfileRow
          icon={<IconShield size={ICON_SIZE} />}
          title="Privacy & security"
          sub="Manage your password and security settings"
        />
      </ProfileSection>

      {/* Preferences Section */}
      <ProfileSection title="Preferences">
        <ProfileRow
          icon={<IconSprout size={ICON_SIZE} />}
          title="Dietary preferences"
          sub="Halal, vegetarian, spice tolerance & allergens"
        />
        <ProfileRow
          icon={<IconGlobe size={ICON_SIZE} />}
          title="Language"
          sub="Choose your preferred language"
          right="English"
        />
      </ProfileSection>

      {/* Support Section */}
      <ProfileSection title="Support">
        <ProfileRow
          icon={<IconHelp size={ICON_SIZE} />}
          title="Help Center"
          sub="FAQs and helpful articles"
        />
        <ProfileRow
          icon={<IconHeadset size={ICON_SIZE} />}
          title="Contact support"
          sub="Chat or email our customer care team"
        />
      </ProfileSection>

      {/* Business Section */}
      <ProfileSection title="Business">
        <ProfileRow
          icon={<IconStore size={ICON_SIZE} />}
          title="Switch to business account"
          sub="List surplus food and reach more people in Lagos"
          onClick={() => {
            switchRole('business');
            window.location.href = '/business';
          }}
        />
      </ProfileSection>

      {/* SDG 12.3 Info Box */}
      <div className="p-5 bg-gradient-to-r from-teal-900 to-emerald-950 rounded-2xl text-white flex items-center gap-4 border border-emerald-800/40 shadow-sm">
        <div className="w-13 h-13 rounded-2xl bg-white/10 p-1.5 flex items-center justify-center shrink-0 border border-white/10">
          <img
            src="/sdg.png"
            alt="UN SDG 12: Responsible Consumption"
            className="w-full h-full object-contain rounded-xl"
          />
        </div>
        <div>
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
            UN SDG 12.3: Responsible Consumption
          </h3>
          <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">
            By rescuing surplus meals on ReFood, you directly prevent food waste and reduce greenhouse gas emissions.
          </p>
        </div>
      </div>

      {/* Log Out Button */}
      <button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
        className="w-full bg-[#fdf3f2] border border-[#f3dede] rounded-2xl px-5 py-4 flex items-center gap-4 hover:bg-[#fbe9e8] transition text-left cursor-pointer"
      >
        <span className="text-[#b3261e]">
          <IconLogout size={ICON_SIZE} />
        </span>
        <span className="flex-1 font-bold text-[14px] text-[#b3261e]">Log out</span>
        <span className="text-[#0f2815]">
          <IconChevronRight size={ICON_SIZE} />
        </span>
      </button>
    </div>
  );
}

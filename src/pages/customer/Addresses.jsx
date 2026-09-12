import React, { useState } from 'react';
import { BackButton } from '../../components/common/BackButton';
import { IconMapPin, IconPlus, IconTrash2, IconHome, IconBriefcase } from '../../components/common/Icons';

export function Addresses() {
  const [addresses, setAddresses] = useState([
    {
      id: 'addr_1',
      title: 'Home (Lekki Phase 1)',
      address: '12 Admiralty Way, Lekki Phase 1, Lagos',
      phone: '+234 802 345 6789',
      isDefault: true,
      tag: 'Home',
    },
    {
      id: 'addr_2',
      title: 'Office (VI)',
      address: 'Plot 1412 Adeola Hopewell St, Victoria Island, Lagos',
      phone: '+234 802 345 6789',
      isDefault: false,
      tag: 'Work',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newPhone, setNewPhone] = useState('+234 802 345 6789');

  const handleSetDefault = (id) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTitle || !newAddress) return;
    const item = {
      id: `addr_${Date.now()}`,
      title: newTitle,
      address: newAddress,
      phone: newPhone,
      isDefault: addresses.length === 0,
      tag: 'Other',
    };
    setAddresses([...addresses, item]);
    setNewTitle('');
    setNewAddress('');
    setShowAddModal(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn pb-16">
      {/* Back button above header */}
      <div>
        <BackButton defaultRoute="profile" />
      </div>

      {/* Main Title & Action block */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Saved Addresses</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage your delivery locations across Lagos</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition cursor-pointer"
        >
          <IconPlus size={16} /> Add Address
        </button>
      </div>

      <div className="space-y-3">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`p-5 rounded-2xl border transition-all ${
              addr.isDefault
                ? 'bg-emerald-50/50 border-emerald-300 ring-1 ring-emerald-300/50 shadow-xs'
                : 'bg-white border-gray-100 hover:border-gray-200 shadow-xs'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    addr.isDefault ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {addr.tag === 'Home' ? (
                    <IconHome size={18} />
                  ) : addr.tag === 'Work' ? (
                    <IconBriefcase size={18} />
                  ) : (
                    <IconMapPin size={18} />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-900">{addr.title}</h3>
                    {addr.isDefault && (
                      <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{addr.address}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Phone: {addr.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!addr.isDefault && (
                  <button
                    onClick={() => handleSetDefault(addr.id)}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-white hover:bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg transition cursor-pointer"
                  >
                    Set Default
                  </button>
                )}
                {addresses.length > 1 && (
                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                    title="Delete address"
                  >
                    <IconTrash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Address Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-scaleUp">
            <h2 className="text-lg font-bold text-gray-900">Add Delivery Address</h2>
            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Label / Title</label>
                <input
                  type="text"
                  placeholder="e.g. Home, Office, Gym"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Street Address</label>
                <textarea
                  rows={2}
                  placeholder="e.g. 15 Adeola Odeku St, Victoria Island"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Contact Phone</label>
                <input
                  type="tel"
                  placeholder="+234..."
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

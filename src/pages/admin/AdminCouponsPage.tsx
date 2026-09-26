import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Plus, Tag, Trash2, CheckCircle, Clock, X } from 'lucide-react';
import { Coupon } from '../../types';
import { ConfirmationModal } from '../../components/admin/ConfirmationModal';

export const AdminCouponsPage: React.FC = () => {
  const { coupons, addCoupon, updateCoupon, deleteCoupon, addToast } = useStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState<Coupon | null>(null);

  // Form states
  const [code, setCode] = useState('');
  const [type, setType] = useState<'percentage' | 'fixed'>('percentage');
  const [value, setValue] = useState(15);
  const [minOrderAmount, setMinOrderAmount] = useState(1499);
  const [maxDiscount, setMaxDiscount] = useState<number | undefined>(750);
  const [expiryDate, setExpiryDate] = useState('2026-12-31');
  const [description, setDescription] = useState('15% off festive orders');

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    addCoupon({
      code: code.trim().toUpperCase(),
      type,
      value: Number(value),
      minOrderAmount: Number(minOrderAmount),
      maxDiscount: type === 'percentage' ? Number(maxDiscount) : undefined,
      expiryDate,
      usageCount: 0,
      active: true,
      description
    });

    setIsAddModalOpen(false);
    setCode('');
    addToast(`Coupon "${code}" created successfully`, 'success');
  };

  const confirmDelete = () => {
    if (couponToDelete) {
      deleteCoupon(couponToDelete.code);
      setCouponToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div>
          <h2 className="font-serif text-2xl font-bold uppercase tracking-wider text-[#111111] dark:text-white">
            Promotional Coupons ({coupons.length})
          </h2>
          <p className="text-xs text-[#666666] dark:text-[#AAAAAA]">
            Create and monitor checkout promo discounts, minimum spends, and expiration dates.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 bg-[#111111] dark:bg-[#B08D57] hover:bg-[#B08D57] text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Coupon</span>
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map(coupon => (
          <div
            key={coupon.code}
            className={`bg-white dark:bg-[#1E1E1E] border p-6 shadow-xs flex flex-col justify-between transition-all ${
              coupon.active ? 'border-[#E5E5E5] dark:border-[#2A2A2A]' : 'border-dashed border-gray-300 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F0F0F0] dark:border-[#2A2A2A]">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#B08D57]" />
                  <span className="font-mono text-base font-bold text-[#111111] dark:text-white tracking-wider">
                    {coupon.code}
                  </span>
                </div>
                
                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase border ${
                  coupon.active 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-gray-100 text-gray-600 border-gray-200'
                }`}>
                  {coupon.active ? 'Active' : 'Disabled'}
                </span>
              </div>

              <div className="py-4 space-y-2 text-xs">
                <div className="text-sm font-bold text-[#111111] dark:text-white">
                  {coupon.type === 'percentage' ? `${coupon.value}% OFF` : `Flat ₹${coupon.value} OFF`}
                </div>
                <p className="text-[#666666] dark:text-[#AAAAAA] leading-relaxed">
                  {coupon.description}
                </p>

                <div className="pt-2 text-[11px] text-[#888888] space-y-1">
                  <div>Min Order: <strong>₹{coupon.minOrderAmount.toLocaleString('en-IN')}</strong></div>
                  {coupon.maxDiscount && (
                    <div>Max Savings: <strong>₹{coupon.maxDiscount}</strong></div>
                  )}
                  <div>Valid Until: <strong>{coupon.expiryDate}</strong></div>
                  <div>Used: <strong>{coupon.usageCount} times</strong></div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F0F0F0] dark:border-[#2A2A2A] flex items-center justify-between text-xs">
              <button
                onClick={() => updateCoupon(coupon.code, { active: !coupon.active })}
                className="font-semibold text-[#111111] dark:text-white hover:text-[#B08D57] underline"
              >
                {coupon.active ? 'Disable Coupon' : 'Enable Coupon'}
              </button>

              <button
                onClick={() => setCouponToDelete(coupon)}
                className="p-1 text-red-600 hover:text-red-800"
                title="Delete coupon"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Add Coupon Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#333333] shadow-2xl p-6">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-[#888888] hover:text-[#111111]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-[#111111] dark:text-white mb-4">
              Create Promotional Coupon
            </h3>

            <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
              <div>
                <label className="font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. FESTIVE25"
                  className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] font-mono font-bold text-[#111111] dark:text-white outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
                    Discount Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Flat (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
                    Discount Value *
                  </label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none font-bold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
                    Min Order Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={minOrderAmount}
                    onChange={(e) => setMinOrderAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
                    Max Discount (₹)
                  </label>
                  <input
                    type="number"
                    value={maxDiscount || ''}
                    onChange={(e) => setMaxDiscount(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="Optional"
                    className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
                  Coupon Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. 15% off festive sarees and kurtas"
                  className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
                />
              </div>

              <div className="pt-4 border-t border-[#E5E5E5] dark:border-[#333333] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-[#E5E5E5] dark:border-[#383838] uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#111111] dark:bg-[#B08D57] text-white font-bold uppercase"
                >
                  Create Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmationModal
        isOpen={!!couponToDelete}
        title="Delete Promo Coupon"
        message={`Are you sure you want to delete coupon "${couponToDelete?.code}"? Customers will no longer be able to apply it at checkout.`}
        confirmText="Delete Coupon"
        onConfirm={confirmDelete}
        onCancel={() => setCouponToDelete(null)}
      />

    </div>
  );
};

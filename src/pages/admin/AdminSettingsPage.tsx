import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Settings, Save, Store, Truck, IndianRupee, Mail, Phone, MapPin } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { settings, updateSettings, addToast } = useStore();

  const [storeName, setStoreName] = useState(settings.storeName);
  const [storeEmail, setStoreEmail] = useState(settings.storeEmail);
  const [storePhone, setStorePhone] = useState(settings.storePhone);
  const [storeAddress, setStoreAddress] = useState(settings.storeAddress);
  const [currency, setCurrency] = useState(settings.currency);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(settings.freeShippingThreshold);
  const [standardShippingFee, setStandardShippingFee] = useState(settings.standardShippingFee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      storeName,
      storeEmail,
      storePhone,
      storeAddress,
      currency,
      freeShippingThreshold: Number(freeShippingThreshold),
      standardShippingFee: Number(standardShippingFee)
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <h2 className="font-serif text-2xl font-bold uppercase tracking-wider text-[#111111] dark:text-white">
          Store Configuration & Commerce Rules
        </h2>
        <p className="text-xs text-[#666666] dark:text-[#AAAAAA]">
          Configure general store attributes, free shipping thresholds, and notification contacts.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Store Profile */}
        <div className="bg-white dark:bg-[#1E1E1E] p-6 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B08D57]">
            <Store className="w-4 h-4" />
            <span>General Store Details</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
                Store Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
                required
              />
            </div>

            <div>
              <label className="font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
                Support Concierge Email
              </label>
              <input
                type="email"
                value={storeEmail}
                onChange={(e) => setStoreEmail(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
                required
              />
            </div>

            <div>
              <label className="font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
                Customer Support Helpline
              </label>
              <input
                type="text"
                value={storePhone}
                onChange={(e) => setStorePhone(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
                required
              />
            </div>

            <div>
              <label className="font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
                Store Currency
              </label>
              <input
                type="text"
                value={currency}
                disabled
                className="w-full px-3 py-2 bg-[#EEEEEE] dark:bg-[#333333] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white font-mono opacity-80"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
                Physical Headquarters Address
              </label>
              <input
                type="text"
                value={storeAddress}
                onChange={(e) => setStoreAddress(e.target.value)}
                className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
              />
            </div>
          </div>
        </div>

        {/* Shipping & Delivery Thresholds */}
        <div className="bg-white dark:bg-[#1E1E1E] p-6 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B08D57]">
            <Truck className="w-4 h-4" />
            <span>Shipping & Order Calculation Rules</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
                Free Domestic Shipping Threshold (₹)
              </label>
              <input
                type="number"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none font-bold"
                required
              />
              <span className="text-[11px] text-[#888888] mt-1 block">
                Orders with bag subtotal above this qualify for ₹0 shipping.
              </span>
            </div>

            <div>
              <label className="font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
                Standard Shipping Fee (₹)
              </label>
              <input
                type="number"
                value={standardShippingFee}
                onChange={(e) => setStandardShippingFee(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none font-bold"
                required
              />
              <span className="text-[11px] text-[#888888] mt-1 block">
                Charged when order subtotal is below the free shipping tier.
              </span>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-8 py-3 bg-[#111111] dark:bg-[#B08D57] hover:bg-[#B08D57] text-white text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Configuration</span>
          </button>
        </div>

      </form>

    </div>
  );
};

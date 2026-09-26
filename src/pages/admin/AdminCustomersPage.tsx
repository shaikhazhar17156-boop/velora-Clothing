import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, Users, Mail, Phone, ShoppingBag, Eye, X } from 'lucide-react';
import { Customer } from '../../types';

export const AdminCustomersPage: React.FC = () => {
  const { customers, orders } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(c => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.includes(q)
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div>
          <h2 className="font-serif text-2xl font-bold uppercase tracking-wider text-[#111111] dark:text-white">
            Customer Directory ({customers.length})
          </h2>
          <p className="text-xs text-[#666666] dark:text-[#AAAAAA]">
            Review customer lifetime spend, registered addresses, and purchase history.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-[#1E1E1E] p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, email, phone..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] outline-none text-[#111111] dark:text-white"
          />
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F7F7F7] dark:bg-[#252525] text-[#888888] uppercase tracking-wider text-[10px]">
                <th className="p-3">Customer</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Total Orders</th>
                <th className="p-3">Lifetime Spend</th>
                <th className="p-3">Joined Date</th>
                <th className="p-3">Account Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0F0] dark:divide-[#2A2A2A]">
              {filteredCustomers.map(customer => (
                <tr key={customer.id} className="hover:bg-[#FAFAFA] dark:hover:bg-[#242424] transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-xs">
                        {customer.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-[#111111] dark:text-white">
                        {customer.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 text-[#555555] dark:text-[#CCCCCC]">
                    <div>{customer.email}</div>
                    <div className="text-[10px] text-[#888888]">{customer.phone}</div>
                  </td>
                  <td className="p-3 font-semibold text-[#111111] dark:text-white">
                    {customer.ordersCount} orders
                  </td>
                  <td className="p-3 font-serif font-bold text-[#111111] dark:text-white">
                    ₹{customer.totalSpent.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3 text-[#888888]">
                    {customer.registeredDate}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {customer.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      className="px-3 py-1 bg-[#F7F7F7] dark:bg-[#2A2A2A] border border-[#E5E5E5] dark:border-[#383838] hover:border-[#B08D57] text-xs font-semibold"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Profile Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#333333] shadow-2xl p-6 sm:p-8">
            <button
              onClick={() => setSelectedCustomer(null)}
              className="absolute top-4 right-4 text-[#888888] hover:text-[#111111]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pb-4 border-b border-[#E5E5E5] dark:border-[#333333]">
              <div className="w-12 h-12 rounded-full bg-[#111111] text-white flex items-center justify-center font-serif text-lg font-bold">
                {selectedCustomer.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#111111] dark:text-white">
                  {selectedCustomer.name}
                </h3>
                <p className="text-xs text-[#666666]">{selectedCustomer.email} &bull; {selectedCustomer.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-b border-[#E5E5E5] dark:border-[#333333] text-xs">
              <div className="p-3 bg-[#F7F7F7] dark:bg-[#252525]">
                <span className="text-[#888888] uppercase block text-[10px]">Total Orders</span>
                <strong className="text-sm font-bold text-[#111111] dark:text-white">{selectedCustomer.ordersCount}</strong>
              </div>
              <div className="p-3 bg-[#F7F7F7] dark:bg-[#252525]">
                <span className="text-[#888888] uppercase block text-[10px]">Total Spend</span>
                <strong className="text-sm font-serif font-bold text-[#111111] dark:text-white">₹{selectedCustomer.totalSpent.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            {/* Address */}
            <div className="pt-4 text-xs space-y-2">
              <h4 className="font-bold uppercase tracking-wider text-[#111111] dark:text-white">
                Registered Addresses
              </h4>
              {selectedCustomer.addresses.map(a => (
                <div key={a.id} className="p-3 border border-[#E5E5E5] dark:border-[#333333] bg-[#FAFAFA] dark:bg-[#252525]">
                  <strong className="block text-[11px] uppercase">{a.name}</strong>
                  <p className="text-[#666666] dark:text-[#AAAAAA]">{a.street}, {a.city}, {a.state} - {a.pincode}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#E5E5E5] dark:border-[#333333] flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2 bg-[#111111] text-white text-xs font-bold uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

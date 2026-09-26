import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useStore } from '../../context/StoreContext';
import { ShieldCheck, User, Lock, Save, KeyRound } from 'lucide-react';
import { AdminRole } from '../../types';

export const AdminProfilePage: React.FC = () => {
  const { admin, updateAdminProfile } = useAdminAuth();
  const { addToast } = useStore();

  const [name, setName] = useState(admin?.name || '');
  const [email, setEmail] = useState(admin?.email || '');
  const [phone, setPhone] = useState(admin?.phone || '');
  const [role, setRole] = useState<AdminRole>(admin?.role || 'SUPER ADMIN');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminProfile({ name, email, phone, role });
    addToast('Admin profile updated', 'success');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      addToast('New passwords do not match', 'error');
      return;
    }
    addToast('Security credentials updated successfully', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      
      {/* Header */}
      <div className="pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <h2 className="font-serif text-2xl font-bold uppercase tracking-wider text-[#111111] dark:text-white">
          Administrator Profile & Security
        </h2>
        <p className="text-xs text-[#666666] dark:text-[#AAAAAA]">
          Manage account access, contact details, and role-based operational permissions.
        </p>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleUpdateProfile} className="bg-white dark:bg-[#1E1E1E] p-6 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#B08D57]">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
              Assigned Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as AdminRole)}
              className="w-full px-3 py-2 text-xs bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none font-bold"
            >
              <option value="SUPER ADMIN">Super Admin (Full Access)</option>
              <option value="PRODUCT MANAGER">Product Manager (Catalog & Inventory)</option>
              <option value="ORDER MANAGER">Order Manager (Orders & Fulfillment)</option>
              <option value="CONTENT MANAGER">Content Manager (Banners & Reviews)</option>
              <option value="CUSTOMER SUPPORT">Customer Support (Orders & Reviews)</option>
            </select>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#111111] dark:bg-[#B08D57] text-white text-xs font-bold uppercase tracking-wider"
          >
            Update Profile
          </button>
        </div>
      </form>

      {/* Role Permissions Matrix Overview */}
      <div className="bg-white dark:bg-[#1E1E1E] p-6 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B08D57]">
          <ShieldCheck className="w-4 h-4" />
          <span>Role Permissions Matrix</span>
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F7F7] dark:bg-[#252525] text-[#888888] uppercase text-[10px]">
                <th className="p-2.5">Role</th>
                <th className="p-2.5">Products</th>
                <th className="p-2.5">Orders</th>
                <th className="p-2.5">Inventory</th>
                <th className="p-2.5">Coupons</th>
                <th className="p-2.5">Settings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0F0] dark:divide-[#2A2A2A] text-[#555555] dark:text-[#CCCCCC]">
              <tr>
                <td className="p-2.5 font-bold text-[#111111] dark:text-white">SUPER ADMIN</td>
                <td className="p-2.5 text-emerald-600 font-bold">✓ Full</td>
                <td className="p-2.5 text-emerald-600 font-bold">✓ Full</td>
                <td className="p-2.5 text-emerald-600 font-bold">✓ Full</td>
                <td className="p-2.5 text-emerald-600 font-bold">✓ Full</td>
                <td className="p-2.5 text-emerald-600 font-bold">✓ Full</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-[#111111] dark:text-white">PRODUCT MANAGER</td>
                <td className="p-2.5 text-emerald-600 font-bold">✓ Full</td>
                <td className="p-2.5 text-gray-400">Read only</td>
                <td className="p-2.5 text-emerald-600 font-bold">✓ Full</td>
                <td className="p-2.5 text-gray-400">Read only</td>
                <td className="p-2.5 text-rose-500 font-bold">✗</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-[#111111] dark:text-white">ORDER MANAGER</td>
                <td className="p-2.5 text-gray-400">Read only</td>
                <td className="p-2.5 text-emerald-600 font-bold">✓ Full</td>
                <td className="p-2.5 text-emerald-600 font-bold">✓ Full</td>
                <td className="p-2.5 text-gray-400">Read only</td>
                <td className="p-2.5 text-rose-500 font-bold">✗</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Change Password Form */}
      <form onSubmit={handleUpdatePassword} className="bg-white dark:bg-[#1E1E1E] p-6 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#B08D57]">
          Change Security Credentials
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 text-xs bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 text-xs bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 text-xs bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#111111] dark:bg-[#B08D57] text-white text-xs font-bold uppercase tracking-wider"
          >
            Change Password
          </button>
        </div>
      </form>

    </div>
  );
};

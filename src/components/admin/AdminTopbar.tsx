import React, { useState } from 'react';
import { useRouter } from '../../context/NavigationContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useStore } from '../../context/StoreContext';
import { 
  Menu, 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  User, 
  Settings, 
  LogOut, 
  Check, 
  X,
  ExternalLink
} from 'lucide-react';

interface AdminTopbarProps {
  onOpenMobileMenu: () => void;
  pageTitle: string;
}

export const AdminTopbar: React.FC<AdminTopbarProps> = ({ onOpenMobileMenu, pageTitle }) => {
  const { navigate } = useRouter();
  const { theme, toggleTheme, admin, logout } = useAdminAuth();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useStore();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/admin/products?search=${encodeURIComponent(searchQuery)}`);
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-20 bg-white dark:bg-[#1A1A1A] border-b border-[#E5E5E5] dark:border-[#262626] px-4 sm:px-6 py-3 transition-colors">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left: Mobile hamburger & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-[#111111] dark:text-white hover:text-[#B08D57]"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="font-serif text-lg sm:text-xl font-bold uppercase tracking-wider text-[#111111] dark:text-white">
              {pageTitle}
            </h1>
          </div>
        </div>

        {/* Right: Search, Theme, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Admin Global Search */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
            <Search className="w-4 h-4 text-[#888888] absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, orders, SKU..."
              className="w-48 xl:w-64 pl-9 pr-3 py-1.5 text-xs bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white rounded-none outline-none focus:border-[#B08D57]"
            />
          </form>

          {/* Theme Toggle (Light / Dark) */}
          <button
            onClick={toggleTheme}
            className="p-2 text-[#555555] dark:text-[#CCCCCC] hover:text-[#111111] dark:hover:text-white border border-[#E5E5E5] dark:border-[#333333] transition-colors"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Notifications Popover */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 text-[#555555] dark:text-[#CCCCCC] hover:text-[#111111] dark:hover:text-white border border-[#E5E5E5] dark:border-[#333333] transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#333333] shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="p-3 border-b border-[#E5E5E5] dark:border-[#333333] flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-white">
                    Notifications ({notifications.length})
                  </span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-[10px] text-[#B08D57] hover:underline font-semibold"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-[#F0F0F0] dark:divide-[#2A2A2A]">
                  {notifications.map(notif => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        markNotificationAsRead(notif.id);
                        if (notif.link) {
                          navigate(notif.link);
                          setIsNotifOpen(false);
                        }
                      }}
                      className={`p-3 text-xs cursor-pointer hover:bg-[#F9F9F9] dark:hover:bg-[#252525] transition-colors ${
                        !notif.read ? 'bg-[#F9F5EE]/50 dark:bg-[#B08D57]/10' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-xs font-semibold text-[#111111] dark:text-white">{notif.title}</strong>
                        <span className="text-[10px] text-[#888888]">{notif.date}</span>
                      </div>
                      <p className="text-[11px] text-[#666666] dark:text-[#AAAAAA] mt-1 line-clamp-2">
                        {notif.message}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-2 border-t border-[#E5E5E5] dark:border-[#333333] text-center">
                  <button
                    onClick={() => {
                      navigate('/admin/notifications');
                      setIsNotifOpen(false);
                    }}
                    className="text-[11px] font-bold text-[#B08D57] hover:underline uppercase"
                  >
                    View All Activity &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1.5 border border-[#E5E5E5] dark:border-[#333333] hover:border-gray-400 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-[#111111] dark:bg-[#B08D57] text-white flex items-center justify-center text-[10px] font-bold">
                {admin?.name?.charAt(0) || 'A'}
              </div>
              <span className="hidden sm:inline text-xs font-semibold text-[#111111] dark:text-white">
                {admin?.name?.split(' ')[0] || 'Admin'}
              </span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#333333] shadow-xl z-50 text-xs py-1 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2 border-b border-[#E5E5E5] dark:border-[#333333]">
                  <p className="font-bold text-[#111111] dark:text-white truncate">{admin?.name}</p>
                  <p className="text-[10px] text-[#888888] truncate">{admin?.email}</p>
                </div>

                <button
                  onClick={() => {
                    navigate('/admin/profile');
                    setIsProfileOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-[#555555] dark:text-[#CCCCCC] hover:bg-[#F7F7F7] dark:hover:bg-[#252525] flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>My Profile</span>
                </button>

                <button
                  onClick={() => {
                    navigate('/admin/settings');
                    setIsProfileOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-[#555555] dark:text-[#CCCCCC] hover:bg-[#F7F7F7] dark:hover:bg-[#252525] flex items-center gap-2"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Store Settings</span>
                </button>

                <div className="border-t border-[#E5E5E5] dark:border-[#333333] my-1" />

                <button
                  onClick={() => {
                    logout();
                    setIsProfileOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};

import React from 'react';
import { useRouter } from '../../context/NavigationContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useStore } from '../../context/StoreContext';
import { 
  LayoutDashboard, 
  Shirt, 
  Layers, 
  ShoppingBag, 
  Users, 
  Boxes, 
  Tag, 
  Star, 
  Image as ImageIcon, 
  BarChart3, 
  Settings, 
  UserCircle, 
  LogOut, 
  X,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface AdminSidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { currentPath, navigate } = useRouter();
  const { logout, admin } = useAdminAuth();
  const { orders, products } = useStore();

  const pendingOrdersCount = orders.filter(o => o.status === 'Pending' || o.status === 'Confirmed').length;
  const lowStockCount = products.filter(p => p.stock <= 20).length;

  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Products', path: '/admin/products', icon: Shirt },
    { label: 'Categories', path: '/admin/categories', icon: Layers },
    { label: 'Orders', path: '/admin/orders', icon: ShoppingBag, badge: pendingOrdersCount, badgeColor: 'bg-amber-500' },
    { label: 'Customers', path: '/admin/customers', icon: Users },
    { label: 'Inventory', path: '/admin/inventory', icon: Boxes, badge: lowStockCount, badgeColor: 'bg-rose-500' },
    { label: 'Coupons', path: '/admin/coupons', icon: Tag },
    { label: 'Reviews', path: '/admin/reviews', icon: Star },
    { label: 'Banners', path: '/admin/banners', icon: ImageIcon },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
    { label: 'Admin Profile', path: '/admin/profile', icon: UserCircle },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    onCloseMobile();
  };

  const content = (
    <div className="h-full flex flex-col justify-between bg-white dark:bg-[#141414] border-r border-[#E5E5E5] dark:border-[#262626]">
      
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-[#E5E5E5] dark:border-[#262626] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#111111] dark:bg-[#B08D57] text-white flex items-center justify-center font-serif font-bold text-sm">
              V
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-widest text-[#111111] dark:text-white uppercase block">
                VELORA
              </span>
              <span className="text-[10px] tracking-wider text-[#B08D57] uppercase font-bold">
                Management Studio
              </span>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 text-[#666666] hover:text-[#111111] dark:text-[#AAAAAA] dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-210px)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path || (item.path !== '/admin/dashboard' && currentPath.startsWith(item.path));

            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold rounded-none transition-colors ${
                  isActive
                    ? 'bg-[#111111] text-white dark:bg-[#B08D57] dark:text-white shadow-xs'
                    : 'text-[#555555] dark:text-[#AAAAAA] hover:bg-[#F7F7F7] dark:hover:bg-[#202020] hover:text-[#111111] dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-1.5 py-0.2 text-[10px] font-bold text-white rounded-full ${item.badgeColor || 'bg-[#B08D57]'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer User Info & Exit */}
      <div className="p-4 border-t border-[#E5E5E5] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#1A1A1A] space-y-3">
        
        {/* View Customer Website button */}
        <button
          onClick={() => navigate('/')}
          className="w-full py-2 px-3 bg-white dark:bg-[#242424] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:border-[#B08D57] transition-colors"
        >
          <span>View Customer Store</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#B08D57]" />
        </button>

        {/* User Card & Logout */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center text-xs font-bold font-serif">
              {admin?.name?.charAt(0) || 'A'}
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-[#111111] dark:text-white block truncate max-w-[110px]">
                {admin?.name || 'Administrator'}
              </span>
              <span className="text-[10px] text-[#B08D57] uppercase font-bold block truncate max-w-[110px]">
                {admin?.role || 'Super Admin'}
              </span>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-1.5 text-[#666666] hover:text-red-600 dark:text-[#AAAAAA] dark:hover:text-red-400"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 shrink-0 z-30">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onCloseMobile} />
          <div className="relative w-4/5 max-w-xs h-full z-10 animate-in slide-in-from-left duration-300">
            {content}
          </div>
        </div>
      )}
    </>
  );
};

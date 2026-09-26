import React from 'react';
import { useRouter } from '../../context/NavigationContext';
import { useStore } from '../../context/StoreContext';
import { Home, Grid, Search, Heart, ShoppingBag } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const { cartCount, wishlist, setIsSearchOpen } = useStore();

  // Hide on admin routes
  if (currentPath.startsWith('/admin')) {
    return null;
  }

  const items = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Shop', path: '/men', icon: Grid },
    { label: 'Search', action: () => setIsSearchOpen(true), icon: Search },
    { label: 'Wishlist', path: '/wishlist', icon: Heart, count: wishlist.length },
    { label: 'Bag', path: '/cart', icon: ShoppingBag, count: cartCount },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5E5E5] px-2 py-1.5 shadow-lg">
      <div className="grid grid-cols-5 items-center justify-around">
        {items.map((item, idx) => {
          const Icon = item.icon;
          const isActive = item.path ? currentPath === item.path : false;

          return (
            <button
              key={idx}
              onClick={() => {
                if (item.action) item.action();
                else if (item.path) navigate(item.path);
              }}
              className={`flex flex-col items-center justify-center py-1 transition-colors relative ${
                isActive ? 'text-[#B08D57]' : 'text-[#666666] hover:text-[#111111]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 stroke-[1.6] ${isActive ? 'text-[#B08D57]' : ''}`} />
                {item.count !== undefined && item.count > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#111111] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {item.count}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'font-semibold text-[#B08D57]' : 'font-normal'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

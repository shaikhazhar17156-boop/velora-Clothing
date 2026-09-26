import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter } from '../../context/NavigationContext';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  Phone
} from 'lucide-react';
import { MobileDrawer } from './MobileDrawer';

export const Header: React.FC = () => {
  const { cartCount, wishlist, setIsSearchOpen } = useStore();
  const { navigate, currentPath } = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'MEN', path: '/men' },
    { label: 'WOMEN', path: '/women' },
    { label: 'KIDS', path: '/kids' },
    { label: 'NEW ARRIVALS', path: '/new-arrivals' },
    { label: 'SALE', path: '/sale', highlight: true },
  ];

  const wishlistCount = wishlist.length;

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white transition-shadow duration-300">
        {/* Top Announcement Bar */}
        <div className="bg-[#111111] text-[#FFFFFF] text-[11px] md:text-xs py-2 px-4 sm:px-6 lg:px-8 tracking-widest uppercase font-medium flex items-center justify-between">
          <span className="hidden md:inline-block text-[10px] text-[#888888]">PAN-INDIA COMPLIMENTARY SHIPPING</span>
          <span className="mx-auto md:mx-0">FREE SHIPPING ON ORDERS ABOVE ₹999 | EASY 7-DAY RETURNS</span>
          <button 
            onClick={() => navigate('/contact')}
            className="hidden md:inline-flex items-center gap-1.5 text-[10px] text-[#B08D57] hover:text-white uppercase tracking-wider font-semibold transition-colors"
          >
            <Phone className="w-3 h-3" />
            <span>Contact & Concierge</span>
          </button>
        </div>

        {/* Main Desktop & Mobile Header */}
        <div 
          className={`border-b border-[#E5E5E5] transition-all duration-200 ${
            isScrolled ? 'py-3 shadow-xs' : 'py-4.5'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            
            {/* Mobile Left: Hamburger */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-1.5 -ml-1.5 text-[#111111] hover:text-[#B08D57] transition-colors focus:outline-none"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="group flex flex-col items-center sm:items-start text-left focus:outline-none"
              >
                <span className="font-serif text-2xl sm:text-3xl md:text-3.5xl font-semibold tracking-[0.22em] text-[#111111] group-hover:text-[#B08D57] transition-colors uppercase">
                  VELORA
                </span>
                <span className="text-[9px] tracking-[0.35em] text-[#666666] uppercase -mt-1 hidden sm:block">
                  Atelier &bull; Clothing
                </span>
              </button>
            </div>

            {/* Desktop Center Navigation */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className={`text-xs xl:text-[13px] tracking-[0.16em] uppercase font-medium transition-all py-1 relative ${
                      link.highlight 
                        ? 'text-red-700 hover:text-red-800 font-semibold' 
                        : isActive 
                        ? 'text-[#B08D57] font-semibold' 
                        : 'text-[#111111] hover:text-[#B08D57]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B08D57]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-4 md:gap-5">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#111111] hover:text-[#B08D57] transition-colors focus:outline-none"
                aria-label="Search clothing"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>

              {/* Account Dropdown */}
              <button
                onClick={() => navigate('/account')}
                className="hidden sm:inline-flex p-2 text-[#111111] hover:text-[#B08D57] transition-colors focus:outline-none"
                aria-label="My Account"
                title="Account"
              >
                <User className="w-5 h-5 stroke-[1.5]" />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => navigate('/wishlist')}
                className="relative p-2 text-[#111111] hover:text-[#B08D57] transition-colors focus:outline-none"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[1.5]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#B08D57] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag / Cart */}
              <button
                onClick={() => navigate('/cart')}
                className="relative p-2 text-[#111111] hover:text-[#B08D57] transition-colors focus:outline-none"
                aria-label="Shopping Bag"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#111111] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileDrawer 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
};

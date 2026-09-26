import React, { useState } from 'react';
import { useRouter } from '../../context/NavigationContext';
import { 
  X, 
  ChevronDown, 
  ChevronUp, 
  User, 
  Heart, 
  Package, 
  Phone, 
  ArrowRight 
} from 'lucide-react';
import { departmentCategories } from '../../data/initialData';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const { navigate } = useRouter();
  const [expandedSection, setExpandedSection] = useState<string | null>('men');

  if (!isOpen) return null;

  const toggleSection = (section: string) => {
    setExpandedSection(prev => (prev === section ? null : section));
  };

  const handleLinkClick = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out Drawer Panel */}
      <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl z-10 flex flex-col overflow-hidden animate-in slide-in-from-left duration-300">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-[#E5E5E5] flex items-center justify-between bg-[#F7F7F7]">
          <div>
            <span className="font-serif text-2xl font-bold tracking-[0.2em] text-[#111111] uppercase">
              VELORA
            </span>
            <p className="text-[10px] tracking-wider text-[#666666] uppercase">Exclusive Clothing</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#111111] hover:text-[#B08D57] transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Nav Items */}
        <div className="flex-1 overflow-y-auto py-2">
          
          {/* Main Department Accordions */}
          <div className="divide-y divide-[#E5E5E5]">
            
            {/* MEN */}
            <div className="py-2">
              <button
                onClick={() => toggleSection('men')}
                className="w-full px-5 py-2.5 flex items-center justify-between text-left text-sm font-semibold tracking-wider text-[#111111] uppercase hover:text-[#B08D57]"
              >
                <span>MEN</span>
                {expandedSection === 'men' ? <ChevronUp className="w-4 h-4 text-[#B08D57]" /> : <ChevronDown className="w-4 h-4 text-[#666666]" />}
              </button>
              {expandedSection === 'men' && (
                <div className="px-5 py-2 bg-[#F7F7F7]/60 flex flex-col gap-2">
                  <button
                    onClick={() => handleLinkClick('/men')}
                    className="text-left text-xs font-semibold text-[#B08D57] py-1 flex items-center gap-1.5"
                  >
                    <span>View All Men's Clothing</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#E5E5E5]/60 text-xs text-[#666666]">
                    {departmentCategories.men.map(cat => (
                      <button
                        key={cat.name}
                        onClick={() => handleLinkClick(`/men?category=${encodeURIComponent(cat.name)}`)}
                        className="text-left py-1 hover:text-[#111111] transition-colors"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* WOMEN */}
            <div className="py-2">
              <button
                onClick={() => toggleSection('women')}
                className="w-full px-5 py-2.5 flex items-center justify-between text-left text-sm font-semibold tracking-wider text-[#111111] uppercase hover:text-[#B08D57]"
              >
                <span>WOMEN</span>
                {expandedSection === 'women' ? <ChevronUp className="w-4 h-4 text-[#B08D57]" /> : <ChevronDown className="w-4 h-4 text-[#666666]" />}
              </button>
              {expandedSection === 'women' && (
                <div className="px-5 py-2 bg-[#F7F7F7]/60 flex flex-col gap-2">
                  <button
                    onClick={() => handleLinkClick('/women')}
                    className="text-left text-xs font-semibold text-[#B08D57] py-1 flex items-center gap-1.5"
                  >
                    <span>View All Women's Clothing</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#E5E5E5]/60 text-xs text-[#666666]">
                    {departmentCategories.women.map(cat => (
                      <button
                        key={cat.name}
                        onClick={() => handleLinkClick(`/women?category=${encodeURIComponent(cat.name)}`)}
                        className="text-left py-1 hover:text-[#111111] transition-colors"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* KIDS */}
            <div className="py-2">
              <button
                onClick={() => toggleSection('kids')}
                className="w-full px-5 py-2.5 flex items-center justify-between text-left text-sm font-semibold tracking-wider text-[#111111] uppercase hover:text-[#B08D57]"
              >
                <span>KIDS</span>
                {expandedSection === 'kids' ? <ChevronUp className="w-4 h-4 text-[#B08D57]" /> : <ChevronDown className="w-4 h-4 text-[#666666]" />}
              </button>
              {expandedSection === 'kids' && (
                <div className="px-5 py-2 bg-[#F7F7F7]/60 flex flex-col gap-2">
                  <button
                    onClick={() => handleLinkClick('/kids')}
                    className="text-left text-xs font-semibold text-[#B08D57] py-1 flex items-center gap-1.5"
                  >
                    <span>View All Kids' Clothing</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#E5E5E5]/60 text-xs text-[#666666]">
                    {departmentCategories.kids.map(cat => (
                      <button
                        key={cat.name}
                        onClick={() => handleLinkClick(`/kids?category=${encodeURIComponent(cat.name)}`)}
                        className="text-left py-1 hover:text-[#111111] transition-colors"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Single Fast Links */}
            <div className="px-5 py-3 space-y-2">
              <button
                onClick={() => handleLinkClick('/new-arrivals')}
                className="block w-full text-left text-sm font-semibold tracking-wider text-[#111111] uppercase hover:text-[#B08D57]"
              >
                NEW ARRIVALS
              </button>
              <button
                onClick={() => handleLinkClick('/sale')}
                className="block w-full text-left text-sm font-semibold tracking-wider text-red-700 uppercase hover:text-red-800"
              >
                SALE &bull; UP TO 50% OFF
              </button>
            </div>

          </div>

          {/* Quick Utility Section */}
          <div className="mt-4 pt-4 border-t border-[#E5E5E5] px-5 space-y-3">
            <p className="text-[11px] font-semibold tracking-widest text-[#666666] uppercase">My Account & Orders</p>
            
            <button
              onClick={() => handleLinkClick('/account')}
              className="flex items-center gap-3 text-xs text-[#111111] hover:text-[#B08D57] w-full"
            >
              <User className="w-4 h-4 text-[#666666]" />
              <span>Customer Profile</span>
            </button>

            <button
              onClick={() => handleLinkClick('/wishlist')}
              className="flex items-center gap-3 text-xs text-[#111111] hover:text-[#B08D57] w-full"
            >
              <Heart className="w-4 h-4 text-[#666666]" />
              <span>My Wishlist</span>
            </button>

            <button
              onClick={() => handleLinkClick('/account')}
              className="flex items-center gap-3 text-xs text-[#111111] hover:text-[#B08D57] w-full"
            >
              <Package className="w-4 h-4 text-[#666666]" />
              <span>Track Orders</span>
            </button>

            <button
              onClick={() => handleLinkClick('/contact')}
              className="flex items-center gap-3 text-xs text-[#111111] hover:text-[#B08D57] w-full"
            >
              <Phone className="w-4 h-4 text-[#666666]" />
              <span>Contact & Client Concierge</span>
            </button>
          </div>

        </div>

        {/* Footer Support Info */}
        <button
          onClick={() => handleLinkClick('/contact')}
          className="p-4 border-t border-[#E5E5E5] bg-[#F7F7F7] flex items-center justify-between text-xs text-[#666666] hover:bg-[#EEEEEE] transition-colors w-full text-left"
        >
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#B08D57]" />
            <span className="font-semibold text-[#111111]">1800 200 8989</span>
          </div>
          <span className="text-[11px] text-[#B08D57] font-medium">Contact Info &rarr;</span>
        </button>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

export interface FilterState {
  category: string[];
  size: string[];
  color: string[];
  maxPrice: number;
  fit: string[];
  fabric: string[];
  minDiscount: number;
}

interface ProductFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  availableCategories: string[];
  availableSizes: string[];
  availableColors: Array<{ name: string; hex: string }>;
  availableFits: string[];
  availableFabrics: string[];
  isMobileDrawerOpen?: boolean;
  onCloseMobileDrawer?: () => void;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  filters,
  onFilterChange,
  onReset,
  availableCategories,
  availableSizes,
  availableColors,
  availableFits,
  availableFabrics,
  isMobileDrawerOpen = false,
  onCloseMobileDrawer
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    price: true,
    size: true,
    color: true,
    fit: false,
    fabric: false,
    discount: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleArrayItem = (key: keyof FilterState, value: string) => {
    const current = (filters[key] as string[]) || [];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    onFilterChange({ ...filters, [key]: updated });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, maxPrice: Number(e.target.value) });
  };

  const handleDiscountChange = (discount: number) => {
    onFilterChange({ 
      ...filters, 
      minDiscount: filters.minDiscount === discount ? 0 : discount 
    });
  };

  const filterContent = (
    <div className="space-y-6 text-xs text-[#111111]">
      
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-[#111111]">
          <Filter className="w-3.5 h-3.5 text-[#B08D57]" />
          <span>Filters</span>
        </div>
        <button
          onClick={onReset}
          className="text-[11px] text-[#888888] hover:text-[#111111] flex items-center gap-1 underline"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* 1. Category */}
      {availableCategories.length > 0 && (
        <div className="border-b border-[#E5E5E5] pb-4">
          <button
            onClick={() => toggleSection('category')}
            className="w-full flex items-center justify-between font-semibold uppercase tracking-wider text-[#111111] mb-2"
          >
            <span>Clothing Category</span>
            {openSections.category ? <ChevronUp className="w-4 h-4 text-[#888888]" /> : <ChevronDown className="w-4 h-4 text-[#888888]" />}
          </button>
          {openSections.category && (
            <div className="space-y-1.5 mt-2 max-h-48 overflow-y-auto pr-1">
              {availableCategories.map(cat => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-[#B08D57]">
                  <input
                    type="checkbox"
                    checked={filters.category.includes(cat)}
                    onChange={() => toggleArrayItem('category', cat)}
                    className="accent-[#111111] rounded-none cursor-pointer"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. Price Range */}
      <div className="border-b border-[#E5E5E5] pb-4">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between font-semibold uppercase tracking-wider text-[#111111] mb-2"
        >
          <span>Price (Max: ₹{filters.maxPrice.toLocaleString('en-IN')})</span>
          {openSections.price ? <ChevronUp className="w-4 h-4 text-[#888888]" /> : <ChevronDown className="w-4 h-4 text-[#888888]" />}
        </button>
        {openSections.price && (
          <div className="mt-2 space-y-2">
            <input
              type="range"
              min="500"
              max="15000"
              step="500"
              value={filters.maxPrice}
              onChange={handlePriceChange}
              className="w-full accent-[#B08D57] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#888888]">
              <span>₹500</span>
              <span>₹15,000+</span>
            </div>
          </div>
        )}
      </div>

      {/* 3. Sizes */}
      {availableSizes.length > 0 && (
        <div className="border-b border-[#E5E5E5] pb-4">
          <button
            onClick={() => toggleSection('size')}
            className="w-full flex items-center justify-between font-semibold uppercase tracking-wider text-[#111111] mb-2"
          >
            <span>Size</span>
            {openSections.size ? <ChevronUp className="w-4 h-4 text-[#888888]" /> : <ChevronDown className="w-4 h-4 text-[#888888]" />}
          </button>
          {openSections.size && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {availableSizes.map(sz => {
                const isSelected = filters.size.includes(sz);
                return (
                  <button
                    key={sz}
                    onClick={() => toggleArrayItem('size', sz)}
                    className={`px-2.5 py-1.5 text-xs font-semibold uppercase border transition-all ${
                      isSelected
                        ? 'border-[#111111] bg-[#111111] text-white'
                        : 'border-[#E5E5E5] bg-white text-[#111111] hover:border-[#888888]'
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 4. Color */}
      {availableColors.length > 0 && (
        <div className="border-b border-[#E5E5E5] pb-4">
          <button
            onClick={() => toggleSection('color')}
            className="w-full flex items-center justify-between font-semibold uppercase tracking-wider text-[#111111] mb-2"
          >
            <span>Colors</span>
            {openSections.color ? <ChevronUp className="w-4 h-4 text-[#888888]" /> : <ChevronDown className="w-4 h-4 text-[#888888]" />}
          </button>
          {openSections.color && (
            <div className="flex flex-wrap gap-2 mt-2">
              {availableColors.map(c => {
                const isSelected = filters.color.includes(c.name);
                return (
                  <button
                    key={c.name}
                    onClick={() => toggleArrayItem('color', c.name)}
                    className={`w-6 h-6 rounded-full border transition-all ${
                      isSelected ? 'ring-2 ring-[#B08D57] scale-110' : 'border-[#CCCCCC] hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 5. Fit */}
      {availableFits.length > 0 && (
        <div className="border-b border-[#E5E5E5] pb-4">
          <button
            onClick={() => toggleSection('fit')}
            className="w-full flex items-center justify-between font-semibold uppercase tracking-wider text-[#111111] mb-2"
          >
            <span>Fit & Silhouette</span>
            {openSections.fit ? <ChevronUp className="w-4 h-4 text-[#888888]" /> : <ChevronDown className="w-4 h-4 text-[#888888]" />}
          </button>
          {openSections.fit && (
            <div className="space-y-1.5 mt-2 max-h-36 overflow-y-auto">
              {availableFits.map(f => (
                <label key={f} className="flex items-center gap-2 cursor-pointer hover:text-[#B08D57]">
                  <input
                    type="checkbox"
                    checked={filters.fit.includes(f)}
                    onChange={() => toggleArrayItem('fit', f)}
                    className="accent-[#111111] rounded-none cursor-pointer"
                  />
                  <span>{f}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 6. Fabric */}
      {availableFabrics.length > 0 && (
        <div className="border-b border-[#E5E5E5] pb-4">
          <button
            onClick={() => toggleSection('fabric')}
            className="w-full flex items-center justify-between font-semibold uppercase tracking-wider text-[#111111] mb-2"
          >
            <span>Fabric</span>
            {openSections.fabric ? <ChevronUp className="w-4 h-4 text-[#888888]" /> : <ChevronDown className="w-4 h-4 text-[#888888]" />}
          </button>
          {openSections.fabric && (
            <div className="space-y-1.5 mt-2 max-h-36 overflow-y-auto">
              {availableFabrics.map(fab => (
                <label key={fab} className="flex items-center gap-2 cursor-pointer hover:text-[#B08D57]">
                  <input
                    type="checkbox"
                    checked={filters.fabric.includes(fab)}
                    onChange={() => toggleArrayItem('fabric', fab)}
                    className="accent-[#111111] rounded-none cursor-pointer"
                  />
                  <span className="line-clamp-1">{fab}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 7. Discount */}
      <div>
        <button
          onClick={() => toggleSection('discount')}
          className="w-full flex items-center justify-between font-semibold uppercase tracking-wider text-[#111111] mb-2"
        >
          <span>Discount Range</span>
          {openSections.discount ? <ChevronUp className="w-4 h-4 text-[#888888]" /> : <ChevronDown className="w-4 h-4 text-[#888888]" />}
        </button>
        {openSections.discount && (
          <div className="space-y-1.5 mt-2">
            {[10, 20, 25, 30].map(disc => (
              <label key={disc} className="flex items-center gap-2 cursor-pointer hover:text-[#B08D57]">
                <input
                  type="radio"
                  name="discount"
                  checked={filters.minDiscount === disc}
                  onChange={() => handleDiscountChange(disc)}
                  className="accent-[#111111] cursor-pointer"
                />
                <span>{disc}% and above</span>
              </label>
            ))}
          </div>
        )}
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Filter */}
      <aside className="hidden lg:block w-64 shrink-0 bg-white p-5 border border-[#E5E5E5] sticky top-28 self-start">
        {filterContent}
      </aside>

      {/* Mobile Drawer Filter */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onCloseMobileDrawer}
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full z-10 flex flex-col overflow-hidden animate-in slide-in-from-left duration-300">
            <div className="p-4 border-b border-[#E5E5E5] flex items-center justify-between bg-[#F7F7F7]">
              <span className="font-serif text-lg font-bold text-[#111111] uppercase tracking-wide">
                Filter Products
              </span>
              <button
                onClick={onCloseMobileDrawer}
                className="p-1 text-[#666666] hover:text-[#111111]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {filterContent}
            </div>
            <div className="p-4 border-t border-[#E5E5E5] bg-[#F7F7F7] flex gap-2">
              <button
                onClick={onReset}
                className="flex-1 py-2.5 border border-[#111111] text-xs font-semibold uppercase tracking-wider text-[#111111] hover:bg-white"
              >
                Reset
              </button>
              <button
                onClick={onCloseMobileDrawer}
                className="flex-1 py-2.5 bg-[#111111] text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#B08D57]"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

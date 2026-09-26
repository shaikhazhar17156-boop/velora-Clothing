import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, AlertTriangle, CheckCircle, Boxes, Plus, Minus, Save } from 'lucide-react';

export const AdminInventoryPage: React.FC = () => {
  const { products, updateProduct, addToast } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterLowOnly, setFilterLowOnly] = useState(false);
  const [stockEdits, setStockEdits] = useState<Record<string, number>>({});

  const lowStockThreshold = 20;

  const lowStockProducts = products.filter(p => p.stock <= lowStockThreshold);

  const displayedProducts = useMemo(() => {
    return products.filter(p => {
      if (filterLowOnly && p.stock > lowStockThreshold) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [products, filterLowOnly, searchQuery]);

  const handleStockChange = (productId: string, val: number) => {
    setStockEdits(prev => ({ ...prev, [productId]: Math.max(0, val) }));
  };

  const handleSaveStock = (productId: string) => {
    const newVal = stockEdits[productId];
    if (newVal !== undefined) {
      updateProduct(productId, { stock: newVal });
      addToast('Inventory count updated', 'success');
      setStockEdits(prev => {
        const next = { ...prev };
        delete next[productId];
        return next;
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div>
          <h2 className="font-serif text-2xl font-bold uppercase tracking-wider text-[#111111] dark:text-white">
            Inventory & Stock Control
          </h2>
          <p className="text-xs text-[#666666] dark:text-[#AAAAAA]">
            Real-time warehouse stock tracking, threshold warnings, and instant inventory adjustments.
          </p>
        </div>
      </div>

      {/* Low Stock Warning Banner */}
      {lowStockProducts.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div className="text-xs">
              <strong className="text-[#111111] dark:text-white font-bold block">
                {lowStockProducts.length} Clothing Items Are Running Low on Stock (≤ {lowStockThreshold} units)
              </strong>
              <span className="text-[#666666] dark:text-[#CCCCCC]">
                Items below safety threshold may sell out quickly during festive spikes.
              </span>
            </div>
          </div>
          <button
            onClick={() => setFilterLowOnly(!filterLowOnly)}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold uppercase tracking-wider transition-colors shrink-0"
          >
            {filterLowOnly ? 'Show All Products' : 'Show Low Stock Only'}
          </button>
        </div>
      )}

      {/* Filter / Search Bar */}
      <div className="bg-white dark:bg-[#1E1E1E] p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by garment title, SKU, category..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] outline-none text-[#111111] dark:text-white"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F7F7F7] dark:bg-[#252525] text-[#888888] uppercase tracking-wider text-[10px]">
                <th className="p-3">Product</th>
                <th className="p-3">SKU</th>
                <th className="p-3">Department</th>
                <th className="p-3">Category</th>
                <th className="p-3">Sizes Offered</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Current Stock</th>
                <th className="p-3 text-right">Instant Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0F0] dark:divide-[#2A2A2A]">
              {displayedProducts.map(p => {
                const isModified = stockEdits[p.id] !== undefined;
                const currentVal = isModified ? stockEdits[p.id] : p.stock;
                const isLow = currentVal <= lowStockThreshold;

                return (
                  <tr key={p.id} className="hover:bg-[#FAFAFA] dark:hover:bg-[#242424] transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt="" className="w-10 h-14 object-cover border border-[#E5E5E5] dark:border-[#383838]" />
                        <div>
                          <strong className="text-xs font-semibold text-[#111111] dark:text-white line-clamp-1 block">
                            {p.name}
                          </strong>
                          <span className="text-[10px] text-[#888888]">₹{p.price.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 font-mono text-[11px] text-[#666666] dark:text-[#AAAAAA]">
                      {p.sku}
                    </td>
                    <td className="p-3 uppercase font-bold text-[10px] text-[#888888]">
                      {p.gender}
                    </td>
                    <td className="p-3 text-[#555555] dark:text-[#CCCCCC]">
                      {p.category}
                    </td>
                    <td className="p-3 text-[11px] text-[#666666] dark:text-[#AAAAAA]">
                      {p.sizes.join(', ')}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase border ${
                        currentVal === 0 
                          ? 'bg-red-50 text-red-700 border-red-200' 
                          : isLow 
                          ? 'bg-amber-50 text-amber-700 border-amber-200' 
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {currentVal === 0 ? 'Out of Stock' : isLow ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                    <td className="p-3 text-center font-bold text-sm text-[#111111] dark:text-white">
                      {currentVal}
                    </td>
                    <td className="p-3 text-right">
                      <div className="inline-flex items-center gap-1.5 justify-end">
                        <button
                          onClick={() => handleStockChange(p.id, currentVal - 5)}
                          className="w-7 h-7 border border-[#E5E5E5] dark:border-[#383838] flex items-center justify-center hover:bg-[#F0F0F0] dark:hover:bg-[#2A2A2A] text-xs font-bold"
                          title="-5 units"
                        >
                          -5
                        </button>
                        <input
                          type="number"
                          value={currentVal}
                          onChange={(e) => handleStockChange(p.id, Number(e.target.value))}
                          className="w-14 px-1.5 py-1 text-center font-bold border border-[#E5E5E5] dark:border-[#383838] bg-[#FDFDFD] dark:bg-[#252525] text-xs"
                        />
                        <button
                          onClick={() => handleStockChange(p.id, currentVal + 5)}
                          className="w-7 h-7 border border-[#E5E5E5] dark:border-[#383838] flex items-center justify-center hover:bg-[#F0F0F0] dark:hover:bg-[#2A2A2A] text-xs font-bold"
                          title="+5 units"
                        >
                          +5
                        </button>
                        {isModified && (
                          <button
                            onClick={() => handleSaveStock(p.id)}
                            className="px-2.5 py-1 bg-[#111111] dark:bg-[#B08D57] text-white text-[11px] font-bold uppercase ml-1 flex items-center gap-1 shadow-xs"
                            title="Save new stock count"
                          >
                            <Save className="w-3 h-3" />
                            <span>Save</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

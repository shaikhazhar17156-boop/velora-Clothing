import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter } from '../../context/NavigationContext';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Copy, 
  ExternalLink, 
  Eye, 
  AlertTriangle 
} from 'lucide-react';
import { ConfirmationModal } from '../../components/admin/ConfirmationModal';
import { Product } from '../../types';

export const AdminProductsPage: React.FC = () => {
  const { products, deleteProduct, addProduct, addToast } = useStore();
  const { navigate } = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState<'all' | 'men' | 'women' | 'kids'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'instock'>('all');

  // Deletion modal
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Available categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => set.add(p.category));
    return Array.from(set).sort();
  }, [products]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (selectedGender !== 'all' && p.gender !== selectedGender) return false;
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (stockFilter === 'low' && p.stock > 20) return false;
      if (stockFilter === 'instock' && p.stock <= 0) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [products, selectedGender, selectedCategory, stockFilter, searchQuery]);

  const handleDuplicate = (p: Product) => {
    const duplicated = addProduct({
      ...p,
      name: `${p.name} (Copy)`,
      sku: `${p.sku}-CP`,
      stock: 15
    });
    addToast(`Duplicated "${duplicated.name}"`, 'success');
  };

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      setProductToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div>
          <h2 className="font-serif text-2xl font-bold uppercase tracking-wider text-[#111111] dark:text-white">
            Product Catalog ({filteredProducts.length})
          </h2>
          <p className="text-xs text-[#666666] dark:text-[#AAAAAA]">
            Manage garment inventory, prices, categories and imagery.
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/products/add')}
          className="px-5 py-2.5 bg-[#111111] dark:bg-[#B08D57] hover:bg-[#B08D57] text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Garment</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-[#1E1E1E] p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs flex flex-wrap items-center gap-3">
        
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, SKU, fabric..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] outline-none text-[#111111] dark:text-white"
          />
        </div>

        {/* Gender Filter */}
        <select
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value as any)}
          className="px-3 py-2 text-xs bg-white dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] outline-none text-[#111111] dark:text-white"
        >
          <option value="all">All Departments</option>
          <option value="men">Men's Clothing</option>
          <option value="women">Women's Clothing</option>
          <option value="kids">Kids' Apparel</option>
        </select>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 text-xs bg-white dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] outline-none text-[#111111] dark:text-white"
        >
          <option value="all">All Categories</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Stock Filter */}
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value as any)}
          className="px-3 py-2 text-xs bg-white dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] outline-none text-[#111111] dark:text-white"
        >
          <option value="all">All Stock Statuses</option>
          <option value="low">Low Stock (≤ 20)</option>
          <option value="instock">In Stock</option>
        </select>

      </div>

      {/* Products Table (Desktop) / Cards (Mobile) */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs overflow-hidden">
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F7F7F7] dark:bg-[#252525] text-[#888888] uppercase tracking-wider text-[10px]">
                <th className="p-3">Garment</th>
                <th className="p-3">Department</th>
                <th className="p-3">Category</th>
                <th className="p-3">SKU</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Rating</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0F0] dark:divide-[#2A2A2A]">
              {filteredProducts.map(p => (
                <tr key={p.id} className="hover:bg-[#FAFAFA] dark:hover:bg-[#242424] transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img src={p.images[0]} alt="" className="w-10 h-14 object-cover border border-[#E5E5E5] dark:border-[#333333] shrink-0" />
                      <div>
                        <strong className="text-xs font-semibold text-[#111111] dark:text-white line-clamp-1 block">
                          {p.name}
                        </strong>
                        <span className="text-[10px] text-[#888888] block truncate max-w-xs">
                          {p.fabric.split('(')[0]}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 uppercase font-bold text-[10px] text-[#888888]">
                    {p.gender}
                  </td>
                  <td className="p-3 text-[#555555] dark:text-[#CCCCCC]">
                    {p.category}
                  </td>
                  <td className="p-3 font-mono text-[11px] text-[#666666] dark:text-[#AAAAAA]">
                    {p.sku}
                  </td>
                  <td className="p-3 font-serif font-bold text-[#111111] dark:text-white">
                    ₹{p.price.toLocaleString('en-IN')}
                    {p.discount > 0 && (
                      <span className="text-[10px] text-red-600 block">({p.discount}% OFF)</span>
                    )}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 text-[10px] font-bold ${
                      p.stock <= 20 
                        ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-300' 
                        : 'text-[#111111] dark:text-white'
                    }`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-[#111111] dark:text-white">
                    ★ {p.rating}
                  </td>
                  <td className="p-3 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      {/* View in store */}
                      <button
                        onClick={() => navigate(`/product/${p.id}`)}
                        className="p-1.5 text-[#666666] hover:text-[#111111] dark:text-[#AAAAAA] dark:hover:text-white"
                        title="View on store"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => navigate(`/admin/products/edit/${p.id}`)}
                        className="p-1.5 text-[#666666] hover:text-[#B08D57] dark:text-[#AAAAAA] dark:hover:text-[#B08D57]"
                        title="Edit product"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {/* Duplicate */}
                      <button
                        onClick={() => handleDuplicate(p)}
                        className="p-1.5 text-[#666666] hover:text-[#111111] dark:text-[#AAAAAA] dark:hover:text-white"
                        title="Duplicate product"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => setProductToDelete(p)}
                        className="p-1.5 text-[#666666] hover:text-red-600 dark:text-[#AAAAAA] dark:hover:text-red-400"
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!productToDelete}
        title="Delete Garment from Store"
        message={`Are you sure you want to permanently delete "${productToDelete?.name}"? It will be immediately removed from the customer storefront catalog.`}
        confirmText="Yes, Delete Product"
        onConfirm={confirmDelete}
        onCancel={() => setProductToDelete(null)}
      />

    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter } from '../../context/NavigationContext';
import { ArrowLeft, Save, Plus, X, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Gender, Product } from '../../types';

export const AdminProductFormPage: React.FC = () => {
  const { products, addProduct, updateProduct, addToast } = useStore();
  const { params, navigate, currentPath } = useRouter();

  const isEditMode = currentPath.includes('/admin/products/edit/');
  const editId = params.editProductId;
  const existingProduct = products.find(p => p.id === editId);

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [gender, setGender] = useState<Gender>('men');
  const [category, setCategory] = useState('Shirts');
  const [subcategory, setSubcategory] = useState('Casual Shirts');
  const [price, setPrice] = useState<number>(1999);
  const [originalPrice, setOriginalPrice] = useState<number>(2499);
  const [discount, setDiscount] = useState<number>(20);
  const [sku, setSku] = useState('VEL-M-SH-099');
  const [fabric, setFabric] = useState('100% Supima Cotton (180 GSM)');
  const [fit, setFit] = useState('Relaxed Fit');
  const [occasion, setOccasion] = useState('Everyday Casual');
  const [pattern, setPattern] = useState('Solid');
  const [washCare, setWashCare] = useState('Machine wash cold, gentle cycle.');
  const [stock, setStock] = useState<number>(35);
  const [sizesInput, setSizesInput] = useState('S, M, L, XL, XXL');
  const [colorName, setColorName] = useState('Pure White');
  const [colorHex, setColorHex] = useState('#FFFFFF');
  const [colors, setColors] = useState<Array<{ name: string; hex: string }>>([
    { name: 'Pure White', hex: '#FFFFFF' },
    { name: 'Classic Black', hex: '#111111' }
  ]);
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80'
  ]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('cotton, shirt, summer, relaxed');
  const [isNew, setIsNew] = useState(true);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isSale, setIsSale] = useState(false);

  // Populate if Edit mode
  useEffect(() => {
    if (isEditMode && existingProduct) {
      setName(existingProduct.name);
      setDescription(existingProduct.description);
      setGender(existingProduct.gender);
      setCategory(existingProduct.category);
      setSubcategory(existingProduct.subcategory);
      setPrice(existingProduct.price);
      setOriginalPrice(existingProduct.originalPrice);
      setDiscount(existingProduct.discount);
      setSku(existingProduct.sku);
      setFabric(existingProduct.fabric);
      setFit(existingProduct.fit);
      setOccasion(existingProduct.occasion || '');
      setPattern(existingProduct.pattern || '');
      setWashCare(existingProduct.washCare);
      setStock(existingProduct.stock);
      setSizesInput(existingProduct.sizes.join(', '));
      setColors(existingProduct.colors);
      setImages(existingProduct.images);
      setTagsInput(existingProduct.tags.join(', '));
      setIsNew(existingProduct.isNew);
      setIsBestSeller(existingProduct.isBestSeller);
      setIsSale(existingProduct.isSale);
    }
  }, [isEditMode, existingProduct]);

  // Recalculate discount % when prices change
  const handlePriceChange = (val: number) => {
    setPrice(val);
    if (originalPrice > val) {
      setDiscount(Math.round(((originalPrice - val) / originalPrice) * 100));
    }
  };

  const handleOriginalPriceChange = (val: number) => {
    setOriginalPrice(val);
    if (val > price) {
      setDiscount(Math.round(((val - price) / val) * 100));
    }
  };

  const handleAddColor = () => {
    if (!colorName.trim()) return;
    setColors(prev => [...prev, { name: colorName.trim(), hex: colorHex }]);
    setColorName('');
  };

  const handleRemoveColor = (idx: number) => {
    setColors(prev => prev.filter((_, i) => i !== idx));
  };

  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    setImages(prev => [...prev, newImageUrl.trim()]);
    setNewImageUrl('');
  };

  const handleRemoveImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      addToast('Please provide a garment name', 'error');
      return;
    }
    if (images.length === 0) {
      addToast('Please provide at least one product image URL', 'error');
      return;
    }

    const parsedSizes = sizesInput.split(',').map(s => s.trim()).filter(Boolean);
    const parsedTags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    if (isEditMode && existingProduct) {
      updateProduct(existingProduct.id, {
        name,
        description,
        gender,
        category,
        subcategory,
        price: Number(price),
        originalPrice: Number(originalPrice),
        discount: Number(discount),
        sku,
        fabric,
        fit,
        occasion,
        pattern,
        washCare,
        stock: Number(stock),
        sizes: parsedSizes,
        colors,
        images,
        tags: parsedTags,
        isNew,
        isBestSeller,
        isSale
      });
      addToast(`Garment "${name}" updated successfully!`, 'success');
    } else {
      addProduct({
        name,
        description,
        gender,
        category,
        subcategory,
        price: Number(price),
        originalPrice: Number(originalPrice),
        discount: Number(discount),
        rating: 5.0,
        reviews: 1,
        sizes: parsedSizes,
        colors,
        images,
        fabric,
        fit,
        occasion,
        pattern,
        washCare,
        stock: Number(stock),
        sku: sku || `VEL-${gender.toUpperCase().charAt(0)}-${Date.now().toString().slice(-4)}`,
        tags: parsedTags,
        isNew,
        isBestSeller,
        isSale
      });
      addToast(`New garment "${name}" added to catalog!`, 'success');
    }

    navigate('/admin/products');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/products')}
            className="p-2 border border-[#E5E5E5] dark:border-[#333333] hover:bg-[#F7F7F7] dark:hover:bg-[#2A2A2A] text-[#111111] dark:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="font-serif text-2xl font-bold uppercase tracking-wider text-[#111111] dark:text-white">
              {isEditMode ? 'Edit Garment' : 'Add New Garment'}
            </h2>
            <p className="text-xs text-[#666666] dark:text-[#AAAAAA]">
              Configure clothing details, sizing variants, inventory and high-resolution images.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Core Details */}
        <div className="bg-white dark:bg-[#1E1E1E] p-6 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#B08D57]">
            1. Basic Garment Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-[#111111] dark:text-white uppercase block mb-1">
                Product Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Oversized Linen Camp Collar Shirt"
                className="w-full px-3 py-2 text-xs bg-[#FDFDFD] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none focus:border-[#B08D57]"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#111111] dark:text-white uppercase block mb-1">
                Department *
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
                className="w-full px-3 py-2 text-xs bg-[#FDFDFD] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-[#111111] dark:text-white uppercase block mb-1">
                Category *
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Shirts, Sarees, Kurtas, Trousers"
                className="w-full px-3 py-2 text-xs bg-[#FDFDFD] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none focus:border-[#B08D57]"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#111111] dark:text-white uppercase block mb-1">
                Subcategory
              </label>
              <input
                type="text"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                placeholder="e.g. Resort Shirts, Casual, Anarkali Sets"
                className="w-full px-3 py-2 text-xs bg-[#FDFDFD] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#111111] dark:text-white uppercase block mb-1">
                Stock Keeping Unit (SKU)
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="VEL-M-SH-001"
                className="w-full px-3 py-2 text-xs bg-[#FDFDFD] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white font-mono outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#111111] dark:text-white uppercase block mb-1">
              Description *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the silhouette, weave, tailoring details and style versatility..."
              className="w-full px-3 py-2 text-xs bg-[#FDFDFD] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none focus:border-[#B08D57]"
              required
            />
          </div>
        </div>

        {/* Section 2: Pricing & Inventory */}
        <div className="bg-white dark:bg-[#1E1E1E] p-6 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#B08D57]">
            2. Pricing & Stock
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-bold text-[#111111] dark:text-white uppercase block mb-1">
                Selling Price (₹) *
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => handlePriceChange(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-[#FDFDFD] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white font-bold outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#111111] dark:text-white uppercase block mb-1">
                Original MRP (₹)
              </label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => handleOriginalPriceChange(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-[#FDFDFD] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#111111] dark:text-white uppercase block mb-1">
                Discount Percentage (%)
              </label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-[#FDFDFD] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#111111] dark:text-white uppercase block mb-1">
                Inventory Units *
              </label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-[#FDFDFD] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
                required
              />
            </div>
          </div>
        </div>

        {/* Section 3: Fabric & Tailoring Attributes */}
        <div className="bg-white dark:bg-[#1E1E1E] p-6 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#B08D57]">
            3. Fabric, Fit & Care (Strictly Clothing Only)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-[#111111] dark:text-white uppercase block mb-1">
                Fabric Composition *
              </label>
              <input
                type="text"
                value={fabric}
                onChange={(e) => setFabric(e.target.value)}
                placeholder="100% Belgian Flax Linen"
                className="w-full px-3 py-2 text-xs bg-[#FDFDFD] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#111111] dark:text-white uppercase block mb-1">
                Fit Silhouette
              </label>
              <input
                type="text"
                value={fit}
                onChange={(e) => setFit(e.target.value)}
                placeholder="Oversized Boxy Fit, Tailored Slim"
                className="w-full px-3 py-2 text-xs bg-[#FDFDFD] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#111111] dark:text-white uppercase block mb-1">
                Wash Care Instructions
              </label>
              <input
                type="text"
                value={washCare}
                onChange={(e) => setWashCare(e.target.value)}
                placeholder="Cold wash, line dry in shade"
                className="w-full px-3 py-2 text-xs bg-[#FDFDFD] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#111111] dark:text-white uppercase block mb-1">
              Available Sizes (Comma separated)
            </label>
            <input
              type="text"
              value={sizesInput}
              onChange={(e) => setSizesInput(e.target.value)}
              placeholder="S, M, L, XL or 2-3Y, 4-5Y"
              className="w-full px-3 py-2 text-xs bg-[#FDFDFD] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
            />
          </div>

          {/* Color Palettes */}
          <div>
            <label className="text-xs font-bold text-[#111111] dark:text-white uppercase block mb-2">
              Color Variants
            </label>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {colors.map((c, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-xs">
                  <span className="w-3 h-3 rounded-full border border-gray-400" style={{ backgroundColor: c.hex }} />
                  <span className="text-[#111111] dark:text-white font-medium">{c.name}</span>
                  <button type="button" onClick={() => handleRemoveColor(idx)}>
                    <X className="w-3 h-3 text-[#888888] hover:text-red-600" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 items-center max-w-sm">
              <input
                type="text"
                value={colorName}
                onChange={(e) => setColorName(e.target.value)}
                placeholder="Color Name (e.g. Sage Green)"
                className="flex-1 px-3 py-1.5 text-xs bg-[#FDFDFD] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
              />
              <input
                type="color"
                value={colorHex}
                onChange={(e) => setColorHex(e.target.value)}
                className="w-8 h-8 cursor-pointer border border-[#E5E5E5]"
              />
              <button
                type="button"
                onClick={handleAddColor}
                className="px-3 py-1.5 bg-[#111111] dark:bg-[#B08D57] text-white text-xs font-semibold uppercase"
              >
                Add Color
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: Imagery */}
        <div className="bg-white dark:bg-[#1E1E1E] p-6 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#B08D57]">
            4. Garment Photography & Gallery
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {images.map((img, idx) => (
              <div key={idx} className="relative aspect-[3/4] bg-[#F7F7F7] border border-[#E5E5E5] dark:border-[#383838] overflow-hidden group">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove image"
                >
                  <X className="w-3 h-3" />
                </button>
                {idx === 0 && (
                  <span className="absolute bottom-1 left-1 bg-[#111111] text-white text-[9px] px-1 font-bold uppercase">
                    Primary
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2 max-w-xl">
            <input
              type="url"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="Paste image URL (https://images.unsplash.com/...)"
              className="flex-1 px-3 py-2 text-xs bg-[#FDFDFD] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="px-4 py-2 bg-[#111111] dark:bg-[#B08D57] text-white text-xs font-semibold uppercase"
            >
              Add Image
            </button>
          </div>
        </div>

        {/* Section 5: Badges & Tags */}
        <div className="bg-white dark:bg-[#1E1E1E] p-6 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#B08D57]">
            5. Merchandising Badges & Tags
          </h3>

          <div className="flex flex-wrap gap-6 text-xs text-[#111111] dark:text-white">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isNew}
                onChange={(e) => setIsNew(e.target.checked)}
                className="accent-[#B08D57]"
              />
              <span className="font-semibold">Mark as New Arrival</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isBestSeller}
                onChange={(e) => setIsBestSeller(e.target.checked)}
                className="accent-[#B08D57]"
              />
              <span className="font-semibold">Mark as Bestseller</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isSale}
                onChange={(e) => setIsSale(e.target.checked)}
                className="accent-[#B08D57]"
              />
              <span className="font-semibold">Include in SALE Showcase</span>
            </label>
          </div>

          <div>
            <label className="text-xs font-bold text-[#111111] dark:text-white uppercase block mb-1">
              Search Tags (Comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. handloom, cotton, festive, wedding, oversized"
              className="w-full px-3 py-2 text-xs bg-[#FDFDFD] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-3 border border-[#E5E5E5] dark:border-[#444444] text-[#666666] dark:text-[#CCCCCC] text-xs font-bold uppercase tracking-wider hover:bg-[#F7F7F7] dark:hover:bg-[#252525] transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-8 py-3 bg-[#111111] dark:bg-[#B08D57] hover:bg-[#B08D57] text-white text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{isEditMode ? 'Save Changes' : 'Publish Garment'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};

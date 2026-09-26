import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Plus, Image as ImageIcon, Trash2, CheckCircle, ExternalLink, X } from 'lucide-react';
import { Banner } from '../../types';
import { ConfirmationModal } from '../../components/admin/ConfirmationModal';

export const AdminBannersPage: React.FC = () => {
  const { banners, addBanner, updateBanner, deleteBanner, addToast } = useStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState<Banner | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [buttonText, setButtonText] = useState('SHOP NOW');
  const [buttonUrl, setButtonUrl] = useState('/men');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState<'all' | 'men' | 'women' | 'kids' | 'sale'>('all');

  const handleCreateBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !image.trim()) return;

    addBanner({
      title: title.trim(),
      subtitle: subtitle.trim(),
      buttonText: buttonText.trim(),
      buttonUrl: buttonUrl.trim(),
      image: image.trim(),
      category,
      active: true
    });

    setIsAddModalOpen(false);
    setTitle('');
    setSubtitle('');
    setImage('');
    addToast('Promotional banner added', 'success');
  };

  const confirmDelete = () => {
    if (bannerToDelete) {
      deleteBanner(bannerToDelete.id);
      setBannerToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div>
          <h2 className="font-serif text-2xl font-bold uppercase tracking-wider text-[#111111] dark:text-white">
            Homepage Banners & Editorial ({banners.length})
          </h2>
          <p className="text-xs text-[#666666] dark:text-[#AAAAAA]">
            Control homepage hero showcases, seasonal collections, and promotional links.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 bg-[#111111] dark:bg-[#B08D57] hover:bg-[#B08D57] text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Banner</span>
        </button>
      </div>

      {/* Banners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map(b => (
          <div
            key={b.id}
            className={`bg-white dark:bg-[#1E1E1E] border overflow-hidden shadow-xs flex flex-col justify-between ${
              b.active ? 'border-[#E5E5E5] dark:border-[#2A2A2A]' : 'border-dashed border-gray-300 opacity-60'
            }`}
          >
            {/* Banner Preview Image */}
            <div className="relative h-48 bg-[#F7F7F7] overflow-hidden">
              <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B08D57] block">
                  Category: {b.category}
                </span>
                <h4 className="font-serif text-xl font-bold uppercase">{b.title}</h4>
                <p className="text-xs text-white/80 line-clamp-1">{b.subtitle}</p>
              </div>
            </div>

            {/* Banner Details */}
            <div className="p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between text-[#666666] dark:text-[#AAAAAA]">
                <span>Button: <strong>{b.buttonText}</strong></span>
                <span>Destination: <strong>{b.buttonUrl}</strong></span>
              </div>

              <div className="pt-3 border-t border-[#F0F0F0] dark:border-[#2A2A2A] flex items-center justify-between">
                <button
                  onClick={() => updateBanner(b.id, { active: !b.active })}
                  className="font-semibold text-[#111111] dark:text-white hover:text-[#B08D57] underline"
                >
                  {b.active ? 'Deactivate Banner' : 'Activate Banner'}
                </button>

                <button
                  onClick={() => setBannerToDelete(b)}
                  className="p-1 text-red-600 hover:text-red-800"
                  title="Delete banner"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Add Banner Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#333333] shadow-2xl p-6">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-[#888888] hover:text-[#111111]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-[#111111] dark:text-white mb-4">
              Add Promotional Banner
            </h3>

            <form onSubmit={handleCreateBanner} className="space-y-4 text-xs">
              <div>
                <label className="font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
                  Banner Heading *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. AUTUMN SARTORIAL"
                  className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Refined wool-blend tailoring for the discerning wardrobe"
                  className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
                  Banner Image URL *
                </label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
                    Button URL
                  </label>
                  <input
                    type="text"
                    value={buttonUrl}
                    onChange={(e) => setButtonUrl(e.target.value)}
                    placeholder="/men or /women"
                    className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E5E5] dark:border-[#333333] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-[#E5E5E5] dark:border-[#383838] uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#111111] dark:bg-[#B08D57] text-white font-bold uppercase"
                >
                  Save Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmationModal
        isOpen={!!bannerToDelete}
        title="Delete Homepage Banner"
        message="Are you sure you want to permanently delete this banner from the storefront?"
        confirmText="Delete Banner"
        onConfirm={confirmDelete}
        onCancel={() => setBannerToDelete(null)}
      />

    </div>
  );
};

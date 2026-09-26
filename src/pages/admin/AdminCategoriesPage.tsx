import React, { useState } from 'react';
import { departmentCategories } from '../../data/initialData';
import { Plus, Trash2, Edit2, Layers, Check, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminCategoriesPage: React.FC = () => {
  const { addToast } = useStore();
  const [categoriesData, setCategoriesData] = useState(departmentCategories);

  const [activeDept, setActiveDept] = useState<'men' | 'women' | 'kids'>('men');
  const [newCatName, setNewCatName] = useState('');
  const [newSubcatName, setNewSubcatName] = useState('');
  const [targetCategory, setTargetCategory] = useState<string>('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    setCategoriesData(prev => ({
      ...prev,
      [activeDept]: [
        ...prev[activeDept],
        { name: newCatName.trim(), subcategories: ['Standard'] }
      ]
    }));
    addToast(`Added category "${newCatName}" to ${activeDept.toUpperCase()}`, 'success');
    setNewCatName('');
  };

  const handleAddSubcategory = (catName: string) => {
    if (!newSubcatName.trim()) return;

    setCategoriesData(prev => ({
      ...prev,
      [activeDept]: prev[activeDept].map(c => 
        c.name === catName 
          ? { ...c, subcategories: [...c.subcategories, newSubcatName.trim()] }
          : c
      )
    }));
    addToast(`Added subcategory to ${catName}`, 'success');
    setNewSubcatName('');
    setTargetCategory('');
  };

  const handleDeleteCategory = (catName: string) => {
    setCategoriesData(prev => ({
      ...prev,
      [activeDept]: prev[activeDept].filter(c => c.name !== catName)
    }));
    addToast(`Removed category "${catName}"`, 'info');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div>
          <h2 className="font-serif text-2xl font-bold uppercase tracking-wider text-[#111111] dark:text-white">
            Department & Category Hierarchy
          </h2>
          <p className="text-xs text-[#666666] dark:text-[#AAAAAA]">
            Configure clothing department trees, subcategories, and navigation menus.
          </p>
        </div>
      </div>

      {/* Department Tabs */}
      <div className="flex border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        {(['men', 'women', 'kids'] as const).map(dept => (
          <button
            key={dept}
            onClick={() => setActiveDept(dept)}
            className={`px-6 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors ${
              activeDept === dept
                ? 'border-[#B08D57] text-[#111111] dark:text-white bg-white dark:bg-[#1E1E1E]'
                : 'border-transparent text-[#666666] dark:text-[#AAAAAA] hover:text-[#111111] dark:hover:text-white'
            }`}
          >
            {dept === 'men' ? 'Men’s Clothing' : dept === 'women' ? 'Women’s Atelier' : 'Kids’ Apparel'}
          </button>
        ))}
      </div>

      {/* Add New Category Box */}
      <div className="bg-white dark:bg-[#1E1E1E] p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-white mb-3">
          Add New {activeDept.toUpperCase()} Clothing Category
        </h4>
        <form onSubmit={handleAddCategory} className="flex gap-2 max-w-md">
          <input
            type="text"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            placeholder="e.g. Blazers, Kurtas, Sweatshirts"
            className="flex-1 px-3 py-2 text-xs bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] outline-none text-[#111111] dark:text-white"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#111111] dark:bg-[#B08D57] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#B08D57]"
          >
            Add Category
          </button>
        </form>
      </div>

      {/* Category List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesData[activeDept].map(cat => (
          <div
            key={cat.name}
            className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] p-5 shadow-xs space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#F0F0F0] dark:border-[#2A2A2A]">
                <h4 className="font-serif text-lg font-bold text-[#111111] dark:text-white uppercase">
                  {cat.name}
                </h4>
                <button
                  onClick={() => handleDeleteCategory(cat.name)}
                  className="p-1 text-[#888888] hover:text-red-600"
                  title="Delete category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Subcategories */}
              <div className="pt-3 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-[#888888] tracking-wider block">
                  Subcategories ({cat.subcategories.length})
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cat.subcategories.map(sub => (
                    <span
                      key={sub}
                      className="px-2 py-0.5 bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[11px] text-[#555555] dark:text-[#CCCCCC]"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick add subcategory */}
            <div className="pt-3 border-t border-[#F0F0F0] dark:border-[#2A2A2A]">
              {targetCategory === cat.name ? (
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={newSubcatName}
                    onChange={(e) => setNewSubcatName(e.target.value)}
                    placeholder="New subcategory"
                    className="flex-1 px-2 py-1 text-xs border border-[#E5E5E5] dark:border-[#383838] bg-white dark:bg-[#252525] text-[#111111] dark:text-white"
                  />
                  <button
                    onClick={() => handleAddSubcategory(cat.name)}
                    className="p-1.5 bg-[#111111] text-white"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setTargetCategory('')}
                    className="p-1.5 border border-[#E5E5E5]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setTargetCategory(cat.name);
                    setNewSubcatName('');
                  }}
                  className="text-xs font-semibold text-[#B08D57] hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Subcategory</span>
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

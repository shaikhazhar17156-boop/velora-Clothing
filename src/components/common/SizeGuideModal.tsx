import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Ruler, HelpCircle } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen, sizeGuideDepartment, setSizeGuideDepartment } = useStore();
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isSizeGuideOpen) return null;

  const menSizes = [
    { size: 'S / 38', chestIn: '38', waistIn: '30-32', lengthIn: '28', chestCm: '96', waistCm: '76-81', lengthCm: '71' },
    { size: 'M / 40', chestIn: '40', waistIn: '32-34', lengthIn: '29', chestCm: '102', waistCm: '81-86', lengthCm: '74' },
    { size: 'L / 42', chestIn: '42', waistIn: '34-36', lengthIn: '30', chestCm: '107', waistCm: '86-91', lengthCm: '76' },
    { size: 'XL / 44', chestIn: '44', waistIn: '36-38', lengthIn: '31', chestCm: '112', waistCm: '91-96', lengthCm: '79' },
    { size: 'XXL / 46', chestIn: '46', waistIn: '38-40', lengthIn: '31.5', chestCm: '117', waistCm: '96-101', lengthCm: '80' },
  ];

  const womenSizes = [
    { size: 'XS / 32', bustIn: '32', waistIn: '26', hipIn: '36', bustCm: '81', waistCm: '66', hipCm: '91' },
    { size: 'S / 34', bustIn: '34', waistIn: '28', hipIn: '38', bustCm: '86', waistCm: '71', hipCm: '96' },
    { size: 'M / 36', bustIn: '36', waistIn: '30', hipIn: '40', bustCm: '91', waistCm: '76', hipCm: '102' },
    { size: 'L / 38', bustIn: '38', waistIn: '32', hipIn: '42', bustCm: '96', waistCm: '81', hipCm: '107' },
    { size: 'XL / 40', bustIn: '40', waistIn: '34', hipIn: '44', bustCm: '102', waistCm: '86', hipCm: '112' },
  ];

  const kidsSizes = [
    { age: '2-3 Years', heightIn: '36-38', chestIn: '21', waistIn: '20', heightCm: '92-98', chestCm: '53', waistCm: '51' },
    { age: '4-5 Years', heightIn: '41-43', chestIn: '23', waistIn: '21.5', heightCm: '104-110', chestCm: '58', waistCm: '55' },
    { age: '6-7 Years', heightIn: '46-48', chestIn: '25', waistIn: '22.5', heightCm: '116-122', chestCm: '63', waistCm: '57' },
    { age: '8-9 Years', heightIn: '50-53', chestIn: '27', waistIn: '24', heightCm: '128-134', chestCm: '69', waistCm: '61' },
    { age: '10-11 Years', heightIn: '55-58', chestIn: '29', waistIn: '25.5', heightCm: '140-146', chestCm: '74', waistCm: '65' },
    { age: '12-13 Years', heightIn: '60-63', chestIn: '31', waistIn: '27', heightCm: '152-158', chestCm: '79', waistCm: '68' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl bg-white border border-[#E5E5E5] shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#E5E5E5] flex items-center justify-between bg-[#F7F7F7]">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#B08D57]" />
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-[#111111] uppercase">
              VELORA Size Guide
            </h3>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1 text-[#666666] hover:text-[#111111] transition-colors"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Department Switcher & Unit Switcher */}
        <div className="p-4 sm:px-6 border-b border-[#E5E5E5] flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex border border-[#E5E5E5] bg-[#F7F7F7]">
            <button
              onClick={() => setSizeGuideDepartment('men')}
              className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                sizeGuideDepartment === 'men' ? 'bg-[#111111] text-white' : 'text-[#666666] hover:text-[#111111]'
              }`}
            >
              Men
            </button>
            <button
              onClick={() => setSizeGuideDepartment('women')}
              className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                sizeGuideDepartment === 'women' ? 'bg-[#111111] text-white' : 'text-[#666666] hover:text-[#111111]'
              }`}
            >
              Women
            </button>
            <button
              onClick={() => setSizeGuideDepartment('kids')}
              className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                sizeGuideDepartment === 'kids' ? 'bg-[#111111] text-white' : 'text-[#666666] hover:text-[#111111]'
              }`}
            >
              Kids
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#666666]">Units:</span>
            <div className="inline-flex border border-[#E5E5E5]">
              <button
                onClick={() => setUnit('inches')}
                className={`px-2.5 py-1 font-medium transition-colors ${
                  unit === 'inches' ? 'bg-[#B08D57] text-white' : 'bg-white text-[#666666]'
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-2.5 py-1 font-medium transition-colors ${
                  unit === 'cm' ? 'bg-[#B08D57] text-white' : 'bg-white text-[#666666]'
                }`}
              >
                CM
              </button>
            </div>
          </div>

        </div>

        {/* Content Table */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#111111] text-white uppercase tracking-wider text-[11px]">
                  {sizeGuideDepartment === 'men' && (
                    <>
                      <th className="p-3">Standard Size</th>
                      <th className="p-3">Chest ({unit === 'inches' ? 'in' : 'cm'})</th>
                      <th className="p-3">Waist ({unit === 'inches' ? 'in' : 'cm'})</th>
                      <th className="p-3">Garment Length ({unit === 'inches' ? 'in' : 'cm'})</th>
                    </>
                  )}
                  {sizeGuideDepartment === 'women' && (
                    <>
                      <th className="p-3">Standard Size</th>
                      <th className="p-3">Bust ({unit === 'inches' ? 'in' : 'cm'})</th>
                      <th className="p-3">Waist ({unit === 'inches' ? 'in' : 'cm'})</th>
                      <th className="p-3">Hips ({unit === 'inches' ? 'in' : 'cm'})</th>
                    </>
                  )}
                  {sizeGuideDepartment === 'kids' && (
                    <>
                      <th className="p-3">Age Bracket</th>
                      <th className="p-3">Height ({unit === 'inches' ? 'in' : 'cm'})</th>
                      <th className="p-3">Chest ({unit === 'inches' ? 'in' : 'cm'})</th>
                      <th className="p-3">Waist ({unit === 'inches' ? 'in' : 'cm'})</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5] text-[#333333]">
                {sizeGuideDepartment === 'men' && menSizes.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-[#FAFAFA]' : 'bg-white'}>
                    <td className="p-3 font-semibold text-[#111111]">{row.size}</td>
                    <td className="p-3">{unit === 'inches' ? row.chestIn : row.chestCm}</td>
                    <td className="p-3">{unit === 'inches' ? row.waistIn : row.waistCm}</td>
                    <td className="p-3">{unit === 'inches' ? row.lengthIn : row.lengthCm}</td>
                  </tr>
                ))}

                {sizeGuideDepartment === 'women' && womenSizes.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-[#FAFAFA]' : 'bg-white'}>
                    <td className="p-3 font-semibold text-[#111111]">{row.size}</td>
                    <td className="p-3">{unit === 'inches' ? row.bustIn : row.bustCm}</td>
                    <td className="p-3">{unit === 'inches' ? row.waistIn : row.waistCm}</td>
                    <td className="p-3">{unit === 'inches' ? row.hipIn : row.hipCm}</td>
                  </tr>
                ))}

                {sizeGuideDepartment === 'kids' && kidsSizes.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-[#FAFAFA]' : 'bg-white'}>
                    <td className="p-3 font-semibold text-[#111111]">{row.age}</td>
                    <td className="p-3">{unit === 'inches' ? row.heightIn : row.heightCm}</td>
                    <td className="p-3">{unit === 'inches' ? row.chestIn : row.chestCm}</td>
                    <td className="p-3">{unit === 'inches' ? row.waistIn : row.waistCm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to Measure Card */}
          <div className="bg-[#F7F7F7] p-4 border border-[#E5E5E5] space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#111111]">
              <HelpCircle className="w-4 h-4 text-[#B08D57]" />
              <span>How to Measure Accurately</span>
            </div>
            <ul className="text-xs text-[#666666] space-y-1 list-disc pl-5 leading-relaxed">
              <li><strong>Chest / Bust:</strong> Measure around the fullest part of your chest under your armpits, keeping the tape level.</li>
              <li><strong>Waist:</strong> Measure around your natural waistline, typically the narrowest point above your hips.</li>
              <li><strong>Hips:</strong> Stand with your feet together and measure around the fullest part of your hips.</li>
              <li><strong>Fit Preference:</strong> For oversized cuts, order your true size. For tailored fits, order one size up if between sizes.</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E5E5E5] bg-[#F7F7F7] flex justify-end">
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="px-6 py-2 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#B08D57] transition-colors"
          >
            Understood
          </button>
        </div>

      </div>
    </div>
  );
};

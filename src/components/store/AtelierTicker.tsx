import React, { useState, useEffect } from 'react';
import { useRouter } from '../../context/NavigationContext';
import { Sparkles, MapPin, PackageCheck, Flame } from 'lucide-react';

interface ActivityItem {
  id: number;
  type: 'order' | 'stock' | 'artisan';
  text: string;
  badge: string;
  link?: string;
}

export const AtelierTicker: React.FC = () => {
  const { navigate } = useRouter();

  const activities: ActivityItem[] = [
    {
      id: 1,
      type: 'order',
      badge: 'JUST DISPATCHED',
      text: 'Someone in Mumbai bagged the Oversized Supima Cotton Shirt (Ivory White)',
      link: '/men'
    },
    {
      id: 2,
      type: 'stock',
      badge: 'LIMITED LOOM BATCH',
      text: 'Pure Handloom Banarasi Katan Silk Anarkali: Only 4 pieces remaining',
      link: '/women'
    },
    {
      id: 3,
      type: 'order',
      badge: 'RECENTLY PURCHASED',
      text: 'Patron in Bengaluru ordered Tailored Linen Mandarin Collar Kurta',
      link: '/men'
    },
    {
      id: 4,
      type: 'artisan',
      badge: 'ATELIER NOTICE',
      text: 'Varanasi Master Weavers: New Hand-Dyed Chanderi festive collection now live',
      link: '/women'
    },
    {
      id: 5,
      type: 'order',
      badge: 'POPULAR CHOICE',
      text: 'Family in New Delhi bagged Embroidered Chiffon Festive Set for Kids',
      link: '/kids'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [activities.length]);

  const current = activities[currentIndex];

  return (
    <div className="bg-[#141414] text-white border-y border-[#262626] py-2.5 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
        
        {/* Left Live Indicator */}
        <div className="hidden sm:flex items-center gap-2 text-[#B08D57] shrink-0 font-semibold tracking-wider uppercase text-[10px]">
          <span className="w-2 h-2 rounded-full bg-[#B08D57] animate-pulse" />
          <span>Atelier Live Pulse</span>
        </div>

        {/* Center Animated Activity */}
        <div 
          key={current.id}
          onClick={() => current.link && navigate(current.link)}
          className="mx-auto flex items-center gap-2 cursor-pointer hover:text-[#B08D57] transition-all animate-in fade-in slide-in-from-bottom-2 duration-300 truncate"
        >
          <span className={`text-[9px] font-bold tracking-widest px-2 py-0.5 uppercase shrink-0 ${
            current.type === 'stock' 
              ? 'bg-amber-950 text-amber-400 border border-amber-800/60' 
              : 'bg-[#222222] text-[#B08D57] border border-[#333333]'
          }`}>
            {current.badge}
          </span>
          <span className="text-xs text-[#E0E0E0] truncate">
            {current.text}
          </span>
          <span className="text-[10px] text-[#888888] underline shrink-0 hidden md:inline">
            Inspect &rarr;
          </span>
        </div>

        {/* Right Purity Assurance */}
        <div className="hidden lg:flex items-center gap-2 text-[10px] text-[#777777] shrink-0 tracking-widest uppercase">
          <span>100% Pure Botanical Fibers</span>
        </div>

      </div>
    </div>
  );
};

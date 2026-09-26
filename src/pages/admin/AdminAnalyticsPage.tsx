import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Heart, 
  ShoppingBag, 
  Search, 
  ArrowUpRight, 
  Users 
} from 'lucide-react';

export const AdminAnalyticsPage: React.FC = () => {
  const { products, orders, customers } = useStore();
  const [timeframe, setTimeframe] = useState<'30d' | '3m' | '1y'>('30d');

  // Customer Behavior Analytics mock data
  const mostSearchedKeywords = [
    { term: 'pure linen shirt', searches: 1420, trend: '+24%' },
    { term: 'banarasi silk saree', searches: 1180, trend: '+35%' },
    { term: 'anarkali kurta set', searches: 980, trend: '+18%' },
    { term: 'selvedge denim', searches: 850, trend: '+12%' },
    { term: 'boys kurta pyjama', searches: 720, trend: '+40%' },
  ];

  const mostWishlisted = products.slice(0, 5);

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div>
          <h2 className="font-serif text-2xl font-bold uppercase tracking-wider text-[#111111] dark:text-white">
            Customer Behavior & Sales Intelligence
          </h2>
          <p className="text-xs text-[#666666] dark:text-[#AAAAAA]">
            Actionable merchandising metrics, conversion funnel, and shopping intent signals.
          </p>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center gap-1 bg-white dark:bg-[#1E1E1E] p-1 border border-[#E5E5E5] dark:border-[#2A2A2A] text-xs">
          <button
            onClick={() => setTimeframe('30d')}
            className={`px-3 py-1 font-semibold uppercase ${timeframe === '30d' ? 'bg-[#111111] dark:bg-[#B08D57] text-white' : 'text-[#666666]'}`}
          >
            Last 30 Days
          </button>
          <button
            onClick={() => setTimeframe('3m')}
            className={`px-3 py-1 font-semibold uppercase ${timeframe === '3m' ? 'bg-[#111111] dark:bg-[#B08D57] text-white' : 'text-[#666666]'}`}
          >
            Last 3 Months
          </button>
          <button
            onClick={() => setTimeframe('1y')}
            className={`px-3 py-1 font-semibold uppercase ${timeframe === '1y' ? 'bg-[#111111] dark:bg-[#B08D57] text-white' : 'text-[#666666]'}`}
          >
            Last 1 Year
          </button>
        </div>
      </div>

      {/* KPI Funnel Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-[#1E1E1E] p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs">
          <div className="flex items-center justify-between text-[#888888] text-[10px] uppercase font-bold">
            <span>Product Page Views</span>
            <Eye className="w-4 h-4 text-[#B08D57]" />
          </div>
          <h3 className="text-2xl font-bold font-serif text-[#111111] dark:text-white mt-1">
            48,920
          </h3>
          <span className="text-[10px] text-emerald-600 font-semibold">+18.4% traffic</span>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs">
          <div className="flex items-center justify-between text-[#888888] text-[10px] uppercase font-bold">
            <span>Wishlist Saves</span>
            <Heart className="w-4 h-4 text-rose-500" />
          </div>
          <h3 className="text-2xl font-bold font-serif text-[#111111] dark:text-white mt-1">
            6,410
          </h3>
          <span className="text-[10px] text-emerald-600 font-semibold">+11.2% intent</span>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs">
          <div className="flex items-center justify-between text-[#888888] text-[10px] uppercase font-bold">
            <span>Add to Cart Actions</span>
            <ShoppingBag className="w-4 h-4 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold font-serif text-[#111111] dark:text-white mt-1">
            3,280
          </h3>
          <span className="text-[10px] text-emerald-600 font-semibold">6.7% view-to-bag</span>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs">
          <div className="flex items-center justify-between text-[#888888] text-[10px] uppercase font-bold">
            <span>Store Conversion</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <h3 className="text-2xl font-bold font-serif text-[#111111] dark:text-white mt-1">
            3.42%
          </h3>
          <span className="text-[10px] text-emerald-600 font-semibold">+0.4% from benchmark</span>
        </div>

      </div>

      {/* Grid: Most Searched Terms & Most Wishlisted Garments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Most Searched Search Queries */}
        <div className="bg-white dark:bg-[#1E1E1E] p-6 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[#B08D57]" />
              <h3 className="font-serif text-lg font-bold text-[#111111] dark:text-white uppercase">
                Top Searched Clothing Terms
              </h3>
            </div>
            <span className="text-[10px] uppercase text-[#888888] font-bold">Search Volume</span>
          </div>

          <div className="divide-y divide-[#F0F0F0] dark:divide-[#2A2A2A] text-xs">
            {mostSearchedKeywords.map((k, i) => (
              <div key={i} className="py-3 first:pt-0 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-gray-400 font-bold">#{i + 1}</span>
                  <span className="font-semibold text-[#111111] dark:text-white capitalize">
                    "{k.term}"
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#666666] dark:text-[#AAAAAA]">{k.searches.toLocaleString()} searches</span>
                  <span className="text-[10px] text-emerald-600 font-bold">{k.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Wishlisted Products */}
        <div className="bg-white dark:bg-[#1E1E1E] p-6 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              <h3 className="font-serif text-lg font-bold text-[#111111] dark:text-white uppercase">
                Most Wishlisted Garments
              </h3>
            </div>
            <span className="text-[10px] uppercase text-[#888888] font-bold">Saved Counts</span>
          </div>

          <div className="divide-y divide-[#F0F0F0] dark:divide-[#2A2A2A] text-xs">
            {mostWishlisted.map((p, i) => (
              <div key={p.id} className="py-2.5 first:pt-0 flex items-center gap-3">
                <img src={p.images[0]} alt="" className="w-10 h-14 object-cover border border-[#E5E5E5] dark:border-[#383838]" />
                <div className="flex-1">
                  <h4 className="font-semibold text-[#111111] dark:text-white line-clamp-1">{p.name}</h4>
                  <span className="text-[10px] text-[#888888] uppercase">{p.gender} &bull; {p.category}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#111111] dark:text-white block font-serif">₹{p.price.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-rose-600 font-semibold">{320 - (i * 45)} saves</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

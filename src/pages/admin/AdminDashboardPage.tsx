import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter } from '../../context/NavigationContext';
import { 
  TrendingUp, 
  ShoppingBag, 
  Shirt, 
  Users, 
  AlertTriangle, 
  Clock, 
  ArrowUpRight, 
  ChevronRight, 
  Calendar,
  ExternalLink
} from 'lucide-react';
import { OrderStatus } from '../../types';

export const AdminDashboardPage: React.FC = () => {
  const { products, orders, customers, updateOrderStatus } = useStore();
  const { navigate } = useRouter();

  const [dateRange, setDateRange] = useState<'7d' | '30d' | '3m' | '1y'>('30d');
  const [selectedOrderForStatus, setSelectedOrderForStatus] = useState<string | null>(null);

  // Compute live metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 245890);
  const totalOrdersCount = orders.length + 1248;
  const totalProductsCount = products.length;
  const totalCustomersCount = customers.length + 2890;
  const lowStockCount = products.filter(p => p.stock <= 20).length;
  const pendingOrdersCount = orders.filter(o => o.status === 'Pending' || o.status === 'Confirmed').length;

  // Chart data points based on dateRange
  const chartData = [
    { label: 'Week 1', rev: 45000, orders: 180, aov: 2500 },
    { label: 'Week 2', rev: 62000, orders: 240, aov: 2580 },
    { label: 'Week 3', rev: 58000, orders: 210, aov: 2760 },
    { label: 'Week 4', rev: 80890, orders: 310, aov: 2609 },
  ];

  // Sales by Category
  const menCount = products.filter(p => p.gender === 'men').length;
  const womenCount = products.filter(p => p.gender === 'women').length;
  const kidsCount = products.filter(p => p.gender === 'kids').length;
  const totalCat = menCount + womenCount + kidsCount;

  const menPct = Math.round((menCount / totalCat) * 100);
  const womenPct = Math.round((womenCount / totalCat) * 100);
  const kidsPct = 100 - menPct - womenPct;

  // Top Selling Products
  const topProducts = products
    .filter(p => p.isBestSeller || p.rating >= 4.8)
    .slice(0, 5);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300';
      case 'Shipped':
        return 'bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-950/40 dark:text-blue-300';
      case 'Processing':
        return 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300';
      case 'Confirmed':
        return 'bg-purple-50 text-purple-800 border-purple-300 dark:bg-purple-950/40 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      
      {/* 6 High-Level Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        
        {/* Card 1: TOTAL SALES */}
        <div className="bg-white dark:bg-[#1E1E1E] p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-[10px] font-bold tracking-widest uppercase">Total Sales</span>
            <TrendingUp className="w-4 h-4 text-[#B08D57]" />
          </div>
          <div className="mt-2">
            <h3 className="text-xl font-bold font-serif text-[#111111] dark:text-white">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </h3>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5 mt-1">
              +12.5% from last month
            </span>
          </div>
        </div>

        {/* Card 2: TOTAL ORDERS */}
        <div className="bg-white dark:bg-[#1E1E1E] p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-[10px] font-bold tracking-widest uppercase">Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-[#B08D57]" />
          </div>
          <div className="mt-2">
            <h3 className="text-xl font-bold font-serif text-[#111111] dark:text-white">
              {totalOrdersCount.toLocaleString('en-IN')}
            </h3>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5 mt-1">
              +8.2% vs target
            </span>
          </div>
        </div>

        {/* Card 3: TOTAL PRODUCTS */}
        <div className="bg-white dark:bg-[#1E1E1E] p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-[10px] font-bold tracking-widest uppercase">Catalog Count</span>
            <Shirt className="w-4 h-4 text-[#B08D57]" />
          </div>
          <div className="mt-2">
            <h3 className="text-xl font-bold font-serif text-[#111111] dark:text-white">
              {totalProductsCount} Styles
            </h3>
            <span className="text-[10px] text-[#666666] dark:text-[#AAAAAA] font-medium mt-1 block">
              Men, Women & Kids
            </span>
          </div>
        </div>

        {/* Card 4: TOTAL CUSTOMERS */}
        <div className="bg-white dark:bg-[#1E1E1E] p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-[10px] font-bold tracking-widest uppercase">Customers</span>
            <Users className="w-4 h-4 text-[#B08D57]" />
          </div>
          <div className="mt-2">
            <h3 className="text-xl font-bold font-serif text-[#111111] dark:text-white">
              {totalCustomersCount.toLocaleString('en-IN')}
            </h3>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5 mt-1">
              +14.3% new users
            </span>
          </div>
        </div>

        {/* Card 5: LOW STOCK PRODUCTS */}
        <div 
          onClick={() => navigate('/admin/inventory')}
          className="bg-white dark:bg-[#1E1E1E] p-5 border border-rose-200 dark:border-rose-900/50 shadow-xs cursor-pointer hover:bg-rose-50/20"
        >
          <div className="flex items-center justify-between text-rose-600">
            <span className="text-[10px] font-bold tracking-widest uppercase">Low Stock</span>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="mt-2">
            <h3 className="text-xl font-bold font-serif text-rose-600">
              {lowStockCount} Items
            </h3>
            <span className="text-[10px] text-rose-700 dark:text-rose-400 font-semibold mt-1 block">
              Requires immediate restock &rarr;
            </span>
          </div>
        </div>

        {/* Card 6: PENDING ORDERS */}
        <div 
          onClick={() => navigate('/admin/orders')}
          className="bg-white dark:bg-[#1E1E1E] p-5 border border-amber-200 dark:border-amber-900/50 shadow-xs cursor-pointer hover:bg-amber-50/20"
        >
          <div className="flex items-center justify-between text-amber-600">
            <span className="text-[10px] font-bold tracking-widest uppercase">Pending Orders</span>
            <Clock className="w-4 h-4" />
          </div>
          <div className="mt-2">
            <h3 className="text-xl font-bold font-serif text-amber-600">
              {pendingOrdersCount} To Process
            </h3>
            <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold mt-1 block">
              Ready for dispatch &rarr;
            </span>
          </div>
        </div>

      </div>

      {/* Interactive Sales Analytics & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sales Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-[#1E1E1E] p-6 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#B08D57]">
                Revenue Performance
              </span>
              <h3 className="font-serif text-xl font-bold text-[#111111] dark:text-white uppercase">
                Sales Analytics
              </h3>
            </div>

            {/* Date Filters */}
            <div className="flex items-center gap-1 bg-[#F7F7F7] dark:bg-[#252525] p-1 border border-[#E5E5E5] dark:border-[#383838] text-xs">
              {(['7d', '30d', '3m', '1y'] as const).map(range => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-3 py-1 font-semibold uppercase tracking-wider transition-colors ${
                    dateRange === range
                      ? 'bg-[#111111] dark:bg-[#B08D57] text-white'
                      : 'text-[#666666] dark:text-[#AAAAAA] hover:text-[#111111] dark:hover:text-white'
                  }`}
                >
                  {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '3m' ? '3 Months' : '1 Year'}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Responsive Bar & Area Chart */}
          <div className="h-64 w-full flex items-end justify-between gap-4 pt-6 px-4 pb-2 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            {chartData.map((d, i) => {
              const maxVal = 100000;
              const barHeightPct = Math.round((d.rev / maxVal) * 100);

              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[11px] font-bold text-[#111111] dark:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    ₹{(d.rev / 1000).toFixed(1)}k
                  </span>
                  <div className="w-full max-w-[48px] bg-[#F7F7F7] dark:bg-[#2A2A2A] h-full flex items-end">
                    <div 
                      className="w-full bg-[#111111] dark:bg-[#B08D57] group-hover:bg-[#B08D57] transition-all duration-500"
                      style={{ height: `${barHeightPct}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-[#888888] tracking-wider uppercase">
                    {d.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-3 gap-4 text-center pt-2 text-xs">
            <div>
              <span className="text-[10px] text-[#888888] uppercase block">Total Period Revenue</span>
              <strong className="text-base font-bold text-[#111111] dark:text-white font-serif">₹2,45,890</strong>
            </div>
            <div>
              <span className="text-[10px] text-[#888888] uppercase block">Avg Order Value (AOV)</span>
              <strong className="text-base font-bold text-[#111111] dark:text-white font-serif">₹2,610</strong>
            </div>
            <div>
              <span className="text-[10px] text-[#888888] uppercase block">Conversion Rate</span>
              <strong className="text-base font-bold text-emerald-600 dark:text-emerald-400 font-serif">3.4%</strong>
            </div>
          </div>

        </div>

        {/* Sales By Department (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#1E1E1E] p-6 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs space-y-6">
          <div className="pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#B08D57]">
              Demographics
            </span>
            <h3 className="font-serif text-xl font-bold text-[#111111] dark:text-white uppercase">
              Sales By Category
            </h3>
          </div>

          {/* Department Breakdown Bars */}
          <div className="space-y-5 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1.5 text-[#111111] dark:text-white">
                <span>WOMEN'S APPAREL</span>
                <span>{womenPct}% (₹1,32,000)</span>
              </div>
              <div className="w-full h-2 bg-[#F0F0F0] dark:bg-[#2A2A2A]">
                <div className="h-full bg-[#B08D57]" style={{ width: `${womenPct}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1.5 text-[#111111] dark:text-white">
                <span>MEN'S COLLECTION</span>
                <span>{menPct}% (₹88,400)</span>
              </div>
              <div className="w-full h-2 bg-[#F0F0F0] dark:bg-[#2A2A2A]">
                <div className="h-full bg-[#111111] dark:bg-white" style={{ width: `${menPct}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1.5 text-[#111111] dark:text-white">
                <span>KIDS' WEAR</span>
                <span>{kidsPct}% (₹25,490)</span>
              </div>
              <div className="w-full h-2 bg-[#F0F0F0] dark:bg-[#2A2A2A]">
                <div className="h-full bg-amber-600" style={{ width: `${kidsPct}%` }} />
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-xs text-[#555555] dark:text-[#CCCCCC] leading-relaxed">
            Women's festive collections (Banarasi sarees and Chanderi suits) drove <strong>54%</strong> of revenue over the last 30 days.
          </div>
        </div>

      </div>

      {/* Top Selling Products & Recent Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Top Selling Products (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#1E1E1E] p-6 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <h3 className="font-serif text-lg font-bold text-[#111111] dark:text-white uppercase">
              Top Selling Garments
            </h3>
            <button
              onClick={() => navigate('/admin/products')}
              className="text-xs font-semibold text-[#B08D57] hover:underline"
            >
              View All &rarr;
            </button>
          </div>

          <div className="divide-y divide-[#F0F0F0] dark:divide-[#2A2A2A]">
            {topProducts.map(p => (
              <div key={p.id} className="py-3 first:pt-0 flex items-center gap-3">
                <img src={p.images[0]} alt="" className="w-12 h-16 object-cover border border-[#E5E5E5] dark:border-[#383838]" />
                <div className="flex-1 text-xs">
                  <h4 className="font-semibold text-[#111111] dark:text-white line-clamp-1">{p.name}</h4>
                  <span className="text-[10px] text-[#888888] uppercase">{p.gender} &bull; {p.category}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-[#111111] dark:text-white">₹{p.price.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] text-[#666666] dark:text-[#AAAAAA]">Stock: {p.stock}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#1E1E1E] p-6 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <h3 className="font-serif text-lg font-bold text-[#111111] dark:text-white uppercase">
              Recent Orders
            </h3>
            <button
              onClick={() => navigate('/admin/orders')}
              className="text-xs font-semibold text-[#B08D57] hover:underline"
            >
              Manage Orders &rarr;
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F7F7F7] dark:bg-[#252525] text-[#888888] uppercase tracking-wider text-[10px]">
                  <th className="p-2.5">Order ID</th>
                  <th className="p-2.5">Customer</th>
                  <th className="p-2.5">Amount</th>
                  <th className="p-2.5">Status</th>
                  <th className="p-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F0F0] dark:divide-[#2A2A2A]">
                {orders.slice(0, 5).map(o => (
                  <tr key={o.id} className="hover:bg-[#FAFAFA] dark:hover:bg-[#252525]">
                    <td className="p-2.5 font-mono font-bold text-[#111111] dark:text-white">{o.id}</td>
                    <td className="p-2.5 text-[#555555] dark:text-[#CCCCCC]">{o.customer.name}</td>
                    <td className="p-2.5 font-serif font-bold text-[#111111] dark:text-white">₹{o.total.toLocaleString('en-IN')}</td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase border ${getStatusBadge(o.status)}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="p-2.5 text-right">
                      <select
                        value={o.status}
                        onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                        className="text-[11px] font-medium bg-white dark:bg-[#2A2A2A] border border-[#E5E5E5] dark:border-[#444444] px-1.5 py-1 outline-none cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};

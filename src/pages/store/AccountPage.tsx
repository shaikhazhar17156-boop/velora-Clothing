import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter } from '../../context/NavigationContext';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Ruler, 
  RotateCcw, 
  LogOut, 
  CheckCircle, 
  Clock, 
  Truck, 
  X,
  ExternalLink
} from 'lucide-react';
import { Order, OrderStatus } from '../../types';

export const AccountPage: React.FC = () => {
  const { currentCustomer, updateCustomerProfile, orders, wishlist, addToast } = useStore();
  const { navigate } = useRouter();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'sizes' | 'returns'>('orders');
  
  // Track modal
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);

  // Profile form
  const [name, setName] = useState(currentCustomer.name);
  const [email, setEmail] = useState(currentCustomer.email);
  const [phone, setPhone] = useState(currentCustomer.phone);

  // Saved Sizes
  const [menTop, setMenTop] = useState(currentCustomer.savedSizes?.menTop || 'L');
  const [menBottom, setMenBottom] = useState(currentCustomer.savedSizes?.menBottom || '32');
  const [womenTop, setWomenTop] = useState(currentCustomer.savedSizes?.womenTop || 'M');
  const [womenBottom, setWomenBottom] = useState(currentCustomer.savedSizes?.womenBottom || '28');
  const [kidsAge, setKidsAge] = useState(currentCustomer.savedSizes?.kidsAge || '4-5Y');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomerProfile({ name, email, phone });
  };

  const handleSaveSizes = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomerProfile({
      savedSizes: { menTop, menBottom, womenTop, womenBottom, kidsAge }
    });
    addToast('Your preferred fit profile has been saved!', 'success');
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Shipped':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Processing':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Confirmed':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'Cancelled':
      case 'Returned':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Banner */}
        <div className="bg-white p-6 sm:p-8 border border-[#E5E5E5] mb-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#111111] text-white flex items-center justify-center font-serif text-xl font-bold">
              {currentCustomer.name.charAt(0)}
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#B08D57] uppercase">
                VELORA Concierge Member
              </span>
              <h1 className="font-serif text-2xl font-bold text-[#111111]">
                {currentCustomer.name}
              </h1>
              <p className="text-xs text-[#666666]">{currentCustomer.email} &bull; {currentCustomer.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin')}
              className="px-3.5 py-1.5 bg-[#F7F7F7] border border-[#E5E5E5] text-xs font-semibold text-[#111111] hover:border-[#B08D57]"
            >
              Open Admin Portal &rarr;
            </button>
          </div>
        </div>

        {/* 2-Column Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar (3-4 cols) */}
          <div className="lg:col-span-3 bg-white border border-[#E5E5E5] shadow-xs divide-y divide-[#F0F0F0]">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full px-5 py-3.5 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-left transition-colors ${
                activeTab === 'orders' ? 'bg-[#111111] text-white' : 'text-[#111111] hover:bg-[#F7F7F7]'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Orders & Tracking</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full px-5 py-3.5 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-left transition-colors ${
                activeTab === 'profile' ? 'bg-[#111111] text-white' : 'text-[#111111] hover:bg-[#F7F7F7]'
              }`}
            >
              <User className="w-4 h-4" />
              <span>My Profile</span>
            </button>

            <button
              onClick={() => navigate('/wishlist')}
              className="w-full px-5 py-3.5 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-left text-[#111111] hover:bg-[#F7F7F7] transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span>Wishlist ({wishlist.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full px-5 py-3.5 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-left transition-colors ${
                activeTab === 'addresses' ? 'bg-[#111111] text-white' : 'text-[#111111] hover:bg-[#F7F7F7]'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Delivery Addresses</span>
            </button>

            <button
              onClick={() => setActiveTab('sizes')}
              className={`w-full px-5 py-3.5 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-left transition-colors ${
                activeTab === 'sizes' ? 'bg-[#111111] text-white' : 'text-[#111111] hover:bg-[#F7F7F7]'
              }`}
            >
              <Ruler className="w-4 h-4" />
              <span>Saved Sizes Profile</span>
            </button>

            <button
              onClick={() => setActiveTab('returns')}
              className={`w-full px-5 py-3.5 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-left transition-colors ${
                activeTab === 'returns' ? 'bg-[#111111] text-white' : 'text-[#111111] hover:bg-[#F7F7F7]'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Returns & Support</span>
            </button>
          </div>

          {/* Right: Content View (9 cols) */}
          <div className="lg:col-span-9 bg-white p-6 sm:p-8 border border-[#E5E5E5] shadow-xs">
            
            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="pb-3 border-b border-[#E5E5E5]">
                  <h3 className="font-serif text-xl font-bold uppercase tracking-wider text-[#111111]">
                    Order History & Live Tracking
                  </h3>
                  <p className="text-xs text-[#666666] mt-0.5">
                    View real-time status, courier tracking, and tax invoices.
                  </p>
                </div>

                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order.id} className="border border-[#E5E5E5] p-5 space-y-4 hover:border-gray-400 transition-colors">
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#F0F0F0] text-xs">
                          <div>
                            <span className="text-[#888888]">Order ID: </span>
                            <strong className="font-mono text-[#111111]">{order.id}</strong>
                            <span className="text-[#888888] ml-2">Placed: {order.date}</span>
                          </div>
                          <span className={`px-2.5 py-0.5 text-[11px] font-bold uppercase border ${getStatusBadge(order.status)}`}>
                            {order.status}
                          </span>
                        </div>

                        {/* Items */}
                        <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 text-xs">
                              <img src={item.image} alt="" className="w-12 h-16 object-cover border border-[#E5E5E5]" />
                              <div className="flex-1">
                                <h5 className="font-medium text-[#111111]">{item.name}</h5>
                                <p className="text-[11px] text-[#666666]">
                                  Size: {item.size} &bull; Color: {item.color} &bull; Qty: {item.quantity}
                                </p>
                              </div>
                              <span className="font-bold text-[#111111]">
                                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-[#F0F0F0] text-xs">
                          <div>
                            <span className="text-[#888888]">Total: </span>
                            <strong className="text-sm font-serif font-bold text-[#111111]">
                              ₹{order.total.toLocaleString('en-IN')}
                            </strong>
                          </div>

                          <button
                            onClick={() => setTrackingOrder(order)}
                            className="px-4 py-2 bg-[#111111] hover:bg-[#B08D57] text-white text-[11px] font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>Track Order Timeline</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#888888] italic py-8 text-center">
                    No orders placed yet.
                  </p>
                )}
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
                <div className="pb-3 border-b border-[#E5E5E5]">
                  <h3 className="font-serif text-xl font-bold uppercase tracking-wider text-[#111111]">
                    Personal Information
                  </h3>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E5E5E5] outline-none focus:border-[#111111]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E5E5E5] outline-none focus:border-[#111111]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-1">
                    Mobile Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E5E5E5] outline-none focus:border-[#111111]"
                    required
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#111111] hover:bg-[#B08D57] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <div className="pb-3 border-b border-[#E5E5E5] flex items-center justify-between">
                  <h3 className="font-serif text-xl font-bold uppercase tracking-wider text-[#111111]">
                    Saved Delivery Addresses
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentCustomer.addresses.map((addr) => (
                    <div key={addr.id} className="p-4 border border-[#E5E5E5] bg-[#F7F7F7] space-y-1 text-xs">
                      <div className="flex items-center justify-between mb-2">
                        <strong className="text-xs uppercase tracking-wide">{addr.name}</strong>
                        {addr.isDefault && (
                          <span className="text-[10px] bg-[#B08D57] text-white px-2 py-0.5 font-bold uppercase">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-[#333333] font-medium">{currentCustomer.name}</p>
                      <p className="text-[#666666]">{addr.street}</p>
                      <p className="text-[#666666]">{addr.city}, {addr.state} - {addr.pincode}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SAVED SIZES TAB */}
            {activeTab === 'sizes' && (
              <form onSubmit={handleSaveSizes} className="space-y-4 max-w-lg">
                <div className="pb-3 border-b border-[#E5E5E5]">
                  <h3 className="font-serif text-xl font-bold uppercase tracking-wider text-[#111111]">
                    Saved Sizing Profile
                  </h3>
                  <p className="text-xs text-[#666666] mt-0.5">
                    Save your preferred sizing so we can highlight optimal garments while you browse.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-1">
                      Men's Top Size
                    </label>
                    <select
                      value={menTop}
                      onChange={(e) => setMenTop(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#E5E5E5] outline-none"
                    >
                      <option value="S">Small (S / 38)</option>
                      <option value="M">Medium (M / 40)</option>
                      <option value="L">Large (L / 42)</option>
                      <option value="XL">Extra Large (XL / 44)</option>
                      <option value="XXL">XXL (46)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-1">
                      Men's Trousers Waist
                    </label>
                    <select
                      value={menBottom}
                      onChange={(e) => setMenBottom(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#E5E5E5] outline-none"
                    >
                      <option value="30">30 Inches</option>
                      <option value="32">32 Inches</option>
                      <option value="34">34 Inches</option>
                      <option value="36">36 Inches</option>
                      <option value="38">38 Inches</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-1">
                      Women's Top / Kurta Size
                    </label>
                    <select
                      value={womenTop}
                      onChange={(e) => setWomenTop(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#E5E5E5] outline-none"
                    >
                      <option value="XS">Extra Small (XS / 32)</option>
                      <option value="S">Small (S / 34)</option>
                      <option value="M">Medium (M / 36)</option>
                      <option value="L">Large (L / 38)</option>
                      <option value="XL">Extra Large (XL / 40)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-1">
                      Kids' Age Bracket
                    </label>
                    <select
                      value={kidsAge}
                      onChange={(e) => setKidsAge(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#E5E5E5] outline-none"
                    >
                      <option value="2-3Y">2-3 Years</option>
                      <option value="4-5Y">4-5 Years</option>
                      <option value="6-7Y">6-7 Years</option>
                      <option value="8-9Y">8-9 Years</option>
                      <option value="10-11Y">10-11 Years</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#111111] hover:bg-[#B08D57] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Save Size Preferences
                  </button>
                </div>
              </form>
            )}

            {/* RETURNS TAB */}
            {activeTab === 'returns' && (
              <div className="space-y-4">
                <div className="pb-3 border-b border-[#E5E5E5]">
                  <h3 className="font-serif text-xl font-bold uppercase tracking-wider text-[#111111]">
                    Returns & Exchanges
                  </h3>
                  <p className="text-xs text-[#666666] mt-0.5">
                    We offer 7-day hassle-free door-to-door exchanges for size or fit reasons.
                  </p>
                </div>

                <div className="p-4 bg-[#F9F5EE] border border-[#B08D57] space-y-2 text-xs">
                  <h4 className="font-bold text-[#111111] uppercase">How To Initiate A Return</h4>
                  <p className="text-[#555555]">
                    1. Garments must have original tags intact and remain unworn.<br />
                    2. Select the eligible order from your Order History and request a size swap or return pickup.<br />
                    3. Our courier will collect the package directly from your address.
                  </p>
                  <p className="font-semibold text-[#111111] pt-1">
                    Concierge Hotline: 1800 200 8989 (Mon-Sat 10AM-8PM)
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Track Order Timeline Modal */}
      {trackingOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white border border-[#E5E5E5] shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setTrackingOrder(null)}
              className="absolute top-4 right-4 text-[#666666] hover:text-[#111111]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 pb-4 border-b border-[#E5E5E5]">
              <span className="text-[10px] font-bold tracking-widest text-[#B08D57] uppercase">
                Shipment Tracker
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#111111]">
                Order #{trackingOrder.id}
              </h3>
              <p className="text-xs text-[#666666]">
                Estimated Delivery: <strong>{trackingOrder.estimatedDelivery}</strong>
              </p>
            </div>

            {/* Stepper Timeline */}
            <div className="py-6 space-y-6">
              {trackingOrder.timeline.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start relative">
                  <div className="w-7 h-7 rounded-full bg-[#111111] text-white flex items-center justify-center shrink-0 z-10 text-xs">
                    <CheckCircle className="w-4 h-4 text-[#B08D57]" />
                  </div>
                  {idx !== trackingOrder.timeline.length - 1 && (
                    <div className="absolute left-3.5 top-7 bottom-0 w-0.5 bg-[#E5E5E5] -mb-6" />
                  )}
                  <div className="text-xs space-y-0.5">
                    <div className="flex items-center gap-2">
                      <strong className="text-sm text-[#111111]">{step.status}</strong>
                      <span className="text-[10px] text-[#888888]">{step.date}</span>
                    </div>
                    <p className="text-[#666666]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E5E5E5] flex justify-end">
              <button
                onClick={() => setTrackingOrder(null)}
                className="px-5 py-2 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#B08D57]"
              >
                Close Tracker
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

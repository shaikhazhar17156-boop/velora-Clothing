import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter } from '../../context/NavigationContext';
import { CheckCircle2, Package, Truck, ArrowRight, Home } from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const { params, navigate } = useRouter();
  const { orders } = useStore();

  const orderId = params.orderId;
  const order = orders.find(o => o.id === orderId) || orders[0];

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Success Card */}
        <div className="bg-white p-8 sm:p-12 border border-[#E5E5E5] shadow-sm text-center space-y-6">
          
          <div className="w-16 h-16 bg-[#F9F5EE] border border-[#B08D57] rounded-full flex items-center justify-center mx-auto text-[#B08D57]">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#B08D57] uppercase">
              Order Confirmation
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111] uppercase tracking-wide">
              ORDER PLACED SUCCESSFULLY
            </h1>
            <p className="text-xs sm:text-sm text-[#666666]">
              Thank you for shopping with VELORA. We have received your order and our master tailors are preparing it.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="bg-[#F7F7F7] p-5 border border-[#E5E5E5] grid grid-cols-2 sm:grid-cols-3 gap-4 text-left text-xs">
            <div>
              <span className="text-[#888888] block text-[10px] uppercase font-bold">Order ID</span>
              <strong className="text-sm font-mono text-[#111111] font-semibold">{order.id}</strong>
            </div>
            <div>
              <span className="text-[#888888] block text-[10px] uppercase font-bold">Estimated Delivery</span>
              <strong className="text-sm text-[#111111]">{order.estimatedDelivery}</strong>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[#888888] block text-[10px] uppercase font-bold">Total Paid</span>
              <strong className="text-sm font-serif text-[#111111]">₹{order.total.toLocaleString('en-IN')}</strong>
            </div>
          </div>

          {/* Shipping Summary */}
          <div className="text-left border border-[#E5E5E5] p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] pb-2 border-b border-[#E5E5E5]">
              Shipping Address
            </h4>
            <div className="text-xs text-[#555555] leading-relaxed">
              <p className="font-bold text-[#111111]">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
              <p>Phone: {order.shippingAddress.phone}</p>
            </div>
          </div>

          {/* Items Summary */}
          <div className="text-left border border-[#E5E5E5] p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] pb-2 border-b border-[#E5E5E5]">
              Purchased Garments ({order.items.length})
            </h4>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs">
                  <img src={item.image} alt="" className="w-12 h-16 object-cover border border-[#E5E5E5]" />
                  <div className="flex-1">
                    <h5 className="font-medium text-[#111111]">{item.name}</h5>
                    <p className="text-[11px] text-[#666666]">Size: {item.size} &bull; Color: {item.color} &bull; Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-[#111111]">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/account')}
              className="px-6 py-3.5 bg-[#111111] hover:bg-[#B08D57] text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Package className="w-4 h-4" />
              <span>TRACK ORDER STATUS</span>
            </button>

            <button
              onClick={() => navigate('/men')}
              className="px-6 py-3.5 bg-white border border-[#111111] hover:bg-[#F7F7F7] text-[#111111] text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>CONTINUE SHOPPING</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

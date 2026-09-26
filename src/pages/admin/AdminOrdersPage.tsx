import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter } from '../../context/NavigationContext';
import { 
  Search, 
  ShoppingBag, 
  Clock, 
  Truck, 
  CheckCircle, 
  X, 
  Eye, 
  FileText,
  Filter
} from 'lucide-react';
import { Order, OrderStatus } from '../../types';

export const AdminOrdersPage: React.FC = () => {
  const { orders, updateOrderStatus } = useStore();
  const { navigate } = useRouter();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<OrderStatus>('Processing');
  const [statusNote, setStatusNote] = useState('');

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      if (statusFilter !== 'all' && o.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          o.id.toLowerCase().includes(q) ||
          o.customer.name.toLowerCase().includes(q) ||
          o.customer.email.toLowerCase().includes(q) ||
          o.customer.phone.includes(q)
        );
      }
      return true;
    });
  }, [orders, statusFilter, searchQuery]);

  const handleOpenStatusModal = (order: Order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setStatusNote('');
    setIsUpdateModalOpen(true);
  };

  const handleConfirmStatusUpdate = () => {
    if (selectedOrder) {
      updateOrderStatus(selectedOrder.id, newStatus, statusNote);
      setIsUpdateModalOpen(false);
    }
  };

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
      case 'Cancelled':
      case 'Returned':
        return 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div>
          <h2 className="font-serif text-2xl font-bold uppercase tracking-wider text-[#111111] dark:text-white">
            Order Management ({filteredOrders.length})
          </h2>
          <p className="text-xs text-[#666666] dark:text-[#AAAAAA]">
            Track fulfillment, update shipment milestones, and view invoice details.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-[#1E1E1E] p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs flex flex-wrap items-center gap-3">
        
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID, customer, email, phone..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] outline-none text-[#111111] dark:text-white"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-xs bg-white dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] outline-none text-[#111111] dark:text-white"
        >
          <option value="all">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Returned">Returned</option>
        </select>

      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F7F7F7] dark:bg-[#252525] text-[#888888] uppercase tracking-wider text-[10px]">
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Fulfillment Status</th>
                <th className="p-3">Placed Date</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0F0] dark:divide-[#2A2A2A]">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-[#FAFAFA] dark:hover:bg-[#242424] transition-colors">
                  <td className="p-3 font-mono font-bold text-[#111111] dark:text-white">
                    {order.id}
                  </td>
                  <td className="p-3">
                    <span className="font-semibold text-[#111111] dark:text-white block">{order.customer.name}</span>
                    <span className="text-[10px] text-[#888888] block">{order.customer.phone}</span>
                  </td>
                  <td className="p-3 text-[#555555] dark:text-[#CCCCCC]">
                    {order.items.length} garments
                  </td>
                  <td className="p-3 font-serif font-bold text-[#111111] dark:text-white">
                    ₹{order.total.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3 uppercase text-[10px] font-bold text-[#666666] dark:text-[#AAAAAA]">
                    {order.paymentMethod} &bull; {order.paymentStatus}
                  </td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase border ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 text-[#888888]">
                    {order.date}
                  </td>
                  <td className="p-3 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-2.5 py-1 bg-[#F7F7F7] dark:bg-[#2A2A2A] border border-[#E5E5E5] dark:border-[#383838] hover:border-[#B08D57] text-[#111111] dark:text-white text-[11px] font-semibold"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => handleOpenStatusModal(order)}
                        className="px-2.5 py-1 bg-[#111111] dark:bg-[#B08D57] hover:bg-[#B08D57] text-white text-[11px] font-bold uppercase tracking-wider"
                      >
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Order Details Modal */}
      {selectedOrder && !isUpdateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#333333] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 text-[#888888] hover:text-[#111111] dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pb-4 border-b border-[#E5E5E5] dark:border-[#333333]">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#B08D57]">
                Order Details
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#111111] dark:text-white">
                #{selectedOrder.id}
              </h3>
              <p className="text-xs text-[#666666] dark:text-[#AAAAAA]">
                Placed on {selectedOrder.date} &bull; Payment via {selectedOrder.paymentMethod.toUpperCase()} ({selectedOrder.paymentStatus})
              </p>
            </div>

            {/* Customer & Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-b border-[#E5E5E5] dark:border-[#333333] text-xs">
              <div>
                <strong className="text-[11px] uppercase font-bold text-[#111111] dark:text-white block mb-1">
                  Customer
                </strong>
                <p className="text-[#444444] dark:text-[#CCCCCC]">{selectedOrder.customer.name}</p>
                <p className="text-[#666666] dark:text-[#AAAAAA]">{selectedOrder.customer.email}</p>
                <p className="text-[#666666] dark:text-[#AAAAAA]">{selectedOrder.customer.phone}</p>
              </div>
              <div>
                <strong className="text-[11px] uppercase font-bold text-[#111111] dark:text-white block mb-1">
                  Shipping Destination
                </strong>
                <p className="text-[#444444] dark:text-[#CCCCCC]">{selectedOrder.shippingAddress.street}</p>
                <p className="text-[#666666] dark:text-[#AAAAAA]">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}</p>
              </div>
            </div>

            {/* Item list */}
            <div className="py-4 space-y-3">
              <strong className="text-xs uppercase font-bold text-[#111111] dark:text-white block">
                Purchased Garments
              </strong>
              {selectedOrder.items.map((it, i) => (
                <div key={i} className="flex items-center gap-3 text-xs">
                  <img src={it.image} alt="" className="w-12 h-16 object-cover border border-[#E5E5E5] dark:border-[#383838]" />
                  <div className="flex-1">
                    <h5 className="font-semibold text-[#111111] dark:text-white">{it.name}</h5>
                    <p className="text-[11px] text-[#888888]">Size: {it.size} &bull; Color: {it.color} &bull; Qty: {it.quantity}</p>
                  </div>
                  <span className="font-bold text-[#111111] dark:text-white">
                    ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Grand Total & Timeline */}
            <div className="pt-4 border-t border-[#E5E5E5] dark:border-[#333333] flex justify-between items-center text-xs">
              <span className="font-bold text-sm text-[#111111] dark:text-white">
                Grand Total: ₹{selectedOrder.total.toLocaleString('en-IN')}
              </span>
              <button
                onClick={() => handleOpenStatusModal(selectedOrder)}
                className="px-4 py-2 bg-[#111111] dark:bg-[#B08D57] text-white text-xs font-bold uppercase tracking-wider"
              >
                Change Fulfillment Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Status Modal */}
      {isUpdateModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#333333] shadow-2xl p-6">
            <h3 className="font-serif text-lg font-bold text-[#111111] dark:text-white uppercase mb-4">
              Update Status for #{selectedOrder.id}
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
                  Target Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                  className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing (Quality inspection & packing)</option>
                  <option value="Shipped">Shipped (Dispatched with courier)</option>
                  <option value="Delivered">Delivered (Handed to customer)</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Returned">Returned</option>
                </select>
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider block mb-1 text-[#111111] dark:text-white">
                  Timeline Milestone Note
                </label>
                <input
                  type="text"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="e.g. Dispatched with BlueDart AWB: 991823"
                  className="w-full px-3 py-2 bg-[#F7F7F7] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#383838] text-[#111111] dark:text-white outline-none"
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E5E5E5] dark:border-[#333333] flex justify-end gap-2">
              <button
                onClick={() => setIsUpdateModalOpen(false)}
                className="px-4 py-2 border border-[#E5E5E5] dark:border-[#383838] text-xs font-semibold uppercase"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmStatusUpdate}
                className="px-5 py-2 bg-[#111111] dark:bg-[#B08D57] text-white text-xs font-bold uppercase tracking-wider"
              >
                Save Status
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

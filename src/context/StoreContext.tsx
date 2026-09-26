import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  WishlistItem, 
  Order, 
  Customer, 
  Coupon, 
  Review, 
  Banner, 
  AdminNotification, 
  StoreSettings, 
  OrderStatus 
} from '../types';
import { initialProducts } from '../data/initialProducts';
import { 
  initialOrders, 
  initialCustomers, 
  initialCoupons, 
  initialReviews, 
  initialBanners, 
  initialNotifications, 
  initialSettings 
} from '../data/initialData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface StoreContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Product;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: { name: string; hex: string }, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartSavings: number;
  cartDeliveryFee: number;
  cartTotal: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  cartCount: number;

  // Wishlist
  wishlist: WishlistItem[];
  toggleWishlist: (productId: string) => boolean;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;

  // Orders
  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'date' | 'timeline' | 'estimatedDelivery'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  getOrderById: (orderId: string) => Order | undefined;

  // Customers
  customers: Customer[];
  currentCustomer: Customer;
  updateCustomerProfile: (data: Partial<Customer>) => void;

  // Coupons
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  updateCoupon: (code: string, coupon: Partial<Coupon>) => void;
  deleteCoupon: (code: string) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'status'>) => void;
  updateReviewStatus: (id: string, status: 'Approved' | 'Hidden' | 'Pending') => void;
  deleteReview: (id: string) => void;

  // Banners
  banners: Banner[];
  updateBanner: (id: string, banner: Partial<Banner>) => void;
  addBanner: (banner: Omit<Banner, 'id'>) => void;
  deleteBanner: (id: string) => void;

  // Admin Notifications
  notifications: AdminNotification[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  deleteNotification: (id: string) => void;

  // Settings
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;

  // UI Modals
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  sizeGuideDepartment: 'men' | 'women' | 'kids';
  setSizeGuideDepartment: (dept: 'men' | 'women' | 'kids') => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // Search overlay
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with localStorage fallbacks
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('velora_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('velora_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('velora_wishlist');
    return saved ? JSON.parse(saved) : [
      { productId: 'men-1', addedAt: new Date().toISOString() },
      { productId: 'women-1', addedAt: new Date().toISOString() }
    ];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('velora_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('velora_customers');
    return saved ? JSON.parse(saved) : initialCustomers;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('velora_coupons');
    return saved ? JSON.parse(saved) : initialCoupons;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('velora_reviews');
    return saved ? JSON.parse(saved) : initialReviews;
  });

  const [banners, setBanners] = useState<Banner[]>(() => {
    const saved = localStorage.getItem('velora_banners');
    return saved ? JSON.parse(saved) : initialBanners;
  });

  const [notifications, setNotifications] = useState<AdminNotification[]>(() => {
    const saved = localStorage.getItem('velora_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('velora_settings');
    return saved ? JSON.parse(saved) : initialSettings;
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [sizeGuideDepartment, setSizeGuideDepartment] = useState<'men' | 'women' | 'kids'>('men');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('velora_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('velora_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('velora_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('velora_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('velora_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('velora_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('velora_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('velora_banners', JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem('velora_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('velora_settings', JSON.stringify(settings));
  }, [settings]);

  // Toast handler
  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Products
  const addProduct = (data: Omit<Product, 'id' | 'createdAt'>): Product => {
    const newId = `${data.gender}-${Date.now().toString().slice(-4)}`;
    const newProduct: Product = {
      ...data,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [newProduct, ...prev]);
    addToast(`"${newProduct.name}" added to catalog`, 'success');
    return newProduct;
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    addToast('Product updated successfully', 'success');
  };

  const deleteProduct = (id: string) => {
    const p = products.find(prod => prod.id === id);
    setProducts(prev => prev.filter(prod => prod.id !== id));
    addToast(`Product "${p?.name || id}" removed`, 'info');
  };

  const getProductById = (id: string) => {
    return products.find(p => p.id === id);
  };

  // Cart logic
  const addToCart = (
    product: Product, 
    size: string, 
    color: { name: string; hex: string }, 
    quantity: number = 1
  ) => {
    const cartItemId = `${product.id}-${size}-${color.name}`;
    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item => 
          item.id === cartItemId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev, 
        {
          id: cartItemId,
          product,
          selectedSize: size,
          selectedColor: color,
          quantity
        }
      ];
    });
    addToast(`Added "${product.name}" (${size}) to bag`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    addToast('Item removed from shopping bag', 'info');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === cartItemId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  const cartSavings = cart.reduce((sum, item) => {
    const itemOriginal = item.product.originalPrice || item.product.price;
    return sum + ((itemOriginal - item.product.price) * item.quantity);
  }, 0);

  const cartDeliveryFee = cartSubtotal >= settings.freeShippingThreshold || cartSubtotal === 0
    ? 0 
    : settings.standardShippingFee;

  let couponDiscount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minOrderAmount) {
    if (appliedCoupon.type === 'percentage') {
      const computed = (cartSubtotal * appliedCoupon.value) / 100;
      couponDiscount = appliedCoupon.maxDiscount ? Math.min(computed, appliedCoupon.maxDiscount) : computed;
    } else {
      couponDiscount = appliedCoupon.value;
    }
  }

  const cartTotal = Math.max(0, cartSubtotal - couponDiscount + cartDeliveryFee);

  const applyCoupon = (code: string) => {
    const found = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase() && c.active);
    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code' };
    }
    if (cartSubtotal < found.minOrderAmount) {
      return { 
        success: false, 
        message: `Minimum order amount of ₹${found.minOrderAmount.toLocaleString('en-IN')} required for this coupon` 
      };
    }
    setAppliedCoupon(found);
    addToast(`Coupon "${found.code}" applied successfully!`, 'success');
    return { success: true, message: 'Coupon applied successfully' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', 'info');
  };

  // Wishlist
  const toggleWishlist = (productId: string): boolean => {
    const exists = wishlist.some(w => w.productId === productId);
    if (exists) {
      setWishlist(prev => prev.filter(w => w.productId !== productId));
      addToast('Removed from Wishlist', 'info');
      return false;
    } else {
      setWishlist(prev => [...prev, { productId, addedAt: new Date().toISOString() }]);
      addToast('Saved to Wishlist', 'success');
      return true;
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(w => w.productId === productId);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(w => w.productId !== productId));
    addToast('Item removed from Wishlist', 'info');
  };

  // Orders
  const placeOrder = (orderData: Omit<Order, 'id' | 'date' | 'timeline' | 'estimatedDelivery'>): Order => {
    const orderId = `VEL-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);
    const estDeliveryStr = deliveryDate.toISOString().split('T')[0];

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      date: dateStr,
      estimatedDelivery: estDeliveryStr,
      timeline: [
        {
          status: 'Confirmed',
          date: `${dateStr} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          description: `Order confirmed and received successfully via ${orderData.paymentMethod.toUpperCase()}`
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();

    // Create Admin notification
    const newNotif: AdminNotification = {
      id: `notif-${Date.now()}`,
      title: 'New Customer Order',
      message: `Order #${orderId} placed by ${newOrder.customer.name} for ₹${newOrder.total.toLocaleString('en-IN')}`,
      type: 'order',
      date: 'Just now',
      read: false,
      link: `/admin/orders`
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    const now = new Date();
    const dateStr = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status,
          timeline: [
            ...order.timeline,
            {
              status,
              date: dateStr,
              description: note || `Order marked as ${status}`
            }
          ]
        };
      }
      return order;
    }));

    addToast(`Order #${orderId} updated to ${status}`, 'success');
  };

  const getOrderById = (orderId: string) => {
    return orders.find(o => o.id === orderId);
  };

  // Customers
  const currentCustomer = customers[0] || initialCustomers[0];

  const updateCustomerProfile = (data: Partial<Customer>) => {
    setCustomers(prev => prev.map((c, idx) => idx === 0 ? { ...c, ...data } : c));
    addToast('Profile updated successfully', 'success');
  };

  // Coupons
  const addCoupon = (coupon: Coupon) => {
    setCoupons(prev => [coupon, ...prev]);
    addToast(`Coupon ${coupon.code} created`, 'success');
  };

  const updateCoupon = (code: string, updatedFields: Partial<Coupon>) => {
    setCoupons(prev => prev.map(c => c.code === code ? { ...c, ...updatedFields } : c));
    addToast(`Coupon ${code} updated`, 'success');
  };

  const deleteCoupon = (code: string) => {
    setCoupons(prev => prev.filter(c => c.code !== code));
    addToast(`Coupon ${code} deleted`, 'info');
  };

  // Reviews
  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'status'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Approved'
    };
    setReviews(prev => [newReview, ...prev]);
    addToast('Thank you for reviewing! Your feedback is published.', 'success');
  };

  const updateReviewStatus = (id: string, status: 'Approved' | 'Hidden' | 'Pending') => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    addToast(`Review marked as ${status}`, 'info');
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
    addToast('Review deleted', 'info');
  };

  // Banners
  const updateBanner = (id: string, updatedFields: Partial<Banner>) => {
    setBanners(prev => prev.map(b => b.id === id ? { ...b, ...updatedFields } : b));
    addToast('Banner updated', 'success');
  };

  const addBanner = (bannerData: Omit<Banner, 'id'>) => {
    const newBanner: Banner = {
      ...bannerData,
      id: `ban-${Date.now()}`
    };
    setBanners(prev => [...prev, newBanner]);
    addToast('New promotional banner created', 'success');
  };

  const deleteBanner = (id: string) => {
    setBanners(prev => prev.filter(b => b.id !== id));
    addToast('Banner removed', 'info');
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addToast('All notifications marked as read', 'info');
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Settings
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    addToast('Store settings saved successfully', 'success');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartSavings,
        cartDeliveryFee,
        cartTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        cartCount,

        wishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,

        orders,
        placeOrder,
        updateOrderStatus,
        getOrderById,

        customers,
        currentCustomer,
        updateCustomerProfile,

        coupons,
        addCoupon,
        updateCoupon,
        deleteCoupon,

        reviews,
        addReview,
        updateReviewStatus,
        deleteReview,

        banners,
        updateBanner,
        addBanner,
        deleteBanner,

        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        deleteNotification,

        settings,
        updateSettings,

        quickViewProduct,
        setQuickViewProduct,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        sizeGuideDepartment,
        setSizeGuideDepartment,

        toasts,
        addToast,
        removeToast,

        isSearchOpen,
        setIsSearchOpen
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

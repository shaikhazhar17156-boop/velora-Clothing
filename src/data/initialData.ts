import { 
  Order, 
  Customer, 
  Coupon, 
  Review, 
  Banner, 
  AdminNotification, 
  StoreSettings 
} from '../types';

export const initialOrders: Order[] = [
  {
    id: 'VEL-89241',
    customer: {
      name: 'Aarav Sharma',
      email: 'aarav.sharma@example.com',
      phone: '+91 98765 43210'
    },
    shippingAddress: {
      fullName: 'Aarav Sharma',
      street: 'Flat 402, Magnolia Enclave, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      country: 'India',
      phone: '+91 98765 43210'
    },
    items: [
      {
        productId: 'men-1',
        name: 'Oversized Supima Cotton Shirt',
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=400&q=80',
        size: 'L',
        color: 'Pure White',
        price: 1899,
        quantity: 1
      },
      {
        productId: 'men-4',
        name: 'Relaxed Pleated Italian Wool-Blend Trousers',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&q=80',
        size: '32',
        color: 'Charcoal Houndstooth',
        price: 3299,
        quantity: 1
      }
    ],
    subtotal: 5198,
    discount: 500,
    couponApplied: 'WELCOME10',
    shippingFee: 0,
    tax: 0,
    total: 4698,
    paymentMethod: 'upi',
    paymentStatus: 'Paid',
    status: 'Shipped',
    date: '2026-09-24',
    estimatedDelivery: '2026-09-27',
    timeline: [
      { status: 'Confirmed', date: '2026-09-24 10:30 AM', description: 'Order confirmed and payment verified via UPI' },
      { status: 'Processing', date: '2026-09-24 02:15 PM', description: 'Packed at Bengaluru central fulfillment center' },
      { status: 'Shipped', date: '2026-09-25 09:00 AM', description: 'Dispatched with BlueDart Express (AWB: 88472910)' }
    ]
  },
  {
    id: 'VEL-89240',
    customer: {
      name: 'Priya Iyer',
      email: 'priya.iyer@example.com',
      phone: '+91 98111 22334'
    },
    shippingAddress: {
      fullName: 'Priya Iyer',
      street: '12-A, Silver Oaks, Malabar Hill',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400006',
      country: 'India',
      phone: '+91 98111 22334'
    },
    items: [
      {
        productId: 'women-1',
        name: 'Chanderi Silk Anarkali Kurta Set with Dupatta',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
        size: 'M',
        color: 'Blush Rose Gold',
        price: 4999,
        quantity: 1
      }
    ],
    subtotal: 4999,
    discount: 0,
    shippingFee: 0,
    tax: 0,
    total: 4999,
    paymentMethod: 'card',
    paymentStatus: 'Paid',
    status: 'Delivered',
    date: '2026-09-21',
    estimatedDelivery: '2026-09-24',
    timeline: [
      { status: 'Confirmed', date: '2026-09-21 11:00 AM', description: 'Order confirmed' },
      { status: 'Processing', date: '2026-09-21 04:00 PM', description: 'Quality inspection passed' },
      { status: 'Shipped', date: '2026-09-22 10:00 AM', description: 'Out with express courier' },
      { status: 'Delivered', date: '2026-09-24 01:20 PM', description: 'Delivered to recipient with OTP confirmation' }
    ]
  },
  {
    id: 'VEL-89239',
    customer: {
      name: 'Vikramaditya Roy',
      email: 'vikram.roy@example.com',
      phone: '+91 99200 88776'
    },
    shippingAddress: {
      fullName: 'Vikramaditya Roy',
      street: 'Villa 14, Palm Meadows, Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560066',
      country: 'India',
      phone: '+91 99200 88776'
    },
    items: [
      {
        productId: 'men-6',
        name: 'Unstructured Linen-Silk Blend Blazer',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80',
        size: '40',
        color: 'Sand Taupe',
        price: 5499,
        quantity: 1
      },
      {
        productId: 'kids-1',
        name: 'Boys Silk Blend Kurta Pyjama Set',
        image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=400&q=80',
        size: '4-5Y',
        color: 'Royal Mustard',
        price: 1699,
        quantity: 1
      }
    ],
    subtotal: 7198,
    discount: 720,
    couponApplied: 'VELORA10',
    shippingFee: 0,
    tax: 0,
    total: 6478,
    paymentMethod: 'netbanking',
    paymentStatus: 'Paid',
    status: 'Processing',
    date: '2026-09-25',
    estimatedDelivery: '2026-09-28',
    timeline: [
      { status: 'Confirmed', date: '2026-09-25 08:15 AM', description: 'Order received and confirmed' },
      { status: 'Processing', date: '2026-09-25 11:30 AM', description: 'Item picked and garment steam pressed' }
    ]
  },
  {
    id: 'VEL-89238',
    customer: {
      name: 'Ananya Deshmukh',
      email: 'ananya.d@example.com',
      phone: '+91 97654 32190'
    },
    shippingAddress: {
      fullName: 'Ananya Deshmukh',
      street: 'Plot 45, Jubilee Hills, Rd No 36',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500033',
      country: 'India',
      phone: '+91 97654 32190'
    },
    items: [
      {
        productId: 'women-4',
        name: 'Handwoven Banarasi Katan Silk Saree',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
        size: 'Free Size (5.5m + 0.8m Blouse Piece)',
        color: 'Royal Crimson Red',
        price: 9499,
        quantity: 1
      }
    ],
    subtotal: 9499,
    discount: 1000,
    couponApplied: 'FESTIVE1000',
    shippingFee: 0,
    tax: 0,
    total: 8499,
    paymentMethod: 'card',
    paymentStatus: 'Paid',
    status: 'Confirmed',
    date: '2026-09-25',
    estimatedDelivery: '2026-09-29',
    timeline: [
      { status: 'Confirmed', date: '2026-09-25 01:45 PM', description: 'Order confirmed and artisan packaging requested' }
    ]
  },
  {
    id: 'VEL-89237',
    customer: {
      name: 'Rohan Mehra',
      email: 'rohan.mehra@example.com',
      phone: '+91 98450 11223'
    },
    shippingAddress: {
      fullName: 'Rohan Mehra',
      street: 'C-77, Defence Colony',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110024',
      country: 'India',
      phone: '+91 98450 11223'
    },
    items: [
      {
        productId: 'men-7',
        name: 'Mercerized Supima Cotton Crewneck Tee',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
        size: 'M',
        color: 'Classic Black',
        price: 999,
        quantity: 2
      }
    ],
    subtotal: 1998,
    discount: 0,
    shippingFee: 0,
    tax: 0,
    total: 1998,
    paymentMethod: 'cod',
    paymentStatus: 'Pending',
    status: 'Pending',
    date: '2026-09-25',
    estimatedDelivery: '2026-09-30',
    timeline: [
      { status: 'Pending', date: '2026-09-25 02:10 PM', description: 'Order placed via Cash on Delivery' }
    ]
  }
];

export const initialCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    addresses: [
      {
        id: 'addr-1',
        name: 'Home',
        street: 'Flat 402, Magnolia Enclave, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560038',
        isDefault: true
      }
    ],
    savedSizes: {
      menTop: 'L',
      menBottom: '32'
    },
    ordersCount: 4,
    totalSpent: 16890,
    registeredDate: '2026-02-14',
    status: 'Active'
  },
  {
    id: 'cust-2',
    name: 'Priya Iyer',
    email: 'priya.iyer@example.com',
    phone: '+91 98111 22334',
    addresses: [
      {
        id: 'addr-2',
        name: 'Apartment',
        street: '12-A, Silver Oaks, Malabar Hill',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400006',
        isDefault: true
      }
    ],
    savedSizes: {
      womenTop: 'M',
      womenBottom: '28'
    },
    ordersCount: 6,
    totalSpent: 28450,
    registeredDate: '2026-01-09',
    status: 'Active'
  },
  {
    id: 'cust-3',
    name: 'Vikramaditya Roy',
    email: 'vikram.roy@example.com',
    phone: '+91 99200 88776',
    addresses: [
      {
        id: 'addr-3',
        name: 'Residence',
        street: 'Villa 14, Palm Meadows, Whitefield',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560066',
        isDefault: true
      }
    ],
    savedSizes: {
      menTop: '40',
      kidsAge: '4-5Y'
    },
    ordersCount: 3,
    totalSpent: 14200,
    registeredDate: '2026-04-18',
    status: 'Active'
  },
  {
    id: 'cust-4',
    name: 'Ananya Deshmukh',
    email: 'ananya.d@example.com',
    phone: '+91 97654 32190',
    addresses: [
      {
        id: 'addr-4',
        name: 'Villa',
        street: 'Plot 45, Jubilee Hills, Rd No 36',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500033',
        isDefault: true
      }
    ],
    savedSizes: {
      womenTop: 'S',
      womenBottom: '26'
    },
    ordersCount: 5,
    totalSpent: 34100,
    registeredDate: '2026-03-22',
    status: 'Active'
  },
  {
    id: 'cust-5',
    name: 'Rohan Mehra',
    email: 'rohan.mehra@example.com',
    phone: '+91 98450 11223',
    addresses: [
      {
        id: 'addr-5',
        name: 'House',
        street: 'C-77, Defence Colony',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110024',
        isDefault: true
      }
    ],
    savedSizes: {
      menTop: 'M',
      menBottom: '32'
    },
    ordersCount: 2,
    totalSpent: 4290,
    registeredDate: '2026-05-11',
    status: 'Active'
  }
];

export const initialCoupons: Coupon[] = [
  {
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minOrderAmount: 999,
    maxDiscount: 500,
    expiryDate: '2026-12-31',
    usageCount: 420,
    active: true,
    description: '10% off for first-time shoppers on orders above ₹999'
  },
  {
    code: 'VELORA20',
    type: 'percentage',
    value: 20,
    minOrderAmount: 3999,
    maxDiscount: 1500,
    expiryDate: '2026-11-30',
    usageCount: 185,
    active: true,
    description: '20% off on premium apparel orders above ₹3,999'
  },
  {
    code: 'FESTIVE1000',
    type: 'fixed',
    value: 1000,
    minOrderAmount: 6999,
    expiryDate: '2026-10-31',
    usageCount: 94,
    active: true,
    description: 'Flat ₹1,000 off on festive handloom & silk collections'
  },
  {
    code: 'FREESHIP',
    type: 'fixed',
    value: 150,
    minOrderAmount: 499,
    expiryDate: '2026-12-31',
    usageCount: 88,
    active: true,
    description: 'Free shipping on any order'
  }
];

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    productId: 'men-1',
    productName: 'Oversized Supima Cotton Shirt',
    customerName: 'Karan Singhania',
    rating: 5,
    comment: 'The drape and hand-feel of this Supima cotton is exceptional. It fits like a tailored designer piece with just the right amount of oversized slouch.',
    date: '2026-09-18',
    verified: true,
    status: 'Approved'
  },
  {
    id: 'rev-2',
    productId: 'women-1',
    productName: 'Chanderi Silk Anarkali Kurta Set with Dupatta',
    customerName: 'Meera Varma',
    rating: 5,
    comment: 'Wore this for my cousin’s wedding sangeet. The fabric has an ethereal shimmer and the organza dupatta with scalloped borders received endless compliments!',
    date: '2026-09-15',
    verified: true,
    status: 'Approved'
  },
  {
    id: 'rev-3',
    productId: 'men-4',
    productName: 'Relaxed Pleated Italian Wool-Blend Trousers',
    customerName: 'Siddharth Nair',
    rating: 5,
    comment: 'The double pleats fall beautifully. Very hard to find such classic sartorial cut in ready-to-wear fashion stores in India.',
    date: '2026-09-10',
    verified: true,
    status: 'Approved'
  },
  {
    id: 'rev-4',
    productId: 'kids-2',
    productName: 'Girls Hand-Block Print Anarkali Frock Dress',
    customerName: 'Sunita Rao',
    rating: 5,
    comment: 'My 5-year-old daughter refused to take this dress off! Pure soft cotton inside with no itchy seams. Outstanding quality.',
    date: '2026-09-08',
    verified: true,
    status: 'Approved'
  },
  {
    id: 'rev-5',
    productId: 'women-4',
    productName: 'Handwoven Banarasi Katan Silk Saree',
    customerName: 'Radhika Bose',
    rating: 5,
    comment: 'A true heirloom piece. The zari weaving is genuine antique gold tone, not gaudy at all. The packaging in a dedicated muslin bag was a lovely touch.',
    date: '2026-09-01',
    verified: true,
    status: 'Approved'
  }
];

export const initialBanners: Banner[] = [
  {
    id: 'ban-1',
    title: 'DEFINE YOUR STYLE',
    subtitle: 'Modern clothing designed for every moment.',
    buttonText: 'SHOP MEN',
    buttonUrl: '/men',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=80',
    category: 'all',
    active: true
  },
  {
    id: 'ban-2',
    title: 'THE FESTIVE EDIT 2026',
    subtitle: 'Handcrafted silks, heritage chanderi, and royal silhouettes.',
    buttonText: 'EXPLORE FESTIVE',
    buttonUrl: '/women',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=80',
    category: 'women',
    active: true
  },
  {
    id: 'ban-3',
    title: 'EVERYDAY ESSENTIALS',
    subtitle: 'Supima cotton, French terry, and relaxed tailoring for the modern man.',
    buttonText: 'SHOP ESSENTIALS',
    buttonUrl: '/men',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2000&q=80',
    category: 'men',
    active: true
  },
  {
    id: 'ban-4',
    title: 'LITTLE TRENDSETTERS',
    subtitle: 'Pure cotton comfort engineered for play and celebration.',
    buttonText: 'SHOP KIDS',
    buttonUrl: '/kids',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=2000&q=80',
    category: 'kids',
    active: true
  }
];

export const initialNotifications: AdminNotification[] = [
  {
    id: 'notif-1',
    title: 'New Order Received',
    message: 'Order #VEL-89241 received from Aarav Sharma for ₹4,698',
    type: 'order',
    date: '2026-09-25 09:12 AM',
    read: false,
    link: '/admin/orders'
  },
  {
    id: 'notif-2',
    title: 'Low Stock Alert',
    message: 'Hand-Embroidered Raw Silk Sherwani has only 10 units left in stock',
    type: 'stock',
    date: '2026-09-25 08:30 AM',
    read: false,
    link: '/admin/inventory'
  },
  {
    id: 'notif-3',
    title: 'New Customer Registered',
    message: 'Rohan Mehra created an account',
    type: 'customer',
    date: '2026-09-24 04:15 PM',
    read: true,
    link: '/admin/customers'
  },
  {
    id: 'notif-4',
    title: '5-Star Review Received',
    message: 'Karan Singhania left a 5-star review on Oversized Supima Cotton Shirt',
    type: 'review',
    date: '2026-09-24 02:00 PM',
    read: true,
    link: '/admin/reviews'
  }
];

export const initialSettings: StoreSettings = {
  storeName: 'VELORA Fashion Studio',
  storeEmail: 'concierge@velorafashion.com',
  storePhone: '+91 1800 200 8989',
  storeAddress: '108, Indiranagar 100ft Road, Stage 2, Bengaluru, Karnataka 560038, India',
  currency: 'INR',
  currencySymbol: '₹',
  timezone: 'Asia/Kolkata (IST)',
  taxPercentage: 0, // Included in MRP
  freeShippingThreshold: 999,
  standardShippingFee: 149
};

export const departmentCategories = {
  men: [
    { name: 'Shirts', subcategories: ['Casual Shirts', 'Formal Shirts', 'Resort Shirts', 'Overshirts'] },
    { name: 'T-Shirts', subcategories: ['Crewneck T-Shirts', 'Polo T-Shirts', 'Graphic Tees'] },
    { name: 'Ethnic Wear', subcategories: ['Kurta', 'Kurta Sets', 'Nehru Jacket', 'Sherwani'] },
    { name: 'Trousers', subcategories: ['Formal Trousers', 'Linen Trousers', 'Chinos'] },
    { name: 'Jeans', subcategories: ['Denim', 'Selvedge', 'Slim Fit'] },
    { name: 'Blazers', subcategories: ['Jackets & Blazers', 'Coats & Outerwear'] },
    { name: 'Hoodies', subcategories: ['Sweatshirts & Hoodies', 'Sweaters & Knits'] },
    { name: 'Co-ords', subcategories: ['Co-ord Sets', 'Loungewear'] }
  ],
  women: [
    { name: 'Kurtas', subcategories: ['Ethnic Wear', 'Chikankari', 'Straight Kurtas'] },
    { name: 'Kurta Sets', subcategories: ['Anarkali Sets', 'Sharara Suits', 'Palazzo Sets'] },
    { name: 'Dresses', subcategories: ['Maxi Dresses', 'Day Dresses', 'Sundresses'] },
    { name: 'Sarees', subcategories: ['Heritage Sarees', 'Banarasi Silk', 'Handloom Cotton'] },
    { name: 'Lehengas', subcategories: ['Ethnic Wear', 'Party Lehengas'] },
    { name: 'Tops', subcategories: ['Blouses & Tops', 'Shirts & Blouses', 'Jackets & Blazers'] },
    { name: 'T-Shirts', subcategories: ['Tees & Basics', 'Ribbed Tees'] },
    { name: 'Trousers', subcategories: ['Pants & Trousers', 'Wide Leg Palazzo'] },
    { name: 'Jeans', subcategories: ['Denim', 'High Rise Flared'] },
    { name: 'Skirts', subcategories: ['Skirts & Bottoms', 'Pleated Satin'] },
    { name: 'Co-ords', subcategories: ['Sets', 'Jumpsuits'] },
    { name: 'Loungewear', subcategories: ['Co-ords & Loungewear', 'Organic Cotton'] }
  ],
  kids: [
    { name: 'T-Shirts', subcategories: ['Tees & Polos', 'Tees & Basics', 'Graphic Tees'] },
    { name: 'Ethnic Wear', subcategories: ['Festive Sets', 'Kurta Pyjama', 'Nehru Sets', 'Sharara Sets'] },
    { name: 'Dresses', subcategories: ['Ethnic Dresses', 'Party Wear', 'Sundresses'] },
    { name: 'Shirts', subcategories: ['Smart Shirts', 'Linen Shirts'] },
    { name: 'Jeans', subcategories: ['Pants & Jeans', 'Elastic Waist'] },
    { name: 'Trousers', subcategories: ['Pants & Trousers', 'Linen Pants'] },
    { name: 'Shorts', subcategories: ['Shorts & Bottoms', 'Cargo Shorts'] },
    { name: 'Hoodies', subcategories: ['Jackets & Hoodies', 'Sweatshirts'] },
    { name: 'Party Wear', subcategories: ['Dresses', 'Tulle Gowns'] },
    { name: 'Casual Wear', subcategories: ['Jackets & Outerwear', 'Everyday Sets'] }
  ]
};

import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { NavigationProvider, useRouter } from './context/NavigationContext';

// Common Components
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { SearchOverlay } from './components/common/SearchOverlay';
import { QuickViewModal } from './components/common/QuickViewModal';
import { SizeGuideModal } from './components/common/SizeGuideModal';
import { ToastContainer } from './components/common/ToastContainer';

// Store Pages
import { HomePage } from './pages/store/HomePage';
import { ProductListingPage } from './pages/store/ProductListingPage';
import { ProductDetailPage } from './pages/store/ProductDetailPage';
import { CartPage } from './pages/store/CartPage';
import { WishlistPage } from './pages/store/WishlistPage';
import { CheckoutPage } from './pages/store/CheckoutPage';
import { OrderSuccessPage } from './pages/store/OrderSuccessPage';
import { AccountPage } from './pages/store/AccountPage';
import { ContactPage } from './pages/store/ContactPage';

// Admin Pages & Layout
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminProductFormPage } from './pages/admin/AdminProductFormPage';
import { AdminCategoriesPage } from './pages/admin/AdminCategoriesPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage';
import { AdminInventoryPage } from './pages/admin/AdminInventoryPage';
import { AdminCouponsPage } from './pages/admin/AdminCouponsPage';
import { AdminReviewsPage } from './pages/admin/AdminReviewsPage';
import { AdminBannersPage } from './pages/admin/AdminBannersPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminNotificationsPage } from './pages/admin/AdminNotificationsPage';
import { AdminProfilePage } from './pages/admin/AdminProfilePage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();

  const isAdminRoute = currentPath.startsWith('/admin');

  // Handle Admin Routing
  if (isAdminRoute) {
    if (currentPath === '/admin/login') {
      return (
        <>
          <AdminLoginPage />
          <ToastContainer />
        </>
      );
    }

    let pageTitle = 'Dashboard';
    let adminComponent = <AdminDashboardPage />;

    if (currentPath === '/admin/products') {
      pageTitle = 'Product Catalog';
      adminComponent = <AdminProductsPage />;
    } else if (currentPath === '/admin/products/add') {
      pageTitle = 'Add Garment';
      adminComponent = <AdminProductFormPage />;
    } else if (currentPath.startsWith('/admin/products/edit/')) {
      pageTitle = 'Edit Garment';
      adminComponent = <AdminProductFormPage />;
    } else if (currentPath === '/admin/categories') {
      pageTitle = 'Category Management';
      adminComponent = <AdminCategoriesPage />;
    } else if (currentPath.startsWith('/admin/orders')) {
      pageTitle = 'Order Fulfillment';
      adminComponent = <AdminOrdersPage />;
    } else if (currentPath === '/admin/customers') {
      pageTitle = 'Customer Directory';
      adminComponent = <AdminCustomersPage />;
    } else if (currentPath === '/admin/inventory') {
      pageTitle = 'Stock & Inventory Control';
      adminComponent = <AdminInventoryPage />;
    } else if (currentPath === '/admin/coupons') {
      pageTitle = 'Coupon Codes';
      adminComponent = <AdminCouponsPage />;
    } else if (currentPath === '/admin/reviews') {
      pageTitle = 'Customer Reviews';
      adminComponent = <AdminReviewsPage />;
    } else if (currentPath === '/admin/banners') {
      pageTitle = 'Promotional Banners';
      adminComponent = <AdminBannersPage />;
    } else if (currentPath === '/admin/analytics') {
      pageTitle = 'Analytics Intelligence';
      adminComponent = <AdminAnalyticsPage />;
    } else if (currentPath === '/admin/notifications') {
      pageTitle = 'System Notifications';
      adminComponent = <AdminNotificationsPage />;
    } else if (currentPath === '/admin/profile') {
      pageTitle = 'Admin Profile & Roles';
      adminComponent = <AdminProfilePage />;
    } else if (currentPath === '/admin/settings') {
      pageTitle = 'Store Configuration';
      adminComponent = <AdminSettingsPage />;
    }

    return (
      <>
        <AdminLayout pageTitle={pageTitle}>
          {adminComponent}
        </AdminLayout>
        <ToastContainer />
      </>
    );
  }

  // Storefront Routing
  let storeComponent = <HomePage />;

  if (currentPath === '/men') {
    storeComponent = (
      <ProductListingPage
        gender="men"
        title="Men’s Collection"
        description="Everyday luxury essentials, oversized Supima cotton shirts, Italian pleated trousers, handloom kurtas, and selvedge denim."
      />
    );
  } else if (currentPath === '/women') {
    storeComponent = (
      <ProductListingPage
        gender="women"
        title="Women’s Atelier"
        description="Pure Banarasi katan silk sarees, Chanderi anarkali sets, bias-cut silk dresses, hand-block mulmul kurtas, and tailored linen co-ords."
      />
    );
  } else if (currentPath === '/kids') {
    storeComponent = (
      <ProductListingPage
        gender="kids"
        title="Kids’ Apparel"
        description="Comfortable clothing engineered for playful moments and celebrations. 100% organic cotton tees, festive kurta pyjama sets, and twirl-ready party dresses."
      />
    );
  } else if (currentPath === '/new-arrivals') {
    storeComponent = (
      <ProductListingPage
        isNewOnly={true}
        title="New Arrivals 2026"
        description="Explore the latest handcrafted garments, fresh color drops, and seasonal sartorial tailoring."
      />
    );
  } else if (currentPath === '/sale') {
    storeComponent = (
      <ProductListingPage
        isSaleOnly={true}
        title="Seasonal Sale & Clearance"
        description="Enjoy up to 50% off select handcrafted garments for Men, Women, and Kids. Limited quantities available."
      />
    );
  } else if (currentPath.startsWith('/product/')) {
    storeComponent = <ProductDetailPage />;
  } else if (currentPath === '/cart') {
    storeComponent = <CartPage />;
  } else if (currentPath === '/wishlist') {
    storeComponent = <WishlistPage />;
  } else if (currentPath === '/checkout') {
    storeComponent = <CheckoutPage />;
  } else if (currentPath.startsWith('/order-success/')) {
    storeComponent = <OrderSuccessPage />;
  } else if (currentPath === '/account') {
    storeComponent = <AccountPage />;
  } else if (currentPath === '/contact') {
    storeComponent = <ContactPage />;
  }

  return (
    <div className="flex flex-col min-h-screen pb-14 lg:pb-0">
      <Header />
      <div className="flex-1">
        {storeComponent}
      </div>
      <Footer />
      <MobileBottomNav />

      {/* Global Modals */}
      <SearchOverlay />
      <QuickViewModal />
      <SizeGuideModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <NavigationProvider>
      <StoreProvider>
        <AdminAuthProvider>
          <AppContent />
        </AdminAuthProvider>
      </StoreProvider>
    </NavigationProvider>
  );
}

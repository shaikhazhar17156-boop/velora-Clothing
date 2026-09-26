import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface NavigationContextType {
  currentPath: string;
  navigate: (path: string) => void;
  goBack: () => void;
  params: Record<string, string>;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    // Read from window.location.pathname or hash
    if (window.location.hash && window.location.hash.startsWith('#/')) {
      return window.location.hash.replace('#', '');
    }
    return window.location.pathname || '/';
  });

  const navigate = useCallback((path: string) => {
    // Keep clean path
    const normalized = path.startsWith('/') ? path : `/${path}`;
    window.history.pushState({}, '', `#${normalized}`);
    setCurrentPath(normalized);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goBack = useCallback(() => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.hash && window.location.hash.startsWith('#/')) {
        setCurrentPath(window.location.hash.replace('#', ''));
      } else {
        setCurrentPath(window.location.pathname || '/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Compute path params
  const params: Record<string, string> = {};
  if (currentPath.startsWith('/product/')) {
    params.productId = currentPath.replace('/product/', '').split('?')[0];
  } else if (currentPath.startsWith('/order-success/')) {
    params.orderId = currentPath.replace('/order-success/', '').split('?')[0];
  } else if (currentPath.startsWith('/admin/products/edit/')) {
    params.editProductId = currentPath.replace('/admin/products/edit/', '').split('?')[0];
  } else if (currentPath.startsWith('/admin/orders/')) {
    params.adminOrderId = currentPath.replace('/admin/orders/', '').split('?')[0];
  }

  return (
    <NavigationContext.Provider value={{ currentPath, navigate, goBack, params }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useRouter must be used within a NavigationProvider');
  }
  return context;
};

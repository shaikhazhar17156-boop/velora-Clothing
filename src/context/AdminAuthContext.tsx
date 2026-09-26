import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser, AdminRole } from '../types';

interface AdminAuthContextType {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string, remember: boolean) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateAdminProfile: (data: Partial<AdminUser>) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  hasPermission: (requiredRoles: AdminRole[]) => boolean;
}

const defaultAdmin: AdminUser = {
  id: 'adm-01',
  name: 'RAY PVT.LTD Admin',
  email: 'admin@raypvtltd.com',
  role: 'SUPER ADMIN',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  phone: '+91 98765 43210'
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('velora_admin_user');
    return saved ? JSON.parse(saved) : null; // Requires login
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('velora_admin_theme');
    return (savedTheme as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    if (admin) {
      localStorage.setItem('velora_admin_user', JSON.stringify(admin));
    } else {
      localStorage.removeItem('velora_admin_user');
    }
  }, [admin]);

  useEffect(() => {
    localStorage.setItem('velora_admin_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const login = async (email: string, pass: string, remember: boolean): Promise<{ success: boolean; message: string }> => {
    // Auth handshake
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!email || !pass) {
      return { success: false, message: 'Please provide both email and password' };
    }

    const normalizedEmail = email.trim().toLowerCase();
    const storedPassword = localStorage.getItem('velora_admin_password') || 'RayAdmin@2026';

    const validEmails = [
      'admin@raypvtltd.com',
      'admin@velorafashion.com',
      'manager@raypvtltd.com'
    ];

    const isAuthorizedEmail = validEmails.includes(normalizedEmail) || normalizedEmail.endsWith('@raypvtltd.com');
    const isAuthorizedPassword = pass === storedPassword || pass === 'RayAdmin@2026';

    if (!isAuthorizedEmail || !isAuthorizedPassword) {
      return { 
        success: false, 
        message: 'Invalid credentials! Please use Email: admin@raypvtltd.com and Password: RayAdmin@2026' 
      };
    }

    let role: AdminRole = 'SUPER ADMIN';
    if (normalizedEmail.includes('manager')) role = 'PRODUCT MANAGER';

    const authenticatedAdmin: AdminUser = {
      id: 'adm-ray-01',
      name: normalizedEmail.includes('admin') ? 'RAY PVT.LTD Admin' : 'Store Manager',
      email: normalizedEmail,
      role: role,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      phone: '+91 98765 43210'
    };

    setAdmin(authenticatedAdmin);
    if (remember) {
      localStorage.setItem('velora_admin_remember', 'true');
    }
    return { success: true, message: 'Authentication successful! Loading Admin Suite...' };
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('velora_admin_user');
    localStorage.removeItem('velora_admin_remember');
  };

  const updateAdminProfile = (data: Partial<AdminUser>) => {
    if (!admin) return;
    setAdmin(prev => (prev ? { ...prev, ...data } : null));
  };

  const hasPermission = (requiredRoles: AdminRole[]) => {
    if (!admin) return false;
    if (admin.role === 'SUPER ADMIN') return true;
    return requiredRoles.includes(admin.role);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        isAuthenticated: !!admin,
        login,
        logout,
        updateAdminProfile,
        theme,
        toggleTheme,
        hasPermission
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

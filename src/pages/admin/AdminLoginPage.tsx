import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useRouter } from '../../context/NavigationContext';
import { Eye, EyeOff, Lock, Mail, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { login } = useAdminAuth();
  const { navigate } = useRouter();

  const [email, setEmail] = useState('admin@raypvtltd.com');
  const [password, setPassword] = useState('RayAdmin@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const res = await login(email, password, rememberMe);
    setIsLoading(false);

    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleUseCredentials = (roleEmail: string, rolePass: string) => {
    setEmail(roleEmail);
    setPassword(rolePass);
  };

  return (
    <div className="min-h-screen bg-[#111111] flex flex-col justify-center items-center px-4 py-12">
      
      {/* Back to Storefront Link */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="text-xs uppercase tracking-widest text-[#B08D57] hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Storefront</span>
        </button>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white border border-[#333333] shadow-2xl p-8 sm:p-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 bg-[#111111] text-[#B08D57] border border-[#B08D57] mx-auto flex items-center justify-center font-serif text-xl font-bold mb-3">
            R
          </div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#B08D57]">
            RAY PVT.LTD &bull; Control Panel
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] uppercase tracking-wide">
            ADMIN LOGIN
          </h1>
          <p className="text-xs text-[#666666]">
            Enter your official administrative credentials to access the e-commerce suite.
          </p>
        </div>

        {/* Credentials Info Badge */}
        <div className="p-3.5 bg-[#FAF8F5] border border-[#B08D57]/30 rounded-xs space-y-1 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#111111] uppercase text-[11px] tracking-wider">
              Official Master Admin Credentials:
            </span>
            <button
              type="button"
              onClick={() => handleUseCredentials('admin@raypvtltd.com', 'RayAdmin@2026')}
              className="text-[10px] text-[#B08D57] hover:underline font-bold uppercase"
            >
              Fill Credentials
            </button>
          </div>
          <div className="font-mono text-[11px] text-[#333333] space-y-0.5 pt-1">
            <p><span className="text-[#888888]">Email:</span> <strong className="text-[#111111]">admin@raypvtltd.com</strong></p>
            <p><span className="text-[#888888]">Password:</span> <strong className="text-[#111111]">RayAdmin@2026</strong></p>
          </div>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border-l-4 border-red-600 text-xs text-red-700">
            {errorMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-1">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@raypvtltd.com"
                className="w-full pl-9 pr-3 py-2.5 text-xs border border-[#E5E5E5] outline-none focus:border-[#111111] font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-1">
              Security Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 text-xs border border-[#E5E5E5] outline-none focus:border-[#111111] font-medium"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#111111]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-[#666666]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-[#111111]"
              />
              <span>Remember this session</span>
            </label>
            <span 
              onClick={() => handleUseCredentials('admin@raypvtltd.com', 'RayAdmin@2026')}
              className="text-[#888888] hover:text-[#111111] cursor-pointer text-[11px]"
            >
              Reset to default
            </span>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#111111] hover:bg-[#B08D57] text-white text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </div>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>LOG IN TO DASHBOARD</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Alternate Staff Role Logins */}
        <div className="pt-3 border-t border-[#E5E5E5] space-y-2">
          <span className="text-[10px] font-bold text-[#888888] uppercase tracking-wider block">
            Role Quick Select:
          </span>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <button
              type="button"
              onClick={() => handleUseCredentials('admin@raypvtltd.com', 'RayAdmin@2026')}
              className="p-2 bg-[#F7F7F7] border border-[#E5E5E5] hover:border-[#B08D57] text-left font-semibold text-[#111111]"
            >
              RAY Super Admin
            </button>
            <button
              type="button"
              onClick={() => handleUseCredentials('manager@raypvtltd.com', 'RayAdmin@2026')}
              className="p-2 bg-[#F7F7F7] border border-[#E5E5E5] hover:border-[#B08D57] text-left font-semibold text-[#111111]"
            >
              Product Manager
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

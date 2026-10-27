import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { loginUser, registerUser } from '../api';
import { X, ShieldCheck, User as UserIcon, Lock, Mail, AlertCircle, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
  currentUser: User | null;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  currentUser,
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fillQuickAccount = (targetRole: UserRole) => {
    setError(null);
    setMode('login');
    if (targetRole === 'admin') {
      setEmail('manager@bigbrew.com');
      setPassword('manager123');
    } else {
      setEmail('customer@bigbrew.com');
      setPassword('coffee123');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        const result = await loginUser(email, password);
        onAuthSuccess(result.user);
        onClose();
      } else {
        const result = await registerUser(name, email, password);
        onAuthSuccess(result.user);
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="relative bg-stone-900 border border-stone-800 rounded-2xl max-w-md w-full shadow-2xl text-stone-100 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Big Brew Account Portal
            </span>
            <h3 className="font-display text-2xl font-bold text-white mt-0.5">
              {mode === 'login' ? 'Sign In' : 'Create Customer Account'}
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              {mode === 'login'
                ? 'Sign in to access order trays or manager live drink CRUD operations.'
                : 'Join the Big Brew club to save favorite drinks and order trays.'}
            </p>
          </div>

          {/* Quick 1-Click Demo Accounts Box */}
          <div className="mb-6 p-3.5 bg-stone-950/80 border border-amber-500/20 rounded-xl space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Sample Test Credentials
              </span>
              <span className="text-[10px] text-stone-400">1-click fill</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => fillQuickAccount('admin')}
                className="py-2 px-2.5 bg-stone-800/90 hover:bg-stone-800 border border-amber-500/30 hover:border-amber-400 rounded-lg text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 font-semibold text-amber-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin / Manager</span>
                </div>
                <div className="text-[10px] text-stone-400 mt-1 font-mono truncate">
                  manager@bigbrew.com
                </div>
              </button>

              <button
                type="button"
                onClick={() => fillQuickAccount('customer')}
                className="py-2 px-2.5 bg-stone-800/90 hover:bg-stone-800 border border-stone-700 hover:border-stone-500 rounded-lg text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 font-semibold text-stone-200">
                  <UserIcon className="w-3.5 h-3.5 text-stone-400" />
                  <span>Regular User</span>
                </div>
                <div className="text-[10px] text-stone-400 mt-1 font-mono truncate">
                  customer@bigbrew.com
                </div>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-xl flex items-center gap-2 text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maria Santos"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer disabled:opacity-50 mt-2 shadow-sm"
            >
              {loading
                ? 'Processing...'
                : mode === 'login'
                ? 'Sign In to Big Brew'
                : 'Create Account'}
            </button>
          </form>

          {/* Mode Switcher */}
          <div className="mt-5 text-center text-xs text-stone-400 pt-4 border-t border-stone-800">
            {mode === 'login' ? (
              <p>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setMode('register');
                  }}
                  className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer underline underline-offset-2 ml-1"
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setMode('login');
                  }}
                  className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer underline underline-offset-2 ml-1"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

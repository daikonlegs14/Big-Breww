import React, { useState } from 'react';
import { User } from '../types';
import { Coffee, ShieldCheck, UserCircle, LogOut, Menu, X, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  trayItemCount: number;
  onOpenTray: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onOpenAuth,
  onLogout,
  trayItemCount,
  onOpenTray,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 border-b border-stone-800 shadow-sm backdrop-blur-md bg-stone-900/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single Brand Wordmark in display face */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-amber-100 whitespace-nowrap shrink-0 hover:text-amber-300 transition-colors"
        >
          <Coffee className="w-6 h-6 text-amber-500" />
          <span className="font-display tracking-wide">Big Brew</span>
        </a>

        {/* Zone 2: 4-5 Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-300">
          <button
            onClick={() => handleNavClick('signature')}
            className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Signature Drinks
          </button>
          <button
            onClick={() => handleNavClick('menu')}
            className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Full Menu
          </button>
          <button
            onClick={() => handleNavClick('craft')}
            className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Our Craft
          </button>
          <button
            onClick={() => handleNavClick('locations')}
            className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Locations & Hours
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action Area */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Order Tray Quick Trigger */}
          <button
            onClick={onOpenTray}
            aria-label="View Order Tray"
            className="relative p-2 text-stone-300 hover:text-amber-300 transition-colors rounded-lg hover:bg-stone-800 cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {trayItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center font-mono tabular-nums">
                {trayItemCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 text-xs font-medium text-stone-200 bg-stone-800 hover:bg-stone-700/80 px-3 py-2 rounded-lg transition-colors cursor-pointer border border-stone-700"
              >
                {user.role === 'admin' ? (
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                ) : (
                  <UserCircle className="w-4 h-4 text-stone-300" />
                )}
                <span className="max-w-[130px] truncate">{user.name}</span>
                <span className="text-stone-400">·</span>
                <span className="text-amber-400 font-semibold capitalize">
                  {user.role === 'admin' ? 'Manager' : 'Customer'}
                </span>
              </button>

              {userMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-stone-900 border border-stone-800 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1"
                  onMouseLeave={() => setUserMenuOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-stone-800 text-xs">
                    <p className="text-stone-400">Signed in as</p>
                    <p className="font-semibold text-stone-100 truncate">{user.email}</p>
                    <p className="text-amber-400 mt-1 capitalize font-medium">Role: {user.role === 'admin' ? 'Manager (Admin)' : 'Customer'}</p>
                  </div>
                  {user.role === 'admin' && (
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        handleNavClick('menu');
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-amber-300 hover:bg-stone-800 transition-colors flex items-center gap-2"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Manage Live Menu (CRUD)
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      onOpenAuth();
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-stone-300 hover:bg-stone-800 transition-colors"
                  >
                    Switch Account / Role
                  </button>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-stone-800 transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
            >
              Sign In / Manager
            </button>
          )}

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-300 hover:text-white rounded-lg hover:bg-stone-800"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-800 bg-stone-950 px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-stone-300">
            <button
              onClick={() => handleNavClick('signature')}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-800 hover:text-amber-300"
            >
              Signature Drinks
            </button>
            <button
              onClick={() => handleNavClick('menu')}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-800 hover:text-amber-300"
            >
              Full Menu
            </button>
            <button
              onClick={() => handleNavClick('craft')}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-800 hover:text-amber-300"
            >
              Our Craft & Story
            </button>
            <button
              onClick={() => handleNavClick('locations')}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-800 hover:text-amber-300"
            >
              Locations & Hours
            </button>
          </div>

          <div className="pt-2 border-t border-stone-800">
            {user ? (
              <div className="flex items-center justify-between text-xs text-stone-400 px-3 py-2 bg-stone-900 rounded-lg">
                <div>
                  <p className="font-semibold text-stone-100">{user.name}</p>
                  <p className="text-amber-400 capitalize">{user.role === 'admin' ? 'Manager (Admin)' : 'Customer'}</p>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="text-rose-400 hover:text-rose-300 font-medium text-xs ml-3"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 text-center text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
              >
                Sign In / Manager Portal
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

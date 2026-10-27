import React from 'react';
import { Coffee, ShieldCheck, User as UserIcon } from 'lucide-react';

interface FooterProps {
  onOpenAuth: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAuth, onNavigateSection }) => {
  return (
    <footer className="bg-stone-950 text-stone-400 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-lg font-display">
              <Coffee className="w-5 h-5 text-amber-500" />
              <span>Big Brew</span>
            </div>
            <p className="text-stone-400 leading-relaxed text-xs">
              Handcrafted Filipino specialty coffee, signature sweet lattes, and artisan brews designed for everyday life. Starting at ₱39.
            </p>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="font-semibold text-stone-200 text-xs uppercase tracking-wider mb-3">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateSection('signature')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Signature Drinks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('menu')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Full Drink Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('craft')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Roasting & Sourcing Craft
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('locations')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Store Hours & Branches
                </button>
              </li>
            </ul>
          </div>

          {/* Account Roles & Quick Test Info */}
          <div className="md:col-span-2 bg-stone-900/60 border border-stone-800/80 rounded-xl p-4">
            <h4 className="font-semibold text-stone-200 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Test Accounts & Roles Guide
            </h4>
            <p className="text-stone-400 text-xs mb-3">
              Use these sample credentials in the sign-in modal to evaluate both access tiers:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
              <div className="bg-stone-950/80 p-2.5 rounded-lg border border-stone-800">
                <span className="font-semibold text-amber-300 block mb-0.5">Admin / Manager Tier:</span>
                <div className="font-mono text-stone-300">manager@bigbrew.com</div>
                <div className="font-mono text-stone-400">Pass: manager123</div>
                <span className="text-stone-500 text-[10px] mt-1 block">Full live menu CRUD access</span>
              </div>
              <div className="bg-stone-950/80 p-2.5 rounded-lg border border-stone-800">
                <span className="font-semibold text-stone-200 block mb-0.5">Customer Tier:</span>
                <div className="font-mono text-stone-300">customer@bigbrew.com</div>
                <div className="font-mono text-stone-400">Pass: coffee123</div>
                <span className="text-stone-500 text-[10px] mt-1 block">Public landing & drink tray</span>
              </div>
            </div>
            <button
              onClick={onOpenAuth}
              className="mt-3 text-amber-400 hover:text-amber-300 text-xs font-semibold underline underline-offset-2 cursor-pointer"
            >
              Open Sign In / Role Switcher Modal →
            </button>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} Big Brew Coffee Shop Co. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Fresh beans roasted daily</span>
            <span>·</span>
            <span>Quezon City, Philippines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

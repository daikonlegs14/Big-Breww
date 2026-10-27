import React from 'react';
import { ArrowDown, Sparkles, Coffee, Clock } from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenLocations: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOpenLocations }) => {
  return (
    <section id="home" className="relative overflow-hidden bg-stone-900 text-stone-100 pt-12 pb-16 lg:py-24 border-b border-stone-800">
      {/* Background subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-amber-600/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unboxed subtle kicker (Zero-Pill compliant) */}
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Handcrafted Filipino Specialty Coffee</span>
              <span className="text-stone-600">·</span>
              <span className="text-stone-400 normal-case font-normal">Freshly pulled daily</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] max-w-2xl [text-wrap:balance]">
              Big Taste. Bold Brews. Starting at only <span className="text-amber-400 italic">₱39</span>.
            </h1>

            {/* Body description */}
            <p className="text-base sm:text-lg text-stone-300 max-w-xl leading-relaxed font-sans-body">
              Welcome to Big Brew. We believe exceptional coffee belongs to everyone. Sip our iconic layered Spanish Latte, artisanal Muscovado iced roasts, and ceremonial dirty matchas—handcrafted with premium mountain beans at real everyday prices.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md hover:shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Explore Signature Drinks</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
              <button
                onClick={onOpenLocations}
                className="px-6 py-3.5 text-sm font-medium text-stone-200 bg-stone-800/80 hover:bg-stone-800 border border-stone-700 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Find Closest Branch</span>
              </button>
            </div>

            {/* Trust Markers / Quantitative proof (Adjacent to claim) */}
            <div className="pt-6 border-t border-stone-800/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="font-mono text-xl sm:text-2xl font-bold text-amber-300 tabular-nums">100%</p>
                <p className="text-xs text-stone-400 mt-0.5">Highland Arabica & Robusta</p>
              </div>
              <div>
                <p className="font-mono text-xl sm:text-2xl font-bold text-amber-300 tabular-nums">4 hrs</p>
                <p className="text-xs text-stone-400 mt-0.5">Fresh Brew Rotation</p>
              </div>
              <div>
                <p className="font-mono text-xl sm:text-2xl font-bold text-amber-300 tabular-nums">50k+</p>
                <p className="text-xs text-stone-400 mt-0.5">Monthly Cups Served</p>
              </div>
            </div>

          </div>

          {/* Right Image Showcase Column (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-800 group aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
              <img
                src="/src/assets/images/hero_bigbrew_coffee_1793080056399.jpg"
                alt="Big Brew handcrafted iced coffee being freshly poured by barista"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent pointer-events-none" />
              
              {/* Floating feature note card */}
              <div className="absolute bottom-4 left-4 right-4 bg-stone-900/90 backdrop-blur-md border border-stone-700/80 rounded-xl p-3.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Spanish Sweet Latte</p>
                    <p className="text-stone-400 text-[11px]">Big Brew's #1 Most Loved Signature</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-amber-400 text-sm tabular-nums">₱39.00</span>
                  <span className="block text-[10px] text-stone-400">Grande 16oz</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

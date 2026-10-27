import React from 'react';
import { Drink } from '../types';
import { Sparkles, ArrowRight, Eye, ShoppingBag } from 'lucide-react';

interface SignatureHighlightsProps {
  drinks: Drink[];
  onSelectDrink: (drink: Drink) => void;
  onAddToTray: (drink: Drink) => void;
  onViewAllMenu: () => void;
}

export const SignatureHighlights: React.FC<SignatureHighlightsProps> = ({
  drinks,
  onSelectDrink,
  onAddToTray,
  onViewAllMenu,
}) => {
  // Select signature drinks or fallback to top 3
  const signatureItems = drinks.filter((d) => d.isSignature).slice(0, 3);

  if (signatureItems.length === 0) return null;

  return (
    <section id="signature" className="py-16 sm:py-20 bg-stone-900/60 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>House Specialties</span>
              <span className="text-stone-600">·</span>
              <span className="text-stone-400 normal-case font-normal">Customer favorites</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Signature Brews That Made Us Famous
            </h2>
            <p className="text-sm text-stone-300 mt-2 max-w-xl">
              Crafted with distinct layers, handcrafted syrups, and real high-elevation espresso shots.
            </p>
          </div>

          <button
            onClick={onViewAllMenu}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer group shrink-0"
          >
            <span>Explore All Drinks</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 3-Column Spotlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {signatureItems.map((drink, idx) => (
            <div
              key={drink.id}
              onClick={() => onSelectDrink(drink)}
              className="bg-stone-950/70 border border-stone-800 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                <img
                  src={drink.image}
                  alt={drink.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-md border border-stone-700 text-stone-300 text-[11px] font-mono px-2 py-0.5 rounded">
                  0{idx + 1}. Spotlight
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-stone-300">
                  <span className="bg-stone-950/80 px-2 py-1 rounded text-[11px] backdrop-blur-sm">
                    {drink.category}
                  </span>
                  <span className="font-mono font-bold text-amber-400 text-sm tabular-nums">
                    ₱{drink.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {drink.name}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                    {drink.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                  <div className="text-[11px] text-stone-400 flex items-center gap-1.5">
                    {drink.tastingNotes.slice(0, 2).join(' · ')}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToTray(drink);
                    }}
                    className="p-2 text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                    title="Add to tray"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

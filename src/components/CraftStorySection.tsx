import React from 'react';
import { Coffee, Award, Sparkles, HeartHandshake } from 'lucide-react';

export const CraftStorySection: React.FC = () => {
  return (
    <section id="craft" className="py-16 sm:py-24 bg-stone-900 text-stone-100 border-t border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Column (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-800 shadow-xl aspect-[4/3]">
              <img
                src="/src/assets/images/craft_coffee_beans_1793080058148.jpg"
                alt="Artisan coffee beans roasted and spilled from burlap bag"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-stone-950/80 backdrop-blur-md rounded-xl border border-stone-800 text-xs">
                <span className="text-amber-400 font-semibold block">Small-Batch Roast Protocol</span>
                <span className="text-stone-300 text-[11px]">
                  Directly sourced from Benguet & Cavite mountain highlands.
                </span>
              </div>
            </div>
          </div>

          {/* Right Narrative Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Award className="w-4 h-4 text-amber-400" />
              <span>The Big Brew Philosophy</span>
              <span className="text-stone-600">·</span>
              <span className="text-stone-400 normal-case font-normal">Our Story</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight [text-wrap:balance]">
              Big Taste Shouldn't Cost a Fortune.
            </h2>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans-body">
              For too long, handcrafted specialty espresso was locked behind overpriced foreign chains charging upwards of ₱200 for a cup. At Big Brew, we reimagined the neighborhood coffee shop from the bean up.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-stone-950/60 rounded-xl border border-stone-800/80">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2.5">
                  <Coffee className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-stone-100">Fresh Hand-Pulled Shots</h3>
                <p className="text-xs text-stone-400 mt-1 leading-normal">
                  Every single Spanish Latte, Americano, and Mocha is extracted on-demand using commercial espresso machinery.
                </p>
              </div>

              <div className="p-4 bg-stone-950/60 rounded-xl border border-stone-800/80">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2.5">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-stone-100">Farmer Direct Sourcing</h3>
                <p className="text-xs text-stone-400 mt-1 leading-normal">
                  We partner directly with highland coffee farming cooperatives, ensuring ethical wages and uncompromised bean freshness.
                </p>
              </div>
            </div>

            <div className="p-4 bg-amber-950/20 border border-amber-500/20 rounded-xl text-xs text-amber-200/90 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p>
                <strong>The Big Brew Promise:</strong> Big cup servings (Grande 16oz & Venti 22oz), genuine dairy creams, and pure Muscovado sugars—no artificial coffee syrups or shortcuts.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

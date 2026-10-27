import React from 'react';
import { Drink } from '../types';
import { X, Coffee, Flame, Droplets, Sparkles, Check, ShoppingBag } from 'lucide-react';

interface DrinkModalProps {
  drink: Drink | null;
  onClose: () => void;
  onAddToTray: (drink: Drink, size: string) => void;
  isManager: boolean;
  onEdit: (drink: Drink) => void;
}

export const DrinkModal: React.FC<DrinkModalProps> = ({
  drink,
  onClose,
  onAddToTray,
  isManager,
  onEdit,
}) => {
  if (!drink) return null;

  const [selectedSize, setSelectedSize] = React.useState(drink.sizes[0] || 'Grande 16oz');
  const [added, setAdded] = React.useState(false);

  const handleAdd = () => {
    onAddToTray(drink, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="relative bg-stone-900 border border-stone-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl text-stone-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-stone-400 hover:text-white bg-stone-950/60 rounded-full transition-colors cursor-pointer"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Frame */}
        <div className="relative h-64 sm:h-72 w-full bg-stone-950 overflow-hidden">
          <img
            src={drink.image}
            alt={drink.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to hero image if custom URL fails
              (e.target as HTMLImageElement).src = '/src/assets/images/hero_bigbrew_coffee_1793080056399.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              <span>{drink.category}</span>
              <span className="text-stone-500">·</span>
              <span className="capitalize">{drink.temperature === 'both' ? 'Iced or Hot' : `${drink.temperature} only`}</span>
              {drink.isSignature && (
                <>
                  <span className="text-stone-500">·</span>
                  <span className="text-amber-300 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Signature
                  </span>
                </>
              )}
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
              {drink.name}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            {drink.description}
          </p>

          {/* Tasting Notes */}
          <div>
            <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
              Tasting Profile & Notes
            </h4>
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-200">
              {drink.tastingNotes.map((note, idx) => (
                <span key={idx} className="bg-stone-800 border border-stone-700/80 px-2.5 py-1 rounded-md">
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-stone-950/60 rounded-xl border border-stone-800/80 text-xs">
            <div>
              <span className="text-stone-400 block">Caffeine Strength</span>
              <span className="font-semibold text-amber-300 capitalize">{drink.caffeineLevel}</span>
            </div>
            <div>
              <span className="text-stone-400 block">Brew Style</span>
              <span className="font-semibold text-stone-200">Fresh Espresso Base</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-stone-400 block">Availability</span>
              <span className={`font-semibold ${drink.isAvailable ? 'text-emerald-400' : 'text-rose-400'}`}>
                {drink.isAvailable ? 'Freshly In Stock' : 'Currently Sold Out'}
              </span>
            </div>
          </div>

          {/* Cup Size Selection */}
          <div>
            <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-2">
              Choose Cup Size
            </label>
            <div className="flex gap-2">
              {drink.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-medium border transition-colors cursor-pointer text-center ${
                    selectedSize === size
                      ? 'bg-amber-400 text-stone-950 border-amber-400 font-semibold shadow-sm'
                      : 'bg-stone-800 text-stone-300 border-stone-700 hover:border-stone-600'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex items-center justify-between gap-4 border-t border-stone-800">
            <div>
              <span className="text-xs text-stone-400 block">Total Price</span>
              <span className="font-mono text-2xl font-bold text-amber-400 tabular-nums">
                ₱{drink.price.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {isManager && (
                <button
                  onClick={() => {
                    onClose();
                    onEdit(drink);
                  }}
                  className="px-4 py-2.5 text-xs font-semibold text-stone-200 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-xl transition-colors cursor-pointer"
                >
                  Edit Drink
                </button>
              )}

              <button
                onClick={handleAdd}
                disabled={!drink.isAvailable}
                className={`px-6 py-2.5 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
                  !drink.isAvailable
                    ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                    : added
                    ? 'bg-emerald-500 text-stone-950 font-bold'
                    : 'bg-amber-400 hover:bg-amber-300 text-stone-950 shadow-md'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Tray!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    {drink.isAvailable ? 'Add to Order Tray' : 'Sold Out'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

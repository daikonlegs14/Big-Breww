import React, { useState, useMemo } from 'react';
import { Drink, User } from '../types';
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  Sparkles,
  ShoppingBag,
  Eye,
  RefreshCw,
  Flame,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface LiveMenuSectionProps {
  drinks: Drink[];
  user: User | null;
  onOpenCreate: () => void;
  onOpenEdit: (drink: Drink) => void;
  onOpenDelete: (drink: Drink) => void;
  onSelectDrink: (drink: Drink) => void;
  onAddToTray: (drink: Drink, size?: string) => void;
  onResetMenu: () => void;
  loading: boolean;
}

export const LiveMenuSection: React.FC<LiveMenuSectionProps> = ({
  drinks,
  user,
  onOpenCreate,
  onOpenEdit,
  onOpenDelete,
  onSelectDrink,
  onAddToTray,
  onResetMenu,
  loading,
}) => {
  const isManager = user?.role === 'admin';

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [temperatureFilter, setTemperatureFilter] = useState<'all' | 'iced' | 'hot'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  // Extract distinct categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    drinks.forEach((d) => set.add(d.category));
    return ['All', ...Array.from(set)];
  }, [drinks]);

  // Filter & Sort
  const filteredDrinks = useMemo(() => {
    return drinks
      .filter((drink) => {
        // Category filter
        if (activeCategory !== 'All' && drink.category !== activeCategory) {
          return false;
        }
        // Temperature filter
        if (temperatureFilter === 'iced' && drink.temperature === 'hot') {
          return false;
        }
        if (temperatureFilter === 'hot' && drink.temperature === 'iced') {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = drink.name.toLowerCase().includes(q);
          const matchDesc = drink.description.toLowerCase().includes(q);
          const matchNotes = drink.tastingNotes.some((n) => n.toLowerCase().includes(q));
          const matchCat = drink.category.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchNotes && !matchCat) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        // Featured default: Signature first, then newest
        if (a.isSignature !== b.isSignature) {
          return a.isSignature ? -1 : 1;
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [drinks, activeCategory, temperatureFilter, searchQuery, sortBy]);

  const handleQuickAdd = (drink: Drink, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToTray(drink, drink.sizes[0] || 'Grande 16oz');
    setAddedIds((prev) => ({ ...prev, [drink.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [drink.id]: false }));
    }, 1200);
  };

  return (
    <section id="menu" className="py-16 sm:py-24 bg-stone-950 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Beverage Catalog</span>
              <span className="text-stone-600">·</span>
              <span className="text-stone-400 normal-case font-normal">Real-time sync</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Our Signature Drinks & Live Menu
            </h2>
            <p className="text-sm text-stone-400 mt-2 max-w-xl">
              Freshly handcrafted brews made with locally roasted beans. Choose your favorite espresso blend, creamy latte, or refreshing tea drink below.
            </p>
          </div>

          {/* Quick Stats or Count */}
          <div className="text-right text-xs text-stone-400 hidden sm:block">
            <span className="text-stone-200 font-semibold font-mono tabular-nums text-base">
              {filteredDrinks.length}
            </span>{' '}
            drinks displayed
          </div>
        </div>

        {/* Manager Live Menu Controls Strip */}
        {isManager && (
          <div className="mb-8 p-4 bg-stone-900 border border-amber-500/30 rounded-2xl shadow-lg animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Manager Portal Active
                    </span>
                    <span className="text-stone-600">·</span>
                    <span className="text-xs text-stone-300">Live Menu CRUD</span>
                  </div>
                  <p className="text-xs text-stone-400">
                    You have permission to create new drinks, edit prices, descriptions, and remove items.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={onResetMenu}
                  title="Reset menu to default signature seeds"
                  className="px-3 py-2 text-xs font-medium text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700/80 border border-stone-700 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Seeds</span>
                </button>
                <button
                  onClick={onOpenCreate}
                  className="px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Drink</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search & Filter Toolbar */}
        <div className="space-y-4 mb-8 bg-stone-900/60 p-4 rounded-2xl border border-stone-800/80">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input (6 cols) */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
              <input
                type="text"
                placeholder="Search by drink name (e.g. Spanish Latte) or flavor note..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-stone-500 hover:text-stone-300"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Temperature Segmented Control (3 cols) */}
            <div className="md:col-span-3 flex items-center gap-1 p-1 bg-stone-950 border border-stone-800 rounded-xl">
              <button
                onClick={() => setTemperatureFilter('all')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer text-center ${
                  temperatureFilter === 'all'
                    ? 'bg-stone-800 text-white shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                All Temps
              </button>
              <button
                onClick={() => setTemperatureFilter('iced')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer text-center ${
                  temperatureFilter === 'iced'
                    ? 'bg-stone-800 text-white shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Iced Only
              </button>
              <button
                onClick={() => setTemperatureFilter('hot')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer text-center ${
                  temperatureFilter === 'hot'
                    ? 'bg-stone-800 text-white shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Hot
              </button>
            </div>

            {/* Sort Dropdown (3 cols) */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2 px-3 bg-stone-950 border border-stone-800 rounded-xl text-xs sm:text-sm text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              >
                <option value="featured">Sort: Featured & Signature</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name: Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Category Filter Tabs (Horizontal Scroll on Mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer font-medium ${
                  activeCategory === cat
                    ? 'bg-amber-400 text-stone-950 font-semibold shadow-sm'
                    : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800 hover:text-white border border-stone-700/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Live Drink Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-stone-400">Loading live Big Brew drinks...</p>
          </div>
        ) : filteredDrinks.length === 0 ? (
          <div className="py-16 text-center bg-stone-900/40 rounded-2xl border border-stone-800 p-8">
            <AlertCircle className="w-10 h-10 text-stone-500 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white">No drinks matched your filter</h3>
            <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
              Try adjusting your search keywords, clear category filters, or add a new beverage if you are a manager.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
                setTemperatureFilter('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-amber-400 bg-stone-800 rounded-lg hover:bg-stone-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDrinks.map((drink) => {
              const isAdded = Boolean(addedIds[drink.id]);

              return (
                <div
                  key={drink.id}
                  onClick={() => onSelectDrink(drink)}
                  className="bg-stone-900/90 border border-stone-800 rounded-2xl overflow-hidden hover:border-stone-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col cursor-pointer group"
                >
                  {/* Image Container with Fallback */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-950">
                    <img
                      src={drink.image}
                      alt={drink.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          '/src/assets/images/hero_bigbrew_coffee_1793080056399.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />

                    {/* Stock Status Badge */}
                    {!drink.isAvailable && (
                      <div className="absolute top-3 left-3 bg-rose-950/90 border border-rose-800 text-rose-300 text-[11px] px-2.5 py-0.5 rounded-md font-semibold">
                        Sold Out
                      </div>
                    )}

                    {/* Signature Marker */}
                    {drink.isSignature && (
                      <div className="absolute top-3 right-3 bg-amber-400 text-stone-950 text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-3 h-3" /> Signature
                      </div>
                    )}

                    {/* Manager Card Action Overlays */}
                    {isManager && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-stone-950/85 backdrop-blur-md p-1 rounded-xl border border-stone-700/80"
                      >
                        <button
                          onClick={() => onOpenEdit(drink)}
                          title="Edit this drink"
                          className="p-1.5 text-stone-300 hover:text-amber-400 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onOpenDelete(drink)}
                          title="Delete this drink"
                          className="p-1.5 text-stone-300 hover:text-rose-400 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Content Container */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Clean Unboxed Metadata (Zero-Pill compliant) */}
                      <div className="flex items-center gap-1.5 text-[11px] text-stone-400 font-medium mb-1">
                        <span className="text-amber-400/90">{drink.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="capitalize">{drink.temperature}</span>
                        <span aria-hidden="true">·</span>
                        <span>{drink.sizes[0]}</span>
                      </div>

                      <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                        {drink.name}
                      </h3>

                      <p className="text-xs text-stone-400 mt-1.5 line-clamp-2 leading-relaxed">
                        {drink.description}
                      </p>

                      {/* Tasting Profile (Unboxed) */}
                      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] text-stone-400">
                        {drink.tastingNotes.slice(0, 2).map((note, idx) => (
                          <span
                            key={idx}
                            className="text-stone-300 bg-stone-800/80 px-2 py-0.5 rounded text-[10px]"
                          >
                            {note}
                          </span>
                        ))}
                        {drink.tastingNotes.length > 2 && (
                          <span className="text-stone-500 text-[10px]">
                            +{drink.tastingNotes.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price and Action Row */}
                    <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
                      <div>
                        <span className="font-mono text-xl font-bold text-amber-400 tabular-nums">
                          ₱{drink.price.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectDrink(drink);
                          }}
                          aria-label={`View details for ${drink.name}`}
                          className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={(e) => handleQuickAdd(drink, e)}
                          disabled={!drink.isAvailable}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                            !drink.isAvailable
                              ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                              : isAdded
                              ? 'bg-emerald-500 text-stone-950 font-bold'
                              : 'bg-amber-400 hover:bg-amber-300 text-stone-950 shadow-sm'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" /> Added
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Tray</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

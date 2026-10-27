import React, { useState, useEffect } from 'react';
import { Drink, DrinkFormData, FormErrors, TemperatureType, CaffeineLevel } from '../types';
import { X, AlertCircle, Sparkles, Check, Image as ImageIcon } from 'lucide-react';

interface DrinkFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Drink>) => Promise<void>;
  initialDrink?: Drink | null;
}

const PRESET_IMAGES = [
  { label: 'Spanish Sweet Latte', url: '/src/assets/images/drink_spanish_latte_1793080056309.jpg' },
  { label: 'Dirty Matcha Fusion', url: '/src/assets/images/drink_matcha_espresso_1793080057192.jpg' },
  { label: 'Muscovado Brown Sugar', url: '/src/assets/images/drink_brown_sugar_boba_1793080057482.jpg' },
  { label: 'Artisan Espresso Roast', url: '/src/assets/images/hero_bigbrew_coffee_1793080056399.jpg' },
  { label: 'Amber Cold Brew & Beans', url: '/src/assets/images/craft_coffee_beans_1793080058148.jpg' },
];

const CATEGORIES = [
  'Signature Espresso',
  'Specialty Fusion',
  'Iced Specialties',
  'Cold Brew & Refreshers',
  'Milktea & Fruit Teas',
];

export const DrinkFormModal: React.FC<DrinkFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialDrink,
}) => {
  if (!isOpen) return null;

  const isEditing = Boolean(initialDrink);

  const [formData, setFormData] = useState<DrinkFormData>({
    name: initialDrink?.name || '',
    category: initialDrink?.category || CATEGORIES[0],
    price: initialDrink ? initialDrink.price.toString() : '39.00',
    description: initialDrink?.description || '',
    tastingNotes: initialDrink ? initialDrink.tastingNotes.join(', ') : '',
    sizes: initialDrink?.sizes || ['Grande 16oz', 'Venti 22oz'],
    temperature: initialDrink?.temperature || 'both',
    image: initialDrink?.image || PRESET_IMAGES[0].url,
    isSignature: initialDrink ? initialDrink.isSignature : true,
    isAvailable: initialDrink ? initialDrink.isAvailable : true,
    caffeineLevel: initialDrink?.caffeineLevel || 'high',
  });

  const [customImageMode, setCustomImageMode] = useState(
    initialDrink ? !PRESET_IMAGES.some((p) => p.url === initialDrink.image) : false
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (initialDrink) {
      setFormData({
        name: initialDrink.name,
        category: initialDrink.category,
        price: initialDrink.price.toString(),
        description: initialDrink.description,
        tastingNotes: initialDrink.tastingNotes.join(', '),
        sizes: initialDrink.sizes,
        temperature: initialDrink.temperature,
        image: initialDrink.image,
        isSignature: initialDrink.isSignature,
        isAvailable: initialDrink.isAvailable,
        caffeineLevel: initialDrink.caffeineLevel,
      });
      setCustomImageMode(!PRESET_IMAGES.some((p) => p.url === initialDrink.image));
    }
  }, [initialDrink]);

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.name.trim()) {
      errs.name = 'Drink name is required.';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Drink name must be at least 2 characters.';
    } else if (formData.name.trim().length > 60) {
      errs.name = 'Drink name cannot exceed 60 characters.';
    }

    if (!formData.category.trim()) {
      errs.category = 'Category is required.';
    }

    const priceNum = parseFloat(formData.price.toString());
    if (formData.price === '' || isNaN(priceNum)) {
      errs.price = 'Please enter a valid numeric price.';
    } else if (priceNum <= 0) {
      errs.price = 'Price must be greater than ₱0.';
    } else if (priceNum > 1000) {
      errs.price = 'Price exceeds maximum reasonable limit (₱1,000).';
    }

    if (!formData.description.trim()) {
      errs.description = 'Description is required.';
    } else if (formData.description.trim().length < 8) {
      errs.description = 'Please provide a helpful description (at least 8 characters).';
    }

    if (!formData.image.trim()) {
      errs.image = 'An image must be selected or provided.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    setSubmitting(true);
    try {
      const parsedNotes = formData.tastingNotes
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const payload: Partial<Drink> = {
        name: formData.name.trim(),
        category: formData.category.trim(),
        price: Math.round(parseFloat(formData.price.toString()) * 100) / 100,
        description: formData.description.trim(),
        tastingNotes: parsedNotes.length > 0 ? parsedNotes : ['Signature Roast', 'Handcrafted'],
        sizes: formData.sizes,
        temperature: formData.temperature,
        image: formData.image.trim(),
        isSignature: formData.isSignature,
        isAvailable: formData.isAvailable,
        caffeineLevel: formData.caffeineLevel,
      };

      await onSubmit(payload);
      onClose();
    } catch (err: any) {
      setServerError(err.message || 'Failed to save drink.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="relative bg-stone-900 border border-stone-800 rounded-2xl max-w-2xl w-full shadow-2xl text-stone-100 overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-900/90">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Manager Live Menu CRUD
            </span>
            <h3 className="text-xl font-bold text-white font-display">
              {isEditing ? `Edit "${initialDrink?.name}"` : 'Add New Signature Drink'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {serverError && (
            <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-xl flex items-center gap-2.5 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Row 1: Drink Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">
                Drink Name <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Spanish Sweet Latte"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                className={`w-full px-3 py-2 bg-stone-800 border rounded-lg text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                  errors.name ? 'border-rose-500' : 'border-stone-700'
                }`}
              />
              {errors.name && (
                <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">
                Category <span className="text-amber-400">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => {
                  setFormData({ ...formData, category: e.target.value });
                  if (errors.category) setErrors({ ...errors, category: undefined });
                }}
                className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Price & Temperature */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">
                Price in PHP (₱) <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-stone-400 font-mono text-sm">₱</span>
                <input
                  type="number"
                  step="0.5"
                  min="1"
                  placeholder="39.00"
                  value={formData.price}
                  onChange={(e) => {
                    setFormData({ ...formData, price: e.target.value });
                    if (errors.price) setErrors({ ...errors, price: undefined });
                  }}
                  className={`w-full pl-7 pr-3 py-2 bg-stone-800 border rounded-lg text-sm font-mono tabular-nums text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                    errors.price ? 'border-rose-500' : 'border-stone-700'
                  }`}
                />
              </div>
              {errors.price && (
                <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.price}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">Serving Type</label>
              <select
                value={formData.temperature}
                onChange={(e) =>
                  setFormData({ ...formData, temperature: e.target.value as TemperatureType })
                }
                className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              >
                <option value="both">Both Iced & Hot</option>
                <option value="iced">Iced Only</option>
                <option value="hot">Hot Only</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">Caffeine Level</label>
              <select
                value={formData.caffeineLevel}
                onChange={(e) =>
                  setFormData({ ...formData, caffeineLevel: e.target.value as CaffeineLevel })
                }
                className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              >
                <option value="high">High Caffeine</option>
                <option value="medium">Medium Caffeine</option>
                <option value="low">Low Caffeine</option>
                <option value="decaf">Decaf</option>
              </select>
            </div>
          </div>

          {/* Row 3: Description */}
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1">
              Description <span className="text-amber-400">*</span>
            </label>
            <textarea
              rows={2}
              placeholder="Describe the drink ingredients, layering, roast notes, and mouthfeel..."
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                if (errors.description) setErrors({ ...errors, description: undefined });
              }}
              className={`w-full px-3 py-2 bg-stone-800 border rounded-lg text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                errors.description ? 'border-rose-500' : 'border-stone-700'
              }`}
            />
            {errors.description && (
              <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.description}
              </p>
            )}
          </div>

          {/* Row 4: Tasting Notes */}
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1">
              Flavor / Tasting Notes (comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Condensed Sweetness, Dark Cocoa, Velvety Foam"
              value={formData.tastingNotes}
              onChange={(e) => setFormData({ ...formData, tastingNotes: e.target.value })}
              className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          {/* Row 5: Image Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-medium text-stone-300">
                Drink Photography <span className="text-amber-400">*</span>
              </label>
              <button
                type="button"
                onClick={() => setCustomImageMode(!customImageMode)}
                className="text-xs text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
              >
                {customImageMode ? '← Pick from Big Brew Library' : 'Or use Custom Image URL'}
              </button>
            </div>

            {customImageMode ? (
              <div>
                <input
                  type="text"
                  placeholder="https://... or /src/assets/images/..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-xs text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {PRESET_IMAGES.map((preset) => (
                  <button
                    key={preset.url}
                    type="button"
                    onClick={() => setFormData({ ...formData, image: preset.url })}
                    className={`relative rounded-lg overflow-hidden border p-1 text-left transition-all cursor-pointer group ${
                      formData.image === preset.url
                        ? 'border-amber-400 bg-amber-950/40'
                        : 'border-stone-800 hover:border-stone-600 bg-stone-800/60'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-full h-14 object-cover rounded"
                    />
                    <span className="block text-[10px] text-stone-300 truncate mt-1">
                      {preset.label}
                    </span>
                    {formData.image === preset.url && (
                      <div className="absolute top-1 right-1 bg-amber-400 text-stone-950 rounded-full p-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Row 6: Toggles (Signature & In Stock) */}
          <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-stone-800/80">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-200">
              <input
                type="checkbox"
                checked={formData.isSignature}
                onChange={(e) => setFormData({ ...formData, isSignature: e.target.checked })}
                className="w-4 h-4 rounded text-amber-500 bg-stone-800 border-stone-700 focus:ring-amber-500"
              />
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Featured as Signature Drink
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-200">
              <input
                type="checkbox"
                checked={formData.isAvailable}
                onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-500 bg-stone-800 border-stone-700 focus:ring-emerald-500"
              />
              <span>Live Available in Store (In Stock)</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-800">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 text-xs font-medium text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer disabled:opacity-50 shadow-sm"
            >
              {submitting ? 'Saving Live Drink...' : isEditing ? 'Update Drink' : 'Create Live Drink'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

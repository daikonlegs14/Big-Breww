import React, { useState } from 'react';
import { Drink } from '../types';
import { X, Trash2, ShoppingBag, Plus, Minus, CheckCircle, ArrowRight } from 'lucide-react';

export interface TrayItem {
  drink: Drink;
  size: string;
  quantity: number;
}

interface OrderTrayDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: TrayItem[];
  onUpdateQuantity: (drinkId: string, size: string, delta: number) => void;
  onRemoveItem: (drinkId: string, size: string) => void;
  onClearTray: () => void;
}

export const OrderTrayDrawer: React.FC<OrderTrayDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearTray,
}) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [pickupCode, setPickupCode] = useState<string>('');

  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.drink.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    const code = `BB-${Math.floor(1000 + Math.random() * 9000)}`;
    setPickupCode(code);
    setOrderPlaced(true);
  };

  const handleResetAfterOrder = () => {
    setOrderPlaced(false);
    onClearTray();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/70 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-900 border-l border-stone-800 text-stone-100 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h3 className="font-display text-lg font-bold text-white">Your Drink Tray</h3>
              <span className="text-xs text-stone-400 font-mono tabular-nums">
                ({items.reduce((acc, i) => acc + i.quantity, 0)} items)
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          {orderPlaced ? (
            <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-display text-2xl font-bold text-white">
                Order Received!
              </h4>
              <p className="text-xs text-stone-300 max-w-xs">
                Your barista is pulling your fresh espresso shots right now. Present your pickup code at the counter:
              </p>
              <div className="p-4 bg-stone-950 border border-stone-800 rounded-2xl w-full max-w-xs">
                <span className="text-[10px] text-stone-400 uppercase tracking-widest block">Pickup Code</span>
                <span className="font-mono text-3xl font-bold text-amber-400 tracking-wider">
                  {pickupCode}
                </span>
                <span className="text-[11px] text-stone-400 block mt-1">Ready in ~5-7 minutes</span>
              </div>
              <button
                onClick={handleResetAfterOrder}
                className="mt-4 px-6 py-2.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer"
              >
                Start New Order
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-stone-400">
              <ShoppingBag className="w-12 h-12 text-stone-600 mb-3" />
              <p className="text-sm font-semibold text-stone-200">Your order tray is empty</p>
              <p className="text-xs text-stone-400 mt-1 max-w-xs">
                Browse our live signature drink menu and tap "Add to Tray" on your favorite cold and hot beverages.
              </p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-stone-800/80">
                {items.map((item, idx) => (
                  <div key={`${item.drink.id}-${item.size}-${idx}`} className="pt-4 first:pt-0 flex gap-3">
                    <img
                      src={item.drink.image}
                      alt={item.drink.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover bg-stone-950 shrink-0 border border-stone-800"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-white truncate">
                          {item.drink.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.drink.id, item.size)}
                          className="text-stone-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-stone-400 mt-0.5">
                        <span>{item.size}</span>
                        <span className="mx-1">·</span>
                        <span className="capitalize">{item.drink.temperature}</span>
                      </div>

                      <div className="flex items-center justify-between mt-2.5">
                        <div className="flex items-center gap-2 bg-stone-950 border border-stone-800 rounded-lg p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.drink.id, item.size, -1)}
                            className="p-1 text-stone-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-semibold px-1.5 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.drink.id, item.size, 1)}
                            className="p-1 text-stone-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono text-xs font-bold text-amber-400 tabular-nums">
                          ₱{(item.drink.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Summary & Checkout */}
              <div className="p-5 border-t border-stone-800 bg-stone-950/60 space-y-4">
                <div className="space-y-1.5 text-xs text-stone-300">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Subtotal</span>
                    <span className="font-mono tabular-nums">₱{totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Counter Pickup Preparation</span>
                    <span className="text-emerald-400 font-medium">Free</span>
                  </div>
                  <div className="pt-2 border-t border-stone-800 flex justify-between text-sm font-bold text-white">
                    <span>Estimated Total</span>
                    <span className="font-mono text-amber-400 text-base tabular-nums">
                      ₱{totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={onClearTray}
                    className="px-3 py-2 text-xs text-stone-400 hover:text-stone-200 border border-stone-800 rounded-xl hover:bg-stone-800 transition-colors"
                  >
                    Clear Tray
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 py-3 px-4 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Place Counter Pickup Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

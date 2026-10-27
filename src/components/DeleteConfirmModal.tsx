import React from 'react';
import { Drink } from '../types';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  drink: Drink | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  loading: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  drink,
  onClose,
  onConfirm,
  loading,
}) => {
  if (!isOpen || !drink) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="relative bg-stone-900 border border-stone-800 rounded-2xl max-w-md w-full shadow-2xl text-stone-100 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <h3 className="font-display text-xl font-bold text-white mb-2">
            Confirm Drink Deletion
          </h3>

          <p className="text-sm text-stone-300 leading-relaxed mb-4">
            Are you sure you want to permanently remove <strong className="text-white font-semibold">"{drink.name}"</strong> (₱{drink.price.toFixed(2)}) from the live menu?
          </p>

          <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-3 text-xs text-stone-400 mb-6">
            <span className="text-amber-400 font-semibold block mb-0.5">Accidental Data Loss Protection:</span>
            This action will immediately remove this beverage from customers' views across all branches and delete its persistent record.
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-xs font-medium text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors cursor-pointer"
            >
              Cancel, Keep Drink
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-sm"
            >
              <Trash2 className="w-3.5 h-3.5" />
              {loading ? 'Deleting...' : 'Yes, Delete Drink'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

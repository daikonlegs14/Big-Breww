import React, { useState, useEffect, useCallback } from 'react';
import { Drink, User } from './types';
import {
  fetchDrinks,
  createDrink,
  updateDrink,
  deleteDrink,
  resetDrinksMenu,
  getStoredAuth,
  clearStoredAuth,
  fetchCurrentUser,
} from './api';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SignatureHighlights } from './components/SignatureHighlights';
import { LiveMenuSection } from './components/LiveMenuSection';
import { CraftStorySection } from './components/CraftStorySection';
import { LocationsSection } from './components/LocationsSection';
import { Footer } from './components/Footer';
import { DrinkModal } from './components/DrinkModal';
import { DrinkFormModal } from './components/DrinkFormModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { AuthModal } from './components/AuthModal';
import { OrderTrayDrawer, TrayItem } from './components/OrderTrayDrawer';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export default function App() {
  // --- State ---
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loadingDrinks, setLoadingDrinks] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Modals & Drawers
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingDrink, setEditingDrink] = useState<Drink | null>(null);
  const [deletingDrink, setDeletingDrink] = useState<Drink | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [trayOpen, setTrayOpen] = useState(false);

  // Customer Order Tray
  const [trayItems, setTrayItems] = useState<TrayItem[]>([]);

  // Toast Notifications
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `${Date.now()}_${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // --- Initial Load ---
  const loadDrinksData = useCallback(async () => {
    try {
      setLoadingDrinks(true);
      const data = await fetchDrinks();
      setDrinks(data);
    } catch (err: any) {
      addToast(err.message || 'Could not load drinks menu.', 'error');
    } finally {
      setLoadingDrinks(false);
    }
  }, []);

  useEffect(() => {
    // 1. Check local session
    const { user: storedUser } = getStoredAuth();
    if (storedUser) {
      setUser(storedUser);
      // Validate with server
      fetchCurrentUser().then((fresh) => {
        if (fresh) setUser(fresh);
      });
    }

    // 2. Load live drinks
    loadDrinksData();
  }, [loadDrinksData]);

  // --- CRUD Handlers ---

  const handleCreateOrUpdateDrink = async (payload: Partial<Drink>) => {
    if (editingDrink) {
      // UPDATE
      const updated = await updateDrink(editingDrink.id, payload);
      setDrinks((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
      addToast(`Updated "${updated.name}" on the live menu.`, 'success');
      setEditingDrink(null);
    } else {
      // CREATE
      const created = await createDrink(payload);
      setDrinks((prev) => [created, ...prev]);
      addToast(`Added "${created.name}" to the live menu!`, 'success');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingDrink) return;
    setDeleteLoading(true);
    try {
      await deleteDrink(deletingDrink.id);
      setDrinks((prev) => prev.filter((d) => d.id !== deletingDrink.id));
      // Remove from tray if present
      setTrayItems((prev) => prev.filter((i) => i.drink.id !== deletingDrink.id));
      addToast(`Deleted "${deletingDrink.name}" from live menu.`, 'info');
      setDeletingDrink(null);
    } catch (err: any) {
      addToast(err.message || 'Failed to delete drink.', 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleResetMenu = async () => {
    if (!window.confirm('Reset all live menu drinks to default signature seed items?')) {
      return;
    }
    try {
      const resetList = await resetDrinksMenu();
      setDrinks(resetList);
      addToast('Live drinks menu reset to default signature brews.', 'success');
    } catch (err: any) {
      addToast(err.message || 'Failed to reset drinks.', 'error');
    }
  };

  // --- Auth Handlers ---
  const handleAuthSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    addToast(
      `Welcome, ${authenticatedUser.name}! (${
        authenticatedUser.role === 'admin' ? 'Manager Mode' : 'Customer'
      })`,
      'success'
    );
  };

  const handleLogout = () => {
    clearStoredAuth();
    setUser(null);
    addToast('Signed out of Big Brew account.', 'info');
  };

  // --- Tray Handlers ---
  const handleAddToTray = (drink: Drink, size?: string) => {
    const chosenSize = size || drink.sizes[0] || 'Grande 16oz';
    setTrayItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.drink.id === drink.id && i.size === chosenSize
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += 1;
        return copy;
      }
      return [...prev, { drink, size: chosenSize, quantity: 1 }];
    });
  };

  const handleUpdateTrayQuantity = (drinkId: string, size: string, delta: number) => {
    setTrayItems((prev) => {
      return prev
        .map((item) => {
          if (item.drink.id === drinkId && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as TrayItem[];
    });
  };

  const handleRemoveTrayItem = (drinkId: string, size: string) => {
    setTrayItems((prev) =>
      prev.filter((i) => !(i.drink.id === drinkId && i.size === size))
    );
  };

  const handleClearTray = () => {
    setTrayItems([]);
  };

  // Smooth scroll
  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalTrayCount = trayItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans-body selection:bg-amber-400 selection:text-stone-950">
      
      {/* Toast Notification Container */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto p-3.5 rounded-xl border shadow-xl flex items-center justify-between gap-3 text-xs backdrop-blur-md animate-in slide-in-from-right-3 duration-200 ${
              t.type === 'error'
                ? 'bg-rose-950/90 border-rose-800 text-rose-200'
                : t.type === 'info'
                ? 'bg-stone-900/95 border-stone-700 text-stone-200'
                : 'bg-emerald-950/90 border-emerald-800 text-emerald-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {t.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              )}
              <span className="font-medium">{t.message}</span>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="p-1 hover:opacity-80 text-stone-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <Navbar
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        trayItemCount={totalTrayCount}
        onOpenTray={() => setTrayOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreMenu={() => handleNavigateSection('menu')}
          onOpenLocations={() => handleNavigateSection('locations')}
        />

        {/* Signature Highlights */}
        <SignatureHighlights
          drinks={drinks}
          onSelectDrink={(d) => setSelectedDrink(d)}
          onAddToTray={(d) => {
            handleAddToTray(d);
            addToast(`Added "${d.name}" to tray!`, 'success');
          }}
          onViewAllMenu={() => handleNavigateSection('menu')}
        />

        {/* Live Drink Menu & Manager CRUD */}
        <LiveMenuSection
          drinks={drinks}
          user={user}
          onOpenCreate={() => {
            setEditingDrink(null);
            setFormModalOpen(true);
          }}
          onOpenEdit={(d) => {
            setEditingDrink(d);
            setFormModalOpen(true);
          }}
          onOpenDelete={(d) => setDeletingDrink(d)}
          onSelectDrink={(d) => setSelectedDrink(d)}
          onAddToTray={(d, size) => {
            handleAddToTray(d, size);
            addToast(`Added "${d.name}" to tray!`, 'success');
          }}
          onResetMenu={handleResetMenu}
          loading={loadingDrinks}
        />

        {/* Story & Coffee Craft */}
        <CraftStorySection />

        {/* Store Locations & Hours */}
        <LocationsSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenAuth={() => setAuthModalOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Modals & Drawers */}
      
      {/* 1. Drink Detail Modal */}
      <DrinkModal
        drink={selectedDrink}
        onClose={() => setSelectedDrink(null)}
        onAddToTray={(d, size) => {
          handleAddToTray(d, size);
          addToast(`Added "${d.name}" (${size}) to tray!`, 'success');
        }}
        isManager={user?.role === 'admin'}
        onEdit={(d) => {
          setSelectedDrink(null);
          setEditingDrink(d);
          setFormModalOpen(true);
        }}
      />

      {/* 2. Drink Create/Edit Form Modal */}
      <DrinkFormModal
        isOpen={formModalOpen}
        onClose={() => {
          setFormModalOpen(false);
          setEditingDrink(null);
        }}
        onSubmit={handleCreateOrUpdateDrink}
        initialDrink={editingDrink}
      />

      {/* 3. Delete Confirmation Modal (Prevents accidental data loss) */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingDrink)}
        drink={deletingDrink}
        onClose={() => setDeletingDrink(null)}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
      />

      {/* 4. Auth Modal (Login / Register / Quick Test Accounts) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        currentUser={user}
      />

      {/* 5. Customer Order Tray Drawer */}
      <OrderTrayDrawer
        isOpen={trayOpen}
        onClose={() => setTrayOpen(false)}
        items={trayItems}
        onUpdateQuantity={handleUpdateTrayQuantity}
        onRemoveItem={handleRemoveTrayItem}
        onClearTray={handleClearTray}
      />

    </div>
  );
}

import React from 'react';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';

export const LocationsSection: React.FC = () => {
  const branches = [
    {
      name: 'Big Brew Central Roastery & Flagship',
      address: '24 Tomas Morato Ave, Diliman, Quezon City',
      hours: 'Mon - Sun: 7:00 AM – 11:00 PM',
      phone: '+63 (02) 8920-4521',
      features: 'Dine-In · Drive-Thru · Free Wi-Fi',
    },
    {
      name: 'Big Brew BGC Tech Hub',
      address: '7th Ave cor 30th St, Bonifacio Global City, Taguig',
      hours: 'Mon - Sun: 6:30 AM – 12:00 MN',
      phone: '+63 (02) 8812-9033',
      features: 'Express Bar · Mobile Pickup · Outdoor Seating',
    },
    {
      name: 'Big Brew Makati Legaspi',
      address: '112 Gamboa Street, Legaspi Village, Makati',
      hours: 'Mon - Sat: 7:00 AM – 9:00 PM (Sun 8am-8pm)',
      phone: '+63 (02) 8774-1290',
      features: 'Co-working Nooks · Fresh Pastry Bar',
    },
  ];

  return (
    <section id="locations" className="py-16 sm:py-24 bg-stone-950 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>Store Directory</span>
            <span className="text-stone-600">·</span>
            <span className="text-stone-400 normal-case font-normal">Branches & Hours</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Find Your Neighborhood Big Brew
          </h2>
          <p className="text-sm text-stone-400 mt-2">
            Every Big Brew branch is equipped with our state-of-the-art commercial espresso rigs and iced brewing stations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {branches.map((branch, idx) => (
            <div
              key={idx}
              className="p-6 bg-stone-900 border border-stone-800 rounded-2xl hover:border-stone-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>

                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    {branch.name}
                  </h3>
                  <p className="text-xs text-stone-300 mt-1.5 leading-relaxed">
                    {branch.address}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-800 space-y-2 text-xs text-stone-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{branch.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{branch.phone}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
                <span className="text-stone-400 text-[11px]">{branch.features}</span>
                <span className="text-amber-400 font-medium flex items-center gap-1 hover:underline cursor-pointer">
                  <Navigation className="w-3 h-3" /> Get Directions
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

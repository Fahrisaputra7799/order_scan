'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Search, Menu } from 'lucide-react';

export default function HomePage() {
  const categories = ['All', 'Main Course', 'Minuman', 'Snack'];

  const menuItems = [
    {
      id: 1,
      name: 'Nasi Goreng Spesial',
      price: 25000,
      image: '/steak-1.webp',
      category: 'Main Course',
    },
    {
      id: 2,
      name: 'Es Teh Manis',
      price: 7000,
      image: '/steak-1.webp',
      category: 'Minuman',
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems =
    selectedCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-28 font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-20 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="#">
            <button className="p-2 rounded-full bg-white shadow-md hover:bg-gray-200 transition-all duration-200">
              <Menu size={24} className="text-gray-700" />
            </button>
          </Link>
        </div>
        <h1 className="text-lg font-bold text-gray-800">Restoran Acak</h1>
        <div className="text-xs text-gray-500">Meja 23</div>
      </header>

      {/* Jadwal buka */}
      <div className="mt-16 px-4 pt-4">
        <div className="bg-white rounded-xl shadow p-4 mb-2">
          <h3 className="text-sm font-semibold text-gray-800 mb-1">
            ⏰ Jadwal Buka
          </h3>
          <p className="text-sm text-gray-600">Setiap hari 10:00 - 22:00</p>
        </div>
        <p className="text-sm text-gray-500 mb-2">📍 Kamu berada di meja nomor <span className="font-medium text-gray-800">23</span></p>
      </div>

      {/* Category */}
      <div className="sticky top-[124px] z-10 bg-white border-b">
        <div className="flex overflow-x-auto px-4 py-2 gap-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 text-sm whitespace-nowrap rounded-full transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu */}
      <main className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4 mt-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={300}
              height={200}
              className="w-full h-32 object-cover rounded-t-xl"
            />
            <div className="p-3">
              <h2 className="text-sm font-semibold text-gray-800">
                {item.name}
              </h2>
              <p className="text-xs text-gray-500">
                Rp {item.price.toLocaleString('id-ID')}
              </p>
              <button className="mt-2 w-full bg-blue-600 text-white text-xs py-1.5 rounded hover:bg-blue-700 transition-all">
                + Add
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Cart Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t px-6 py-4 shadow-lg z-20">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700 font-medium">2 Items | Rp 32.000</span>
          <Link href="/cart">
            <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg text-sm hover:bg-green-700 transition-all">
              <ShoppingCart size={18} />
              View Cart
            </button>
          </Link>
        </div>
      </footer>
    </div>
  );
}

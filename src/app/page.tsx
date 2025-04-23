
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import { ShoppingCart, Search, Menu } from 'lucide-react';


interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends MenuItem {
  qty: number;
}
// Misalnya nanti kita tambahin react-slick
// import Slider from "react-slick";

export default function HomePage() {
  // --- state & dummy menu data tetap seperti sebelumnya
  // (kategori, search, cart, menuItems, useEffect, etc.)

    const categories = ['All', 'Main Course', 'Minuman', 'Snack'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);

  const menuItems: MenuItem[] = [
    { id: 1, name: 'Nasi Goreng Spesial', price: 25000, image: '/steak-1.webp', category: 'Main Course' },
    { id: 2, name: 'Nasi Gude Soesial', price: 7000, image: '/steak-1.webp', category: 'Minuman' },
    { id: 3, name: 'Steak Sapi', price: 7000, image: '/steak-1.webp', category: 'Minuman' },
    { id: 4, name: 'Es Teh Manis', price: 7000, image: '/steak-1.webp', category: 'Minuman' },
    { id: 5, name: 'Es Jeruk Nipis', price: 7000, image: '/steak-1.webp', category: 'Minuman' },
    { id: 6, name: 'Kentang', price: 7000, image: '/steak-1.webp', category: 'Snack' },
    { id: 7, name: 'Cireng', price: 7000, image: '/steak-1.webp', category: 'Snack' },
    { id: 8, name: 'Pismol', price: 7000, image: '/steak-1.webp', category: 'Snack' },
  ];

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsed = JSON.parse(savedCart).map((item: any) => ({
        ...item,
        qty: item.qty ?? item.quantity ?? 1, // normalisasi field qty
      }));
      setCart(parsed);
    }
  }, []);
  

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [menuItems, selectedCategory, searchQuery]);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b shadow-sm px-4 py-3 flex justify-between items-center z-30">
        <button className="p-2 bg-white rounded-full hover:bg-gray-100 shadow transition">
          <Menu size={22} className="text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">meetSteak</h1>
          <div className="relative">
           <ShoppingCart className="text-gray-800" />
           {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </div>
      </header>

      <div className="mt-16 px-4 py-2 space-y-4">
        {/* SLIDER PROMO */}
        <div className="rounded-xl overflow-hidden shadow">
          <Image
            src="/promo-1.jpeg"
            alt="Promo"
            width={800}
            height={400}
            className="w-full h-40 object-cover"
          />
        </div>

        {/* INFO OPEN & MEJA */}
        <div className="flex justify-between items-center bg-white rounded-xl shadow px-4 py-3 text-sm">
          <div>
            <p className="text-gray-700 font-medium">⏰ Buka: 10.00 - 22.00</p>
            <p className="text-gray-500">📍 Meja kamu: <span className="font-semibold text-gray-700">23</span></p>
          </div>
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
            Open
          </div>
        </div>

        <div className="relative mt-4">
          <input
            type="text"
            className="w-full border rounded-full px-5 py-2.5 pl-10 bg-white text-sm text-black shadow focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="Cari menu favorit kamu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={18} className="absolute left-4 top-3 text-gray-400" />
        </div>

        {/* Category Filter */}
         <div className="sticky top-[62px] bg-gray-50 z-20 pt-2 pb-2">
           <div className="flex overflow-x-auto gap-2 px-2 scrollbar-hide">
             {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm rounded-full whitespace-nowrap border ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white border-blue-600 shadow'
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
                } transition`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* REKOMENDASI */}
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-2">Rekomendasi</h2>
          <div className="flex overflow-x-auto gap-4 scrollbar-hide">
            {[1, 2, 3].map((i) => (
              <div key={i} className="min-w-[150px] bg-white rounded-xl shadow p-2">
                <Image
                  src="/steak-1.webp"
                  alt="Rekomendasi"
                  width={200}
                  height={100}
                  className="w-full h-24 object-cover rounded-md"
                />
                <p className="mt-1 text-sm font-medium text-gray-700">Menu {i}</p>
              </div>
            ))}
          </div>
        </div>

        {/* LIST MENU */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={300}
                height={200}
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-800">{item.name}</h3>
                <p className="text-xs text-gray-500">Rp {item.price.toLocaleString('id-ID')}</p>
                <button
                  className="mt-2 w-full bg-blue-600 text-white text-xs py-1.5 rounded hover:bg-blue-700"
                  onClick={() => addToCart(item)}
                >
                  + Tambah
                </button>
              </div>
            </div>
          ))}
        </div>
        </div>
        {totalItems > 0 && (
        <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-lg px-6 py-4 border-t z-30">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-800">
              {totalItems} item | Rp {totalPrice.toLocaleString('id-ID')}
            </span>
            <Link href="/cart">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm flex items-center gap-2">
                <ShoppingCart size={18} />
                Lihat Keranjang
              </button>
            </Link>
          </div>
        </footer>
      )}
    </div>

  );
}



// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useState, useMemo, useEffect } from 'react';
// import { ShoppingCart, Search, Menu } from 'lucide-react';



// export default function HomePage() {


//   return (
//     <div className="min-h-screen bg-gray-50 pb-28">
//       {/* Header */}
//       <header className="fixed top-0 left-0 right-0 bg-white border-b shadow-sm px-4 py-3 flex justify-between items-center z-30">
//         <button className="p-2 bg-white rounded-full hover:bg-gray-100 shadow transition">
//           <Menu size={22} className="text-gray-800" />
//         </button>
//         <h1 className="text-lg font-bold text-gray-900">meetSteak</h1>

//       </header>

//       <div className="mt-16 px-4 py-1">
//         {/* Info Box */}
//         <div className="bg-white rounded-xl shadow p-4 mt-4">
//           <p className="text-sm text-gray-700 font-medium">⏰ Buka: 10.00 - 22.00</p>
//           <p className="text-sm text-gray-500 mt-1">📍 Meja kamu: <span className="font-semibold text-gray-700">23</span></p>
//         </div>

//         {/* Search */}







//         {/* Menu Items */}
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
//           
//       </div>

//       {/* Floating Cart */}

//   );
// }






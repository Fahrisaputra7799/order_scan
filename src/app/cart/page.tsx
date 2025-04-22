'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'Nasi Goreng Spesial', price: 25000, quantity: 1 },
    { id: 2, name: 'Es Teh Manis', price: 7000, quantity: 2 },
  ]);

  const updateQuantity = (id: number, amount: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.1; // contoh 10%
  const totalPrice = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans pb-40">
      {/* Header */}
      <header className="bg-white p-4 shadow-md mb-8 rounded-xl">
        <h2 className="text-2xl font-bold text-gray-800">Keranjang</h2>
      </header>

      {/* Cart Items */}
      <div className="mt-6 space-y-6">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">Keranjang kosong 🛒</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-start"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  Rp {item.price.toLocaleString('id-ID')}
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="text-lg font-medium text-black">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-semibold text-gray-800 text-lg">
                  Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 text-xs mt-3 hover:underline flex items-center gap-1"
                >
                  <Trash2 size={14} />
                  Hapus
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Order Detail */}
      {cartItems.length > 0 && (
        <div className="mt-10 bg-white p-6 rounded-2xl shadow-lg space-y-3">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Detail Pesanan</h4>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>Rp {subtotal.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Pajak (10%)</span>
            <span>Rp {tax.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-gray-900 border-t pt-3">
            <span>Total</span>
            <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
          </div>
        </div>
      )}

      {/* Tombol Kembali */}
      <div className="mt-6 text-center">
        <Link href={'/'}>
          <button className="text-white bg-gray-600 py-2 px-6 rounded-lg hover:bg-gray-700 transition">
            Pesan lagi yuk!
          </button>
        </Link>
      </div>

      {/* Footer */}
      {cartItems.length > 0 && (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t p-6 shadow-lg z-10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-700 font-medium">Total</span>
            <span className="text-xl font-bold text-gray-900">
              Rp {totalPrice.toLocaleString('id-ID')}
            </span>
          </div>
          <Link href="/checkout">
            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
              Checkout
            </button>
          </Link>
        </footer>
      )}
    </div>
  );
}

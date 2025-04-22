'use client';

import Link from 'next/link';

const mockOrder = {
  table: 23,
  time: new Date().toLocaleString('id-ID'),
  items: [
    { id: 1, name: 'Nasi Goreng Spesial', price: 25000, quantity: 1 },
    { id: 2, name: 'Es Teh Manis', price: 7000, quantity: 2 },
  ],
};

export default function OrderHistoryPage() {
  const subtotal = mockOrder.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const serviceFee = 2000;
  const total = subtotal + serviceFee;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8 font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Detail Pesanan</h1>

      <div className="bg-white rounded-xl shadow p-4 space-y-4 mb-6">
        {mockOrder.items.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div>
              <h2 className="text-sm font-semibold text-gray-800">
                {item.name}
              </h2>
              <p className="text-xs text-gray-500">
                {item.quantity} x Rp {item.price.toLocaleString('id-ID')}
              </p>
            </div>
            <p className="text-sm font-medium text-gray-700">
              Rp {(item.price * item.quantity).toLocaleString('id-ID')}
            </p>
          </div>
        ))}
      </div>

      {/* Ringkasan Harga */}
      <div className="bg-white rounded-xl shadow p-4 space-y-2 text-sm text-gray-700 mb-6">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>Rp {subtotal.toLocaleString('id-ID')}</span>
        </div>
        <div className="flex justify-between">
          <span>Biaya Layanan</span>
          <span>Rp {serviceFee.toLocaleString('id-ID')}</span>
        </div>
        <div className="flex justify-between font-semibold text-base text-gray-900 border-t pt-2">
          <span>Total</span>
          <span>Rp {total.toLocaleString('id-ID')}</span>
        </div>
      </div>

      <div className="text-center">
        <Link href="/">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
            Kembali ke Home
          </button>
        </Link>
      </div>
    </div>
  );
}

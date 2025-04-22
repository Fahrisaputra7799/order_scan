'use client';

import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="bg-white p-4 shadow-md mb-8 rounded-xl">
        <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
      </header>

      {/* Form Container */}
      <div className="bg-white p-8 rounded-xl shadow-lg space-y-8">
        {/* Nama Pemesan */}
        <div>
          <label className="block text-gray-700 text-sm font-medium">Nama Pemesan</label>
          <input
            type="text"
            required
            placeholder="Masukkan nama"
            className="mt-2 w-full border border-gray-300 rounded-lg p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 text-sm font-medium">Email</label>
          <input
            type="email"
            required
            placeholder="example@email.com"
            className="mt-2 w-full border border-gray-300 rounded-lg p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Nomor Telepon */}
        <div>
          <label className="block text-gray-700 text-sm font-medium">Nomor Telepon</label>
          <input
            type="tel"
            required
            placeholder="08xxxxxxxxxx"
            className="mt-2 w-full border border-gray-300 rounded-lg p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Nomor Meja (Read-only) */}
        <div>
          <label className="block text-gray-700 text-sm font-medium">Nomor Meja</label>
          <input
            type="text"
            value="23" // Bisa diubah dengan state dari QR scan nantinya
            readOnly
            className="mt-2 w-full bg-gray-100 border border-gray-300 rounded-lg p-4 text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* Metode Pembayaran */}
        <div>
          <label className="block text-gray-700 text-sm font-medium">Metode Pembayaran</label>
          <input
            type="text"
            value="QRIS"
            readOnly
            className="mt-2 w-full bg-gray-100 border border-gray-300 rounded-lg p-4 text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* Konfirmasi Button */}
        <div className="mt-6">
          <Link href="/qris">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all">
              Lanjutkan ke Pembayaran
            </button>
          </Link>
        </div>

        {/* Kembali ke Menu Button */}
        <div className="mt-4">
          <Link href="/">
            <button className="w-full bg-gray-300 text-black py-3 rounded-lg hover:bg-gray-400 transition-all">
              Kembali ke Menu
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

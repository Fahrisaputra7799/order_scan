'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function QRISPage() {
  const [timer, setTimer] = useState(300); // Timer in seconds (5 minutes)
  const totalAmount = 32000; // Total payment amount

  // Function to format time in MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // Timer countdown logic
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="bg-white p-4 shadow-md mb-8 rounded-xl">
        <h2 className="text-2xl font-bold text-gray-800">Pembayaran QRIS</h2>
      </header>

      {/* QRIS Payment Section */}
      <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
        <p className="font-semibold text-gray-700 mb-4">Scan QRIS untuk melakukan pembayaran</p>
        
        {/* QRIS Image (QR Code) */}
        <img
          src="/salaf.png" // Ganti dengan gambar QRIS Anda
          alt="QRIS Payment"
          className="w-40 mx-auto rounded-xl shadow-lg"
        />
        
        {/* Timer */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">Waktu untuk membayar:</p>
          <div className="text-2xl font-bold text-red-600">
            {formatTime(timer)}
          </div>
        </div>

        {/* Total Pembayaran */}
        <div className="mt-6 text-center">
          <p className="font-semibold text-gray-700 mb-3">Total Pembayaran:</p>
          <p className="text-xl font-bold text-blue-600">Rp {totalAmount.toLocaleString('id-ID')}</p>
        </div>

        {/* Button to Check Payment Status */}
        <div className="mt-6 text-center">
          <Link href="/payment-status">
            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all">
              Lihat Status Pembayaran
            </button>
          </Link>
        </div>

        {/* How to Pay Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Panduan Cara Membayar:</h3>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Buka aplikasi pembayaran yang mendukung QRIS (Gopay, OVO, DANA, dll).</li>
            <li>Pilih menu "Scan QR" dan arahkan ke QR code yang muncul di layar ini.</li>
            <li>Verifikasi jumlah yang tertera di aplikasi pembayaran Anda.</li>
            <li>Konfirmasi pembayaran dan pastikan transaksi berhasil.</li>
          </ul>
        </div>

        {/* Kembali ke Menu Button */}
        <div className="mt-6">
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

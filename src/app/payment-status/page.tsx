'use client';

import { CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentStatusPage({ success = true }: { success?: boolean }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6">
      {success ? (
        <>
          <CheckCircle className="text-green-500 w-24 h-24 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Pembayaran Berhasil</h1>
          <p className="text-gray-600 mb-6">Terima kasih! Pesanan kamu sedang diproses dan akan segera disiapkan.</p>
        </>
      ) : (
        <>
          <XCircle className="text-red-500 w-24 h-24 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Pembayaran Gagal</h1>
          <p className="text-gray-600 mb-6">Oops! Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.</p>
        </>
      )}

      <div className="flex gap-3">
        <Link href="/">
          <button className="px-6 py-3 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition-all">
            Kembali ke Home
          </button>
        </Link>
        <Link href="/order-history">
          <button className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 text-sm hover:bg-gray-300 transition-all">
            Lihat Pesanan
          </button>
        </Link>
      </div>
    </div>
  );
}

'use client';

import { CheckCircleIcon } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
      <CheckCircleIcon className="w-20 h-20 text-green-600 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Pembayaran Berhasil!</h1>
      <p className="text-gray-600 mb-6">Terima kasih telah memesan di Restoran ABC.</p>
      <Link href="/">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Kembali ke Halaman Utama
        </button>
      </Link>
    </div>
  );
}

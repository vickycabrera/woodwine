'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/store/cart';

interface PaymentStatus {
  status: string;
  payment_id: string;
  amount: number;
  email?: string;
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState<PaymentStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const payment_id = searchParams.get('payment_id');
    const status = searchParams.get('status');
    const cart = useCart();
    
    if (payment_id && status === 'approved') {
      // Recuperar datos del localStorage
      const checkoutData = localStorage.getItem('checkout_data');
      if (checkoutData) {
        const { form } = JSON.parse(checkoutData);
        
        setPaymentInfo({
          status,
          payment_id,
          amount: Number(searchParams.get('transaction_amount')) || 0,
          email: form.email
        });

        // Limpiar carrito y datos guardados
        cart.clearCart();
        localStorage.removeItem('checkout_data');
      }
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!paymentInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-600">Payment Error</h1>
        <p>No payment information found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <div className="space-y-4">
          <div>
            <p className="text-gray-600">Payment ID:</p>
            <p className="font-medium">{paymentInfo.payment_id}</p>
          </div>
          <div>
            <p className="text-gray-600">Status:</p>
            <p className="font-medium capitalize">{paymentInfo.status}</p>
          </div>
          <div>
            <p className="text-gray-600">Amount:</p>
            <p className="font-medium">${paymentInfo.amount}</p>
          </div>
          {paymentInfo.email && (
            <div>
              <p className="text-gray-600">Email:</p>
              <p className="font-medium">{paymentInfo.email}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

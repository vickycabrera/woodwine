'use client';

import { useState } from 'react';

interface MercadoPagoButtonProps {
  title: string;
  price: number;
  quantity: number;
}

export default function MercadoPagoButton({ title, price, quantity }: MercadoPagoButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          price,
          quantity,
        }),
      });

      const data = await response.json();
      
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        throw new Error('No init_point received');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      alert('Error creating payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Processing...' : 'Pay with Mercado Pago'}
    </button>
  );
}

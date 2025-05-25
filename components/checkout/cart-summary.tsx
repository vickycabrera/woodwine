"use client"

import { useCart } from "@/store/cart"
import { formatPrice } from "@/lib/utils"

export function CartSummary() {
  const cart = useCart()

  if (cart.items.length === 0) {
    return null
  }

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-xl font-semibold">Resumen del pedido</h2>
      <div className="space-y-2">
        {cart.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>{item.quantity}x</span>
              <span>{item.name}</span>
            </div>
            <span>{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}
        <div className="border-t pt-2">
          <div className="flex items-center justify-between font-semibold">
            <span>Total</span>
            <span>
              {formatPrice(
                cart.items.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

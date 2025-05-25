"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import MainNav from "@/components/layout/main-nav"
import { useCart } from "@/store/cart"
import { formatPrice } from "@/lib/utils"

export default function CartPage() {
  const cart = useCart()

  if (cart.items.length === 0) {
    return (
      <>
        <MainNav />
        <div className="container flex flex-col items-center justify-center py-24">
          <h1 className="mb-4 text-2xl font-bold">Tu carrito está vacío</h1>
          <p className="mb-8 text-gray-500">
            Agrega algunos productos para comenzar
          </p>
          <Button asChild>
            <Link href="/productos">Ver productos</Link>
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <MainNav />
      <div className="container py-8">
        <h1 className="mb-8 text-3xl font-bold">Carrito de compras</h1>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 rounded-lg border p-4"
                >
                  <div className="relative h-24 w-24">
                    <Image
                      src={item.image}
                      alt={item.name}
fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          cart.updateQuantity(item.id, Math.max(0, item.quantity - 1))
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          cart.updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => cart.removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 text-lg font-semibold">Resumen</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-t pt-4">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">
                    {formatPrice(cart.total)}
                  </span>
                </div>
              </div>
              <Button asChild className="mt-6 w-full">
                <Link href="/checkout">Finalizar compra</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

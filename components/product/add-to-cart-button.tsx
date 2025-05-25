"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/store/cart"

interface Product {
  id: string
  name: string
  price: number
  images: string[]
}

export function AddToCartButton({ product }: { product: Product }) {
  const { toast } = useToast()
  const cart = useCart()

  const addToCart = () => {
    if (!product) return

    cart.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    })

    toast({
      title: "Producto agregado",
      description: `${product.name} se agregó al carrito`,
    })
  }

  return (
    <Button onClick={addToCart} className="w-full">
      <ShoppingCart className="mr-2 h-5 w-5" />
      Agregar al carrito
    </Button>
  )
}

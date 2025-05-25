"use client"
import Image from "next/image"
import Link from "next/link"

import { motion } from "framer-motion"
import { ShoppingCart } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/store/cart"
import { formatPrice } from "@/lib/utils"
import { type Product } from "@/lib/data"

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { toast } = useToast()
  const cart = useCart()

  const addToCart = () => {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}>

      <Card className="overflow-hidden">
        <Link href={`/productos/${product.id}`}>
          <div className="aspect-square overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={400}
              height={400}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>
        </Link>
        <CardContent className="p-4">
          <div className="space-y-1">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500">
              {product.description.length > 100
                ? product.description.substring(0, 100) + "..."
                : product.description}
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-4">
          <div className="flex w-full items-center justify-between">
            <p className="font-semibold">{formatPrice(product.price)}</p>
            <Button onClick={addToCart} size="sm">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Agregar
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default ProductCard

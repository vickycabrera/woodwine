import Image from "next/image"
import { notFound } from "next/navigation"
import { getProductById } from "@/lib/data"
import MainNav from "@/components/layout/main-nav"
import { AddToCartButton } from "@/components/product/add-to-cart-button"
import { formatPrice } from "@/lib/utils"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <>
      <MainNav />
      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative aspect-square">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-2xl font-bold">{formatPrice(product.price)}</p>
              <p className="text-gray-500">{product.description}</p>
              <div className="space-y-2">
                <p className="font-semibold">Categoría:</p>
                <p>{product.category}</p>
              </div>
            </div>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </>
  )
}



import { getFeaturedProducts } from "@/lib/data"
import MainNav from "@/components/layout/main-nav"
import ProductCard from "@/components/product/product-card"

export default function Home() {
  const featuredProducts = getFeaturedProducts()

  return (
    <>
      <MainNav />
      <div className="flex flex-col items-center justify-center space-y-4 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          WoodWine
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
          Descubre nuestra selección de vinos premium y espumantes
        </p>
      </div>
      <section className="container py-8">
        <h2 className="mb-8 text-2xl font-bold">Productos Destacados</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}

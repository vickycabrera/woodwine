import { categories, products } from "@/lib/data"
import MainNav from "@/components/layout/main-nav"
import ProductCard from "@/components/product/product-card"
import { Button } from "@/components/ui/button"

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const category = searchParams?.category
  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products

  return (
    <>
      <MainNav />
      <div className="container py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Productos</h1>
          <div className="flex gap-2">
            <Button
              variant={!category ? "default" : "outline"}
              asChild
            >
              <a href="/productos">Todos</a>
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={category === cat ? "default" : "outline"}
                asChild
              >
                <a href={`/productos?category=${cat}`}>{cat}</a>
              </Button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  )
}

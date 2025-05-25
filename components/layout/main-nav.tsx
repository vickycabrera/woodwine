"use client"
import Link from "next/link"
import { ShoppingCart, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/store/cart"

const MainNav = () => {
  const cart = useCart()
  const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent hover:text-primary lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <Link 
                href="/" 
                className="text-lg font-medium"
              >
                Inicio
              </Link>
              <Link 
                href="/productos" 
                className="text-lg font-medium"
              >
                Productos
              </Link>
              <Link 
                href="/categorias" 
                className="text-lg font-medium"
              >
                Categorías
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">WoodWine</span>
        </Link>
        <nav className="hidden gap-6 lg:flex">
          <Link href="/productos" className="text-sm font-medium transition-colors hover:text-primary">
            Productos
          </Link>
          <Link href="/categorias" className="text-sm font-medium transition-colors hover:text-primary">
            Categorías
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Link href="/carrito">
            <Button variant="ghost" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Carrito</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default MainNav

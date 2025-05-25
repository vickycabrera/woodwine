export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  featured: boolean
  images: string[]
}

export const categories = [
  "Tintos",
  "Blancos",
  "Rosados",
  "Espumantes"
]

export const products: Product[] = [
  {
    id: "1",
    name: "Catena Zapata Malbec",
    description: "Un vino tinto elegante con notas de frutas negras y especias",
    price: 8500,
    category: "Tintos",
    featured: true,
    images: ["/images/image-1.jpg"]
  },
  {
    id: "2",
    name: "Luigi Bosca Sauvignon Blanc",
    description: "Vino blanco fresco y aromático con notas cítricas",
    price: 5200,
    category: "Blancos",
    featured: true,
    images: ["/images/image-2.jpg"]
  },
  {
    id: "3",
    name: "Rutini Rosé",
    description: "Rosado elegante y refrescante con notas de frutos rojos",
    price: 4800,
    category: "Rosados",
    featured: false,
    images: ["/images/image-3.jpg"]
  },
  {
    id: "4",
    name: "Chandon Extra Brut",
    description: "Espumante fresco y equilibrado con finas burbujas",
    price: 6300,
    category: "Espumantes",
    featured: true,
    images: ["/images/image-4.jpg"]
  }
]

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category)
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id)
}

export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase()
  return products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  )
}

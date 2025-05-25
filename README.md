# WoodWine - Tienda Online de Vinos

Una tienda online moderna desarrollada con Next.js 14, TypeScript, Tailwind CSS y shadcn/ui.

## Características

- 🛍️ Catálogo de productos con filtros por categoría
- 🔍 Búsqueda de productos
- 🛒 Carrito de compras persistente con Zustand
- 💳 Proceso de checkout
- 📱 Diseño responsivo
- ⚡ Animaciones suaves con Framer Motion
- 🎨 UI moderna con shadcn/ui y Tailwind CSS
- 📊 Panel de administración básico

## Tecnologías

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zustand
- Framer Motion
- React Hook Form + Zod

## Inicio rápido

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Construir para producción
pnpm build

# Iniciar servidor de producción
pnpm start
```

## Estructura del proyecto

```
woodwine/
├── app/                    # App Router de Next.js
│   ├── (shop)/            # Rutas públicas de la tienda
│   ├── admin/             # Panel de administración
│   └── api/               # API routes
├── components/            # Componentes React
│   ├── admin/            # Componentes del admin
│   ├── layout/           # Componentes de layout
│   ├── product/          # Componentes de productos
│   └── ui/               # Componentes de UI (shadcn)
├── lib/                  # Utilidades y configuración
├── store/                # Estado global (Zustand)
└── types/                # TypeScript types
```

## Características principales

### Catálogo de productos
- Vista de productos con filtros por categoría
- Búsqueda de productos
- Vista detallada de producto con galería

### Carrito de compras
- Agregar/quitar productos
- Actualizar cantidades
- Persistencia con localStorage
- Resumen del carrito

### Checkout
- Formulario de datos de envío
- Validación de formularios con Zod
- Resumen de la orden

### Panel de administración
- CRUD de productos
- Gestión de productos destacados
- Vista de pedidos (mock)

## Licencia

MIT

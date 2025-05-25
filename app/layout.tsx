import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../styles/globals.css"
import "@radix-ui/themes/styles.css"
import { Theme } from "@radix-ui/themes"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WoodWine - Tu Vinoteca Online",
  description: "Descubre nuestra selección de vinos premium y espumantes",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="antialiased">
      <body className={`${inter.className} min-h-screen bg-background font-sans antialiased`}>
        <Theme>
          {children}
          <Toaster />
        </Theme>
      </body>
    </html>
  )
}

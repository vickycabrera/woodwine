import MainNav from "@/components/layout/main-nav"
import { CheckoutForm } from "@/components/checkout/checkout-form"
import { CartSummary } from "@/components/checkout/cart-summary"

export default function CheckoutPage() {
  return (
    <>
      <MainNav />
      <div className="container py-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-3xl font-bold">Finalizar compra</h1>
          <CartSummary />
          <CheckoutForm />
        </div>
      </div>
    </>
  )
}

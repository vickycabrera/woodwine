"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/store/cart"

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  address: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  city: z.string().min(2, "La ciudad debe tener al menos 2 caracteres"),
  postalCode: z.string().min(4, "El código postal debe tener al menos 4 caracteres"),
})

export function CheckoutForm() {
  const router = useRouter()
  const { toast } = useToast()
  const cart = useCart()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const cartTotal = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Compra en WoodWine',
          price: cartTotal,
          quantity: 1,
        }),
      });
      const data = await response.json();
      console.log(data)
      
      if (data.init_point) {
        // Guardamos los datos del formulario y el carrito en localStorage para recuperarlos después
        localStorage.setItem('checkout_data', JSON.stringify({
          form: values,
          cart: cart.items
        }));
        
        window.location.href = data.init_point;
      } else {
        throw new Error('No se pudo crear la preferencia de pago');
      }
    } catch (error) {
      console.error('Error al crear el pago:', error);
      toast({
        title: 'Error',
        description: 'Hubo un error al procesar el pago. Por favor intenta nuevamente.',
        variant: 'destructive',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre completo</FormLabel>
              <FormControl>
                <Input placeholder="Juan Pérez" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="juan@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input placeholder="Av. Siempreviva 742" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ciudad</FormLabel>
              <FormControl>
                <Input placeholder="Buenos Aires" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código postal</FormLabel>
              <FormControl>
                <Input placeholder="1234" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Finalizar compra
        </Button>
      </form>
    </Form>
  )
}

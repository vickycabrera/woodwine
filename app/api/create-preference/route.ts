import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
const preference = new Preference(client);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, price, quantity } = body;

    const preferenceData = {
      items: [
        {
          id: '1',
          title,
          currency_id: 'ARS',
          picture_url: '',
          description: title,
          category_id: 'others',
          unit_price: Number(price),
          quantity: Number(quantity),
        },
      ],
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
        failure: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
        pending: `${process.env.NEXT_PUBLIC_SITE_URL}/success`
      }
    };

    const result = await preference.create({ body: preferenceData });

    return NextResponse.json({ 
      id: result.id,
      init_point: result.init_point 
    });
  } catch (error) {
    console.error('Error creating preference:', error);
    return NextResponse.json(
      { error: 'Error creating payment preference' },
      { status: 500 }
    );
  }
}

import Stripe from "stripe";

type Product = {
  id: string;
  title: string;
  price: number;
  color: string;
  size: string;
  image: string;
};

type Promocode = {
  code: string;
  percent: number;
  isValid: boolean;
};

export async function checkout({
  products,
  promocode,
}: {
  products: Product[];
  promocode: Promocode;
}): Promise<string> {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

  let stripeProducts = [];

  if (promocode.isValid) {
    const prods = {
      price_data: {
        currency: "usd",
        product_data: {
          name: "Your m2vira order",
          images: [
            "https://firebasestorage.googleapis.com/v0/b/m2vira-storage.appspot.com/o/logo-black.png?alt=media&token=7ebf11d2-4ab7-4d9f-82c6-5628fa6f9833",
          ],
        },
        unit_amount: 0,
      },
      quantity: 1,
    };

    products.map((p) => {
      prods.price_data.unit_amount += p.price * 100;
    });

    prods.price_data.product_data.name += ` + ${promocode.percent}% Discount!`;
    prods.price_data.unit_amount = Math.floor(
      prods.price_data.unit_amount -
        (prods.price_data.unit_amount / 100) * promocode.percent
    );

    stripeProducts.push(prods);
  } else {
    stripeProducts = products.map((p) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: p.title,
            images: [p.image],
          },
          unit_amount: p.price * 100,
        },
        quantity: 1,
      };
    });
  }

  stripeProducts.push({
    price_data: {
      currency: "usd",
      product_data: {
        name: "Shipping",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/m2vira-storage.appspot.com/o/shipping.png?alt=media&token=b3f51ad8-e881-4b55-917e-eb5f2c086ac3",
        ],
      },
      unit_amount: 899,
    },
    quantity: 1,
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: stripeProducts,
    mode: "payment",
    success_url: "https://m2vira.vercel.app/cart/checkout",
    cancel_url: "https://m2vira.vercel.app/cart/mine",
  });

  return session.url!;
}

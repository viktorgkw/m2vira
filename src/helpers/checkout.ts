import Stripe from "stripe";

export async function checkout({
  cartTotal,
}: {
  cartTotal: number;
}): Promise<string> {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Your m2vira Order",
          },
          unit_amount: cartTotal * 100,
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Shipping",
          },
          unit_amount: 899,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://m2vira.vercel.app/cart/checkout",
    cancel_url: "https://m2vira.vercel.app/cart/mine",
  });

  return session.url!;
}

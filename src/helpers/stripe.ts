import Stripe from "stripe";

type Product = {
  id: string;
  title: string;
  price: number;
  color: string;
  size: string;
  images: string[];
};

export async function checkout({
  products,
}: {
  products: Product[];
}): Promise<string> {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

  const stripeProducts = products.map((p) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: p.title,
          images: p.images,
        },
        unit_amount: p.price * 100,
      },
      quantity: 1,
    };
  });

  stripeProducts.push({
    price_data: {
      currency: "usd",
      product_data: {
        name: "Shipping",
        images: [
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%2Fimages%3Fk%3Dshipping&psig=AOvVaw3iuvjDtZ2UqRmX3Ow8M_nJ&ust=1702747654042000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCIDfp737kYMDFQAAAAAdAAAAABAD",
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

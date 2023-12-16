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

  const stripeProducts = products.map((p) => {
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

  if (promocode.isValid) {
    const totalAmount = stripeProducts.reduce(
      (total, product) => total + product.price_data.unit_amount,
      0
    );

    const discountAmount = totalAmount * (promocode.percent / 100);

    stripeProducts.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Discount",
          images: [
            "https://firebasestorage.googleapis.com/v0/b/m2vira-storage.appspot.com/o/discount.jpg?alt=media&token=cbe6e849-4402-4372-a42b-fbfe6a4c4598",
          ],
        },
        unit_amount: -Math.round(discountAmount * 100),
      },
      quantity: 1,
    });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: stripeProducts,
    mode: "payment",
    success_url: "https://m2vira.vercel.app/cart/checkout",
    cancel_url: "https://m2vira.vercel.app/cart/mine",
  });

  return session.url!;
}

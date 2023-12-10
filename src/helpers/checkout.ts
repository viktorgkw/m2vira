import { loadStripe } from "@stripe/stripe-js";

export async function checkout({ lineItems }: any) {
  let stripePromise: any = null;

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );

      return stripePromise;
    }
  };

  const stripe = await getStripe();

  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: "https://m2vira.vercel.app/profile",
    cancelUrl: "https://m2vira.vercel.app/cart",
  });
}

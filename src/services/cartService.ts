import { ProductStateType } from "@/types/ProductStateType";

export async function orderCart(userEmail: string | null | undefined) {
  await fetch(`${process.env.DOMAIN}/api/cart/order`, {
    method: "POST",
    body: JSON.stringify({ userEmail }),
  });
}

export async function addToCart(
  productState: ProductStateType,
  email: string | null | undefined
) {
  const res = await fetch(`${process.env.DOMAIN}/api/cart/add`, {
    method: "POST",
    body: JSON.stringify({
      productState,
      email,
    }),
  });
  const data = await res.json();

  return { status: data.status, message: data.message };
}

export async function deleteFromCart(
  id: string,
  email: string | null | undefined
) {
  const res = await fetch(`${process.env.DOMAIN}/api/cart/delete`, {
    method: "POST",
    body: JSON.stringify({ id, email }),
  });
  const data = await res.json();

  return { status: data.status, message: data.message };
}

export async function getAllProductsFromCart(email: string | null | undefined) {
  const res = await fetch(`${process.env.DOMAIN}/api/cart/get`, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  const data = await res.json();

  return { status: data.status, message: data.message, cart: data.cart };
}

import { ProductStateType } from "@/types/ProductStateType";

export async function orderCart() {
  await fetch(`${process.env.DOMAIN}/api/cart/order`);
}

export async function addToCart(productState: ProductStateType) {
  const res = await fetch(`${process.env.DOMAIN}/api/cart/add`, {
    method: "POST",
    body: JSON.stringify({
      productState,
    }),
  });
  const data = await res.json();

  return { status: data.status, message: data.message };
}

export async function deleteFromCart(id: string) {
  const res = await fetch(`${process.env.DOMAIN}/api/cart/delete`, {
    method: "POST",
    body: JSON.stringify({ id }),
  });
  const data = await res.json();

  return { status: data.status, message: data.message };
}

export async function getAllProductsFromCart() {
  const res = await fetch(`${process.env.DOMAIN}/api/cart/get`);
  const data = await res.json();

  return { status: data.status, message: data.message, cart: data.cart };
}

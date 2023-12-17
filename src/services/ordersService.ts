export async function getAll() {
  const res = await fetch(`${process.env.DOMAIN}/api/orders`);
  const data = await res.json();

  return data.orders;
}

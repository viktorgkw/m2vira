export async function getAll() {
  const res = await fetch(`${process.env.DOMAIN}/api/products/all`);
  const data = await res.json();

  return { status: data.status, products: data.products };
}

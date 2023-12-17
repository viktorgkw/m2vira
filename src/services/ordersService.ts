export async function getAll(userEmail: string | null | undefined) {
  const res = await fetch(`${process.env.DOMAIN}/api/orders`, {
    method: "POST",
    body: JSON.stringify({ email: userEmail }),
  });
  const data = await res.json();

  return { orders: data.orders };
}

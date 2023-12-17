export async function addFavorite(_id: string) {
  const res = await fetch(`${process.env.DOMAIN}/api/favorites/add`, {
    method: "POST",
    body: JSON.stringify({
      _id,
    }),
  });
  const data = await res.json();

  return { message: data.message, status: data.status };
}

export async function getAll() {
  const res = await fetch(`${process.env.DOMAIN}/api/favorites/all`);
  const data = await res.json();

  return data.products;
}

export async function removeFav(_id: string) {
  const res = await fetch(`${process.env.DOMAIN}/api/favorites/remove`, {
    method: "POST",
    body: JSON.stringify({ _id }),
  });
  const data = await res.json();

  return { status: data.status, message: data.message };
}

export async function addFavorite(
  _id: string,
  email: string | undefined | null
) {
  const res = await fetch(`${process.env.DOMAIN}/api/favorites/add`, {
    method: "POST",
    body: JSON.stringify({
      _id,
      email,
    }),
  });
  const data = await res.json();

  return { message: data.message, status: data.status };
}

export async function getAll(email: string | null | undefined) {
  const res = await fetch(`${process.env.DOMAIN}/api/favorites/all`, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  const data = await res.json();

  return data.products;
}

export async function removeFav(_id: string, email: string | null | undefined) {
  const res = await fetch(`${process.env.DOMAIN}/api/favorites/remove`, {
    method: "POST",
    body: JSON.stringify({ _id, email }),
  });
  const data = await res.json();

  return { status: data.status, message: data.message };
}

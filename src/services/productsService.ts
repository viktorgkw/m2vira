export async function getAll() {
  const res = await fetch(`${process.env.DOMAIN}/api/products/all`);
  const data = await res.json();

  return {
    status: data.status,
    products: data.products,
    message: data.message,
  };
}

export async function detailsById(id: string) {
  const res = await fetch(`${process.env.DOMAIN}/api/products/details`, {
    method: "POST",
    body: JSON.stringify({ id }),
  });
  const data = await res.json();

  return { status: data.status, product: data.product };
}

export async function create(formData: FormData) {
  const res = await fetch(`${process.env.DOMAIN}/api/products/create`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();

  return { status: data.status, message: data.message };
}

export async function edit(product: any) {
  const res = await fetch(`${process.env.DOMAIN}/api/products/edit`, {
    method: "POST",
    body: JSON.stringify(product),
  });
  const data = await res.json();

  return { status: data.status, message: data.message };
}

export async function deleteById(_id: string) {
  const res = await fetch(`${process.env.DOMAIN}/api/products/delete`, {
    method: "POST",
    body: JSON.stringify({ _id }),
  });
  const data = await res.json();

  return { status: data.status, message: data.message };
}

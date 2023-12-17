export async function getAll() {
  const res = await fetch(`${process.env.DOMAIN}/api/promocodes/all`);
  const data = await res.json();

  return {
    status: data.status,
    codes: data.codes,
  };
}

export async function createPromocode(code: string, percent: number) {
  const res = await fetch(`${process.env.DOMAIN}/api/promocodes/create`, {
    method: "POST",
    body: JSON.stringify({ code, percent }),
  });
  const data = await res.json();

  return { status: data.status, message: data.message };
}

export async function deleteById(_id: string) {
  const res = await fetch(`${process.env.DOMAIN}/api/promocodes/delete`, {
    method: "POST",
    body: JSON.stringify({ _id }),
  });
  const data = await res.json();

  return { status: data.status, message: data.message };
}

export async function validatePromocode(promocode: any) {
  const res = await fetch(`${process.env.DOMAIN}/api/promocodes/validate`, {
    method: "POST",
    body: JSON.stringify({ promocode: promocode.id }),
  });
  const data = await res.json();

  return { status: data.status, message: data.message, code: data.code };
}

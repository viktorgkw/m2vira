export async function isAdministrator() {
  const res = await fetch(`${process.env.DOMAIN}/api/permissions`);
  const data = await res.json();

  return data.isAdmin;
}

export async function isAdministratorByEmail(email: string) {
  const res = await fetch(`${process.env.DOMAIN}/api/permissions`, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  const data = await res.json();

  return data.isAdmin;
}

export async function signUserIn(name: string, email: string) {
  await fetch(`${process.env.DOMAIN}/api/signIn`, {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
    }),
  });
}

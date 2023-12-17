export async function isAdminByEmail(email: string | null | undefined) {
  if (email === null || email === undefined) return false;

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

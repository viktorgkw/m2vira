export async function isAdminByEmail() {
  const res = await fetch(`${process.env.DOMAIN}/api/permissions`);
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

export async function getAllUsers() {
  const res = await fetch(`${process.env.DOMAIN}/api/users/all`);
  const data = await res.json();

  return {
    status: data.status,
    users: data.users,
  };
}

export async function deleteUserById(_id: string) {
  const res = await fetch(`${process.env.DOMAIN}/api/users/delete`, {
    method: "POST",
    body: JSON.stringify({ _id }),
  });
  const data = await res.json();

  return { status: data.status, message: data.message };
}

"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export const UsersData = ({ users }: any) => {
  const [usrs, setUsers] = useState(users);

  const deleteUser = async (id: any) => {
    const raw = await fetch(`${process.env.DOMAIN}/api/users/delete`, {
      method: "POST",
      body: JSON.stringify({ _id: id }),
    });

    const res = await raw.json();

    if (res.status === 200) {
      setUsers(usrs.filter((u: any) => u._id !== id));
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <table className="leading-normal w-auto">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Username
          </th>

          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Email
          </th>

          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Is Admin
          </th>

          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Functions
          </th>
        </tr>
      </thead>
      <tbody>
        {usrs.map((u: any) => (
          <tr key={u.username}>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <div className="flex items-center">
                <p className="whitespace-no-wrap text-violet-600">
                  {u.username}
                </p>
              </div>
            </td>

            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p className="whitespace-no-wrap text-emerald-600">{u.email}</p>
            </td>

            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p className="whitespace-no-wrap text-emerald-600">
                {u.isAdmin ? "Yes" : "No"}
              </p>
            </td>

            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <button
                onClick={() => deleteUser(u._id)}
                className="px-3 py-2 text-sm text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:outline-none font-medium mx-1"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

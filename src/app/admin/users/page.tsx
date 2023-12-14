import { UsersData } from "@/app/components/Admin/UsersData";

export default async function AdminUsers() {
  const raw = await fetch("https://m2vira.vercel.app/api/users/all");

  const res = await raw.json();

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-4">
        <h1 className="text-center text-3xl md:text-5xl">Manage Users</h1>

        <hr className="h-1 md:w-96 w-64 mx-auto my-4 border-0 rounded md:mt-5 md:mb-6 bg-gradient-to-r dark:from-slate-300 dark:via-slate-200 dark:to-slate-300 from-slate-800 via-slate-700 to-slate-800 drop-shadow-lg" />
      </div>

      {res.users.length > 0 ? (
        <div className="overflow-x-auto flex justify-center">
          <div className="inline-block max-w-fit drop-shadow-xl rounded-lg overflow-hidden">
            <table className="leading-normal w-auto ">
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
              <UsersData users={res.users} />
            </table>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-8 mx-2">
          <div className="flex flex-col items-center justify-center bg-white bg-opacity-50 rounded-xl px-6 py-8">
            <p className="text-red-700 text-2xl md:text-3xl font-bold text-center uppercase">
              No users at the moment!
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export const dynamic = "force-dynamic";

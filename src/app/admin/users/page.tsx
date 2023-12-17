import { redirect } from "next/navigation";
import { UsersData } from "@/app/components/Admin/UsersData";
import { Loading } from "@/app/components/Loading";
import { FormTitle } from "@/app/components/Global/FormTitle";
import { NoData } from "@/app/components/Global/NoData";
import { getAllUsers } from "@/services/usersService";

export default async function AdminUsers() {
  const { status, users } = await getAllUsers();

  if (status !== 200) redirect("/");

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-4">
        <FormTitle text="Users" />
      </div>

      {!users ? (
        <Loading />
      ) : users.length > 0 ? (
        <div className="px-4 sm:px-8 py-4 overflow-x-auto md:flex md:justify-center">
          <div className="inline-block max-w-fit shadow rounded-lg overflow-hidden">
            <UsersData users={users} />
          </div>
        </div>
      ) : (
        <NoData text="No users at the moment!" />
      )}
    </>
  );
}

export const dynamic = "force-dynamic";

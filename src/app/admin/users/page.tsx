"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UsersData } from "@/app/components/Admin/UsersData";
import { Loading } from "@/app/components/Loading";
import { FormTitle } from "@/app/components/Global/FormTitle";
import { NoData } from "@/app/components/Global/NoData";

export default function AdminUsers() {
  const router = useRouter();

  const [users, setUsers] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.DOMAIN}/api/users/all`);

      const data = await res.json();

      if (data.status !== 200) {
        toast.error(data.message);
        router.push("/");
      }

      setUsers(data.users);
    };

    fetchData();
  }, [router]);

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

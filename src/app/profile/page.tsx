"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Loading } from "../components/Loading";
import { UserInfo } from "../components/Profile/UserInfo";
import { OrdersLayout } from "../components/Profile/OrdersLayout";
import { LogoutButton } from "../components/Profile/LogoutButton";

config.autoAddCss = false;

export default function ProfilePage() {
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.DOMAIN}/api/orders`, {
      method: "POST",
      body: JSON.stringify({ email: session?.user?.email }),
    })
      .then((raw) => raw.json())
      .then((data) => {
        setOrders(data.orders);
      });
  }, [session, router]);

  return (
    <>
      {!session?.user ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen antialiased">
          <div className="container mx-auto">
            <div className="pb-3 relative shadow-2xl rounded-lg w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto bg-gradient-to-r dark:from-slate-950 dark:via-slate-800 dark:to-slate-950 bg-[position:_0%_0%] hover:bg-[position:_100%_100%] bg-[size:_200%] transition-all duration-500 from-indigo-200 via-purple-200 to-pink-200">
              <div className="pt-8">
                <UserInfo name={session.user.name} email={session.user.email} />

                <hr className="w-48 h-1 mx-auto my-4 border-0 rounded md:mt-5 md:mb-6 bg-gradient-to-r dark:from-slate-400 dark:via-slate-300 dark:to-slate-400 from-slate-800 via-slate-700 to-slate-800 drop-shadow-lg" />

                <OrdersLayout orders={orders} />

                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

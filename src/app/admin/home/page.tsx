import { faPercent, faSocks, faUsers } from "@fortawesome/free-solid-svg-icons";
import { AdminOptionCard } from "../../components/Admin/AdminOptionCard";

export default function Dashboard() {
  return (
    <>
      <h1 className="text-center font-medium text-3xl md:text-5xl mt-4">
        Dashboard
      </h1>

      <hr className="h-1 md:w-72 w-48 mx-auto my-4 border-0 rounded md:mt-5 md:mb-12 bg-gradient-to-r dark:from-slate-300 dark:via-slate-200 dark:to-slate-300 from-slate-800 via-slate-700 to-slate-800 drop-shadow-lg" />

      <div className="flex flex-wrap items-center justify-center mt-8">
        <AdminOptionCard
          icon={faUsers}
          iconColor="text-fuchsia-600"
          text="Users"
          link={"/admin/users"}
        />

        <AdminOptionCard
          icon={faSocks}
          iconColor="text-amber-600"
          text="Products"
          link={"/admin/products"}
        />

        <AdminOptionCard
          icon={faPercent}
          iconColor="text-indigo-600"
          text="Promocodes"
          link={"/admin/promocodes"}
        />
      </div>
    </>
  );
}

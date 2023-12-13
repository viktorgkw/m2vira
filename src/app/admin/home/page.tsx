import {
  faPenToSquare,
  faPlus,
  faTrashCan,
  faUserMinus,
} from "@fortawesome/free-solid-svg-icons";
import { AdminOptionCard } from "../../components/Admin/AdminOptionCard";

export default function AdminPanel() {
  return (
    <>
      <h1 className="text-center font-medium text-3xl md:text-5xl mt-4">
        Admin Panel
      </h1>

      <hr className="h-1 md:w-72 w-48 mx-auto my-4 border-0 rounded md:mt-5 md:mb-12 bg-gradient-to-r dark:from-slate-300 dark:via-slate-200 dark:to-slate-300 from-slate-800 via-slate-700 to-slate-800 drop-shadow-lg" />

      <div className="flex flex-wrap items-center">
        <AdminOptionCard
          icon={faUserMinus}
          iconColor="text-red-600"
          text="Delete user"
          link={"/admin/manage/users"}
        />

        <AdminOptionCard
          icon={faPlus}
          iconColor="text-emerald-600"
          text="Add product"
          link={"/products/create"}
        />

        <AdminOptionCard
          icon={faTrashCan}
          iconColor="text-rose-600"
          text="Delete product"
          link={"/admin/manage/products"}
        />

        <AdminOptionCard
          icon={faPenToSquare}
          iconColor="text-indigo-600"
          text="Edit product"
          link={"/admin/manage/products"}
        />
      </div>
    </>
  );
}

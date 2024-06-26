import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AdminOptionCard = ({ icon, iconColor, text, link }: any) => {
  return (
    <Link href={link} className="w-full px-4 mb-6 sm:w-1/2 md:w-[30%] lg:mb-6">
      <div className="py-8 bg-slate-200 hover:bg-slate-100 dark:bg-slate-800 bg-opacity-75 hover:bg-opacity-75 dark:bg-opacity-75 rounded-lg flex flex-col items-center">
        <FontAwesomeIcon icon={icon} className={"w-10 h-10 " + iconColor} />

        <p className="mt-4 mb-2 text-3xl font-bold text-slate-800 dark:text-slate-200 text-center">
          {text}
        </p>
      </div>
    </Link>
  );
};

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const InfoCard = ({ icon, value, text }: any) => {
  return (
    <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
      <div className="p-6 bg-slate-200 dark:bg-slate-800 bg-opacity-75 dark:bg-opacity-75 rounded-lg">
        <FontAwesomeIcon
          icon={icon}
          className="w-10 h-10 text-slate-800 dark:text-slate-200"
        />
        <p className="mt-4 mb-2 text-3xl font-bold text-slate-800 dark:text-slate-200">
          {value}
        </p>
        <h2 className="text-sm text-slate-800 dark:text-slate-200">{text}</h2>
      </div>
    </div>
  );
};

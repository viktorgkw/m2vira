import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const NoOrders = () => {
  return (
    <div className="text-red-500 flex justify-center items-center">
      <FontAwesomeIcon icon={faCircleXmark} width={16} height={16} />
      <p className="ml-1 dark:text-slate-300 text-slate-800">No orders yet!</p>
    </div>
  );
};

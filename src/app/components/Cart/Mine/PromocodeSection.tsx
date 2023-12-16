import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const PromocodeSection = ({
  promocode,
  promocodeDisabled,
  setPromocode,
  applyPromocode,
}: any) => {
  return (
    <div className="flex flex-row justify-center items-center mb-4">
      <input
        className="p-2 rounded-lg dark:text-slate-800 dark:bg-slate-200 drop-shadow-lg md:w-48 w-[75%] outline-none text-slate-200 bg-slate-800 mx-1 disabled:opacity-25"
        type="text"
        value={promocode.code}
        disabled={promocodeDisabled}
        onChange={(e) => setPromocode({ ...promocode, code: e.target.value })}
        placeholder="Enter Promocode"
      />

      <button
        onClick={applyPromocode}
        disabled={promocodeDisabled}
        className="flex px-2 py-2 mx-1 bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-bold border-b-4 border-fuchsia-800 hover:border-fuchsia-600 rounded hover:scale-[1.05] duration-300 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:border-indigo-800 dark:hover:border-indigo-600 disabled:opacity-25"
      >
        <FontAwesomeIcon icon={faTicket} width={20} height={20} />
      </button>
    </div>
  );
};

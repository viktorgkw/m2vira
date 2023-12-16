import { faBan, faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const GenderFilter = ({ setGender }: any) => {
  return (
    <div className="flex flex-col items-center justify-center text-slate-800 dark:text-slate-200 font-bold">
      <p className="text-xl mb-2">Gender</p>

      <div
        className="flex flex-row"
        onChange={(e: any) => setGender(e.target.value)}
      >
        <button
          onClick={() => setGender("all")}
          className="flex px-2 py-2 bg-red-700 hover:bg-red-600 text-white font-bold border-b-4 border-red-900 hover:border-red-700 rounded hover:scale-[1.05] duration-300 mx-2"
        >
          <FontAwesomeIcon icon={faBan} width={24} height={24} />
        </button>

        <button
          onClick={() => setGender("women")}
          className="flex px-2 py-2 bg-rose-500 hover:bg-rose-400 text-white font-bold border-b-4 border-rose-800 hover:border-rose-600 rounded hover:scale-[1.05] duration-300 mx-2"
        >
          <FontAwesomeIcon icon={faVenus} width={24} height={24} />
        </button>

        <button
          onClick={() => setGender("men")}
          className="flex px-2 py-2 bg-blue-500 hover:bg-blue-400 text-white font-bold border-b-4 border-blue-800 hover:border-blue-600 rounded hover:scale-[1.05] duration-300 mx-2"
        >
          <FontAwesomeIcon icon={faMars} width={24} height={24} />
        </button>
      </div>
    </div>
  );
};

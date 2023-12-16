import { GenderFilter } from "./GenderFilter";
import { SearchBar } from "./SearchBar";
import { SizesFilter } from "./SizesFilter";

export const Filters = ({ setGender, setSize, setSearchTerm }: any) => {
  return (
    <div className="bg-slate-200 dark:bg-slate-800 bg-opacity-75 dark:bg-opacity-75 rounded-xl px-10 py-6 mx-3 md:mx-0 mt-4">
      <GenderFilter setGender={setGender} />

      <hr className="w-40 h-1 mx-auto border-0 rounded bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 drop-shadow-lg my-5 dark:from-slate-400 dark:via-slate-300 dark:to-slate-400" />

      <SizesFilter setSize={setSize} />

      <SearchBar setSearchTerm={setSearchTerm} />
    </div>
  );
};

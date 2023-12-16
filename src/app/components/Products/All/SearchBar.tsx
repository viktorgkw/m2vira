export const SearchBar = ({ setSearchTerm }: any) => {
  return (
    <div className="mt-5">
      <input
        onChange={(e: any) => setSearchTerm(e.target.value)}
        type="search"
        id="search"
        className="block w-full px-5 py-3 text-sm text-slate-200 rounded-lg focus:outline-none bg-slate-800"
        placeholder="Search product..."
        required
      />
    </div>
  );
};

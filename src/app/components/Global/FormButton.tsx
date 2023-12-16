export const FormButton = ({ text, action, isDisabled }: any) => {
  return (
    <button
      onClick={action}
      className="bg-gradient-to-r dark:from-slate-300 dark:via-slate-100 dark:to-slate-300 from-slate-800 via-slate-700 to-slate-800 bg-[position:_0%_0%] hover:bg-[position:_100%_100%] bg-[size:_200%] transition-all duration-500 dark:text-slate-800 text-slate-200 font-bold py-2 px-4 rounded mt-6 mb-3 disabled:opacity-25"
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

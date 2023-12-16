export const FormTitle = ({ text }: { text: string }) => {
  return (
    <>
      <h1 className="text-center text-3xl md:text-5xl">{text}</h1>

      <hr className="h-1 w-64 mx-auto my-4 border-0 rounded md:mt-5 md:mb-6 bg-gradient-to-r dark:from-slate-300 dark:via-slate-200 dark:to-slate-300 from-slate-800 via-slate-700 to-slate-800 drop-shadow-lg" />
    </>
  );
};

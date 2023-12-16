export const Title = ({ text }: { text: string }) => {
  return (
    <>
      <p className="text-3xl md:text-5xl uppercase text-slate-200 font-bold">
        {text}
      </p>

      <hr className="h-1 w-48 md:w-72 mx-auto border-0 rounded md:mt-5 md:mb-6 bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 drop-shadow-lg mb-8" />
    </>
  );
};

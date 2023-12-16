export const UserInfo = ({ name, email }: any) => {
  return (
    <>
      <div className="flex flex-row justify-center items-center font-bold text-3xl dark:text-slate-300 text-slate-800 mb-2">
        <h1 className="mx-1 text-center">{name}</h1>
      </div>

      <p className="text-center text-sm dark:text-slate-400 text-slate-950">
        {email}
      </p>
    </>
  );
};

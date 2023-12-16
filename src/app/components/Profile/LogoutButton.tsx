import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  return (
    <div className="my-5 px-6">
      <button
        onClick={() => signOut()}
        className="w-full rounded-lg text-center leading-6 px-6 py-3 bg-gradient-to-r from-rose-700 via-rose-500 to-rose-700 bg-[position:_0%_0%] hover:bg-[position:_100%_100%] bg-[size:_200%] transition-all duration-500 text-slate-200 hover:text-white font-bold"
      >
        Logout
      </button>
    </div>
  );
};

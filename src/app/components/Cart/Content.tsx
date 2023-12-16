import Link from "next/link";
import Image from "next/image";

export const Content = () => {
  return (
    <div className="flex flex-col justify-center items-center dark:bg-slate-800 dark:bg-opacity-75 px-6 py-6 rounded-xl mx-2 bg-slate-200 bg-opacity-75">
      <Image
        src="/gifs/successtick.gif"
        height={256}
        width={256}
        alt="Success gif"
        unoptimized={true}
      />

      <p className="uppercase text-2xl md:text-4xl text-emerald-400 font-bold text-center mb-8">
        Checkout was successful!
      </p>

      <div className="flex flex-row justify-center items-center">
        <Link
          href="/"
          className="flex px-2 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold border-b-4 border-emerald-800 hover:border-emerald-600 rounded hover:scale-[1.05] duration-300 mt-6 mx-2"
        >
          Go to Home
        </Link>

        <Link
          href="/profile"
          className="flex px-2 py-2 bg-sky-500 hover:bg-sky-400 text-white font-bold border-b-4 border-sky-800 hover:border-sky-600 rounded hover:scale-[1.05] duration-300 mt-6 mx-2"
        >
          Go to Profile
        </Link>
      </div>
    </div>
  );
};

import Image from "next/image";

export const Welcome = () => {
  return (
    <section>
      <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto mt-16 mb-16">
        <div className="w-full md:w-1/2 py-8">
          <div className="flex flex-col uppercase text-center text-slate-200 dark:text-blue-950">
            <p className="text-4xl md:text-6xl mb-4">Welcome</p>
            <p className="text-xl md:text-2xl mb-4">to</p>
            <p className="text-4xl md:text-6xl mb-4">m2vira</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 py-8 px-2 md:px-0">
          <Image
            src="/images/welcome.jpg"
            className="rounded-3xl"
            width={512}
            height={512}
            alt="Logo"
          />
        </div>
      </div>
    </section>
  );
};

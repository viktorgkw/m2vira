import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="">
        <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto mt-16 mb-24">
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

      <div className="flex flex-wrap items-center justify-center my-8">
        <figure className="relative transition-all duration-300 filter md:grayscale md:hover:grayscale-0 m-3">
          <Image
            priority
            className="rounded-lg"
            src="/images/womansfashion.jpg"
            alt="image description"
            width={512}
            height={256}
          />

          <figcaption className="absolute px-4 text-sm md:text-2xl top-10 right-0 left-0 bg-white dark:bg-black py-4 bg-opacity-25 dark:bg-opacity-50 flex justify-center">
            <p className="uppercase font-bold text-dark dark:text-white text-center">
              {"Refresh your wardrobe with our fancy collections"}
            </p>
          </figcaption>
        </figure>

        <figure className="relative transition-all duration-300 filter md:grayscale md:hover:grayscale-0 m-3">
          <Image
            className="rounded-lg"
            src="/images/mensfashion.jpg"
            alt="image description"
            width={512}
            height={256}
          />

          <figcaption className="absolute px-4 text-sm md:text-2xl top-10 right-0 left-0 bg-white dark:bg-black py-4 bg-opacity-25 dark:bg-opacity-50 flex justify-center">
            <p className="uppercase font-bold text-dark dark:text-white text-center">
              {"We add new collections every month"}
            </p>
          </figcaption>
        </figure>
      </div>
    </>
  );
}

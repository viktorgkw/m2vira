import Image from "next/image";

export const CustomImage = ({ imgPath }: { imgPath: string }) => {
  return (
    <figure className="relative transition-all duration-300 filter md:grayscale md:hover:grayscale-0 m-3">
      <Image
        className="rounded-lg"
        src={imgPath}
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
  );
};

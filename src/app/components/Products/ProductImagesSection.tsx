import Image from "next/image";

export const ProductImagesSection = ({ product }: any) => {
  return (
    <div className="flex flex-wrap justify-center items-center">
      {product.images.map((img: any, i: number) => (
        <Image
          key={i}
          priority
          width={512}
          height={512}
          alt="Product Image"
          className="w-full md:w-[25%] rounded-xl hover:scale-[1.03] duration-300 mt-8 mx-4"
          src={img}
        />
      ))}
    </div>
  );
};

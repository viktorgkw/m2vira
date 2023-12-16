import Image from "next/image";
import { redirect } from "next/navigation";
import { config } from "@fortawesome/fontawesome-svg-core";
import { ProductDetailsOptions } from "@/app/components/Products/ProductDetailsOptions";

config.autoAddCss = false;

export default async function ProductDetails({ params }: any) {
  const res = await fetch(`${process.env.DOMAIN}/api/products/details`, {
    method: "POST",
    body: JSON.stringify({ id: params.id }),
    next: { revalidate: 5 },
  });

  const data = await res.json();

  if (data.status !== 200) {
    redirect("/products/all");
  }

  return (
    <>
      <section className="body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto cursor-default">
          <div className="lg:w-4/5 mx-auto flex flex-wrap dark:bg-slate-800 dark:bg-opacity-40 bg-slate-200 bg-opacity-40 rounded-xl p-5">
            <Image
              priority
              width={2048}
              height={2048}
              alt="Product Image"
              className="lg:w-1/2 w-full object-cover object-center rounded hover:scale-[1.03] duration-300"
              src={data.product.images[0]}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm text-slate-800 dark:text-slate-200 tracking-widest">
                {data.product?.tags.join("/")}
              </h2>

              <h1 className="text-slate-800 dark:text-slate-200 text-3xl my-1 font-bold">
                {data.product?.title}
              </h1>

              <p className="leading-relaxed text-slate-800 dark:text-slate-200">
                {data.product?.description}
              </p>

              <ProductDetailsOptions product={data.product} />
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center">
            {data.product.images.map((img: any, i: number) => (
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
        </div>
      </section>
    </>
  );
}

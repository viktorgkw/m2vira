import { CustomImage } from "./CustomImage";

export const ImagesSection = () => {
  return (
    <div className="flex flex-wrap items-center justify-center my-8">
      <CustomImage imgPath="/images/womansfashion.jpg" />
      <CustomImage imgPath="/images/mensfashion.jpg" />
    </div>
  );
};

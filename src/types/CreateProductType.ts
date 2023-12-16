export type CreateProductType = {
  title: string;
  description: string;
  price: number;
  images: File[] | null;
  sizes: string;
  colors: string;
  materials: string;
  tags: string;
};

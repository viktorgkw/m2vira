import { EditProductForm } from "@/app/components/Products/Edit/EditProductForm";

export default function EditProduct({ params }: any) {
  return <EditProductForm id={params.id} />;
}

import { EditProductForm } from "@/app/components/Products/Edit/EditProductForm";

export default function EditProductPage({ params }: any) {
  return <EditProductForm id={params.id} />;
}

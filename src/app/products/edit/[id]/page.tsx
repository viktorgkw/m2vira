import { EditProductForm } from "@/app/components/Products/EditProductForm";

export default function EditProduct({ params }: any) {
  return (
    <div className="flex items-center justify-center my-6">
      <EditProductForm id={params.id} />
    </div>
  );
}

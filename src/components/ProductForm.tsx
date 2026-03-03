import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import {
  createProduct,
  updateProduct,
} from "../services/productService";

interface ProductFormProps {
  product?: Product | null;
  onSuccess: () => void;
}

interface ProductFormData {
  code: string;
  name: string;
  price: number;
}

export default function ProductForm({
  product,
  onSuccess,
}: ProductFormProps) {
  const [form, setForm] = useState<ProductFormData>({
    code: "",
    name: "",
    price: 0,
  });

  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEditing = !!product;

  useEffect(() => {
    if (product) {
      setForm({
        code: product.code,
        name: product.name,
        price: product.price,
      });
    } else {
      setForm({
        code: "",
        name: "",
        price: 0,
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isEditing && product?.id) {
        await updateProduct(product.id, form);
        setMessage("Product updated successfully");
      } else {
        await createProduct(form);
        setMessage("Product created successfully");
      }

      setIsError(false);

      setTimeout(() => {
        onSuccess();
      }, 1000);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsError(true);

      const backendMessage =
        error?.response?.data ||
        "Unexpected server error";

      setMessage(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          placeholder="Code"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          className="border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: Number(e.target.value) })
          }
          className="border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
          min={0}
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-4 py-2 rounded-md text-sm"
          >
            {loading
              ? "Saving..."
              : isEditing
              ? "Update"
              : "Create"}
          </button>
        </div>
      </form>

      {message && (
        <p
          className={`mt-4 text-sm ${
            isError ? "text-red-500" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </>
  );
}
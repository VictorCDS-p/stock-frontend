import { useEffect, useState } from "react";
import type { RawMaterial } from "../types/RawMaterial";
import {
  createRawMaterial,
  updateRawMaterial,
} from "../services/rawMaterialService";

interface Props {
  material?: RawMaterial | null;
  onSuccess: () => void;
}

interface RawMaterialFormData {
  code: string;
  name: string;
  stockQuantity: number;
}

export default function RawMaterialForm({
  material,
  onSuccess,
}: Props) {
  const [form, setForm] = useState<RawMaterialFormData>({
    code: "",
    name: "",
    stockQuantity: 0,
  });

  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEditing = !!material;

  useEffect(() => {
    if (material) {
      setForm({
        code: material.code,
        name: material.name,
        stockQuantity: material.stockQuantity,
      });
    } else {
      setForm({
        code: "",
        name: "",
        stockQuantity: 0,
      });
    }
  }, [material]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isEditing && material?.id) {
        await updateRawMaterial(material.id, form);
        setMessage("Raw material updated successfully");
      } else {
        await createRawMaterial(form);
        setMessage("Raw material created successfully");
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
          placeholder="Stock Quantity"
          value={form.stockQuantity}
          onChange={(e) =>
            setForm({ ...form, stockQuantity: Number(e.target.value) })
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
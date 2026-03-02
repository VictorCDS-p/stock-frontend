import { useState } from "react";
import type { RawMaterial } from "../types/RawMaterial";
import {
  createRawMaterial,
  updateRawMaterial,
} from "../services/rawMaterialService";

interface Props {
  editing: RawMaterial | null;
  onSuccess: () => void;
  clearEditing: () => void;
}

export default function RawMaterialForm({
  editing,
  onSuccess,
  clearEditing,
}: Props) {

  const [form, setForm] = useState<RawMaterial>({
    code: "",
    name: "",
    stockQuantity: 0,
  });

  const [prevEditing, setPrevEditing] =
    useState<RawMaterial | null>(null);

  if (editing !== prevEditing) {
    setPrevEditing(editing);
    if (editing) setForm(editing);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editing?.id) {
      await updateRawMaterial(editing.id, form);
    } else {
      await createRawMaterial(form);
    }

    setForm({
      code: "",
      name: "",
      stockQuantity: 0,
    });

    clearEditing();
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 items-center mb-6"
    >
      <input
        placeholder="Code"
        className="w-32 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
        value={form.code}
        onChange={(e) =>
          setForm({ ...form, code: e.target.value })
        }
      />

      <input
        placeholder="Name"
        className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Stock Quantity"
        className="w-40 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
        value={form.stockQuantity}
        onChange={(e) =>
          setForm({
            ...form,
            stockQuantity: Number(e.target.value),
          })
        }
      />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium"
      >
        {editing ? "Update" : "Submit"}
      </button>
    </form>
  );
}
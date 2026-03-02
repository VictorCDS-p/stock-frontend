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

  const [prevEditing, setPrevEditing] = useState<RawMaterial | null>(null);
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
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Code"
        value={form.code}
        onChange={(e) =>
          setForm({ ...form, code: e.target.value })
        }
      />

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Stock Quantity"
        value={form.stockQuantity}
        onChange={(e) =>
          setForm({
            ...form,
            stockQuantity: Number(e.target.value),
          })
        }
      />

      <button type="submit">
        {editing ? "Update" : "Create"}
      </button>
    </form>
  );
}
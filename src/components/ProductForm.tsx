import { useState } from "react";
import type { Product } from "../types/Product";
import { createProduct, updateProduct } from "../services/productService";

interface Props {
  editing: Product | null;
  onSuccess: () => void;
  clearEditing: () => void;
}

export default function ProductForm({
  editing,
  onSuccess,
  clearEditing,
}: Props) {
  const [form, setForm] = useState<Product>({
    code: "",
    name: "",
    price: 0,
  });

  const [prevEditing, setPrevEditing] = useState<Product | null>(null);
  if (editing !== prevEditing) {
    setPrevEditing(editing);
    if (editing) setForm(editing);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editing?.id) {
      await updateProduct(editing.id, form);
    } else {
      await createProduct(form);
    }

    setForm({ code: "", name: "", price: 0 });
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
        placeholder="Price"
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: Number(e.target.value) })
        }
      />
      <button type="submit">
        {editing ? "Update" : "Create"}
      </button>
    </form>
  );
}
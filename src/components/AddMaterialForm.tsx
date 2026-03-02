import { useEffect, useState } from "react";
import type { RawMaterial } from "../types/RawMaterial";
import { getRawMaterials } from "../services/rawMaterialService";
import { addMaterialToProduct } from "../services/productService";

interface Props {
  productId: number;
}

export default function AddMaterialForm({ productId }: Props) {
  const [materials, setMaterials] = useState<RawMaterial[]>([]);
  const [selectedId, setSelectedId] = useState<number>();
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    getRawMaterials().then((res) => setMaterials(res.data));
  }, []);

  const handleAdd = async () => {
    if (!selectedId) return;
    await addMaterialToProduct(productId, selectedId, quantity);
    alert("Material added!");
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <div className="flex gap-3 items-center">

        <select
          className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setSelectedId(Number(e.target.value))}
        >
          <option>Select Material</option>
          {materials.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          min={1}
          className="w-28 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <button
          onClick={handleAdd}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Add
        </button>

      </div>
    </div>
  );
}
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
    <div>
      <select
        onChange={(e) =>
          setSelectedId(Number(e.target.value))
        }
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
        value={quantity}
        onChange={(e) =>
          setQuantity(Number(e.target.value))
        }
      />

      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
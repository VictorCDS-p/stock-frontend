import { useEffect, useState } from "react";
import type { RawMaterial } from "../types/RawMaterial";
import {
  getRawMaterials,
  deleteRawMaterial,
} from "../services/rawMaterialService";
import RawMaterialForm from "../components/RawMaterialForm";

export default function RawMaterialsPage() {
  const [materials, setMaterials] = useState<RawMaterial[]>([]);
  const [editing, setEditing] = useState<RawMaterial | null>(null);

  const loadMaterials = async () => {
    const response = await getRawMaterials();
    setMaterials(response.data);
  };

  useEffect(() => {
    let isMounted = true;
    getRawMaterials().then((res) => {
      if (isMounted) {
        setMaterials(res.data);
      }
    });
    return () => { isMounted = false; };
  }, []);

  const handleDelete = async (id: number) => {
    await deleteRawMaterial(id);
    loadMaterials();
  };

  return (
    <div>
      <h1>Raw Materials</h1>

      <RawMaterialForm
        editing={editing}
        onSuccess={loadMaterials}
        clearEditing={() => setEditing(null)}
      />

      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Stock Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((m) => (
            <tr key={m.id}>
              <td>{m.code}</td>
              <td>{m.name}</td>
              <td>{m.stockQuantity}</td>
              <td>
                <button onClick={() => setEditing(m)}>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(m.id!)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
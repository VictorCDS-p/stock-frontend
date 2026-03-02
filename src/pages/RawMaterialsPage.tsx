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
    const res = await getRawMaterials();
    setMaterials(res.data);
  };

  useEffect(() => {
    let ignore = false;
    getRawMaterials().then((res) => { if (!ignore) setMaterials(res.data); });
    return () => { ignore = true; };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">

        <h1 className="text-lg font-semibold text-gray-700 mb-6">
          Raw Materials
        </h1>

        <RawMaterialForm
          editing={editing}
          onSuccess={loadMaterials}
          clearEditing={() => setEditing(null)}
        />

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {materials.map((m) => (
              <tr
                key={m.id}
                className="border-t border-gray-200"
              >
                <td className="p-3">{m.code}</td>
                <td className="p-3">{m.name}</td>
                <td className="p-3">{m.stockQuantity}</td>

                <td className="p-3 space-x-2">
                  <button
                    onClick={() => setEditing(m)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                  >
                    Edit
                  </button>

                  <button
                    onClick={async () => {
                      await deleteRawMaterial(m.id!);
                      loadMaterials();
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
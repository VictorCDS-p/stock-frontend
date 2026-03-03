import { useEffect, useState } from "react";
import type { RawMaterial } from "../types/RawMaterial";
import { getRawMaterials } from "../services/rawMaterialService";
import { addMaterialToProduct } from "../services/productService";

interface Props {
  productId: number;
}

export default function AddMaterialForm({ productId }: Props) {
  const [materials, setMaterials] = useState<RawMaterial[]>([]);
  const [selectedId, setSelectedId] = useState<number | undefined>();
  const [quantity, setQuantity] = useState<number>(1);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMaterials = async () => {
      try {
        const res = await getRawMaterials();
        setMaterials(res.data);
      } catch {
        console.error("Failed to load materials.");
      }
    };

    loadMaterials();
  }, []);

  const handleAddClick = () => {
    if (!selectedId) return;
    setShowConfirmModal(true);
  };

  const confirmAdd = async () => {
    if (!selectedId) return;

    try {
      setLoading(true);
      await addMaterialToProduct(productId, selectedId, quantity);

      setSelectedId(undefined);
      setQuantity(1);
      setShowConfirmModal(false);
    } catch {
      console.error("Failed to add material.");
    } finally {
      setLoading(false);
    }
  };

  const selectedMaterial = materials.find((m) => m.id === selectedId);

  return (
    <>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex flex-col md:flex-row gap-3 md:items-center">

          <div className="w-full">
            <select
              value={selectedId ?? ""}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setSelectedId(Number(e.target.value))}
            >
              <option value="">Select Material</option>
              {materials.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="number"
            min={1}
            className="w-full md:w-28 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />

          <button
            onClick={handleAddClick}
            className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Add
          </button>
        </div>
      </div>

      {/* Modal de Confirmação */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4">
              Confirm Addition
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to add{" "}
              <span className="font-medium">
                {selectedMaterial?.name}
              </span>{" "}
              with quantity{" "}
              <span className="font-medium">
                {quantity}
              </span>{" "}
              to this product?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-sm rounded-md border border-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={confirmAdd}
                disabled={loading}
                className="px-4 py-2 text-sm rounded-md bg-green-500 hover:bg-green-600 text-white"
              >
                {loading ? "Adding..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
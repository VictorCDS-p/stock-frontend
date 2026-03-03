import { useEffect, useMemo, useState } from "react";
import type { RawMaterial } from "../types/RawMaterial";
import {
  getRawMaterials,
  deleteRawMaterial,
} from "../services/rawMaterialService";
import RawMaterialForm from "../components/RawMaterialForm";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";

export default function RawMaterialsPage() {
  const [materials, setMaterials] = useState<RawMaterial[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [editing, setEditing] = useState<RawMaterial | null>(null);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RawMaterial | null>(null);


  const loadMaterials = async () => {
    const res = await getRawMaterials();
    setMaterials(res.data);
  };

  useEffect(() => {
    let ignore = false;
    getRawMaterials().then((res) => {
      if (!ignore) {
        setMaterials(res.data);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);


  const filteredMaterials = useMemo(() => {
    return materials.filter((m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.code.toLowerCase().includes(search.toLowerCase())
    );
  }, [materials, search]);


  const totalPages = Math.ceil(
    filteredMaterials.length / itemsPerPage
  );

  const safePage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1;

  const paginatedMaterials = filteredMaterials.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage
  );


  const confirmDelete = async () => {
    if (!selectedItem) return;

    await deleteRawMaterial(selectedItem.id!);

    setOpenDeleteModal(false);
    setSelectedItem(null);

    await loadMaterials();
  };


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg font-semibold text-gray-700">
            Raw Materials
          </h1>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={() => {
                setEditing(null);
                setOpenFormModal(true);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              New Raw Material
            </button>
          </div>
        </div>

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
            {paginatedMaterials.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center text-gray-500"
                >
                  No raw materials found
                </td>
              </tr>
            )}

            {paginatedMaterials.map((m) => (
              <tr
                key={m.id}
                className="border-t border-gray-200"
              >
                <td className="p-3">{m.code}</td>
                <td className="p-3">{m.name}</td>
                <td className="p-3">{m.stockQuantity}</td>

                <td className="p-3 space-x-2">
                  <button
                    onClick={() => {
                      setEditing(m);
                      setOpenFormModal(true);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setSelectedItem(m);
                      setOpenDeleteModal(true);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

      </div>

      <Modal
        isOpen={openFormModal}
        onClose={() => {
          setOpenFormModal(false);
          setEditing(null);
        }}
        title={editing ? "Edit Raw Material" : "New Raw Material"}
      >
        <RawMaterialForm
          key={editing?.id ?? "new"}   // 🔥 força remontagem ao trocar item
          material={editing}          // 🔥 passa o item para edição
          onSuccess={async () => {
            await loadMaterials();
            setOpenFormModal(false);
            setEditing(null);
          }}
        />
      </Modal>

      <Modal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        title="Confirm Delete"
      >
        <div className="flex flex-col gap-6">
          <p className="text-gray-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold">
              {selectedItem?.name}
            </span>
            ?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setOpenDeleteModal(false)}
              className="px-4 py-2 rounded-md border border-gray-300 text-sm"
            >
              Cancel
            </button>

            <button
              onClick={confirmDelete}
              className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
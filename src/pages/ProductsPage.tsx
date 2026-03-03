import { useEffect, useMemo, useState } from "react";
import type { Product } from "../types/Product";
import {
  getProducts,
  deleteProduct,
} from "../services/productService";
import ProductForm from "../components/ProductForm";
import AddMaterialForm from "../components/AddMaterialForm";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [editing, setEditing] = useState<Product | null>(null);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);

  const reload = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    let ignore = false;
    getProducts().then((res) => {
      if (!ignore) {
        setProducts(res.data);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.code.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const safePage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1;

  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage
  );

  const confirmDelete = async () => {
    if (!selectedItem) return;

    await deleteProduct(selectedItem.id!);

    setOpenDeleteModal(false);
    setSelectedItem(null);
    await reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white border rounded-lg shadow-sm p-6">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg font-semibold text-gray-700">
            Products
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
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
            >
              New Product
            </button>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedProducts.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}

            {paginatedProducts.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.code}</td>
                <td className="p-3">{p.name}</td>
                <td className="p-3">${p.price}</td>

                <td className="p-3 space-y-2">
                  <AddMaterialForm productId={p.id!} />

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditing(p);
                        setOpenFormModal(true);
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setSelectedItem(p);
                        setOpenDeleteModal(true);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </div>
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
          setEditing(null);
          setOpenFormModal(false);
        }}
        title={editing ? "Edit Product" : "New Product"}
      >
        <ProductForm
          key={editing?.id ?? "new"}   // 🔥 ESSA LINHA RESOLVE
          product={editing}
          onSuccess={async () => {
            await reload();
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
              className="px-4 py-2 border rounded-md text-sm"
            >
              Cancel
            </button>

            <button
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
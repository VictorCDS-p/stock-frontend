import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import {
  getProducts,
  deleteProduct,
} from "../services/productService";
import ProductForm from "../components/ProductForm";
import AddMaterialForm from "../components/AddMaterialForm";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data));
  }, []);

  const reload = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">

        <h1 className="text-lg font-semibold text-gray-700 mb-6">
          Products
        </h1>

        <ProductForm
          editing={editing}
          onSuccess={reload}
          clearEditing={() => setEditing(null)}
        />

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left p-3">Code</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Price</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className="border-t border-gray-200"
              >
                <td className="p-3">{p.code}</td>
                <td className="p-3">{p.name}</td>
                <td className="p-3">${p.price}</td>

                <td className="p-3 space-x-2">
                  <button
                    onClick={() => setEditing(p)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                  >
                    Edit
                  </button>

                  <button
                    onClick={async () => {
                      await deleteProduct(p.id!);
                      reload();
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                  >
                    Delete
                  </button>

                  <AddMaterialForm productId={p.id!} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
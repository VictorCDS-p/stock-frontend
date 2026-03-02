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
    let isMounted = true;
    const load = async () => {
      const res = await getProducts();
      if (isMounted) setProducts(res.data);
    };
    load();
    return () => { isMounted = false; };
  }, []);

  return (
    <div>
      <h1>Products</h1>

      <ProductForm
        editing={editing}
        onSuccess={async () => {
          const res = await getProducts();
          setProducts(res.data);
        }}
        clearEditing={() => setEditing(null)}
      />

      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.code}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>
                <button onClick={() => setEditing(p)}>
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(p.id!)}
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
  );
}
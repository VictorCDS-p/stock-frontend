import { useEffect, useMemo, useState } from "react";
import { getSimulation } from "../services/simulationService";
import type { ProductionSimulationResponse } from "../types/Simulation";
import Pagination from "../components/Pagination";

export default function SimulationPage() {
  const [data, setData] =
    useState<ProductionSimulationResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;


  useEffect(() => {
    async function load() {
      try {
        const response = await getSimulation();
        setData(response.data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);


  const filteredItems = useMemo(() => {
    return (data?.items || []).filter((item) =>
      item.productName
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [data?.items, search]);

  const totalPages = Math.ceil(
    filteredItems.length / itemsPerPage
  );

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }

    if (totalPages === 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const safePage = Math.min(currentPage, totalPages || 1);

  const paginatedItems = filteredItems.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage
  );

  if (loading) return <p className="p-8">Loading...</p>;
  if (!data) return <p className="p-8">No simulation data</p>;


  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-semibold text-gray-700">
          Production Simulation
        </h1>

        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {paginatedItems.length === 0 && (
          <div className="col-span-full text-center text-gray-500 p-10 bg-white rounded-lg shadow-sm border">
            No simulation results found
          </div>
        )}

        {paginatedItems.map((item) => (
          <div
            key={item.productId}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
          >
            <h2 className="text-base font-semibold text-gray-700 mb-4">
              {item.productName}
            </h2>

            <p className="text-sm mb-2">
              Quantity:
              <span className="ml-2 text-red-500 font-semibold text-lg">
                {item.quantity} Units
              </span>
            </p>

            <p className="text-sm text-gray-600">
              Unit Price: ${item.unitPrice.toFixed(2)}
            </p>

            <p className="text-sm text-gray-600">
              Total Value: ${item.totalValue.toFixed(2)}
            </p>
          </div>
        ))}

      </div>

      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-700">
          Total Production Value
        </h2>
        <p className="text-2xl font-bold text-green-600 mt-2">
          ${data.totalProductionValue.toFixed(2)}
        </p>
      </div>

    </div>
  );
}
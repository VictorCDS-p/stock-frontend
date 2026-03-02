import { useEffect, useState } from "react";
import { getSimulation } from "../services/simulationService";
import type { SimulationResponse } from "../types/Simulation";

export default function SimulationPage() {
  const [data, setData] =
    useState<SimulationResponse | null>(null);

  useEffect(() => {
    getSimulation(51).then((res) =>
      setData(res.data)
    );
  }, []);

  if (!data)
    return <p className="p-8">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl bg-white border border-gray-200 rounded-lg shadow-sm p-6">

        <h1 className="text-lg font-semibold text-gray-700 mb-6">
          Simulation Results
        </h1>

        <div className="space-y-4 text-sm">
          <p>
            Product Name:
            <span className="ml-2 font-medium">
              {data.productName}
            </span>
          </p>

          <p>
            Maximum Production:
            <span className="ml-2 text-red-500 font-semibold text-lg">
              {data.maxProduction} Units
            </span>
          </p>

          <div className="bg-gray-100 rounded-md p-4">
            {data.materials.map((m) => (
              <div key={m.rawMaterialId} className="mb-3">
                <p className="font-medium">
                  {m.rawMaterialName}
                </p>
                <p>Stock: {m.stockAvailable}</p>
                <p>Required/unit: {m.requiredPerUnit}</p>
                <p>Possible: {m.possibleProduction}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
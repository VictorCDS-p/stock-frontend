import { useEffect, useState } from "react";
import { getSimulation } from "../services/simulationService";
import type { SimulationResponse } from "../types/Simulation";

export default function SimulationPage() {
  const [data, setData] =
    useState<SimulationResponse | null>(null);

  useEffect(() => {
    getSimulation(1).then((res) =>
      setData(res.data)
    );
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Production Simulation</h1>

      <h2>{data.productName}</h2>
      <p>
        Max Production: <strong>{data.maxProduction}</strong> units
      </p>

      <h3>Materials</h3>

      {data.materials.map((m) => (
        <div key={m.rawMaterialId}>
          <p>
            {m.rawMaterialName}
          </p>
          <p>
            Stock: {m.stockAvailable}
          </p>
          <p>
            Required per unit: {m.requiredPerUnit}
          </p>
          <p>
            Possible production: {m.possibleProduction}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
}
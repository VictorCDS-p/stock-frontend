import api from "../api/api";
import type { SimulationResponse } from "../types/Simulation";

export const getSimulation = (productId: number) =>
  api.get<SimulationResponse>(
    `/production/${productId}/simulation`
  );
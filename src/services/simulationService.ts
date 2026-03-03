import api from "../api/api";
import type { ProductionSimulationResponse } from "../types/Simulation";

export const getSimulation = () =>
  api.get<ProductionSimulationResponse>(
    "/production/simulation"
  );
export interface MaterialSimulation {
  rawMaterialId: number;
  rawMaterialName: string;
  stockAvailable: number;
  requiredPerUnit: number;
  possibleProduction: number;
}

export interface SimulationResponse {
  productId: number;
  productName: string;
  maxProduction: number;
  materials: MaterialSimulation[];
}
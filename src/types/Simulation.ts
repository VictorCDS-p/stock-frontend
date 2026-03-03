export interface ProductionSimulationItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalValue: number;
}

export interface ProductionSimulationResponse {
  items: ProductionSimulationItem[];
  totalProductionValue: number;
}
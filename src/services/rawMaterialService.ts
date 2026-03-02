import api from "../api/api";
import type { RawMaterial } from "../types/RawMaterial";

export const getRawMaterials = () =>
  api.get<RawMaterial[]>("/raw-materials");

export const createRawMaterial = (data: RawMaterial) =>
  api.post("/raw-materials", data);

export const updateRawMaterial = (id: number, data: RawMaterial) =>
  api.put(`/raw-materials/${id}`, data);

export const deleteRawMaterial = (id: number) =>
  api.delete(`/raw-materials/${id}`);
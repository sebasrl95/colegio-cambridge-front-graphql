import type { Area } from "./area";

export interface Salon {
  id: string;
  codigo: string;
  area: Area | null;
}

export interface CreateSalonInput {
  codigo: string;
  area: string;
}

export interface UpdateSalonInput {
  codigo?: string;
  area?: string;
}
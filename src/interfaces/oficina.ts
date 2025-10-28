import type { Area } from "./area";
import type { Empleado } from "./empleado";

export interface Oficina {
  id: string;
  codigo: string;
  area: Area | null;
  empleados: Empleado[];
}

export interface CreateOficinaInput {
  codigo: string;
  area: string;
}

export interface UpdateOficinaInput {
  codigo?: string;
  area?: string;
}
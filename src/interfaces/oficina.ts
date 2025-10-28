import type { Empleado } from "./empleado";

export interface Oficina {
  _id: string;
  codigo: string;
  area: string;
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
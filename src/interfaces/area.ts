import type { Oficina } from "./oficina";
import type { Salon } from "./salon";

export interface Area {
    id: string;
    nombre: string;
    oficinas?: Oficina[];
    salones?: Salon[];
}

export interface CreateAreaInput {
  nombre: string;
}

export interface UpdateAreaInput {
  nombre?: string;
}
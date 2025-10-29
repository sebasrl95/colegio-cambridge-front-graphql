import type { Area } from "./area";
import type { Oficina } from "./oficina";

export type TipoEmpleado = 'administrativo' | 'profesor';
export type TipoProfesor = 'planta' | 'contratista';

export interface Empleado {
    id: string;
    nombre: string;
    documento: string;
    tipoEmpleado: TipoEmpleado;
    tipoProfesor?: TipoProfesor;
    area: Area;
    oficina: Oficina;
}

export interface CreateEmpleadoInput {
    nombre: string;
    documento: string;
    tipoEmpleado: TipoEmpleado;
    area: string;
    oficina: string;
}

export interface UpdateEmpleadoInput {
    nombre?: string;
    documento?: string;
    tipoEmpleado?: TipoEmpleado;
    tipoProfesor?: TipoProfesor;
    area?: string;
    oficina?: string;
}
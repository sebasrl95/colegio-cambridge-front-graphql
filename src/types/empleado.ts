export type TipoEmpleado = 'administrativo' | 'profesor';

export interface Empleado {
    _id: string;
    nombre: string;
    documento: string;
    tipoEmpleado: TipoEmpleado;
    area: string;
    oficina: string;
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
    area?: string;
    oficina?: string;
}
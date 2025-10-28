import client from "./graphqlClient";
import type { Empleado, CreateEmpleadoInput, UpdateEmpleadoInput } from "../interfaces/empleado";
import { GET_EMPLEADO, GET_EMPLEADOS } from "../graphql/queries/empleadoQueries";
import { CREATE_EMPLEADO, UPDATE_EMPLEADO, DELETE_EMPLEADO } from "../graphql/mutations/empleadoMutations";

export const getEmpleados = async (): Promise<Empleado[]> => {
    const { data } = await client.query<{ empleados: Empleado[] }>({
        query: GET_EMPLEADOS,
    });
    return data?.empleados ?? [];
};

export const getEmpleado = async (id: string): Promise<Empleado> => {
    const { data } = await client.query<{ empleado: Empleado }>({ query: GET_EMPLEADO, variables: { id } });
    return data?.empleado ?? {} as Empleado;
};

export const createEmpleado = async (
    input: CreateEmpleadoInput
): Promise<Empleado> => {
    const { data } = await client.mutate<{ createEmpleado: Empleado }>({
        mutation: CREATE_EMPLEADO,
        variables: { createEmpleadoInput: input },
    });
    return data?.createEmpleado ?? {} as Empleado;
};

export const updateEmpleado = async (
    input: UpdateEmpleadoInput
): Promise<Empleado> => {
    const { data } = await client.mutate<{ updatedEmpleado: Empleado }>({
        mutation: UPDATE_EMPLEADO,
        variables: { updateEmpleadoInput: input },
    });
    return data?.updatedEmpleado ?? {} as Empleado;
};

export const deleteEmpleado = async (id: string): Promise<Empleado> => {
    const { data } = await client.mutate<{ deleteEmpleado: Empleado }>({
        mutation: DELETE_EMPLEADO,
        variables: { id },
    });
    return data?.deleteEmpleado ?? {} as Empleado;
};

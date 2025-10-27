import client from "./graphqlClient";
import type { Oficina, CreateOficinaInput, UpdateOficinaInput } from "../types/oficina";
import { GET_OFICINA, GET_OFICINAS } from "../graphql/queries/oficinaQueries";
import { CREATE_OFICINA, UPDATE_OFICINA, DELETE_OFICINA } from "../graphql/mutations/oficinaMutations";

export const getOficinas = async (): Promise<Oficina[]> => {
    const { data } = await client.query<{ oficinas: Oficina[] }>({
        query: GET_OFICINAS,
    });
    return data?.oficinas ?? [];
};

export const getOficina = async (id: string): Promise<Oficina> => {
    const { data } = await client.query<{ oficina: Oficina }>({ query: GET_OFICINA, variables: { id } });
    return data?.oficina ?? {} as Oficina;
};

export const createOficina = async (
    input: CreateOficinaInput
): Promise<Oficina> => {
    const { data } = await client.mutate<{ createOficina: Oficina }>({
        mutation: CREATE_OFICINA,
        variables: { createOficinaInput: input },
    });
    return data?.createOficina ?? {} as Oficina;
};

export const updateOficina = async (
    input: UpdateOficinaInput
): Promise<Oficina> => {
    const { data } = await client.mutate<{ updatedOficina: Oficina }>({
        mutation: UPDATE_OFICINA,
        variables: { updateOficinaInput: input },
    });
    return data?.updatedOficina ?? {} as Oficina;
};

export const deleteOficina = async (id: string): Promise<Oficina> => {
    const { data } = await client.mutate<{ deleteOficina: Oficina }>({
        mutation: DELETE_OFICINA,
        variables: { id },
    });
    return data?.deleteOficina ?? {} as Oficina;
};

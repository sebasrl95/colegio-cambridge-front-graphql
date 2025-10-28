import client from "./graphqlClient";
import type { Salon, CreateSalonInput, UpdateSalonInput } from "../interfaces/salon";
import { GET_SALON, GET_SALONES } from "../graphql/queries/salonQueries";
import { CREATE_SALON, UPDATE_SALON, DELETE_SALON } from "../graphql/mutations/salonMutations";

export const getSalones = async (): Promise<Salon[]> => {
    const { data } = await client.query<{ salones: Salon[] }>({
        query: GET_SALONES,
    });
    return data?.salones ?? [];
};

export const getSalon = async (id: string): Promise<Salon> => {
    const { data } = await client.query<{ salon: Salon }>({ query: GET_SALON, variables: { id } });
    return data?.salon ?? {} as Salon;
};

export const createSalon = async (
    input: CreateSalonInput
): Promise<Salon> => {
    const { data } = await client.mutate<{ createSalon: Salon }>({
        mutation: CREATE_SALON,
        variables: { input },
    });
    return data?.createSalon ?? {} as Salon;
};

export const updateSalon = async (
    id: string,
    input: UpdateSalonInput
): Promise<Salon> => {
    const { data } = await client.mutate<{ updatedSalon: Salon }>({
        mutation: UPDATE_SALON,
        variables: { id, input },
    });
    return data?.updatedSalon ?? {} as Salon;
};

export const deleteSalon = async (id: string): Promise<Salon> => {
    const { data } = await client.mutate<{ deleteSalon: Salon }>({
        mutation: DELETE_SALON,
        variables: { id },
    });
    return data?.deleteSalon ?? {} as Salon;
};

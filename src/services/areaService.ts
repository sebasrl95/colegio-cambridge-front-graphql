import client from "./graphqlClient";
import type { Area, CreateAreaInput, UpdateAreaInput } from "../types/area";
import { GET_AREA, GET_AREAS } from "../graphql/queries/areaQueries";
import { CREATE_AREA, DELETE_AREA, UPDATE_AREA } from "../graphql/mutations/areaMutations";

export const getAreas = async (): Promise<Area[]> => {
    const { data } = await client.query<{ areas: Area[] }>({
        query: GET_AREAS,
    });
    return data?.areas ?? [];
};

export const getArea = async (id: string): Promise<Area> => {
    const { data } = await client.query<{ area: Area }>({ query: GET_AREA, variables: { id } });
    return data?.area ?? {} as Area;
};

export const createArea = async (
    input: CreateAreaInput
): Promise<Area> => {
    const { data } = await client.mutate<{ createArea: Area }>({
        mutation: CREATE_AREA,
        variables: { input },
    });
    return data?.createArea ?? {} as Area;
};

export const updateArea = async (
    id: string,
    input: UpdateAreaInput
): Promise<Area> => {
    const { data } = await client.mutate<{ updatedArea: Area }>({
        mutation: UPDATE_AREA,
        variables: { id, input },
    });
    return data?.updatedArea ?? {} as Area;
};

export const deleteArea = async (id: string): Promise<boolean> => {
    const { data } = await client.mutate<{ deleteArea: boolean }>({
        mutation: DELETE_AREA,
        variables: { id },
    });
    return data?.deleteArea ?? false;
};

import { gql } from "@apollo/client";
import client from "./graphqlClient";

export const GET_AREAS = gql`
  query {
    areas {
      _id
      nombre
      oficinas { _id codigo }
      salones { _id codigo }
    }
  }
`;

export const getAreas = async () => {
    const { data } = await client.query({ query: GET_AREAS });
    return data.areas;
};

export const GET_AREA = gql`
  query ($id: ID!) {
    area(id: $id) {
      _id
      nombre
      oficinas { _id codigo }
      salones { _id codigo }
    }
  }
`;

export const getArea = async (id: string) => {
    const { data } = await client.query({ query: GET_AREA, variables: { id } });
    return data.area;
};

export const CREATE_AREA = gql`
  mutation ($input: CreateAreaInput!) {
    createArea(createAreaInput: $input) {
      _id
      nombre
    }
  }
`;

export const createArea = async (input: { nombre: string }) => {
    const { data } = await client.mutate({
        mutation: CREATE_AREA,
        variables: { input },
    });
    return data.createArea;
};

export const DELETE_AREA = gql`
  mutation ($id: ID!) {
    removeArea(id: $id) {
      _id
    }
  }
`;

export const deleteArea = async (id: string) => {
    const { data } = await client.mutate({
        mutation: DELETE_AREA,
        variables: { id },
    });
    return data.removeArea;
};

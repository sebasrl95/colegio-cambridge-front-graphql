import { gql } from "@apollo/client";
import client from "./graphqlClient";

export const GET_SALONES = gql`
  query {
    salones {
      _id
      codigo
      capacidad
      area { _id nombre }
    }
  }
`;

export const getSalones = async () => {
    const { data } = await client.query({ query: GET_SALONES });
    return data.salones;
};

export const CREATE_SALON = gql`
  mutation ($input: CreateSalonInput!) {
    createSalon(createSalonInput: $input) {
      _id
      codigo
    }
  }
`;

export const createSalon = async (input: any) => {
    const { data } = await client.mutate({
        mutation: CREATE_SALON,
        variables: { input },
    });
    return data.createSalon;
};

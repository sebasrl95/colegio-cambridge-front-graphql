import { gql } from "@apollo/client";
import client from "./graphqlClient";

export const GET_OFICINAS = gql`
  query {
    oficinas {
      _id
      codigo
      area { _id nombre }
      empleados { _id nombre }
    }
  }
`;

export const getOficinas = async () => {
    const { data } = await client.query({ query: GET_OFICINAS });
    return data.oficinas;
};

export const CREATE_OFICINA = gql`
  mutation ($input: CreateOficinaInput!) {
    createOficina(createOficinaInput: $input) {
      _id
      codigo
    }
  }
`;

export const createOficina = async (input: any) => {
    const { data } = await client.mutate({
        mutation: CREATE_OFICINA,
        variables: { input },
    });
    return data.createOficina;
};

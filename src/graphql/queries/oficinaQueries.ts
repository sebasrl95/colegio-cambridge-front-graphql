import { gql } from "@apollo/client";

export const GET_OFICINAS = gql`
  query {
    oficinas {
      _id
      codigo
      area { _id nombre }
    }
  }
`;

export const GET_OFICINA = gql`
  query ($id: ID!) {
    oficina(id: $id) {
      _id
      codigo
      area { _id nombre }
    }
  }
`;
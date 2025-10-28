import { gql } from "@apollo/client";

export const GET_SALONES = gql`
  query {
    salones {
      id
      codigo
      area {
        id
        nombre
      }
    }
  }
`;

export const GET_SALON = gql`
  query ($id: ID!) {
    salon(id: $id) {
      id
      codigo
      area {
        id
        nombre
      }
    }
  }
`;
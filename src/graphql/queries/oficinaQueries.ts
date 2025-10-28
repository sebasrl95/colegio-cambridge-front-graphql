import { gql } from "@apollo/client";

export const GET_OFICINAS = gql`
  query {
    oficinas {
      id
      codigo
      area {
        id 
        nombre
      }
    }
  }
`;

export const GET_OFICINA = gql`
  query ($id: ID!) {
    oficina(id: $id) {
      id
      codigo
      area {
        id 
        nombre
      }
    }
  }
`;
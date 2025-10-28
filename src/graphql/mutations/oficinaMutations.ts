import { gql } from "@apollo/client";

export const CREATE_OFICINA = gql`
  mutation ($input: CreateOficinaInput!) {
    createOficina(createOficinaInput: $input) {
      id
      codigo
      area {
        id 
        nombre
      }
    }
  }
`;

export const UPDATE_OFICINA = gql`
  mutation ($id: ID!, $input: UpdateOficinaInput!) {
    updateOficina(id: $id, updateOficinaInput: $input) {
      id
      codigo
      area {
        id 
        nombre
      }
    }
  }
`;

export const DELETE_OFICINA = gql`
  mutation ($id: ID!) {
    removeOficina(id: $id) {
      id
    }
  }
`;
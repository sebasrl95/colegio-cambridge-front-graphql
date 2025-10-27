import { gql } from "@apollo/client";

export const CREATE_OFICINA = gql`
  mutation ($input: CreateOficinaInput!) {
    createOficina(createOficinaInput: $input) {
      _id
      codigo
      area
    }
  }
`;

export const UPDATE_OFICINA = gql`
  mutation ($input: updateOficinaInput!) {
    actualizarOficina(updateOficinaInput: $input) {
      _id
      nombre
      area
    }
  }
`;

export const DELETE_OFICINA = gql`
  mutation ($id: ID!) {
    removeOficina(id: $id) {
      _id
    }
  }
`;
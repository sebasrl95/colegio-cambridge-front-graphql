import { gql } from "@apollo/client";

export const CREATE_SALON = gql`
  mutation ($input: CreateSalonInput!) {
    createSalon(createSalonInput: $input) {
      id
      codigo
      area {
        id
        nombre
      }
    }
  }
`;

export const UPDATE_SALON = gql`
  mutation ($id: ID!, $input: UpdateSalonInput!) {
    updateSalon(id: $id, updateSalonInput: $input) {
      id
      codigo
      area {
        id
        nombre
      }
    }
  }
`;

export const DELETE_SALON = gql`
  mutation ($id: String!) {
    removeSalon(id: $id) {
      id
    }
  }
`;
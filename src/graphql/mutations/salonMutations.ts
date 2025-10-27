import { gql } from "@apollo/client";

export const CREATE_SALON = gql`
  mutation ($input: CreateSalonInput!) {
    createSalon(createSalonInput: $input) {
      _id
      codigo
    }
  }
`;

export const UPDATE_SALON = gql`
  mutation ($input: updateSalonInput!) {
    actualizarSalon(updateSalonInput: $input) {
      _id
      nombre
    }
  }
`;

export const DELETE_SALON = gql`
  mutation ($id: ID!) {
    removeSalon(id: $id) {
      _id
    }
  }
`;
import { gql } from "@apollo/client";

export const CREATE_AREA = gql`
  mutation ($input: CreateAreaInput!) {
    createArea(createAreaInput: $input) {
      _id
      nombre
    }
  }
`;

export const UPDATE_AREA = gql`
  mutation ($input: updateAreaInput!) {
    actualizarArea(updateAreaInput: $input) {
      _id
      nombre
    }
  }
`;

export const DELETE_AREA = gql`
  mutation ($id: ID!) {
    removeArea(id: $id) {
      _id
    }
  }
`;
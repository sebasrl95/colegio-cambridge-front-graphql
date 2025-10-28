import { gql } from "@apollo/client";

export const CREATE_AREA = gql`
  mutation ($input: CreateAreaInput!) {
    crearArea(createAreaInput: $input) {
      id
      nombre
    }
  }
`;

export const UPDATE_AREA = gql`
  mutation ($id: ID!, $input: UpdateAreaInput!) {
    actualizarArea(id: $id, updateAreaInput: $input) {
      id
      nombre
    }
  }
`;

export const DELETE_AREA = gql`
  mutation ($id: ID!) {
    eliminarArea(id: $id)
  }
`;
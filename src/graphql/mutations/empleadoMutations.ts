import { gql } from "@apollo/client";

export const CREATE_EMPLEADO = gql`
  mutation ($input: CreateEmpleadoInput!) {
    createEmpleado(createEmpleadoInput: $input) {
      _id
      nombre
      documento
      area
      oficina
      tipoEmpleado
    }
  }
`;

export const UPDATE_EMPLEADO = gql`
  mutation ($input: updateEmpleadoInput!) {
    actualizarEmpleado(updateEmpleadoInput: $input) {
      _id
      nombre
      documento
      area
      oficina
      tipoEmpleado
    }
  }
`;

export const DELETE_EMPLEADO = gql`
  mutation ($id: ID!) {
    removeEmpleado(id: $id) {
      _id
    }
  }
`;
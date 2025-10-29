import { gql } from "@apollo/client";

export const CREATE_EMPLEADO = gql`
  mutation ($input: CreateEmpleadoInput!) {
    createEmpleado(createEmpleadoInput: $input) {
      id
      nombre
      documento
      tipoEmpleado
      tipoProfesor
      area {
        id
        nombre
      }
      oficina {
        id
        codigo
      }
    }
  }
`;

export const UPDATE_EMPLEADO = gql`
  mutation ($id: ID!, $input: UpdateEmpleadoInput!) {
    updateEmpleado(id: $id, updateEmpleadoInput: $input) {
      id
      nombre
      documento
      tipoEmpleado
      tipoProfesor
      area {
        id
        nombre
      }
      oficina {
        id
        codigo
      }
    }
  }
`;

export const DELETE_EMPLEADO = gql`
  mutation ($id: ID!) {
    removeEmpleado(id: $id) {
      id
    }
  }
`;
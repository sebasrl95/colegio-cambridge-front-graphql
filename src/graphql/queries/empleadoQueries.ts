import { gql } from "@apollo/client";

export const GET_EMPLEADOS = gql`
  query {
    empleados {
      id
      nombre
      area {
        nombre
      }
      documento
      tipoEmpleado
    }
  }
`;

export const GET_EMPLEADO = gql`
  query ($id: ID!) {
    empleado(id: $id) {
      id
      nombre
      area {
        nombre
      }
      documento
      tipoEmpleado
    }
  }
`;
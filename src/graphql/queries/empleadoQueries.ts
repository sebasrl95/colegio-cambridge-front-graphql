import { gql } from "@apollo/client";

export const GET_EMPLEADOS = gql`
  query {
    empleados {
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

export const GET_EMPLEADO = gql`
  query ($id: ID!) {
    empleado(id: $id) {
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
import { gql } from "@apollo/client";
import client from "./graphqlClient";

export const GET_EMPLEADOS = gql`
  query {
    empleados {
      _id
      nombre
      documento
      tipoEmpleado
      tipoProfesor
      area { _id nombre }
      oficina { _id codigo }
    }
  }
`;

export const getEmpleados = async () => {
    const { data } = await client.query({ query: GET_EMPLEADOS });
    return data.empleados;
};

export const CREATE_EMPLEADO = gql`
  mutation ($input: CreateEmpleadoInput!) {
    createEmpleado(createEmpleadoInput: $input) {
      _id
      nombre
    }
  }
`;

export const createEmpleado = async (input: any) => {
    const { data } = await client.mutate({
        mutation: CREATE_EMPLEADO,
        variables: { input },
    });
    return data.createEmpleado;
};

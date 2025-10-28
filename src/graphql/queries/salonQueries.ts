import { gql } from "@apollo/client";

export const GET_SALONES = gql`
  query {
    salones {
      id
      codigo
      capacidad
      area { id nombre }
    }
  }
`;

export const GET_SALON = gql`
  query ($id: ID!) {
    area(id: $id) {
      id
      nombre
      oficinas { id codigo }
      salones { id codigo }
    }
  }
`;
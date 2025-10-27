import { gql } from "@apollo/client";

export const GET_SALONES = gql`
  query {
    salones {
      _id
      codigo
      capacidad
      area { _id nombre }
    }
  }
`;

export const GET_SALON = gql`
  query ($id: ID!) {
    area(id: $id) {
      _id
      nombre
      oficinas { _id codigo }
      salones { _id codigo }
    }
  }
`;
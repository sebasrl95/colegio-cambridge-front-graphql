import { gql } from "@apollo/client";

export const GET_AREAS = gql`
  query {
    areas {
      id
      nombre
    }
  }
`;

export const GET_AREA = gql`
  query ($id: ID!) {
    area(id: $id) {
      _id
      nombre
      oficinas { _id codigo }
      salones { _id codigo }
    }
  }
`;
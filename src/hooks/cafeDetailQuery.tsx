import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { CAFE_FRAGMENT } from "../fragments";
import { cafeDetailQuery } from "../__generated__/cafeDetailQuery";

export const CAFE_DETAIL_QUERY = gql`
  query cafeDetailQuery($input: CafeDetailInput!) {
    cafeDetail(input: $input) {
      ok
      error
      cafe {
        ...CafeFragment
      }
    }
  }
  ${CAFE_FRAGMENT}
`;

export const useCafeDetail = (cafeId: number) => {
  return useQuery<cafeDetailQuery>(CAFE_DETAIL_QUERY, {
    variables: { input: { id: cafeId } },
  });
};

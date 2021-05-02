import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { MENU_FRAGMENT } from "../fragments";
import { menuDetailQuery } from "../__generated__/menuDetailQuery";

const MENU_DETAIL_QUERY = gql`
  query menuDetailQuery($input: MenuDetailInput!) {
    menuDetail(input: $input) {
      ok
      error
      menu {
        ...MenuFragment
      }
    }
  }
  ${MENU_FRAGMENT}
`;

export const useMenuDetail = (cafeId: number, menuId: number) => {
  return useQuery<menuDetailQuery>(MENU_DETAIL_QUERY, {
    variables: { input: { cafeId, menuId } },
  });
};

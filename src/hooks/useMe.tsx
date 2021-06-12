import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { USER_FRAGMENT } from "../fragments";
import { myProfileQuery } from "../__generated__/myProfileQuery";

export const MY_PROFILE_QUERY = gql`
  query myProfileQuery {
    myProfile {
      ok
      error
      user {
        ...UserFragment
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const useMe = () => {
  return useQuery<myProfileQuery>(MY_PROFILE_QUERY);
};

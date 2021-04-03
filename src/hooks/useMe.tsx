import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {
  ADDRESS_FRAGMENT,
  CAFE_FRAGMENT,
  REPLY_FRAGMENT,
  REVIEW_FRAGMENT,
} from "../fragments";
import { myProfile } from "../__generated__/myProfile";

const MY_PROFILE_QUERY = gql`
  query myProfile {
    myProfile {
      ok
      error
      user {
        id
        name
        email
        role
        profileImg
        createdAt
        updatedAt
        address {
          ...AddressFragment
        }
        likeCafes {
          ...CafeFragment
        }
        cafes {
          ...CafeFragment
        }
        review {
          ...ReviewFragment
        }
        reply {
          ...ReplyFragment
        }
      }
    }
  }
  ${ADDRESS_FRAGMENT}
  ${CAFE_FRAGMENT}
  ${REVIEW_FRAGMENT}
  ${REPLY_FRAGMENT}
`;

export const useMe = () => {
  return useQuery<myProfile>(MY_PROFILE_QUERY);
};

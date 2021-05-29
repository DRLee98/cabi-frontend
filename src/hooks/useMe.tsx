import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {
  ADDRESS_FRAGMENT,
  CAFE_FRAGMENT,
  REPLY_FRAGMENT,
  REVIEW_FRAGMENT,
} from "../fragments";
import { myProfileQuery } from "../__generated__/myProfileQuery";

export const MY_PROFILE_QUERY = gql`
  query myProfileQuery {
    myProfile {
      ok
      error
      user {
        id
        name
        email
        role
        smallProfileImg
        originalProfileImg
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
  return useQuery<myProfileQuery>(MY_PROFILE_QUERY);
};

export const likeCafeId = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useMe();
  return data?.myProfile.user?.likeCafes?.map((likeCafe) => likeCafe.id);
};

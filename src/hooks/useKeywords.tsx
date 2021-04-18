import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { viewKeywordsQuery } from "../__generated__/viewKeywordsQuery";

export const VIEW_KEYWORDS_QUERY = gql`
  query viewKeywordsQuery {
    viewKeywords {
      ok
      error
      keywords {
        id
        name
        slug
      }
    }
  }
`;

export const useKeywords = () => {
  return useQuery<viewKeywordsQuery>(VIEW_KEYWORDS_QUERY);
};

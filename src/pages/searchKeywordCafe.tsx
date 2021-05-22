import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useParams } from "react-router";
import { GridCafe } from "../components/cafes";
import { Keywords } from "../components/keywords";
import { Container } from "../components/styledComponent";
import { siteName } from "../constants";
import { SIMPLE_CAFE_FRAGMENT } from "../fragments";
import { useKeywords } from "../hooks/useKeywords";
import { searchCafesKeywordQuery } from "../__generated__/searchCafesKeywordQuery";

const SEARCH_CAFES_KEYWORD_QUERY = gql`
  query searchCafesKeywordQuery($input: SearchCafesKeywordInput!) {
    searchCafesKeyword(input: $input) {
      ok
      error
      cafes {
        ...SimpleCafeFragment
      }
    }
  }
  ${SIMPLE_CAFE_FRAGMENT}
`;

interface SearchKeywordCafeParams {
  slug: string;
}

export const SearchKeywordCafe = () => {
  const { slug } = useParams<SearchKeywordCafeParams>();

  const { data, loading } = useQuery<searchCafesKeywordQuery>(
    SEARCH_CAFES_KEYWORD_QUERY,
    {
      variables: { input: { slug } },
    },
  );
  const { data: getkeywords } = useKeywords();

  const keywords = getkeywords?.viewKeywords.keywords;
  const cafes = data?.searchCafesKeyword.cafes;

  return (
    <>
      <Helmet>
        <title>{siteName}</title>
      </Helmet>
      <Container>
        <Keywords keywords={keywords} selectedKeyword={slug} />
        <GridCafe cafes={cafes} />
      </Container>
    </>
  );
};

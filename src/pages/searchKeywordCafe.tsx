import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { GridCafe } from "../components/cafes";
import { Keywords } from "../components/keywords";
import { Loading } from "../components/loading";
import { Container } from "../components/styledComponent";
import { siteName } from "../commonConstants";
import { SIMPLE_CAFE_FRAGMENT } from "../fragments";
import { useKeywords } from "../hooks/useKeywords";
import { searchCafesKeywordQuery } from "../__generated__/searchCafesKeywordQuery";
import { useAppSelector } from "app/hooks";

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
  const user = useAppSelector((state) => state.loggedInUser.value);
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

  return loading ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title>{siteName}</title>
      </Helmet>
      <Container>
        <Keywords keywords={keywords} selectedKeyword={slug} />
        <GridCafe cafes={cafes} me={user} />
      </Container>
    </>
  );
};

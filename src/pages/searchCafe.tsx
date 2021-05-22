import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";
import { GridCafe } from "../components/cafes";
import { Keywords } from "../components/keywords";
import { Container } from "../components/styledComponent";
import { siteName } from "../constants";
import { SIMPLE_CAFE_FRAGMENT } from "../fragments";
import { useKeywords } from "../hooks/useKeywords";
import { searchCafesQuery } from "../__generated__/searchCafesQuery";
import queryString from "query-string";

const SEARCH_CAFES_QUERY = gql`
  query searchCafesQuery($input: SearchCafesInput!) {
    searchCafes(input: $input) {
      ok
      error
      cafes {
        ...SimpleCafeFragment
      }
    }
  }
  ${SIMPLE_CAFE_FRAGMENT}
`;

export const SearchCafe = () => {
  const { search } = useLocation();
  const { word } = queryString.parse(search);

  const { data, loading } = useQuery<searchCafesQuery>(SEARCH_CAFES_QUERY, {
    variables: { input: { word } },
  });
  const { data: getkeywords } = useKeywords();

  const keywords = getkeywords?.viewKeywords.keywords;
  const cafes = data?.searchCafes.cafes;

  return (
    <>
      <Helmet>
        <title>{siteName}</title>
      </Helmet>
      <Container>
        <Keywords keywords={keywords} />
        <GridCafe cafes={cafes} />
      </Container>
    </>
  );
};

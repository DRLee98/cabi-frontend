import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { GridCafe } from "../components/cafes";
import { Keywords } from "../components/keywords";
import { Container } from "../components/styledComponent";
import { siteName } from "../constants";
import { SIMPLE_CAFE_FRAGMENT } from "../fragments";
import { useKeywords } from "../hooks/useKeywords";
import { seeCafesQuery } from "../__generated__/seeCafesQuery";

const SEE_CAFES_QUERY = gql`
  query seeCafesQuery {
    seeCafes {
      ok
      error
      cafes {
        ...SimpleCafeFragment
      }
    }
  }
  ${SIMPLE_CAFE_FRAGMENT}
`;

export const Home = () => {
  const { data, loading } = useQuery<seeCafesQuery>(SEE_CAFES_QUERY);
  const { data: getkeywords } = useKeywords();
  const keywords = getkeywords?.viewKeywords.keywords;
  const cafes = data?.seeCafes.cafes;
  console.log(cafes);
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

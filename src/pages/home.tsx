import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { GridCafe } from "../components/cafes";
import { Keywords } from "../components/keywords";
import { Container } from "../components/styledComponent";
import { siteName } from "../constants";
import { SIMPLE_CAFE_FRAGMENT } from "../fragments";
import { seeCafesQuery } from "../__generated__/seeCafesQuery";

const SEE_CAFES_QUERY = gql`
  query seeCafesQuery {
    seeCafes {
      ok
      error
      cafes {
        ...CafeFragment
      }
    }
  }
  ${SIMPLE_CAFE_FRAGMENT}
`;

export const Home = () => {
  const { data, loading } = useQuery<seeCafesQuery>(SEE_CAFES_QUERY);
  const cafes = data?.seeCafes.cafes;
  console.log(cafes);
  return (
    <>
      <Helmet>
        <title>{siteName}</title>
      </Helmet>
      <Container>
        <Keywords />
        <GridCafe cafes={cafes} />
      </Container>
    </>
  );
};

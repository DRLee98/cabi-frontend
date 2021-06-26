import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { GridCafe } from "../components/cafes";
import { CafesRank } from "../components/cafesRank";
import { Keywords } from "../components/keywords";
import { Loading } from "../components/loading";
import { Container } from "../components/styledComponent";
import { siteName } from "../commonConstants";
import { SIMPLE_CAFE_FRAGMENT } from "../fragments";
import { useKeywords } from "../hooks/useKeywords";
import { seeCafesQuery } from "../__generated__/seeCafesQuery";
import { UserFragment } from "../__generated__/UserFragment";

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

interface HomeProp {
  user: UserFragment | null | undefined;
}

export const Home: React.FC<HomeProp> = ({ user }) => {
  const { data, loading } = useQuery<seeCafesQuery>(SEE_CAFES_QUERY);
  const { data: getkeywords } = useKeywords();
  const keywords = getkeywords?.viewKeywords.keywords;
  const cafes = data?.seeCafes.cafes;

  console.log(cafes);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title>{siteName}</title>
      </Helmet>
      <Container>
        <CafesRank />
        <Keywords keywords={keywords} />
        <GridCafe cafes={cafes} me={user} />
      </Container>
    </>
  );
};

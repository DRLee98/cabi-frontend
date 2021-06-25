import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GridCafe } from "../../components/cafes";
import { CreateButton } from "../../components/createBtn";
import { Keywords } from "../../components/keywords";
import { Loading } from "../../components/loading";
import { Container, Title } from "../../components/styledComponent";
import { siteName } from "../../constants";
import { SIMPLE_CAFE_FRAGMENT } from "../../fragments";
import { useKeywords } from "../../hooks/useKeywords";
import { myCafesQuery } from "../../__generated__/myCafesQuery";
import { UserFragment } from "../../__generated__/UserFragment";

const EmptyBox = styled.div`
  margin: 15vh 0;
  font-size: 25px;
  text-align: center;
  color: ${(prop) => prop.theme.keywordBgColor};
`;

const EmptyLink = styled(Link)`
  display: block;
  margin-top: 1em;
  color: ${(prop) => prop.theme.keywordBgColor};
  &:hover {
    text-decoration: underline;
  }
`;

const MyCafeContainer = styled.section`
  padding: 0 10px;
`;

const CafeContainer = styled.section`
  padding: 0 10px;
  padding-top: 2vh;
  margin-top: 2vh;
  border-top: 1px solid ${(prop) => prop.theme.signatureColor};
`;

export const MY_CAFES_QUERY = gql`
  query myCafesQuery {
    myCafes {
      ok
      error
      myCafes {
        ...SimpleCafeFragment
      }
      cafes {
        ...SimpleCafeFragment
      }
    }
  }
  ${SIMPLE_CAFE_FRAGMENT}
`;

interface MyCafesProp {
  user: UserFragment | null | undefined;
}

export const MyCafes: React.FC<MyCafesProp> = ({ user }) => {
  const { data, loading } = useQuery<myCafesQuery>(MY_CAFES_QUERY);
  const { data: keywordsData } = useKeywords();

  const keywords = keywordsData?.viewKeywords.keywords;
  const myCafes = data?.myCafes.myCafes;
  const cafes = data?.myCafes.cafes;

  return loading ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title>{siteName}</title>
      </Helmet>
      <Container>
        <Keywords keywords={keywords} />
        <MyCafeContainer>
          <CreateButton link={"/create-cafe"} text={"+ 카페 만들기"} />
          <Title>내 카페</Title>
          {myCafes && myCafes?.length > 0 ? (
            <GridCafe owner={true} cafes={myCafes} me={user} />
          ) : (
            <EmptyBox>
              사장님의 카페가 없습니다.
              <EmptyLink to="create-cafe">카페 만들러 가기</EmptyLink>
            </EmptyBox>
          )}
        </MyCafeContainer>
        <CafeContainer>
          <Title>다른 사장님들 카페</Title>
          <GridCafe owner={true} cafes={cafes} me={user} />
        </CafeContainer>
      </Container>
    </>
  );
};

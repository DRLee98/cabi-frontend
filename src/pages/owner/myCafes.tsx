import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GridCafe } from "../../components/cafes";
import { CreateButton } from "../../components/createBtn";
import { Keywords } from "../../components/keywords";
import { Loading } from "../../components/loading";
import { Container } from "../../components/styledComponent";
import { siteName } from "../../constants";
import { SIMPLE_CAFE_FRAGMENT } from "../../fragments";
import { useKeywords } from "../../hooks/useKeywords";
import { myCafesQuery } from "../../__generated__/myCafesQuery";

const EmptyBox = styled.div`
  margin-top: 30vh;
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

export const MY_CAFES_QUERY = gql`
  query myCafesQuery {
    myCafes {
      ok
      error
      cafes {
        ...SimpleCafeFragment
      }
    }
  }
  ${SIMPLE_CAFE_FRAGMENT}
`;

export const MyCafes = () => {
  const { data: cafesData, loading } = useQuery<myCafesQuery>(MY_CAFES_QUERY);
  const { data: keywordsData } = useKeywords();

  const keywords = keywordsData?.viewKeywords.keywords;
  const cafes = cafesData?.myCafes.cafes;

  console.log(cafes);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title>{siteName}</title>
      </Helmet>
      <Container>
        <CreateButton link={"/create-cafe"} text={"+ 카페 만들기"} />
        <Keywords keywords={keywords} />
        {cafes && cafes?.length > 0 ? (
          <GridCafe owner={true} cafes={cafes} />
        ) : (
          <EmptyBox>
            사장님의 카페가 없습니다.
            <EmptyLink to="create-cafe">카페 만들러 가기</EmptyLink>
          </EmptyBox>
        )}
      </Container>
    </>
  );
};

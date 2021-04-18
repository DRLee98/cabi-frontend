import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GridCafe } from "../../components/cafes";
import { Keywords } from "../../components/keywords";
import { Container } from "../../components/styledComponent";
import { siteName } from "../../constants";
import { SIMPLE_CAFE_FRAGMENT } from "../../fragments";
import { useKeywords } from "../../hooks/useKeywords";
import { myCafesQuery } from "../../__generated__/myCafesQuery";

const EmptyBox = styled.div`
  margin-top: 30vh;
  font-size: 25px;
  text-align: center;
  color: ${(prop) => prop.theme.disableColor};
`;

const EmptyLink = styled(Link)`
  display: block;
  margin-top: 1em;
  color: ${(prop) => prop.theme.keywordColor};
  &:hover {
    text-decoration: underline;
  }
`;

const CreateCafeBlock = styled.div``;

const CreateCafeLink = styled(Link)`
  display: block;
  padding: 1em;
  margin: 1em;
  text-align: center;
  border-radius: 10px;
  transition: all 0.3s ease;
  &:hover {
    color: ${(prop) => prop.theme.signatureColor};
    background-color: ${(prop) => prop.theme.lightBgColor};
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
  const { data, loading } = useQuery<myCafesQuery>(MY_CAFES_QUERY);
  const { data: getkeywords } = useKeywords();
  const keywords = getkeywords?.viewKeywords.keywords;
  const cafes = data?.myCafes.cafes;
  console.log(cafes);
  return (
    <>
      <Helmet>
        <title>{siteName}</title>
      </Helmet>
      <Container>
        <CreateCafeBlock>
          <CreateCafeLink to="/create-cafe">+ 카페 만들기</CreateCafeLink>
        </CreateCafeBlock>
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

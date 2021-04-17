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
import { myCafesQuery } from "../../__generated__/myCafesQuery";

const EmptyBox = styled.div`
  margin-top: 30vh;
  font-size: 25px;
  text-align: center;
  color: ${(prop) => prop.theme.disableColor};
`;

const SLink = styled(Link)`
  display: block;
  margin-top: 1em;
  color: ${(prop) => prop.theme.keywordColor};
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
        ...CafeFragment
      }
    }
  }
  ${SIMPLE_CAFE_FRAGMENT}
`;

export const MyCafes = () => {
  const { data, loading } = useQuery<myCafesQuery>(MY_CAFES_QUERY);
  const cafes = data?.myCafes.cafes;
  console.log(cafes);
  return (
    <>
      <Helmet>
        <title>{siteName}</title>
      </Helmet>
      <Container>
        <Link to="/create-cafe">카페 만들기</Link>
        <Keywords />
        {cafes && cafes?.length > 0 ? (
          <GridCafe owner={true} cafes={cafes} />
        ) : (
          <EmptyBox>
            사장님의 카페가 없습니다.
            <SLink to="create-cafe">카페 만들러 가기</SLink>
          </EmptyBox>
        )}
      </Container>
    </>
  );
};

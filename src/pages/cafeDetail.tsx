import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import styled from "styled-components";
import { Keywords } from "../components/keywords";
import { Score } from "../components/score";
import { Container, CoverImage, Image } from "../components/styledComponent";
import { siteName } from "../constants";
import { CAFE_FRAGMENT } from "../fragments";
import { cafeDetailQuery } from "../__generated__/cafeDetailQuery";

const ContentsBox = styled.div`
  position: relative;
  height: 35vh;
  display: flex;
  flex-direction: column;
`;

const ImageBox = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
`;

const Title = styled.h1`
  margin: 2em 0;
  padding: 1em;
  background-color: rgb(255 255 255 / 50%);
  display: inline-block;
  text-align: center;
`;

const OwnerInfo = styled.div`
  padding: 0;
  width: 0;
  overflow: hidden;
  box-sizing: content-box;
  transition: all 0.5s ease;
`;

const OwnerName = styled.h3`
  font-size: 22px;
  min-width: max-content;
  margin-bottom: 0.5em;
`;

const OwnerEmail = styled.p`
  font-size: 12px;
  min-width: max-content;
`;

const OwnerBox = styled.div<OwnerBoxProp>`
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 20px;
  right: 20px;
  border-radius: 999px;
  border: 4px solid rgb(255 255 255 / 50%);
  background-color: rgb(255 255 255 / 50%);
  &:hover ${OwnerInfo} {
    padding: 1em;
    width: ${(prop) => prop.width}px;
  }
`;

const ScoreBox = styled.div``;

const KeywordBox = styled.div``;

const Description = styled.p`
  padding: 0.5em 1.5em;
  font-size: small;
`;

interface OwnerBoxProp {
  width: number;
}

interface cafeDetailParam {
  cafeId: string;
}

const CAFE_DETAIL_QUERY = gql`
  query cafeDetailQuery($input: CafeDetailInput!) {
    cafeDetail(input: $input) {
      ok
      error
      cafe {
        ...CafeFragment
      }
    }
  }
  ${CAFE_FRAGMENT}
`;

export const CafeDetail = () => {
  const [ownerNameWidth, setOwnerNameWidth] = useState<number>(0);
  const [ownerEmailWidth, setOwnerEmailWidth] = useState<number>(0);
  const { cafeId } = useParams<cafeDetailParam>();
  const { loading, data } = useQuery<cafeDetailQuery>(CAFE_DETAIL_QUERY, {
    variables: { input: { id: +cafeId } },
  });
  const cafe = data?.cafeDetail.cafe;
  const keywords = cafe?.keywords;
  console.log(cafe);
  return loading ? (
    <h1>loading</h1>
  ) : (
    <>
      <Helmet>
        <title>
          {siteName} | {cafe?.name}
        </title>
      </Helmet>
      <Container>
        <ContentsBox>
          <ImageBox>
            <CoverImage src={cafe?.coverImg || ""} />
          </ImageBox>
          <Title>{cafe?.name}</Title>
          <OwnerBox
            width={
              ownerNameWidth > ownerEmailWidth
                ? ownerNameWidth
                : ownerEmailWidth
            }
          >
            <Image src={cafe?.owner.profileImg || ""} sizes={"5rem"} />
            <OwnerInfo>
              <OwnerName
                ref={(ref) => ref && setOwnerNameWidth(ref.offsetWidth)}
              >
                {cafe?.owner.name}
              </OwnerName>
              <OwnerEmail
                ref={(ref) => ref && setOwnerEmailWidth(ref.offsetWidth)}
              >
                {cafe?.owner.email}
              </OwnerEmail>
            </OwnerInfo>
          </OwnerBox>
        </ContentsBox>
        <KeywordBox>
          <Keywords keywords={keywords} />
        </KeywordBox>
        <Description>{cafe?.description}</Description>
      </Container>
    </>
  );
};

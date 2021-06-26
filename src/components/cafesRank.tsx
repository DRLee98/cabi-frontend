import { useQuery } from "@apollo/client";
import { defaultCoverImg } from "commonConstants";
import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { RANK_CAFE_FRAGMENT } from "../fragments";
import { cafesRankQuery } from "../__generated__/cafesRankQuery";
import { Score } from "./score";
import { CoverImage } from "./styledComponent";

const CafeRankContainer = styled.div`
  height: 45vh;
  display: flex;
  justify-content: space-between;
  // border: 2px solid ${(prop) => prop.theme.signatureColor};
  @media only screen and (max-width: ${({ theme }) => theme.smallScreenWidth}) {
    display: block;
    height: auto;
  }
`;

const CafeImgList = styled.ul`
  width: 70%;
  position: relative;
  overflow: hidden;
  @media only screen and (max-width: ${({ theme }) => theme.smallScreenWidth}) {
    width: 100%;
    height: 45vw;
  }
`;

const CafeImg = styled.li<CafeImgProp>`
  width: ${(prop) => prop.width}px;
  height: ${(prop) => prop.height}px;
  position: absolute;
  ${(prop) =>
    prop.view === "current"
      ? "top: 0; left: 0px;"
      : prop.view === "next"
      ? `top: 0; left:-${prop.width}px; z-index: -1;`
      : prop.view === "prev"
      ? `top: 0; left:${prop.width}px;`
      : "z-index: -10;"};
  transition: left 0.5s ease;
`;

const RankList = styled.ul`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (max-width: ${({ theme }) => theme.smallScreenWidth}) {
    width: 100%;
  }
`;

const RankItem = styled.li<RankItemProp>`
  padding: 4px;
  height: 100%;
  transition: all 0.5s ease;
  ${(prop) =>
    prop.currentView &&
    `
    background-color: ${prop.theme.signaturelightBgColor};
    transform: rotateX(360deg);
  `}
  &:hover {
    background-color: ${(prop) => prop.theme.lightBgColor};
  }
`;

const RankLink = styled(Link)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  //padding: 0 10px;
`;

const Rank = styled.span<RankProp>`
  margin-right: 5px;
  ${(prop) => prop.rank < 4 && "font-size: 25px"};
  color: ${(prop) =>
    prop.rank === 1
      ? "gold"
      : prop.rank === 2
      ? "silver"
      : prop.rank === 3
      ? "chocolate"
      : "gray"};
  @media only screen and (max-width: ${({ theme }) => theme.smallScreenWidth}) {
    ${(prop) => prop.rank < 4 && "font-size: 20px"};
  }
`;

const CafeInfo = styled.div``;

const CafeName = styled.strong`
  font-size: 20px;
  font-weight: bold;
  display: inline-block;
  @media only screen and (max-width: ${({ theme }) => theme.smallScreenWidth}) {
    font-size: 16px;
  }
`;

const CafeAddress = styled.address`
  font-size: 14px;
  font-weight: normal;
  margin: 4px 0;
  color: ${(prop) => prop.theme.grayColor};
  @media only screen and (max-width: ${({ theme }) => theme.smallScreenWidth}) {
    font-size: 12px;
  }
`;

const ScoreBox = styled.div`
  text-align: right;
`;

export const CAFES_RANK_QUERY = gql`
  query cafesRankQuery {
    cafesRank {
      ok
      error
      cafes {
        ...RankCafeFragment
      }
    }
  }
  ${RANK_CAFE_FRAGMENT}
`;

interface CafeImgProp {
  width: number;
  height: number;
  view: "next" | "current" | "prev" | undefined;
}

interface RankItemProp {
  currentView: boolean;
}

interface RankProp {
  rank: number;
}

export const CafesRank = () => {
  const { data, loading } = useQuery<cafesRankQuery>(CAFES_RANK_QUERY);
  const cafes = data?.cafesRank.cafes;

  const [currentView, setCurrentView] = useState<number>(1);
  const [coverImgWidth, setCoverImgWidth] = useState<number>();
  const [coverImgHeight, setCoverImgHeight] = useState<number>();

  useEffect(() => {
    setTimeout(() => {
      if (cafes && currentView < cafes.length) {
        setCurrentView(currentView + 1);
      } else {
        setCurrentView(1);
      }
    }, 6000);
  }, [cafes, currentView]);

  const getView = (i: number) => {
    if (i === currentView) {
      return "current";
    }
    const nextView = currentView + 1 > 10 ? 1 : currentView + 1;
    if (i === nextView) {
      return "next";
    }
    const prevView = currentView - 1 < 1 ? cafes?.length : currentView - 1;
    if (i === prevView) {
      return "prev";
    }
  };

  return loading ? (
    <h1>loading</h1>
  ) : (
    <CafeRankContainer>
      <CafeImgList
        ref={(ref) => {
          if (ref) {
            setCoverImgWidth(ref.clientWidth);
            setCoverImgHeight(ref.clientHeight);
          }
        }}
      >
        {cafes?.map((cafe, i) => (
          <CafeImg
            key={cafe.originalCoverImg}
            width={coverImgWidth || 0}
            height={coverImgHeight || 0}
            view={getView(i + 1)}
          >
            <Link to={`/cafe/${cafe.id}`}>
              <CoverImage src={cafe.originalCoverImg || defaultCoverImg} />
            </Link>
          </CafeImg>
        ))}
      </CafeImgList>
      <RankList>
        {cafes?.map((cafe, i) => (
          <RankItem key={cafe.createdAt} currentView={currentView === i + 1}>
            <RankLink to={`/cafe/${cafe.id}`}>
              <CafeInfo>
                <Rank rank={i + 1}>{i + 1}.</Rank>
                <CafeName>{cafe.name}</CafeName>
                <CafeAddress>{cafe.address.address}</CafeAddress>
              </CafeInfo>
              <ScoreBox>
                <Score
                  totalScore={cafe.totalScore}
                  avgScore={cafe.avgScore}
                  likedUsers={cafe.likedUsers?.length || 0}
                />
              </ScoreBox>
            </RankLink>
          </RankItem>
        ))}
      </RankList>
    </CafeRankContainer>
  );
};

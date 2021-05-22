import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SIMPLE_CAFE_FRAGMENT } from "../fragments";
import { cafesRankQuery } from "../__generated__/cafesRankQuery";
import { Score } from "./score";
import { CoverImage } from "./styledComponent";

const CafeRankContainer = styled.div`
  height: 45vh;
  display: flex;
  justify-content: space-between;
  border: 2px solid ${(prop) => prop.theme.signatureColor};
`;

const CafeImgList = styled.ul`
  width: 70%;
  position: relative;
  overflow: hidden;
`;

const CafeImg = styled.li<CafeImgProp>`
  width: ${(prop) => prop.width}px;
  height: ${(prop) => prop.height}px;
  position: absolute;
  ${(prop) =>
    prop.view === "current"
      ? "top: 0; left: 0px;"
      : prop.view === "next"
      ? `top: 0; left:-${prop.width}px;`
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
`;

const RankItem = styled.li<RankItemProp>`
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
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & div {
    align-self: auto;
  }
`;

const Rank = styled.span<RankProp>`
  margin-right: 5px;
  ${(prop) => prop.rank < 4 && "font-size: large"};
  color: ${(prop) =>
    prop.rank === 1
      ? "gold"
      : prop.rank === 2
      ? "silver"
      : prop.rank === 3
      ? "chocolate"
      : "gray"};
`;

const CafeName = styled.span``;

export const CAFES_RANK_QUERY = gql`
  query cafesRankQuery {
    cafesRank {
      ok
      error
      cafes {
        ...SimpleCafeFragment
      }
    }
  }
  ${SIMPLE_CAFE_FRAGMENT}
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
    }, 7000);
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

  return (
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
            key={cafe.coverImg}
            width={coverImgWidth || 0}
            height={coverImgHeight || 0}
            view={getView(i + 1)}
          >
            <Link to={`/cafe/${cafe.id}`}>
              <CoverImage src={cafe.coverImg || ""} />
            </Link>
          </CafeImg>
        ))}
      </CafeImgList>
      <RankList>
        {cafes?.map((cafe, i) => (
          <RankItem key={cafe.createdAt} currentView={currentView === i + 1}>
            <RankLink to={`/cafe/${cafe.id}`}>
              <CafeName>
                <Rank rank={i + 1}>{i + 1}.</Rank>
                {cafe.name}
              </CafeName>
              <Score
                totalScore={cafe.totalScore}
                avgScore={cafe.avgScore}
                likedUsers={cafe.likedUsers?.length || 0}
              />
            </RankLink>
          </RankItem>
        ))}
      </RankList>
    </CafeRankContainer>
  );
};

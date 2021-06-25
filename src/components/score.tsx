import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const StarIcon = styled(FontAwesomeIcon)`
  margin-right: 4px;
  color: #ffde39;
`;

const HeartIcon = styled(FontAwesomeIcon)`
  margin-left: 10px;
  margin-right: 4px;
  color: red;
`;

const ScoreBox = styled.div`
  font-size: 12px;
  //align-self: flex-end;
  @media only screen and (max-width: ${({ theme }) => theme.smallScreenWidth}) {
    display: none;
  }
`;

const SmallScoreBox = styled.div`
  display: none;
  font-size: 8px;
  @media only screen and (max-width: ${({ theme }) => theme.smallScreenWidth}) {
    display: block;
  }
`;

interface ScoreProps {
  totalScore: number;
  avgScore: number;
  likedUsers: number;
}

export const Score: React.FC<ScoreProps> = ({
  totalScore,
  avgScore,
  likedUsers,
}) => {
  return (
    <>
      <ScoreBox>
        <StarIcon icon={faStar} />
        총합: {totalScore} / 평균: {avgScore}
        <HeartIcon icon={faHeart} />
        {likedUsers}
      </ScoreBox>
      <SmallScoreBox>
        <StarIcon icon={faStar} />
        {totalScore} / {avgScore}
        <HeartIcon icon={faHeart} />
        {likedUsers}
      </SmallScoreBox>
    </>
  );
};

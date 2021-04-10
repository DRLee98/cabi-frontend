import { useQuery } from "@apollo/client";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SIMPLE_CAFE_FRAGMENT } from "../fragments";
import { likeCafeId } from "../hooks/useMe";
import { seeCafesQuery } from "../__generated__/seeCafesQuery";

const GridBox = styled.ul`
  display: grid;
  grid-gap: 1.2em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

const CafeBox = styled.li``;

const CafeImg = styled.div<CafeBoxProps>`
  height: 150px;
  background-position: center;
  background-size: cover;
  background-image: url(${(prop) => prop.image});
  border-radius: 10px 10px 0 0;
  position: relative;
`;

const CafeContents = styled.div`
  height: 50px;
  padding: 5px 10px;
  background-color: ${(prop) => prop.theme.signaturelightBgColor};
  border-radius: 0 0 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const LikeIcon = styled(FontAwesomeIcon)<IconProps>`
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 4px;
  font-size: 18px;
  box-sizing: unset;
  border-radius: 999px;
  border: 1px solid white;
  transition: all 0.3s ease;
  z-index: 10;
  color: ${(prop) => (prop.like ? "red" : prop.theme.disableColor)};
  &:hover {
    background-color: white;
  }
`;

const StarIcon = styled(FontAwesomeIcon)`
  color: #ffde39;
`;

const HeartIcon = styled(FontAwesomeIcon)`
  margin-left: 8px;
  color: red;
`;

const CafeName = styled.span``;

const ScoreBox = styled.div`
  font-size: 12px;
  align-self: flex-end;
`;

interface CafeBoxProps {
  image: string | null;
}

interface IconProps {
  like: boolean | undefined;
}

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

export const GridCafe = () => {
  const [likeCafesId, setLikeCafesId] = useState(likeCafeId() || []);
  const { data, loading } = useQuery<seeCafesQuery>(SEE_CAFES_QUERY);
  console.log(data);
  const cafes = data?.seeCafes.cafes;

  const toggleLikeCafe = (id: number) => {
    console.log(likeCafesId);
    if (likeCafesId?.includes(id)) {
      setLikeCafesId((ids) => ids.filter((likeId) => likeId !== id));
    } else {
      setLikeCafesId((ids) => [...ids, id]);
    }
  };

  return (
    <GridBox>
      {cafes?.map((cafe) => (
        // <Link to={cafe.id + ""} key={cafe.id}>
        <CafeBox>
          <CafeImg image={cafe.coverImg}>
            <LikeIcon
              icon={faHeart}
              like={likeCafesId?.includes(cafe.id)}
              onClick={() => toggleLikeCafe(cafe.id)}
            />
          </CafeImg>
          <CafeContents>
            <CafeName>{cafe.name}</CafeName>
            <ScoreBox>
              <StarIcon icon={faStar} />
              {cafe.totalScore}/{cafe.avgScore}
              <HeartIcon icon={faHeart} />
              {cafe.likedUsers?.length || 0}
            </ScoreBox>
          </CafeContents>
        </CafeBox>
        // </Link>
      ))}
    </GridBox>
  );
};

import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { likeCafeId } from "../hooks/useMe";
import { seeCafesQuery_seeCafes_cafes } from "../__generated__/seeCafesQuery";
import { Score } from "./score";

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
  border-radius: 5px 5px 0 0;
  position: relative;
`;

const CafeContents = styled.div`
  height: 50px;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 0 0 5px 5px;
  border-bottom: 1px solid ${(prop) => prop.theme.keywordColor};
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

const CafeName = styled.span``;

interface CafeBoxProps {
  image: string | null;
}

interface IconProps {
  like: boolean | undefined;
}

interface CafesProp {
  owner?: boolean;
  cafes: seeCafesQuery_seeCafes_cafes[] | null | undefined;
}

export const GridCafe: React.FC<CafesProp> = ({ owner = false, cafes }) => {
  const [likeCafesId, setLikeCafesId] = useState(likeCafeId() || []);

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
        <Link to={`cafe/${cafe.id}`} key={cafe.id}>
          <CafeBox>
            <CafeImg image={cafe.coverImg}>
              {!owner && (
                <LikeIcon
                  icon={faHeart}
                  like={likeCafesId?.includes(cafe.id)}
                  onClick={() => toggleLikeCafe(cafe.id)}
                />
              )}
            </CafeImg>
            <CafeContents>
              <CafeName>{cafe.name}</CafeName>
              <Score
                totalScore={cafe.totalScore}
                avgScore={cafe.avgScore}
                likedUsers={cafe.likedUsers?.length || 0}
              />
            </CafeContents>
          </CafeBox>
        </Link>
      ))}
    </GridBox>
  );
};

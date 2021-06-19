import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { seeCafesQuery_seeCafes_cafes } from "../__generated__/seeCafesQuery";
import { UserFragment } from "../__generated__/UserFragment";
import { StackKeywords } from "./keywords";
import { Score } from "./score";
import { UserCircle } from "./userCircleBox";

const GridBox = styled.ul`
  display: grid;
  grid-gap: 2em 1.2em;
  grid-template-columns: repeat(3, minmax(250px, 1fr));
`;

const CafeImg = styled.div<CafeBoxProps>`
  height: 24vh;
  min-height: 150px;
  background-position: center;
  background-size: cover;
  background-image: url(${(prop) =>
    prop.image ? prop.image : "/image/background_basic.png"});
  border-radius: 10px 0 10px 0;
  position: relative;
  overflow: hidden;
`;

const CafeContents = styled.div`
  padding: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
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
  color: ${(prop) =>
    prop.like ? prop.theme.redColor : prop.theme.disableColor};
  &:hover {
    background-color: white;
  }
`;

const CafeName = styled.strong`
  font-weight: bold;
  font-size: 18px;
`;

const CafeDim = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #33333380;
  transition: all 0.3s ease;
  z-index: 99;
  opacity: 0;
`;

const KeywordsBox = styled.div`
  width: 100%;
`;

const DimContents = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 10px;
  height: 100%;
`;

const CafeBox = styled.li`
  background-color: ${(prop) => prop.theme.signaturelightBgColor};
  border-radius: 10px 0 10px 10px;
  &:hover {
    ${CafeDim} {
      opacity: 1;
    }
  }
`;

interface CafeBoxProps {
  image: string | null;
}

interface IconProps {
  like: boolean | undefined;
}

interface CafesProp {
  owner?: boolean;
  cafes: seeCafesQuery_seeCafes_cafes[] | null | undefined;
  me: UserFragment | null | undefined;
}

export const GridCafe: React.FC<CafesProp> = ({ owner = false, cafes, me }) => {
  return (
    <GridBox>
      {cafes?.map((cafe) => (
        <Link to={`/cafe/${cafe.id}`} key={cafe.id}>
          <CafeBox>
            <CafeImg image={cafe.smallCoverImg}>
              {!owner && (
                <LikeIcon
                  icon={faHeart}
                  like={
                    me &&
                    me.likeCafes?.find((likeCafe) => likeCafe.id === cafe.id)
                      ? true
                      : false
                  }
                />
              )}
              <CafeDim>
                <DimContents>
                  <KeywordsBox>
                    <StackKeywords keywords={cafe.keywords} />
                  </KeywordsBox>
                  {cafe.owner.id !== me?.id && (
                    <UserCircle user={cafe.owner} me={me} />
                  )}
                </DimContents>
              </CafeDim>
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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const InfoBox = styled.div`
  position: relative;
  height: 35vh;
  display: flex;
  flex-direction: column;
`;

export const ImageBox = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
`;

export const Title = styled.h1`
  margin: 2em 0;
  padding: 1em;
  background-color: rgb(255 255 255 / 50%);
  display: inline-block;
  text-align: center;
  font-size: 1em;
`;

export const OwnerInfo = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

export const MidBox = styled.div`
  display: grid;
  grid-template:
    "keyword likeUser" 2fr
    "description likeUser" 1fr / 2fr 1fr;
`;

export const LikeUserList = styled.ul`
  grid-area: likeUser;
  & + & {
    margin-right: 8px;
  }
  & ul {
    margin-left: auto;
  }
`;

export const LikeUserTitle = styled.strong`
  display: block;
  text-align: right;
  padding: 8px;
`;

export const LikeUserBox = styled.div`
  display: flex;
`;

export const HeartIcon = styled(FontAwesomeIcon)`
  margin-left: 8px;
  margin-right: 4px;
  font-size: 15px;
  color: red;
`;

export const LikeUser = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ToggleLikeBtn = styled.button<ToggleLikeBtnProp>`
  cursor: pointer;
  ${HeartIcon} {
    margin: 4px 10px;
    padding: 10px;
    font-size: 4rem;
    background-color: whitesmoke;
    border-radius: 999px;
    transition: all 0.2s ease;
    color: ${(prop) =>
      !prop.like ? prop.theme.disableColor : prop.theme.redColor};
    &:hover {
      color: ${(prop) =>
        prop.like ? prop.theme.disableColor : prop.theme.redColor};
    }
  }
`;

export const KeywordBox = styled.div`
  grid-area: keyword;
`;

export const Description = styled.p`
  padding: 0.5em 1.5em;
  font-size: small;
  grid-area: description;
`;

export const ContentsBox = styled.main`
  margin-top: 1em;
  display: grid;
  grid-gap: 10px;
  grid-template:
    "menu map" 350px
    "menu review" 1fr / 3fr 350px;
`;

export const MenuBox = styled.section`
  grid-area: menu;
`;

export const MapBox = styled.section`
  grid-area: map;
  background-color: blue;
`;

export const ReviewBox = styled.section`
  grid-area: review;
`;

export const CategoryBox = styled.div`
  & + & {
    margin-top: 2em;
  }
`;

export const CategoryTitle = styled.h2`
  text-align: center;
  font-size: 1.2em;
  padding: 0.8em;
  color: ${(prop) => prop.theme.signatureColor};
  border-bottom: 1px solid ${(prop) => prop.theme.signatureBgColor};
`;

export const MenuList = styled.ul`
  margin-top: 1em;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-template-rows: minmax(180px, 250px);
`;

export const MenuItem = styled.li``;

export const MenuName = styled.span``;

interface ToggleLikeBtnProp {
  like: boolean;
}

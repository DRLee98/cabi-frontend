import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FlexBox } from "components/styledComponent";
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
  padding: 0 10px;
  display: grid;
  grid-template:
    "keyword likeUser" 2fr
    "description likeUser" 1fr / 2fr 1fr;
  @media only screen and (max-width: ${({ theme }) => theme.smallScreenWidth}) {
    display: block;
  }
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

export const OwnerBtns = styled(FlexBox)`
  @media only screen and (max-width: ${({ theme }) => theme.smallScreenWidth}) {
    display: block;
  }
`;

export const ContentsBox = styled.main`
  margin-top: 1em;
  padding: 0 10px;
  display: grid;
  grid-gap: 10px;
  grid-template:
    "menu map" 350px
    "menu review" 1fr / 3fr 350px;
  @media only screen and (max-width: ${({ theme }) => theme.smallScreenWidth}) {
    display: block;
  }
`;

export const MenuBox = styled.section`
  grid-area: menu;
`;

export const MapBox = styled.section`
  grid-area: map;
  background-color: blue;
  @media only screen and (max-width: ${({ theme }) => theme.smallScreenWidth}) {
    height: 30vh;
    margin: 12px 0;
  }
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

export const MenuItem = styled.li`
  border: 2px solid ${(prop) => prop.theme.menuBackgroundColor};
  border-radius: 15px 0 15px 15px;
  overflow: hidden;
  a {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      border-radius: 15px 0 15px 15px;
      height: 85%;
      width: 95%;
    }
  }
`;

export const MenuInfo = styled.div`
  // display: flex;
  // align-items: flex-end;
  // justify-content: space-between;
  // height: 10%;
  padding: 5px 0;
  width: 90%;
`;

export const MenuName = styled.h4``;

export const MenuPrice = styled.strong`
  color: ${({ theme }) => theme.grayColor};
  font-size: 13px;
  text-align: right;
  display: block;
  margin-top: 5px;
`;

interface ToggleLikeBtnProp {
  like: boolean;
}

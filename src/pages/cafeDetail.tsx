import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import styled from "styled-components";
import { KakaoMap } from "../api/kakaoMap";
import { CreateButton } from "../components/createBtn";
import { Keywords } from "../components/keywords";
import { ReviewForm } from "../components/reviewForm";
import { ReviewList } from "../components/reviewList";
import { Slider } from "../components/slider";
import {
  Container,
  CoverImage,
  SLink,
  FlexBox,
  MenuImage,
} from "../components/styledComponent";
import { UserCircleDetail, UserCircle } from "../components/userCircleBox";
import { siteName } from "../constants";
import { useCafeDetail } from "../hooks/cafeDetailQuery";
import { useMe } from "../hooks/useMe";
import { cafeDetailQuery_cafeDetail_cafe_menus } from "../__generated__/cafeDetailQuery";
import { Category, UserRole } from "../__generated__/globalTypes";

const InfoBox = styled.div`
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
  font-size: 1em;
`;

const OwnerInfo = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const MidBox = styled.div`
  display: grid;
  grid-template:
    "keyword likeUser" 2fr
    "description likeUser" 1fr / 2fr 1fr;
`;

const LikeUserList = styled.ul`
  grid-area: likeUser;
  & + & {
    margin-right: 8px;
  }
  & ul {
    margin-left: auto;
  }
`;

const LikeUserTitle = styled.strong`
  display: block;
  text-align: right;
  padding: 8px;
`;

const HeartIcon = styled(FontAwesomeIcon)`
  margin-left: 8px;
  font-size: 15px;
  color: red;
`;

const LikeUser = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const KeywordBox = styled.div`
  grid-area: keyword;
`;

const Description = styled.p`
  padding: 0.5em 1.5em;
  font-size: small;
  grid-area: description;
`;

const ContentsBox = styled.main`
  margin-top: 1em;
  display: grid;
  grid-gap: 10px;
  grid-template:
    "menu map" 350px
    "menu review" 1fr / 3fr 350px;
`;

const MenuBox = styled.section`
  grid-area: menu;
`;

const MapBox = styled.section`
  grid-area: map;
  background-color: blue;
`;

const ReviewBox = styled.section`
  grid-area: review;
`;

const CategoryBox = styled.div`
  & + & {
    margin-top: 2em;
  }
`;

const CategoryTitle = styled.h2`
  text-align: center;
  font-size: 1.2em;
  padding: 0.8em;
  color: ${(prop) => prop.theme.signatureColor};
  border-bottom: 1px solid ${(prop) => prop.theme.signatureBgColor};
`;

const MenuList = styled.ul`
  margin-top: 1em;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-template-rows: minmax(180px, 250px);
`;

const MenuItem = styled.li``;

const MenuName = styled.span``;

interface cafeDetailParam {
  cafeId: string;
}

interface categoryProp {
  key: string;
  name: string;
  menu: cafeDetailQuery_cafeDetail_cafe_menus[] | null | undefined;
}

export const CafeDetail = () => {
  const { data: me } = useMe();

  const { cafeId } = useParams<cafeDetailParam>();
  const { loading, data } = useCafeDetail(+cafeId);

  const cafe = data?.cafeDetail.cafe;
  const keywords = cafe?.keywords;
  const user = me?.myProfile?.user;

  const isOwner = user && user.role === UserRole.Owner;

  const category: categoryProp[] = [
    { key: Category.Beverage, name: "음료", menu: [] },
    { key: Category.Dessert, name: "디저트", menu: [] },
    { key: Category.Bread, name: "빵", menu: [] },
    { key: Category.Meal, name: "식사", menu: [] },
    { key: Category.Goods, name: "상품", menu: [] },
    { key: Category.Etc, name: "기타", menu: [] },
  ];

  category.map(
    (category) =>
      (category.menu =
        cafe &&
        cafe.menus &&
        cafe.menus.filter(
          (menu: { category: string }) => menu.category === category.key,
        )),
  );

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
        <InfoBox>
          <ImageBox>
            <CoverImage src={cafe?.coverImg || ""} />
          </ImageBox>
          <Title>{cafe?.name}</Title>
          <OwnerInfo>
            <UserCircleDetail user={cafe?.owner} />
          </OwnerInfo>
        </InfoBox>
        <MidBox>
          <KeywordBox>
            <Keywords keywords={keywords} />
          </KeywordBox>
          <Description>{cafe?.description}</Description>
          <LikeUserList>
            <LikeUserTitle>
              소중한 손님들
              <HeartIcon icon={faHeart} />
              {cafe?.likedUsers?.length}분
            </LikeUserTitle>
            <Slider slideWidth={200}>
              {cafe?.likedUsers?.map((user) => (
                <LikeUser key={user.email}>
                  <UserCircle user={user} />
                </LikeUser>
              ))}
            </Slider>
          </LikeUserList>
        </MidBox>
        {isOwner && cafe?.owner.id === (user && user.id) && (
          <FlexBox>
            <CreateButton
              link={`/cafe/${cafe?.id}/create-menu`}
              text={"+ 메뉴 만들기"}
            />
            <CreateButton
              link={`/cafe/${cafe?.id}/edit`}
              text={"+ 카페 수정하기"}
            />
          </FlexBox>
        )}
        <ContentsBox>
          <MenuBox>
            {category.map(
              (category) =>
                category.menu &&
                category.menu?.length > 0 && (
                  <CategoryBox key={category.key}>
                    <CategoryTitle>{category.name}</CategoryTitle>
                    <MenuList>
                      {category.menu.map((menu) => (
                        <MenuItem>
                          <SLink to={`/cafe/${cafeId}/menu/${menu.id}`}>
                            <MenuImage
                              sizes={"100%"}
                              src={menu.menuImg || undefined}
                            />
                            <MenuName>{menu.name}</MenuName>
                          </SLink>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </CategoryBox>
                ),
            )}
          </MenuBox>
          <MapBox>{/* <KakaoMap address={cafe?.address} /> */}</MapBox>
          <ReviewBox>
            <ReviewList
              me={me}
              totalScore={cafe?.totalScore}
              avgScore={cafe?.avgScore}
              reviews={cafe?.reviews}
            />
            {me && !isOwner && <ReviewForm me={me} cafeId={+cafeId} />}
          </ReviewBox>
        </ContentsBox>
      </Container>
    </>
  );
};

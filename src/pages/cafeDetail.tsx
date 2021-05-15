import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CreateButton } from "../components/createBtn";
import { Keywords } from "../components/keywords";
import { ReviewForm } from "../components/reviewForm";
import { ReviewList } from "../components/reviewList";
import {
  Container,
  CoverImage,
  SLink,
  FlexBox,
  Image,
  MenuImage,
} from "../components/styledComponent";
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

const KeywordBox = styled.div``;

const Description = styled.p`
  padding: 0.5em 1.5em;
  font-size: small;
`;

const ContentsBox = styled.main`
  margin-top: 3em;
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

interface OwnerBoxProp {
  width: number;
}

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
  const [ownerNameWidth, setOwnerNameWidth] = useState<number>(0);
  const [ownerEmailWidth, setOwnerEmailWidth] = useState<number>(0);

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
        </InfoBox>
        <KeywordBox>
          <Keywords keywords={keywords} />
        </KeywordBox>
        <Description>{cafe?.description}</Description>
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
          <MapBox>map</MapBox>
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

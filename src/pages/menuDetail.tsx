import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import styled from "styled-components";
import { Nutrient } from "../components/nutrient";
import { Slider } from "../components/slider";
import { Container, MenuImage } from "../components/styledComponent";
import { siteName } from "../constants";
import { Category, UserRole } from "../__generated__/globalTypes";
import { useMenuDetail } from "../hooks/menuDetailQuery";
import { ReviewList } from "../components/reviewList";
import { ReviewForm } from "../components/reviewForm";
import { useMe } from "../hooks/useMe";
import { CreateButton } from "../components/createBtn";

const MenuContainer = styled.div`
  display: flex;
  padding: 5em;
  width: 100%;
  //height: 100%;
`;

const ImageBox = styled.div`
  width: 50%;
  height: 75vh;
  position: sticky;
  top: ${(prop) => prop.theme.headerHeight};
`;

const ContentsBox = styled.div`
  width: 50%;
  padding: 3em;
`;

const NameBox = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 1px solid ${(prop) => prop.theme.disableBgColor};
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const Box = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Name = styled.strong`
  font-size: x-large;
`;

const CategoryName = styled.small`
  font-size: small;
  margin-left: 5px;
  color: ${(prop) => prop.theme.disableColor};
`;

const Price = styled.span``;

const DescriptionBox = styled.div``;

const Description = styled.p`
  color: ${(prop) => prop.theme.disableColor};
  font-weight: 100;
`;

const OptionBox = styled.div`
  margin: 2em 0;
`;

const OptionTitle = styled.strong`
  font-size: large;
`;

const OptionList = styled.ul`
  margin: 1em 0;
`;

const OptionContentsBox = styled.div`
  padding: 0.8em;
  display: flex;
  justify-content: space-between;
`;

const OptionName = styled.span``;

const OptionPrice = styled.span`
  margin-left: 8px;
`;

const OptionItemBox = styled.div`
  top: 100%;
  left: 0;
  padding: 5px;
  margin-top: 3px;
  min-width: 100%;
  width: max-content;
  max-height: 100px;
  overflow-y: auto;
  border-radius: 0 0 3px 3px;
  border-top: 1px solid ${(prop) => prop.theme.keywordBgColor};
  background-color: ${(prop) => prop.theme.keywordColor};
  transition: all 0.5s ease;
`;

const OptionItem = styled.div`
  display: flex;
  justify-content: space-between;
  & + & {
    margin-top: 8px;
  }
`;

const Option = styled.li`
  position: relative;
  min-width: 120px;
  height: fit-content;
  border-radius: 3px;
  position: relative;
  color: ${(prop) => prop.theme.keywordBgColor};
  border: 1px solid ${(prop) => prop.theme.keywordBgColor};
  & + & {
    margin-left: 10px;
  }
`;

const NutrientBox = styled.div`
  margin: 2em 0;
`;

const EditBtn = styled.span`
  display: inline-block;
  margin-left: 10px;
  & a {
    margin: 0;
    padding: 5px;
  }
`;

interface MenuDetailParams {
  cafeId: string;
  menuId: string;
}

export const MenuDetail = () => {
  const { data: me } = useMe();
  const { cafeId, menuId } = useParams<MenuDetailParams>();
  const { loading, data } = useMenuDetail(+cafeId, +menuId);
  const [optionWidth, setOptionWidth] = useState<number>(0);

  const menu = data?.menuDetail.menu;
  const user = me?.myProfile?.user;

  const isOwner = user && user.role === UserRole.Owner;

  const getCategoryName = (category: string) => {
    switch (category) {
      case Category.Beverage:
        return "음료";
      case Category.Dessert:
        return "디저트";
      case Category.Bread:
        return "빵";
      case Category.Meal:
        return "식사";
      case Category.Goods:
        return "상품";
      case Category.Etc:
        return "기타";
      default:
        return "기타";
    }
  };

  console.log(menu);

  return loading ? (
    <h1>loading</h1>
  ) : (
    <>
      <Helmet>
        <title>
          {siteName} | {menu?.name}
        </title>
      </Helmet>
      <Container>
        <MenuContainer>
          <ImageBox>
            <MenuImage sizes={"100%"} src={menu?.menuImg || undefined} />
          </ImageBox>
          <ContentsBox>
            <NameBox>
              <Box>
                <Name>{menu?.name}</Name>
                <CategoryName>
                  {menu && getCategoryName(menu?.category)}
                </CategoryName>
                {isOwner && menu?.ownerId === (user && user.id) && (
                  <EditBtn>
                    <CreateButton
                      link={`/cafe/${cafeId}/menu/${menuId}/edit`}
                      text={"+ 메뉴 수정하기"}
                    />
                  </EditBtn>
                )}
                {isOwner && (
                  <EditBtn>
                    <CreateButton
                      link={`/cafe/${cafeId}/menu/${menuId}/edit`}
                      text={"+ 메뉴 수정하기"}
                    />
                  </EditBtn>
                )}
              </Box>
              <Price>{menu?.price} 원</Price>
            </NameBox>
            <DescriptionBox>
              <Description>{menu?.description}</Description>
            </DescriptionBox>
            {menu?.options && menu.options?.length > 0 && (
              <OptionBox>
                <OptionTitle>옵션</OptionTitle>
                <OptionList>
                  <Slider slideWidth={optionWidth}>
                    {menu?.options.map((option) => (
                      <Option
                        key={option.name}
                        ref={(ref) => ref && setOptionWidth(ref.offsetWidth)}
                      >
                        <OptionContentsBox>
                          <OptionName>{option.name}</OptionName>
                          <OptionPrice>
                            {option.price && option.price > 0
                              ? `+${option.price}원`
                              : option.optionItems &&
                                option.optionItems?.length > 0
                              ? "+"
                              : "-"}
                          </OptionPrice>
                        </OptionContentsBox>
                        {option.optionItems && option.optionItems?.length > 0 && (
                          <OptionItemBox>
                            {option.optionItems.map((item) => (
                              <OptionItem>
                                <OptionName>{item.name}</OptionName>
                                <OptionPrice>
                                  {item.price && item.price > 0
                                    ? `+${item.price}원`
                                    : "-"}
                                </OptionPrice>
                              </OptionItem>
                            ))}
                          </OptionItemBox>
                        )}
                      </Option>
                    ))}
                  </Slider>
                </OptionList>
              </OptionBox>
            )}
            {menu && menu.nutrient && (
              <NutrientBox>
                <Nutrient nutrient={menu.nutrient} />
              </NutrientBox>
            )}
            <ReviewList
              me={me}
              totalScore={menu?.totalScore}
              avgScore={menu?.avgScore}
              reviews={menu?.reviews}
            />
            {me && !isOwner && (
              <ReviewForm me={me} cafeId={+cafeId} menuId={+menuId} />
            )}
          </ContentsBox>
        </MenuContainer>
      </Container>
    </>
  );
};

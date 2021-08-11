import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useParams } from "react-router";
import { Nutrient } from "../../components/nutrient";
import { Slider } from "../../components/slider";
import { Container, MenuImage } from "../../components/styledComponent";
import { siteName } from "../../commonConstants";
import { Category, UserRole } from "../../__generated__/globalTypes";
import { useMenuDetail } from "../../hooks/menuDetailQuery";
import { ReviewList } from "../../components/reviewList";
import { ReviewForm } from "../../components/reviewForm";
import { CreateButton } from "../../components/createBtn";
import gql from "graphql-tag";
import { useApolloClient, useMutation } from "@apollo/client";
import {
  deleteMenuMutation,
  deleteMenuMutationVariables,
} from "../../__generated__/deleteMenuMutation";
import { cafeDetailQuery_cafeDetail_cafe_menus } from "../../__generated__/cafeDetailQuery";
import { DeleteButton } from "../../components/deleteBtn";
import { CAFE_DETAIL_QUERY } from "../../hooks/cafeDetailQuery";
import { Loading } from "../../components/loading";
import {
  MenuContainer,
  ImageBox,
  ContentsBox,
  NameBox,
  Box,
  Name,
  CategoryName,
  EditBtn,
  DeleteBtn,
  Price,
  MenuInfoBox,
  Description,
  Option,
  OptionBox,
  OptionTitle,
  OptionList,
  OptionContentsBox,
  OptionName,
  OptionPrice,
  OptionItemBox,
  OptionItem,
  NutrientBox,
  BtnBox,
} from "./styled";
import { getCategoryName } from "./common";
import { useAppSelector } from "app/hooks";

const DELETE_MENU_MUTATION = gql`
  mutation deleteMenuMutation($input: DeleteMenuInput!) {
    deleteMenu(input: $input) {
      ok
      error
    }
  }
`;

interface MenuDetailParams {
  cafeId: string;
  menuId: string;
}

export const MenuDetail = () => {
  const user = useAppSelector((state) => state.loggedInUser.value);
  const history = useHistory();
  const client = useApolloClient();

  const { cafeId, menuId } = useParams<MenuDetailParams>();
  const { loading, data } = useMenuDetail(+cafeId, +menuId);
  const [optionWidth, setOptionWidth] = useState<number>(0);

  const menu = data?.menuDetail.menu;

  const isOwner = user && user.role === UserRole.Owner;

  const onCompleted = (data: deleteMenuMutation) => {
    const {
      deleteMenu: { ok, error },
    } = data;
    if (ok) {
      const {
        cafeDetail: { cafe },
      } = client.readQuery({
        query: CAFE_DETAIL_QUERY,
        variables: { input: { id: +cafeId } },
      });
      const menus = cafe.menus.filter(
        (menu: cafeDetailQuery_cafeDetail_cafe_menus) => menu.id !== +menuId,
      );
      client.writeQuery({
        query: CAFE_DETAIL_QUERY,
        data: {
          cafeDetail: {
            error,
            ok,
            cafe: {
              ...cafe,
              menus,
            },
            __typename: "CafeDetailOutput",
          },
          variables: { input: { cafeId: +cafeId } },
        },
      });
      history.push(`/cafe/${cafeId}`);
    } else {
      alert(error);
    }
  };

  const [deleteMenuMutation, { loading: deleteLoading }] = useMutation<
    deleteMenuMutation,
    deleteMenuMutationVariables
  >(DELETE_MENU_MUTATION, { onCompleted });

  const deleteMenu = () => {
    const ok = window.confirm(`${menu?.name} 메뉴를 삭제하시겠습니까?`);
    if (ok && !deleteLoading) {
      deleteMenuMutation({
        variables: { input: { cafeId: +cafeId, menuId: +menuId } },
      });
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title>{`${siteName} | ${menu?.name}`}</title>
      </Helmet>
      <Container>
        <MenuContainer>
          <ImageBox>
            <MenuImage
              sizes={"100%"}
              src={menu?.originalMenuImg || undefined}
            />
          </ImageBox>
          <ContentsBox>
            <NameBox>
              <Box>
                <Name>{menu?.name}</Name>
                <CategoryName>
                  {menu && getCategoryName(menu?.category)}
                </CategoryName>
              </Box>
            </NameBox>
            <MenuInfoBox>
              <Description>{menu?.description}</Description>
              <Price>{menu?.price} 원</Price>
            </MenuInfoBox>
            {isOwner && menu?.ownerId === (user && user.id) && (
              <BtnBox>
                <EditBtn>
                  <CreateButton
                    link={`/cafe/${cafeId}/menu/${menuId}/edit`}
                    text={"+ 수정하기"}
                  />
                </EditBtn>
                <DeleteBtn>
                  <DeleteButton onClick={deleteMenu} text={"- 삭제하기"} />
                </DeleteBtn>
              </BtnBox>
            )}
            {menu?.options && menu.options?.length > 0 && (
              <OptionBox>
                <OptionTitle>옵션</OptionTitle>
                <OptionList>
                  <Slider slideWidth={optionWidth}>
                    {menu?.options.map(
                      (option: {
                        name: string | null | undefined;
                        price?: number | null | undefined;
                        optionItems?: any[] | null;
                      }) => (
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
                          {option.optionItems &&
                            option.optionItems?.length > 0 && (
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
                      ),
                    )}
                  </Slider>
                </OptionList>
              </OptionBox>
            )}
            {menu &&
              menu.nutrient &&
              menu.category !== Category.Goods &&
              menu.category !== Category.Etc && (
                <NutrientBox>
                  <Nutrient nutrient={menu.nutrient} />
                </NutrientBox>
              )}
            <ReviewList
              totalScore={menu?.totalScore}
              avgScore={menu?.avgScore}
              reviews={menu?.reviews}
            />
            {user && !isOwner && (
              <ReviewForm cafeId={+cafeId} menuId={+menuId} />
            )}
          </ContentsBox>
        </MenuContainer>
      </Container>
    </>
  );
};

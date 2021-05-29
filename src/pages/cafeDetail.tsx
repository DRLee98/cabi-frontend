import { useApolloClient, useMutation } from "@apollo/client";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useParams } from "react-router";
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
import { CAFE_DETAIL_QUERY, useCafeDetail } from "../hooks/cafeDetailQuery";
import {
  cafeDetailQuery_cafeDetail_cafe_menus,
  cafeDetailQuery_cafeDetail_cafe_likedUsers,
} from "../__generated__/cafeDetailQuery";
import { Category, UserRole } from "../__generated__/globalTypes";
import { myProfileQuery } from "../__generated__/myProfileQuery";
import { MY_CAFES_QUERY } from "./owner/myCafes";
import { myCafesQuery_myCafes_cafes } from "../__generated__/myCafesQuery";
import { DeleteButton } from "../components/deleteBtn";
import {
  deleteCafeMutation,
  deleteCafeMutationVariables,
} from "../__generated__/deleteCafeMutation";
import { likeCafeId } from "../hooks/useMe";
import {
  toggleLikeCafeMutation,
  toggleLikeCafeMutationVariables,
} from "../__generated__/toggleLikeCafeMutation";

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

const LikeUserBox = styled.div`
  display: flex;
`;

const HeartIcon = styled(FontAwesomeIcon)`
  margin-left: 8px;
  margin-right: 4px;
  font-size: 15px;
  color: red;
`;

const LikeUser = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToggleLikeBtn = styled.button<ToggleLikeBtnProp>`
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

const DELETE_CAFE_MUTATION = gql`
  mutation deleteCafeMutation($input: DeleteCafeInput!) {
    deleteCafe(input: $input) {
      ok
      error
    }
  }
`;

const TOGGLE_LIKE_CAFE_MUTATION = gql`
  mutation toggleLikeCafeMutation($input: ToggleLikeCafeInput!) {
    toggleLikeCafe(input: $input) {
      ok
      error
    }
  }
`;

interface ToggleLikeBtnProp {
  like: boolean;
}

interface cafeDetailParam {
  cafeId: string;
}

interface categoryProp {
  key: string;
  name: string;
  menu: cafeDetailQuery_cafeDetail_cafe_menus[] | null | undefined;
}

interface CafeDetailProp {
  me?: myProfileQuery;
}

export const CafeDetail: React.FC<CafeDetailProp> = ({ me }) => {
  const history = useHistory();
  const client = useApolloClient();

  const { cafeId } = useParams<cafeDetailParam>();
  const { loading, data } = useCafeDetail(+cafeId);

  const cafe = data?.cafeDetail.cafe;
  const keywords = cafe?.keywords;

  const user = me?.myProfile.user;
  const isOwner = user && user.role === UserRole.Owner;

  let isLike = false;
  if (cafe && cafe.likedUsers) {
    isLike =
      cafe.likedUsers.filter(
        (likeUser: cafeDetailQuery_cafeDetail_cafe_likedUsers) =>
          user && likeUser.id === user.id,
      ).length > 0;
  }
  const [toggleLike, setToggleLike] = useState<boolean>(isLike);

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

  const onCompleted = (data: deleteCafeMutation) => {
    const {
      deleteCafe: { ok, error },
    } = data;
    if (ok) {
      const {
        myCafes: { cafes: originCafes },
      } = client.readQuery({
        query: MY_CAFES_QUERY,
      });
      const cafes = originCafes.filter(
        (cafe: myCafesQuery_myCafes_cafes) => cafe.id !== +cafeId,
      );
      client.writeQuery({
        query: MY_CAFES_QUERY,
        data: {
          myCafes: {
            error,
            ok,
            cafes,
            __typename: "SeeCafeOutput",
          },
        },
      });
      history.push("/");
    } else {
      alert(error);
    }
  };

  const [deleteCafeMutation, { loading: deleteLoading }] = useMutation<
    deleteCafeMutation,
    deleteCafeMutationVariables
  >(DELETE_CAFE_MUTATION, { onCompleted });

  const deleteCafe = () => {
    const ok = window.confirm(`${cafe?.name} 카페를 삭제하시겠습니까?`);
    if (ok) {
      deleteCafeMutation({
        variables: { input: { id: +cafeId } },
      });
    }
  };

  const toggleCompleted = (data: toggleLikeCafeMutation) => {
    const {
      toggleLikeCafe: { ok, error },
    } = data;
    if (ok) {
      const {
        cafeDetail: { cafe },
      } = client.readQuery({
        query: CAFE_DETAIL_QUERY,
        variables: { input: { id: +cafeId } },
      });
      let likedUsers;
      if (!toggleLike) {
        likedUsers = [...cafe.likedUsers, user];
      } else {
        likedUsers = cafe.likedUsers.filter(
          (likeUser: cafeDetailQuery_cafeDetail_cafe_likedUsers) =>
            user && likeUser.id !== user.id,
        );
      }
      console.log(likedUsers);
      client.writeQuery({
        query: CAFE_DETAIL_QUERY,
        data: {
          cafeDetail: {
            error,
            ok,
            cafe: {
              ...cafe,
              likedUsers,
            },
          },
          __typename: "Cafe",
        },
        variables: { input: { id: +cafeId } },
      });
      setToggleLike((prev) => !prev);
    }
  };

  const [toggleLikeCafeMutation, { loading: toggleLoading }] = useMutation<
    toggleLikeCafeMutation,
    toggleLikeCafeMutationVariables
  >(TOGGLE_LIKE_CAFE_MUTATION, { onCompleted: toggleCompleted });

  const toggleLikeCafe = () => {
    if (!toggleLoading) {
      toggleLikeCafeMutation({
        variables: { input: { cafeId: +cafeId } },
      });
    }
  };

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
            <CoverImage src={cafe?.originalCoverImg || ""} />
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
              우리 가게 단골 손님
              <HeartIcon icon={faHeart} />
              {cafe?.likedUsers?.length}분
            </LikeUserTitle>
            <LikeUserBox>
              <Slider slideWidth={200}>
                {cafe?.likedUsers?.map((user) => (
                  <LikeUser key={user.email}>
                    <UserCircle user={user} />
                  </LikeUser>
                ))}
              </Slider>
              {user && user?.role === UserRole.Client && (
                <ToggleLikeBtn like={toggleLike} onClick={toggleLikeCafe}>
                  <HeartIcon icon={faHeart} />
                </ToggleLikeBtn>
              )}
            </LikeUserBox>
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
            <DeleteButton onClick={deleteCafe} text={"- 카페 삭제하기"} />
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
                              src={menu.smallMenuImg || undefined}
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

import {
  ApolloCache,
  FetchResult,
  useApolloClient,
  useMutation,
} from "@apollo/client";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useParams } from "react-router";
import { KakaoMap } from "../../api/kakaoMap";
import { CreateButton } from "../../components/createBtn";
import { Keywords } from "../../components/keywords";
import { ReviewForm } from "../../components/reviewForm";
import { ReviewList } from "../../components/reviewList";
import { Slider } from "../../components/slider";
import {
  Container,
  CoverImage,
  SLink,
  MenuImage,
} from "../../components/styledComponent";
import { UserCircleDetail, UserCircle } from "../../components/userCircleBox";
import {
  defaultCoverImg,
  defaultMenuImg,
  siteName,
} from "../../commonConstants";
import { useCafeDetail } from "../../hooks/cafeDetailQuery";
import { cafeDetailQuery_cafeDetail_cafe_likedUsers } from "../../__generated__/cafeDetailQuery";
import { UserRole } from "../../__generated__/globalTypes";
import { MY_CAFES_QUERY } from "../owner/myCafes";
import { myCafesQuery_myCafes_cafes } from "../../__generated__/myCafesQuery";
import { DeleteButton } from "../../components/deleteBtn";
import {
  deleteCafeMutation,
  deleteCafeMutationVariables,
} from "../../__generated__/deleteCafeMutation";
import {
  toggleLikeCafeMutation,
  toggleLikeCafeMutationVariables,
} from "../../__generated__/toggleLikeCafeMutation";
import { Loading } from "../../components/loading";
import {
  Title,
  InfoBox,
  ImageBox,
  OwnerInfo,
  MidBox,
  KeywordBox,
  Description,
  LikeUserList,
  LikeUserTitle,
  HeartIcon,
  LikeUserBox,
  LikeUser,
  ToggleLikeBtn,
  ContentsBox,
  MenuBox,
  CategoryBox,
  CategoryTitle,
  MenuList,
  MenuItem,
  MenuInfo,
  MenuName,
  MenuPrice,
  MapBox,
  ReviewBox,
  OwnerBtns,
} from "./styled";
import { filterCategory, getIsLike } from "./common";
import { SimpleUserFragment } from "../../__generated__/SimpleUserFragment";
import { useAppSelector } from "app/hooks";

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

interface cafeDetailParam {
  cafeId: string;
}

export const CafeDetail = () => {
  const user = useAppSelector((state) => state.loggedInUser.value);
  const history = useHistory();
  const client = useApolloClient();

  const { cafeId } = useParams<cafeDetailParam>();
  const { loading, data } = useCafeDetail(+cafeId);

  const cafe = data?.cafeDetail.cafe;
  const keywords = cafe?.keywords;

  const isOwner = user && user.role === UserRole.Owner;

  const isLike = getIsLike(cafe, user);

  const [toggleLike, setToggleLike] = useState<boolean>(isLike);

  const category = filterCategory(cafe);

  const onCompleted = (data: deleteCafeMutation) => {
    const {
      deleteCafe: { ok, error },
    } = data;
    if (ok) {
      const { myCafes: originalData } = client.readQuery({
        query: MY_CAFES_QUERY,
      });
      const originCafes = originalData.myCafes;
      const myCafes = originCafes.filter(
        (cafe: myCafesQuery_myCafes_cafes) => cafe.id !== +cafeId,
      );
      client.writeQuery({
        query: MY_CAFES_QUERY,
        data: {
          myCafes: {
            ...originalData,
            error,
            ok,
            myCafes,
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
    if (ok && !deleteLoading) {
      deleteCafeMutation({
        variables: { input: { id: +cafeId } },
      });
    }
  };

  const updateToggleLike = (
    cache: ApolloCache<toggleLikeCafeMutation>,
    result: FetchResult<toggleLikeCafeMutation>,
  ) => {
    if (result.data?.toggleLikeCafe.ok) {
      cache.modify({
        id: `Cafe:${cafeId}`,
        fields: {
          likedUsers(prev: [cafeDetailQuery_cafeDetail_cafe_likedUsers]) {
            if (!toggleLike) {
              setToggleLike(true);
              return [...prev, user];
            } else {
              setToggleLike(false);
              return (
                prev &&
                prev.filter(
                  (likeUser: cafeDetailQuery_cafeDetail_cafe_likedUsers) =>
                    user && likeUser.id !== user.id,
                )
              );
            }
          },
        },
      });
    }
  };

  const [toggleLikeCafeMutation, { loading: toggleLoading }] = useMutation<
    toggleLikeCafeMutation,
    toggleLikeCafeMutationVariables
  >(TOGGLE_LIKE_CAFE_MUTATION, { update: updateToggleLike });

  const toggleLikeCafe = () => {
    if (!toggleLoading) {
      toggleLikeCafeMutation({
        variables: { input: { cafeId: +cafeId } },
      });
    }
  };

  useEffect(() => {
    setToggleLike(isLike);
  }, [isLike]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title>{`${siteName} | ${cafe?.name}`}</title>
      </Helmet>
      <Container>
        <InfoBox>
          <ImageBox>
            <CoverImage src={cafe?.originalCoverImg || defaultCoverImg} />
          </ImageBox>
          <Title>{cafe?.name}</Title>
          <OwnerInfo>
            <UserCircleDetail user={cafe && cafe?.owner} me={user} />
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
                {cafe?.likedUsers?.map((writer: SimpleUserFragment) => (
                  <LikeUser key={writer.email}>
                    <UserCircle user={writer} me={user} />
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
          <OwnerBtns>
            <CreateButton
              link={`/cafe/${cafe?.id}/create-menu`}
              text={"+ 메뉴 만들기"}
            />
            <CreateButton
              link={`/cafe/${cafe?.id}/edit`}
              text={"+ 카페 수정하기"}
            />
            <DeleteButton onClick={deleteCafe} text={"- 카페 삭제하기"} />
          </OwnerBtns>
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
                        <MenuItem key={menu.smallMenuImg}>
                          <SLink to={`/cafe/${cafeId}/menu/${menu.id}`}>
                            <MenuImage
                              sizes={"100%"}
                              src={menu.smallMenuImg || defaultMenuImg}
                            />
                            <MenuInfo>
                              <MenuName>{menu.name}</MenuName>
                              <MenuPrice>{menu.price}원</MenuPrice>
                            </MenuInfo>
                          </SLink>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </CategoryBox>
                ),
            )}
          </MenuBox>
          <MapBox>
            <KakaoMap address={cafe?.address} />
          </MapBox>
          <ReviewBox>
            <ReviewList
              totalScore={cafe?.totalScore}
              avgScore={cafe?.avgScore}
              reviews={cafe?.reviews}
            />
            {user && !isOwner && <ReviewForm cafeId={+cafeId} />}
          </ReviewBox>
        </ContentsBox>
      </Container>
    </>
  );
};

import { useApolloClient, useMutation } from "@apollo/client";
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
  FlexBox,
  MenuImage,
} from "../../components/styledComponent";
import { UserCircleDetail, UserCircle } from "../../components/userCircleBox";
import { siteName } from "../../constants";
import { CAFE_DETAIL_QUERY, useCafeDetail } from "../../hooks/cafeDetailQuery";
import { cafeDetailQuery_cafeDetail_cafe_likedUsers } from "../../__generated__/cafeDetailQuery";
import { UserRole } from "../../__generated__/globalTypes";
import { myProfileQuery } from "../../__generated__/myProfileQuery";
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
  MenuName,
  MapBox,
  ReviewBox,
} from "./styled";
import { filterCategory, getIsLike } from "./common";
import { SimpleUserFragment } from "../../__generated__/SimpleUserFragment";

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
            <CoverImage src={cafe?.originalCoverImg || ""} />
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
                        <MenuItem key={menu.smallMenuImg}>
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

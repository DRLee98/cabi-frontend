import { useApolloClient, useMutation } from "@apollo/client";
import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "./Button";
import {
  createCafeReviewMutation,
  createCafeReviewMutationVariables,
} from "../__generated__/createCafeReviewMutation";
import {
  createMenuReviewMutation,
  createMenuReviewMutationVariables,
} from "../__generated__/createMenuReviewMutation";
import { CAFE_DETAIL_QUERY } from "../hooks/cafeDetailQuery";
import { MENU_DETAIL_QUERY } from "../hooks/menuDetailQuery";
import { useAppSelector } from "app/hooks";

const ReviewFormBtn = styled.button<ReviewFormViewProp>`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) ${(prop) => prop.show && "translateY(100%)"};
  padding: 0.8em 1em;
  background-color: ${(prop) => prop.theme.signaturelightBgColor};
  border-radius: 10px 10px 0 0;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const ReviewFormBox = styled.div<ReviewFormViewProp>`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) ${(prop) => !prop.show && "translateY(100%)"};
  width: 50%;
  min-width: 400px;
  max-width: 800px;
  padding: 1em;
  background-color: ${(prop) => prop.theme.signaturelightBgColor};
  border-radius: 10px 10px 0 0;
  transition: all 0.5s ease;
  z-index: 10;
`;

const TitleBox = styled.div`
  margin-bottom: 1em;
  font-size: 15px;
  text-align: center;
  position: relative;
`;

const Title = styled.strong``;

const CloseBtn = styled(FontAwesomeIcon)`
  position: absolute;
  right: 0;
  border-radius: 999px;
  &:hover {
    color: red;
  }
  cursor: pointer;
`;

const ContentsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.8em;
`;

const BtnBox = styled.div``;

const RatingBox = styled.div`
  display: flex;
  margin-left: 1em;
`;

const Form = styled.form``;

const Input = styled.input`
  width: 100%;
  padding: 0.8em;
  border-radius: 10px;
  background-color: ${(prop) => prop.theme.whiteColor};
`;

const Icon = styled(FontAwesomeIcon)<IconProp>`
  font-size: 20px;
  color: ${(prop) =>
    prop.selected ? prop.theme.starYellow : prop.theme.disableColor};
`;

const CREATE_CAFE_REVIEW_MUTATION = gql`
  mutation createCafeReviewMutation($input: CreateCafeReviewInput!) {
    createCafeReview(input: $input) {
      ok
      error
      reviewId
    }
  }
`;

const CREATE_MENU_REVIEW_MUTATION = gql`
  mutation createMenuReviewMutation($input: CreateMenuReviewInput!) {
    createMenuReview(input: $input) {
      ok
      error
      reviewId
    }
  }
`;

interface ReviewFormViewProp {
  show: boolean;
}

interface IconProp {
  selected: boolean;
}

interface ReviewFormProp {
  cafeId: number;
  menuId?: number;
}

interface FormProp {
  contents: string;
}

export const ReviewForm: React.FC<ReviewFormProp> = ({ cafeId, menuId }) => {
  const user = useAppSelector((state) => state.loggedInUser.value);
  const { register, handleSubmit, getValues, formState } = useForm<FormProp>({
    mode: "onChange",
  });
  const client = useApolloClient();

  const ratingArray = [1, 2, 3, 4, 5];
  const [ratingValue, setRatingValue] = useState(3);
  const [showForm, setShowForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>();

  const cafeReviewOnCompleted = (data: createCafeReviewMutation) => {
    const {
      createCafeReview: { ok, error, reviewId },
    } = data;
    if (ok) {
      const { contents } = getValues();
      const newReview = {
        contents,
        id: reviewId,
        rating: {
          score: ratingValue,
          __typename: "Rating",
        },
        writer: user,
        __typename: "Review",
      };
      const {
        cafeDetail: { cafe },
      } = client.readQuery({
        query: CAFE_DETAIL_QUERY,
        variables: { input: { id: cafeId } },
      });
      client.writeQuery({
        query: CAFE_DETAIL_QUERY,
        data: {
          cafeDetail: {
            error,
            ok,
            cafe: {
              ...cafe,
              reviews: [newReview, ...cafe.reviews],
            },
          },
          __typename: "Cafe",
        },
        variables: { input: { id: +cafeId } },
      });
      setShowForm(false);
    } else {
      setErrorMsg(error);
      setTimeout(() => setErrorMsg(null), 2000);
    }
  };

  const menuReviewOnCompleted = (data: createMenuReviewMutation) => {
    const {
      createMenuReview: { ok, error, reviewId },
    } = data;
    if (ok) {
      const { contents } = getValues();
      const newReview = {
        contents,
        id: reviewId,
        rating: {
          score: ratingValue,
          __typename: "Rating",
        },
        writer: user,
        __typename: "Review",
      };
      const {
        menuDetail: { menu },
      } = client.readQuery({
        query: MENU_DETAIL_QUERY,
        variables: { input: { cafeId, menuId } },
      });
      client.writeQuery({
        query: MENU_DETAIL_QUERY,
        data: {
          menuDetail: {
            error,
            ok,
            menu: {
              ...menu,
              reviews: [newReview, ...(menu.reviews && [menu.reviews])],
            },
          },
          __typename: "Menu",
        },
        variables: { input: { cafeId, menuId } },
      });
      setShowForm(false);
    } else {
      setErrorMsg(error);
      setTimeout(() => setErrorMsg(null), 2000);
    }
  };

  const [createCafeReviewMutation, { loading: cafeReviewLoading }] =
    useMutation<createCafeReviewMutation, createCafeReviewMutationVariables>(
      CREATE_CAFE_REVIEW_MUTATION,
      { onCompleted: cafeReviewOnCompleted },
    );

  const [createMenuReviewMutation, { loading: menuReviewLoading }] =
    useMutation<createMenuReviewMutation, createMenuReviewMutationVariables>(
      CREATE_MENU_REVIEW_MUTATION,
      { onCompleted: menuReviewOnCompleted },
    );

  const onSubmit = async () => {
    const { contents } = getValues();
    if (menuId) {
      if (!menuReviewLoading) {
        createMenuReviewMutation({
          variables: {
            input: {
              contents,
              score: ratingValue,
              cafeId,
              menuId,
            },
          },
        });
      }
    } else {
      if (!cafeReviewLoading) {
        createCafeReviewMutation({
          variables: {
            input: {
              contents,
              score: ratingValue,
              cafeId,
            },
          },
        });
      }
    }
  };

  const title = menuId ? "메뉴 리뷰 작성하기" : "카페 리뷰 작성하기";

  return (
    <>
      <ReviewFormBtn show={showForm} onClick={() => setShowForm(true)}>
        {title}
      </ReviewFormBtn>
      <ReviewFormBox show={showForm}>
        <TitleBox>
          <Title>{title}</Title>
          <CloseBtn
            icon={faTimes}
            onClick={() => setShowForm(false)}
          ></CloseBtn>
        </TitleBox>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ContentsBox>
            <Input
              ref={register({
                required: "내용은 필수 항목입니다",
              })}
              name={"contents"}
              placeholder="내용을 입력해 주세요"
            />
            <RatingBox>
              {ratingArray.map((rating) => (
                <Icon
                  key={rating}
                  icon={faStar}
                  onClick={() => setRatingValue(rating)}
                  selected={rating <= ratingValue}
                ></Icon>
              ))}
            </RatingBox>
          </ContentsBox>
          <BtnBox>
            <Button
              loading={menuId ? menuReviewLoading : cafeReviewLoading}
              valid={formState.isValid}
              text={"리뷰 작성하기"}
              error={errorMsg}
            ></Button>
          </BtnBox>
        </Form>
      </ReviewFormBox>
    </>
  );
};

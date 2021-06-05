import { useApolloClient, useMutation } from "@apollo/client";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ReviewFragment } from "../__generated__/ReviewFragment";
import {
  createReplyMutation,
  createReplyMutationVariables,
} from "../__generated__/createReplyMutation";
import { myProfileQuery } from "../__generated__/myProfileQuery";
import { Image } from "../components/styledComponent";
import { REVIEW_FRAGMENT } from "../fragments";
import { Link } from "react-router-dom";

const ReviewListBox = styled.div`
  padding-bottom: 3em;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5em;
  border-bottom: 1px solid ${(prop) => prop.theme.disableBgColor};
`;

const Title = styled.strong`
  font-size: 15px;
`;

const ReviewCount = styled.small`
  font-size: 12px;
`;

const IconBox = styled.div`
  font-size: 10px;
  color: ${(prop) => prop.theme.disableColor};
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: ${(prop) => (prop.fontSize ? prop.fontSize : "25px")};
  margin-right: 0.3em;
  color: ${(prop) => prop.theme.starYellow};
`;

const Score = styled.span`
  font-size: 15px;
  color: ${(prop) => prop.theme.blackColor};
`;

const List = styled.ul`
  margin-top: 2em;
`;

const Review = styled.li`
  & + & {
    margin-top: 1.5em;
  }
`;

const ReviewBox = styled.div`
  display: flex;
  position: relative;
`;

const ImageBox = styled.div<ImageBoxProp>`
  width: ${(prop) => (prop.size ? prop.size : "3.5em")};
  height: ${(prop) => (prop.size ? prop.size : "3.5em")};
  min-width: ${(prop) => (prop.size ? prop.size : "3.5em")};
`;

const ContentsBox = styled.div`
  margin-left: 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const WriterName = styled.h4`
  display: flex;
  font-size: 12px;
  color: ${(prop) => prop.theme.blackColor};
`;

const Contents = styled.p`
  margin: 0.2em 0;
`;

const CreateDate = styled.small`
  font-size: 8px;
  color: ${(prop) => prop.theme.disableColor};
`;

const ReplyBtn = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 12px;
  padding: 0.2em;
  border-radius: 3px;
  background-color: ${(prop) => prop.theme.signaturelightBgColor};
  color: ${(prop) => prop.theme.signatureColor};
  cursor: pointer;
`;

const ViewReplyBtn = styled.button`
  margin-top: 1em;
  font-size: 12px;
  color: ${(prop) => prop.theme.keywordBgColor};
  cursor: pointer;
`;

const ReplyBox = styled.div`
  margin-left: 3.5em;
`;

const ReplyList = styled.ul`
  margin-top: 1.5em;
`;

const Reply = styled.li`
  display: flex;
  & + & {
    margin-top: 1.5em;
  }
`;

const ReplyForm = styled.form`
  display: flex;
  align-items: flex-end;
  margin-top: 0.5em;
`;

const ReplyInput = styled.input`
  margin: 0 0.5em;
  font-size: 14px;
  width: 100%;
  border-bottom: 1px solid ${(prop) => prop.theme.disableBgColor};
`;

const ReplyFormBtn = styled.button<ReplyFormBtnProp>`
  font-size: 13px;
  min-width: fit-content;
  padding: 0.34em;
  background-color: ${(prop) =>
    prop.valid ? prop.theme.keywordColor : prop.theme.disableBgColor};
  color: ${(prop) =>
    prop.valid ? prop.theme.keywordBgColor : prop.theme.disableColor};
  &:hover {
    background-color: ${(prop) =>
      prop.valid ? prop.theme.keywordBgColor : prop.theme.disableBgColor};
    color: ${(prop) =>
      prop.valid ? prop.theme.keywordColor : prop.theme.disableColor};
  }
  transition: all 0.2s ease;
  cursor: pointer;
`;

const CREATE_REPLY_MUTATION = gql`
  mutation createReplyMutation($input: CreateReplyInput!) {
    createReply(input: $input) {
      ok
      error
    }
  }
`;

interface ImageBoxProp {
  size?: string | number;
}

interface ReplyFormProp {
  contents: string;
}

interface ReplyFormBtnProp {
  valid: boolean;
}

interface ReviewListProp {
  me?: myProfileQuery;
  totalScore?: number;
  avgScore?: number;
  reviews?: ReviewFragment[] | null | undefined;
}

export const ReviewList: React.FC<ReviewListProp> = ({
  me,
  totalScore,
  avgScore,
  reviews,
}) => {
  const { register, handleSubmit, getValues, formState } =
    useForm<ReplyFormProp>({ mode: "onChange" });
  const client = useApolloClient();
  const [reviewId, setReviewId] = useState<number>(-1);
  const [viewReply, setViewReply] = useState<number[]>([]);

  const user = me?.myProfile.user;

  const toggleViewReply = (id: number) => {
    if (viewReply.includes(id)) {
      const viewList = viewReply.filter((reviewId) => reviewId !== id);
      setViewReply(viewList);
    } else {
      setViewReply([...viewReply, id]);
    }
  };

  const onCompleted = (data: createReplyMutation) => {
    const {
      createReply: { ok, error },
    } = data;
    if (ok) {
      const { contents } = getValues();
      const newReply = {
        contents,
        writer: me,
        __typename: "Reply",
      };
      const review = client.readFragment({
        id: `Review:${reviewId}`,
        fragment: REVIEW_FRAGMENT,
        fragmentName: "ReviewFragment",
      });
      client.writeFragment({
        id: `Review:${reviewId}`,
        fragment: REVIEW_FRAGMENT,
        fragmentName: "ReviewFragment",
        data: {
          reply: [...review.reply, newReply],
        },
      });
    } else {
      alert(error);
    }
  };

  const [createReplyMutation, { loading }] = useMutation<
    createReplyMutation,
    createReplyMutationVariables
  >(CREATE_REPLY_MUTATION, { onCompleted });

  const onSubmit = async () => {
    if (!loading && reviewId > 0) {
      const { contents } = getValues();
      createReplyMutation({
        variables: {
          input: {
            contents,
            reviewId,
          },
        },
      });
    }
  };

  return (
    <ReviewListBox>
      <TitleBox>
        <Title>
          리뷰<ReviewCount>({reviews ? reviews?.length : 0}개)</ReviewCount>
        </Title>
        <IconBox>
          <Icon icon={faStar}></Icon>
          별점 합계 : <Score>{totalScore || 0}</Score> / 별점 평균 :{" "}
          <Score>{avgScore || 0}</Score>
        </IconBox>
      </TitleBox>
      <List>
        {reviews?.map((review) => (
          <Review key={review.id}>
            <ReviewBox>
              <ImageBox>
                <Link to={`/profile/${review.writer.id}`}>
                  <Image
                    src={review.writer.smallProfileImg || ""}
                    sizes={"100%"}
                  />
                </Link>
              </ImageBox>
              <ContentsBox>
                <WriterName>
                  {review.writer.name}
                  <IconBox>
                    {[...Array(review.rating?.score)].map((item, i) => (
                      <Icon
                        key={i + "" + new Date()}
                        icon={faStar}
                        fontSize={"10px"}
                      ></Icon>
                    ))}
                  </IconBox>
                </WriterName>
                <Contents>{review.contents}</Contents>
                <CreateDate>
                  {new Date(Date.parse(review.createdAt)).toLocaleString()}
                </CreateDate>
                {me && (
                  <ReplyBtn
                    onClick={() =>
                      reviewId && reviewId === review.id
                        ? setReviewId(-1)
                        : setReviewId(review.id)
                    }
                  >
                    답글
                  </ReplyBtn>
                )}
              </ContentsBox>
            </ReviewBox>
            <ReplyBox>
              {me && reviewId === review.id && (
                <ReplyForm onSubmit={handleSubmit(onSubmit)}>
                  <ImageBox size={"2em"}>
                    <Image src={user?.smallProfileImg || ""} sizes={"100%"} />
                  </ImageBox>
                  <ReplyInput
                    ref={register({
                      required: "내용은 필수 항목입니다",
                    })}
                    name={"contents"}
                    placeholder={"내용을 입력해 주세요."}
                  ></ReplyInput>
                  <ReplyFormBtn valid={formState.isValid}>작성</ReplyFormBtn>
                </ReplyForm>
              )}
              {review?.reply && review?.reply.length > 0 && (
                <>
                  <ViewReplyBtn onClick={() => toggleViewReply(review.id)}>
                    {viewReply.includes(review.id)
                      ? "답글 숨기기"
                      : "답글 보기"}
                  </ViewReplyBtn>
                  {viewReply.includes(review.id) && (
                    <ReplyList>
                      {review.reply.map((reply) => (
                        <Reply key={reply.id}>
                          <ImageBox size={"2em"}>
                            <Image
                              src={reply.writer.smallProfileImg || ""}
                              sizes={"100%"}
                            />
                          </ImageBox>
                          <ContentsBox>
                            <WriterName>{reply.writer.name}</WriterName>
                            <Contents>{reply.contents}</Contents>
                            <CreateDate>
                              {new Date(
                                Date.parse(reply.createdAt),
                              ).toLocaleString()}
                            </CreateDate>
                          </ContentsBox>
                        </Reply>
                      ))}
                    </ReplyList>
                  )}
                </>
              )}
            </ReplyBox>
          </Review>
        ))}
      </List>
    </ReviewListBox>
  );
};

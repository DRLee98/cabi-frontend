import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container, CenterTitle } from "../../components/styledComponent";
import Button from "components/Button";
import { siteName } from "../../commonConstants";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Input } from "components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { useApolloClient, useMutation } from "@apollo/client";
import { CREATE_CHAT_ROOM_MUTATION, VIEW_CHAT_ROOMS_QUERY } from "./chatGql";
import {
  createChatRoomMutation,
  createChatRoomMutationVariables,
} from "__generated__/createChatRoomMutation";
import { useHistory } from "react-router-dom";
import { UserFragment } from "__generated__/UserFragment";

const Form = styled.form`
  max-width: 500px;
  margin: 0 auto;
`;

const CheckBox = styled.input``;

const CheckBoxLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1em;
  padding: 0 1em;
  color: ${({ theme }) => theme.grayColor};
  cursor: pointer;
`;

const Icon = styled.div`
  font-size: 1.5em;
  margin-right: 0.5em;
`;

interface CreateChatRoomFormProp {
  name: string;
  password: string;
  verifyPassword: string;
}

interface CreateChatRoomProp {
  user?: UserFragment | null;
}

export const CreateChatRoom: React.FC<CreateChatRoomProp> = ({ user }) => {
  const client = useApolloClient();
  const history = useHistory();
  const [secret, setSecret] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>();
  const { register, handleSubmit, getValues, formState, watch, errors } =
    useForm<CreateChatRoomFormProp>({ mode: "onChange" });

  const onCompleted = (data: createChatRoomMutation) => {
    const {
      createChatRoom: { ok, error, id },
    } = data;
    if (ok) {
      const { name } = getValues();
      if (user) {
        const { id: userId, name: userName, email, smallProfileImg } = user;
        const newChatRoom = {
          id,
          name,
          secret,
          users: [
            {
              id: userId,
              name: userName,
              email,
              smallProfileImg,
              __typename: "User",
            },
          ],
          __typename: "ChatRoom",
        };
        const {
          viewChatRooms: { chatRooms },
        } = client.readQuery({
          query: VIEW_CHAT_ROOMS_QUERY,
        });
        client.writeQuery({
          query: VIEW_CHAT_ROOMS_QUERY,
          data: {
            viewChatRooms: {
              error,
              ok,
              chatRooms: [...chatRooms, newChatRoom],
            },
            __typename: "UserProfileOutput",
          },
        });
        history.push("/chat-rooms");
      }
    } else {
      setErrorMsg(error);
      setTimeout(() => setErrorMsg(null), 2000);
    }
  };

  const [createChatRoomMutation, { loading }] = useMutation<
    createChatRoomMutation,
    createChatRoomMutationVariables
  >(CREATE_CHAT_ROOM_MUTATION, { onCompleted });

  const onSubmit = () => {
    if (!loading) {
      const { name, password } = getValues();
      createChatRoomMutation({
        variables: {
          input: {
            name,
            ...(secret && { secret, password }),
          },
        },
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>{siteName} | 수다방 만들기</title>
      </Helmet>
      <Container>
        <CenterTitle>수다방 만들기</CenterTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register({ required: "수다방 이름을 입력해 주세요" })}
            label={"수다방 이름"}
            name={"name"}
            write={Boolean(watch("name"))}
            error={errors.name?.message}
          />
          <CheckBoxLabel htmlFor="secret">
            <Icon>
              {secret ? (
                <FontAwesomeIcon icon={faLock} />
              ) : (
                <FontAwesomeIcon icon={faLockOpen} />
              )}
            </Icon>
            비밀 수다방 설정하기
          </CheckBoxLabel>
          <CheckBox
            type="checkbox"
            name="secret"
            id="secret"
            onClick={() => setSecret((prev) => !prev)}
          />
          {secret && (
            <>
              <Input
                register={register({ required: "비밀번호는 필수 항목입니다" })}
                label={"수다방 비밀번호"}
                name={"password"}
                type="password"
                write={Boolean(watch("password"))}
                error={errors.password?.message}
              />
              <Input
                register={register({
                  required: "비밀번호 확인은 필수 항목입니다",
                  validate: (data) => data === getValues("password"),
                })}
                label={"비밀번호 확인"}
                name={"verifyPassword"}
                type="password"
                write={Boolean(watch("verifyPassword"))}
                error={
                  errors.verifyPassword?.type === "validate"
                    ? "비밀번호가 일치하지 않습니다."
                    : errors.verifyPassword?.message
                }
              />
            </>
          )}
          <Button
            loading={loading}
            valid={formState.isValid}
            text={"수다방 만들기"}
            error={errorMsg}
          ></Button>
        </Form>
      </Container>
    </>
  );
};

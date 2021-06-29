import {
  useMutation,
  useQuery,
  useLazyQuery,
  useSubscription,
} from "@apollo/client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Loading } from "components/loading";
import { Container, CenterTitle } from "components/styledComponent";
import Button from "components/Button";
import { siteName } from "commonConstants";
import { isSecretChatRoomQuery } from "__generated__/isSecretChatRoomQuery";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Input } from "components/Input";
import {
  entranceChatRoomMutation,
  entranceChatRoomMutationVariables,
} from "__generated__/entranceChatRoomMutation";
import {
  CREATE_MESSAGE_MUTATION,
  ENTRANCE_CHAT_ROOM_MUTATION,
  IS_SECRET_CHAT_ROOM_QUERY,
  LISTEN_NEW_MESSAGE,
  VIEW_CHAT_ROOM_QUERY,
} from "./chatGql";
import { viewChatRoomQueryVariables } from "__generated__/viewChatRoomQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { MessageFragment } from "__generated__/MessageFragment";
import {
  createMessageMutation,
  createMessageMutationVariables,
} from "__generated__/createMessageMutation";
import { MessageType } from "__generated__/globalTypes";
import { Message } from "components/message";
import { UserFragment } from "__generated__/UserFragment";

const PasswordContainer = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PasswordForm = styled.form``;

const SendMsgForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 100%;
  left: 0;
  right: 0;
  padding: 0.5em;
  background-color: ${({ theme }) => theme.whiteColor};
  box-shadow: 0px 0px 8px 1px rgb(140 122 122 / 12%);
`;

const SendMsgInput = styled.input`
  width: 100%;
  padding: 0 10px;
`;

const SendMsgBtn = styled.button`
  font-size: 2em;
  padding: 0.3em;
  border-radius: 999px;
  color: ${({ theme }) => theme.signatureColor};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.signaturelightBgColor};
  }
  transition: background-color 0.2s ease;
`;

const MessagesContainer = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0 1em;
`;

interface ChatRoomParam {
  id: string;
}

interface ChatRoomFormProp {
  password: string;
  context: string;
}

interface ChatRoomProp {
  user?: UserFragment | null;
}

export const ChatRoom: React.FC<ChatRoomProp> = ({ user }) => {
  const { id } = useParams<ChatRoomParam>();
  const [isSecret, setIsSecret] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>();
  const [messages, setMessages] = useState<MessageFragment[] | []>([]);
  const { register, handleSubmit, getValues, setValue, formState } =
    useForm<ChatRoomFormProp>({ mode: "onChange" });

  const { data: isSecretData, loading } = useQuery<isSecretChatRoomQuery>(
    IS_SECRET_CHAT_ROOM_QUERY,
    {
      variables: { input: { id: +id } },
    },
  );

  const scrollBottom = () => {
    const {
      body: { scrollHeight },
    } = document;
    const {
      screen: { height: screenHeight },
    } = window;
    const footer = document.querySelector("footer");
    const height = footer
      ? scrollHeight - footer?.offsetHeight - screenHeight
      : scrollHeight - screenHeight;
    window.scroll(0, height);
  };

  const [
    viewChatRoom,
    { loading: viewChatLoading, data: viewChatData, subscribeToMore },
  ] = useLazyQuery<any, viewChatRoomQueryVariables>(VIEW_CHAT_ROOM_QUERY, {
    onCompleted: (data) => {
      const {
        viewChatRoom: { ok, error, chatRoom },
      } = data;
      if (ok) {
        setMessages(chatRoom.messages);
        scrollBottom();
        if (subscribeToMore) {
          subscribeToMore({
            document: LISTEN_NEW_MESSAGE,
            variables: { input: { id: +id } },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const newMessage = subscriptionData.data.listenNewMessage;
              setMessages((prev) => [...prev, newMessage]);
              scrollBottom();
              return {
                viewChatRoom: {
                  ...prev.viewChatRoom,
                  chatRoom: {
                    ...prev.viewChatRoom.chatRoom,
                    messages,
                  },
                },
              };
            },
          });
        }
      }
    },
  });

  const [entranceChatRoomMutation, { loading: entranceLoading }] = useMutation<
    entranceChatRoomMutation,
    entranceChatRoomMutationVariables
  >(ENTRANCE_CHAT_ROOM_MUTATION, {
    onCompleted: (data) => {
      const {
        entranceChatRoom: { ok, error },
      } = data;
      if (ok) {
        if (isSecret) setIsSecret(false);
        if (!viewChatLoading) {
          viewChatRoom({ variables: { input: { id: +id } } });
        }
      } else {
        setErrorMsg(error);
        setTimeout(() => setErrorMsg(null), 2000);
      }
    },
  });

  const [createMessageMutation] = useMutation<
    createMessageMutation,
    createMessageMutationVariables
  >(CREATE_MESSAGE_MUTATION, {
    onCompleted: (data) => {
      const {
        createMessage: { ok, error, id },
      } = data;
      if (ok && id) {
        const { context } = getValues();
        if (user) {
          const { id: userId, email, name, smallProfileImg } = user;
          const newMessage: MessageFragment = {
            id,
            context,
            type: MessageType.User,
            createdAt: new Date().toISOString(),
            writer: {
              email,
              id: userId,
              name,
              smallProfileImg,
              __typename: "User",
            },
            __typename: "Message",
          };
          setMessages((prev) => [...prev, newMessage]);
          setValue("context", "");
          scrollBottom();
        }
      } else {
        console.log(error);
      }
    },
  });

  const entranceChatRoom = (password?: string) => {
    if (!entranceLoading) {
      entranceChatRoomMutation({ variables: { input: { id: +id, password } } });
    }
  };

  const onSubmitPassword = async () => {
    const { password } = getValues();
    entranceChatRoom(password);
  };

  const onSubmitSendMsg = async () => {
    const { context } = getValues();
    createMessageMutation({
      variables: { input: { chatRoomId: +id, context } },
    });
  };

  useEffect(() => {
    if (isSecretData) {
      const {
        isSecretChatRoom: { ok, isSecret },
      } = isSecretData;
      if (ok) {
        if (isSecret === true) {
          setIsSecret(isSecret);
        } else {
          entranceChatRoom();
        }
      }
    }
  }, [isSecretData]);

  return loading || viewChatLoading ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title>{siteName}</title>
      </Helmet>
      <Container>
        {isSecret ? (
          <PasswordContainer>
            <CenterTitle>비밀번호를 입력해 주세요.</CenterTitle>
            <PasswordForm onSubmit={handleSubmit(onSubmitPassword)}>
              <Input
                register={register({ required: true })}
                name="password"
                type="password"
              />
              <Button
                loading={entranceLoading}
                valid={formState.isValid}
                text={"입장하기"}
                error={errorMsg}
              ></Button>
            </PasswordForm>
          </PasswordContainer>
        ) : (
          <MessagesContainer>
            <CenterTitle>
              {viewChatData?.viewChatRoom.chatRoom.name}
            </CenterTitle>
            {messages.map((msg: MessageFragment) => (
              <Message
                key={msg.createdAt}
                message={msg}
                me={(user && msg.writer && user.id === msg.writer.id) || false}
              />
            ))}
          </MessagesContainer>
        )}
      </Container>
      {!isSecret && (
        <SendMsgForm onSubmit={handleSubmit(onSubmitSendMsg)}>
          <SendMsgInput
            ref={register({ required: true })}
            name="context"
            type="text"
          />
          <SendMsgBtn>
            <FontAwesomeIcon icon={faPaperPlane} />
          </SendMsgBtn>
        </SendMsgForm>
      )}
    </>
  );
};

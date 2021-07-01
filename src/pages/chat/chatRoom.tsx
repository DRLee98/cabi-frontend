import {
  useMutation,
  useQuery,
  useLazyQuery,
  useSubscription,
  useApolloClient,
} from "@apollo/client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useParams } from "react-router-dom";
import { Loading } from "components/loading";
import {
  Container,
  CenterTitle,
  FlexCenterBox,
} from "components/styledComponent";
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
  LISTEN_ENTRANCE_USER,
  LISTEN_EXIT_USER,
  VIEW_CHAT_ROOM_QUERY,
  EXIT_CHAT_ROOM_MUTATION,
  MY_CHAT_ROOMS_QUERY,
} from "./chatGql";
import { viewChatRoomQueryVariables } from "__generated__/viewChatRoomQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDoorOpen,
  faPaperPlane,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { MessageFragment } from "__generated__/MessageFragment";
import {
  createMessageMutation,
  createMessageMutationVariables,
} from "__generated__/createMessageMutation";
import { MessageType } from "__generated__/globalTypes";
import { Message } from "components/message";
import { UserFragment } from "__generated__/UserFragment";
import { SimpleUserFragment } from "__generated__/SimpleUserFragment";
import { SimpleChatRoomFragment } from "__generated__/SimpleChatRoomFragment";
import { UserList } from "components/userList";
import {
  exitChatRoomMutation,
  exitChatRoomMutationVariables,
} from "__generated__/exitChatRoomMutation";
import { CHAT_ROOM_FRAGMENT } from "fragments";
import { Confirm } from "components/confirm";

const PasswordContainer = styled(FlexCenterBox)`
  min-height: 80vh;
  flex-direction: column;
`;

const PasswordForm = styled.form``;

const SendMsgForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  bottom: 0;
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
  min-height: 72vh;
`;

const ChatMenu = styled.div`
  position: sticky;
  top: 6vh;
  background-color: ${({ theme }) => theme.whiteColor};
  border-bottom: 1px solid ${({ theme }) => theme.signatureColor};
  padding: 1em;
  z-index: 5;
  h2 {
    margin: 0;
    line-height: 1.2;
    position: relative;
  }
`;

const Icon = styled(FlexCenterBox)`
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.8em;
  width: 40px;
  height: 40px;
  text-align: center;
  border-radius: 999px;
  color: ${({ theme }) => theme.signatureColor};
  &:hover {
    background-color: ${({ theme }) => theme.signaturelightBgColor};
  }
  transition: all 0.3s ease;
  cursor: pointer;
  & + & {
    right: 50px;
  }
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
  const history = useHistory();
  const client = useApolloClient();
  const { id } = useParams<ChatRoomParam>();
  const [isSecret, setIsSecret] = useState<boolean>(false);
  const [userListOpen, setUserListOpen] = useState<boolean>(false);
  const [exitChat, setExitChat] = useState<boolean>(false);
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
    onCompleted: async (data) => {
      const {
        viewChatRoom: { ok, error, chatRoom },
      } = data;
      if (ok) {
        setMessages(chatRoom.messages);

        const myChatRoomsData = await client.readQuery({
          query: MY_CHAT_ROOMS_QUERY,
        });
        if (myChatRoomsData) {
          const chatRooms = myChatRoomsData.myChatRooms.chatRooms;
          client.writeQuery({
            query: MY_CHAT_ROOMS_QUERY,
            data: {
              myChatRooms: {
                error,
                ok,
                chatRooms: [...chatRooms, chatRoom],
              },
            },
          });
        }

        if (user) {
          const chatRoomFragment = client.readFragment({
            id: `ChatRoom:${id}`,
            fragment: CHAT_ROOM_FRAGMENT,
            fragmentName: "ChatRoomFragment",
          });
          if (chatRoomFragment) {
            const { id: userId, name, email, smallProfileImg } = user;
            if (
              chatRoomFragment.users.filter(
                (chatUser: SimpleUserFragment) => chatUser.id === user.id,
              ).length === 0
            ) {
              client.writeFragment({
                id: `ChatRoom:${id}`,
                fragment: CHAT_ROOM_FRAGMENT,
                fragmentName: "ChatRoomFragment",
                data: {
                  ...chatRoomFragment,
                  users: [
                    ...chatRoomFragment.users,
                    {
                      id: userId,
                      name,
                      email,
                      smallProfileImg,
                      __typename: "User",
                    },
                  ],
                },
              });
            }
          }
        }

        scrollBottom();

        if (subscribeToMore) {
          subscribeToMore({
            document: LISTEN_ENTRANCE_USER,
            variables: { input: { id: +id } },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const entranceUser = subscriptionData.data.listenEntranceUser;
              return {
                viewChatRoom: {
                  ...prev.viewChatRoom,
                  chatRoom: {
                    ...prev.viewChatRoom.chatRoom,
                    users: [...prev.viewChatRoom.chatRoom.users, entranceUser],
                  },
                },
              };
            },
          });

          subscribeToMore({
            document: LISTEN_EXIT_USER,
            variables: { input: { id: +id } },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const exitUser = subscriptionData.data.listenExitUser;
              const users = prev.viewChatRoom.chatRoom.users.filter(
                (user: SimpleUserFragment) => user.id !== exitUser.id,
              );
              return {
                viewChatRoom: {
                  ...prev.viewChatRoom,
                  chatRoom: {
                    ...prev.viewChatRoom.chatRoom,
                    users,
                  },
                },
              };
            },
          });

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
    onCompleted: async (data) => {
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

  const [exitChatRoomMutation, { loading: exitLoading }] = useMutation<
    exitChatRoomMutation,
    exitChatRoomMutationVariables
  >(EXIT_CHAT_ROOM_MUTATION, {
    onCompleted: async (data) => {
      const {
        exitChatRoom: { ok, error },
      } = data;
      if (ok) {
        const myChatRoomsData = await client.readQuery({
          query: MY_CHAT_ROOMS_QUERY,
        });
        if (myChatRoomsData) {
          const chatRooms = myChatRoomsData.myChatRooms.chatRooms;
          client.writeQuery({
            query: MY_CHAT_ROOMS_QUERY,
            data: {
              myChatRooms: {
                error,
                ok,
                chatRooms: chatRooms.filter(
                  (chatRoom: SimpleChatRoomFragment) => chatRoom.id !== +id,
                ),
              },
            },
          });
        }
        const chatRoomFragment = await client.readFragment({
          id: `ChatRoom:${id}`,
          fragment: CHAT_ROOM_FRAGMENT,
          fragmentName: "ChatRoomFragment",
        });
        client.writeFragment({
          id: `ChatRoom:${id}`,
          fragment: CHAT_ROOM_FRAGMENT,
          fragmentName: "ChatRoomFragment",
          data: {
            ...chatRoomFragment,
            users: chatRoomFragment.users.filter(
              (chatRoomUser: SimpleUserFragment) =>
                user && chatRoomUser.id !== user.id,
            ),
          },
        });
        history.push("/chat-rooms");
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

  const exitChatRoom = () => {
    if (!exitLoading) {
      exitChatRoomMutation({ variables: { input: { id: +id } } });
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

  console.log(viewChatData);

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
          <MessagesContainer onLoad={scrollBottom}>
            <ChatMenu>
              <CenterTitle>
                {viewChatData?.viewChatRoom.chatRoom.name}
                <Icon
                  onClick={() => {
                    setExitChat(true);
                  }}
                >
                  <FontAwesomeIcon icon={faDoorOpen} />
                </Icon>
                <Icon
                  onClick={() => {
                    setUserListOpen((prev) => !prev);
                  }}
                >
                  <FontAwesomeIcon icon={faUser} />
                </Icon>
              </CenterTitle>
              <UserList
                open={userListOpen}
                users={viewChatData?.viewChatRoom.chatRoom.users}
                me={user}
              />
            </ChatMenu>
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
      {exitChat && (
        <Confirm
          okFn={exitChatRoom}
          cancelFn={() => {
            setExitChat(false);
          }}
          text={`${viewChatData?.viewChatRoom.chatRoom.name} 수다방에서 나가시겠습니까?`}
        />
      )}
    </>
  );
};

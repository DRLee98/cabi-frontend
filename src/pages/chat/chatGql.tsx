import { gql } from "@apollo/client";
import {
  CHAT_ROOM_FRAGMENT,
  MESSAGE_FRAGMENT,
  SIMPLE_CHAT_ROOM_FRAGMENT,
  SIMPLE_USER_FRAGMENT,
} from "fragments";

export const VIEW_CHAT_ROOMS_QUERY = gql`
  query viewChatRoomsQuery {
    viewChatRooms {
      ok
      error
      chatRooms {
        ...SimpleChatRoomFragment
      }
    }
  }
  ${SIMPLE_CHAT_ROOM_FRAGMENT}
`;

export const MY_CHAT_ROOMS_QUERY = gql`
  query myChatRoomsQuery {
    myChatRooms {
      ok
      error
      chatRooms {
        ...SimpleChatRoomFragment
      }
    }
  }
  ${SIMPLE_CHAT_ROOM_FRAGMENT}
`;

export const CREATE_CHAT_ROOM_MUTATION = gql`
  mutation createChatRoomMutation($input: CreateChatRoomInput!) {
    createChatRoom(input: $input) {
      ok
      error
      id
    }
  }
`;

export const IS_SECRET_CHAT_ROOM_QUERY = gql`
  query isSecretChatRoomQuery($input: IsSecretChatRoomInput!) {
    isSecretChatRoom(input: $input) {
      ok
      error
      isSecret
    }
  }
`;

export const VIEW_CHAT_ROOM_QUERY = gql`
  query viewChatRoomQuery($input: ViewChatRoomInput!) {
    viewChatRoom(input: $input) {
      ok
      error
      chatRoom {
        ...ChatRoomFragment
      }
    }
  }
  ${CHAT_ROOM_FRAGMENT}
`;

export const ENTRANCE_CHAT_ROOM_MUTATION = gql`
  mutation entranceChatRoomMutation($input: EntranceChatRoomInput!) {
    entranceChatRoom(input: $input) {
      ok
      error
    }
  }
`;

export const EXIT_CHAT_ROOM_MUTATION = gql`
  mutation exitChatRoomMutation($input: ExitChatRoomInput!) {
    exitChatRoom(input: $input) {
      ok
      error
    }
  }
`;

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessageMutation($input: CreateMessageInput!) {
    createMessage(input: $input) {
      ok
      error
      id
    }
  }
`;

export const LISTEN_NEW_MESSAGE = gql`
  subscription listenNewMessageSubscription($input: ListenNewMessageInput!) {
    listenNewMessage(input: $input) {
      ...MessageFragment
    }
  }
  ${MESSAGE_FRAGMENT}
`;

export const LISTEN_ENTRANCE_USER = gql`
  subscription listenEntranceUserSubscription(
    $input: ListenEntranceUserInput!
  ) {
    listenEntranceUser(input: $input) {
      ...SimpleUserFragment
    }
  }
  ${SIMPLE_USER_FRAGMENT}
`;

export const LISTEN_EXIT_USER = gql`
  subscription listenExitUserSubscription($input: ListenExitUserInput!) {
    listenExitUser(input: $input) {
      ...SimpleUserFragment
    }
  }
  ${SIMPLE_USER_FRAGMENT}
`;

import { gql } from "@apollo/client";
import { MESSAGE_FRAGMENT, SIMPLE_USER_FRAGMENT } from "fragments";

export const VIEW_CHAT_ROOMS_QUERY = gql`
  query viewChatRoomsQuery {
    viewChatRooms {
      ok
      error
      chatRooms {
        id
        name
        secret
        users {
          ...SimpleUserFragment
        }
      }
    }
  }
  ${SIMPLE_USER_FRAGMENT}
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
        id
        name
        users {
          ...SimpleUserFragment
        }
        messages {
          ...MessageFragment
        }
      }
    }
  }
  ${MESSAGE_FRAGMENT}
  ${SIMPLE_USER_FRAGMENT}
`;

export const ENTRANCE_CHAT_ROOM_MUTATION = gql`
  mutation entranceChatRoomMutation($input: EntranceChatRoomInput!) {
    entranceChatRoom(input: $input) {
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

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ViewChatRoomInput, MessageType } from "./globalTypes";

// ====================================================
// GraphQL query operation: viewChatRoomQuery
// ====================================================

export interface viewChatRoomQuery_viewChatRoom_chatRoom_users {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface viewChatRoomQuery_viewChatRoom_chatRoom_messages_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface viewChatRoomQuery_viewChatRoom_chatRoom_messages {
  __typename: "Message";
  id: number;
  type: MessageType;
  context: string;
  createdAt: any;
  writer: viewChatRoomQuery_viewChatRoom_chatRoom_messages_writer | null;
}

export interface viewChatRoomQuery_viewChatRoom_chatRoom {
  __typename: "ChatRoom";
  id: number;
  name: string;
  users: viewChatRoomQuery_viewChatRoom_chatRoom_users[];
  messages: viewChatRoomQuery_viewChatRoom_chatRoom_messages[] | null;
}

export interface viewChatRoomQuery_viewChatRoom {
  __typename: "ViewChatRoomOutput";
  ok: boolean;
  error: string | null;
  chatRoom: viewChatRoomQuery_viewChatRoom_chatRoom | null;
}

export interface viewChatRoomQuery {
  viewChatRoom: viewChatRoomQuery_viewChatRoom;
}

export interface viewChatRoomQueryVariables {
  input: ViewChatRoomInput;
}

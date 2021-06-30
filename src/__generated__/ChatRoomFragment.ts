/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MessageType } from "./globalTypes";

// ====================================================
// GraphQL fragment: ChatRoomFragment
// ====================================================

export interface ChatRoomFragment_users {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface ChatRoomFragment_messages_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface ChatRoomFragment_messages {
  __typename: "Message";
  id: number;
  type: MessageType;
  context: string;
  createdAt: any;
  writer: ChatRoomFragment_messages_writer | null;
}

export interface ChatRoomFragment {
  __typename: "ChatRoom";
  id: number;
  name: string;
  users: ChatRoomFragment_users[];
  messages: ChatRoomFragment_messages[] | null;
}

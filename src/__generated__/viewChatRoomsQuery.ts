/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: viewChatRoomsQuery
// ====================================================

export interface viewChatRoomsQuery_viewChatRooms_chatRooms_users {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface viewChatRoomsQuery_viewChatRooms_chatRooms {
  __typename: "ChatRoom";
  id: number;
  name: string;
  secret: boolean;
  users: viewChatRoomsQuery_viewChatRooms_chatRooms_users[];
}

export interface viewChatRoomsQuery_viewChatRooms {
  __typename: "ViewChatRoomsOutput";
  ok: boolean;
  error: string | null;
  chatRooms: viewChatRoomsQuery_viewChatRooms_chatRooms[] | null;
}

export interface viewChatRoomsQuery {
  viewChatRooms: viewChatRoomsQuery_viewChatRooms;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myChatRoomsQuery
// ====================================================

export interface myChatRoomsQuery_myChatRooms_chatRooms_users {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface myChatRoomsQuery_myChatRooms_chatRooms {
  __typename: "ChatRoom";
  id: number;
  name: string;
  secret: boolean;
  users: myChatRoomsQuery_myChatRooms_chatRooms_users[];
}

export interface myChatRoomsQuery_myChatRooms {
  __typename: "MyChatRoomOutput";
  ok: boolean;
  error: string | null;
  chatRooms: myChatRoomsQuery_myChatRooms_chatRooms[] | null;
}

export interface myChatRoomsQuery {
  myChatRooms: myChatRoomsQuery_myChatRooms;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SimpleChatRoomFragment
// ====================================================

export interface SimpleChatRoomFragment_users {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface SimpleChatRoomFragment {
  __typename: "ChatRoom";
  id: number;
  name: string;
  secret: boolean;
  users: SimpleChatRoomFragment_users[];
}

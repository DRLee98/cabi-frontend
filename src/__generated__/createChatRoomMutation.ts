/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateChatRoomInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createChatRoomMutation
// ====================================================

export interface createChatRoomMutation_createChatRoom {
  __typename: "CreateChatRoomOutput";
  ok: boolean;
  error: string | null;
  id: number | null;
}

export interface createChatRoomMutation {
  createChatRoom: createChatRoomMutation_createChatRoom;
}

export interface createChatRoomMutationVariables {
  input: CreateChatRoomInput;
}

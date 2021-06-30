/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ExitChatRoomInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: exitChatRoomMutation
// ====================================================

export interface exitChatRoomMutation_exitChatRoom {
  __typename: "ExitChatRoomOutput";
  ok: boolean;
  error: string | null;
}

export interface exitChatRoomMutation {
  exitChatRoom: exitChatRoomMutation_exitChatRoom;
}

export interface exitChatRoomMutationVariables {
  input: ExitChatRoomInput;
}

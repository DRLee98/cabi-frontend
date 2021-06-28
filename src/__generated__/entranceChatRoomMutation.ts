/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EntranceChatRoomInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: entranceChatRoomMutation
// ====================================================

export interface entranceChatRoomMutation_entranceChatRoom {
  __typename: "EntranceChatRoomOutput";
  ok: boolean;
  error: string | null;
}

export interface entranceChatRoomMutation {
  entranceChatRoom: entranceChatRoomMutation_entranceChatRoom;
}

export interface entranceChatRoomMutationVariables {
  input: EntranceChatRoomInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { IsSecretChatRoomInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: isSecretChatRoomQuery
// ====================================================

export interface isSecretChatRoomQuery_isSecretChatRoom {
  __typename: "IsSecretChatRoomOutput";
  ok: boolean;
  error: string | null;
  isSecret: boolean | null;
}

export interface isSecretChatRoomQuery {
  isSecretChatRoom: isSecretChatRoomQuery_isSecretChatRoom;
}

export interface isSecretChatRoomQueryVariables {
  input: IsSecretChatRoomInput;
}

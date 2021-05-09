/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateReplyInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createReplyMutation
// ====================================================

export interface createReplyMutation_createReply {
  __typename: "CreateReplyOutput";
  ok: boolean;
  error: string | null;
}

export interface createReplyMutation {
  createReply: createReplyMutation_createReply;
}

export interface createReplyMutationVariables {
  input: CreateReplyInput;
}

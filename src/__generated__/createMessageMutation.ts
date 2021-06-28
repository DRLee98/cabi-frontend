/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateMessageInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createMessageMutation
// ====================================================

export interface createMessageMutation_createMessage {
  __typename: "CreateMessageOutput";
  ok: boolean;
  error: string | null;
  id: number | null;
}

export interface createMessageMutation {
  createMessage: createMessageMutation_createMessage;
}

export interface createMessageMutationVariables {
  input: CreateMessageInput;
}

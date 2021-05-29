/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteCafeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteCafeMutation
// ====================================================

export interface deleteCafeMutation_deleteCafe {
  __typename: "DeleteCafeOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteCafeMutation {
  deleteCafe: deleteCafeMutation_deleteCafe;
}

export interface deleteCafeMutationVariables {
  input: DeleteCafeInput;
}

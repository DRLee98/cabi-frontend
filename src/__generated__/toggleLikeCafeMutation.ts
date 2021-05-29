/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ToggleLikeCafeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: toggleLikeCafeMutation
// ====================================================

export interface toggleLikeCafeMutation_toggleLikeCafe {
  __typename: "ToggleLikeCafeOutput";
  ok: boolean;
  error: string | null;
}

export interface toggleLikeCafeMutation {
  toggleLikeCafe: toggleLikeCafeMutation_toggleLikeCafe;
}

export interface toggleLikeCafeMutationVariables {
  input: ToggleLikeCafeInput;
}

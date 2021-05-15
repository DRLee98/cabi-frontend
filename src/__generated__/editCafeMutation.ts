/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditCafeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editCafeMutation
// ====================================================

export interface editCafeMutation_editCafe {
  __typename: "EditCafeOutput";
  ok: boolean;
  error: string | null;
}

export interface editCafeMutation {
  editCafe: editCafeMutation_editCafe;
}

export interface editCafeMutationVariables {
  input: EditCafeInput;
}

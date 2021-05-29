/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCafeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createCafeMutation
// ====================================================

export interface createCafeMutation_createCafe {
  __typename: "CreateCafeOutput";
  ok: boolean;
  error: string | null;
  cafeId: number | null;
}

export interface createCafeMutation {
  createCafe: createCafeMutation_createCafe;
}

export interface createCafeMutationVariables {
  input: CreateCafeInput;
}

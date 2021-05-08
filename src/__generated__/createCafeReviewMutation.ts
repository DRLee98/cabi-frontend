/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCafeReviewInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createCafeReviewMutation
// ====================================================

export interface createCafeReviewMutation_createCafeReview {
  __typename: "CreateCafeReviewOutput";
  ok: boolean;
  error: string | null;
  reviewId: number | null;
}

export interface createCafeReviewMutation {
  createCafeReview: createCafeReviewMutation_createCafeReview;
}

export interface createCafeReviewMutationVariables {
  input: CreateCafeReviewInput;
}

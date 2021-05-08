/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateMenuReviewInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createMenuReviewMutation
// ====================================================

export interface createMenuReviewMutation_createMenuReview {
  __typename: "CreateMenuReviewOutput";
  ok: boolean;
  error: string | null;
  reviewId: number | null;
}

export interface createMenuReviewMutation {
  createMenuReview: createMenuReviewMutation_createMenuReview;
}

export interface createMenuReviewMutationVariables {
  input: CreateMenuReviewInput;
}

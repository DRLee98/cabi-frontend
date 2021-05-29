/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ReviewFragment
// ====================================================

export interface ReviewFragment_rating {
  __typename: "Rating";
  score: number;
}

export interface ReviewFragment_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface ReviewFragment_reply_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface ReviewFragment_reply {
  __typename: "Reply";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  writer: ReviewFragment_reply_writer;
}

export interface ReviewFragment {
  __typename: "Review";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  rating: ReviewFragment_rating | null;
  writer: ReviewFragment_writer;
  reply: ReviewFragment_reply[] | null;
}

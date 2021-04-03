/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ReplyFragment
// ====================================================

export interface ReplyFragment_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface ReplyFragment {
  __typename: "Reply";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  writer: ReplyFragment_writer;
}

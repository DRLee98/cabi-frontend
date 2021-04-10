/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CafeFragment
// ====================================================

export interface CafeFragment_keywords {
  __typename: "Keyword";
  name: string;
}

export interface CafeFragment_owner {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface CafeFragment_likedUsers {
  __typename: "User";
  id: number;
}

export interface CafeFragment {
  __typename: "Cafe";
  id: number;
  name: string;
  coverImg: string | null;
  totalScore: number;
  avgScore: number;
  createdAt: any;
  updatedAt: any;
  keywords: CafeFragment_keywords[] | null;
  owner: CafeFragment_owner;
  likedUsers: CafeFragment_likedUsers[] | null;
}

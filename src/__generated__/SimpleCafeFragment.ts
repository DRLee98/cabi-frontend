/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SimpleCafeFragment
// ====================================================

export interface SimpleCafeFragment_keywords {
  __typename: "Keyword";
  name: string;
}

export interface SimpleCafeFragment_owner {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface SimpleCafeFragment_likedUsers {
  __typename: "User";
  id: number;
}

export interface SimpleCafeFragment {
  __typename: "Cafe";
  id: number;
  name: string;
  smallCoverImg: string | null;
  totalScore: number;
  avgScore: number;
  createdAt: any;
  updatedAt: any;
  keywords: SimpleCafeFragment_keywords[] | null;
  owner: SimpleCafeFragment_owner;
  likedUsers: SimpleCafeFragment_likedUsers[] | null;
}

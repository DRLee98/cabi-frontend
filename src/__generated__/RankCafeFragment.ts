/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RankCafeFragment
// ====================================================

export interface RankCafeFragment_likedUsers {
  __typename: "User";
  id: number;
}

export interface RankCafeFragment {
  __typename: "Cafe";
  id: number;
  name: string;
  originalCoverImg: string | null;
  totalScore: number;
  avgScore: number;
  createdAt: any;
  updatedAt: any;
  likedUsers: RankCafeFragment_likedUsers[] | null;
}

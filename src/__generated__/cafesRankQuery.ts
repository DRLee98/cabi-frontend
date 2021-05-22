/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: cafesRankQuery
// ====================================================

export interface cafesRankQuery_cafesRank_cafes_keywords {
  __typename: "Keyword";
  name: string;
}

export interface cafesRankQuery_cafesRank_cafes_owner {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface cafesRankQuery_cafesRank_cafes_likedUsers {
  __typename: "User";
  id: number;
}

export interface cafesRankQuery_cafesRank_cafes {
  __typename: "Cafe";
  id: number;
  name: string;
  coverImg: string | null;
  totalScore: number;
  avgScore: number;
  createdAt: any;
  updatedAt: any;
  keywords: cafesRankQuery_cafesRank_cafes_keywords[] | null;
  owner: cafesRankQuery_cafesRank_cafes_owner;
  likedUsers: cafesRankQuery_cafesRank_cafes_likedUsers[] | null;
}

export interface cafesRankQuery_cafesRank {
  __typename: "SeeCafeOutput";
  ok: boolean;
  error: string | null;
  cafes: cafesRankQuery_cafesRank_cafes[] | null;
}

export interface cafesRankQuery {
  cafesRank: cafesRankQuery_cafesRank;
}

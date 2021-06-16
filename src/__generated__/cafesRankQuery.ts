/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: cafesRankQuery
// ====================================================

export interface cafesRankQuery_cafesRank_cafes_likedUsers {
  __typename: "User";
  id: number;
}

export interface cafesRankQuery_cafesRank_cafes_address {
  __typename: "Address";
  id: number;
  zonecode: string;
  address: string | null;
  lat: number | null;
  lng: number | null;
}

export interface cafesRankQuery_cafesRank_cafes {
  __typename: "Cafe";
  id: number;
  name: string;
  originalCoverImg: string | null;
  totalScore: number;
  avgScore: number;
  createdAt: any;
  updatedAt: any;
  likedUsers: cafesRankQuery_cafesRank_cafes_likedUsers[] | null;
  address: cafesRankQuery_cafesRank_cafes_address;
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

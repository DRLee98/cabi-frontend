/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeCafesQuery
// ====================================================

export interface seeCafesQuery_seeCafes_cafes_keywords {
  __typename: "Keyword";
  name: string;
}

export interface seeCafesQuery_seeCafes_cafes_owner {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface seeCafesQuery_seeCafes_cafes_likedUsers {
  __typename: "User";
  id: number;
}

export interface seeCafesQuery_seeCafes_cafes {
  __typename: "Cafe";
  id: number;
  name: string;
  coverImg: string | null;
  totalScore: number;
  avgScore: number;
  createdAt: any;
  updatedAt: any;
  keywords: seeCafesQuery_seeCafes_cafes_keywords[] | null;
  owner: seeCafesQuery_seeCafes_cafes_owner;
  likedUsers: seeCafesQuery_seeCafes_cafes_likedUsers[] | null;
}

export interface seeCafesQuery_seeCafes {
  __typename: "SeeCafeOutput";
  ok: boolean;
  error: string | null;
  cafes: seeCafesQuery_seeCafes_cafes[] | null;
}

export interface seeCafesQuery {
  seeCafes: seeCafesQuery_seeCafes;
}

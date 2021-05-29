/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myCafesQuery
// ====================================================

export interface myCafesQuery_myCafes_cafes_keywords {
  __typename: "Keyword";
  name: string;
}

export interface myCafesQuery_myCafes_cafes_owner {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface myCafesQuery_myCafes_cafes_likedUsers {
  __typename: "User";
  id: number;
}

export interface myCafesQuery_myCafes_cafes {
  __typename: "Cafe";
  id: number;
  name: string;
  smallCoverImg: string | null;
  totalScore: number;
  avgScore: number;
  createdAt: any;
  updatedAt: any;
  keywords: myCafesQuery_myCafes_cafes_keywords[] | null;
  owner: myCafesQuery_myCafes_cafes_owner;
  likedUsers: myCafesQuery_myCafes_cafes_likedUsers[] | null;
}

export interface myCafesQuery_myCafes {
  __typename: "SeeCafeOutput";
  ok: boolean;
  error: string | null;
  cafes: myCafesQuery_myCafes_cafes[] | null;
}

export interface myCafesQuery {
  myCafes: myCafesQuery_myCafes;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchCafesInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchCafesQuery
// ====================================================

export interface searchCafesQuery_searchCafes_cafes_keywords {
  __typename: "Keyword";
  name: string;
  slug: string;
}

export interface searchCafesQuery_searchCafes_cafes_owner {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface searchCafesQuery_searchCafes_cafes_likedUsers {
  __typename: "User";
  id: number;
}

export interface searchCafesQuery_searchCafes_cafes {
  __typename: "Cafe";
  id: number;
  name: string;
  smallCoverImg: string | null;
  totalScore: number;
  avgScore: number;
  createdAt: any;
  updatedAt: any;
  keywords: searchCafesQuery_searchCafes_cafes_keywords[] | null;
  owner: searchCafesQuery_searchCafes_cafes_owner;
  likedUsers: searchCafesQuery_searchCafes_cafes_likedUsers[] | null;
}

export interface searchCafesQuery_searchCafes {
  __typename: "SearchCafesOutput";
  ok: boolean;
  error: string | null;
  cafes: searchCafesQuery_searchCafes_cafes[] | null;
}

export interface searchCafesQuery {
  searchCafes: searchCafesQuery_searchCafes;
}

export interface searchCafesQueryVariables {
  input: SearchCafesInput;
}

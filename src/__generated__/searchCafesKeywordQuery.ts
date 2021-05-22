/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchCafesKeywordInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchCafesKeywordQuery
// ====================================================

export interface searchCafesKeywordQuery_searchCafesKeyword_cafes_keywords {
  __typename: "Keyword";
  name: string;
}

export interface searchCafesKeywordQuery_searchCafesKeyword_cafes_owner {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface searchCafesKeywordQuery_searchCafesKeyword_cafes_likedUsers {
  __typename: "User";
  id: number;
}

export interface searchCafesKeywordQuery_searchCafesKeyword_cafes {
  __typename: "Cafe";
  id: number;
  name: string;
  coverImg: string | null;
  totalScore: number;
  avgScore: number;
  createdAt: any;
  updatedAt: any;
  keywords: searchCafesKeywordQuery_searchCafesKeyword_cafes_keywords[] | null;
  owner: searchCafesKeywordQuery_searchCafesKeyword_cafes_owner;
  likedUsers: searchCafesKeywordQuery_searchCafesKeyword_cafes_likedUsers[] | null;
}

export interface searchCafesKeywordQuery_searchCafesKeyword {
  __typename: "SearchCafesKeywordOutput";
  ok: boolean;
  error: string | null;
  cafes: searchCafesKeywordQuery_searchCafesKeyword_cafes[] | null;
}

export interface searchCafesKeywordQuery {
  searchCafesKeyword: searchCafesKeywordQuery_searchCafesKeyword;
}

export interface searchCafesKeywordQueryVariables {
  input: SearchCafesKeywordInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CafeDetailInput, Category } from "./globalTypes";

// ====================================================
// GraphQL query operation: cafeDetailQuery
// ====================================================

export interface cafeDetailQuery_cafeDetail_cafe_address {
  __typename: "Address";
  id: number;
  zonecode: string;
  address: string | null;
}

export interface cafeDetailQuery_cafeDetail_cafe_keywords {
  __typename: "Keyword";
  id: number;
  name: string;
  slug: string;
}

export interface cafeDetailQuery_cafeDetail_cafe_owner {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface cafeDetailQuery_cafeDetail_cafe_likedUsers {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface cafeDetailQuery_cafeDetail_cafe_menus {
  __typename: "Menu";
  id: number;
  name: string;
  smallMenuImg: string | null;
  category: Category;
}

export interface cafeDetailQuery_cafeDetail_cafe_reviews_rating {
  __typename: "Rating";
  score: number;
}

export interface cafeDetailQuery_cafeDetail_cafe_reviews_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface cafeDetailQuery_cafeDetail_cafe_reviews_reply_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface cafeDetailQuery_cafeDetail_cafe_reviews_reply {
  __typename: "Reply";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  writer: cafeDetailQuery_cafeDetail_cafe_reviews_reply_writer;
}

export interface cafeDetailQuery_cafeDetail_cafe_reviews {
  __typename: "Review";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  rating: cafeDetailQuery_cafeDetail_cafe_reviews_rating | null;
  writer: cafeDetailQuery_cafeDetail_cafe_reviews_writer;
  reply: cafeDetailQuery_cafeDetail_cafe_reviews_reply[] | null;
}

export interface cafeDetailQuery_cafeDetail_cafe {
  __typename: "Cafe";
  id: number;
  name: string;
  description: string;
  originalCoverImg: string | null;
  totalScore: number;
  avgScore: number;
  createdAt: any;
  updatedAt: any;
  address: cafeDetailQuery_cafeDetail_cafe_address;
  keywords: cafeDetailQuery_cafeDetail_cafe_keywords[] | null;
  owner: cafeDetailQuery_cafeDetail_cafe_owner;
  likedUsers: cafeDetailQuery_cafeDetail_cafe_likedUsers[] | null;
  menus: cafeDetailQuery_cafeDetail_cafe_menus[] | null;
  reviews: cafeDetailQuery_cafeDetail_cafe_reviews[] | null;
}

export interface cafeDetailQuery_cafeDetail {
  __typename: "CafeDetailOutput";
  ok: boolean;
  error: string | null;
  cafe: cafeDetailQuery_cafeDetail_cafe | null;
}

export interface cafeDetailQuery {
  cafeDetail: cafeDetailQuery_cafeDetail;
}

export interface cafeDetailQueryVariables {
  input: CafeDetailInput;
}

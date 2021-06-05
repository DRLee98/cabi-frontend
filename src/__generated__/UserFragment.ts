/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole, Category } from "./globalTypes";

// ====================================================
// GraphQL fragment: UserFragment
// ====================================================

export interface UserFragment_address {
  __typename: "Address";
  id: number;
  zonecode: string;
  address: string | null;
}

export interface UserFragment_likeCafes_address {
  __typename: "Address";
  id: number;
  zonecode: string;
  address: string | null;
}

export interface UserFragment_likeCafes_keywords {
  __typename: "Keyword";
  id: number;
  name: string;
  slug: string;
}

export interface UserFragment_likeCafes_owner {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface UserFragment_likeCafes_likedUsers {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface UserFragment_likeCafes_menus {
  __typename: "Menu";
  id: number;
  name: string;
  smallMenuImg: string | null;
  category: Category;
}

export interface UserFragment_likeCafes_reviews_rating {
  __typename: "Rating";
  score: number;
}

export interface UserFragment_likeCafes_reviews_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface UserFragment_likeCafes_reviews_reply_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface UserFragment_likeCafes_reviews_reply {
  __typename: "Reply";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  writer: UserFragment_likeCafes_reviews_reply_writer;
}

export interface UserFragment_likeCafes_reviews {
  __typename: "Review";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  rating: UserFragment_likeCafes_reviews_rating | null;
  writer: UserFragment_likeCafes_reviews_writer;
  reply: UserFragment_likeCafes_reviews_reply[] | null;
}

export interface UserFragment_likeCafes {
  __typename: "Cafe";
  id: number;
  name: string;
  description: string;
  originalCoverImg: string | null;
  totalScore: number;
  avgScore: number;
  createdAt: any;
  updatedAt: any;
  address: UserFragment_likeCafes_address;
  keywords: UserFragment_likeCafes_keywords[] | null;
  owner: UserFragment_likeCafes_owner;
  likedUsers: UserFragment_likeCafes_likedUsers[] | null;
  menus: UserFragment_likeCafes_menus[] | null;
  reviews: UserFragment_likeCafes_reviews[] | null;
}

export interface UserFragment_cafes_address {
  __typename: "Address";
  id: number;
  zonecode: string;
  address: string | null;
}

export interface UserFragment_cafes_keywords {
  __typename: "Keyword";
  id: number;
  name: string;
  slug: string;
}

export interface UserFragment_cafes_owner {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface UserFragment_cafes_likedUsers {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface UserFragment_cafes_menus {
  __typename: "Menu";
  id: number;
  name: string;
  smallMenuImg: string | null;
  category: Category;
}

export interface UserFragment_cafes_reviews_rating {
  __typename: "Rating";
  score: number;
}

export interface UserFragment_cafes_reviews_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface UserFragment_cafes_reviews_reply_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface UserFragment_cafes_reviews_reply {
  __typename: "Reply";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  writer: UserFragment_cafes_reviews_reply_writer;
}

export interface UserFragment_cafes_reviews {
  __typename: "Review";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  rating: UserFragment_cafes_reviews_rating | null;
  writer: UserFragment_cafes_reviews_writer;
  reply: UserFragment_cafes_reviews_reply[] | null;
}

export interface UserFragment_cafes {
  __typename: "Cafe";
  id: number;
  name: string;
  description: string;
  originalCoverImg: string | null;
  totalScore: number;
  avgScore: number;
  createdAt: any;
  updatedAt: any;
  address: UserFragment_cafes_address;
  keywords: UserFragment_cafes_keywords[] | null;
  owner: UserFragment_cafes_owner;
  likedUsers: UserFragment_cafes_likedUsers[] | null;
  menus: UserFragment_cafes_menus[] | null;
  reviews: UserFragment_cafes_reviews[] | null;
}

export interface UserFragment_review_rating {
  __typename: "Rating";
  score: number;
}

export interface UserFragment_review_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface UserFragment_review_reply_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface UserFragment_review_reply {
  __typename: "Reply";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  writer: UserFragment_review_reply_writer;
}

export interface UserFragment_review {
  __typename: "Review";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  rating: UserFragment_review_rating | null;
  writer: UserFragment_review_writer;
  reply: UserFragment_review_reply[] | null;
}

export interface UserFragment_reply_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface UserFragment_reply {
  __typename: "Reply";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  writer: UserFragment_reply_writer;
}

export interface UserFragment {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  role: UserRole;
  smallProfileImg: string | null;
  originalProfileImg: string | null;
  createdAt: any;
  updatedAt: any;
  address: UserFragment_address;
  likeCafes: UserFragment_likeCafes[] | null;
  cafes: UserFragment_cafes[] | null;
  review: UserFragment_review[] | null;
  reply: UserFragment_reply[] | null;
}

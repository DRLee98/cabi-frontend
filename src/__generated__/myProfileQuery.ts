/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole, Category } from "./globalTypes";

// ====================================================
// GraphQL query operation: myProfileQuery
// ====================================================

export interface myProfileQuery_myProfile_user_address {
  __typename: "Address";
  id: number;
  zonecode: string;
  address: string | null;
}

export interface myProfileQuery_myProfile_user_likeCafes_address {
  __typename: "Address";
  id: number;
  zonecode: string;
  address: string | null;
}

export interface myProfileQuery_myProfile_user_likeCafes_keywords {
  __typename: "Keyword";
  id: number;
  name: string;
  slug: string;
}

export interface myProfileQuery_myProfile_user_likeCafes_owner {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface myProfileQuery_myProfile_user_likeCafes_likedUsers {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface myProfileQuery_myProfile_user_likeCafes_menus {
  __typename: "Menu";
  id: number;
  name: string;
  menuImg: string | null;
  category: Category;
}

export interface myProfileQuery_myProfile_user_likeCafes_reviews_rating {
  __typename: "Rating";
  score: number;
}

export interface myProfileQuery_myProfile_user_likeCafes_reviews_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface myProfileQuery_myProfile_user_likeCafes_reviews_reply_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface myProfileQuery_myProfile_user_likeCafes_reviews_reply {
  __typename: "Reply";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  writer: myProfileQuery_myProfile_user_likeCafes_reviews_reply_writer;
}

export interface myProfileQuery_myProfile_user_likeCafes_reviews {
  __typename: "Review";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  rating: myProfileQuery_myProfile_user_likeCafes_reviews_rating | null;
  writer: myProfileQuery_myProfile_user_likeCafes_reviews_writer;
  reply: myProfileQuery_myProfile_user_likeCafes_reviews_reply[] | null;
}

export interface myProfileQuery_myProfile_user_likeCafes {
  __typename: "Cafe";
  id: number;
  name: string;
  description: string;
  coverImg: string | null;
  totalScore: number;
  avgScore: number;
  createdAt: any;
  updatedAt: any;
  address: myProfileQuery_myProfile_user_likeCafes_address;
  keywords: myProfileQuery_myProfile_user_likeCafes_keywords[] | null;
  owner: myProfileQuery_myProfile_user_likeCafes_owner;
  likedUsers: myProfileQuery_myProfile_user_likeCafes_likedUsers[] | null;
  menus: myProfileQuery_myProfile_user_likeCafes_menus[] | null;
  reviews: myProfileQuery_myProfile_user_likeCafes_reviews[] | null;
}

export interface myProfileQuery_myProfile_user_cafes_address {
  __typename: "Address";
  id: number;
  zonecode: string;
  address: string | null;
}

export interface myProfileQuery_myProfile_user_cafes_keywords {
  __typename: "Keyword";
  id: number;
  name: string;
  slug: string;
}

export interface myProfileQuery_myProfile_user_cafes_owner {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface myProfileQuery_myProfile_user_cafes_likedUsers {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface myProfileQuery_myProfile_user_cafes_menus {
  __typename: "Menu";
  id: number;
  name: string;
  menuImg: string | null;
  category: Category;
}

export interface myProfileQuery_myProfile_user_cafes_reviews_rating {
  __typename: "Rating";
  score: number;
}

export interface myProfileQuery_myProfile_user_cafes_reviews_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface myProfileQuery_myProfile_user_cafes_reviews_reply_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface myProfileQuery_myProfile_user_cafes_reviews_reply {
  __typename: "Reply";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  writer: myProfileQuery_myProfile_user_cafes_reviews_reply_writer;
}

export interface myProfileQuery_myProfile_user_cafes_reviews {
  __typename: "Review";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  rating: myProfileQuery_myProfile_user_cafes_reviews_rating | null;
  writer: myProfileQuery_myProfile_user_cafes_reviews_writer;
  reply: myProfileQuery_myProfile_user_cafes_reviews_reply[] | null;
}

export interface myProfileQuery_myProfile_user_cafes {
  __typename: "Cafe";
  id: number;
  name: string;
  description: string;
  coverImg: string | null;
  totalScore: number;
  avgScore: number;
  createdAt: any;
  updatedAt: any;
  address: myProfileQuery_myProfile_user_cafes_address;
  keywords: myProfileQuery_myProfile_user_cafes_keywords[] | null;
  owner: myProfileQuery_myProfile_user_cafes_owner;
  likedUsers: myProfileQuery_myProfile_user_cafes_likedUsers[] | null;
  menus: myProfileQuery_myProfile_user_cafes_menus[] | null;
  reviews: myProfileQuery_myProfile_user_cafes_reviews[] | null;
}

export interface myProfileQuery_myProfile_user_review_rating {
  __typename: "Rating";
  score: number;
}

export interface myProfileQuery_myProfile_user_review_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface myProfileQuery_myProfile_user_review_reply_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface myProfileQuery_myProfile_user_review_reply {
  __typename: "Reply";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  writer: myProfileQuery_myProfile_user_review_reply_writer;
}

export interface myProfileQuery_myProfile_user_review {
  __typename: "Review";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  rating: myProfileQuery_myProfile_user_review_rating | null;
  writer: myProfileQuery_myProfile_user_review_writer;
  reply: myProfileQuery_myProfile_user_review_reply[] | null;
}

export interface myProfileQuery_myProfile_user_reply_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface myProfileQuery_myProfile_user_reply {
  __typename: "Reply";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  writer: myProfileQuery_myProfile_user_reply_writer;
}

export interface myProfileQuery_myProfile_user {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  role: UserRole;
  profileImg: string | null;
  createdAt: any;
  updatedAt: any;
  address: myProfileQuery_myProfile_user_address;
  likeCafes: myProfileQuery_myProfile_user_likeCafes[] | null;
  cafes: myProfileQuery_myProfile_user_cafes[] | null;
  review: myProfileQuery_myProfile_user_review[] | null;
  reply: myProfileQuery_myProfile_user_reply[] | null;
}

export interface myProfileQuery_myProfile {
  __typename: "UserProfileOutput";
  ok: boolean;
  error: string | null;
  user: myProfileQuery_myProfile_user | null;
}

export interface myProfileQuery {
  myProfile: myProfileQuery_myProfile;
}

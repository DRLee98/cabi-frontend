/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserProfileInput, UserRole, Category } from "./globalTypes";

// ====================================================
// GraphQL query operation: userProfileQuery
// ====================================================

export interface userProfileQuery_userProfile_user_address {
  __typename: "Address";
  id: number;
  zonecode: string;
  address: string | null;
}

export interface userProfileQuery_userProfile_user_likeCafes_address {
  __typename: "Address";
  id: number;
  zonecode: string;
  address: string | null;
}

export interface userProfileQuery_userProfile_user_likeCafes_keywords {
  __typename: "Keyword";
  id: number;
  name: string;
  slug: string;
}

export interface userProfileQuery_userProfile_user_likeCafes_owner {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface userProfileQuery_userProfile_user_likeCafes_likedUsers {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface userProfileQuery_userProfile_user_likeCafes_menus {
  __typename: "Menu";
  id: number;
  name: string;
  smallMenuImg: string | null;
  category: Category;
}

export interface userProfileQuery_userProfile_user_likeCafes_reviews_rating {
  __typename: "Rating";
  score: number;
}

export interface userProfileQuery_userProfile_user_likeCafes_reviews_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface userProfileQuery_userProfile_user_likeCafes_reviews_reply_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface userProfileQuery_userProfile_user_likeCafes_reviews_reply {
  __typename: "Reply";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  writer: userProfileQuery_userProfile_user_likeCafes_reviews_reply_writer;
}

export interface userProfileQuery_userProfile_user_likeCafes_reviews {
  __typename: "Review";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  rating: userProfileQuery_userProfile_user_likeCafes_reviews_rating | null;
  writer: userProfileQuery_userProfile_user_likeCafes_reviews_writer;
  reply: userProfileQuery_userProfile_user_likeCafes_reviews_reply[] | null;
}

export interface userProfileQuery_userProfile_user_likeCafes {
  __typename: "Cafe";
  id: number;
  name: string;
  description: string;
  originalCoverImg: string | null;
  totalScore: number;
  avgScore: number;
  createdAt: any;
  updatedAt: any;
  address: userProfileQuery_userProfile_user_likeCafes_address;
  keywords: userProfileQuery_userProfile_user_likeCafes_keywords[] | null;
  owner: userProfileQuery_userProfile_user_likeCafes_owner;
  likedUsers: userProfileQuery_userProfile_user_likeCafes_likedUsers[] | null;
  menus: userProfileQuery_userProfile_user_likeCafes_menus[] | null;
  reviews: userProfileQuery_userProfile_user_likeCafes_reviews[] | null;
}

export interface userProfileQuery_userProfile_user_cafes_address {
  __typename: "Address";
  id: number;
  zonecode: string;
  address: string | null;
}

export interface userProfileQuery_userProfile_user_cafes_keywords {
  __typename: "Keyword";
  id: number;
  name: string;
  slug: string;
}

export interface userProfileQuery_userProfile_user_cafes_owner {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface userProfileQuery_userProfile_user_cafes_likedUsers {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface userProfileQuery_userProfile_user_cafes_menus {
  __typename: "Menu";
  id: number;
  name: string;
  smallMenuImg: string | null;
  category: Category;
}

export interface userProfileQuery_userProfile_user_cafes_reviews_rating {
  __typename: "Rating";
  score: number;
}

export interface userProfileQuery_userProfile_user_cafes_reviews_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface userProfileQuery_userProfile_user_cafes_reviews_reply_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface userProfileQuery_userProfile_user_cafes_reviews_reply {
  __typename: "Reply";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  writer: userProfileQuery_userProfile_user_cafes_reviews_reply_writer;
}

export interface userProfileQuery_userProfile_user_cafes_reviews {
  __typename: "Review";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  rating: userProfileQuery_userProfile_user_cafes_reviews_rating | null;
  writer: userProfileQuery_userProfile_user_cafes_reviews_writer;
  reply: userProfileQuery_userProfile_user_cafes_reviews_reply[] | null;
}

export interface userProfileQuery_userProfile_user_cafes {
  __typename: "Cafe";
  id: number;
  name: string;
  description: string;
  originalCoverImg: string | null;
  totalScore: number;
  avgScore: number;
  createdAt: any;
  updatedAt: any;
  address: userProfileQuery_userProfile_user_cafes_address;
  keywords: userProfileQuery_userProfile_user_cafes_keywords[] | null;
  owner: userProfileQuery_userProfile_user_cafes_owner;
  likedUsers: userProfileQuery_userProfile_user_cafes_likedUsers[] | null;
  menus: userProfileQuery_userProfile_user_cafes_menus[] | null;
  reviews: userProfileQuery_userProfile_user_cafes_reviews[] | null;
}

export interface userProfileQuery_userProfile_user_review_rating {
  __typename: "Rating";
  score: number;
}

export interface userProfileQuery_userProfile_user_review_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface userProfileQuery_userProfile_user_review_reply_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface userProfileQuery_userProfile_user_review_reply {
  __typename: "Reply";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  writer: userProfileQuery_userProfile_user_review_reply_writer;
}

export interface userProfileQuery_userProfile_user_review {
  __typename: "Review";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  rating: userProfileQuery_userProfile_user_review_rating | null;
  writer: userProfileQuery_userProfile_user_review_writer;
  reply: userProfileQuery_userProfile_user_review_reply[] | null;
}

export interface userProfileQuery_userProfile_user_reply_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface userProfileQuery_userProfile_user_reply {
  __typename: "Reply";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  writer: userProfileQuery_userProfile_user_reply_writer;
}

export interface userProfileQuery_userProfile_user {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  role: UserRole;
  smallProfileImg: string | null;
  originalProfileImg: string | null;
  createdAt: any;
  updatedAt: any;
  address: userProfileQuery_userProfile_user_address;
  likeCafes: userProfileQuery_userProfile_user_likeCafes[] | null;
  cafes: userProfileQuery_userProfile_user_cafes[] | null;
  review: userProfileQuery_userProfile_user_review[] | null;
  reply: userProfileQuery_userProfile_user_reply[] | null;
}

export interface userProfileQuery_userProfile {
  __typename: "UserProfileOutput";
  ok: boolean;
  error: string | null;
  user: userProfileQuery_userProfile_user | null;
}

export interface userProfileQuery {
  userProfile: userProfileQuery_userProfile;
}

export interface userProfileQueryVariables {
  input: UserProfileInput;
}

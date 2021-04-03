/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole, Category } from "./globalTypes";

// ====================================================
// GraphQL query operation: myProfile
// ====================================================

export interface myProfile_myProfile_user_address {
  __typename: "Address";
  id: number;
  zonecode: string;
  address: string | null;
}

export interface myProfile_myProfile_user_likeCafes_address {
  __typename: "Address";
  id: number;
  zonecode: string;
  address: string | null;
}

export interface myProfile_myProfile_user_likeCafes_keywords {
  __typename: "Keyword";
  name: string;
}

export interface myProfile_myProfile_user_likeCafes_owner {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface myProfile_myProfile_user_likeCafes_likedUsers {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface myProfile_myProfile_user_likeCafes_menus_nutrient {
  __typename: "Nutrient";
  id: number;
  volume: number | null;
  calorie: number | null;
  salt: number | null;
  carbohydrate: number | null;
  sugars: number | null;
  fat: number | null;
  transFat: number | null;
  saturatedFat: number | null;
  cholesterol: number | null;
  protein: number | null;
}

export interface myProfile_myProfile_user_likeCafes_menus_reviews_rating {
  __typename: "Rating";
  score: number;
}

export interface myProfile_myProfile_user_likeCafes_menus_reviews_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface myProfile_myProfile_user_likeCafes_menus_reviews_reply_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface myProfile_myProfile_user_likeCafes_menus_reviews_reply {
  __typename: "Reply";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  writer: myProfile_myProfile_user_likeCafes_menus_reviews_reply_writer;
}

export interface myProfile_myProfile_user_likeCafes_menus_reviews {
  __typename: "Review";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  rating: myProfile_myProfile_user_likeCafes_menus_reviews_rating | null;
  writer: myProfile_myProfile_user_likeCafes_menus_reviews_writer;
  reply: myProfile_myProfile_user_likeCafes_menus_reviews_reply[] | null;
}

export interface myProfile_myProfile_user_likeCafes_menus {
  __typename: "Menu";
  id: number;
  name: string;
  description: string;
  price: number;
  menuImg: string | null;
  category: Category;
  totalScore: number;
  avgScore: number;
  createdAt: any;
  updatedAt: any;
  nutrient: myProfile_myProfile_user_likeCafes_menus_nutrient | null;
  reviews: myProfile_myProfile_user_likeCafes_menus_reviews[] | null;
}

export interface myProfile_myProfile_user_likeCafes_reviews_rating {
  __typename: "Rating";
  score: number;
}

export interface myProfile_myProfile_user_likeCafes_reviews_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface myProfile_myProfile_user_likeCafes_reviews_reply_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface myProfile_myProfile_user_likeCafes_reviews_reply {
  __typename: "Reply";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  writer: myProfile_myProfile_user_likeCafes_reviews_reply_writer;
}

export interface myProfile_myProfile_user_likeCafes_reviews {
  __typename: "Review";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  rating: myProfile_myProfile_user_likeCafes_reviews_rating | null;
  writer: myProfile_myProfile_user_likeCafes_reviews_writer;
  reply: myProfile_myProfile_user_likeCafes_reviews_reply[] | null;
}

export interface myProfile_myProfile_user_likeCafes {
  __typename: "Cafe";
  id: number;
  name: string;
  description: string;
  coverImg: string | null;
  totalScore: number;
  avgScore: number;
  createdAt: any;
  updatedAt: any;
  address: myProfile_myProfile_user_likeCafes_address;
  keywords: myProfile_myProfile_user_likeCafes_keywords[] | null;
  owner: myProfile_myProfile_user_likeCafes_owner;
  likedUsers: myProfile_myProfile_user_likeCafes_likedUsers[] | null;
  menus: myProfile_myProfile_user_likeCafes_menus[] | null;
  reviews: myProfile_myProfile_user_likeCafes_reviews[] | null;
}

export interface myProfile_myProfile_user_cafes_address {
  __typename: "Address";
  id: number;
  zonecode: string;
  address: string | null;
}

export interface myProfile_myProfile_user_cafes_keywords {
  __typename: "Keyword";
  name: string;
}

export interface myProfile_myProfile_user_cafes_owner {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface myProfile_myProfile_user_cafes_likedUsers {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface myProfile_myProfile_user_cafes_menus_nutrient {
  __typename: "Nutrient";
  id: number;
  volume: number | null;
  calorie: number | null;
  salt: number | null;
  carbohydrate: number | null;
  sugars: number | null;
  fat: number | null;
  transFat: number | null;
  saturatedFat: number | null;
  cholesterol: number | null;
  protein: number | null;
}

export interface myProfile_myProfile_user_cafes_menus_reviews_rating {
  __typename: "Rating";
  score: number;
}

export interface myProfile_myProfile_user_cafes_menus_reviews_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface myProfile_myProfile_user_cafes_menus_reviews_reply_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface myProfile_myProfile_user_cafes_menus_reviews_reply {
  __typename: "Reply";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  writer: myProfile_myProfile_user_cafes_menus_reviews_reply_writer;
}

export interface myProfile_myProfile_user_cafes_menus_reviews {
  __typename: "Review";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  rating: myProfile_myProfile_user_cafes_menus_reviews_rating | null;
  writer: myProfile_myProfile_user_cafes_menus_reviews_writer;
  reply: myProfile_myProfile_user_cafes_menus_reviews_reply[] | null;
}

export interface myProfile_myProfile_user_cafes_menus {
  __typename: "Menu";
  id: number;
  name: string;
  description: string;
  price: number;
  menuImg: string | null;
  category: Category;
  totalScore: number;
  avgScore: number;
  createdAt: any;
  updatedAt: any;
  nutrient: myProfile_myProfile_user_cafes_menus_nutrient | null;
  reviews: myProfile_myProfile_user_cafes_menus_reviews[] | null;
}

export interface myProfile_myProfile_user_cafes_reviews_rating {
  __typename: "Rating";
  score: number;
}

export interface myProfile_myProfile_user_cafes_reviews_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface myProfile_myProfile_user_cafes_reviews_reply_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface myProfile_myProfile_user_cafes_reviews_reply {
  __typename: "Reply";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  writer: myProfile_myProfile_user_cafes_reviews_reply_writer;
}

export interface myProfile_myProfile_user_cafes_reviews {
  __typename: "Review";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  rating: myProfile_myProfile_user_cafes_reviews_rating | null;
  writer: myProfile_myProfile_user_cafes_reviews_writer;
  reply: myProfile_myProfile_user_cafes_reviews_reply[] | null;
}

export interface myProfile_myProfile_user_cafes {
  __typename: "Cafe";
  id: number;
  name: string;
  description: string;
  coverImg: string | null;
  totalScore: number;
  avgScore: number;
  createdAt: any;
  updatedAt: any;
  address: myProfile_myProfile_user_cafes_address;
  keywords: myProfile_myProfile_user_cafes_keywords[] | null;
  owner: myProfile_myProfile_user_cafes_owner;
  likedUsers: myProfile_myProfile_user_cafes_likedUsers[] | null;
  menus: myProfile_myProfile_user_cafes_menus[] | null;
  reviews: myProfile_myProfile_user_cafes_reviews[] | null;
}

export interface myProfile_myProfile_user_review_rating {
  __typename: "Rating";
  score: number;
}

export interface myProfile_myProfile_user_review_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface myProfile_myProfile_user_review_reply_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface myProfile_myProfile_user_review_reply {
  __typename: "Reply";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  writer: myProfile_myProfile_user_review_reply_writer;
}

export interface myProfile_myProfile_user_review {
  __typename: "Review";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  rating: myProfile_myProfile_user_review_rating | null;
  writer: myProfile_myProfile_user_review_writer;
  reply: myProfile_myProfile_user_review_reply[] | null;
}

export interface myProfile_myProfile_user_reply_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface myProfile_myProfile_user_reply {
  __typename: "Reply";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  writer: myProfile_myProfile_user_reply_writer;
}

export interface myProfile_myProfile_user {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  role: UserRole;
  profileImg: string | null;
  createdAt: any;
  updatedAt: any;
  address: myProfile_myProfile_user_address;
  likeCafes: myProfile_myProfile_user_likeCafes[] | null;
  cafes: myProfile_myProfile_user_cafes[] | null;
  review: myProfile_myProfile_user_review[] | null;
  reply: myProfile_myProfile_user_reply[] | null;
}

export interface myProfile_myProfile {
  __typename: "UserProfileOutput";
  ok: boolean;
  error: string | null;
  user: myProfile_myProfile_user | null;
}

export interface myProfile {
  myProfile: myProfile_myProfile;
}

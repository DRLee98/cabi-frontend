/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Category } from "./globalTypes";

// ====================================================
// GraphQL fragment: CafeFragment
// ====================================================

export interface CafeFragment_address {
  __typename: "Address";
  id: number;
  zonecode: string;
  address: string | null;
}

export interface CafeFragment_keywords {
  __typename: "Keyword";
  name: string;
}

export interface CafeFragment_owner {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface CafeFragment_likedUsers {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface CafeFragment_menus_nutrient {
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

export interface CafeFragment_menus_reviews_rating {
  __typename: "Rating";
  score: number;
}

export interface CafeFragment_menus_reviews_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface CafeFragment_menus_reviews_reply_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface CafeFragment_menus_reviews_reply {
  __typename: "Reply";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  writer: CafeFragment_menus_reviews_reply_writer;
}

export interface CafeFragment_menus_reviews {
  __typename: "Review";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  rating: CafeFragment_menus_reviews_rating | null;
  writer: CafeFragment_menus_reviews_writer;
  reply: CafeFragment_menus_reviews_reply[] | null;
}

export interface CafeFragment_menus {
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
  nutrient: CafeFragment_menus_nutrient | null;
  reviews: CafeFragment_menus_reviews[] | null;
}

export interface CafeFragment_reviews_rating {
  __typename: "Rating";
  score: number;
}

export interface CafeFragment_reviews_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface CafeFragment_reviews_reply_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface CafeFragment_reviews_reply {
  __typename: "Reply";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  writer: CafeFragment_reviews_reply_writer;
}

export interface CafeFragment_reviews {
  __typename: "Review";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  rating: CafeFragment_reviews_rating | null;
  writer: CafeFragment_reviews_writer;
  reply: CafeFragment_reviews_reply[] | null;
}

export interface CafeFragment {
  __typename: "Cafe";
  id: number;
  name: string;
  description: string;
  coverImg: string | null;
  totalScore: number;
  avgScore: number;
  createdAt: any;
  updatedAt: any;
  address: CafeFragment_address;
  keywords: CafeFragment_keywords[] | null;
  owner: CafeFragment_owner;
  likedUsers: CafeFragment_likedUsers[] | null;
  menus: CafeFragment_menus[] | null;
  reviews: CafeFragment_reviews[] | null;
}

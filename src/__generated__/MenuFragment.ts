/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Category } from "./globalTypes";

// ====================================================
// GraphQL fragment: MenuFragment
// ====================================================

export interface MenuFragment_nutrient {
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

export interface MenuFragment_reviews_rating {
  __typename: "Rating";
  score: number;
}

export interface MenuFragment_reviews_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface MenuFragment_reviews_reply_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface MenuFragment_reviews_reply {
  __typename: "Reply";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  writer: MenuFragment_reviews_reply_writer;
}

export interface MenuFragment_reviews {
  __typename: "Review";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  rating: MenuFragment_reviews_rating | null;
  writer: MenuFragment_reviews_writer;
  reply: MenuFragment_reviews_reply[] | null;
}

export interface MenuFragment {
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
  nutrient: MenuFragment_nutrient | null;
  reviews: MenuFragment_reviews[] | null;
}

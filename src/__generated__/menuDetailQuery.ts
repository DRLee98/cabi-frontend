/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MenuDetailInput, Category } from "./globalTypes";

// ====================================================
// GraphQL query operation: menuDetailQuery
// ====================================================

export interface menuDetailQuery_menuDetail_menu_options_optionItems {
  __typename: "OptionItem";
  name: string;
  price: number | null;
}

export interface menuDetailQuery_menuDetail_menu_options {
  __typename: "Option";
  name: string;
  price: number | null;
  optionItems: menuDetailQuery_menuDetail_menu_options_optionItems[] | null;
}

export interface menuDetailQuery_menuDetail_menu_nutrient {
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

export interface menuDetailQuery_menuDetail_menu_reviews_rating {
  __typename: "Rating";
  score: number;
}

export interface menuDetailQuery_menuDetail_menu_reviews_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface menuDetailQuery_menuDetail_menu_reviews_reply_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  profileImg: string | null;
}

export interface menuDetailQuery_menuDetail_menu_reviews_reply {
  __typename: "Reply";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  writer: menuDetailQuery_menuDetail_menu_reviews_reply_writer;
}

export interface menuDetailQuery_menuDetail_menu_reviews {
  __typename: "Review";
  id: number;
  contents: string;
  createdAt: any;
  updatedAt: any;
  rating: menuDetailQuery_menuDetail_menu_reviews_rating | null;
  writer: menuDetailQuery_menuDetail_menu_reviews_writer;
  reply: menuDetailQuery_menuDetail_menu_reviews_reply[] | null;
}

export interface menuDetailQuery_menuDetail_menu {
  __typename: "Menu";
  id: number;
  name: string;
  description: string;
  price: number;
  menuImg: string | null;
  ownerId: number | null;
  category: Category;
  totalScore: number;
  avgScore: number;
  createdAt: any;
  updatedAt: any;
  options: menuDetailQuery_menuDetail_menu_options[] | null;
  nutrient: menuDetailQuery_menuDetail_menu_nutrient | null;
  reviews: menuDetailQuery_menuDetail_menu_reviews[] | null;
}

export interface menuDetailQuery_menuDetail {
  __typename: "MenuDetailOutput";
  ok: boolean;
  error: string | null;
  menu: menuDetailQuery_menuDetail_menu | null;
}

export interface menuDetailQuery {
  menuDetail: menuDetailQuery_menuDetail;
}

export interface menuDetailQueryVariables {
  input: MenuDetailInput;
}

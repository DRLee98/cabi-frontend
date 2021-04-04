/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Category {
  Beverage = "Beverage",
  Bread = "Bread",
  Etc = "Etc",
  Goods = "Goods",
  Meal = "Meal",
}

export enum UserRole {
  Client = "Client",
  Owner = "Owner",
}

export interface AddressInputType {
  zonecode: string;
  address?: string | null;
  sido?: string | null;
  sigungu?: string | null;
  sigunguCode?: string | null;
  bname?: string | null;
  lat?: number | null;
  lng?: number | null;
  user?: UserInputType | null;
  cafe?: CafeInputType | null;
}

export interface CafeInputType {
  name: string;
  description: string;
  coverImg?: string | null;
  address: AddressInputType;
  keywords?: KeywordInputType[] | null;
  owner: UserInputType;
  likedUsers?: UserInputType[] | null;
  menus?: MenuInputType[] | null;
  reviews?: ReviewInputType[] | null;
  ratings?: RatingInputType[] | null;
  totalScore: number;
  avgScore: number;
}

export interface CreateAccountInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  address: AddressInputType;
}

export interface KeywordInputType {
  name: string;
  slug: string;
  cafes?: CafeInputType[] | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface MenuInputType {
  name: string;
  description: string;
  price: number;
  menuImg?: string | null;
  category: Category;
  cafe: CafeInputType;
  nutrient?: NutrientInputType | null;
  options?: OptionInputType[] | null;
  reviews?: ReviewInputType[] | null;
  ratings?: RatingInputType[] | null;
  totalScore: number;
  avgScore: number;
}

export interface NutrientInputType {
  volume?: number | null;
  calorie?: number | null;
  salt?: number | null;
  carbohydrate?: number | null;
  sugars?: number | null;
  fat?: number | null;
  transFat?: number | null;
  saturatedFat?: number | null;
  cholesterol?: number | null;
  protein?: number | null;
  menu: MenuInputType;
}

export interface OptionInputType {
  name: string;
  price?: number | null;
  optionItems?: OptionItemInputType[] | null;
}

export interface OptionItemInputType {
  name: string;
  price?: number | null;
}

export interface RatingInputType {
  score: number;
  review: ReviewInputType;
  cafe?: CafeInputType | null;
  menu?: MenuInputType | null;
}

export interface ReplyInputType {
  contents: string;
  review: ReviewInputType;
  writer: UserInputType;
}

export interface ReviewInputType {
  contents: string;
  rating?: RatingInputType | null;
  writer: UserInputType;
  reply?: ReplyInputType[] | null;
  cafe?: CafeInputType | null;
  menu?: MenuInputType | null;
}

export interface UserInputType {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  profileImg?: string | null;
  address: AddressInputType;
  cafes?: CafeInputType[] | null;
  likeCafes?: CafeInputType[] | null;
  review?: ReviewInputType[] | null;
  reply?: ReplyInputType[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================

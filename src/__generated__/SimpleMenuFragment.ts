/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Category } from "./globalTypes";

// ====================================================
// GraphQL fragment: SimpleMenuFragment
// ====================================================

export interface SimpleMenuFragment {
  __typename: "Menu";
  id: number;
  name: string;
  smallMenuImg: string | null;
  category: Category;
  price: number;
}

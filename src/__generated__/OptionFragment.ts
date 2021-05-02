/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OptionFragment
// ====================================================

export interface OptionFragment_optionItems {
  __typename: "OptionItem";
  name: string;
  price: number | null;
}

export interface OptionFragment {
  __typename: "Option";
  name: string;
  price: number | null;
  optionItems: OptionFragment_optionItems[] | null;
}

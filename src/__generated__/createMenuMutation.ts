/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateMenuInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createMenuMutation
// ====================================================

export interface createMenuMutation_createMenu {
  __typename: "CreateMenuOutput";
  ok: boolean;
  error: string | null;
  menuId: number | null;
}

export interface createMenuMutation {
  createMenu: createMenuMutation_createMenu;
}

export interface createMenuMutationVariables {
  input: CreateMenuInput;
}

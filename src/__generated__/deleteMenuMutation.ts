/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteMenuInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteMenuMutation
// ====================================================

export interface deleteMenuMutation_deleteMenu {
  __typename: "DeleteMenuOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteMenuMutation {
  deleteMenu: deleteMenuMutation_deleteMenu;
}

export interface deleteMenuMutationVariables {
  input: DeleteMenuInput;
}

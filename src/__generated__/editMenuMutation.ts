/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditMenuInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editMenuMutation
// ====================================================

export interface editMenuMutation_editMenu {
  __typename: "EditMenuOutput";
  ok: boolean;
  error: string | null;
}

export interface editMenuMutation {
  editMenu: editMenuMutation_editMenu;
}

export interface editMenuMutationVariables {
  input: EditMenuInput;
}

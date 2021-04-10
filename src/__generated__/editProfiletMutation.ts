/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditProfileInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editProfiletMutation
// ====================================================

export interface editProfiletMutation_editProfile {
  __typename: "EditProfileOutput";
  ok: boolean;
  error: string | null;
}

export interface editProfiletMutation {
  editProfile: editProfiletMutation_editProfile;
}

export interface editProfiletMutationVariables {
  input: EditProfileInput;
}

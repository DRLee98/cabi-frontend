/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListenExitUserInput } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: listenExitUserSubscription
// ====================================================

export interface listenExitUserSubscription_listenExitUser {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface listenExitUserSubscription {
  listenExitUser: listenExitUserSubscription_listenExitUser;
}

export interface listenExitUserSubscriptionVariables {
  input: ListenExitUserInput;
}

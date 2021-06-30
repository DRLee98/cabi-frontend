/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListenEntranceUserInput } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: listenEntranceUserSubscription
// ====================================================

export interface listenEntranceUserSubscription_listenEntranceUser {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface listenEntranceUserSubscription {
  listenEntranceUser: listenEntranceUserSubscription_listenEntranceUser;
}

export interface listenEntranceUserSubscriptionVariables {
  input: ListenEntranceUserInput;
}

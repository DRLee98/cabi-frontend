/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListenNewMessageInput, MessageType } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: listenNewMessageSubscription
// ====================================================

export interface listenNewMessageSubscription_listenNewMessage_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface listenNewMessageSubscription_listenNewMessage {
  __typename: "Message";
  id: number;
  type: MessageType;
  context: string;
  createdAt: any;
  writer: listenNewMessageSubscription_listenNewMessage_writer | null;
}

export interface listenNewMessageSubscription {
  listenNewMessage: listenNewMessageSubscription_listenNewMessage;
}

export interface listenNewMessageSubscriptionVariables {
  input: ListenNewMessageInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MessageType } from "./globalTypes";

// ====================================================
// GraphQL fragment: MessageFragment
// ====================================================

export interface MessageFragment_writer {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface MessageFragment {
  __typename: "Message";
  id: number;
  type: MessageType;
  context: string;
  createdAt: any;
  writer: MessageFragment_writer | null;
}

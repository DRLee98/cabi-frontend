/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RankCafeFragment
// ====================================================

export interface RankCafeFragment_likedUsers {
  __typename: "User";
  id: number;
}

export interface RankCafeFragment_address {
  __typename: "Address";
  id: number;
  zonecode: string;
  address: string | null;
  lat: number | null;
  lng: number | null;
}

export interface RankCafeFragment {
  __typename: "Cafe";
  id: number;
  name: string;
  originalCoverImg: string | null;
  totalScore: number;
  avgScore: number;
  createdAt: any;
  updatedAt: any;
  likedUsers: RankCafeFragment_likedUsers[] | null;
  address: RankCafeFragment_address;
}

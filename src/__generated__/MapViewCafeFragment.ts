/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MapViewCafeFragment
// ====================================================

export interface MapViewCafeFragment_owner {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface MapViewCafeFragment_likedUsers {
  __typename: "User";
  id: number;
}

export interface MapViewCafeFragment_address {
  __typename: "Address";
  id: number;
  zonecode: string;
  address: string | null;
  lat: number | null;
  lng: number | null;
}

export interface MapViewCafeFragment {
  __typename: "Cafe";
  id: number;
  name: string;
  smallCoverImg: string | null;
  totalScore: number;
  avgScore: number;
  owner: MapViewCafeFragment_owner;
  likedUsers: MapViewCafeFragment_likedUsers[] | null;
  address: MapViewCafeFragment_address;
}

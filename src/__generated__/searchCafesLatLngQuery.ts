/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchCafesLatLngInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchCafesLatLngQuery
// ====================================================

export interface searchCafesLatLngQuery_searchCafesLatLng_cafes_owner {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  smallProfileImg: string | null;
}

export interface searchCafesLatLngQuery_searchCafesLatLng_cafes_likedUsers {
  __typename: "User";
  id: number;
}

export interface searchCafesLatLngQuery_searchCafesLatLng_cafes_address {
  __typename: "Address";
  id: number;
  zonecode: string;
  address: string | null;
  lat: number | null;
  lng: number | null;
}

export interface searchCafesLatLngQuery_searchCafesLatLng_cafes {
  __typename: "Cafe";
  id: number;
  name: string;
  smallCoverImg: string | null;
  totalScore: number;
  avgScore: number;
  owner: searchCafesLatLngQuery_searchCafesLatLng_cafes_owner;
  likedUsers: searchCafesLatLngQuery_searchCafesLatLng_cafes_likedUsers[] | null;
  address: searchCafesLatLngQuery_searchCafesLatLng_cafes_address;
}

export interface searchCafesLatLngQuery_searchCafesLatLng {
  __typename: "SearchCafesLatLngOutput";
  ok: boolean;
  error: string | null;
  cafes: searchCafesLatLngQuery_searchCafesLatLng_cafes[] | null;
}

export interface searchCafesLatLngQuery {
  searchCafesLatLng: searchCafesLatLngQuery_searchCafesLatLng;
}

export interface searchCafesLatLngQueryVariables {
  input: SearchCafesLatLngInput;
}

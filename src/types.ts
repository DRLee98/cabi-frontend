import { AddressData } from "react-daum-postcode";

export type NewAddressData = AddressData & {
  lat: string;
  lng: string;
};

export type LatLng = {
  lat: number;
  lng: number;
};

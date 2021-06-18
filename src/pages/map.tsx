import React, { useEffect, useState } from "react";
import { Container } from "components/styledComponent";
import styled from "styled-components";
import { KakaoMapView } from "api/kakaoMap";
import { UserFragment } from "__generated__/UserFragment";
import { searchCafesLatLngQuery } from "__generated__/searchCafesLatLngQuery";
import { MAP_VIEW_CAFE_FRAGMENT } from "fragments";
import { gql, useLazyQuery, useQuery } from "@apollo/client";

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  margin: 5vh 0;
`;

const SearchBtn = styled.button`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  color: ${(prop) => prop.theme.keywordBgColor};
  background-color: ${(prop) => prop.theme.keywordColor};
  padding: 8px 20px;
  border: 2px solid ${(prop) => prop.theme.keywordBgColor};
  border-radius: 999px;
  transition: all 0.2s ease;
  cursor: pointer;
  &:hover {
    color: ${(prop) => prop.theme.keywordColor};
    background-color: ${(prop) => prop.theme.keywordBgColor};
  }
`;

const SEARCH_CAFES_LATLNG_QUERY = gql`
  query searchCafesLatLngQuery($input: SearchCafesLatLngInput!) {
    searchCafesLatLng(input: $input) {
      ok
      error
      cafes {
        ...MapViewCafeFragment
      }
    }
  }
  ${MAP_VIEW_CAFE_FRAGMENT}
`;

interface Bounds {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface MapProp {
  user: UserFragment | null | undefined;
}

export const Map: React.FC<MapProp> = ({ user }) => {
  const userAddress = user?.address;
  let latlng = { lat: 37.537183, lng: 127.005454 };
  if (userAddress && userAddress.lat && userAddress.lng) {
    latlng = { lat: userAddress.lat, lng: userAddress.lng };
  } else {
    navigator.geolocation.getCurrentPosition((pos) => {
      latlng = { lat: pos.coords.latitude, lng: pos.coords.longitude };
    });
  }
  const [bounds, setBounds] = useState<Bounds>();
  const getBounds = (bounds: Bounds) => setBounds(bounds);

  const [searchCafe, { data, loading }] = useLazyQuery<searchCafesLatLngQuery>(
    SEARCH_CAFES_LATLNG_QUERY,
  );

  const cafes = data?.searchCafesLatLng.cafes || [];

  const currentPositionSearch = () => {
    if (bounds) {
      searchCafe({
        variables: {
          input: {
            top: bounds.top,
            bottom: bounds.bottom,
            left: bounds.left,
            right: bounds.right,
          },
        },
      });
    }
  };

  return (
    <Container>
      <MapContainer>
        <SearchBtn onClick={currentPositionSearch}>
          현재 위치에서 검색
        </SearchBtn>
        <KakaoMapView
          latlng={latlng}
          cafes={cafes}
          getBounds={getBounds}
          loading={loading}
        />
      </MapContainer>
    </Container>
  );
};

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, CoverImage } from "components/styledComponent";
import styled from "styled-components";
import { KakaoMapView } from "api/kakaoMap";
import { UserFragment } from "__generated__/UserFragment";
import { searchCafesLatLngQuery } from "__generated__/searchCafesLatLngQuery";
import { MAP_VIEW_CAFE_FRAGMENT } from "fragments";
import { gql, useLazyQuery } from "@apollo/client";
import { Score } from "components/score";

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

const CafeList = styled.ul`
  position: absolute;
  width: 15vw;
  height: 70vh;
  margin: 5vh 0;
  padding: 10px 0;
  left: -100px;
  top: 0;
  border-radius: 5px;
  background-color: ${(prop) => prop.theme.whiteColor};
  box-shadow: 0 2px 4px 1px rgb(0 0 0 / 12%);
  z-index: 5;
`;

const CafeItem = styled.li`
  & + & {
    border-top: 1px solid ${(prop) => prop.theme.disablelightBgColor};
  }
  &:hover {
    background-color: ${(prop) => prop.theme.signaturelightBgColor};
  }
  transition: background-color 0.2s ease;
  cursor: pointer;
`;

const CafeLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;
  height: 90px;
`;

const CoverImageBox = styled.div`
  width: 35%;
  height: 100%;
`;

const ContentsBox = styled.div`
  font-size: 12px;
  margin-left: 5px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const CafeName = styled.strong`
  font-size: 17px;
`;

const CafeAddress = styled.address`
  font-weight: normal;
  color: gray;
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

let firstCall = true;

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

  const [markers, setMarkers] = useState<[]>();
  const getMarkers = (markers: []) => setMarkers(markers);

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

  useEffect(() => {
    if (firstCall && bounds) {
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
      firstCall = false;
    }
  }, [bounds]);

  const MOUSE_OVER = "MOUSE_OVER";
  const MOUSE_OUT = "MOUSE_OUT";

  const handleMouseEvent = (i: number, eventType: string) => {
    if (markers) {
      const {
        xd: {
          previousSibling: { previousSibling: markerImg },
        },
      }: { xd: { previousSibling: { previousSibling: Element } } } = markers[i];
      const style = eventType === MOUSE_OVER ? "filter:hue-rotate(45deg);" : "";

      markerImg.setAttribute("style", style);
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
          getMarkers={getMarkers}
          loading={loading}
        />
        <CafeList>
          {cafes.map((cafe, i) => (
            <CafeItem
              key={cafe.id}
              onMouseOver={() => {
                handleMouseEvent(i, MOUSE_OVER);
              }}
              onMouseOut={() => {
                handleMouseEvent(i, MOUSE_OUT);
              }}
            >
              <CafeLink to={`/cafe/${cafe.id}`}>
                <CoverImageBox>
                  <CoverImage src={cafe.smallCoverImg || ""} />
                </CoverImageBox>
                <ContentsBox>
                  <CafeName>{cafe.name}</CafeName>
                  <CafeAddress>{cafe.address.address}</CafeAddress>
                  <Score
                    totalScore={cafe.totalScore}
                    avgScore={cafe.avgScore}
                    likedUsers={cafe.likedUsers?.length || 0}
                  />
                </ContentsBox>
              </CafeLink>
            </CafeItem>
          ))}
        </CafeList>
      </MapContainer>
    </Container>
  );
};

import React, { useEffect } from "react";
import styled from "styled-components";
import { LatLng } from "types";
import { MapViewCafeFragment } from "__generated__/MapViewCafeFragment";
import { AddressFragment } from "__generated__/AddressFragment";
import { Overlay } from "api/overlay";

const Map = styled.div`
  width: 100%;
  height: 100%;
`;

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapViewProp {
  latlng: LatLng;
  cafes: MapViewCafeFragment[];
  getBounds: Function;
  getMarkers: Function;
  loading: boolean;
}

interface KakaoMapProp {
  address?: AddressFragment;
}

export const getLatLng = async (
  address: string,
): Promise<{ lat?: number; lng?: number }> => {
  let lat: number, lng: number;
  const geocoder = new window.kakao.maps.services.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.addressSearch(address, function (result: any, status: any) {
      // 정상적으로 검색이 완료됐으면
      if (status === window.kakao.maps.services.Status.OK) {
        lat = result[0].y;
        lng = result[0].x;
        resolve({ lat, lng });
      }
    });
  });
};

let map: any;
let markers: any[] = [];
let overlay: any;

const hideOverlay = () => {
  overlay.setMap(null);
};

export const KakaoMapView: React.FC<KakaoMapViewProp> = ({
  latlng,
  cafes,
  getBounds,
  getMarkers,
  loading,
}) => {
  const showOverlay = (cafe: MapViewCafeFragment, position: LatLng) => {
    if (overlay) {
      hideOverlay();
    }

    const content = Overlay(cafe);

    overlay = new window.kakao.maps.CustomOverlay({
      content,
      map,
      position,
    });

    overlay.setMap(map);

    const overlayCloseBtn = document.getElementById("overlayCloseBtn");
    overlayCloseBtn?.addEventListener("click", hideOverlay);
  };

  const addMarker = (position: LatLng) => {
    const marker = new window.kakao.maps.Marker({
      position,
    });

    marker.setMap(map);
    markers.push(marker);

    return marker;
  };

  const setMarker = () => {
    if (overlay) {
      overlay.setMap(null);
    }
    markers.forEach((marker) => marker.setMap(null));
    markers = [];

    cafes?.forEach((cafe) => {
      const lat = cafe.address.lat;
      const lng = cafe.address.lng;
      const position = new window.kakao.maps.LatLng(lat, lng);

      const marker = addMarker(position);

      window.kakao.maps.event.addListener(marker, "click", function () {
        showOverlay(cafe, position);
        console.log(marker);
      });
    });
  };

  const bounds = () => {
    const bounds = map.getBounds();
    const swLatLng = bounds.getSouthWest();
    const neLatLng = bounds.getNorthEast();

    const boundsObj = {
      top: neLatLng.getLat(),
      bottom: swLatLng.getLat(),
      left: swLatLng.getLng(),
      right: neLatLng.getLng(),
    };
    getBounds(boundsObj);
  };

  useEffect(() => {
    const mapContainer = document.getElementById("map"); // 지도를 표시할 div
    const mapOption = {
      center: new window.kakao.maps.LatLng(latlng.lat, latlng.lng), // 지도의 중심좌표
    };

    map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    window.kakao.maps.event.addListener(map, "bounds_changed", function () {
      bounds();
    });
    bounds();
  }, []);

  useEffect(() => {
    setMarker();
    getMarkers(markers);
  }, [loading]);

  return <Map id="map"></Map>;
};

export const KakaoMap: React.FC<KakaoMapProp> = ({ address }) => {
  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    const map = new window.kakao.maps.Map(mapContainer, options);

    if (address) {
      const position = new window.kakao.maps.LatLng(address.lat, address.lng);
      new window.kakao.maps.Marker({
        map,
        position,
      });

      map.setCenter(position);
    }
  }, [address]);
  return <Map id="map"></Map>;
};

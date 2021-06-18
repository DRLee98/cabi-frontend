import React, { useEffect } from "react";
import styled from "styled-components";
import { LatLng } from "types";
import { MapViewCafeFragment } from "__generated__/MapViewCafeFragment";
import { AddressFragment } from "__generated__/AddressFragment";

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

export const KakaoMapView: React.FC<KakaoMapViewProp> = ({
  latlng,
  cafes,
  getBounds,
  loading,
}) => {
  const addMarker = (position: LatLng) => {
    const marker = new window.kakao.maps.Marker({
      position,
    });

    marker.setMap(map);
    markers.push(marker);
  };

  const setMarker = () => {
    markers.forEach((marker) => marker.setMap(null));
    markers = [];

    cafes?.forEach((cafe) => {
      const lat = cafe.address.lat;
      const lng = cafe.address.lng;
      const position = new window.kakao.maps.LatLng(lat, lng);

      addMarker(position);
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
  }, [loading]);

  return <Map id="map"></Map>;
};

export const KakaoMap: React.FC<KakaoMapProp> = ({ address }) => {
  useEffect(() => {
    const mapContainer = document.getElementById("map"); // 지도를 표시할 div
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    // 지도를 생성합니다
    const map = new window.kakao.maps.Map(mapContainer, options);

    if (address) {
      const position = new window.kakao.maps.LatLng(address.lat, address.lng);

      // 결과값으로 받은 위치를 마커로 표시합니다
      new window.kakao.maps.Marker({
        map,
        position,
      });

      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      map.setCenter(position);
    }
  }, [address]);
  return <Map id="map"></Map>;
};

import React from "react";
import styled from "styled-components";
import { AddressFragment } from "../__generated__/AddressFragment";

const Map = styled.div``;

interface KakaoMapProp {
  address?: AddressFragment;
}

export const KakaoMap: React.FC<KakaoMapProp> = ({ address }) => {
  const kakao = (window as any).kakao;

  const mapContainer = document.getElementById("map"); // 지도를 표시할 div

  // 지도를 생성합니다
  const map = new kakao.maps.Map(mapContainer);

  const geocoder = new kakao.maps.services.Geocoder();
  if (address) {
    geocoder.addressSearch(
      address.address,
      function (result: any, status: any) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          const marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
      },
    );
  }
  return <Map id="map"></Map>;
};

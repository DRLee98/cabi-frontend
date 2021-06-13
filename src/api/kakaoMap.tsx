import React from "react";
import styled from "styled-components";
import { AddressFragment } from "../__generated__/AddressFragment";

const Map = styled.div``;

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProp {
  address?: AddressFragment;
}

export const KakaoMap: React.FC<KakaoMapProp> = ({ address }) => {
  window.onload = () => {
    const mapContainer = document.getElementById("map"); // 지도를 표시할 div
    var options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    // 지도를 생성합니다
    const map = new window.kakao.maps.Map(mapContainer, options);

    const geocoder = new window.kakao.maps.services.Geocoder();
    if (address) {
      geocoder.addressSearch(
        address.address,
        function (result: any, status: any) {
          // 정상적으로 검색이 완료됐으면
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(
              result[0].y,
              result[0].x,
            );

            // 결과값으로 받은 위치를 마커로 표시합니다
            new window.kakao.maps.Marker({
              map,
              position: coords,
            });

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
          }
        },
      );
    }
  };
  return <Map id="map"></Map>;
};

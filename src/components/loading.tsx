import React from "react";
import styled, { keyframes } from "styled-components";

const wave = keyframes`
  0% {
    transform: translateY(0px);
  }
  15% {
    transform: translateY(-20px);
  }
//   40% {
//     transform: translateY(10px);
//   }
  30% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const Container = styled.div`
  background-color: ${(prop) => prop.theme.signaturelightBgColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingBox = styled.div``;

const LoadingImage = styled.img`
  padding: 15px;
  border-radius: 20px;
`;

const LoadingDotList = styled.ul`
  margin-top: 1em;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const LoadingDot = styled.li`
  display: inline-block;
  background-color: ${(prop) => prop.theme.signatureColor};
  padding: 5px;
  border-radius: 999px;
  &:first-child {
    animation: ${wave} 2s linear infinite;
  }
  &:nth-child(2) {
    animation: ${wave} 2s linear infinite 0.3s;
  }
  &:nth-child(3) {
    animation: ${wave} 2s linear infinite 0.6s;
  }
  &:nth-child(4) {
    animation: ${wave} 2s linear infinite 0.9s;
  }
  &:nth-child(5) {
    animation: ${wave} 2s linear infinite 1.2s;
  }
`;

export const Loading = () => {
  return (
    <Container>
      <LoadingBox>
        <LoadingImage
          src={"https://img.icons8.com/cotton/100/000000/hot-chocolate--v2.png"}
        />
        <LoadingDotList>
          <LoadingDot></LoadingDot>
          <LoadingDot></LoadingDot>
          <LoadingDot></LoadingDot>
          <LoadingDot></LoadingDot>
        </LoadingDotList>
      </LoadingBox>
    </Container>
  );
};

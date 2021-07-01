import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrap = styled.div`
  min-height: 88vh;
  padding-top: ${(prop) => prop.theme.headerHeight};
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  margin-bottom: 2vh;
`;

export const Title = styled.h2`
  margin-bottom: 2em;
  font-weight: bold;
  font-size: x-large;
`;

export const CenterTitle = styled(Title)`
  text-align: center;
`;

export const ErrorMsg = styled.p`
  color: red;
  margin-top: 5px;
`;

export const Image = styled.img`
  width: ${(prop) => (prop.sizes ? prop.sizes : "20rem")};
  height: ${(prop) => (prop.sizes ? prop.sizes : "20rem")};
  border-radius: 999px;
  background-color: lightgray;
`;

export const CoverImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  background-color: lightgray;
`;

export const MenuImage = styled.img`
  width: ${(prop) => (prop.sizes ? prop.sizes : "30rem")};
  height: ${(prop) => (prop.sizes ? prop.sizes : "35rem")};
  background-color: lightgray;
`;

export const NextBtn = styled.span`
  color: ${(prop) => prop.theme.keywordBgColor};
  font-size: 30px;
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 10;
  padding: 0 5px 0 10px;
  border-radius: 999px;
  transition: all 0.5s ease;
  &:hover {
    background-color: ${(prop) => prop.theme.lightBgColor};
  }
`;

export const PrevBtn = styled.span`
  color: ${(prop) => prop.theme.keywordBgColor};
  font-size: 30px;
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 10;
  padding: 0 10px 0 5px;
  border-radius: 999px;
  transition: all 0.5s ease;
  &:hover {
    background-color: ${(prop) => prop.theme.lightBgColor};
  }
`;

export const SLink = styled(Link)``;

export const FlexBox = styled.div`
  display: flex;
`;

export const FlexCenterBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Dim = styled(FlexCenterBox)`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgb(37 37 37 / 60%);
  overflow: hidden;
  z-index: 999;
`;

import React from "react";
import styled from "styled-components";
import { Container } from "./styledComponent";

const SHeader = styled.header`
  height: 5vh;
  min-height: 30px;
  max-height: 50px;
  border-bottom: 1px solid #8cb734;
`;

export const Header = () => {
  return (
    <SHeader>
      <Container></Container>
    </SHeader>
  );
};

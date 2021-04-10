import React from "react";
import { Helmet } from "react-helmet-async";
import { GridCafe } from "../components/cafes";
import { Container } from "../components/styledComponent";
import { siteName } from "../constants";

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>{siteName}</title>
      </Helmet>
      <Container>
        <GridCafe />
      </Container>
    </>
  );
};

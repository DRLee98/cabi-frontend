import { useReactiveVar } from "@apollo/client";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoginVar } from "../apollo";
import { Container } from "./styledComponent";

const SHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 5vh;
  min-height: 40px;
  max-height: 60px;
  background-color: white;
  color: ${(props) => props.theme.signatureColor};
  // border-bottom: 1px solid;
  // border-color: ${(props) => props.theme.signatureBgColor};
`;

const HeaderBox = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleBox = styled.div`
  display: flex;
  font-size: 35px;
`;

const Title = styled.h1``;

const LInkBox = styled.div`
  display: flex;
  font-size: 18px;
`;

const SLInk = styled(Link)`
  padding: 0.5em 1em;
  border-radius: 999px;
  transition: all 0.5s ease;
  &:hover {
    background-color: ${(props) => props.theme.signatureBgColor};
  }
  & + & {
    margin-left: 5px;
  }
`;

export const Header = () => {
  const isLogin = useReactiveVar(isLoginVar);

  const loginLinks = [
    { path: "/profile", pathName: <FontAwesomeIcon icon={faUser} /> },
  ];
  const logoutLinks = [
    { path: "/login", pathName: "로그인" },
    { path: "/create-account", pathName: "회원가입" },
  ];

  return (
    <SHeader>
      <Container>
        <HeaderBox>
          <TitleBox>
            {/* <FontAwesomeIcon icon={faCoffee} /> */}
            <Link to="/">
              <Title>까비아</Title>
            </Link>
          </TitleBox>
          <LInkBox>
            {isLogin
              ? loginLinks.map((link) => (
                  <SLInk key={link.path} to={link.path}>
                    {link.pathName}
                  </SLInk>
                ))
              : logoutLinks.map((link) => (
                  <SLInk key={link.path} to={link.path}>
                    {link.pathName}
                  </SLInk>
                ))}
          </LInkBox>
        </HeaderBox>
      </Container>
    </SHeader>
  );
};

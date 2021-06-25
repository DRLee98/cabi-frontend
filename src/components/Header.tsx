import { useReactiveVar } from "@apollo/client";
import { faBars, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { MouseEventHandler, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoginVar } from "../apollo";
import { siteName, TOKEN } from "../constants";
import { Container } from "./styledComponent";

const SHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${(prop) => prop.theme.headerHeight};
  min-height: 40px;
  max-height: 60px;
  background-color: white;
  color: ${(props) => props.theme.signatureColor};
  padding: 0 5px;
  z-index: 999;
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
  width: 25%;
  @media only screen and (max-width: ${({ theme }) => theme.smallScreenWidth}) {
    font-size: 25px;
  }
`;

const Title = styled.h1``;

const LinkBox = styled.div`
  display: flex;
  align-content: center;
  justify-content: flex-end;
  font-size: 18px;
`;

const LogoutBtn = styled.button``;

const Form = styled.form`
  height: 100%;
  width: 70%;
  background-color: #ecececa3;
  border-radius: 999px;
  margin-right: 1em;
  padding-left: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: all 0.5s ease;
  &:focus-within {
    background-color: ${(props) => props.theme.signaturelightBgColor};
  }
  @media only screen and (max-width: ${({ theme }) => theme.smallScreenWidth}) {
    padding-right: 5px;
  }
`;

const Input = styled.input`
  width: 100%;
`;

const HeaderBtn = styled.button`
  cursor: pointer;
  padding: 0.5em;
  border-radius: 999px;
  transition: all 0.5s ease;
  &:hover {
    background-color: ${(props) => props.theme.lightBgColor};
  }
  @media only screen and (max-width: ${({ theme }) => theme.smallScreenWidth}) {
    padding: 0.2em;
  }
`;

const SideNavContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgb(37 37 37 / 60%);
  overflow: hidden;
  z-index: 999;
`;

const SideNav = styled.nav<SideNavProp>`
  height: 100%;
  width: 25%;
  min-width: 300px;
  margin-left: auto;
  background-color: ${(prop) => prop.theme.whiteColor};
  color: ${(props) => props.theme.signatureColor};
  transform: ${(props) => (props.open ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease;
`;

const NavBtnBlock = styled.div`
  text-align: right;
`;

const NavBtn = styled.button`
  font-size: 25px;
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.blackColor};
  }
`;

const NavList = styled.ul``;

const NavItem = styled.li`
  padding: 20px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.signaturelightBgColor};
  }
`;

interface SideNavProp {
  open: boolean;
}

interface NavLinkProp {
  path: string;
  pathName: string;
  onClick: MouseEventHandler<HTMLAnchorElement>;
}

const NavLink: React.FC<NavLinkProp> = ({ path, pathName, onClick }) => (
  <Link to={path} onClick={onClick}>
    <NavItem>{pathName}</NavItem>
  </Link>
);

const Header = () => {
  const isLogin = useReactiveVar(isLoginVar);

  const commonLinks = [{ path: "/map", pathName: "지도로 보기" }];
  const loginLinks = [{ path: "/my-profile", pathName: "내정보" }];
  const logoutLinks = [
    { path: "/login", pathName: "로그인" },
    { path: "/create-account", pathName: "회원가입" },
  ];

  const [sideNav, setSideNav] = useState<boolean>(false);
  const [showSideNav, setshowSideNav] = useState<boolean>(false);

  const openSideNav = () => {
    setSideNav(true);
    setTimeout(() => {
      setshowSideNav(true);
    }, 300);
  };

  const closeSideNav = () => {
    setshowSideNav(false);
    setTimeout(() => {
      setSideNav(false);
    }, 300);
  };

  const logout = () => {
    localStorage.setItem(TOKEN, "");
    window.location.reload();
    window.location.href = "/";
  };

  return (
    <>
      <SHeader>
        <Container>
          <HeaderBox>
            <TitleBox>
              {/* <FontAwesomeIcon icon={faCoffee} /> */}
              <Link to="/">
                <Title>{siteName}</Title>
              </Link>
            </TitleBox>
            <LinkBox>
              <Form action="/search-cafes/">
                <Input name="word" type="text" required />
                <HeaderBtn>
                  <FontAwesomeIcon icon={faSearch} />
                </HeaderBtn>
              </Form>
              <HeaderBtn onClick={openSideNav}>
                <FontAwesomeIcon icon={faBars} />
              </HeaderBtn>
            </LinkBox>
          </HeaderBox>
        </Container>
      </SHeader>
      {sideNav && (
        <SideNavContainer>
          <SideNav open={showSideNav}>
            <NavBtnBlock>
              <NavBtn onClick={closeSideNav}>
                <FontAwesomeIcon icon={faTimes} />
              </NavBtn>
            </NavBtnBlock>
            <NavList>
              {commonLinks.map((link) => (
                <NavLink
                  key={link.path}
                  path={link.path}
                  pathName={link.pathName}
                  onClick={closeSideNav}
                />
              ))}
              {isLogin ? (
                <>
                  {loginLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      path={link.path}
                      pathName={link.pathName}
                      onClick={closeSideNav}
                    />
                  ))}
                  <NavItem>
                    <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
                  </NavItem>
                </>
              ) : (
                logoutLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    path={link.path}
                    pathName={link.pathName}
                    onClick={closeSideNav}
                  />
                ))
              )}
            </NavList>
          </SideNav>
        </SideNavContainer>
      )}
    </>
  );
};

export default Header;

import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container, ErrorMsg } from "../components/styledComponent";
import { siteName } from "../constants";
import { useMe } from "../hooks/useMe";
import { UserRole } from "../__generated__/globalTypes";

const ProfileBox = styled.section`
  display: grid;
  grid-template-columns: 1fr 3fr;
  padding: 5em 0;
`;

const SideBox = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentsBox = styled.main`
  padding: 0 3em;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Image = styled.img`
  width: 20rem;
  height: 20rem;
  border-radius: 999px;
  background-color: lightgray;
`;

const Name = styled.strong`
  font-size: 40px;
  margin-bottom: 0.5rem;
`;

const Email = styled.small`
  font-size: 15px;
  color: lightseagreen;
  margin-bottom: 1.5rem;
`;

const Role = styled.span`
  font-size: 20px;
  width: fit-content;
  padding: 0.5rem 1rem;
  border: 1px solid;
  border-radius: 999px;
  border-color: ${(props) => props.theme.signatureColor};
  color: ${(props) => props.theme.signatureColor};
  margin-bottom: 1.5rem;
`;

const SLink = styled(Link)`
  font-size: 20px;
  width: fit-content;
  padding: 0.5rem 1rem;
  border: 1px solid;
  border-radius: 999px;
  border-color: ${(props) => props.theme.disableColor};
  color: ${(props) => props.theme.disableColor};
  transition: all 0.5s ease;
  &:hover {
    border-color: ${(props) => props.theme.signatureBgColor};
    color: ${(props) => props.theme.signatureBgColor};
  }
`;

const Address = styled.address``;

export const Profile = () => {
  const { data } = useMe();
  const user = data?.myProfile.user;
  console.log(user);

  return (
    <>
      <Helmet>
        <title>{siteName} | 회원정보</title>
      </Helmet>
      <Container>
        <ProfileBox>
          <SideBox>
            <Image></Image>
          </SideBox>
          <ContentsBox>
            <Name>{user?.name} 님</Name>
            <Email>{user?.email}</Email>
            <Role>{user?.role === UserRole.Client ? "고객님" : "사장님"}</Role>
            <SLink to="/edit-profile">회원정보 변경하기</SLink>
            {/* <Address>{user?.address.address}</Address> */}
          </ContentsBox>
        </ProfileBox>
      </Container>
    </>
  );
};

import React from "react";
import styled from "styled-components";

const SFooter = styled.footer`
  height: ${(prop) => prop.theme.footerHeight};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(prop) => prop.theme.footerBgColor};
  border-top: 1px solid ${(prop) => prop.theme.footerColor};
  color: ${(prop) => prop.theme.footerColor};
`;

const TitleBox = styled.div``;

const Copyright = styled.span``;

const BigWord = styled.big`
  font-weight: bold;
  font-size: 25px;
  margin-left: 8px;
`;

const SmallWord = styled.small`
  font-size: 15px;
`;

const InfoBox = styled.div`
  margin-top: 10px;
`;

const Email = styled.span`
  font-weight: lighter;
  font-size: 14px;
`;

const Footer = () => {
  return (
    <SFooter>
      <TitleBox>
        <Copyright>Copyright &copy; 2021</Copyright>
        <BigWord>까</BigWord>
        <SmallWord>페를</SmallWord>
        <BigWord>비</BigWord>
        <SmallWord>교하다</SmallWord>
      </TitleBox>
      <InfoBox>
        <Email>dongyeol01@naver.com</Email>
      </InfoBox>
    </SFooter>
  );
};

export default Footer;

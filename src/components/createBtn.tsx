import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CreateBlock = styled.div`
  width: 100%;
`;

const CreateLink = styled(Link)`
  display: block;
  padding: 1em;
  margin: 1em;
  text-align: center;
  border-radius: 10px;
  transition: all 0.3s ease;
  &:hover {
    color: ${(prop) => prop.theme.keywordColor};
    background-color: ${(prop) => prop.theme.keywordBgColor};
  }
`;

interface CreateButtonProp {
  link: string;
  text: string;
}

export const CreateButton: React.FC<CreateButtonProp> = ({ link, text }) => {
  return (
    <CreateBlock>
      <CreateLink to={link}>{text}</CreateLink>
    </CreateBlock>
  );
};

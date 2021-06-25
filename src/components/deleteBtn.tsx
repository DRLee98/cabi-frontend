import React, { MouseEventHandler } from "react";
import styled from "styled-components";

const DeleteBlock = styled.div`
  width: 100%;
`;

const DeleteBtn = styled.button`
  display: block;
  width: -webkit-fill-available;
  padding: 1em;
  margin: 1em;
  text-align: center;
  border-radius: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    color: ${(prop) => prop.theme.whiteColor};
    background-color: ${(prop) => prop.theme.redColor};
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.mediumScreenWidth}) {
    color: ${(prop) => prop.theme.whiteColor};
    background-color: ${(prop) => prop.theme.redColor};
  }
`;

interface DeleteeButtonProp {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const DeleteButton: React.FC<DeleteeButtonProp> = ({
  text,
  onClick,
}) => {
  return (
    <DeleteBlock>
      <DeleteBtn onClick={onClick}>{text}</DeleteBtn>
    </DeleteBlock>
  );
};

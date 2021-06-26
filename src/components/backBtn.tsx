import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

const Button = styled.button`
  margin-right: 1em;
  font-size: 26px;
  cursor: pointer;
`;

export const BackBtn = () => {
  const history = useHistory();
  const onClick = () => {
    history.goBack();
  };
  return (
    <Button onClick={onClick}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </Button>
  );
};

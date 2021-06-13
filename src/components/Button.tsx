import React from "react";
import styled from "styled-components";

const SButton = styled.button<SButtonProps>`
  width: 100%;
  padding: 1.2em 0;
  text-align: center;
  font-weight: bold;
  border-radius: 10px;
  background-color: ${(prop) =>
    !prop.active || prop.error
      ? prop.theme.disableBgColor
      : prop.theme.signatureBgColor};
  color: ${(prop) =>
    !prop.active || prop.error
      ? prop.theme.disableColor
      : prop.theme.signatureColor};
  transition: all 0.3s ease;
  cursor: ${(prop) => (!prop.active || prop.error ? "unset" : "pointer")};
  ${(prop) => (!prop.active || prop.error) && "pointer-events: none"};
`;

interface SButtonProps {
  active: Boolean;
  error?: string | null;
}

interface ButtonProps {
  valid: Boolean;
  loading: Boolean;
  text: string;
  error?: string | null;
}

const Button: React.FC<ButtonProps> = ({ valid, loading, text, error }) => {
  const active = valid && !loading;
  return (
    <SButton active={active} error={error}>
      {error ? error : loading ? "로딩중" : text}
    </SButton>
  );
};

export default Button;

import React from "react";
import styled from "styled-components";
import { UserRole } from "../__generated__/globalTypes";

const SInput = styled.input`
  display: block;
  width: 25em;
  min-width: 300px;
  max-width: 400px;
  padding: 0.8em 1.5em;
`;

const InputLabel = styled.label<InputLabelProps>`
  padding: 0.2em 0.5em;
  background-color: white;
  border-radius: 100px;
  position: absolute;
  left: 10px;
  color: ${(prop) => (prop.write ? "#4c4c4c" : "darkgray")};
  top: ${(prop) => (prop.write ? "-10px" : "50%")};
  transform: ${(prop) => (prop.write ? "scale(0.9)" : "translateY(-50%)")};
  transition: all 0.2s ease;
`;

const InputBox = styled.div`
  border-bottom: 1px solid #c1c1c1;
  position: relative;
  &:not(:last-child) {
    margin-bottom: 1.5em;
  }
  &:focus-within ${InputLabel} {
    color: #383838;
    top: -10px;
    transform: scale(0.8);
  }
`;

const SRadioInput = styled.input``;

const RadioInputLabel = styled.label`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: darkgray;
  cursor: pointer;
  ${SRadioInput}:checked + & {
    color: blue;
  }
`;

const RadioInputBox = styled.div<RadioInputLabelProps>`
  border: 1px solid #c1c1c1;
  border-color: ${(prop) => (prop.check ? "blue" : "#c1c1c1")};
  height: 3em;
  width: 100%;
`;

interface InputLabelProps {
  write: Boolean;
}

interface RadioInputLabelProps {
  check: Boolean;
}

interface InputProps {
  register: any;
  name: string;
  label: string;
  write: Boolean;
  type?: string;
}

interface RadioInputProps {
  register: any;
  name: string;
  label: string;
  value: UserRole;
  check: Boolean;
}

export const Input: React.FC<InputProps> = ({
  register,
  name,
  label,
  write,
  type = "text",
}) => {
  return (
    <InputBox>
      <InputLabel write={write}>{label}</InputLabel>
      <SInput ref={register} name={name} type={type} />
    </InputBox>
  );
};

export const RadioInput: React.FC<RadioInputProps> = ({
  register,
  name,
  label,
  value,
  check,
}) => {
  return (
    <RadioInputBox check={check}>
      <SRadioInput
        ref={register}
        id={value}
        name={name}
        type="radio"
        value={value}
      />
      <RadioInputLabel htmlFor={value}>{label}</RadioInputLabel>
    </RadioInputBox>
  );
};

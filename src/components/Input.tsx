import React, { useState } from "react";
import styled from "styled-components";
import { UserRole } from "../__generated__/globalTypes";
import { ErrorMsg, Image } from "./styledComponent";

const SInput = styled.input`
  display: block;
  width: 25em;
  min-width: 300px;
  max-width: 400px;
  padding: 0.8em 1.5em;
  ${(prop) =>
    prop.disabled &&
    `background-color: ${prop.theme.disablelightBgColor}; 
    color: ${prop.theme.disableColor};`};
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

const InputInBox = styled.div<InputInBoxProps>`
  border-bottom: 1px solid #c1c1c1;
  position: relative;
  &:focus-within ${InputLabel} {
    color: #383838;
    top: -10px;
    transform: scale(0.8);
  }
  ${(props) => props.error && "border-color: red"}
`;

const InputOutBox = styled.div`
  &:not(:last-child) {
    margin-bottom: 1.5em;
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
  font-weight: bold;
  cursor: pointer;
  ${SRadioInput}:checked + & {
    color: ${(prop) => prop.theme.signatureColor};
  }
`;

const RadioInputBox = styled.div<RadioInputLabelProps>`
  border: 1px solid darkgray;
  border-color: ${(prop) =>
    prop.check ? prop.theme.signatureColor : "darkgray"};
  height: 3em;
  width: 100%;
  &:first-child:not(:last-child) {
    border-radius: 10px 0 0 10px;
  }
  & + &:last-child {
    border-radius: 0 10px 10px 0;
  }
`;

const FileInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const FileInput = styled.input`
  display: none;
`;

const Label = styled.label`
  cursor: pointer;
`;

const Name = styled.span`
  margin-top: 1em;
`;

interface InputInBoxProps {
  error?: string;
}

interface InputLabelProps {
  write?: Boolean;
}

interface RadioInputLabelProps {
  check: Boolean;
}

interface InputProps {
  register?: any;
  name?: string;
  label: string;
  write?: Boolean;
  type?: string;
  error?: string;
  value?: string | undefined;
  disabled?: boolean | undefined;
}

interface RadioInputProps {
  register?: any;
  name?: string;
  label?: string;
  value?: UserRole;
  check: Boolean;
}

interface ImageInputProps {
  register: any;
  url?: string | null | undefined;
}

export const Input: React.FC<InputProps> = ({
  register,
  name,
  label,
  write,
  type = "text",
  error,
  value,
  disabled,
}) => {
  return (
    <InputOutBox>
      <InputInBox error={error}>
        <InputLabel write={write || Boolean(value)}>{label}</InputLabel>
        <SInput
          ref={register}
          name={name}
          type={type}
          defaultValue={value}
          disabled={disabled}
        />
      </InputInBox>
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </InputOutBox>
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
        value={value || ""}
      />
      <RadioInputLabel htmlFor={value}>{label}</RadioInputLabel>
    </RadioInputBox>
  );
};

export const ImageInput: React.FC<ImageInputProps> = ({ register, url }) => {
  const [previewUrl, setPreviewUrl] = useState<any>();

  const handleOnChange = (e: any) => {
    const file = e?.target?.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
  };

  return (
    <FileInputBox>
      <Label htmlFor="file">
        <Image src={previewUrl || url} />
      </Label>
      <Name>프로필 이미지</Name>
      <FileInput
        ref={register}
        id="file"
        name="file"
        type="file"
        onChange={handleOnChange}
      />
    </FileInputBox>
  );
};

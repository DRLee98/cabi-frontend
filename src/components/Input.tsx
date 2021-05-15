import React, { ChangeEventHandler, useState } from "react";
import styled from "styled-components";
import { UserRole } from "../__generated__/globalTypes";
import { CoverImage, ErrorMsg, Image, MenuImage } from "./styledComponent";

export const SInput = styled.input`
  display: block;
  width: 25em;
  min-width: 100%;
  max-width: 400px;
  padding: 0.8em 1.5em;
  box-sizing: border-box;
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

export const InputOutBox = styled.div`
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

const SelectBox = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  position: relative;
  font-family: inherit;
  font-weight: bold;
  font-size: 18px;
  text-align-last: center;
  text-align: center;
  -ms-text-align-last: center;
  -moz-text-align-last: center;
  width: 100%;
  padding: 0.8em;
  color: ${(prop) => prop.theme.signatureColor};
  border: none;
  border-bottom: 1px solid ${(prop) => prop.theme.signatureColor};
  outline: chocolate;
`;

const Option = styled.option``;

const STextarea = styled.textarea`
  display: block;
  width: 100%;
  height: 100%;
  &::placeholder {
    color: darkgray;
  }
`;

const TextareaBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5em;
  border-bottom: 1px solid #c1c1c1;
  display: flex;
  flex-direction: column;
`;

const FileInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CoverFileInputBox = styled.div`
  width: 100%;
  height: 100%;
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

const KInput = styled.input`
  width: 100%;
  margin-left: 5px;
`;

const KeywordInputBox = styled.div`
  display: flex;
  align-items: center;
  width: 150px;
  padding: 5px 10px;
  color: ${(prop) => prop.theme.keywordBgColor};
  border-radius: 999px;
  border: 1px solid ${(prop) => prop.theme.keywordBgColor};
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
  disabled?: boolean | undefined;
}

interface KeywordInputProps {
  register?: any;
  name?: string;
  error?: string;
  value?: string;
}

interface RadioInputProps {
  register?: any;
  name?: string;
  label?: string;
  value?: UserRole;
  check: Boolean;
}

interface SelectProps {
  register?: any;
  name: string;
  options: { name: string; value: string }[];
  onchange?: ChangeEventHandler<HTMLSelectElement> | undefined;
}

interface TextareaProps {
  register?: any;
  name?: string;
  error?: string;
  placeholder?: string;
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
  disabled,
}) => {
  return (
    <InputOutBox>
      <InputInBox error={error}>
        <InputLabel write={write || disabled}>{label}</InputLabel>
        <SInput ref={register} name={name} type={type} disabled={disabled} />
      </InputInBox>
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </InputOutBox>
  );
};

export const KeywordInput: React.FC<KeywordInputProps> = ({
  register,
  name,
  error,
  value,
}) => {
  return (
    <KeywordInputBox>
      #
      {value ? (
        <KInput ref={register} name={name} type="text" value={value} />
      ) : (
        <KInput ref={register} name={name} type="text" />
      )}
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </KeywordInputBox>
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

export const Select: React.FC<SelectProps> = ({
  register,
  name,
  options,
  onchange,
}) => {
  return (
    <SelectBox ref={register} name={name} onChange={onchange}>
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.name}
        </Option>
      ))}
    </SelectBox>
  );
};

export const Textarea: React.FC<TextareaProps> = ({
  register,
  name,
  error,
  placeholder,
}) => {
  return (
    <TextareaBox>
      <STextarea ref={register} name={name} placeholder={placeholder} />
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </TextareaBox>
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

export const CoverImageInput: React.FC<ImageInputProps> = ({
  register,
  url,
}) => {
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
    <CoverFileInputBox>
      <Label htmlFor="file">
        <CoverImage src={previewUrl || url} />
      </Label>
      <FileInput
        ref={register}
        id="file"
        name="file"
        type="file"
        onChange={handleOnChange}
      />
    </CoverFileInputBox>
  );
};

export const MenuImageInput: React.FC<ImageInputProps> = ({
  register,
  url,
}) => {
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
        <MenuImage src={previewUrl || url} />
      </Label>
      <Name>메뉴 이미지</Name>
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

import { FieldError } from "react-hook-form";
import styled from "styled-components";

export const FormBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  display: grid;
  grid-template:
    "Image Contents" 6fr
    "Button Button" 1fr/ 1fr 1fr;
  @media only screen and (max-width: ${({ theme }) => theme.smallScreenWidth}) {
    display: block;
  }
`;

export const RadioBox = styled.div<RadioBoxProps>`
  display: flex;
  margin-bottom: 2em;
  ${(props) => props.error && "border-color: red"}
`;

export const BtnBox = styled.div`
  margin-top: 1em;
  grid-area: Button;
`;

export const ImageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: Image;
  @media only screen and (max-width: ${({ theme }) => theme.smallScreenWidth}) {
    margin-bottom: 1em;
  }
`;

export const ContentsBox = styled.div`
  grid-area: Contents;
`;

interface RadioBoxProps {
  error?: FieldError;
}

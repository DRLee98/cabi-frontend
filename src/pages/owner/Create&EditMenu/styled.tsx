import styled from "styled-components";

export const FormBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: ${(prop) => prop.theme.headerHeight};
`;

export const Form = styled.form`
  display: grid;
  grid-template:
    "Image Contents" 6fr
    "Button Button" 1fr/ 1fr 1fr;
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
`;

export const ContentsBox = styled.div`
  grid-area: Contents;
  max-width: 550px;
`;

export const OptionBox = styled.div`
  margin: 1em;
`;

export const OptionBtn = styled.span`
  display: inline-block;
  cursor: pointer;
  color: ${(prop) => prop.theme.keywordBgColor};
  padding: 10px;
  border-radius: 3px;
  transition: all 0.3s ease;
  min-width: fit-content;
  &:hover {
    background-color: ${(prop) => prop.theme.keywordBgColor};
    color: white;
  }
`;

export const OptionInput = styled.input`
  display: block;
  width: 100%;
  min-width: 150px;
  padding: 0.3em 0;
  box-sizing: border-box;
  margin-bottom: 0.2em;
  border-bottom: 1px solid #c1c1c1;
`;

export const OptionDelBtn = styled.span`
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: small;
  opacity: 0;
  transition: all 0.5s ease;
  &:hover {
    color: red;
  }
`;

export const OptionItem = styled.li`
  max-width: 200px;
  padding: 0.3em;
  max-height: 120px;
  overflow-y: auto;
  position: relative;
  ${OptionBtn} {
    display: block;
  }
  &:hover ${OptionDelBtn} {
    opacity: 1;
  }
`;

export const Box = styled.div`
  position: relative;
  &:hover ${OptionDelBtn} {
    opacity: 1;
  }
`;

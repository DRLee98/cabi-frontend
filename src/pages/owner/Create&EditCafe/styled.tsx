import styled from "styled-components";

export const FormBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  width: 75%;
  min-width: 750px;
  @media only screen and (max-width: ${({ theme }) => theme.smallScreenWidth}) {
    width: unset;
    min-width: unset;
  }
`;

export const BtnBox = styled.div`
  margin-top: 1em;
  grid-area: Button;
`;

export const ImageBox = styled.div`
  height: 30vh;
  margin-bottom: 2em;
`;

export const ContentsBox = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template:
    "name name" 1fr
    "description address" 2fr/ 1fr 1fr;
  @media only screen and (max-width: ${({ theme }) => theme.smallScreenWidth}) {
    display: block;
  }
`;

export const NameBox = styled.div`
  grid-area: name;
  & input {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }
`;

export const DescriptionBox = styled.div`
  grid-area: description;
  @media only screen and (max-width: ${({ theme }) => theme.smallScreenWidth}) {
    margin: 1em 0;
  }
`;

export const AddressBox = styled.div`
  grid-area: address;
`;

export const KeywordBox = styled.div`
  margin: 1em 0;
  display: flex;
  @media only screen and (max-width: ${({ theme }) => theme.smallScreenWidth}) {
    display: block;
  }
`;

export const KeywordBtn = styled.span`
  cursor: pointer;
  color: ${(prop) => prop.theme.keywordBgColor};
  padding: 10px;
  border-radius: 3px;
  margin-right: 1em;
  transition: all 0.3s ease;
  min-width: fit-content;
  &:hover {
    background-color: ${(prop) => prop.theme.keywordBgColor};
    color: ${(prop) => prop.theme.keywordColor};
  }
  @media only screen and (max-width: ${({ theme }) => theme.smallScreenWidth}) {
    display: block;
    margin-right: 0;
    margin-bottom: 1em;
    text-align: center;
    background-color: ${(prop) => prop.theme.keywordBgColor};
    color: ${(prop) => prop.theme.keywordColor};
  }
`;

export const KeywordDelBtn = styled.span`
  position: absolute;
  right: 9px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: small;
  opacity: 0;
  transition: all 0.5s ease;
  &:hover {
    color: red;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.mediumScreenWidth}) {
    opacity: 1;
    color: red;
  }
`;

export const KeywordItem = styled.li`
  position: relative;
  &:hover ${KeywordDelBtn} {
    opacity: 1;
  }
  & + & {
    margin-left: 5px;
  }
`;

import reset from "react-style-reset/string";
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  ${reset};
  input,
  button{
      all: unset;
  }
  *{
      box-sizing: border-box;
      font-weight: 600;
      font-size: 15px;
      font-family: 'Noto Sans KR', sans-serif;
  }
`;

import reset from "react-style-reset/string";
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  ${reset};
  *{
    box-sizing: border-box;
  }
  input,
  button,
  textarea{
      all: unset;
  }
  body{
      font-weight: 600;
      font-size: 15px;
      font-family: 'Noto Sans KR', sans-serif;
  }
  a{
    color: inherit;
    text-decoration: unset;
  }
`;

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Slider } from "./slider";

const Keyword = styled.li`
  display: inline-block;
  color: ${(prop) => prop.theme.keywordBgColor};
  border: 1px solid ${(prop) => prop.theme.keywordBgColor};
  border-radius: 999px;
  padding: 0.3em 0.5em;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${(prop) => prop.theme.keywordBgColor};
    color: ${(prop) => prop.theme.keywordColor};
  }
  & + & {
    margin-left: 1em;
  }
`;

const KeywordLink = styled(Link)``;

const KeywordContainer = styled.div`
  margin: 1em 0;
`;

interface KeywordProp {
  name: string;
  slug: string;
}

interface KeywordsProp {
  keywords: KeywordProp[] | undefined | null;
}

export const Keywords: React.FC<KeywordsProp> = ({ keywords }) => {
  return (
    <KeywordContainer>
      <Slider slideWidth={200}>
        {keywords?.map((keyword: { slug: string; name: string }) => (
          <Keyword key={keyword.slug}>
            <KeywordLink to={`keyword/${keyword.slug}`}>
              # {keyword.name}
            </KeywordLink>
          </Keyword>
        ))}
      </Slider>
    </KeywordContainer>
  );
};

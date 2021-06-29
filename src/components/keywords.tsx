import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Slider } from "./slider";

const Keyword = styled.li<KeywordProp>`
  display: inline-block;
  color: ${(prop) =>
    prop.selectedKeyword ? prop.theme.keywordColor : prop.theme.keywordBgColor};
  background-color: ${(prop) =>
    prop.selectedKeyword && prop.theme.selectKeywordBgColor};
  border: 1px solid
    ${(prop) => !prop.selectedKeyword && prop.theme.keywordBgColor};
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

const StackKeywordContainer = styled.ul`
  display: flex;
  flex-wrap: wrap-reverse;
  gap: 10px;
`;

const StackKeyword = styled(Keyword)`
  background-color: rgb(239 239 239 / 60%);
  & + & {
    margin-left: 0;
  }
`;

interface KeywordProp {
  selectedKeyword?: boolean;
}

interface IKeyword {
  name: string;
  slug: string;
}

interface KeywordsProp {
  keywords: IKeyword[] | undefined | null;
  selectedKeyword?: string;
}

export const Keywords: React.FC<KeywordsProp> = ({
  keywords,
  selectedKeyword,
}) => {
  return (
    <KeywordContainer>
      <Slider slideWidth={200}>
        {keywords?.map((keyword: { slug: string; name: string }) => (
          <Keyword
            key={keyword.slug}
            selectedKeyword={keyword.slug === selectedKeyword}
          >
            <KeywordLink to={`/keyword/${keyword.slug}`}>
              # {keyword.name}
            </KeywordLink>
          </Keyword>
        ))}
      </Slider>
    </KeywordContainer>
  );
};

export const StackKeywords: React.FC<KeywordsProp> = ({ keywords }) => {
  return (
    <StackKeywordContainer>
      {keywords?.map((keyword: { slug: string; name: string }) => (
        <StackKeyword key={keyword.slug}># {keyword.name}</StackKeyword>
      ))}
    </StackKeywordContainer>
  );
};

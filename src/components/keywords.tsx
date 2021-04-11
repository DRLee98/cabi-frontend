import { useQuery } from "@apollo/client";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { viewKeywordsQuery } from "../__generated__/viewKeywordsQuery";
import { NextBtn, PrevBtn } from "./styledComponent";

const KeywordBox = styled.div`
  padding: 1em;
  overflow: hidden;
  position: relative;
`;

const KeywordList = styled.ul<KeywordListProps>`
  width: max-content;
  transform: translateX(
    ${(prop) => (prop.keywordsScroll > 0 ? 0 : prop.keywordsScroll)}px
  );
  transition: all 0.5s ease;
`;

const Keyword = styled.li`
  display: inline-block;
  color: ${(prop) => prop.theme.keywordColor};
  border: 1px solid ${(prop) => prop.theme.keywordColor};
  border-radius: 999px;
  padding: 0.3em 0.5em;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${(prop) => prop.theme.keywordColor};
    color: white;
  }
  & + & {
    margin-left: 1em;
  }
`;

const KeywordLink = styled(Link)``;

const VIEW_KEYWORDS_QUERY = gql`
  query viewKeywordsQuery {
    viewKeywords {
      ok
      error
      keywords {
        id
        name
        slug
      }
    }
  }
`;

interface KeywordListProps {
  keywordsScroll: number;
}

export const Keywords = () => {
  const { data } = useQuery<viewKeywordsQuery>(VIEW_KEYWORDS_QUERY);
  const keywords = data?.viewKeywords.keywords;

  const [keywordsScroll, setKeywordsScroll] = useState<number>(0);

  const nextBtn = () => {
    setKeywordsScroll((prev) => (prev -= 150));
  };

  const prevBtn = () => {
    setKeywordsScroll((prev) => (prev += 150));
  };

  return (
    <KeywordBox>
      {keywords && keywords.length > 5 && keywordsScroll < 0 && (
        <PrevBtn onClick={prevBtn}>
          <FontAwesomeIcon icon={faCaretLeft} />
        </PrevBtn>
      )}
      <KeywordList keywordsScroll={keywordsScroll}>
        {keywords?.map((keyword) => (
          <Keyword key={keyword.slug}>
            <KeywordLink to={`keyword/${keyword.slug}`}>
              # {keyword.name}
            </KeywordLink>
          </Keyword>
        ))}
      </KeywordList>
      {keywords &&
        keywords.length > 5 &&
        keywordsScroll > (keywords.length - 15) * -100 && (
          <NextBtn onClick={nextBtn}>
            <FontAwesomeIcon icon={faCaretRight} />
          </NextBtn>
        )}
    </KeywordBox>
  );
};

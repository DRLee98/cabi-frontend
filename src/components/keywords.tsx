import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { viewKeywordsQuery_viewKeywords_keywords } from "../__generated__/viewKeywordsQuery";
import { NextBtn, PrevBtn } from "./styledComponent";

const KeywordContainer = styled.div`
  position: relative;
`;

const KeywordBox = styled.div`
  padding: 1em;
  overflow: hidden;
  position: relative;
  margin: 0 3em;
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

interface KeywordListProps {
  keywordsScroll: number;
}

interface KeywordProp {
  name: string;
  slug: string;
}

interface KeywordsProp {
  keywords: KeywordProp[] | undefined | null;
}

export const Keywords: React.FC<KeywordsProp> = ({ keywords }) => {
  const [keywordsScroll, setKeywordsScroll] = useState<number>(0);
  const [blockWidth, setBlockWidth] = useState<number>(0);
  const [listWidth, setListWidth] = useState<number>(0);

  const nextBtn = () => {
    setKeywordsScroll((prev) => (prev -= 200));
  };

  const prevBtn = () => {
    setKeywordsScroll((prev) => (prev += 200));
  };

  return (
    <KeywordContainer>
      {listWidth > blockWidth && keywordsScroll < 0 && (
        <PrevBtn onClick={prevBtn}>
          <FontAwesomeIcon icon={faCaretLeft} />
        </PrevBtn>
      )}
      <KeywordBox ref={(ref) => ref && setBlockWidth(ref?.clientWidth)}>
        <KeywordList
          ref={(ref) => ref && setListWidth(ref?.clientWidth)}
          keywordsScroll={keywordsScroll}
        >
          {keywords?.map((keyword: { slug: string; name: string }) => (
            <Keyword key={keyword.slug}>
              <KeywordLink to={`keyword/${keyword.slug}`}>
                # {keyword.name}
              </KeywordLink>
            </Keyword>
          ))}
        </KeywordList>
      </KeywordBox>
      {listWidth > blockWidth && keywordsScroll * -1 + blockWidth < listWidth && (
        <NextBtn onClick={nextBtn}>
          <FontAwesomeIcon icon={faCaretRight} />
        </NextBtn>
      )}
    </KeywordContainer>
  );
};

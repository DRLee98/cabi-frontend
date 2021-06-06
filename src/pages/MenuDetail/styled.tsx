import styled from "styled-components";

export const MenuContainer = styled.div`
  display: flex;
  padding: 5em;
  width: 100%;
  //height: 100%;
`;

export const ImageBox = styled.div`
  width: 50%;
  height: 75vh;
  position: sticky;
  top: ${(prop) => prop.theme.headerHeight};
`;

export const ContentsBox = styled.div`
  width: 50%;
  padding: 3em;
`;

export const NameBox = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 1px solid ${(prop) => prop.theme.disableBgColor};
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

export const Box = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const Name = styled.strong`
  font-size: x-large;
`;

export const CategoryName = styled.small`
  font-size: small;
  margin-left: 5px;
  color: ${(prop) => prop.theme.disableColor};
`;

export const Price = styled.span``;

export const DescriptionBox = styled.div``;

export const Description = styled.p`
  color: ${(prop) => prop.theme.disableColor};
  font-weight: 100;
`;

export const OptionBox = styled.div`
  margin: 2em 0;
`;

export const OptionTitle = styled.strong`
  font-size: large;
`;

export const OptionList = styled.ul`
  margin: 1em 0;
`;

export const OptionContentsBox = styled.div`
  padding: 0.8em;
  display: flex;
  justify-content: space-between;
`;

export const OptionName = styled.span``;

export const OptionPrice = styled.span`
  margin-left: 8px;
`;

export const OptionItemBox = styled.div`
  top: 100%;
  left: 0;
  padding: 5px;
  margin-top: 3px;
  min-width: 100%;
  width: max-content;
  max-height: 100px;
  overflow-y: auto;
  border-radius: 0 0 3px 3px;
  border-top: 1px solid ${(prop) => prop.theme.keywordBgColor};
  background-color: ${(prop) => prop.theme.keywordColor};
  transition: all 0.5s ease;
`;

export const OptionItem = styled.div`
  display: flex;
  justify-content: space-between;
  & + & {
    margin-top: 8px;
  }
`;

export const Option = styled.li`
  position: relative;
  min-width: 120px;
  height: fit-content;
  border-radius: 3px;
  position: relative;
  color: ${(prop) => prop.theme.keywordBgColor};
  border: 1px solid ${(prop) => prop.theme.keywordBgColor};
  & + & {
    margin-left: 10px;
  }
`;

export const NutrientBox = styled.div`
  margin: 2em 0;
`;

export const EditBtn = styled.span`
  display: inline-block;
  margin-left: 10px;
  & a {
    margin: 0;
    padding: 5px;
  }
`;

export const DeleteBtn = styled.span`
  display: inline-block;
  margin-left: 10px;
  & button {
    margin: 0;
    padding: 5px;
  }
`;
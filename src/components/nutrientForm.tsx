import React from "react";
import styled from "styled-components";

const NutrientBox = styled.table`
  width: 100%;
  border: 1px solid lightgray;
`;

const Input = styled.input`
  display: inline-block;
  text-align: right;
  padding: 0.2em;
  max-width: 150px;
  &::placeholder {
    color: darkgray;
  }
`;

const TableRow = styled.tr`
  & + & {
    border-top: 1px solid lightgray;
  }
`;

const TableValue = styled.td`
  padding: 0.5em;
  text-align: right;
`;

const TableTitle = styled.th`
  text-align: left;
  padding: 0.5em;
  ${TableValue} + & {
    border-left: 1px solid lightgray;
  }
`;

const TableHead = styled.thead`
  padding: 0.5em;
  background-color: ${(prop) => prop.theme.signatureBgColor};
  color: ${(prop) => prop.theme.whiteColor};
  ${TableTitle} {
    font-size: 20px;
  }
  ${TableValue} {
    width: max-content;
  }
  ${TableRow} {
    border: none;
  }
`;

const TableBody = styled.tbody``;

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Span = styled.span``;

interface NutrientFormProps {
  register: any;
}

export const NutrientForm: React.FC<NutrientFormProps> = ({ register }) => {
  return (
    <NutrientBox>
      <TableHead>
        <TableRow>
          <TableTitle colSpan={2} rowSpan={2}>
            영양정보
          </TableTitle>
          <TableValue colSpan={2}>
            <Label>
              <Span>총 내용량</Span>
              <Input ref={register} name={"volume"} type="number" />
              <Span>g</Span>
            </Label>
          </TableValue>
        </TableRow>
        <TableRow>
          <TableValue colSpan={2}>
            <Label>
              <Input ref={register} name={"calorie"} type="number" />
              <Span>kcal</Span>
            </Label>
          </TableValue>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableTitle>나트륨</TableTitle>
          <TableValue width="20%">
            <Label>
              <Input ref={register} name={"salt"} type="number" />
              <Span>mg</Span>
            </Label>
          </TableValue>
          <TableTitle>지방</TableTitle>
          <TableValue width="20%">
            <Label>
              <Input ref={register} name={"fat"} type="number" />
              <Span>g</Span>
            </Label>
          </TableValue>
        </TableRow>
        <TableRow>
          <TableTitle>탄수화물</TableTitle>
          <TableValue width="20%">
            <Label>
              <Input ref={register} name={"arbohydrate"} type="number" />
              <Span>g</Span>
            </Label>
          </TableValue>
          <TableTitle>트랜스지방</TableTitle>
          <TableValue width="20%">
            <Label>
              <Input ref={register} name={"transFat"} type="number" />
              <Span>g</Span>
            </Label>
          </TableValue>
        </TableRow>
        <TableRow>
          <TableTitle>당류</TableTitle>
          <TableValue width="20%">
            <Label>
              <Input ref={register} name={"sugars"} type="number" />
              <Span>g</Span>
            </Label>
          </TableValue>
          <TableTitle>포화지방</TableTitle>
          <TableValue width="20%">
            <Label>
              <Input ref={register} name={"saturatedFat"} type="number" />
              <Span>g</Span>
            </Label>
          </TableValue>
        </TableRow>
        <TableRow>
          <TableTitle>단백질</TableTitle>
          <TableValue width="20%">
            <Label>
              <Input ref={register} name={"protein"} type="number" />
              <Span>g</Span>
            </Label>
          </TableValue>
          <TableTitle>콜레스테롤</TableTitle>
          <TableValue width="20%">
            <Label>
              <Input ref={register} name={"cholesterol"} type="number" />
              <Span>g</Span>
            </Label>
          </TableValue>
        </TableRow>
      </TableBody>
    </NutrientBox>
  );
};

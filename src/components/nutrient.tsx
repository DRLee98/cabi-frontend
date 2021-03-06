import React from "react";
import styled from "styled-components";
import { menuDetailQuery_menuDetail_menu_nutrient } from "../__generated__/menuDetailQuery";

const NutrientBox = styled.table`
  width: 100%;
  border: 1px solid lightgray;
  @media only screen and (max-width: ${({ theme }) =>
      theme.mediumScreenWidth}) {
    font-size: 12px;
  }
`;

const Input = styled.input`
  display: inline-block;
  text-align: right;
  padding: 0.2em;
  width: 100%;
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
  width: 30%;
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

const TotalSize = styled.div`
  width: 50%;
`;

interface NutrientFormProps {
  register: any;
  value?: menuDetailQuery_menuDetail_menu_nutrient | null | undefined;
}

interface NutrientProps {
  nutrient: menuDetailQuery_menuDetail_menu_nutrient | null;
}

export const NutrientForm: React.FC<NutrientFormProps> = ({
  register,
  value,
}) => {
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
              <TotalSize>
                <Input
                  ref={register}
                  name={"volume"}
                  type="number"
                  defaultValue={value?.volume || ""}
                />
              </TotalSize>
              <Span>g</Span>
            </Label>
          </TableValue>
        </TableRow>
        <TableRow>
          <TableValue colSpan={2}>
            <Label>
              <Input
                ref={register}
                name={"calorie"}
                type="number"
                defaultValue={value?.calorie || ""}
              />
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
              <Input
                ref={register}
                name={"salt"}
                type="number"
                defaultValue={value?.salt || ""}
              />
              <Span>mg</Span>
            </Label>
          </TableValue>
          <TableTitle>지방</TableTitle>
          <TableValue width="20%">
            <Label>
              <Input
                ref={register}
                name={"fat"}
                type="number"
                defaultValue={value?.fat || ""}
              />
              <Span>g</Span>
            </Label>
          </TableValue>
        </TableRow>
        <TableRow>
          <TableTitle>탄수화물</TableTitle>
          <TableValue width="20%">
            <Label>
              <Input
                ref={register}
                name={"carbohydrate"}
                type="number"
                defaultValue={value?.carbohydrate || ""}
              />
              <Span>g</Span>
            </Label>
          </TableValue>
          <TableTitle>트랜스지방</TableTitle>
          <TableValue width="20%">
            <Label>
              <Input
                ref={register}
                name={"transFat"}
                type="number"
                defaultValue={value?.transFat || ""}
              />
              <Span>g</Span>
            </Label>
          </TableValue>
        </TableRow>
        <TableRow>
          <TableTitle>당류</TableTitle>
          <TableValue width="20%">
            <Label>
              <Input
                ref={register}
                name={"sugars"}
                type="number"
                defaultValue={value?.sugars || ""}
              />
              <Span>g</Span>
            </Label>
          </TableValue>
          <TableTitle>포화지방</TableTitle>
          <TableValue width="20%">
            <Label>
              <Input
                ref={register}
                name={"saturatedFat"}
                type="number"
                defaultValue={value?.saturatedFat || ""}
              />
              <Span>g</Span>
            </Label>
          </TableValue>
        </TableRow>
        <TableRow>
          <TableTitle>단백질</TableTitle>
          <TableValue width="20%">
            <Label>
              <Input
                ref={register}
                name={"protein"}
                type="number"
                defaultValue={value?.protein || ""}
              />
              <Span>g</Span>
            </Label>
          </TableValue>
          <TableTitle>콜레스테롤</TableTitle>
          <TableValue width="20%">
            <Label>
              <Input
                ref={register}
                name={"cholesterol"}
                type="number"
                defaultValue={value?.cholesterol || ""}
              />
              <Span>g</Span>
            </Label>
          </TableValue>
        </TableRow>
      </TableBody>
    </NutrientBox>
  );
};

export const Nutrient: React.FC<NutrientProps> = ({ nutrient }) => {
  return (
    <NutrientBox>
      <TableHead>
        <TableRow>
          <TableTitle colSpan={2} rowSpan={2}>
            영양정보
          </TableTitle>
          <TableValue colSpan={2}>
            <Label>
              <Span>총 내용량 </Span>
              <Span>{nutrient?.volume ? `${nutrient?.volume}g` : "-"}</Span>
            </Label>
          </TableValue>
        </TableRow>
        <TableRow>
          <TableValue colSpan={2}>
            <Label>
              <Span>
                {nutrient?.calorie ? `${nutrient?.calorie}kcal` : "-"}
              </Span>
            </Label>
          </TableValue>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableTitle>나트륨</TableTitle>
          <TableValue width="20%">
            <Label>
              <Span>{nutrient?.salt ? `${nutrient?.salt}mg` : "-"}</Span>
            </Label>
          </TableValue>
          <TableTitle>지방</TableTitle>
          <TableValue width="20%">
            <Label>
              <Span>{nutrient?.fat ? `${nutrient?.fat}g` : "-"}</Span>
            </Label>
          </TableValue>
        </TableRow>
        <TableRow>
          <TableTitle>탄수화물</TableTitle>
          <TableValue width="20%">
            <Label>
              <Span>
                {nutrient?.carbohydrate ? `${nutrient?.carbohydrate}g` : "-"}
              </Span>
            </Label>
          </TableValue>
          <TableTitle>트랜스지방</TableTitle>
          <TableValue width="20%">
            <Label>
              <Span>{nutrient?.transFat ? `${nutrient?.transFat}g` : "-"}</Span>
            </Label>
          </TableValue>
        </TableRow>
        <TableRow>
          <TableTitle>당류</TableTitle>
          <TableValue width="20%">
            <Label>
              <Span>{nutrient?.sugars ? `${nutrient?.sugars}g` : "-"}</Span>
            </Label>
          </TableValue>
          <TableTitle>포화지방</TableTitle>
          <TableValue width="20%">
            <Label>
              <Span>
                {nutrient?.saturatedFat ? `${nutrient?.saturatedFat}g` : "-"}
              </Span>
            </Label>
          </TableValue>
        </TableRow>
        <TableRow>
          <TableTitle>단백질</TableTitle>
          <TableValue width="20%">
            <Label>
              <Span>{nutrient?.protein ? `${nutrient?.protein}g` : "-"}</Span>
            </Label>
          </TableValue>
          <TableTitle>콜레스테롤</TableTitle>
          <TableValue width="20%">
            <Label>
              <Span>
                {nutrient?.cholesterol ? `${nutrient?.cholesterol}g` : "-"}
              </Span>
            </Label>
          </TableValue>
        </TableRow>
      </TableBody>
    </NutrientBox>
  );
};

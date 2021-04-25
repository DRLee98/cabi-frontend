import { useApolloClient, useMutation } from "@apollo/client";
import {
  faCaretLeft,
  faCaretRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { Button } from "../../components/button";
import { Input, MenuImageInput, Select } from "../../components/Input";
import { NutrientForm } from "../../components/nutrientForm";
import { Container, NextBtn, PrevBtn } from "../../components/styledComponent";
import { siteName } from "../../constants";
import { uploadFile } from "../../upload";
import {
  createMenuMutation,
  createMenuMutationVariables,
} from "../../__generated__/createMenuMutation";
import { Category } from "../../__generated__/globalTypes";
import { CAFE_DETAIL_QUERY } from "../cafeDetail";

const Title = styled.h2`
  margin-bottom: 2em;
  font-weight: bold;
  font-size: x-large;
`;

const FormBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: grid;
  grid-template:
    "Image Contents" 6fr
    "Button Button" 1fr/ 1fr 1fr;
`;

const BtnBox = styled.div`
  margin-top: 1em;
  grid-area: Button;
`;

const ImageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: Image;
`;

const ContentsBox = styled.div`
  grid-area: Contents;
  max-width: 550px;
`;

const OptionBox = styled.div`
  margin: 1em;
`;

const OptionBtn = styled.span`
  display: inline-block;
  cursor: pointer;
  color: ${(prop) => prop.theme.keywordBgColor};
  padding: 10px;
  border-radius: 3px;
  transition: all 0.3s ease;
  min-width: fit-content;
  &:hover {
    background-color: ${(prop) => prop.theme.keywordBgColor};
    color: white;
  }
`;

const OptionInput = styled.input`
  display: block;
  width: 100%;
  min-width: 150px;
  padding: 0.3em 0;
  box-sizing: border-box;
  margin-bottom: 0.2em;
  border-bottom: 1px solid #c1c1c1;
`;

const OptionDelBtn = styled.span`
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: small;
  opacity: 0;
  transition: all 0.5s ease;
  &:hover {
    color: red;
  }
`;

const OptionListOuterBox = styled.div`
  position: relative;
  width: 100%;
`;

const OptionListBox = styled.div`
  overflow: hidden;
  position: relative;
  margin: 0 2.5em;
  left: 0;
  right: 0;
`;

const OptionList = styled.ul<OptionListProps>`
  margin-top: 0.5em;
  display: flex;
  width: max-content;
  transform: translateX(${(prop) => prop.optionsScroll}px);
  transition: all 0.5s ease;
`;

const OptionItem = styled.li`
  max-width: 200px;
  padding: 0.3em;
  max-height: 120px;
  overflow-y: auto;
  position: relative;
  ${OptionBtn} {
    display: block;
  }
  &:hover ${OptionDelBtn} {
    opacity: 1;
  }
`;

const Box = styled.div`
  position: relative;
  &:hover ${OptionDelBtn} {
    opacity: 1;
  }
`;

const CREATE_MENU_MUTATION = gql`
  mutation createMenuMutation($input: CreateMenuInput!) {
    createMenu(input: $input) {
      ok
      error
      menuId
    }
  }
`;

interface OptionListProps {
  optionsScroll: number;
}

interface CreateMenuProp {
  name: string;
  description: string;
  price: number;
  category: Category;
  file: FileList;
  volume?: number;
  calorie?: number;
  salt?: number;
  carbohydrate?: number;
  sugars?: number;
  fat?: number;
  transFat?: number;
  saturatedFat?: number;
  cholesterol?: number;
  protein?: number;
}

interface CreateMenuParams {
  cafeId: string;
}

export const CreateMenu = () => {
  const {
    register,
    handleSubmit,
    errors,
    watch,
    getValues,
    formState,
  } = useForm<CreateMenuProp>({ mode: "onChange" });
  const history = useHistory();
  const client = useApolloClient();
  const { cafeId } = useParams<CreateMenuParams>();
  const [menuImg, setMenuImg] = useState<string | undefined>("");
  const [options, setOptions] = useState<string[]>([]);
  const [additionalOptions, setAdditionalOptions] = useState<string[]>([]);
  const [optionsScroll, setOptionsScroll] = useState<number>(0);
  const [optionListBoxWidth, setOptionListBoxWidth] = useState<number>(0);
  const [optionListWidth, setOptionListWidth] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>();
  const CategoryList = [
    { name: "☕️ 음료", value: Category.Beverage },
    { name: "🍞 빵", value: Category.Bread },
    { name: "🍚 식사", value: Category.Meal },
    { name: "🎀 상품", value: Category.Goods },
    { name: "기타", value: Category.Etc },
  ];

  const addOption = () => {
    const option = `${new Date().getTime()}_option`;
    setOptions((options) => [...options, option]);
  };

  const addOptionItem = (option: string) => {
    const optionItem = `${option}_${new Date().getTime()}_optionItem`;
    setAdditionalOptions((options) => [...options, optionItem]);
  };

  const removeOption = (target: string) => {
    const removedOption = options.filter((option) => option !== target);
    setOptions(removedOption);
    const removedOptionItem = additionalOptions.filter(
      (option) => !option.includes(target),
    );
    setAdditionalOptions(removedOptionItem);
  };

  const removeOptionItem = (target: string) => {
    const removedOptionItem = additionalOptions.filter(
      (option) => option !== target,
    );
    setAdditionalOptions(removedOptionItem);
  };

  const nextBtn = () => {
    setOptionsScroll((prev) => (prev -= 200));
  };

  const prevBtn = () => {
    setOptionsScroll((prev) => (prev += 200));
  };

  const onCompleted = (data: createMenuMutation) => {
    console.log(data);
    const {
      createMenu: { ok, error, menuId },
    } = data;
    if (ok) {
      const { name, description, category, price } = getValues();
      const newMenu = {
        avgScore: 0,
        category,
        description,
        id: menuId,
        menuImg,
        name,
        price: +price,
        totalScore: 0,
        __typename: "Menu",
      };
      const {
        cafeDetail: { cafe },
      } = client.readQuery({
        query: CAFE_DETAIL_QUERY,
        variables: { input: { id: +cafeId } },
      });
      client.writeQuery({
        query: CAFE_DETAIL_QUERY,
        data: {
          cafeDetail: {
            error,
            ok,
            cafe: {
              ...cafe,
              menus: [...cafe.menus, newMenu],
            },
          },
          __typename: "Cafe",
        },
        variables: { input: { id: +cafeId } },
      });
      history.push(`/cafe/${cafeId}`);
    } else {
      setErrorMsg(error);
      setTimeout(() => setErrorMsg(null), 2000);
    }
  };

  const {
    cafeDetail: { cafe },
  } = client.readQuery({
    query: CAFE_DETAIL_QUERY,
    variables: { input: { id: +cafeId } },
  });

  console.log("cache", cafe);

  const [createMenuMutation, { loading }] = useMutation<
    createMenuMutation,
    createMenuMutationVariables
  >(CREATE_MENU_MUTATION, { onCompleted });

  const getOption = () => {
    let list: {
      name: string;
      price?: number | undefined;
      optionItems?: {}[] | undefined;
    }[] = [];
    if (options.length > 0) {
      options.forEach((option) => {
        let itemList: {}[] = [];
        const name: string = getValues(`${option}_name`);
        const price: number = getValues(`${option}_price`);
        const items = additionalOptions.filter((item) => item.includes(option));
        if (items.length > 0) {
          items.forEach((item) => {
            const itemName: string = getValues(`${item}_name`);
            const itemPrice: string = getValues(`${item}_price`);
            const itemObj = { name: itemName, price: +itemPrice };
            if (itemName && itemName !== "") {
              itemList.push(itemObj);
            }
          });
        }
        if (name && name !== "") {
          let optionObj: {
            name: string;
            price?: number;
            optionItems?: {}[];
          } = {
            name,
            price: +price,
            ...(itemList && itemList.length > 0 && { optionItems: itemList }),
          };
          list.push(optionObj);
        }
      });
    }
    return list;
  };

  const onSubmit = async () => {
    if (!loading) {
      let url;
      const {
        name,
        price,
        description,
        category,
        file,
        volume,
        calorie,
        salt,
        carbohydrate,
        sugars,
        fat,
        transFat,
        saturatedFat,
        cholesterol,
        protein,
      } = getValues();
      const optionList = getOption();
      if (file.length > 0) {
        ({ url } = await uploadFile(file[0]));
        setMenuImg(url);
      }
      createMenuMutation({
        variables: {
          input: {
            cafeId: +cafeId,
            name,
            price: +price,
            description,
            category,
            ...(optionList.length > 0 && { options: optionList }),
            ...(url && { menuImg: url }),
            nutrient: {
              ...(volume && { volume: +volume }),
              ...(calorie && { calorie: +calorie }),
              ...(salt && { salt: +salt }),
              ...(carbohydrate && { carbohydrate: +carbohydrate }),
              ...(sugars && { sugars: +sugars }),
              ...(fat && { fat: +fat }),
              ...(transFat && { transFat: +transFat }),
              ...(saturatedFat && { saturatedFat: +saturatedFat }),
              ...(cholesterol && { cholesterol: +cholesterol }),
              ...(protein && { protein: +protein }),
            },
          },
        },
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>{siteName} | 메뉴 만들기</title>
      </Helmet>
      <Container>
        <FormBox>
          <Title>메뉴 만들기</Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ImageBox>
              <MenuImageInput register={register} />
            </ImageBox>
            <ContentsBox>
              <Input
                register={register({
                  required: "이름은 필수 항목입니다",
                })}
                name={"name"}
                label={"이름"}
                write={Boolean(watch("name"))}
                error={errors.name?.message}
              />
              <Input
                register={register({
                  required: "가격는 필수 항목입니다",
                })}
                name={"price"}
                label={"가격"}
                type={"number"}
                write={Boolean(watch("price"))}
                error={errors.price?.message}
              />
              <Input
                register={register({
                  required: "메뉴 설명은 필수 항목입니다",
                })}
                name={"description"}
                label={"설명"}
                write={Boolean(watch("description"))}
                error={errors.description?.message}
              />
              <Select
                register={register({
                  required: "설명은 필수 항목입니다",
                })}
                name="category"
                options={CategoryList}
              />
              <OptionBox>
                <OptionBtn onClick={addOption}>+ 옵션 추가하기</OptionBtn>
                {options.length > 0 && (
                  <OptionListOuterBox>
                    {optionListWidth > optionListBoxWidth && optionsScroll < 0 && (
                      <PrevBtn onClick={prevBtn}>
                        <FontAwesomeIcon icon={faCaretLeft} />
                      </PrevBtn>
                    )}
                    <OptionListBox
                      ref={(ref) =>
                        ref && setOptionListBoxWidth(ref.clientWidth)
                      }
                    >
                      <OptionList
                        optionsScroll={optionsScroll}
                        ref={(ref) =>
                          ref && setOptionListWidth(ref.clientWidth)
                        }
                      >
                        {options.map((option) => (
                          <OptionItem key={option}>
                            <OptionInput
                              ref={register}
                              name={`${option}_name`}
                              placeholder={"옵션 이름"}
                            />
                            <OptionInput
                              ref={register}
                              name={`${option}_price`}
                              placeholder={"옵션 가격"}
                            />
                            <OptionDelBtn onClick={() => removeOption(option)}>
                              <FontAwesomeIcon icon={faTimes} />
                            </OptionDelBtn>
                            <OptionBtn
                              onClick={() => {
                                addOptionItem(option);
                              }}
                            >
                              + 추가 옵션
                            </OptionBtn>
                            {additionalOptions.map(
                              (item) =>
                                item.includes(option) && (
                                  <Box key={item}>
                                    <OptionInput
                                      ref={register}
                                      name={`${item}_name`}
                                      placeholder={"추가 옵션 이름"}
                                    />
                                    <OptionInput
                                      ref={register}
                                      name={`${item}_price`}
                                      placeholder={"추가 옵션 가격"}
                                    />
                                    <OptionDelBtn
                                      onClick={() => removeOptionItem(item)}
                                    >
                                      <FontAwesomeIcon icon={faTimes} />
                                    </OptionDelBtn>
                                  </Box>
                                ),
                            )}
                          </OptionItem>
                        ))}
                      </OptionList>
                    </OptionListBox>
                    {optionListWidth > optionListBoxWidth &&
                      optionsScroll * -1 + optionListBoxWidth <
                        optionListWidth && (
                        <NextBtn onClick={nextBtn}>
                          <FontAwesomeIcon icon={faCaretRight} />
                        </NextBtn>
                      )}
                  </OptionListOuterBox>
                )}
              </OptionBox>
              {watch("category") !== Category.Etc &&
                watch("category") !== Category.Goods && (
                  <NutrientForm register={register} />
                )}
            </ContentsBox>
            <BtnBox>
              <Button
                loading={loading}
                valid={formState.isValid}
                text={"메뉴 만들기"}
                error={errorMsg}
              ></Button>
            </BtnBox>
          </Form>
        </FormBox>
      </Container>
    </>
  );
};

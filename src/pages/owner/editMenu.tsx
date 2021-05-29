import { useApolloClient, useMutation } from "@apollo/client";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { Button } from "../../components/button";
import { Input, MenuImageInput, Select } from "../../components/Input";
import { NutrientForm } from "../../components/nutrient";
import { Slider } from "../../components/slider";
import { Container } from "../../components/styledComponent";
import { siteName } from "../../constants";
import { uploadFile } from "../../upload";
import { Category } from "../../__generated__/globalTypes";
import {
  editMenuMutation,
  editMenuMutationVariables,
} from "../../__generated__/editMenuMutation";
import { MENU_DETAIL_QUERY, useMenuDetail } from "../../hooks/menuDetailQuery";

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
  margin-top: ${(prop) => prop.theme.headerHeight};
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

const EDIT_MENU_MUTATION = gql`
  mutation editMenuMutation($input: EditMenuInput!) {
    editMenu(input: $input) {
      ok
      error
    }
  }
`;

interface EditMenuProp {
  name: string;
  description: string;
  price: number;
  category: Category;
  file: FileList;
  volume?: number | null;
  calorie?: number | null;
  salt?: number | null;
  carbohydrate?: number | null;
  sugars?: number | null;
  fat?: number | null;
  transFat?: number | null;
  saturatedFat?: number | null;
  cholesterol?: number | null;
  protein?: number | null;
}

interface EditMenuParams {
  cafeId: string;
  menuId: string;
}

interface optionObj {
  [key: string]: { name: string; price: number | null };
}

export const EditMenu = () => {
  const history = useHistory();
  const client = useApolloClient();
  const { cafeId, menuId } = useParams<EditMenuParams>();
  const { loading: menuLoading, data: menuData } = useMenuDetail(
    +cafeId,
    +menuId,
  );

  const menu = menuData?.menuDetail.menu;
  const nutrient = menu?.nutrient;
  const menuOptions = menu?.options;

  const defaultOption: optionObj = {};
  const defaultAdditionalOption: optionObj = {};

  menuOptions?.map((option, i) => {
    const optionKey = `${option.name + i}_option`;
    const optionObj = { name: option.name, price: option.price };
    defaultOption[optionKey] = optionObj;
    if (option.optionItems && option.optionItems?.length > 0) {
      option.optionItems.map((addOption) => {
        const addOptionKey = `${optionKey}_${addOption.name}_optionItem`;
        defaultAdditionalOption[addOptionKey] = addOption;
      });
    }
  });

  const [originalMenuImg, setOriginalMenuImg] =
    useState<string | undefined>("");
  const [options, setOptions] = useState<string[]>(
    Object.keys(defaultOption) || [],
  );
  const [additionalOptions, setAdditionalOptions] = useState<string[]>(
    Object.keys(defaultAdditionalOption) || [],
  );
  const [optionWidth, setOptionWidth] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>();
  const [category, setCategory] = useState<Category>();
  const CategoryList = [
    { name: "☕️ 음료", value: Category.Beverage },
    { name: "🍨 디저트", value: Category.Dessert },
    { name: "🍞 빵", value: Category.Bread },
    { name: "🍚 식사", value: Category.Meal },
    { name: "🎀 상품", value: Category.Goods },
    { name: "기타", value: Category.Etc },
  ];

  const { register, handleSubmit, errors, watch, getValues, formState } =
    useForm<EditMenuProp>({
      mode: "onChange",
      defaultValues: {
        name: menu?.name,
        description: menu?.description,
        price: menu?.price,
        category: menu?.category,
      },
    });

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

  const onCompleted = (data: editMenuMutation) => {
    const {
      editMenu: { ok, error },
    } = data;
    if (ok) {
      const {
        name,
        price,
        description,
        category,
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
      const {
        menuDetail: { menu },
      } = client.readQuery({
        query: MENU_DETAIL_QUERY,
        variables: { input: { cafeId: +cafeId, menuId: +menuId } },
      });
      client.writeQuery({
        query: MENU_DETAIL_QUERY,
        data: {
          menuDetail: {
            error,
            ok,
            menu: {
              ...menu,
              name,
              price: +price,
              ...(description && { description }),
              category,
              options: optionList,
              ...(originalMenuImg && { originalMenuImg }),
              editNutrient: {
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
            __typename: "MenuDetailOutput",
          },
          variables: { input: { cafeId: +cafeId, menuId: +menuId } },
        },
      });
      history.push(`/cafe/${cafeId}/menu/${menuId}/`);
    } else {
      setErrorMsg(error);
      setTimeout(() => setErrorMsg(null), 2000);
    }
  };

  const [editMenuMutation, { loading }] = useMutation<
    editMenuMutation,
    editMenuMutationVariables
  >(EDIT_MENU_MUTATION, { onCompleted });

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
      let originalMenuImgUrl;
      let smallMenuImgUrl;
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
        ({ originalImage: originalMenuImgUrl, smallImage: smallMenuImgUrl } =
          await uploadFile(file[0], 400, 500));
        setOriginalMenuImg(originalMenuImgUrl);
      }
      editMenuMutation({
        variables: {
          input: {
            cafeId: +cafeId,
            menuId: +menuId,
            name,
            price: +price,
            description,
            category,
            options: optionList,
            ...(originalMenuImgUrl && { originalMenuImg: originalMenuImgUrl }),
            ...(smallMenuImgUrl && { smallMenuImg: smallMenuImgUrl }),
            editNutrient: {
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

  return menuLoading ? (
    <h1>loading</h1>
  ) : (
    <>
      <Helmet>
        <title>{siteName} | 메뉴 수정하기</title>
      </Helmet>
      <Container>
        <FormBox>
          <Title>메뉴 수정하기</Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ImageBox>
              <MenuImageInput register={register} url={menu?.originalMenuImg} />
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
                register={register()}
                name="category"
                options={CategoryList}
                onchange={() => setCategory(getValues("category"))}
              />
              <OptionBox>
                <OptionBtn onClick={addOption}>+ 옵션 추가하기</OptionBtn>
                {options.length > 0 && (
                  <Slider slideWidth={optionWidth}>
                    {options.map((option) => (
                      <OptionItem
                        key={option}
                        ref={(ref) => ref && setOptionWidth(ref.offsetWidth)}
                      >
                        <OptionInput
                          ref={register}
                          name={`${option}_name`}
                          placeholder={"옵션 이름"}
                          value={defaultOption[option].name || ""}
                        />
                        <OptionInput
                          ref={register}
                          name={`${option}_price`}
                          placeholder={"옵션 가격"}
                          value={defaultOption[option].price || ""}
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
                                  value={
                                    defaultAdditionalOption[item].name || ""
                                  }
                                />
                                <OptionInput
                                  ref={register}
                                  name={`${item}_price`}
                                  placeholder={"추가 옵션 가격"}
                                  value={
                                    defaultAdditionalOption[item].price || ""
                                  }
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
                  </Slider>
                )}
              </OptionBox>
              {category !== Category.Etc && category !== Category.Goods && (
                <NutrientForm register={register} value={nutrient} />
              )}
            </ContentsBox>
            <BtnBox>
              <Button
                loading={loading}
                valid={formState.isValid}
                text={"메뉴 수정하기"}
                error={errorMsg}
              ></Button>
            </BtnBox>
          </Form>
        </FormBox>
      </Container>
    </>
  );
};

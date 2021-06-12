import { useApolloClient, useMutation } from "@apollo/client";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { Button } from "../../../components/button";
import { Input, MenuImageInput, Select } from "../../../components/Input";
import { NutrientForm } from "../../../components/nutrient";
import { Slider } from "../../../components/slider";
import { Container, Title } from "../../../components/styledComponent";
import { siteName } from "../../../constants";
import { uploadFile } from "../../../upload";
import {
  createMenuMutation,
  createMenuMutationVariables,
} from "../../../__generated__/createMenuMutation";
import { Category } from "../../../__generated__/globalTypes";
import { CAFE_DETAIL_QUERY } from "../../../hooks/cafeDetailQuery";
import { Loading } from "../../../components/loading";
import {
  FormBox,
  Form,
  ImageBox,
  ContentsBox,
  OptionBox,
  OptionBtn,
  OptionItem,
  OptionInput,
  OptionDelBtn,
  Box,
  BtnBox,
} from "./styled";
import { CategoryList, getOption } from "./common";

const CREATE_MENU_MUTATION = gql`
  mutation createMenuMutation($input: CreateMenuInput!) {
    createMenu(input: $input) {
      ok
      error
      menuId
    }
  }
`;

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
  const { register, handleSubmit, errors, watch, getValues, formState } =
    useForm<CreateMenuProp>({ mode: "onChange" });
  const history = useHistory();
  const client = useApolloClient();
  const { cafeId } = useParams<CreateMenuParams>();
  const [smallMenuImg, setSmallMenuImg] = useState<string | undefined>("");
  const [options, setOptions] = useState<string[]>([]);
  const [additionalOptions, setAdditionalOptions] = useState<string[]>([]);
  const [optionWidth, setOptionWidth] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>();
  const [category, setCategory] = useState<Category>();

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
        smallMenuImg,
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

  const [createMenuMutation, { loading }] = useMutation<
    createMenuMutation,
    createMenuMutationVariables
  >(CREATE_MENU_MUTATION, { onCompleted });

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
      const optionList = getOption(options, additionalOptions, getValues);
      if (file.length > 0) {
        ({ originalImage: originalMenuImgUrl, smallImage: smallMenuImgUrl } =
          await uploadFile(file[0], 400, 500));
        setSmallMenuImg(smallMenuImgUrl);
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
            ...(originalMenuImgUrl && { originalMenuImg: originalMenuImgUrl }),
            ...(smallMenuImgUrl && { smallMenuImg: smallMenuImgUrl }),
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
        <title>{`${siteName} | 메뉴 만들기`}</title>
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
                  </Slider>
                )}
              </OptionBox>
              {category !== Category.Etc && category !== Category.Goods && (
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

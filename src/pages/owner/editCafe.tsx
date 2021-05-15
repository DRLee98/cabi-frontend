import { useApolloClient, useMutation } from "@apollo/client";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import React, { useState } from "react";
import { AddressData } from "react-daum-postcode";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { AddressForm } from "../../components/addressForm";
import { Button } from "../../components/button";
import {
  CoverImageInput,
  Input,
  KeywordInput,
  Textarea,
} from "../../components/Input";
import { Container } from "../../components/styledComponent";
import { siteName } from "../../constants";
import { uploadFile } from "../../upload";
import { Slider } from "../../components/slider";
import { CAFE_DETAIL_QUERY, useCafeDetail } from "../../hooks/cafeDetailQuery";
import {
  editCafeMutation,
  editCafeMutationVariables,
} from "../../__generated__/editCafeMutation";

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
  width: 75%;
  min-width: 750px;
`;

const BtnBox = styled.div`
  margin-top: 1em;
  grid-area: Button;
`;

const ImageBox = styled.div`
  height: 30vh;
  margin-bottom: 2em;
`;

const ContentsBox = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template:
    "name name" 1fr
    "description address" 2fr/ 1fr 1fr;
`;

const NameBox = styled.div`
  grid-area: name;
  & input {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }
`;

const DescriptionBox = styled.div`
  grid-area: description;
`;

const AddressBox = styled.div`
  grid-area: address;
`;

const KeywordBox = styled.div`
  margin: 1em 0;
  display: flex;
`;

const KeywordBtn = styled.span`
  cursor: pointer;
  color: ${(prop) => prop.theme.keywordBgColor};
  padding: 10px;
  border-radius: 3px;
  margin-right: 1em;
  transition: all 0.3s ease;
  min-width: fit-content;
  &:hover {
    background-color: ${(prop) => prop.theme.keywordBgColor};
    color: white;
  }
`;

const KeywordDelBtn = styled.span`
  position: absolute;
  right: 9px;
  top: 50%;
  transform: translateY(-50%);
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

const KeywordItem = styled.li`
  position: relative;
  &:hover ${KeywordDelBtn} {
    opacity: 1;
  }
  & + & {
    margin-left: 5px;
  }
`;

const EDIT_CAFE_MUTATION = gql`
  mutation editCafeMutation($input: EditCafeInput!) {
    editCafe(input: $input) {
      ok
      error
    }
  }
`;

interface editCafeParam {
  cafeId: string;
}

interface editCafeForm {
  name: string;
  description: string;
  zonecode: string;
  address: string;
  file: FileList;
}

interface keywordObj {
  [key: string]: string;
}

export const EditCafe = () => {
  const { cafeId } = useParams<editCafeParam>();
  const { loading: cafeLoading, data: cafeData } = useCafeDetail(+cafeId);

  const cafe = cafeData?.cafeDetail.cafe;
  const cafeKeywords = cafe?.keywords;

  const defaultKeyword: keywordObj = {};
  cafeKeywords?.map(
    (keyword) => (defaultKeyword[`${keyword.id}_keyword`] = keyword.name),
  );

  const history = useHistory();
  const client = useApolloClient();
  const [coverImg, setCoverImg] = useState<string | undefined>("");
  const [addressResult, setAddressResult] = useState<AddressData>();
  const [errorMsg, setErrorMsg] = useState<string | null>();
  const [keywords, setKeywords] = useState<string[]>(
    Object.keys(defaultKeyword) || [],
  );
  const [keywordWidth, setKeywordWidth] = useState<number>(0);

  const addKeyword = () => {
    const keywordTarget = `${new Date().getTime()}_keyword`;
    setKeywords((keywords) => [...keywords, keywordTarget]);
  };

  const removeKeyword = (target: string) => {
    const removedKeyword = keywords.filter((keyword) => keyword !== target);
    setKeywords(removedKeyword);
  };

  const {
    register,
    handleSubmit,
    errors,
    watch,
    getValues,
    formState,
  } = useForm<editCafeForm>({
    mode: "onChange",
    defaultValues: {
      name: cafe?.name,
      description: cafe?.description,
    },
  });

  const onCompleted = (data: editCafeMutation) => {
    const {
      editCafe: { ok, error },
    } = data;
    if (ok) {
      const { name, description } = getValues();
      let keywordList: { name: unknown; __typename: string }[] = [];
      if (keywords.length > 0) {
        keywordList = keywords.map((keyword) => ({
          name: getValues(keyword),
          __typename: "Keyword",
        }));
      }
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
              ...(name && { name }),
              ...(description && { description }),
              ...(coverImg && { coverImg }),
              keywords: keywordList,
              address: {
                ...cafe.address,
                ...(addressResult && { address: addressResult.address }),
                ...(addressResult && { zonecode: addressResult.zonecode }),
              },
            },
            __typename: "CafeDetailOutput",
          },
        },
        variables: { input: { id: +cafeId } },
      });
      history.push(`/cafe/${cafeId}`);
    } else {
      setErrorMsg(error);
      setTimeout(() => setErrorMsg(null), 2000);
    }
  };

  const [editCafeMutation, { loading }] = useMutation<
    editCafeMutation,
    editCafeMutationVariables
  >(EDIT_CAFE_MUTATION, { onCompleted });

  const onSubmit = async () => {
    if (!loading) {
      let coverImgUrl;
      let keywordsName: string[] = [];
      const { name, description, file } = getValues();
      if (keywords.length > 0) {
        keywords.forEach((keyword) => {
          const value: string = getValues(keyword);
          if (value && value !== "") {
            keywordsName.push(value);
          }
        });
      }
      if (file.length > 0) {
        ({ url: coverImgUrl } = await uploadFile(file[0]));
        setCoverImg(coverImgUrl);
      }
      editCafeMutation({
        variables: {
          input: {
            cafeId: +cafeId,
            name,
            description,
            ...(addressResult && {
              address: {
                zonecode: addressResult?.zonecode,
                address: addressResult?.address,
                sido: addressResult?.sido,
                sigungu: addressResult?.sigungu,
                sigunguCode: addressResult?.sigunguCode,
                bname: addressResult?.bname,
              },
            }),
            ...(coverImgUrl && { coverImg: coverImgUrl }),
            ...(keywordsName && { keywordsName }),
          },
        },
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>{siteName} | 카페 수정하기</title>
      </Helmet>
      <Container>
        <FormBox>
          <Title>카페 수정하기</Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ImageBox>
              <CoverImageInput register={register} url={cafe?.coverImg} />
            </ImageBox>
            <ContentsBox>
              <NameBox>
                <Input
                  register={register({
                    required: "카페이름은 필수 항목입니다",
                  })}
                  name={"name"}
                  label={"카페이름"}
                  write={Boolean(watch("name"))}
                  error={errors.name?.message}
                />
              </NameBox>
              <DescriptionBox>
                <Textarea
                  register={register({
                    required: "카페 설명은 필수 항목입니다",
                  })}
                  name={"description"}
                  placeholder={"카페 설명을 입력해 주세요"}
                  error={errors.description?.message}
                />
              </DescriptionBox>
              <AddressBox>
                <AddressForm
                  register={register}
                  setAddressResult={setAddressResult}
                  addressResult={addressResult}
                  currentAddress={cafe?.address}
                ></AddressForm>
              </AddressBox>
            </ContentsBox>
            <KeywordBox>
              <KeywordBtn onClick={addKeyword}>+ 키워드 추가하기</KeywordBtn>
              <Slider slideWidth={keywordWidth}>
                {keywords?.map((keyword) => (
                  <KeywordItem
                    key={keyword}
                    ref={(ref) => ref && setKeywordWidth(ref.offsetWidth)}
                  >
                    <KeywordInput
                      register={register}
                      name={keyword}
                      value={defaultKeyword[keyword]}
                    />
                    <KeywordDelBtn onClick={() => removeKeyword(keyword)}>
                      <FontAwesomeIcon icon={faTimes} />
                    </KeywordDelBtn>
                  </KeywordItem>
                ))}
              </Slider>
            </KeywordBox>
            <BtnBox>
              <Button
                loading={loading}
                valid={formState.isValid}
                text={"카페 수정하기"}
                error={errorMsg}
              ></Button>
            </BtnBox>
          </Form>
        </FormBox>
      </Container>
    </>
  );
};

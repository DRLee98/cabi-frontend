import { useApolloClient, useMutation } from "@apollo/client";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { AddressForm } from "../../../components/addressForm";
import Button from "../../../components/Button";
import {
  CoverImageInput,
  Input,
  KeywordInput,
  Textarea,
} from "../../../components/Input";
import {
  Container,
  ErrorMsg,
  Title,
} from "../../../components/styledComponent";
import { defaultCoverImg, siteName } from "../../../commonConstants";
import { uploadFile } from "../../../upload";
import {
  createCafeMutation,
  createCafeMutationVariables,
} from "../../../__generated__/createCafeMutation";
import { MY_CAFES_QUERY } from "../myCafes";
import { Slider } from "../../../components/slider";
import {
  AddressBox,
  BtnBox,
  ContentsBox,
  DescriptionBox,
  Form,
  FormBox,
  ImageBox,
  KeywordBox,
  KeywordBtn,
  KeywordDelBtn,
  KeywordItem,
  NameBox,
} from "./styled";
import { NewAddressData } from "types";

const CREATE_CAFE_MUTATION = gql`
  mutation createCafeMutation($input: CreateCafeInput!) {
    createCafe(input: $input) {
      ok
      error
      cafeId
    }
  }
`;

interface CreateCafeForm {
  name: string;
  description: string;
  zonecode: string;
  address: string;
  file: FileList;
}

interface CreateCafeProp {
  userId: number | null | undefined;
}

export const CreateCafe: React.FC<CreateCafeProp> = ({ userId }) => {
  const { register, handleSubmit, errors, watch, getValues, formState } =
    useForm<CreateCafeForm>({ mode: "onChange" });

  const history = useHistory();
  const client = useApolloClient();

  const onCompleted = (data: any) => {
    const {
      createCafe: { ok, error, cafeId },
    } = data;
    if (ok) {
      const { name } = getValues();
      let keywordList: { name: unknown; __typename: string }[] = [];
      if (keywords.length > 0) {
        keywordList = keywords.map((keyword) => ({
          name: getValues(keyword),
          __typename: "Keyword",
        }));
      }
      const newCafe = {
        id: cafeId,
        __typename: "Cafe",
        name,
        smallCoverImgUrl,
        totalScore: 0,
        avgScore: 0,
        keywords: keywordList,
        owner: { __ref: `User:${userId}` },
      };
      const { myCafes } = client.readQuery({
        query: MY_CAFES_QUERY,
      });
      client.writeQuery({
        query: MY_CAFES_QUERY,
        data: {
          myCafes: {
            ...myCafes,
            error,
            ok,
            myCafes: [...myCafes.myCafes, newCafe],
            __typename: "SeeCafeOutput",
          },
        },
      });
      history.push("/");
    } else {
      setErrorMsg(error);
      setTimeout(() => setErrorMsg(null), 2000);
    }
  };

  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [smallCoverImgUrl, setSmallCoverImgUrl] = useState<string | undefined>(
    "",
  );
  const [addressResult, setAddressResult] = useState<NewAddressData>();
  const [addressError, setAddressdError] = useState<String>();
  const [errorMsg, setErrorMsg] = useState<string | null>();
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordWidth, setKeywordWidth] = useState<number>(0);

  const setAddress = (data: NewAddressData) => {
    setAddressResult(data);
  };

  const addKeyword = () => {
    const keywordTarget = `${new Date().getTime()}_keyword`;
    setKeywords((keywords) => [...keywords, keywordTarget]);
  };

  const removeKeyword = (target: string) => {
    const removedKeyword = keywords.filter((keyword) => keyword !== target);
    setKeywords(removedKeyword);
  };

  const [createCafeMutation, { loading }] = useMutation<
    createCafeMutation,
    createCafeMutationVariables
  >(CREATE_CAFE_MUTATION, { onCompleted });

  const onSubmit = async () => {
    if (!loading) {
      let originalCoverImgUrl;
      let smallCoverImgUrl;
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
      if (!addressResult) {
        setAddressdError("주소를 입력해주세요");
        return;
      }
      if (file.length > 0) {
        setUploadLoading(true);
        ({ originalImage: originalCoverImgUrl, smallImage: smallCoverImgUrl } =
          await uploadFile(file[0], 300, 200));
        setSmallCoverImgUrl(smallCoverImgUrl);
        setUploadLoading(false);
      }
      createCafeMutation({
        variables: {
          input: {
            name,
            description,
            address: {
              zonecode: addressResult?.zonecode,
              address: addressResult?.address,
              sido: addressResult?.sido,
              sigungu: addressResult?.sigungu,
              sigunguCode: addressResult?.sigunguCode,
              bname: addressResult?.bname,
              lat: +addressResult?.lat,
              lng: +addressResult?.lng,
            },
            originalCoverImg: originalCoverImgUrl,
            smallCoverImg: smallCoverImgUrl,
            ...(keywordsName && { keywordsName }),
          },
        },
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${siteName} | 카페 만들기`}</title>
      </Helmet>
      <Container>
        <FormBox>
          <Title>카페 만들기</Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ImageBox>
              <CoverImageInput register={register} url={defaultCoverImg} />
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
                  setAddressResult={setAddress}
                  addressResult={addressResult}
                ></AddressForm>
                {addressError && <ErrorMsg>{addressError}</ErrorMsg>}
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
                    <KeywordInput register={register} name={keyword} />
                    <KeywordDelBtn onClick={() => removeKeyword(keyword)}>
                      <FontAwesomeIcon icon={faTimes} />
                    </KeywordDelBtn>
                  </KeywordItem>
                ))}
              </Slider>
            </KeywordBox>
            <BtnBox>
              <Button
                loading={loading || uploadLoading}
                valid={formState.isValid && Boolean(addressResult)}
                text={"카페 만들기"}
                error={errorMsg}
              ></Button>
            </BtnBox>
          </Form>
        </FormBox>
      </Container>
    </>
  );
};

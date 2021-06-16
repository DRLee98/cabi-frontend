import { useApolloClient, useMutation } from "@apollo/client";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { AddressForm } from "../../../components/addressForm";
import Button from "../../../components/Button";
import {
  CoverImageInput,
  Input,
  KeywordInput,
  Textarea,
} from "../../../components/Input";
import { Container, Title } from "../../../components/styledComponent";
import { siteName } from "../../../constants";
import { uploadFile } from "../../../upload";
import { Slider } from "../../../components/slider";
import {
  CAFE_DETAIL_QUERY,
  useCafeDetail,
} from "../../../hooks/cafeDetailQuery";
import {
  editCafeMutation,
  editCafeMutationVariables,
} from "../../../__generated__/editCafeMutation";
import { Loading } from "../../../components/loading";
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
  const [originalCoverImg, setOriginalCoverImg] =
    useState<string | undefined>("");
  const [addressResult, setAddressResult] = useState<NewAddressData>();
  const [errorMsg, setErrorMsg] = useState<string | null>();
  const [keywords, setKeywords] = useState<string[]>(
    Object.keys(defaultKeyword) || [],
  );
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

  const { register, handleSubmit, errors, watch, getValues, formState } =
    useForm<editCafeForm>({
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
              ...(originalCoverImg && { originalCoverImg }),
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
      if (file.length > 0) {
        ({ originalImage: originalCoverImgUrl, smallImage: smallCoverImgUrl } =
          await uploadFile(file[0], 300, 200));
        setOriginalCoverImg(originalCoverImgUrl);
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
                lat: addressResult?.lat,
                lng: addressResult?.lng,
              },
            }),
            ...(originalCoverImgUrl && {
              originalCoverImg: originalCoverImgUrl,
            }),
            ...(smallCoverImgUrl && { smallCoverImg: smallCoverImgUrl }),
            ...(keywordsName && { keywordsName }),
          },
        },
      });
    }
  };

  return cafeLoading ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title>{`${siteName} | 카페 수정하기`}</title>
      </Helmet>
      <Container>
        <FormBox>
          <Title>카페 수정하기</Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ImageBox>
              <CoverImageInput
                register={register}
                url={cafe?.originalCoverImg || "/image/background_basic.png"}
              />
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

import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { NewAddressData } from "types";
import { AddressForm } from "../../components/addressForm";
import Button from "../../components/Button";
import { ImageInput, Input, RadioInput } from "../../components/Input";
import { Container, ErrorMsg, Title } from "../../components/styledComponent";
import { defaultProfileImg, siteName } from "../../commonConstants";
import { uploadFile } from "../../upload";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../../__generated__/createAccountMutation";
import { UserRole } from "../../__generated__/globalTypes";
import {
  FormBox,
  Form,
  ImageBox,
  ContentsBox,
  RadioBox,
  BtnBox,
} from "./styled";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($input: CreateAccountInput!) {
    createAccount(input: $input) {
      ok
      error
    }
  }
`;

interface CreateAccountFormProp {
  email: string;
  name: string;
  password: string;
  verifyPassword: string;
  role: UserRole;
  zonecode: string;
  address: string;
  file: FileList;
}

export const CreateAccount = () => {
  const { register, handleSubmit, errors, watch, getValues, formState } =
    useForm<CreateAccountFormProp>({ mode: "onChange" });
  const history = useHistory();
  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (ok) {
      history.push("/login");
    } else {
      setErrorMsg(error);
      setTimeout(() => setErrorMsg(null), 2000);
    }
  };
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [addressResult, setAddressResult] = useState<NewAddressData>();
  const [addressError, setAddressdError] = useState<String>();
  const [errorMsg, setErrorMsg] = useState<string | null>();
  const [createAccountMutation, { loading }] = useMutation<
    createAccountMutation,
    createAccountMutationVariables
  >(CREATE_ACCOUNT_MUTATION, { onCompleted });

  const setAddress = (data: NewAddressData) => {
    setAddressResult(data);
  };

  const onSubmit = async () => {
    if (!loading) {
      let originalProfileImg;
      let smallProfileImg;
      const { email, name, password, role, file } = getValues();
      if (!addressResult) {
        setAddressdError("????????? ??????????????????");
        return;
      }
      if (file.length > 0) {
        setUploadLoading(true);
        ({ originalImage: originalProfileImg, smallImage: smallProfileImg } =
          await uploadFile(file[0], 200, 200));
        setUploadLoading(false);
      }
      createAccountMutation({
        variables: {
          input: {
            email,
            name,
            password,
            role,
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
            ...(originalProfileImg && { originalProfileImg }),
            ...(smallProfileImg && { smallProfileImg }),
          },
        },
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${siteName} | ????????????`}</title>
      </Helmet>
      <Container>
        <FormBox>
          <Title>????????????</Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ImageBox>
              <ImageInput register={register} url={defaultProfileImg} />
            </ImageBox>
            <ContentsBox>
              <Input
                register={register({
                  required: "???????????? ?????? ???????????????",
                  pattern:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                })}
                name={"email"}
                label={"????????? ??????"}
                write={Boolean(watch("email"))}
                error={
                  errors.email?.type === "pattern"
                    ? "????????? ????????? ????????? ?????????."
                    : errors.email?.message
                }
              />
              <Input
                register={register({
                  required: "???????????? ?????? ???????????????",
                })}
                name={"name"}
                label={"?????????"}
                write={Boolean(watch("name"))}
                error={errors.name?.message}
              />
              <Input
                register={register({
                  required: "??????????????? ?????? ???????????????",
                  minLength: 5,
                  maxLength: 15,
                })}
                name={"password"}
                label={"????????????"}
                type={"password"}
                write={Boolean(watch("password"))}
                error={
                  errors.password?.type === "maxLength" ||
                  errors.password?.type === "minLength"
                    ? "??????????????? 5???????????? 15?????? ?????????."
                    : errors.password?.message
                }
              />
              <Input
                register={register({
                  required: "???????????? ????????? ?????? ???????????????",
                  minLength: 5,
                  maxLength: 15,
                  validate: (data) => data === getValues("password"),
                })}
                name={"verifyPassword"}
                label={"???????????? ??????"}
                type={"password"}
                write={Boolean(watch("verifyPassword"))}
                error={
                  errors.verifyPassword?.type === "maxLength" ||
                  errors.verifyPassword?.type === "minLength"
                    ? "??????????????? 5???????????? 15?????? ?????????."
                    : errors.verifyPassword?.type === "validate"
                    ? "??????????????? ???????????? ????????????."
                    : errors.verifyPassword?.message
                }
              />
              <RadioBox error={errors.role}>
                <RadioInput
                  register={register({ required: true })}
                  name={"role"}
                  label={"?????????"}
                  value={UserRole.Client}
                  check={watch("role") === UserRole.Client}
                />
                <RadioInput
                  register={register({ required: true })}
                  name={"role"}
                  label={"?????????"}
                  value={UserRole.Owner}
                  check={watch("role") === UserRole.Owner}
                />
              </RadioBox>
              <AddressForm
                register={register}
                setAddressResult={setAddress}
                addressResult={addressResult}
              ></AddressForm>
              {addressError && <ErrorMsg>{addressError}</ErrorMsg>}
            </ContentsBox>
            <BtnBox>
              <Button
                loading={loading || uploadLoading}
                valid={formState.isValid && Boolean(addressResult)}
                text={"????????????"}
                error={errorMsg}
              ></Button>
            </BtnBox>
          </Form>
        </FormBox>
      </Container>
    </>
  );
};

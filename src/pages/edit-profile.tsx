import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { AddressData } from "react-daum-postcode";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styled from "styled-components";
import { AddressForm } from "../components/addressForm";
import { Button } from "../components/button";
import { ImageInput, Input } from "../components/Input";
import { Container } from "../components/styledComponent";
import { siteName } from "../constants";
import { useMe } from "../hooks/useMe";
import { uploadFile } from "../upload";
import {
  editProfiletMutation,
  editProfiletMutationVariables,
} from "../__generated__/editProfiletMutation";

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
`;

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfiletMutation($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IEditProfiletForm {
  name?: string;
  oldPassword?: string;
  password?: string;
  verifyPassword?: string;
  zonecode?: string;
  address?: string;
  file?: FileList;
}

export const EditProfile = () => {
  const { data } = useMe();
  const user = data?.myProfile.user;

  const {
    register,
    handleSubmit,
    errors,
    watch,
    getValues,
    formState,
  } = useForm<IEditProfiletForm>({ mode: "onChange" });
  const history = useHistory();
  const onCompleted = (data: editProfiletMutation) => {
    const {
      editProfile: { ok, error },
    } = data;
    if (ok) {
      history.push("/profile");
    } else {
      setErrorMsg(error);
      setTimeout(() => setErrorMsg(null), 2000);
    }
    console.log(data);
  };
  const [addressResult, setAddressResult] = useState<AddressData>();
  const [errorMsg, setErrorMsg] = useState<string | null>();
  const [editProfiletMutation, { loading }] = useMutation<
    editProfiletMutation,
    editProfiletMutationVariables
  >(EDIT_PROFILE_MUTATION, { onCompleted });

  const onSubmit = async () => {
    if (!loading) {
      let profileImg;
      const { name, oldPassword, password, file } = getValues();
      if (file && file.length > 0) {
        ({ url: profileImg } = await uploadFile(file[0]));
      }
      editProfiletMutation({
        variables: {
          input: {
            ...(name && { name }),
            ...(password && { oldPassword, password }),
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
            ...(profileImg && { profileImg }),
          },
        },
      });
    }
  };
  return (
    <>
      <Helmet>
        <title>{siteName} | 회원정보 변경</title>
      </Helmet>
      <Container>
        <FormBox>
          <Title>회원정보 변경</Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ImageBox>
              <ImageInput register={register} url={user?.profileImg} />
            </ImageBox>
            <ContentsBox>
              <Input value={user?.email} label={"이메일"} disabled={true} />
              <Input
                register={register}
                name={"name"}
                label={"닉네임"}
                write={Boolean(watch("name"))}
                error={errors.name?.message}
                value={user?.name}
              />
              <Input
                register={register({
                  minLength: 5,
                  maxLength: 15,
                })}
                name={"oldPassword"}
                label={"현재 비밀번호"}
                type={"password"}
                write={Boolean(watch("oldPassword"))}
                error={
                  errors.oldPassword?.type === "maxLength" ||
                  errors.oldPassword?.type === "minLength"
                    ? "비밀번호는 5자리에서 15자리 입니다."
                    : errors.oldPassword?.message
                }
              />
              <Input
                register={register({
                  minLength: 5,
                  maxLength: 15,
                })}
                name={"password"}
                label={"변경할 비밀번호"}
                type={"password"}
                write={Boolean(watch("password"))}
                error={
                  errors.password?.type === "maxLength" ||
                  errors.password?.type === "minLength"
                    ? "비밀번호는 5자리에서 15자리 입니다."
                    : errors.password?.message
                }
              />
              <Input
                register={register({
                  minLength: 5,
                  maxLength: 15,
                  validate: (data) => data === getValues("password"),
                })}
                name={"verifyPassword"}
                label={"비밀번호 확인"}
                type={"password"}
                write={Boolean(watch("verifyPassword"))}
                error={
                  errors.verifyPassword?.type === "maxLength" ||
                  errors.verifyPassword?.type === "minLength"
                    ? "비밀번호는 5자리에서 15자리 입니다."
                    : errors.verifyPassword?.type === "validate"
                    ? "비밀번호가 일치하지 않습니다."
                    : errors.verifyPassword?.message
                }
              />
              <AddressForm
                register={register}
                setAddressResult={setAddressResult}
                addressResult={addressResult}
                userAddress={user?.address}
              ></AddressForm>
            </ContentsBox>
            <BtnBox>
              <Button
                loading={loading}
                valid={formState.isValid}
                text={"변경하기"}
                error={errorMsg}
              ></Button>
            </BtnBox>
          </Form>
        </FormBox>
      </Container>
    </>
  );
};

import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { AddressData } from "react-daum-postcode";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { AddressForm } from "../components/addressForm";
import { Input, RadioInput } from "../components/Input";
import { Container } from "../components/styledComponent";
import { siteName } from "../constants";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../__generated__/createAccountMutation";
import { UserRole } from "../__generated__/globalTypes";

const FormBox = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form``;

const RadioBox = styled.div`
  display: flex;
  margin-bottom: 2em;
`;

const Button = styled.button``;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($input: CreateAccountInput!) {
    createAccount(input: $input) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  name: string;
  password: string;
  verifyPassword: string;
  role: UserRole;
  zonecode: string;
  address: string;
}

export const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    errors,
    watch,
    getValues,
  } = useForm<ICreateAccountForm>();
  const onCompleted = (data: createAccountMutation) => {
    console.log(data);
  };
  const [addressResult, setAddressResult] = useState<AddressData>();
  const [createAccountMutation, { loading, data }] = useMutation<
    createAccountMutation,
    createAccountMutationVariables
  >(CREATE_ACCOUNT_MUTATION, { onCompleted });

  const onSubmit = () => {
    if (!loading) {
      const { email, name, password, verifyPassword, role } = getValues();
      if (password !== verifyPassword) {
        alert("에러메시지");
        return;
      }
      if (!addressResult) {
        alert("에러메시지");
        return;
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
            },
          },
        },
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>{siteName} | 회원가입</title>
      </Helmet>
      <Container>
        <FormBox>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              register={register}
              name={"email"}
              label={"이메일 계정"}
              write={Boolean(watch("email"))}
            />
            <Input
              register={register}
              name={"name"}
              label={"닉네임"}
              write={Boolean(watch("name"))}
            />
            <Input
              register={register}
              name={"password"}
              label={"비밀번호"}
              type={"password"}
              write={Boolean(watch("password"))}
            />
            <Input
              register={register}
              name={"verifyPassword"}
              label={"비밀번호 확인"}
              type={"password"}
              write={Boolean(watch("verifyPassword"))}
            />
            <RadioBox>
              <RadioInput
                register={register}
                name={"role"}
                label={"고객님"}
                value={UserRole.Client}
                check={watch("role") === UserRole.Client}
              />
              <RadioInput
                register={register}
                name={"role"}
                label={"사장님"}
                value={UserRole.Owner}
                check={watch("role") === UserRole.Owner}
              />
            </RadioBox>
            <AddressForm
              register={register}
              setAddressResult={setAddressResult}
              address={addressResult?.address}
              zonecode={addressResult?.zonecode}
            ></AddressForm>
            <Button>가입하기</Button>
          </Form>
        </FormBox>
      </Container>
    </>
  );
};

import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../components/Button";
import { Input } from "../components/Input";
import { Container } from "../components/styledComponent";
import { siteName, TOKEN } from "../commonConstants";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";
import { isLoginVar, tokenVar } from "../apollo";

const Title = styled.h2`
  margin-bottom: 2em;
  font-weight: bold;
  font-size: x-large;
`;

const FormBox = styled.div`
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form``;

const BtnBox = styled.div`
  margin-top: 1em;
`;

const LOGIN_MUTATION = gql`
  mutation loginMutation($input: LoginInput!) {
    login(input: $input) {
      ok
      error
      token
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, handleSubmit, errors, watch, getValues, formState } =
    useForm<ILoginForm>({ mode: "onChange" });

  const [errorMsg, setErrorMsg] = useState<string | null>();
  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, error, token },
    } = data;
    if (ok && token) {
      tokenVar(token);
      isLoginVar(true);
      localStorage.setItem(TOKEN, token);
      window.location.reload();
      window.location.href = "/";
    } else {
      setErrorMsg(error);
      setTimeout(() => setErrorMsg(null), 2000);
    }
  };
  const [loginMutation, { loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
    }
  };
  return (
    <>
      <Helmet>
        <title>{`${siteName} | ?????????`}</title>
      </Helmet>
      <Container>
        <FormBox>
          <Title>?????????</Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
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
            <BtnBox>
              <Button
                loading={loading}
                valid={formState.isValid}
                text={"?????????"}
                error={errorMsg}
              ></Button>
            </BtnBox>
          </Form>
        </FormBox>
      </Container>
    </>
  );
};

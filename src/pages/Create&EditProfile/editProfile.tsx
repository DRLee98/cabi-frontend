import { useApolloClient, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { NewAddressData } from "types";
import { AddressForm } from "../../components/addressForm";
import Button from "../../components/Button";
import { ImageInput, Input } from "../../components/Input";
import { Container, Title } from "../../components/styledComponent";
import { siteName } from "../../commonConstants";
import { MY_PROFILE_QUERY } from "../../hooks/useMe";
import { uploadFile } from "../../upload";
import {
  editProfiletMutation,
  editProfiletMutationVariables,
} from "../../__generated__/editProfiletMutation";
import { FormBox, Form, ImageBox, ContentsBox, BtnBox } from "./styled";
import { useAppSelector } from "app/hooks";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfiletMutation($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface EditProfileFormProp {
  email: string;
  name?: string;
  oldPassword?: string;
  password?: string;
  verifyPassword?: string;
  zonecode?: string;
  address?: string | null;
  file?: FileList;
}

export const EditProfile = () => {
  const user = useAppSelector((state) => state.loggedInUser.value);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [profileImg, setProfileImg] = useState<string | undefined>("");
  const client = useApolloClient();
  const { register, handleSubmit, errors, watch, getValues, formState } =
    useForm<EditProfileFormProp>({
      mode: "onChange",
      defaultValues: {
        email: user?.email,
        name: user?.name,
        address: user?.address.address,
        zonecode: user?.address.zonecode,
      },
    });

  const history = useHistory();

  const onCompleted = (data: editProfiletMutation) => {
    const {
      editProfile: { ok, error },
    } = data;
    if (ok) {
      const { name } = getValues();
      const {
        myProfile: { user },
      } = client.readQuery({
        query: MY_PROFILE_QUERY,
      });
      client.writeQuery({
        query: MY_PROFILE_QUERY,
        data: {
          myProfile: {
            error,
            ok,
            user: {
              ...user,
              ...(name && { name }),
              ...(profileImg && { originalProfileImg: profileImg }),
              address: {
                ...user.address,
                ...(addressResult && { address: addressResult.address }),
                ...(addressResult && { zonecode: addressResult.zonecode }),
              },
            },
            __typename: "UserProfileOutput",
          },
        },
      });
      history.push("/my-profile");
    } else {
      setErrorMsg(error);
      setTimeout(() => setErrorMsg(null), 2000);
    }
  };
  const [addressResult, setAddressResult] = useState<NewAddressData>();
  const [errorMsg, setErrorMsg] = useState<string | null>();
  const [editProfiletMutation, { loading }] = useMutation<
    editProfiletMutation,
    editProfiletMutationVariables
  >(EDIT_PROFILE_MUTATION, { onCompleted });

  const setAddress = (data: NewAddressData) => {
    setAddressResult(data);
  };

  const onSubmit = async () => {
    if (!loading) {
      let originalProfileImg;
      let smallProfileImg;
      const { name, oldPassword, password, file } = getValues();
      if (file && file.length > 0) {
        setUploadLoading(true);
        ({ originalImage: originalProfileImg, smallImage: smallProfileImg } =
          await uploadFile(file[0], 200, 200));
        setProfileImg(originalProfileImg);
        setUploadLoading(false);
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
                lat: +addressResult?.lat,
                lng: +addressResult?.lng,
              },
            }),
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
        <title>{`${siteName} | 회원정보 변경`}</title>
      </Helmet>
      <Container>
        <FormBox>
          <Title>회원정보 변경</Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ImageBox>
              <ImageInput register={register} url={user?.originalProfileImg} />
            </ImageBox>
            <ContentsBox>
              <Input
                register={register}
                name={"email"}
                label={"이메일"}
                disabled={true}
              />
              <Input
                register={register}
                name={"name"}
                label={"닉네임"}
                write={Boolean(watch("name"))}
                error={errors.name?.message}
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
                setAddressResult={setAddress}
                addressResult={addressResult}
                currentAddress={user?.address}
              ></AddressForm>
            </ContentsBox>
            <BtnBox>
              <Button
                loading={loading || uploadLoading}
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

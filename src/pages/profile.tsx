import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { GridCafe } from "../components/cafes";
import { Loading } from "../components/loading";
import { Container, Image } from "../components/styledComponent";
import { defaultProfileImg, siteName, TOKEN } from "../commonConstants";
import { USER_FRAGMENT } from "../fragments";
import { UserRole } from "../__generated__/globalTypes";
import { UserFragment } from "../__generated__/UserFragment";
import { userProfileQuery } from "../__generated__/userProfileQuery";
import { myChatRoomsQuery } from "__generated__/myChatRoomsQuery";
import { MY_CHAT_ROOMS_QUERY } from "pages/chat/chatGql";
import { ChatRoomList } from "components/chatRooms";
import { PasswordConfirm } from "components/confirm";
import { DimLoading } from "components/loading";
import {
  deleteAccountMutation,
  deleteAccountMutationVariables,
} from "__generated__/deleteAccountMutation";
import { isLoginVar, tokenVar } from "../apollo";

const ProfileBox = styled.section`
  display: grid;
  grid-template-columns: 1fr 3fr;
  padding: 5em 10px;
  @media only screen and (max-width: ${({ theme }) => theme.smallScreenWidth}) {
    display: block;
  }
`;

const SideBox = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentsBox = styled.main`
  padding: 0 3em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (max-width: ${({ theme }) => theme.smallScreenWidth}) {
    margin-top: 1em;
  }
`;

const Name = styled.strong`
  font-size: 40px;
  margin-bottom: 0.5rem;
`;

const Email = styled.small`
  font-size: 15px;
  color: lightseagreen;
  margin-bottom: 1.2rem;
`;

const BtnBase = styled.button`
  font-size: 20px;
  width: fit-content;
  padding: 0.5rem 1rem;
  border: 1px solid;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.5s ease;
`;

const Role = styled(BtnBase)`
  border-color: ${({ theme }) => theme.signatureColor};
  color: ${({ theme }) => theme.signatureColor};
  cursor: auto;
`;

const EditBtn = styled(BtnBase)`
  border-color: ${({ theme }) => theme.disableColor};
  color: ${({ theme }) => theme.disableColor};
  &:hover {
    border-color: ${({ theme }) => theme.signatureColor};
    color: ${({ theme }) => theme.signatureColor};
  }
`;

const DeleteBtn = styled(BtnBase)`
  border-color: ${({ theme }) => theme.disableColor};
  color: ${({ theme }) => theme.disableColor};
  &:hover {
    border-color: ${({ theme }) => theme.redColor};
    color: ${({ theme }) => theme.redColor};
  }
`;

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
`;

const Address = styled.p`
  font-size: 18px;
  color: gray;
  margin-bottom: 1.5rem;
`;

const Section = styled.section`
  & + & {
    padding-top: 2em;
    margin-top: 2em;
    border-top: 2px dashed ${({ theme }) => theme.signatureBgColor};
  }
`;

const SectionTitle = styled.strong`
  display: block;
  margin-bottom: 20px;
  padding-bottom: 10px;
  font-size: 20px;
  //border-bottom: 1px solid ${({ theme }) => theme.signatureColor};
`;

const USER_PROFILE_QUERY = gql`
  query userProfileQuery($input: UserProfileInput!) {
    userProfile(input: $input) {
      ok
      error
      user {
        ...UserFragment
      }
    }
  }
  ${USER_FRAGMENT}
`;

const DELETE_ACCOUNT_MUTATION = gql`
  mutation deleteAccountMutation($input: DeleteAccountInput!) {
    deleteAccount(input: $input) {
      ok
      error
    }
  }
`;

interface ProfileParam {
  id: string;
}

interface MyProfileProp {
  user: UserFragment | null | undefined;
}

export const Profile: React.FC<MyProfileProp> = ({ user: me }) => {
  const { id } = useParams<ProfileParam>();
  const { loading, data } = useQuery<userProfileQuery>(USER_PROFILE_QUERY, {
    variables: { input: { id: +id } },
  });
  const { data: myChatRoomsData, loading: myChatRoomsLoading } =
    useQuery<myChatRoomsQuery>(MY_CHAT_ROOMS_QUERY);

  const user = data?.userProfile.user;
  const myChatRooms = myChatRoomsData?.myChatRooms.chatRooms || [];

  return loading ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title>{siteName} | 회원정보</title>
      </Helmet>
      <Container>
        <ProfileBox>
          <SideBox>
            <Image src={user?.originalProfileImg || defaultProfileImg} />
          </SideBox>
          <ContentsBox>
            <Name>{user?.name} 님</Name>
            <Email>{user?.email}</Email>
            {/* <Address>
              {`(${user?.address.zonecode}) ${user?.address.address}`}
            </Address> */}
            <Box>
              <Role>
                {user?.role === UserRole.Client ? "고객님" : "사장님"}
              </Role>
            </Box>
          </ContentsBox>
        </ProfileBox>
        <Section>
          <SectionTitle>
            {user?.role === UserRole.Client ? "단골 카페" : "사장님의 카페"}
          </SectionTitle>
          {user?.role === UserRole.Client ? (
            <GridCafe cafes={user?.likeCafes} me={me} />
          ) : (
            <GridCafe
              owner={me?.role === UserRole.Owner}
              cafes={user?.cafes}
              me={me}
            />
          )}
        </Section>
        <Section>
          <SectionTitle>참여중인 수다방</SectionTitle>
          <ChatRoomList chatRooms={myChatRooms} />
        </Section>
      </Container>
    </>
  );
};

export const MyProfile: React.FC<MyProfileProp> = ({ user }) => {
  const [deleteAccount, setDeleteAccount] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>();
  const { data: myChatRoomsData, loading: myChatRoomsLoading } =
    useQuery<myChatRoomsQuery>(MY_CHAT_ROOMS_QUERY);
  const [deleteAccountMutation, { loading }] = useMutation<
    deleteAccountMutation,
    deleteAccountMutationVariables
  >(DELETE_ACCOUNT_MUTATION, {
    onCompleted: (data) => {
      const {
        deleteAccount: { ok, error },
      } = data;
      if (ok) {
        tokenVar("");
        isLoginVar(false);
        localStorage.removeItem(TOKEN);
        window.location.reload();
        window.location.href = "/";
      } else {
        setErrorMsg(error);
        setTimeout(() => setErrorMsg(null), 2000);
      }
    },
  });

  const deleteAccountFn = (password: string) => {
    deleteAccountMutation({ variables: { input: { password } } });
  };

  const myChatRooms = myChatRoomsData?.myChatRooms.chatRooms || [];
  return (
    <>
      <Helmet>
        <title>{`${siteName} | 회원정보`}</title>
      </Helmet>
      <Container>
        <ProfileBox>
          <SideBox>
            <Image src={user?.originalProfileImg || defaultProfileImg} />
          </SideBox>
          <ContentsBox>
            <Name>{user?.name} 님</Name>
            <Email>{user?.email}</Email>
            <Address>
              {`(${user?.address.zonecode}) ${user?.address.address}`}
            </Address>
            <Box>
              <Role>
                {user?.role === UserRole.Client ? "고객님" : "사장님"}
              </Role>
              <Link to="/edit-profile">
                <EditBtn>회원정보 변경하기</EditBtn>
              </Link>
              <DeleteBtn
                onClick={() => {
                  setDeleteAccount(true);
                }}
              >
                회원 탈퇴하기
              </DeleteBtn>
            </Box>
          </ContentsBox>
        </ProfileBox>
        <Section>
          <SectionTitle>
            {user?.role === UserRole.Client ? "단골 카페" : "사장님의 카페"}
          </SectionTitle>
          {user?.role === UserRole.Client ? (
            <GridCafe cafes={user?.likeCafes} me={user} />
          ) : (
            <GridCafe owner={true} cafes={user?.cafes} me={user} />
          )}
        </Section>
        <Section>
          <SectionTitle>참여중인 수다방</SectionTitle>
          <ChatRoomList chatRooms={myChatRooms} />
        </Section>
      </Container>
      {deleteAccount && (
        <PasswordConfirm
          text={"회원탈퇴를 위해 비밀번호를 입력해 주세요."}
          okFn={deleteAccountFn}
          cancelFn={() => {
            setDeleteAccount(false);
          }}
          errorMsg={errorMsg}
        />
      )}
      {loading && <DimLoading />}
    </>
  );
};

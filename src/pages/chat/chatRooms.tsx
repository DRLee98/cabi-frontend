import { useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Loading } from "../../components/loading";
import { Container, CenterTitle } from "../../components/styledComponent";
import { siteName } from "../../commonConstants";
import { viewChatRoomsQuery } from "__generated__/viewChatRoomsQuery";
import { myChatRoomsQuery } from "__generated__/myChatRoomsQuery";
import { ChatRoomList } from "components/chatRooms";
import { CreateButton } from "components/createBtn";
import styled from "styled-components";
import { VIEW_CHAT_ROOMS_QUERY, MY_CHAT_ROOMS_QUERY } from "./chatGql";

const Section = styled.section`
  & + & {
    padding-top: 2em;
    margin-top: 2em;
    border-top: 2px dashed ${({ theme }) => theme.signatureBgColor};
  }
`;

export const ChatRooms = () => {
  const { data, loading } = useQuery<viewChatRoomsQuery>(VIEW_CHAT_ROOMS_QUERY);
  const { data: myChatRoomsData, loading: myChatRoomsLoading } =
    useQuery<myChatRoomsQuery>(MY_CHAT_ROOMS_QUERY);
  const chatRooms = data?.viewChatRooms.chatRooms || [];
  const myChatRooms = myChatRoomsData?.myChatRooms.chatRooms || [];

  console.log(myChatRooms);

  return loading || myChatRoomsLoading ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title>{siteName} | 수다방</title>
      </Helmet>
      <Container>
        <CreateButton link={"/create-chat-room"} text="수다방 만들기+" />
        <Section>
          <CenterTitle>참여중인 수다방</CenterTitle>
          <ChatRoomList chatRooms={myChatRooms} />
        </Section>
        <Section>
          <CenterTitle>전체 수다방</CenterTitle>
          <ChatRoomList chatRooms={chatRooms} />
        </Section>
      </Container>
    </>
  );
};

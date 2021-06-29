import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Loading } from "../../components/loading";
import { Container, CenterTitle } from "../../components/styledComponent";
import { siteName } from "../../commonConstants";
import { viewChatRoomsQuery } from "__generated__/viewChatRoomsQuery";
import { ChatRoomList } from "components/chatRooms";
import { CreateButton } from "components/createBtn";
import styled from "styled-components";
import { VIEW_CHAT_ROOMS_QUERY } from "./chatGql";

export const ChatRooms = () => {
  const { data, loading } = useQuery<viewChatRoomsQuery>(VIEW_CHAT_ROOMS_QUERY);
  const chatRooms = data?.viewChatRooms.chatRooms || [];

  console.log(chatRooms);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title>{siteName} | 수다방</title>
      </Helmet>
      <Container>
        <CenterTitle>수다방들</CenterTitle>
        <CreateButton link={"/create-chat-room"} text="수다방 만들기+" />
        <ChatRoomList chatRooms={chatRooms} />
      </Container>
    </>
  );
};

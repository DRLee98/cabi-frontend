import { faCommentDots, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Slider } from "components/slider";
import { UserCircle } from "components/userCircleBox";
import { viewChatRoomsQuery_viewChatRooms_chatRooms } from "__generated__/viewChatRoomsQuery";

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
  @media only screen and (max-width: ${({ theme }) => theme.smallScreenWidth}) {
    padding: 0 10px;
    justify-content: center;
  }
`;

const ChatRoomItem = styled.li`
  position: relative;
  border: 2px solid ${({ theme }) => theme.lightBgColor};
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.signaturelightBgColor};
  }
  transition: background-color 0.2s ease;
`;

const ChatLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 180px;
  padding: 1em;
`;

const IconBox = styled.div`
  font-size: 4em;
  color: ${({ theme }) => theme.signatureColor};
`;

const LockIcon = styled.div`
  position: absolute;
  left: 15px;
  top: 15px;
  font-size: 1.5em;
  color: ${({ theme }) => theme.disableBgColor};
`;

const ChatRoomName = styled.span`
  margin: 10px 0;
`;

const UserItem = styled.li``;

interface ChatRoomListProp {
  chatRooms: viewChatRoomsQuery_viewChatRooms_chatRooms[] | null;
}

export const ChatRoomList: React.FC<ChatRoomListProp> = ({ chatRooms }) => {
  return (
    <List>
      {chatRooms?.map((chatRoom) => (
        <ChatRoomItem key={chatRoom.id}>
          <ChatLink to={`chat-room/${chatRoom.id}`}>
            <IconBox>
              <FontAwesomeIcon icon={faCommentDots} />
            </IconBox>
            <ChatRoomName>{chatRoom.name}</ChatRoomName>
            <Slider slideWidth={200}>
              {chatRoom.users.map((user) => (
                <UserItem>
                  <UserCircle user={user} size={"2.7em"} link={false} />
                </UserItem>
              ))}
            </Slider>
            {chatRoom.secret && (
              <LockIcon>
                <FontAwesomeIcon icon={faLock} />
              </LockIcon>
            )}
          </ChatLink>
        </ChatRoomItem>
      ))}
    </List>
  );
};

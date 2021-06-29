import React from "react";
import styled from "styled-components";
import { UserCircle } from "components/userCircleBox";
import { MessageFragment } from "__generated__/MessageFragment";
import { MessageType } from "__generated__/globalTypes";

const SysMessageBox = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
`;

const SysContext = styled.div`
  font-size: 0.9em;
  color: ${({ theme }) => theme.grayColor};
`;

const MessageBox = styled.li<MessageTypeProp>`
  display: flex;
  ${({ me }) => me && "justify-content: flex-end;"};
  margin-bottom: 15px;
  ${SysMessageBox} + & {
    margin-top: 15px;
  }
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`;

const WriterName = styled.span`
  font-size: 0.9em;
`;

const ContextBox = styled.div`
  position: relative;
  ${WriterName} + & {
    margin-top: 10px;
  }
`;

const Context = styled.p<MessageTypeProp>`
  padding: 0.5em;
  border-radius: 10px;
  background-color: ${({ me, theme }) =>
    me ? theme.myChatBoxBgColor : theme.chatBoxBgColor};
  max-width: 35vw;
`;

const TimeStamp = styled.span<MessageTypeProp>`
  position: absolute;
  bottom: 0;
  ${({ me }) => (me ? "right: 105%;" : "left: 105%;")};
  width: max-content;
  font-size: 12px;
  font-weight: 100;
`;

interface MessageTypeProp {
  me: boolean;
}

interface MessageProp {
  me: boolean;
  message: MessageFragment;
}

export const Message: React.FC<MessageProp> = ({ message, me }) => {
  return message.type === MessageType.System ? (
    <SysMessageBox>
      <SysContext>{message.context}</SysContext>
    </SysMessageBox>
  ) : (
    <MessageBox me={me}>
      {!me && <UserCircle user={message.writer} size={"3.5em"} />}
      <ContentsBox>
        {!me && <WriterName>{message.writer?.name}</WriterName>}
        <ContextBox>
          <Context me={me}>{message.context}</Context>
          <TimeStamp me={me}>
            {new Date(message.createdAt).toLocaleTimeString().slice(0, -3)}
          </TimeStamp>
        </ContextBox>
      </ContentsBox>
    </MessageBox>
  );
};

import styled from "styled-components";
import { UserCircle } from "components/userCircleBox";
import { SimpleUserFragment } from "__generated__/SimpleUserFragment";
import { UserFragment } from "__generated__/UserFragment";
import { useState } from "react";

const List = styled.ul<ListProp>`
  overflow: hidden;
  height: 0;
  transition: all 0.3s ease;
  ${({ open, height }) => open && `height: ${height}px; margin-top: 1em;`}
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Info = styled.div`
  margin-left: 0.8em;
`;

const Name = styled.span`
  display: inline-block;
  font-size: 1.2em;
  margin-bottom: 0.2em;
`;

const Me = styled.span`
  margin-left: 0.3em;
  font-size: 0.8em;
  color: ${({ theme }) => theme.keywordColor};
  background-color: ${({ theme }) => theme.selectKeywordBgColor};
  border-radius: 999px;
  width: 20px;
  height: 20px;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Email = styled.p`
  font-weight: 100;
  font-size: 1em;
  color: ${({ theme }) => theme.grayColor};
`;

interface ListProp {
  open: boolean;
  height: number;
}

interface UserListProp {
  me?: UserFragment | undefined | null;
  users: SimpleUserFragment[];
  open: boolean;
}

export const UserList: React.FC<UserListProp> = ({ users, me, open }) => {
  const [height, setHeight] = useState<number>(0);
  return (
    <List
      open={open}
      height={height}
      ref={(ref) => ref && setHeight(ref.scrollHeight)}
    >
      {users &&
        users.map((user: SimpleUserFragment) => (
          <Item key={user.email}>
            <UserCircle user={user} />
            <Info>
              <Name>
                {user.name}
                {me && me.id === user.id && <Me>나</Me>}
              </Name>
              <Email>{user.email}</Email>
            </Info>
          </Item>
        ))}
    </List>
  );
};

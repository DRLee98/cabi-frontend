import { useState } from "react";
import styled from "styled-components";
import { Image } from "./styledComponent";
import { Link } from "react-router-dom";
import { SimpleUserFragment } from "../__generated__/SimpleUserFragment";
import { UserFragment } from "../__generated__/UserFragment";

const UserInfo = styled.div`
  padding: 0;
  width: 0;
  overflow: hidden;
  box-sizing: content-box;
  transition: all 0.5s ease;
`;

const UserName = styled.h3`
  font-size: 22px;
  min-width: max-content;
  margin-bottom: 0.5em;
`;

const UserEmail = styled.p`
  font-size: 12px;
  min-width: max-content;
`;

const UserDetailBox = styled.div<UserBoxProp>`
  display: flex;
  align-items: center;
  border-radius: 999px;
  border: 4px solid rgb(255 255 255 / 50%);
  background-color: rgb(255 255 255 / 50%);
  &:hover ${UserInfo} {
    padding: 1em;
    width: ${(prop) => prop.width}px;
  }
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  border-radius: 999px;
  border: 4px solid rgb(255 255 255 / 50%);
  background-color: rgb(255 255 255 / 50%);
`;

interface UserBoxProp {
  width?: number;
}

interface UserCircleProp {
  user: SimpleUserFragment | null | undefined;
  me: UserFragment | null | undefined;
}

const getLink = (user: UserCircleProp["user"], me: UserCircleProp["me"]) => {
  if (user) {
    if (me && user.id === me.id) {
      return "/my-profile";
    } else {
      return `/profile/${user?.id}`;
    }
  }
  return "";
};

export const UserCircleDetail: React.FC<UserCircleProp> = ({ user, me }) => {
  const [userNameWidth, setUserNameWidth] = useState<number>(0);
  const [userEmailWidth, setUserEmailWidth] = useState<number>(0);

  const toLink = getLink(user, me);

  return (
    <Link to={toLink}>
      <UserDetailBox
        width={userNameWidth > userEmailWidth ? userNameWidth : userEmailWidth}
      >
        <Image
          src={user?.smallProfileImg || "/image/user_basic.png"}
          sizes={"5rem"}
        />
        <UserInfo>
          <UserName ref={(ref) => ref && setUserNameWidth(ref.offsetWidth)}>
            {user?.name}
          </UserName>
          <UserEmail ref={(ref) => ref && setUserEmailWidth(ref.offsetWidth)}>
            {user?.email}
          </UserEmail>
        </UserInfo>
      </UserDetailBox>
    </Link>
  );
};

export const UserCircle: React.FC<UserCircleProp> = ({ user, me }) => {
  const toLink = getLink(user, me);
  return (
    <UserBox>
      <Link to={toLink}>
        <Image
          src={user?.smallProfileImg || "/image/user_basic.png"}
          sizes={"4rem"}
        />
      </Link>
    </UserBox>
  );
};

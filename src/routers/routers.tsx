import { useReactiveVar } from "@apollo/client";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "../components/Header";
import { Home } from "../pages/home";
import { isLoginVar } from "../apollo";
import { CreateAccount } from "../pages/Create&EditProfile/createAccount";
import { Wrap } from "../components/styledComponent";
import { Login } from "../pages/login";
import { MyProfile, Profile } from "../pages/profile";
import { EditProfile } from "../pages/Create&EditProfile/editProfile";
import { useMe } from "../hooks/useMe";
import { UserRole } from "../__generated__/globalTypes";
import { MyCafes } from "../pages/owner/myCafes";
import { CreateCafe } from "../pages/owner/Create&EditCafe/createCafe";
import { CreateMenu } from "../pages/owner/Create&EditMenu/createMenu";
import { CafeDetail } from "../pages/CafeDetail/cafeDetail";
import { MenuDetail } from "../pages/MenuDetail/menuDetail";
import { EditCafe } from "../pages/owner/Create&EditCafe/editCafe";
import { EditMenu } from "../pages/owner/Create&EditMenu/editMenu";
import { SearchCafe } from "../pages/searchCafe";
import { SearchKeywordCafe } from "../pages/searchKeywordCafe";
import Footer from "components/Footer";
import { Map } from "pages/map";
import { ChatRooms } from "../pages/chat/chatRooms";
import { ChatRoom } from "../pages/chat/chatRoom";
import { CreateChatRoom } from "../pages/chat/createChatRoom";
import { login } from "app/store";
import { useAppDispatch } from "app/hooks";

export const Routers = () => {
  const isLogin = useReactiveVar(isLoginVar);

  const { data: me } = useMe();
  const user = me?.myProfile.user;

  const dispatch = useAppDispatch();
  user && dispatch(login(user));

  //const test = useAppSelector((state) => state.loggedInUser.value);

  const loginRouters = [
    { path: "/my-profile", component: <MyProfile /> },
    { path: "/edit-profile", component: <EditProfile /> },
    { path: "/chat-rooms", component: <ChatRooms /> },
    { path: "/chat-room/:id", component: <ChatRoom /> },
    { path: "/create-chat-room", component: <CreateChatRoom /> },
  ];

  const logoutRouters = [
    { path: "/login", component: <Login /> },
    { path: "/create-account", component: <CreateAccount /> },
  ];

  const ownerRouters = [
    { path: "/", component: <MyCafes /> },
    { path: "/create-cafe", component: <CreateCafe userId={user?.id} /> },
    { path: "/cafe/:cafeId/create-menu", component: <CreateMenu /> },
    { path: "/cafe/:cafeId/edit", component: <EditCafe /> },
    { path: "/cafe/:cafeId/menu/:menuId/edit", component: <EditMenu /> },
  ];

  // const clientRouters = [{ path: "/", component: <Home /> }];

  const commonRouters = [
    { path: "/", component: <Home /> },
    { path: "/search-cafes", component: <SearchCafe /> },
    { path: "/keyword/:slug", component: <SearchKeywordCafe /> },
    { path: "/cafe/:cafeId", component: <CafeDetail /> },
    { path: "/cafe/:cafeId/menu/:menuId", component: <MenuDetail /> },
    { path: "/profile/:id", component: <Profile /> },
    { path: "/map", component: <Map /> },
  ];

  return (
    <Router>
      <Header />
      <Wrap>
        <Switch>
          {isLogin ? (
            <>
              {loginRouters.map((router) => (
                <Route key={router.path} path={router.path} exact>
                  {router.component}
                </Route>
              ))}
              {user?.role === UserRole.Owner &&
                ownerRouters.map((router) => (
                  <Route key={router.path} path={router.path} exact>
                    {router.component}
                  </Route>
                ))}
              {commonRouters.map(
                (router) =>
                  (user?.role !== UserRole.Owner || router.path !== "/") && (
                    <Route key={router.path} path={router.path} exact>
                      {router.component}
                    </Route>
                  ),
              )}
            </>
          ) : (
            <>
              {logoutRouters.map((router) => (
                <Route key={router.path} path={router.path} exact>
                  {router.component}
                </Route>
              ))}
              {commonRouters.map((router) => (
                <Route key={router.path} path={router.path} exact>
                  {router.component}
                </Route>
              ))}
            </>
          )}
          <Redirect to="/" />
        </Switch>
      </Wrap>
      <Footer />
    </Router>
  );
};

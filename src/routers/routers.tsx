import { useReactiveVar } from "@apollo/client";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Header } from "../components/header";
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

export const Routers = () => {
  const isLogin = useReactiveVar(isLoginVar);
  const { data: me } = useMe();
  const user = me?.myProfile.user;

  const loginRouters = [
    { path: "/my-profile", component: <MyProfile user={user} /> },
    { path: "/edit-profile", component: <EditProfile user={user} /> },
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

  const clientRouters = [{ path: "/", component: <Home /> }];

  const commonRouters = [
    { path: "/", component: <Home /> },
    { path: "/search-cafes", component: <SearchCafe /> },
    { path: "/keyword/:slug", component: <SearchKeywordCafe /> },
    { path: "/cafe/:cafeId", component: <CafeDetail me={me} /> },
    { path: "/cafe/:cafeId/menu/:menuId", component: <MenuDetail me={me} /> },
    { path: "/profile/:id", component: <Profile /> },
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
              {commonRouters.map((router) => {
                if (user?.role !== UserRole.Owner || router.path !== "/") {
                  return (
                    <Route key={router.path} path={router.path} exact>
                      {router.component}
                    </Route>
                  );
                }
              })}
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
    </Router>
  );
};

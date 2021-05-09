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
import { CreateAccount } from "../pages/createAccount";
import { Wrap } from "../components/styledComponent";
import { Login } from "../pages/login";
import { Profile } from "../pages/profile";
import { EditProfile } from "../pages/editProfile";
import { useMe } from "../hooks/useMe";
import { UserRole } from "../__generated__/globalTypes";
import { MyCafes } from "../pages/owner/myCafes";
import { CreateCafe } from "../pages/owner/createCafe";
import { CreateMenu } from "../pages/owner/createMenu";
import { CafeDetail } from "../pages/cafeDetail";
import { MenuDetail } from "../pages/menuDetail";

export const Routers = () => {
  const isLogin = useReactiveVar(isLoginVar);
  const { data } = useMe();
  const user = data?.myProfile.user;

  const loginRouters = [
    { path: "/profile", component: <Profile /> },
    { path: "/edit-profile", component: <EditProfile /> },
    { path: "/cafe/:cafeId", component: <CafeDetail /> },
    { path: "/cafe/:cafeId/menu/:menuId", component: <MenuDetail /> },
  ];

  const logoutRouters = [
    { path: "/login", component: <Login /> },
    { path: "/create-account", component: <CreateAccount /> },
  ];

  const ownerRouters = [
    { path: "/", component: <MyCafes /> },
    { path: "/create-cafe", component: <CreateCafe /> },
    { path: "/cafe/:cafeId/create-menu", component: <CreateMenu /> },
  ];

  const clientRouters = [{ path: "/", component: <Home /> }];

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
              {user?.role === UserRole.Client &&
                clientRouters.map((router) => (
                  <Route key={router.path} path={router.path} exact>
                    {router.component}
                  </Route>
                ))}
            </>
          ) : (
            logoutRouters.map((router) => (
              <Route key={router.path} path={router.path} exact>
                {router.component}
              </Route>
            ))
          )}
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/search-cafes/:word" exact>
            <Home />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Wrap>
    </Router>
  );
};

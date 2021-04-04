import { useReactiveVar } from "@apollo/client";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "../components/Header";
import { Home } from "../pages/home";
import { isLoginVar } from "../apollo";
import { CreateAccount } from "../pages/createAccount";
import { Wrap } from "../components/styledComponent";
import { Login } from "../pages/login";
import { Profile } from "../pages/profile";

export const Routers = () => {
  const isLogin = useReactiveVar(isLoginVar);

  const loginRouters = [{ path: "/profile", component: <Profile /> }];

  const logoutRouters = [
    { path: "/login", component: <Login /> },
    { path: "/create-account", component: <CreateAccount /> },
  ];

  const ownerRouters = [{ path: "/", component: <CreateAccount /> }];

  return (
    <Router>
      <Header />
      <Wrap>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/search-cafes/:word" exact>
            <Home />
          </Route>
          {isLogin
            ? loginRouters.map((router) => (
                <Route key={router.path} path={router.path} exact>
                  {router.component}
                </Route>
              ))
            : logoutRouters.map((router) => (
                <Route key={router.path} path={router.path} exact>
                  {router.component}
                </Route>
              ))}
        </Switch>
      </Wrap>
    </Router>
  );
};

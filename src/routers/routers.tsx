import { useReactiveVar } from "@apollo/client";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "../components/Header";
import { Home } from "../pages/home";
import { isLoginVar } from "../apollo";
import { CreateAccount } from "../pages/createAccount";
import { Wrap } from "../components/styledComponent";

export const Routers = () => {
  const isLogin = useReactiveVar(isLoginVar);

  return (
    <Router>
      <Wrap>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          {isLogin ? (
            ""
          ) : (
            <Route path="/create-account" exact>
              <CreateAccount />
            </Route>
          )}
        </Switch>
      </Wrap>
    </Router>
  );
};

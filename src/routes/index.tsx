import React from "react";
import { Switch } from "react-router-dom";

import Route from "./Route";

import { ResetPassword } from "../pages/ResetPassword";
import { SignUp } from "../pages/SignUp";
import { Checkout } from "../pages/Checkout";
import { Success } from "../pages/Success";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={ResetPassword} />
    <Route path="/signUp" exact component={SignUp} />
    <Route path="/checkout" exact component={Checkout} />
    <Route path="/success" exact component={Success} />
  </Switch>
);

export default Routes;

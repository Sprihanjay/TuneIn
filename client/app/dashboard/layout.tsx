import React from "react";
import { SignIn } from "../components/signin/signin";

const dashboard = ({ children }: { children: React.ReactElement }) => {
  const isAuthenticated = false;

  return isAuthenticated ? <div>{children}</div> : <SignIn />;
};

export default dashboard;

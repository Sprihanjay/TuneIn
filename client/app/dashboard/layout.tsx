import React from "react";
import { SignIn } from "../components/signin/signin";

const dashboardLayout = ({ children }: { children: React.ReactElement }) => {

  // TODO: To be set up in future commit
  // const isAuthenticated = false;
  // return isAuthenticated ? <div>{children}</div> : <SignIn />;

  return (
    <>
      {children}
    </>
  )
};

export default dashboardLayout;

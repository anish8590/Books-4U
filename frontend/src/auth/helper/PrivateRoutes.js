import React from "react";
import {Route, Redirect} from "react-router-dom";
import { isAuthenticated } from "./index";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
//https://reactrouter.com/web/example/auth-workflow
//can mount children or components
//only loggedin users can see this components
const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
}

export default PrivateRoute;
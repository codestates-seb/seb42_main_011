import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]))
  }catch(e) {
    return null;
  }
};

const AuthVerify = (props) => {
  // eslint-disable-next-line prefer-const
  let location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if(user) {
      const decodedJwt = parseJwt(user.accessToken);

      if(decodedJwt.exp * 1000 < Date.now()) {
        props.handleLogout();
      }
    }
  }, [location, props]);

};

export default AuthVerify;
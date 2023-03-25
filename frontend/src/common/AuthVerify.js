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
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));

    if(accessToken) {
      const decodedJwt = parseJwt(accessToken);

      if(decodedJwt.exp * 1000 < Date.now()) {
        props.handleLogout();
      }
    }
  }, [location, props]);

};

export default AuthVerify;
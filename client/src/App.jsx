import { useState, useEffect } from "react";

import AppLayout from "./components/layout/Layout";
import { UserContext } from "./components/contexts/userContext";

const App = () => {
  const [authData, setAuthData] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const token = localStorage.getItem('token') || '';
    return { ...user, accessToken: token };
  });

  useEffect(() => {
    console.log('authData updated:', authData);
  }, [authData]);

  const userLoginHandler = (resultData) => {
    setAuthData(resultData);
  };

  const userLogoutHandler = () => {
    setAuthData({});
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <>
      <UserContext.Provider value={{ ...authData, userLoginHandler, userLogoutHandler }}>
        <AppLayout />
      </UserContext.Provider>
    </>
  );
};

export default App;

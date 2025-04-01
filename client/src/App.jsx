import { useState, useEffect } from "react";

import AppLayout from "./components/layout/Layout";
import { UserContext } from "./components/contexts/userContext";

export default function App() {
  const [authData, setAuthData] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const token = localStorage.getItem('token') || '';
    return { ...user, accessToken: token };
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const token = localStorage.getItem('token') || '';
    const updatedAuthData = { ...user, accessToken: token };
    console.log("Updated authData in App:", updatedAuthData); // Debugging log
    setAuthData(updatedAuthData); // Ensure authData is updated on app load
  }, []); // Run only once on component mount

  const userLoginHandler = (resultData) => {
    setAuthData(resultData);
    localStorage.setItem('user', JSON.stringify(resultData));
    localStorage.setItem('token', resultData.accessToken);
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

import { useState } from "react";

import AppLayout from "./components/layout/Layout";
import { UserContext } from "./components/contexts/userContext";

const App = () => {
  const [user, setUser] = useState("");

  const userLoginHandler = (user) => {
    setUser(user);
  }

  return (
    <>
      <UserContext.Provider value={{ user, userLoginHandler }}>
        <AppLayout />
      </UserContext.Provider>
    </>
  );
};

export default App;

import { useState, useContext, createContext, useEffect } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: "" });
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({ ...auth, user: parseData.user, token: parseData.token });
    }
  }, [auth]);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

//custom hook
const useAuth = () => {
  return useContext(AuthContext);
  //return auth state and function to update it
};

export { useAuth, AuthProvider };

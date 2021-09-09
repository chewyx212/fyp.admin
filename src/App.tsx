
import { ChakraProvider, theme } from "@chakra-ui/react";
import { useEffect } from "react";
import { login } from "./app/auth/authSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const isAuth = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = localStorage.getItem("user_token");
    const userString = localStorage.getItem("user_info");
    let user;

    if (userString) {
      user = JSON.parse(userString);
    }
    if (token && user) {
      dispatch(login({ token, user }));
    }
  }, [dispatch]);
  return (
    <ChakraProvider theme={theme}>
      {isAuth ? <Dashboard /> : <AuthPage />}
    </ChakraProvider>
  );
};

export default App;

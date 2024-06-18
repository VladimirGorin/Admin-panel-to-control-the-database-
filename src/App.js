import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import UsersTable from "./components/UsersTable";
import { useCookies } from "react-cookie";
import axios from "axios";
import Main from "./components/Main";
import MissionsTable from "./components/MissionsTable";

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, setCookie] = useCookies();
  const [users, setUsers] = useState([]);
  const [missions, setMissions] = useState([]);

  const isDevMode = false;
  const port = 8000;

  const api = isDevMode
    ? `http://localhost:${port}`
    : "https://api.pushcoin.world";

  const handleLogin = (username, password) => {
    setCookie("isAuth", { status: true, username, password });
    setIsLoggedIn(true);
  };

  const handleVerifyLogin = async (username, password) => {
    try {
      const response = await axios.post(`${api}/admin-verify-auth`, {
        username,
        password,
      });
      return response.data.authStatus;
    } catch (error) {
      return false;
    }
  };

  const handleExportCookies = async () => {
    if (!isEmpty(cookies)) {
      const isAuthData = { ...cookies.isAuth };
      if (isAuthData.status) {
        const verifyLoginStatus = await handleVerifyLogin(
          isAuthData.username,
          isAuthData.password
        );
        if (verifyLoginStatus) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  const handleGetUsers = async () => {
    if (isLoggedIn) {
      const response = await axios.get(`${api}/get-users`);
      setUsers(response.data.users);
    }
  };

  const handleGetMissions = async () => {
    if (isLoggedIn) {
      const response = await axios.get(`${api}/get-all-missions`);
      setMissions(response.data.missions);
    }
  };

  useEffect(() => {
    handleExportCookies();
  }, []);

  useEffect(() => {
    handleGetUsers();
    handleGetMissions();
  }, [isLoggedIn]);

  return (
    <div className="wrapper">
      <Routes>
        <Route path={"/"} element={< Navigate to={"/velarsoftware"} />} />

        <Route
          path="/velarsoftware"
          element={
            isLoggedIn ? (
              <Main />
            ) : (
              <LoginForm
                onLogin={handleLogin}
                verifyLogin={handleVerifyLogin}
              />
            )
          }
        />
        <Route
          path="/missions-table"
          element={
            isLoggedIn ? (
              <MissionsTable
                missions={missions}
                setMissions={setMissions}
                api={api}
              />
            ) : (
              <LoginForm
                onLogin={handleLogin}
                verifyLogin={handleVerifyLogin}
              />
            )
          }
        />
        <Route
          path="/users-table"
          element={
            isLoggedIn ? (
              <UsersTable users={users} setUsers={setUsers} api={api} />
            ) : (
              <LoginForm
                onLogin={handleLogin}
                verifyLogin={handleVerifyLogin}
              />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;

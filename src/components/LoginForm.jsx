import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

const LoginForm = ({ onLogin, verifyLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const verifyLoginStatus = await verifyLogin(username, password)

    if(verifyLoginStatus){
      onLogin(username, password);

    } else {
      setError("Incorrect username or password");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        {error && <p className="error-message">{error}</p>}
        <Button variant="contained" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;

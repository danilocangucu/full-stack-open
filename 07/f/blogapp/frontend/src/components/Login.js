import { useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            id="username"
            label="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            variant="standard"
          />
        </Grid>
        <Grid item>
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            variant="standard"
          />
        </Grid>
      </Grid>
      <br />
      <Grid item>
        <Button type="submit" variant="contained">
          login
        </Button>
      </Grid>
    </form>
  );
};

export default LoginForm;

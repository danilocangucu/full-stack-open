import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Navbar = ({ user, logout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
        <Grid container alignItems="center" justifyContent="flex-end">
          <Grid item>
            <Typography variant="subtitle2" gutterBottom>
              {user.name} logged in
            </Typography>
          </Grid>
          <Grid item>
            <Button onClick={logout} variant="standard" size="small">
              logout
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

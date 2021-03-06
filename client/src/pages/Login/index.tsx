import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../../hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Form } from "@unform/web";
import { Input } from "../../components/Input";

interface LoginFormData {
  login: string;
  password: string;
}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        ParkingSpot
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export function Login() {
  const formRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const navigate = useNavigate();
  const { Login } = useAuth();
  const handleSubmit = async (data: LoginFormData) => {
    console.log(data.login +"----"+ data.password);

    try {
      await Login(data);
      navigate("/dashboard", { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://bandnewsfm.band.uol.com.br/wp-content/uploads/2019/03/Estacionamento.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              ParkingSpot
            </Typography>
            <Form ref={formRef} onSubmit={handleSubmit}>
            <Input label="Login" type="text" name="login" placeholder="Login" />
            <Input label="Senha" type="password" name="password" placeholder="Senha" />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Registrar-se"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Form>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
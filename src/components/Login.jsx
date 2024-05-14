import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import { useState } from "react";
import Input from '@mui/joy/Input';
import { useNavigate } from "react-router-dom";
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Switch from '@mui/joy/Switch';
import ExampleNavigationMenu from './fragments/navigationBar/ExampleNavigationMenu';
import LoginService from '../api/login/loginService';
import authenticationService from '../api/authentication/authenticationService';


function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  // necessary for server-side rendering
  // because mode is undefined on the server
  
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <Button variant="soft">Change mode</Button>;
  }
  return (
    <div>
      <Sheet sx={{
        display:'flex',
        alignContent:'center',
        justifyContent: 'space-between',
      }}>

      <p>Change mode</p>
      <Switch
      sx={
        {
          my:1.5,
          mx:2,
        }
      }
        color="primary"
        size="lg"
        variant="outlined"
        onChange={()=>{
          setMode(mode === 'light' ? 'dark' : 'light');
        }}>

      {mode === 'light' ? 'Turn dark' : 'Turn light'}
      </Switch>
      </Sheet>

  </div>

  );
}

export default function LoginFinal() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loginState, setLoginState] = useState({
    showErrorMessage: false,
  });

  const validate = () =>{
    const errors = {};

    if(!credentials.email || !credentials.password ){
      errors.inputs = "Please fill both the email and password fields";
    }

    return errors;
  };

  const loginClicked = async(event) =>{
    event.preventDefault();

    let errors = validate();

    setErrors(errors);

    console.log(errors);
    if (Object.keys(errors).length === 0){
      const res = await LoginService(
        credentials.email, 
        credentials.password
      );
      if (res.status !== 200){
        setLoginState((prevState) => ({
          ...prevState,
          showErrorMessage: true,
        }));
      } else {
        const token = 'Bearer ' + res.data.access_token;
        authenticationService.setUpToken(token);
        navigate('/GestionClient');
      }
    }
  };

  return (
    <main>
      <ExampleNavigationMenu />
      <CssBaseline />
      <Sheet
        sx={{
          width: 300,
          mx: 'auto', // margin left & right
          my: 35, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>Welcome user</b>
          </Typography>
          <Typography level="body-sm">Sign in to continue.</Typography>
        </div>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            onChange={(e) => 
              setCredentials({ ...credentials, email:e.target.value})
            }
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            id="password"
            name="password"
            type="password"
            onChange={(e) => 
              setCredentials({ ...credentials, password:e.target.value})
            }
            required
          />
        </FormControl>
        <Button sx={{ mt: 1 }} onClick={loginClicked}>Log in</Button>
        
        {loginState.showErrorMessage && (
          <div>Invalid credentials</div>
        )}
        <Typography
          endDecorator={<Link href="/sign-up">Sign up</Link>}
          fontSize="sm"
          sx={{ alignSelf: 'center' }}
        >
          Don&apos;t have an account?
        </Typography>
        <ModeToggle />
      </Sheet>
    </main>
  );
}
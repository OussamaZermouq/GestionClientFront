import * as React from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import CssBaseline from '@mui/joy/CssBaseline';
import ExampleNavigationMenu from '../fragments/navigationBar/ExampleNavigationMenu';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Add from '@mui/icons-material/Add';
import ajouterClient from '../../api/client/AddClientService';
import SnackbarHideDuration from '../fragments/notification/SnackBarNotification'

export default function AjouterClient() {
  var [open, setOpen] = React.useState(false);

  const handleButtonClick = () => {
    setOpen(!open);
  };

  function handleSubmit(e){
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    var res = ajouterClient(formJson);
    res.then((value) => {
      if (value===202){
        handleButtonClick();
      }
    });
  }

  return (
    <main>
        <ExampleNavigationMenu />   
    <Card
      variant="outlined"
      sx={{
        maxHeight: 'max-content',
        maxWidth: '40%',
        mx: 'auto',
        overflow: 'auto',
        my:15
      }}
    >
      <form onSubmit={handleSubmit}>

      <Typography level="title-lg" startDecorator={<Add />}>
        Ajouter un client
      </Typography>
      <Divider inset="none" />
      <CardContent
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
          gap: 1.5,
        }}
      >
        <Box >
          <Typography >Nom</Typography >
          <Input name="client_nom" />
        </Box>
        
        <Box>
          <Typography >Prenom</Typography >
          <Input name="client_prenom"/>
        </Box>
        
        <Box sx={{ gridColumn: '1/-1' }}>
          <Typography >Adresse</Typography >
          <Input  name="adresse"/>
        </Box>

        <Box >
          <Typography >Telephone</Typography >
          <Input name="telephone"/>
        </Box>
        <Box>
        <Typography >Date naissance</Typography >
          <Input type='date' name='date_naiss'/>
        </Box>

        <Box>
          <Typography >Email</Typography >
          <Input type='email' name="email"/>
        </Box>

        <Box>
        <Typography >Status</Typography >

          <Select name='status' defaultValue='OK'>
              <Option value="OK">OK</Option>
              <Option value="Inactive">Inactive</Option>
          </Select>
        </Box>

        <CardActions sx={{ gridColumn: '1/-1' }}>
          <Button variant="solid" color="primary" type='submit'>
            Ajouter client
          </Button>
        </CardActions>
      </CardContent>
      </form>
    </Card>

    {open && <SnackbarHideDuration />}
    
    <CssBaseline />
    </main>
    
  );
}

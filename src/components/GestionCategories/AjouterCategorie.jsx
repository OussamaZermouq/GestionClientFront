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
import Add from '@mui/icons-material/Add';
import ajouterClient from '../../api/client/AddClientService';
import SnackbarHideDuration from '../fragments/notification/SnackBarNotification'
import ajouterCategory from '../../api/Categories/AjouterCategoryDataService';



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
    var res = ajouterCategory(formJson);
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
        Ajouter un categorie
      </Typography>
      <Divider inset="none" />
      <CardContent
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
          gap: 1.5,
          my:3
        }}
      >
        <Box >
          <Typography >Nom Categorie</Typography >
          <Input name="titre" />
        </Box>
        
        <Box>
          <Typography >Description categorie</Typography >
          <Input name="description"/>
        </Box>

        <CardActions sx={{ gridColumn: '1/-1' }}>
          <Button variant="solid" color="primary" type='submit'>
            Ajouter categorie
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

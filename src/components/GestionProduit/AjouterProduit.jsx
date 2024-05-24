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

export default function AjouterProduit() {
    return <main>
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
      <form >

      <Typography level="title-lg" startDecorator={<Add />}>
        Ajouter un produit
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
          <Typography >Titre de produit</Typography >
          <Input name="titreProduit" />
        </Box>
        
        <Box>
          <Typography >Prix</Typography >
          <Input name="prix"/>
        </Box>
        <Box>
          <Typography >Couleur</Typography >
          <Input name="couleur"/>
        </Box>
        <Box>
          <Typography >Type</Typography >
          <Input name="type"/>
        </Box>
        <Box>
        <Typography >Category</Typography >

          <Select name='status' defaultValue='OK'>
              <Option value=""></Option>
          </Select>
        </Box>

        <CardActions sx={{ gridColumn: '1/-1' }}>
          <Button variant="solid" color="primary" type='submit'>
            Ajouter produit
          </Button>
        </CardActions>
      </CardContent>
      </form>
    </Card>

    
    
    <CssBaseline />
        
    </main>
}

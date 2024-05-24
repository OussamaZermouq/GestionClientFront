import { CssBaseline } from "@mui/joy"
import ExampleNavigationMenu from "../fragments/navigationBar/ExampleNavigationMenu";

import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Input from "@mui/joy/Input";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/joy/Button";
import Add from '@mui/icons-material/Add';
import Stack from '@mui/joy/Stack';
import Table from '@mui/joy/Table';
import { useNavigate } from "react-router-dom";




export default function GestionProduit() {
  const navigate = useNavigate();

  function navigateAjouterProduit(e){
    navigate(`/GestionProduit/ajouter`);
}
    return (
        <main>
           <ExampleNavigationMenu />
            <Box sx={{
              m:5,
            }}> 
            <CssBaseline />
            <Stack 
                direction="row" 
                spacing={1} 
                justifyContent="flex-end"
                mx={20}
                divider={<Divider orientation="vertical" />} 
                >

                <Button variant="solid" onClick={(e)=>navigateAjouterProduit(e)} startDecorator={<Add />} >
                    Ajouter Produit
                </Button>
                <Input
                startDecorator={<SearchIcon />}
                endDecorator={<Button>Search</Button>}
                ></Input>
            </Stack>
            <Table>
      <caption> Ce tableau montre tout les produit</caption>
      <thead>
        <tr>
          <th style={{ width: '40%' }}>Titre </th>
          <th>Prix</th>
          <th>Couleur</th>
          <th>Type</th>
          <th>Client</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Frozen yoghurt</td>
          <td>159</td>
          <td>6</td>
          <td>24</td>
          <td>4</td>
        </tr>
        <tr>
          <td>Ice cream sandwich</td>
          <td>237</td>
          <td>9</td>
          <td>37</td>
          <td>4.3</td>
        </tr>
        <tr>
          <td>Eclair</td>
          <td>262</td>
          <td>16</td>
          <td>24</td>
          <td>6</td>
        </tr>
        <tr>
          <td>Cupcake</td>
          <td>305</td>
          <td>3.7</td>
          <td>67</td>
          <td>4.3</td>
        </tr>
        <tr>
          <td>Gingerbread</td>
          <td>356</td>
          <td>16</td>
          <td>49</td>
          <td>3.9</td>
        </tr>
      </tbody>
    </Table>
    </Box>
        </main>
    )
}
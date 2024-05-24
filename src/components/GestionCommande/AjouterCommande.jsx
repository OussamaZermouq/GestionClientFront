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
import getClients from '../../api/client/ClientDataService';
import getProduits from '../../api/Product/ProductDataService'
import Chip from '@mui/joy/Chip';
import { Grid, MenuItem } from '@mui/joy';
import SnackbarHideDuration from '../fragments/notification/SnackBarNotification';
import ajouterCommande from '../../api/commandes/AjouterCommandeDataService';

export default function AjouterCommande() {
    const [clientData, setClientData] = React.useState(null);
    const [produitData, setProduitData] = React.useState(null);
    const [optionCount, setOptionCount] = React.useState(0);
    const [chipTitleArray, setchipTitleArray] = React.useState([]); 
    const [selectedProducts, setSelectedProducts] = React.useState([]);
    const [selectedClient, setSelectedClient] = React.useState([]);
    var [open, setOpen] = React.useState(false);
    
    const handleSuccess = () => {
        setOpen(!open);
      };

    const handleAddOption = (e) => {
        setOptionCount(prevCount => prevCount + 1); 
        chipTitleArray.push(e.target.textContent)
        if (!selectedProducts.some(product => product.id_produit === e.target.value)) {
            setSelectedProducts(prevSelectedProducts => [
                ...prevSelectedProducts,
                { id_produit: e.target.value }
            ]);
        }
    };

    const selectClient = (e) =>{
        selectedClient.client_id = e.target.value
        console.log(selectedClient)
    }
    React.useEffect(()=>{
        async function fetchData(){
            const client_data = await getClients();
            setClientData(client_data);
            const produit_Data = await getProduits();
            setProduitData(produit_Data);
        }
        fetchData();
    },[]);

    function handleSubmit(e){
        e.preventDefault();
    
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        
        //ya rebi tsme7 lia hadchi ra 7ram maybghih la lah la 3ebdo hadi ra 6 dial sbah o hadchi li 3ta lah 
        if (typeof formJson.client !== 'object') {
            formJson.client = {};
        }
    
        // Set client_id in formJson.client
        formJson.client.client_id = formJson.client_id;
        delete formJson.client_id; 
    
        formJson.produits = selectedProducts;
        console.log(formJson);
        ajouterCommande(formJson)
        .then((status) => {
            if (status === 202) {
                handleSuccess();
            }
        })
        .catch((error) => {
            console.error('Error while adding command:', error);
         
        });
      }

    return <main>
        <ExampleNavigationMenu />
        <Card
            variant="outlined"
            sx={{
                maxHeight: 'max-content',
                maxWidth: '40%',
                mx: 'auto',
                overflow: 'auto',
                my: 15
            }}
        >
            <form onSubmit={handleSubmit}>

                <Typography level="title-lg" startDecorator={<Add />}>
                    Ajouter une commande
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
                        <Typography >Titre </Typography >
                        <Input required name="commande_titre" />
                    </Box>

                    <Box>
                        <Typography >Date</Typography >
                        <Input required type="date"
                        name='commande_date'></Input>
                    </Box>

                    <Box>
                        <Typography >Client</Typography >
                        {clientData && clientData.length > 0 && (
                            <Select name='client_id' onChange={(e)=>selectClient(e)}>
                                {clientData.map(client => (
                                    <Option key={client.client_id} value={client.client_id}>{client.client_nom + ' ' + client.client_prenom} </Option>
                                ))}
                            </Select>
                        )}
                    </Box>
                    
                    <Box>
                        <Typography >Status</Typography >
                        <Select name='status' defaultValue='EN ATTENTE'>
                            <Option value="LIVREE">LIVREE</Option>
                            <Option value="EN ATTENTE">EN ATTENTE</Option>
                            <Option value="ANNULEE">ANNULEE</Option>
                        </Select>
            </Box>
                    
                <Box sx={{ gridColumn: '1/-1' }}>
                    <Typography>Produit</Typography>
                    {produitData && produitData.length > 0 && (
                        <Select onChange={(e)=>handleAddOption(e)} >
                            {produitData.map(produit => (
                                <MenuItem key={produit.id_produit} multiple value={produit.id_produit}>{produit.titre_produit}</MenuItem>
                            ))}
                        </Select>
                    )}
                    
                </Box>
                    
                    <Grid sx={{ gridColumn: '1/-1'}} >
                        {[...Array(optionCount)].map((_, index) => (
                            <Chip  sx={{my:0.5, mx:1}} color="primary" variant='outlined' size="lg" >{chipTitleArray[index]}</Chip>
                        ))}
                    </Grid>

                    <CardActions sx={{ gridColumn: '1/-1' }}>
                        <Button variant="solid" color="primary" type='submit'>
                            Ajouter Commande
                        </Button>
                    </CardActions>
                </CardContent>
            </form>
        </Card>

        {open && <SnackbarHideDuration />}
        <CssBaseline />

    </main>
}

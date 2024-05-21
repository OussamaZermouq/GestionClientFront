import * as React from 'react';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import { useEffect, useState } from 'react';
import getClientsById from "../../../api/client/ClientByIdDataService";
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Grid from '@mui/joy/Grid';
import CommandeClient from '../commandes/CommandeClient';
import SaveIcon from '@mui/icons-material/Save';
import updateClient from '../../../api/client/UpdateClientService';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import ProductCard from "../Produit/ProduitFragment";
import getRecommendations from '../../../api/recommendation/RecommendationDataSetvice';
import getProduitById from '../../../api/Product/ProductDataService';


export default function ClientProfile(props){

    const [clientData, setClientData] = useState(null);
    const [recommendedProducts, setRecommendedProducts] = useState([]);

    // Fetch client data once
    useEffect(() => {
        async function fetchClient() {
            const data = await getClientsById(props.client_id);
            setClientData(data);
        }
        fetchClient();
    }, [props.client_id]);

    // Fetch recommendations and their corresponding products once
    useEffect(() => {
        async function fetchRecommendationsAndProducts() {
            const recommendations = await getRecommendations(props.client_id);
            const productIds = recommendations[props.client_id];
            const products = await Promise.all(productIds.map(id => getProduitById(id)));
            setRecommendedProducts(products);
        }
        fetchRecommendationsAndProducts();
    }, [props.client_id]);

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        updateClient(props.client_id, formJson);
    }
    return(

        <Grid
        container
        rowSpacing={2}
        columns={{ xs: 6, sm: 6, md: 6 }}
        sx={{ width: 'auto', mx:30, my:20 , flexGrow: 1 }}
      >
        <Box sx={{width: '50%'}}>
        <Grid xs={6} sx={{width: '50%'}}>
            <h1>Client Information :</h1>
            
            <Stack spacing={2}>
            <form method='post' onSubmit={handleSubmit}>

            <h3>Nom : </h3>{clientData && ( <Input name="client_nom" placeholder= {clientData.client_nom} />)}

            <h3>Prenom : </h3>{clientData && ( <Input name="client_prenom" placeholder= {clientData.client_prenom}/>)}

            <h3>Telephone : </h3>{clientData && ( <Input name="telephone" placeholder= {clientData.telephone}/>)}

            <h3>Email : </h3>{clientData && ( <Input name="email" placeholder= {clientData.email}/>)}

            <h3>Adresse : </h3>{clientData && ( <Input name="adresse" placeholder= {clientData.adresse}/>)}

            <h3>Status : </h3>
            <Select name='status' defaultValue={clientData && clientData.status}>
                <Option value="OK">OK</Option>
                <Option value="Inactive">Inactive</Option>
            </Select>

                <Stack spacing={2} direction="row" sx={{my:5}}>
                    
                    <Box sx={{ fontSize: 'sm', color: 'text.tertiary' }}>
                        <Button type="submit"> <SaveIcon /> Save Information</Button>
                    </Box>
                    <Box sx={{ fontSize: 'sm', color: 'text.tertiary' }}>
                        <Button>Cancel</Button>
                    </Box>
                </Stack>
            </form>
            </Stack>

        </Grid>
        </Box>
        <Box sx={{overflow: { xs: 'scroll', sm: 'scroll', m:'scroll' } }}>

         <Grid xs={6}>
                 <h1>Commandes :</h1>
                 {/* so that the props are not null when being sent which is common since its an async function */}
                 {clientData && <CommandeClient CommandeData={clientData} /> }

         </Grid>
         </Box>


    <Box sx={{ flexGrow: 1 }}>
    <h1>Produits Suggérés :</h1>
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {recommendedProducts && recommendedProducts.map(product => (
        <Grid xs={2} sm={4} md={4} >
            <ProductCard produitData={product}/>
        </Grid>
        ))}
        </Grid>
    </Box>
    </Grid>

    );
}
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

export default function ClientProfile(props){
    const [clientData, setClientData] = useState(null);

    useEffect(() => {
        async function fetchClient() {
            const data = await getClientsById(props.client_id);
            console.log("data : ", data)
            setClientData(data);
        }
        fetchClient();
    }, []);
    
      
    return(
        <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ width: '100%'}}
      >
      <Grid xs={6}>
        <Box sx={{ width: 400, mx:30, my:20 }}>
        <h1>Client Information :</h1>
        
        <Stack spacing={2}>
        <h3>Nom : </h3>{clientData && ( <Input placeholder= {clientData.client_nom}/>)}

        <h3>Prenom : </h3>{clientData && ( <Input placeholder= {clientData.client_prenom}/>)}

        <h3>Telephone : </h3>{clientData && ( <Input placeholder= {clientData.telephone}/>)}

        <h3>Email : </h3>{clientData && ( <Input placeholder= {clientData.email}/>)}

        <h3>Adresse : </h3>{clientData && ( <Input placeholder= {clientData.adresse}/>)}
            <Stack spacing={2} direction="row">
                
                <Box sx={{ fontSize: 'sm', color: 'text.tertiary' }}>
                    <Button> <SaveIcon /> Save Information</Button>
                </Box>
                <Box sx={{ fontSize: 'sm', color: 'text.tertiary' }}>
                    <Button>Cancel</Button>
                </Box>
            </Stack>
        </Stack>
      </Box>
    </Grid>
        <Grid xs={6}>
        <Box sx={{ width: 700, my:20 }}>
            <h1>Commandes :</h1>
            <CommandeClient />
        </Box>
        </Grid>
    </Grid>
    );
}
import ExampleNavigationMenu from "../fragments/navigationBar/ExampleNavigationMenu";
import CssBaseline from '@mui/joy/CssBaseline';
import ClientCard from  "../fragments/Client/ClientCard"
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Box';
import getClients from "../../api/client/ClientDataService";
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Input from "@mui/joy/Input";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/joy/Button";
import Add from '@mui/icons-material/Add';
import Stack from '@mui/joy/Stack';
import { useNavigate } from "react-router-dom";
//home page for the admin, first page after the login.
  
export default function GestionClient(){
    const [clientData, setClientData] = useState(null);
    const navigate = useNavigate();



    function navigateAjouterClient(e){
        navigate(`/GestionClient/ajouter`);
    }

    useEffect(() => {
        async function fetchClients() {
            const data = await getClients();
            setClientData(data);
        }
        fetchClients();
    }, []);
    return (
        <main>
            <ExampleNavigationMenu />

            <Stack 
                direction="row" 
                spacing={1} 
                justifyContent="flex-end"
                mx={20}
                divider={<Divider orientation="vertical" />} 
                >


                <Button variant="solid" onClick={(e)=>navigateAjouterClient(e)} startDecorator={<Add />}>
                    Ajouter Client
                </Button>
                <Input
                startDecorator={<SearchIcon />}
                endDecorator={<Button>Search</Button>}
                ></Input>
            </Stack>
            
            <Box component="section" sx={{ p: 2, border: 'none', display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                <Grid
                    container
                    rowSpacing={5}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    sx={{ width: '100%', alignItems: "center" }}>
                    {clientData && clientData.map(client => (
                        <Grid key={client.id} xs={2} p={2} sm={4} md={4} >
                            <Item>
                                <ClientCard client={client} />
                            </Item>
                        </Grid>
                    ))}
                </Grid>
                </Box>
            <CssBaseline />
           
        </main>
    );
};
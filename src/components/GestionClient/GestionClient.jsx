import ExampleNavigationMenu from "../fragments/navigationBar/ExampleNavigationMenu";
import CssBaseline from '@mui/joy/CssBaseline';
import ClientCard from  "../fragments/Client/ClientCard"
import Sheet from "@mui/joy/Sheet";
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Box';
import getClients from "../../api/client/ClientDataService";
//home page for the admin, first page after the login.
  
export default function GestionClient(){
    const [clientData, setClientData] = useState(null);

    useEffect(() => {
        async function fetchClients() {
            const data = await getClients();
            console.log("data : ", data)
            setClientData(data);
        }
        fetchClients();
    }, []);
    return (
        <main>

            <ExampleNavigationMenu />
            <Sheet
            sx={{
                my:4,
                mx:15,
            }}>
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    sx={{ flexGrow: 1 }}>
                    {clientData && clientData.map(client => (
                        <Grid key={client.id} xs={2} sm={4} md={4}>
                            <Item>
                                <ClientCard client={client} />
                            </Item>
                        </Grid>
                    ))}
                </Grid>

            </Sheet>
            <CssBaseline />
           
        </main>
    );
};
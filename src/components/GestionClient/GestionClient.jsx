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
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import deleteClient from "../../api/client/DeleteClientService";
//home page for the admin, first page after the login.
  
export default function GestionClient(){
    const [clientData, setClientData] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [selectedClientId, setSelectedClientId] = useState(null); 
    const navigate = useNavigate();
    const toggleModal = (clientId) => {
        setOpen(!open);
        setSelectedClientId(clientId);
    };

     // Function to handle delete action
     const handleDelete = () => {
        // Perform delete action using selectedClientId
        console.log("Deleting client with ID:", selectedClientId);
        deleteClient(selectedClientId).then((response) => {
            console.log("Deleted client with ID:", selectedClientId);
        })
        setOpen(false);
    };


    function AlertDialogModal() {
        return (
          <React.Fragment>
            <Modal open={open} onClose={() => setOpen(false)}>
              <ModalDialog variant="outlined" role="alertdialog">
                <DialogTitle>
                  <WarningRoundedIcon />
                  Confirmation
                </DialogTitle>
                <Divider />
                <DialogContent>
                  Voulez vous vraiment supprimer ce client
                </DialogContent>
                <DialogActions>
                  <Button variant="solid" color="danger" onClick={() => handleDelete()}>
                    Supprimer
                  </Button>
                  <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                    Annuler
                  </Button>
                </DialogActions>
              </ModalDialog>
            </Modal>
          </React.Fragment>
        );
      }

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
            <Box sx={{
              my:5,
            }}>

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
            
            <Box sx={{ p: 10, border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid
                    container 
                    justifyContent="center"
                    alignItems="center"
                    spacing={{ xs: 2, md: 3 }} 
                    columns={{ xs: 4, sm: 8, md: 12 }}>
                    {clientData && clientData.map(client => (
                        <Grid item key={client.id} xs={2} p={2} sm={2} md={3}  sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Item>
                            <ClientCard client={client} toggleModal={toggleModal} /> {/* Pass toggleModal function as prop */}
                            </Item>
                        </Grid>
                    ))}
                </Grid>
                </Box>
                <AlertDialogModal open={open} setOpen={setOpen} handleDelete={handleDelete}/>
            <CssBaseline />
            </Box>
        </main>
    );
};
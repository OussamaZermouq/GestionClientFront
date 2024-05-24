import * as React from 'react';
import Button from '@mui/joy/Button';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import Divider from '@mui/joy/Divider';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';
import ExampleNavigationMenu from '../fragments/navigationBar/ExampleNavigationMenu';
import CssBaseline from '@mui/joy/CssBaseline';
import getCommandes from '../../api/commandes/getCommandesDataService';
import CommandeFragment from '../fragments/commandes/CommandeFragment';
import Add from '@mui/icons-material/Add';
import Input from '@mui/joy/Input';
import SearchIcon from "@mui/icons-material/Search";
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';
import Sheet from '@mui/joy/Sheet';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';

export default function GestionCommande() {
  const [commandeData, setCommandeData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [commandeId, setCommandeId] = React.useState(null);
  const [loading, setLoading] = React.useState(true); // Add loading state


  //first delete button
  function handleDelete(commandeIdDel){
    setCommandeId(commandeIdDel);
    setOpen(true);
  }
  
  //second delete button
  function handleConfirmationDelete(commandeid_){
    // Call the API for delete function using the commandeId
    console.log("Deleting Commande with ID: ", commandeid_);
    setOpen(false);
  }

  React.useEffect(() => {
    async function fetchCommandes() {
      const data = await getCommandes();
      {data && data.map(d =>(
        commandeData.push(d)
      ))}
      setLoading(false); // Set loading to false when data fetching is complete
    }
    fetchCommandes();
  }, []);

  
function FilterFragment  () {
  const [status, setStatus] = React.useState({
    declinedPayment: true,
    deliveryError: true,
    wrongAddress: true,
  });
  return (
    <Sheet variant="outlined" sx={{ p: 2, borderRadius: 'sm', width: 300 }}>
      <Typography
        id="filter-status"
        sx={{
          textTransform: 'uppercase',
          fontSize: 'xs',
          letterSpacing: 'lg',
          fontWeight: 'lg',
          color: 'text.secondary',
          mb: 2,
        }}
      >
        Option de filtrage
      </Typography>
      <div role="group" aria-labelledby="filter-status">
        <List>
          <ListItem variant="soft" color="danger">
            <Checkbox
              label="Commande Annulee"
              color="danger"
              overlay
              checked={status.declinedPayment}
              onChange={(event) =>
                setStatus({ ...status, declinedPayment: event.target.checked })
              }
              sx={{ color: 'inherit' }}
            />
          </ListItem>
          <ListItem variant="plain" color="warning" sx={{ borderRadius: 'sm' }}>
            <Checkbox
              label="Commande livree"
              color="success"
              overlay
              checked={status.deliveryError}
              onChange={(event) =>
                setStatus({ ...status, deliveryError: event.target.checked })
              }
            />
          </ListItem>
          <ListItem variant="plain" sx={{ borderRadius: 'sm' }}>
            <Checkbox
              label="commande en attente"
              color="warning"
              overlay
              checked={status.wrongAddress}
              onChange={(event) =>
                setStatus({ ...status, wrongAddress: event.target.checked })
              }
            />
          </ListItem>
        </List>
      </div>
      <Button
        variant="outlined"
        color="neutral"
        size="sm"
        onClick={() =>
          setStatus({
            declinedPayment: false,
            deliveryError: false,
            wrongAddress: false,
          })
        }
        sx={{ px: 1.5, mt: 1 }}
      >
        Clear All
      </Button>
    </Sheet>
  );
}


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

  return(
    <menu>
      <ExampleNavigationMenu />
      <Box sx={{
        my:17,
        marginLeft:10,
        position:'fixed',
        }}>
      <FilterFragment />
      </Box>
      <Stack 
                direction="row" 
                spacing={1} 
                justifyContent="flex-end"
                mx={25}
                my={5}
                divider={<Divider orientation="vertical" />} 
                >

                <Button variant="solid" startDecorator={<Add />}>
                    Ajouter Commande
                </Button>
                <Input
                startDecorator={<SearchIcon />}
                endDecorator={<Button>Search</Button>}
                ></Input>
            </Stack>
      
      <Stack>
        {!loading && commandeData && commandeData.map(commande => (
          <Grid item key={commande.id} xs={2} p={2} sm={2} md={3} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CommandeFragment commande={commande} />
          </Grid>
        ))}
      </Stack>
      <AlertDialogModal open={open} setOpen={setOpen} handleDelete={handleDelete}/>
      <CssBaseline />
    </menu>
  )
}

import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import EditIcon from '@mui/icons-material/Edit';
import ArticleIcon from '@mui/icons-material/Article';
import Chip from '@mui/joy/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import Divider from '@mui/joy/Divider';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import deleteCommande from '../../../api/commandes/DeleteCommandeService'


export default function CommandeFragment(props) {
    const [commandeData, setCommandeData] = React.useState(props.commande)
    const [commandeId, setCommandeId] = React.useState(null);
    const [open, setOpen] = React.useState(false);


      //first delete button
  function handleDelete(commandeIdDel){
    setCommandeId(commandeIdDel);
    setOpen(true);
  }

    //second delete button

    function handleConfirmationDelete(commandeid_){
      //call the API for delete function
      deleteCommande(commandeId);
      setOpen(false);
      
    }

    //for filtering purposes add another endpoint for filtering 
    //so that it can only get the orders hat have been LIVREE ANNULEE or EN ATTENTE

    

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
              Voulez vous vraiment supprimer cette commande
            </DialogContent>
            <DialogActions>
              <Button variant="solid" color="danger" onClick={() => handleConfirmationDelete()}>
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
  

  return (
    <Box
      sx={{
        width: '50%',
        position: 'relative',
        overflow: { xs: 'auto', sm: 'initial' },
      }}
    >

      <Card
        orientation="horizontal"
        sx={{
          width: '100%',
          flexWrap: 'wrap',
          [`& > *`]: {
            '--stack-point': '500px',
            minWidth:
              'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
          },
          // make the card resizable for demo
          overflow: 'auto',
          resize: 'horizontal',
        }}
      >


  
        <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
          <ArticleIcon />
        </AspectRatio>
        <CardContent>
          <Typography fontSize="xl" fontWeight="lg">
            {commandeData.commande_titre}
          </Typography>
          <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
            {commandeData.commande_id}
          </Typography>

          <Sheet
            sx={{
              bgcolor: 'background.level1',
              borderRadius: 'sm',
              p: 1.5,
              my: 1.5,
              display: 'flex',
              gap: 2,
              '& > div': { flex: 1 },
            }}
          >
            
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Status
              </Typography>
              {commandeData.status==="LIVREE" && <Chip fontWeight="lg" variant="solid" color="success"> <Typography fontWeight="lg" fontSize={'14px'}>{commandeData.status}</Typography></Chip> }
              {commandeData.status==="EN COURS" && <Chip fontWeight="lg" variant="solid" color="warning"><Typography  fontWeight="lg" fontSize={'14px'}>{commandeData.status}</Typography></Chip> }
              {commandeData.status==="ANNULEE" && <Chip fontWeight="lg" variant="solid" color="danger"><Typography fontWeight="lg" fontSize={'14px'}>{commandeData.status}</Typography></Chip> }
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Produit(s)
              </Typography>

              
              <Typography fontWeight="lg">
                {commandeData.produits.map(produit=>(
                  <Chip
                  color="primary"
                  mx={2}
                  my={2}
                  variant="solid"
                >
                  {produit.titre_produit}
                </Chip>
                ))}</Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Nombre de reclamation
              </Typography>
              <Typography fontWeight="lg"> {commandeData.plaint? commandeData.plaint.length : 0} </Typography>
            </div>
            
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Date commande
              </Typography>
              <Typography fontWeight="lg"> {commandeData.commande_date} </Typography>
            </div>
            
          </Sheet>
          <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
              <Button variant="solid" color="danger" onClick={() => handleDelete(commandeData.commande_id)}>
                <DeleteIcon />
                Supprimer
              </Button>
              <Button variant="outlined" color="neutral">
                <EditIcon />
                Modifier
              </Button>
          </Box>
        </CardContent>
      </Card>
      <AlertDialogModal />

    </Box>
  );
}

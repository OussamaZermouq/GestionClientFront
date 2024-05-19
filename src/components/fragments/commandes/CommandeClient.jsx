import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import Divider from '@mui/joy/Divider';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import deleteCommande from '../../../api/commandes/DeleteCommandeService'

export default function CommandeClient(props) {
  const [commandeData, setCommandeData] = React.useState(props);
  const [open, setOpen] = React.useState(false);
  const [commandeId, setCommandeId] = React.useState(null);

  React.useEffect(() => {
    setCommandeData(props.CommandeData); 
  }, [props.CommandeData]);

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
        width:'50vh',
        height :'50%',
        overflow: { xs: 'auto', sm: 'auto', m:'auto' },
      }}
    >
      {commandeData.commande && commandeData.commande.map(commande => (
        <Card
          key={commande.commande_id}
          orientation="horizontal"
          sx={{
            width: '100%',
            flexWrap: 'wrap',
            [`& > *`]: {
              '--stack-point': '500px',
              minWidth:
                'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
            },
            overflow: 'auto',
            marginBottom:2,
            resize: 'horizontal',
          }}
        >
          <CardContent>
            <Typography fontSize="xl" fontWeight="lg">
              Commande ID : {commande.commande_id}
            </Typography>
            <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
              Commande Titre : {commande.commande_titre}
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
                  Date :
                </Typography>
                <Typography fontWeight="lg">{commande.commande_date}</Typography>
              </div>
              <div>
                <Typography level="body-xs" fontWeight="lg">
                  Quantitee
                </Typography>
                <Typography fontWeight="lg">{commande.quantitee}</Typography>
              </div>
              <div>
                <Typography level="body-xs" fontWeight="lg">
                  Prix
                </Typography>
                <Typography fontWeight="lg">8.9</Typography>
              </div>
            </Sheet>
            <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
              <Button variant="solid" color="danger" onClick={() => handleDelete(commande.commande_id)}>
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
      ))}
      <AlertDialogModal />
    </Box>
  );
}

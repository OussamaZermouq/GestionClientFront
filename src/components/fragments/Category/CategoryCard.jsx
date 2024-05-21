import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import CategoryIcon from '@mui/icons-material/Category';
import Chip from '@mui/joy/Chip';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/joy/Stack';
import EditIcon from '@mui/icons-material/Edit';
import deleteCategory from '../../../api/Categories/DeleteCategoryDataService';
import DialogTitle from '@mui/joy/DialogTitle';
import Button from '@mui/joy/Button';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

export default function OverflowCard(props) {
    const [category,setCategory] = React.useState(props.categoryData)
    const [selectedCategoryId, setselectedCategoryId] = React.useState(null); 
    const [open, setOpen] = React.useState(false);



    // Function to handle delete action
    const handleDelete = () => {
      // Perform delete action using selectedClientId
      console.log("Deleting category with ID:", selectedCategoryId);
      deleteCategory(selectedCategoryId).then((response) => {
          console.log("Deleted category with ID:", selectedCategoryId);
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


  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <CategoryIcon />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">{category.category_id}</Typography>
        <Typography level="title-md">{category.titre}</Typography>
        <Typography level="body-sm">{category.description}</Typography>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
            {category.produits.length } Produit(s)
          </Typography>
          <Divider orientation="vertical" />
          
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={1}
          >
                <Chip
                size="sm"
                variant="outlined"
                color="danger"
                onClick={() => alert('Delete')}
                endDecorator={<CloseIcon />}
              >Supprimer</Chip>

              <Chip
                size="sm"
                variant="outlined"
                color="primary"
                onClick={() => alert('Delete')}
                endDecorator={<EditIcon />}
              >Modifier</Chip>
        </Stack>
        </CardContent>
      </CardOverflow>
      
    </Card>
  );
}

import * as React from 'react';
import ExampleNavigationMenu from '../fragments/navigationBar/ExampleNavigationMenu';
import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';
import CategoryCard from '../fragments/Category/CategoryCard'
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Add from '@mui/icons-material/Add';
import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/Search';
import getCategories from '../../api/Categories/CategoryDataservice';
import deleteCategory from '../../api/Categories/DeleteCategoryDataService';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';


export default function GestionCategories(){
    const [CategoriesData, setCategoriesData] = React.useState([])
    const [open, setOpen] = React.useState(false);
    const [selectedCategoryId, setselectedCategoryId] = React.useState(null); 
    const toggleModal = (clientId) => {
        setOpen(!open);
        setselectedCategoryId(clientId);
    };

     // Function to handle delete action
     const handleDelete = () => {
        // Perform delete action using selectedCategoryId
        console.log("Deleting category with ID:", selectedCategoryId);
        deleteCategory(selectedCategoryId).then((response) => {
            console.log("Deleted category with ID:", selectedCategoryId);
        })
        setOpen(false);
    };

    
    React.useEffect(() => {
        async function fetchCategories() {
            const data = await getCategories();
            setCategoriesData(data);
        }
        fetchCategories();
    }, []);

    
    
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
                  Voulez vous vraiment supprimer cette categorie
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
    <main>
        <ExampleNavigationMenu />
        <Stack 
                direction="row" 
                spacing={1} 
                justifyContent="flex-end"
                mx={20}
                divider={<Divider orientation="vertical" />} 
                >

                <Button variant="solid" onClick={()=>(console.log())} startDecorator={<Add />}>
                    Ajouter Categorie
                </Button>
                <Input
                startDecorator={<SearchIcon />}
                endDecorator={<Button>Search</Button>}
                ></Input>
            </Stack>
        <Box sx={{m:10, mx:30}}>
            <h1>Categories</h1>
            <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 1, sm: 8, md: 12 }}
            sx={{ m:10 ,flexGrow: 1 }}>

            {CategoriesData && CategoriesData.map(category=>(
                
                <Grid xs={2} sm={4} md={4}  >
                    {CategoriesData && <CategoryCard categoryData={category} toggleModal={toggleModal}/>}
                </Grid>
                ))}

        </Grid>
        </Box>
        <AlertDialogModal open={open} setOpen={setOpen} handleDelete={handleDelete}/>
        <CssBaseline />
    </main>
    )
}
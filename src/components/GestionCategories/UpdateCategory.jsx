import * as React from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import CssBaseline from '@mui/joy/CssBaseline';
import ExampleNavigationMenu from '../fragments/navigationBar/ExampleNavigationMenu';
import Add from '@mui/icons-material/Add';
import SnackbarHideDuration from '../fragments/notification/SnackBarNotification'
import updateClient from '../../api/Categories/UpdateCategoryDataService';
import getCategoryById from '../../api/Categories/CategoryByIdDataService';
import { useLocation } from "react-router-dom";



export default function UpdateCategory(props) {
    const search = useLocation().search;
    const id=new URLSearchParams(search).get("id");
    const [category, setCategory] = React.useState();
    var [open, setOpen] = React.useState(false);
    
    React.useEffect(() => {
        async function fetchCategory() {
            const data = await getCategoryById(id);
            setCategory(data);
        }
        fetchCategory();
    }, []);


    const handleButtonClick = () => {
        setOpen(!open);
    };

    function handleSubmit(e){
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        var res = updateClient(id, formJson);
        res.then((value) => {
        if (value===202){
            handleButtonClick();
        }
        });
    }

    return (
        <main>
            <ExampleNavigationMenu />   
        <Card
        variant="outlined"
        sx={{
            maxHeight: 'max-content',
            maxWidth: '40%',
            mx: 'auto',
            overflow: 'auto',
            my:15
        }}
        >
        <form onSubmit={handleSubmit}>

        <Typography level="title-lg" startDecorator={<Add />}>
            Modifier cette categorie
        </Typography>
        <Divider inset="none" />
        <CardContent
            sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
            gap: 1.5,
            my:3
            }}
        >
            <Box >
            <Typography >Nom Categorie</Typography >
            {category && <Input name="titre" placeholder={category.titre}/>}
            </Box>
            
            <Box>
            <Typography >Description categorie</Typography >
            {category && <Input name="description" placeholder={category.description}/>}
            </Box>

            <CardActions sx={{ gridColumn: '1/-1' }}>
            <Button variant="solid" color="primary" type='submit' >
                Modifier
            </Button>
            </CardActions>
        </CardContent>
        </form>
        </Card>

        {open && <SnackbarHideDuration />}
        
        <CssBaseline />
        </main>
        
    );
    }

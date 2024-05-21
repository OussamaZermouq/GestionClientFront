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


export default function GestionCategories(){
    const [CategoriesData, setCategoriesData] = React.useState([])

    React.useEffect(() => {
        async function fetchCategories() {
            const data = await getCategories();
            setCategoriesData(data);
        }
        fetchCategories();
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
                    <CategoryCard categoryData={category}/>
                </Grid>
                ))}

        </Grid>
        </Box>
        <CssBaseline />
    </main>
    )
}
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
import { useNavigate } from "react-router-dom";

export default function OverflowCard(props) {
    const [category,setCategory] = React.useState(props.categoryData)
    const [selectedCategoryId, setselectedCategoryId] = React.useState(null); 

    const navigate = useNavigate();
    const handleUpdate = (category,e)=>{
      e.preventDefault();
      navigate(`/GestionCategories/update/?id=${category.category_id}`);
    };

    const handleDelete = () => {
      // Call the toggleModal function passed as a prop and pass the client ID
      props.toggleModal(category.category_id);
    };


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
                onClick={handleDelete}
                endDecorator={<CloseIcon />}
              >Supprimer</Chip>

              <Chip
                size="sm"
                variant="outlined"
                color="primary"
                onClick={(e) => handleUpdate(category,e)}
                endDecorator={<EditIcon />}
              >Modifier</Chip>
        </Stack>
        </CardContent>
      </CardOverflow>
      
    </Card>
  );
}

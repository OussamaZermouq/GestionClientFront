import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Box from '@mui/joy/Box';

export default function ProductCard(props) {
    const [produitData, setProduitData] = React.useState(props.produitData);

    return (
        <Card sx={{ width: 320, maxWidth: '100%', boxShadow: 'lg' }}>
        
        <CardContent>
            <Typography level="body-xs"><Chip
              color="primary"
              variant="solid"
            >{produitData.categorie.titre}</Chip></Typography>
            <Typography >
                {produitData.titre_produit}
            </Typography>
            <Box>

            Couleur
            <Chip>
                 {produitData.couleur}
            </Chip>
            </Box>
            <Typography>
            {produitData.prix} MAD
            </Typography>
            <Typography level="body-sm">
            </Typography>
        </CardContent>
        <CardOverflow>
            <Button variant="plain"  size="lg" endDecorator={<ArrowOutwardIcon/>}>
            Plus de detail
            </Button>
        </CardOverflow>
        </Card>
    );
    }

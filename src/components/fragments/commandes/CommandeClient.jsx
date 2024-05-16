import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ModalFragment from '../../fragments/commandes/ModalFragment'


export default function CommandeClient(props) {
  const [commandeData, setCommandeData] = React.useState(props);

  const [openModalvar, setopenModal] = React.useState(false);
  function openModal(){
    setopenModal(!openModalvar);
  }

  React.useEffect(() => {
    setCommandeData(props.CommandeData); 
  }, [props.CommandeData]); 

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        overflow: { xs: 'auto', sm: 'initial' },
      }}
    >
      {commandeData.commande && commandeData.commande.map(commande => (
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
            <Button variant="solid" color="danger" onClick={()=>setopenModal(true)}>
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
      <ModalFragment open={openModalvar}/>
    </Box>
  );
}
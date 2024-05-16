import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';
import { useNavigate } from "react-router-dom";

export default function BioCard(props) {
  const navigate = useNavigate();
  const EditClicked = (id,e)=>{
    e.preventDefault();
    navigate(`/GestionClient/update/?id=${id}`);
  };

  return (
    <Card
      sx={{
        width: 320,
        maxWidth: '100%',
        boxShadow: 'lg',
      }}
    >
      <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
        <Avatar src="/static/images/avatar/1.jpg" sx={{ '--Avatar-size': '4rem' }} />
        <Chip
          size="sm"
          variant="soft"
          color="primary"
          sx={{
            mt: -1,
            mb: 1,
            border: '3px solid',
            borderColor: 'background.surface',
          }}
        >
          {props.client.status}
        </Chip>
        <Typography level="title-lg">{props.client.client_nom}</Typography>
        <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
          Email : {props.client.email} <br />
          Telephone  : {props.client.telephone}<br />
          Adresse  : {props.client.adresse}
        </Typography>
      </CardContent>
      <CardOverflow sx={{ bgcolor: 'background.level1' }}>
        <CardActions buttonFlex="1">
          <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
            <Button onClick={(e) =>EditClicked(props.client.client_id,e)}>Edit</Button>
            <Button variant="danger" color="error">
              Delete
            </Button>
          </ButtonGroup>
        </CardActions>
      </CardOverflow>
    </Card>
  );
}

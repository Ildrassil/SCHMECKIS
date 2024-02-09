import * as React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Rezept} from '../models/Rezept.tsx';
import {Button} from "@mui/material";
import {InfoRounded} from "@mui/icons-material";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    fontFamily: 'Montserrat',
    backgroundColor: 'transparent',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
const StyledButton = styled(Button)(() => ({
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    borderColor: '#FFFFFF',
    flexDirection: 'row',
}));


type RezeptProps = {
    rezept: Rezept
}

export default function RezeptCard({rezept}: RezeptProps) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card key={rezept.id} sx={{maxWidth: 345}}>
            <CardHeader
                action={

                    <IconButton href={'/rezept/' + rezept.id} aria-label="infoIcon">
                        <InfoRounded/>
                    </IconButton>

                }
                title={rezept.rezeptName}
                subheader=""
            />
            <CardMedia
                component="img"
                height="194"
                image={rezept.rezeptImageUrl}
                alt={rezept.rezeptName}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {rezept.rezeptKurzbeschreibung}
                </Typography>
            </CardContent>
            <CardActions>
                {rezept.kategorieList.map((kategorie) => {
                    return <StyledButton variant="outlined" aria-label="#Kategorie"
                                         href={"/kategorie/" + kategorie}>
                        {"#" + kategorie.kategorieName}
                    </StyledButton>
                })}
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Beschreibung:</Typography>
                    <Typography paragraph>
                        {rezept.rezeptBeschreibung}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}

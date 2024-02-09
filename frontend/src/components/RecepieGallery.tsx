import {Rezept} from "../models/Rezept.tsx";
import RezeptCard from "./RezeptCard.tsx";
import Grid from '@mui/material/Unstable_Grid2';
import {styled} from "@mui/material/styles";
import {Paper} from "@mui/material";

type RecepieGalleryProps = {
    rezeptList: Rezept[]
}
const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[50],
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function RezeptGallery({rezeptList}: RecepieGalleryProps) {
    return (
        <Grid container spacing={5} columns={2}>
            {rezeptList && rezeptList.map(rezept => {
                return (<Grid key={rezept.id}>
                    <Item>
                        <RezeptCard rezept={rezept}/>
                    </Item>
                </Grid>)
            })}
        </Grid>)

}
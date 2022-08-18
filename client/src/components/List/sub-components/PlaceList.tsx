import React, { Dispatch } from 'react'
import  Grid from '@material-ui/core/Grid'
import Stack from '@mui/material/Stack'

import { PlaceDetails } from 'components/PlaceDetails'

import Place from 'services/rapid-api/Place'
import User from 'services/rapid-api/User'
import useStyles from '../styles';


interface PlaceListProps{ 
    isMobile:boolean
    places:Place[] |undefined,
    listItemRef:any,
    childClicked:number,
    User:User,
    setMapMarkerFocus:Dispatch<number>
}
const PlaceList :React.FC<PlaceListProps> = ({isMobile, places, listItemRef, childClicked, User, setMapMarkerFocus}) =>{

    const classes = useStyles();
    return (
        <Stack spacing={3} direction={isMobile ? "row" : "column" } className={isMobile ? classes.listMobile :  classes.listDesktop }>
            { places && places.map((place:any, idx:number)=> 
                <Grid item ref={listItemRef[idx]}  key={idx} xs={12} onTouchMove={()=>setMapMarkerFocus(idx)} onMouseEnter={()=>setMapMarkerFocus(idx)}> 
                    <PlaceDetails 
                        place={place} 
                        selected={Number(childClicked) === idx }
                        refProp = {listItemRef[idx]}
                        isMobile={isMobile}
                        User={User}
                    />
                </Grid>)
            }
        </Stack>
    )
}

export default PlaceList;
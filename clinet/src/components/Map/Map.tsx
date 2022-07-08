import React, { Dispatch } from 'react'
// import 'dotenv/config';

import GoogleMapReact from 'google-map-react';

import { Paper, Typography, useMediaQuery } from '@material-ui/core'
import Rating from '@mui/material/Rating';
import defaultRestImg from 'assets/rest.jpg'
import Tooltip from '@material-ui/core/Tooltip';

import useStyles from './styles'

import LocationOutlineIcon from '@material-ui/icons/LocalActivityOutlined'
import RoomIcon from '@material-ui/icons/Room';
import {Coordinates, Bounds} from 'sharedTypes/types'
import Place from 'api/Place';

interface MapProps{
    setMapMarkerFocus:Dispatch<number>
    setChildClicked:Dispatch<number>,
    setCoordinates:Dispatch<Coordinates>,
    setBounds:Dispatch<Bounds>, 
    coordinates : Coordinates,
    places:Place[], 
    isMobile:boolean,
    mapMarkerFocus:number
}
interface MapMarkerProps{
    children: JSX.Element,
    lat:number,
    lng:number,
    place:any,
    key:number
}

const Map :React.FC<MapProps> = ( {setMapMarkerFocus, mapMarkerFocus, setChildClicked,setCoordinates, setBounds, coordinates, places, isMobile  }) => {

    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px');


    const Marker:React.FC<MapMarkerProps> = ({children}) =>{
        return (
        <div className={classes.markerContainer} style={{cursor:"pointer"}}  >
            {children}
        </div>)
    }
    

    return (
        <div className={isMobile ? classes.mapContainerMobile :  classes.mapContainer}>
            <GoogleMapReact 
                bootstrapURLKeys={ { key: process.env.GOOGLE_MAP_KEY! } }
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                // options={''}
                onChange={ (e)=> {
                    console.log(e.marginBounds.sw)
                    setCoordinates( { lat:e.center.lat, lng:e.center.lng } )
                    setBounds({ sw:e.marginBounds.sw, ne:e.marginBounds.ne })
                }}
                onChildClick={(child)=>{setChildClicked(child)}}
            >
                { places &&  places.map( (place:any, idx:number) =>
                (<Marker 
                    lat={Number(place.latitude)}
                    lng={Number(place.longitude)}
                    place={place}
                    key={idx}
            
                >
                { mapMarkerFocus === idx  ? (
                    <Tooltip title={place.name} placement="right-start" arrow>
                        <RoomIcon style={{color:"red", transition:"all .1s ease"}} fontSize="large"/>
                    </Tooltip>
                    ) : ( 
                        <Tooltip title={place.name} placement="right-start" arrow>
                            <RoomIcon color="primary"/> 
                        </Tooltip>
                    )}
                </Marker>)
                )}
            </GoogleMapReact>
            
        </div>
    )
}

export default Map


// { places &&  places.map( (place:any, idx:number) =>
//     (<Marker 
//         lat={Number(place.latitude)}
//         lng={Number(place.longitude)}
//         place={place}
//         key={idx}
//     >
//     { isDesktop ? (
//         <Paper elevation={3} className={classes.paper} >
//             <Typography variant="subtitle2">
//                 {place.name}
//             </Typography>
//             <img 
//                 src={place.photo}
//                 className={classes.pointer}
//                 alt={place.name}
//             />
//             <Rating size="small" value={Number(place.rating)} readOnly />
//         </Paper>
//         ) : ( 
//             <LocationOutlineIcon color="primary" fontSize="large"/> 
//         )}
//     </Marker>)
//     )}
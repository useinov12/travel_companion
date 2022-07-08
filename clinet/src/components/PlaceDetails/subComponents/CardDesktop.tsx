import React, {Dispatch} from 'react';
import {Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip, useMediaQuery} from '@material-ui/core';
import Rating from '@mui/material/Rating';
import User from 'api/User'
import Place from 'api/Place'

import LocationOnIcon from '@material-ui/icons/LocationOn'
import PhoneIcon from '@material-ui/icons/Phone'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

import useStyles from '../styles'


interface CardDesktopProps{
    place:Place,
    selected:boolean,
    refProp:any,
    isMobile:boolean,
    User:User,
    isInFavorites:boolean,
    setIsInFavorites:Dispatch<any>
}

const CardDesktop:React.FC<CardDesktopProps> = ({place, selected, refProp, isMobile, User, isInFavorites, setIsInFavorites}) =>{
    const classes = useStyles();
    return (
        <Card elevation={6}>

            <CardContent style={{margin:'0 5px'}}>
                <CardMedia 
                    image={place.photo}
                    style={{height:250}}
                />
                <Button 
                    size="large" 
                    style={{display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%'}}
                    onClick={()=>{ setIsInFavorites((p:boolean) => !p) }}
                >
                    {isInFavorites?  'Remove from Favorites': 'Add to Favorites'} 
                    {isInFavorites?  <StarIcon style={{color:'orange'}} /> : <StarBorderIcon style={{color:'orange'}} /> } 
                </Button>

                <Typography variant="h5" gutterBottom > {place.name} </Typography>
                <Box display="flex" justifyContent="flex-start" >
                    <Rating size="small" value={Number(place.rating)} readOnly />
                    <Typography gutterBottom variant="subtitle2"> out of {place.num_reviews} reviews </Typography>
                </Box>
                <Box display="flex" justifyContent="flex-start">
                        <Typography variant="subtitle2" style={{marginRight:'5px'}} >Price</Typography>
                        <Typography  variant="subtitle2"> {place.price_level}</Typography>
                    </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography gutterBottom variant="subtitle2"> {place.ranking}</Typography>
                </Box>

                { place.awards &&  place.awards.map( (award:any, idx:number) =>{
                    return idx <2 && (
                        <Box 
                            my={1} key={idx} display="flex" justifyContent="flex-start" alignItems="center">
                            <img src={award.image} alt={award.display_name} style={{marginRight:'3px'}}/>
                            <Typography variant="subtitle2" color="textSecondary">{award.display_name} </Typography>
                        </Box>)
                    })
                }  

                { place.cuisine &&  place.cuisine.map( (name:string, idx:number) =>{
                        return <Chip key={idx} size="small" label={name} className={classes.chip}/>
                    })
                }

                { place.address &&  (
                    <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
                        <LocationOnIcon/> {place.address}
                    </Typography>)
                }
                { place.phone &&  (
                    <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
                        <PhoneIcon/> {place.phone}
                    </Typography>)
                }

                <CardActions>
                    <Button size="small" color="primary" onClick={ ()=>{window.open(place.web_url, '_blank')} }>
                        Trip Advisor
                    </Button>
                    <Button size="small" color="primary" onClick={ ()=>{window.open(place.website, '_blank')} }>
                        Website
                    </Button>
                </CardActions>

            </CardContent>
        </Card>
    )
}

export default CardDesktop

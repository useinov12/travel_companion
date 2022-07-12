import React, {Dispatch} from 'react';
import {Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip, useMediaQuery} from '@material-ui/core';
import Rating from '@mui/material/Rating';
import User from 'api/User'
import Place from 'api/Place'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import LocationOnIcon from '@material-ui/icons/LocationOn'
import PhoneIcon from '@material-ui/icons/Phone'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

import useStyles from '../styles'


interface CardMobileProps{
    place:Place,
    selected:boolean,
    refProp:any,
    isMobile:boolean,
    User:User,
    isInFavorites:boolean,
    setIsInFavorites:Dispatch<any>
}

const CardMobile:React.FC<CardMobileProps> = ({place, selected, refProp, isMobile, User, isInFavorites, setIsInFavorites}) =>{
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
    setOpen(false);
    };
    const fullScreen = useMediaQuery('(min-width:600px',{ noSsr: true });
    return (
        <div className={classes.cardContainerModile} >
            <Card style={{height:"100%", display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"3px", position:'relative' }} elevation={8}  >
                <Box >
                        <CardMedia 
                            component="img"
                            image={place.photo}
                            style={{height:130}}
                        />

                    <CardContent >
                        <Typography variant="subtitle2"  style={{margin:'0', padding:'0'}} > {place.name} </Typography>
                        <Box display="flex" justifyContent="flex-start" >
                            <Rating size="small" value={Number(place.rating)} readOnly style={{marginRight:'5px'}} />
                            <Typography  variant="subtitle2">{place.num_reviews} reviews </Typography>
                        </Box>
                        <Box display="flex" justifyContent="flex-start">
                            <Typography variant="subtitle2" style={{marginRight:'5px'}} >Price</Typography>
                            <Typography  variant="subtitle2"> {place.price_level}</Typography>
                        </Box>

                        { place.cuisine &&  place.cuisine.map( (name:string, idx:number) =>{
                            return idx <3 && <Chip key={idx} size="small" style={{margin:'2px 3px'}}label={name} className={classes.chip}/>
                        })
                    }
                        
                        
                    <Button style={{position:'absolute', width:'95%', bottom:'2px', left:'2.5%'}}size="small" variant="outlined" onClick={handleClickOpen}>Read More</Button>
                    </CardContent>
                </Box>

            </Card>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <CardContent>
                    <CardMedia 
                        image={place.photo}
                        style={{height: 300}}
                    />
                    <Typography variant="h5" gutterBottom > {place.name} </Typography>
                    <Box display="flex" justifyContent="flex-start" >
                        <Rating size="small" value={Number(place.rating)} readOnly style={{marginRight:'5px'}}/>
                        <Typography gutterBottom variant="subtitle2"> out of {place.num_reviews} reviews </Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-start">
                        <Typography variant="subtitle1" style={{marginRight:'5px'}}>Price</Typography>
                        <Typography gutterBottom variant="subtitle1"> {place.price_level}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-start">
                        <Typography gutterBottom variant="subtitle1"> {place.ranking}</Typography>
                    </Box>

                    { place.cuisine &&  place.cuisine.map( (name:string, idx:number) =>{
                            return idx <3 && <Chip key={idx} size="small" label={name} className={classes.chip}/>
                        })
                    }

                    { place.awards &&  place.awards.map( (award:any, idx:number) =>{
                        return idx <2 && (
                            <Box my={1} key={idx} display="flex" justifyContent="space-between" alignItems="center">
                                <img src={award.image} alt={award.display_name} />
                                <Typography variant="subtitle2" color="textSecondary">{award.display_name} </Typography>
                            </Box>)
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

                    <CardActions style={{justifyContent:"flex-start"}} >
                        <Button size="small" color="primary" onClick={ ()=>{window.open(place.web_url, '_blank')} }>
                            Trip Advisor
                        </Button>
                    
                        <Button size="small" color="primary" onClick={ ()=>{window.open(place.website, '_blank')} }>
                            Website
                        </Button>
                    </CardActions>
                </CardContent>


                <DialogActions style={{justifyContent:"space-between"}}>
                    <Button autoFocus onClick={handleClose} variant="outlined" >
                        CLOSE
                    </Button>

                    {/* LOGIN FUNC */}
                    {/* <Button 
                        size="medium" 
                        style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}
                        onClick={()=>setIsInFavorites((p:boolean) => !p)}
                    >
                        {isInFavorites?  'Remove from Favorites': 'Add to Favorites'} 
                        {isInFavorites?  <StarIcon style={{color:'orange'}} /> : <StarBorderIcon style={{color:'orange'}} /> } 
                    </Button> */}
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CardMobile

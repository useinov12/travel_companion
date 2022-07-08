import React, {Dispatch} from 'react'

import Box from '@material-ui/core/Box'

import Typography from '@material-ui/core/Typography'
import  InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import  Select  from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'

import StarIcon from '@material-ui/icons/Star';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


import { PlaceType, Rating } from 'sharedTypes/types'
import useStyles from '../styles';

interface FormsMenu{
    type:PlaceType,
    setType:Dispatch<PlaceType>
    rating:Rating,
    setRating:Dispatch<Rating>,
    setOpenFavList:Dispatch<any>,
    openFavList:boolean
}

const FormsMenu : React.FC<FormsMenu> = ({type, setType, rating, setRating, openFavList, setOpenFavList}) =>{
    const classes = useStyles();

    return (
        <Box display="flex" justifyContent="space-between">
            <Box display="flex">
                <FormControl className={classes.formControl}>
                    <InputLabel>
                        <Typography variant="subtitle2">
                            Type    
                        </Typography>
                    </InputLabel>
                    <Select value={type} onChange={ (e:any) => setType(e.target.value)}> 
                        <MenuItem value='restaurants'>
                            <Typography variant="subtitle2">
                                Restaurants    
                            </Typography>        
                        </MenuItem>
                        <MenuItem value='hotels'>
                            <Typography variant="subtitle2">
                                Hotels    
                            </Typography>    
                        </MenuItem>
                        <MenuItem value='attractions'>
                            <Typography variant="subtitle2">
                                Attractions    
                            </Typography>   
                        </MenuItem>
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel>Rating</InputLabel>
                    <Select value={rating} onChange={ (e:any) => setRating(e.target.value)}> 
                        <MenuItem value={0}>
                            <Typography variant='subtitle2'>
                                All
                            </Typography>
                        </MenuItem>
                        <MenuItem value={3}>
                            <Typography variant='subtitle2'>
                                Above 3.0
                            </Typography>
                        </MenuItem>
                        <MenuItem value={4}>
                            <Typography variant='subtitle2'>
                                Above 4.0
                            </Typography>
                        </MenuItem>
                        <MenuItem value={4.5}>
                            <Typography variant='subtitle2'>
                                Above 4.5
                            </Typography>
                        </MenuItem>
                    </Select>
                </FormControl>
            </Box>

            

            <Button  size="small"  onClick={()=>setOpenFavList( (p:boolean) => !p ) } >
                <StarIcon fontSize="small" style={{color:'orange'}}/>
                <Typography variant='subtitle2'>
                    Favorites
                </Typography>
                { openFavList ? <ExpandLess /> : <ExpandMore /> }
            </Button>
        </Box>
    )
}

export default FormsMenu

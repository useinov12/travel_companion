import React from 'react'
import Typography from '@material-ui/core/Typography'

import {List as ListMUI} from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';

import Place from 'api/Place';


interface FavoritesList{ 
    updatedFavList:Place[] 
    openFavList:boolean
}
const  FavoritesList :React.FC<FavoritesList> = ({updatedFavList, openFavList}) =>{
    return (
        <ListMUI component="div" disablePadding >
            <Collapse in={openFavList} timeout="auto" unmountOnExit>
                <ListMUI component="div" disablePadding>
                { updatedFavList.length>0  ? (updatedFavList.map( (place:Place, idx:number)=>{
                    return (
                        <ListItem  key={idx} button >
                            <Typography variant='subtitle2'>
                                {place.name}
                            </Typography>
                        
                        </ListItem>
                    )})
                    ) : (
                        <ListItem  button >
                            No favorites yet...
                        </ListItem>
                    )
                }
                </ListMUI>
            </Collapse>
        </ListMUI>
    )
}


export default FavoritesList

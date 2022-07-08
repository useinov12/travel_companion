import React, { useState, createRef, useEffect, Dispatch } from 'react'

import {Bounds, PlaceType, Rating } from 'sharedTypes/types'
import Place from 'api/Place'
import User from 'api/User'
import useStyles from './styles';


import FavoritesList from './subComponents/FavoritesList'
import PlaceList from './subComponents/PlaceList'
import SkeletonList from './subComponents/SkeletonList'
import FormsMenu from './subComponents/FormsMenu'



interface ListProps{ 
    childClicked:number,
    places:Place[],
    isLoading:boolean,
    type:PlaceType,
    setType:(type:PlaceType)=>void,
    rating:Rating,
    setRating:(rating:Rating)=>void,
    bounds:Bounds,
    isMobile:boolean, 
    setMapMarkerFocus:Dispatch<number>
    User:User
}
 
const List :React.FC<ListProps> = ( { User, setMapMarkerFocus, childClicked, places, isLoading, type, setType, rating, setRating, bounds, isMobile } ) => {
    
    const classes= useStyles();
    
    const [listItemRef, setListItemRef ] = useState<any>([]);
    const [openFavList, setOpenFavList ] = useState<boolean>(false);

    const [updatedFavList, setUpdatedFavList ] = useState(User.favorites);

    useEffect(()=>{
        setUpdatedFavList(User.favorites)
    }, [])

    useEffect(()=>{
        if(places){
            console.log(places)
            const refs = Array(places.length).fill(0).map((_, idx)=>listItemRef[idx] || createRef() )
            setListItemRef(refs);
        }
    }, [places, bounds])



    useEffect(()=>{
        setUpdatedFavList(User.favorites)
    }, [User.favorites])

    const formsMenuProps = {
        openFavList,
        rating,
        type,
        setType,
        setRating,
        setOpenFavList,
    }

    const favoritesListProps  = {
        openFavList,
        updatedFavList,
    }
    
    const placesProps  = {
        childClicked,
        isMobile,
        listItemRef,
        places,
        setMapMarkerFocus,
        User,
    }

    return (
        <div className={classes.container}>

            <FormsMenu {...formsMenuProps} />

            <FavoritesList {...favoritesListProps} />

            { places ? <PlaceList {...placesProps} /> : <SkeletonList isMobile={isMobile}/> }
            
        </div>
    )
}

export default List

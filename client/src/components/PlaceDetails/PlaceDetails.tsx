import React, {useEffect, useState} from 'react';
import User from 'api/User'
import Place from 'api/Place'

import CardDesktop from './subComponents/CardDesktop'
import CardMobile from './subComponents/CardMobile'

type PlaceDetailsProps={
    place:Place,
    selected:boolean,
    refProp:any,
    isMobile:boolean,
    User:User
}

const PlaceDetails : React.FC<PlaceDetailsProps> = ( { User, place, selected, refProp, isMobile } ) => {

    if(selected) refProp.current.scrollIntoView( {behavior:'smooth', block:"start"});
    const [ isInFavorites, setIsInFavorites] = useState<boolean>(false);


    useEffect(()=>{
        const isInFav = User.favorites.find( (favPlace:Place)=> favPlace.location_id === place.location_id);
        if(isInFav)setIsInFavorites(true);
    }, [])

    useEffect(()=>{
        if(isInFavorites)User.addToFavorites(place)
        else User.removeFromFavorites(place);
    }, [isInFavorites])


    const cardProps = {
        place, 
        selected, 
        refProp, 
        isMobile,
        User, 
        isInFavorites, 
        setIsInFavorites
    }
    return (<>
        { isMobile ? 
            <CardMobile {...cardProps}/> : <CardDesktop {...cardProps}/>
        }
    </>)
}

export default PlaceDetails
import React, {useState, useEffect} from 'react';
import axios from 'axios'
// import jwt_decode from 'jwt-decode';
// import {handleSignIn, renderGoogleSignInBtn } from 'services/googleAuth'

import { getPlacesData, getFavPlaceByCoords } from 'services/rapid-api';
import Place from 'services/rapid-api/Place';
import UserClass from 'services/rapid-api/User'


import { CssBaseline, Grid, useMediaQuery } from '@material-ui/core';

import  { Header} from 'components/Header';
import  { List }   from 'components/List';
import  { Map }  from 'components/Map';

import { Coordinates, Bounds, PlaceType, Rating } from 'sharedTypes/types';

import useStyles from './styles'

const initCoords :Coordinates = { lat:40.7831, lng:73.9712 };
const initBounds:Bounds = { sw:{lat:0, lng:0}, ne:{lat:0, lng:0} };



const App:React.FC = () => {

  const classes = useStyles();
  const currentWidth = useMediaQuery('(min-width:600px',{ noSsr: true })

  const [isMobile, setIsMobile ] = useState<boolean>(false)

  const [ mapMarkerFocus, setMapMarkerFocus ] = useState<number>(0)
  const [childClicked, setChildClicked] = useState<number>(-1);

  const noUser :UserClass = new UserClass('No User')
  const [User, setUser ] = useState<UserClass>(noUser);
 

  const [ places, setPlaces ] = useState<Place[] | undefined>();
  
  const [type, setType ]  = useState<PlaceType>('restaurants');
  const [rating, setRating ]  = useState<Rating>(0);

  const [ coordinates, setCoordinates] = useState<Coordinates>( initCoords );
  const [bounds, setBounds] = useState<Bounds>( initBounds );



  /* HANDLERS */
  const handleSetUser = (user:any) =>{
    // setUser(new UserClass(user))
  }

  const handleSignOut = () =>{
    // setUser(noUser)
    // const btn = document.getElementById("googleSignInBtn")!
    // btn.hidden= false
  }

  /* USE EFFECTS */
  useEffect(()=>{ 
    //get user location
    navigator.geolocation.getCurrentPosition( ({ coords:{ latitude, longitude }} )=>{
      // console.log({ latitude, longitude })
      setCoordinates( {lat:latitude, lng:longitude} )
    })
  }, [])

  useEffect(()=>{
    // handleSignIn(handleSetUser);
  }, [])

  useEffect(()=>{
    setChildClicked(-1)
  }, [mapMarkerFocus])

  useEffect(()=>{
    currentWidth ? setIsMobile(false) : setIsMobile(true)
  }, [currentWidth])


  useEffect(()=>{
    // renderGoogleSignInBtn(isMobile)
  },[isMobile])

  useEffect(()=>{
    const filteredByRating = places && places.filter( (place:Place) => place.rating > rating)!;
    setPlaces(filteredByRating!);
  }, [rating])


  useEffect( ()=>{
    if(bounds !== initBounds){
      getPlacesData(type, bounds.sw, bounds.ne)
      .then( data => {
        setPlaces(data)
      })
    }
  }, [bounds, type])


  /* COMPONENT ARGS*/
  const headerArgs = {
    isMobile,
    User,
    setCoordinates,
    handleSignOut
  }

  const listArgs = {
    User,
    childClicked,
    places,
    type,
    setType,
    rating,
    setRating,
    bounds,
    isMobile,
    setMapMarkerFocus
  }

  const mapArgs = {
    mapMarkerFocus,
    setMapMarkerFocus,
    setChildClicked,
    setCoordinates,
    setBounds,
    coordinates,
    places,
    isMobile
  }

  return (
    <>
      <CssBaseline/>
      <Header  {...headerArgs}/>

      <Grid container className={ isMobile ? classes.mobileGridContainer : classes.desktopGridContainer } spacing={3} style={{width:"100%"}}>
       
        <Grid className={isMobile ?  classes.modileListGridItem : classes.desktopListGridItem } item xs={12} md={5}>
          <List {...listArgs} />
        </Grid>

        <Grid item className={isMobile ? classes.modileMapGridItem : classes.desktopMapGridItem}  xs={12} md={7}>
          <Map {...mapArgs} />
        </Grid>

      </Grid>
    </>
  );
}

export default App;

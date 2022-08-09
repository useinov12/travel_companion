import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { getPlacesData, getFavPlaceByCoords } from 'services/rapid-api';
import Place from 'services/rapid-api/Place';
import UserClass from 'services/rapid-api/User'

import {handleSignIn, renderGoogleSignInBtn } from 'services/googleAuth'

import { CssBaseline, Grid, useMediaQuery } from '@material-ui/core';

import  { Header} from 'components/Header';
import   { List }   from 'components/List';
import  { Map }  from 'components/Map';

import {Coordinates, Bounds, PlaceType, Rating} from 'sharedTypes/types';

import useStyles from './styles'

const initCoords :Coordinates = { lat:40.7831, lng:73.9712 };
const initBounds:Bounds = { sw:{lat:0, lng:0}, ne:{lat:0, lng:0} };

function App() {

  const classes = useStyles();

  const [isMobile, setIsMobile ] = useState<boolean>(false)
  const currentWidth = useMediaQuery('(min-width:600px',{ noSsr: true })

  const [ mapMarkerFocus, setMapMarkerFocus ] = useState<number>(0)
  const [childClicked, setChildClicked] = useState<number>(-1);

  const noUser :UserClass = new UserClass('No User')
  const [User, setUser ] = useState<UserClass>(noUser);
 

  const [ places, setPlaces ] = useState<Place[]>();
  const [ filteredPlaces, setFilteredPlaces ] = useState<Place[]>([]);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  
  const [type, setType ]  = useState<PlaceType>('restaurants');
  const [rating, setRating ]  = useState<Rating>(0);

  const [ coordinates, setCoordinates] = useState<Coordinates>( initCoords );
  const [bounds, setBounds] = useState<Bounds>( initBounds );


  useEffect(()=>{
    setChildClicked(-1)
  }, [mapMarkerFocus])

  useEffect(()=>{
    currentWidth ? setIsMobile(false) : setIsMobile(true)
  }, [currentWidth])


  const handleSetUser = (user:any) =>{
    console.log('SETTIN USER USING HANDLER')
    setUser(new UserClass(user))
  }

  const handleSignOut = () =>{
    setUser(noUser)
    const btn = document.getElementById("googleSignInBtn")!
    btn.hidden= false
  }

  useEffect(()=>{ 
    //get user location
    navigator.geolocation.getCurrentPosition( ({ coords:{ latitude, longitude }} )=>{
      console.log({ latitude, longitude })
      setCoordinates( {lat:latitude, lng:longitude} )
    })
  }, [])


  useEffect(()=>{
    handleSignIn(handleSetUser);
  }, [])

  useEffect(()=>{
    renderGoogleSignInBtn(isMobile)
  },[isMobile])

  useEffect(()=>{
    const filteredPlaces = places &&  places.filter( (place:Place) => place.rating > rating)!;
    setFilteredPlaces(filteredPlaces!);
  }, [rating])

  useEffect(()=>{
    if(bounds){
      setIsLoading(true)

      getPlacesData(type, bounds.sw, bounds.ne)
      .then( data => {
        setPlaces(data && data.filter( (place:any) => place.name && place.num_reviews > 0))
        // console.log(data)
        setIsLoading(false)
      })
    }
  }, [bounds, type])



  return (
    <>
      <CssBaseline/>
      <Header 
        isMobile={isMobile}
        User={User}
        setCoordinates={setCoordinates}
        handleSignOut={handleSignOut}
      />
      <Grid container className={isMobile ? classes.mobileGridContainer : classes.desktopGridContainer } spacing={3} style={{width:"100%"}}>
       
        <Grid className={isMobile ?  classes.modileListGridItem : classes.desktopListGridItem } item xs={12} md={5}>
          <List 
            User={User}
            isLoading={isLoading}
            childClicked={childClicked}
            places={filteredPlaces ? filteredPlaces : places!} 
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            bounds={bounds}
            isMobile={isMobile}
            setMapMarkerFocus={setMapMarkerFocus}
          />
        </Grid>

        <Grid item className={isMobile ? classes.modileMapGridItem : classes.desktopMapGridItem}  xs={12} md={7}>
          <Map 
            mapMarkerFocus={mapMarkerFocus}
            setMapMarkerFocus={setMapMarkerFocus}
            setChildClicked={setChildClicked}
            setCoordinates={setCoordinates} 
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces ? filteredPlaces : places!}
            isMobile={isMobile}
          />
        </Grid>

      </Grid>
    </>
  );
}

export default App;

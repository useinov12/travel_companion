import React, {useState, useEffect} from 'react';
import jwt_decode from 'jwt-decode';
import { getPlacesData } from 'api';
import Place from 'api/Place';
import UserClass from 'api/User'

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


  const handleSignInCB = (response:any) =>{
    console.log({'Encoded JWT ID Token':response.credential})
    const userObject = jwt_decode(response.credential) 
    console.log( {googleRespCred:userObject} )
    setUser( new UserClass( userObject ))
    const btn = document.getElementById("googleSignInBtn")!
    btn.hidden= true
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
    /* global google */
    // @ts-ignore
    google.accounts.id.initialize( {
      client_id: process.env.REACT_APP_GOOGLE_SIGN_IN_KEY, 
      callback: handleSignInCB
    })
  }, [])

  useEffect(()=>{
    /* global google */
    // @ts-ignore
    google.accounts.id.renderButton(
      document.getElementById("googleSignInBtn"),
      {theme:"filled_black", size:"large", type: isMobile ? 'icon':'standart', text:"signin"}
    )
  },[isMobile])

  useEffect(()=>{
    const filteredPlaces = places &&  places.filter( (place:Place) => place.rating > rating)!;
    setFilteredPlaces(filteredPlaces!);
  }, [rating])

  useEffect(()=>{
    if(bounds !== initBounds){
      setIsLoading(true)

      getPlacesData(type, bounds.sw, bounds.ne)
        .then( (data) => {
          setPlaces(data && data.filter((place:any)=> place.name && place.num_reviews > 0))
          console.log(data)
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

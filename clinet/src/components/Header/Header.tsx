import React, { useState } from 'react'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import StreetviewIcon from '@material-ui/icons/Streetview';

import {Coordinates} from 'sharedTypes/types'

import useStyles from './styles';

import SearchInput from './subComponents/SearchInput'
import UserIcon from './subComponents/UserIcon'



type HeaderProps= {
    setCoordinates:(coords:Coordinates)=>void,
    User:any,
    isMobile:boolean, 
    handleSignOut:()=>void
}


const Header:React.FC<HeaderProps> = ( {isMobile,  User, setCoordinates, handleSignOut} ) => {
 
    const classes = useStyles();
    const [autocomplete, setAutoComplete] = useState<any>();

    const onLoad = (autoC:any) => setAutoComplete(autoC);

    const onPlaceChanged = () =>{
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
        setCoordinates({lat, lng})
    }


    const Logo:React.FC = () =>{
        return (
            <Box className={classes.title}>
                <StreetviewIcon/>
                <Typography variant='h5' >
                    TravelCompanion
                </Typography>
            </Box>
        )
    }

    
    const userIconProps = {
        User, 
        handleSignOut
    }

    return (
        <div>
            <AppBar position='static'>
                <Toolbar className={classes.toolbar}>
                    <Logo/>
                    <Box  className={ isMobile ?  classes.mobileSubMenuStyle : classes.desktopSubMenu }>

                        <SearchInput onLoad={onLoad} onPlaceChanged={onPlaceChanged}/>

                        <div id="googleSignInBtn" ></div> 

                        { User.name && <UserIcon {...userIconProps}/> }
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header

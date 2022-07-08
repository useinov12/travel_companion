import React from 'react'

import { Autocomplete } from '@react-google-maps/api';

import InputBase from '@material-ui/core/InputBase';
import Box from '@material-ui/core/Box';

import SearchIcon from '@material-ui/icons/Search';

import useStyles from '../styles';



interface SearchInput{
    onLoad:(autoC:any)=>void,
    onPlaceChanged:()=>void
}

const SearchInput :React.FC<SearchInput> = ({onLoad, onPlaceChanged }) =>{
    const classes = useStyles();
    return (
        <Box display="flex">
            <Autocomplete onLoad={(autoC:any)=>onLoad(autoC)} onPlaceChanged={onPlaceChanged} >
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase placeholder='Search...' classes={{root:classes.inputRoot, input:classes.inputInput }}/>
                    </div>
            </Autocomplete>
        </Box>
    )
}

export default SearchInput

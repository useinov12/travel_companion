import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({

    mobileGridContainer:{
        width:"100%",
        // overflow:"hidden",
        display:"flex", 
        flexDirection:"column-reverse",
        // backgroundColor:'red'

    },

    modileMapGridItem:{
        // height:"40vh",
        width:"100%",

    },
    modileListGridItem:{
        height:"100%",
        width:"100%",
        // display:"none"
    },

    desktopGridContainer:{
        width:"100%",
    },
    desktopMapGridItem:{
        // height:"60vh"
    },
    desktopListGridItem:{
        // height:"30vh"
    },
}));
  
import React from 'react'
import Box from '@material-ui/core/Box'
import  Grid from '@material-ui/core/Grid'
import Stack from '@mui/material/Stack'


import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import useStyles from '../styles';



interface SkeletonList{
    isMobile:boolean
}
const SkeletonList  :React.FC<SkeletonList> = ({isMobile}) =>{
    const classes = useStyles();
    return <Stack spacing={3} direction={isMobile ? "row" : "column" } className={isMobile ? classes.listMobile :  classes.listDesktop }>
    {  [0,0,0,0,].map( ( _:any, idx:number)=> 
        <Grid item  key={idx} xs={12} > 
            <Card>
                <CardContent>
                    <CardMedia>
                        <Skeleton variant="rect" height={250} />
                    </CardMedia>
                    <Skeleton variant="text" height={35} width={100}/>
                    <Skeleton variant="text" height={35} />
                    <Skeleton variant="text" height={35} />
                    <Box display="flex" justifyContent="flex-start">
                        <Skeleton variant="circle"  width={20} height={15} />
                        <Skeleton variant="circle" style={{margin:'0 5px'}} width={20} height={15} />
                        <Skeleton variant="circle" style={{margin:'0 5px'}} width={20} height={15} />
                    </Box>
                    <Skeleton variant="text" height={20} width={170}/>
                    <Skeleton variant="text" height={20} width={200}/>
                    <Skeleton variant="text" height={20} />
                    <Skeleton variant="text" height={35} width={80}/>
                    <Skeleton variant="text" height={35} />
                </CardContent>
            </Card>
        </Grid>)
    }
    </Stack>
}



export default SkeletonList

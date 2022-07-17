import React, {useState, useEffect} from 'react'

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem  from '@material-ui/core/MenuItem';


interface UserIcon{
    User:any,
    handleSignOut:()=>void
}
const UserIcon :React.FC<UserIcon> = ({ User, handleSignOut}) =>{

    const [ userInfo, setUserInfo ] = useState<any>(User)

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const settings = ['Logout'];

    useEffect(()=>{
        setUserInfo(User)
    }, [])
    useEffect(()=>{
        setUserInfo(User)
    }, [User])

    return (
        <Box>
            <Tooltip title="Open settings">
            <IconButton  onClick={handleOpenUserMenu}>
                <Avatar alt={userInfo.name} src={userInfo.picture} />
            </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
            { settings.map((setting) => (
                <MenuItem key={setting} onClick={()=>{
                    handleCloseUserMenu()
                    handleSignOut();
                }} >
                    <Typography >{setting}</Typography>
                </MenuItem>
            ))}
            </Menu>
        </Box>
    )
}

export default UserIcon

import axios from 'axios';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import Place from '../rapid-api/Place'

import AccessUserService from '../user.servise/index'

export const handleSignIn = (handleSetUser:(state:any)=>void) =>{
    
    /* global google */
    // @ts-ignore
    google.accounts.id.initialize( {
        client_id: process.env.REACT_APP_GOOGLE_SIGN_IN_KEY, 
        callback: (googleResp:any)=>{
            console.log('IN INITIALIZE',googleResp)
            handleSignInCB(googleResp, handleSetUser)
        }
    })
}
export const renderGoogleSignInBtn = (isMobile:boolean) =>{
    /* global google */
    // @ts-ignore
    google.accounts.id.renderButton(
        document.getElementById("googleSignInBtn"),
        {theme:"filled_black", size:"large", type: isMobile ? 'icon':'standart', text:"signin"}
    )
}

interface UserType{
    username:string;
    email:string;
    places:Place[]
}

type UserApi = UserType | void


const handleSignInCB = async (googleAuthresponse:any, handleSetUser:(state:any)=>void ) :Promise<UserApi> =>{
    const googleRespopnse:any = jwt_decode<JwtPayload>(googleAuthresponse.credential) ;
    // console.log( {googleRespCred:googleRespopnse} )
    const { email, name} = googleRespopnse;

    //set State
    handleSetUser(googleRespopnse);
    
    //handle DB create/get 
    let getUser:any = await AccessUserService.getByEmail(email);
    if(getUser.status !== 200){
        await AccessUserService.createUser(email, name);   
        getUser = await AccessUserService.getByEmail(email);
        // console.log({User, status})
    } else {
        // console.log(getUser.User, getUser.status)
    }

    //hide btn if logged in
    const btn = document.getElementById("googleSignInBtn")!
    btn.hidden= true;
}

export const handleSignOut = () =>{
    const btn = document.getElementById("googleSignInBtn")!
    btn.hidden= false
}
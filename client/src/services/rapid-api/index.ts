import axios from 'axios';
import Place from './Place'

export const getPlacesData  = async (type:string, sw:any, ne:any) =>{ //type ts

  try{
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng
      },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY!,
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    });


    let rawList= data;
    console.log(rawList[0])
    let formatedList:Place[] = [];
    rawList.map( (place:any)=>  formatedList.push( new Place(place)) )
    return formatedList;
  }
  catch(error){
    console.log('Fetch Error', error)
  }
}

export const getFavPlaceByCoords = async (type:string, lat:any, lng:any, name:string) =>{//type ts
  try{
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-by-latlng`, {
      params: {
        latitude:lat,
        longitude:lng
      },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY!,
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    })

    const rawData = data;
    console.log(rawData)
    const getFiltered = rawData.filter( (place:Place) => place.name === name)
    console.log(getFiltered[0])

    return rawData
  } catch(error){
    console.log('FRTCH ERROR', error)
  }
}

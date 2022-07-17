import http from '../http-common';
// import {FavoritePlaceID} from 'types/fav-place'
import Place from '../rapid-api/Place'
class FavoritePlacesDataService{
    getAll(email:string){
        return http.get<Place[]>('/users', { params:{email}} )
    }
    add(email:string, place:Place){
        return http.put<Place>(`/users/add_favorite`, {email, place})
    }
    delete(email:string, location_id:string){
        return http.put<typeof location_id>(`/users/remove_favorite`, {email, location_id})
    }
}
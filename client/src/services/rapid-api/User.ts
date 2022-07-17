import Place from './Place'


export default class User {
    name:string;
    // user_id:string;
    picture:string;
    favorites:Place[]

    constructor(user:any){
        this.name = user.name;
        // this.user_id = '';
        this.picture = user.picture;
        this.favorites = [];
    }

    addToFavorites(place:Place){
        this.favorites.push(place)
    }
    removeFromFavorites(place:Place){
        let updatedList = this.favorites.filter( favPlace => favPlace !== place );
        this.favorites = updatedList;
    }
}
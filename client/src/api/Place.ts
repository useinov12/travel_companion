import defaultRestImg from 'assets/rest.jpg';

export default class Place {
    name:string;
    location_id:string;
    latitude:string;
    longitude:string;
    photo:string;
    rating:number;
    num_reviews:string;
    price_level:string;
    ranking:string;
    awards?:{image:string, award_name:string}[]
    cuisine?:string[];
    address?:string;
    phone?:string;
    web_url:string;
    website:string;

    constructor(place:any){
      this.name = place.name;
      this.location_id = place.location_id
      this.latitude = place.latitude;
      this.longitude = place.longitude;
      this.photo = place.photo ? place.photo.images.large.url : defaultRestImg ;
      this.rating = Number(place.rating);
      this.num_reviews = place.num_reviews;
      this.price_level =  place.price_level;
      this.ranking = place.ranking;
      this.awards = place.awards && place.awards.map( (award:any) => new Award(award) );
      this.cuisine = place.cuisine && place.cuisine.map( ( {name}:any )=> name ) ;
      this.address = place.address && place.address;
      this.phone = place.phone && place.phone;
      this.web_url = place.web_url && place.web_url;
      this.website = place.website && place.website;

    }
  }
  
class Award {
    display_name:string;
    image:string;
    constructor(award:any){
        this.display_name = award.display_name;
        this.image = award.images ? award.images.small : '';
    }
}
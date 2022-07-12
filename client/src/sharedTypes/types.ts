type CoordParam = number;
export type Bounds = { ne:Coordinates, sw:Coordinates };
export type Coordinates = { lat:CoordParam, lng:CoordParam };
export type PlaceType = 'restaurants' | 'hotels' | 'attractions';
export type Rating = 0 |  3 |  4 |  4.5 ; 
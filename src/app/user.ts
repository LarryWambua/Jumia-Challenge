
interface Name{
    title: string;
      first: string;
      last: string;
}

interface Coordinates{
    latitude: String ,
    longitude: String 
}

interface Picture{
    large: string;
    medium: string;
    thumbnail: string; 
}

interface Location{
    country: string;
    city: string;
    state: string;
    postcode: string;
    coordinates: Coordinates;
}

interface Registered{
    date: String;
    age: Number; 
}

interface Dob{
    date: String;
    age: Number; 
}


export class User {

    constructor( 
     public name: Name,
     public location: Location,
     public picture: Picture,
     public gender: string,
     public registered: Registered,
     public dob: Dob,
     public email:string,
     public phone:string,
     public nat:string
    ){

    }
}

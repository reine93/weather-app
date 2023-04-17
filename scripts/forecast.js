const key = "PKXP4FJwBVrmVWkB1Gn8G6GAUcA5u8er" //API KEY

const getWeather = async (cityID) => {

    const base = "http://dataservice.accuweather.com/currentconditions/v1/"
    const query = `${cityID}?apikey=${key}&language=hr-HR"`

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0]

};


//get city information
const getCity = async (city) => {

    const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${key}&q=${city}`; //for query parameters we always add ? to the end of URL

    const response = await fetch(base + query)
    const data = await response.json();

    return data[0]
}




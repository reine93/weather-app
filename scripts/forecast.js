class Forecast {
    constructor() {
        this.key = "fR031e5ZWfbkbYjNTBBqUG6UcspJEAg8";
        this.weatherURI = "https://dataservice.accuweather.com/currentconditions/v1/"
        this.cityURI = "https://dataservice.accuweather.com/locations/v1/cities/search"
    }
    async updateCity(city) {
        const cityDets = await this.getCity(city);
        const weather = await this.getWeather(cityDets.Key);
        return {cityDets, weather}
    }

    async getCity(city) {
        const query = `?apikey=${this.key}&q=${city}`; //for query parameters we always add ? to the end of URL
        const response = await fetch(this.cityURI + query)
        const data = await response.json();

        return data[0]
    }

    async getWeather(cityID) {
        const query = `${cityID}?apikey=${this.key}&language=hr-HR&details=true`;
        const response = await fetch(this.weatherURI + query)
        const data = await response.json();

        return data[0]

    }

}


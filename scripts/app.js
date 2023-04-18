const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img")

const updateUI = (data) => {

    /* const cityDets = data.cityDets;
    const weather = data.weather; */

    //destructure properties

    const {cityDets, weather } = data; //from data object get cityDates and store it in const of same name, same with weather
    console.log(cityDets, weather)
    //update details template

    details.innerHTML = `
    <h5 class="my-3">${cityDets.LocalizedName}</h5>
    <h5 class="my-3">${weather.WeatherText}</h5>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
     `;

     //update the night/day & icon images
     let iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
     icon.setAttribute("src", iconSrc)

     //const result = condition ?  "value 1" : "value 2"  --> ternary operator evaluates if true or false
     let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";

     time.setAttribute("src", timeSrc)
    //remove the d-none class if present
     if (card.classList.contains("d-none")) {
        card.classList.remove("d-none")
     }
}

const updateCity  = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        //cityDets: cityDets,
       // weather: weather  --> using object shorthand notation
       cityDets,
       weather //it assumes property and value are going to have same name
    }

}

cityForm.addEventListener("submit", e => {

    //get city value
    //store city here
    const city = cityForm.city.value.trim(); //name for input field is defined so we can simply call city property
    cityForm.reset();                        //trim to remove whitespace
    //set local storage
    localStorage.setItem("city", city); //always rewrites depending on what was last entered
})
    //update UI with new city by calling async function directly inside
    if(localStorage.getItem("city")) { //runs only if city exists
    updateCity(localStorage.getItem("city"))
    .then(data => updateUI(data))
    .catch(err => console.log(err))

}
const url = 'https://api.openweathermap.org/data/2.5/weather?'
const iconUrl = 'http://openweathermap.org/img/wn/'
const apiKey = '' // API-avaimeni on tässä

const tempSpan = document.querySelector('#temp')
const speedSpan = document.querySelector('#speed')
const dirSpan = document.querySelector('#direction')
const descSpan = document.querySelector('#description')
const iconImg = document.querySelector('img')

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            document.querySelector('#lat').innerHTML = position.coords.latitude.toFixed(3) + ', '
            document.querySelector('#lng').innerHTML = position.coords.longitude.toFixed(3)
            getWeather(position.coords.latitude, position.coords.longitude)
        }), (error => {
            alert(error)
        })
    } else {
        alert("Your browser does not support geolocation!")
    }
}

const getWeather = (lat, lng) => {
    const address = url +
    'lat=' + lat +
    '&lon=' + lng +
    '&units=metric' +
    '&appid=' + apiKey
    axios.get(address)
        .then(response => {
            const json = response.data
            tempSpan.innerHTML = json.main.temp + '&#8451;'
            speedSpan.innerHTML = json.wind.speed + ' m/s'
            dirSpan.innerHTML = json.wind.deg + '&#176;'
            descSpan.innerHTML = json.weather[0].description
            const image = iconUrl + json.weather[0].icon + '@2x.png'
            iconImg.src = image
        }).catch(error => {
            alert(error)
        })
}

getLocation()
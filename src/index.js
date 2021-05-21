import './style.css';

const APIKEY = '6cca8406b456df1693c45ca2a4f00daa';

getWeather('New York');

async function getWeather(location) {
    // const resp = await fetch(`http://api.weatherstack.com/current?access_key=${APIKEY}&query=${location}`)
    // const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=3265874a2c77ae4a04bb96236a642d2f`)
    try {
        const resp = await fetch(`http://api.weatherstack.com/forecast?access_key=${APIKEY}&query=${location}`)
        const data = await resp.json();
        weatherApp(data);
    } catch(e) {
        console.log(e);
        main.innerHTML = `<h2 class="error-msg">Please check your spelling and try again!</h2>`
            setTimeout(() => {
            document.querySelector('.error-msg').style.display = 'none';
            getWeather('New York');
        }, 5000);
    } finally {
        preloader.classList.add('hide');
    }
}

// DOM and Variables
const weatherAppEl = document.getElementById('weather-app');
const main = document.getElementById('main');
const btn = document.querySelector('.dark-mode-button');
const menuBtn = document.querySelector('.menu-btn');
const btnClose = document.querySelector('.btn-close');
const menu = document.getElementById('menu');
const weatherIcons = ['<i class="fas fa-moon"></i>', '<img src="./assets/Ellipse 3.svg">'];
const preloader = document.querySelector('.preloader');
let darkMode = false;

// Event Listeners
btn.addEventListener('click', () => {
    btn.classList.toggle('active');

    document.documentElement.classList.add('color-theme-in-transition');
    setTimeout(() => {
      document.documentElement.classList.remove('color-theme-in-transition');
    }, 1500);

    if(darkMode == false) { 
        document.documentElement.setAttribute('data-theme', 'Dark');
        darkMode = true;
  } else { 
      document.documentElement.setAttribute('data-theme', 'Light');
      darkMode = false;
  }
})
menuBtn.addEventListener('click', () => {
    menu.classList.add('active');
})
btnClose.addEventListener('click', () => {
    menu.classList.remove('active');
})


// Functions
function weatherApp(data) {
    const firstKey = Object.keys(data.forecast)[0];
    const { temperature, humidity, is_day, visibility, wind_speed, pressure } = data.current;
    const { mintemp, sunhour } = data.forecast[firstKey];
    const { moonrise, moonset, sunrise, sunset } = data.forecast[firstKey].astro;
    const weather_description = data.current.weather_descriptions[0];
    const location = data.location.name;
    const time = currentTime();
    preloader.classList.add('hide');
    if(is_day == 'no') {
        document.documentElement.setAttribute('data-theme', 'Dark');
        darkMode = true;
        btn.classList.add('active');
    } else {
        document.documentElement.setAttribute('data-theme', 'Light');
        darkMode = false;
        btn.classList.remove('active');
    }
    main.innerHTML = `<h1 class="title-location">${location}</h1>
    <div class="info">
      <span class="weekday">${time[1]}</span>
      <span class="current-time">${time[0]}</span>
    </div>
    <h3 class="weather-description">${weather_description}</h3>
    <section id="temperature">
      <div class="temp-form">
        <div class="weather-icon">${isDay(is_day)}</div>
        <h1 class="current-temp">${temperature}</h1>
        <div class="temp-values">
          <div class="upper-value">
            <div class="celcius active">°C</div>
            <div class="vertical-line"></div>
            <div class="fahrenheit">°F</div>
          </div>
          <div class="lower-value">
            <p class="min-temp">Min ${mintemp}°C</p>
          </div>
        </div>
      </div>
      <!-- Transparent White Card -->
      <div class="card">
        <div class="humidity-card">
          <h5>Humidity</h5>
          <i class="fas fa-tint"></i>
          <p class="info-value">${humidity}%</p>
        </div>
        <div class="wind-card">
          <h5>Wind</h5>
          <i class="fas fa-wind"></i>
          <p class="info-value">${wind_speed} KM/h</p>
        </div>
        <div class="visibility-card">
          <h5>Visibility</h5>
          <i class="fas fa-eye"></i>
          <p class="info-value">${visibility} M</p>
        </div>
      </div>
    </section>
    <!-- Input to search by Location -->
    <form id="form">
      <input type="text" id="search-location" placeholder="Search by Location" autocomplete="off">
    </form>
    <!-- Footer Tabs -->
    <footer id="footer">
      <div class="footer-tabs">
        <button class="btn-humidity active" data-tab="humidity">Humidity</button>
        <button class="btn-wind" data-tab="wind">Wind</button>
        <button class="btn-sunhour" data-tab="sunhour">Sun Hour</button>
      </div>
      <div class="footer-content">
        <div id="humidity" class="section-show">
          <div class="left-section">
            <p>Humidity: ${humidity}%</p>
            <p>Pressure: ${pressure}mb</p>
            <p>Visibility ${visibility}M</p>
          </div>
          <div class="right-section">
            <p>Humidity is the amount of water vapor in the air. If there is a lot of water vapor in the air, the humidity will be high. The higher the humidity, the wetter it feels outside.</p>
          </div>
        </div>
        <div id="wind">
          <div class="wind-section">
            <h5>Wind Strength Scale</h5>
            <p>Calm - < 1 KM/h - <b>Smoke rises vertically</b></p>
            <p>Light - 6 - 11 KM/h - <b>Wind felt on face</b></p>
            <p>Moderate - 20 - 28 KM/h - <b>Dust and loose paper lifted</b></p>
            <p>Strong- 38 - 49 KM/h, <b>Umbrellas become difficult to use</b></p>
          </div>
        </div>
        <div id="sunhour">
          <div class="sunset-sunrise">
            <div class="sunrise">
              <div class="icon">
                <img src="./assets/icons8-sunrise-40.png">
              </div>
              <div class="sunhour-info">
                <p>Sunrise</p>
                <span class="time">${sunrise}</span>
              </div>
            </div>
            <div class="sunset">
              <div class="icon">
                <img src="./assets/icons8-sunset-40.png">
              </div>
              <div class="sunhour-info">
                <p>Sunset</p>
                <span class="time">${sunset}</span>
              </div>
            </div>
          </div>
          <!-- </div> -->
          <hr>
          <div class="moonset-moonrise">
            <div class="moonrise">
              <div class="icon">
                <img src="./assets/icons8-moonrise-48.png">
              </div>
              <div class="sunhour-info">
                <p>Moonrise</p>
                <span class="time">${moonrise}</span>
              </div>
            </div>
            <div class="moonset">
              <div class="icon">
                <img src="./assets/icons8-moonset-48.png">
              </div>
              <div class="sunhour-info">
                <p>Moonset</p>
                <span class="time">${moonset}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>`;
    //Convert Temperature from C to F on click
    convertTemp(temperature);
    //Activate footer tabs with buttons
    const footerTabs = document.querySelectorAll('.footer-tabs button');
    footerTabs.forEach(btn => btn.addEventListener('click', (e) => {
        footerTabs.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        const tabID = e.target.dataset.tab;
        const footerContent = document.querySelectorAll('.footer-content > div');
        footerContent.forEach(tab => tab.classList.remove('section-show'));
        const element = document.getElementById(tabID);
        element.classList.add('section-show');
    }))
    //Update time in realtime
    const timeEl = document.querySelector('.current-time');
    setInterval(() => {
        timeEl.innerHTML = currentTime()[0];
    }, 1000);
    //Search by Location
    const form = document.getElementById('form')
    form.addEventListener('submit', searchByLocation);
}

function searchByLocation(e) {
    const search = document.getElementById('search-location')
    main.innerHTML = '';
    e.preventDefault();
    preloader.classList.remove('hide');
    const searchQuery = firstLetterCap(search.value);
    getWeather(searchQuery);
}

// currentTime()

function currentTime() {
    const weekdays = ['Sunday', 'Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const time = new Date();
    const weekday = weekdays[time.getDay()];
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const currentTime = `${hours}:${minutes <= 9 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'}`
    return [currentTime, weekday];
}

function isDay(day) {
    let icon;
    if(day == 'yes') {
        icon = weatherIcons[1];
    } else {
        icon = weatherIcons[0];
    }
    return icon;
}

const convertTemp = (temp) => {
    const temperatureEl = document.querySelector('.current-temp');
    const celcius = document.querySelector('.celcius');
    const fahrenheit = document.querySelector('.fahrenheit');
    main.addEventListener('click', (e) => {
        if(e.target.classList.contains('celcius')) {
            temperatureEl.innerText = temp;
            celcius.classList.add('active');
            fahrenheit.classList.remove('active');
        } else if(e.target.classList.contains('fahrenheit')) {
            temperatureEl.innerText = Math.floor((temp * 9 / 5) + 32);
            celcius.classList.remove('active');
            fahrenheit.classList.add('active')
        } else {
            return;
        }
    })
}

function firstLetterCap(string) {
    const text = string.split(' ');
    const wordArr = [];
    text.forEach(word => {
        let final;
        let letter = word.charAt(0).toUpperCase();
        let rest = word.slice(1);
        final = letter + rest;
        wordArr.push(final);
    })
    return wordArr.join(' ');
}
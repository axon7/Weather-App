
function clock() {
  let d = new Date();
  hours = d.getHours();
  minutes = d.getMinutes();
  seconds = d.getSeconds();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  let time = `${hours}:${minutes}:${seconds}`;
  let clocko = (document.querySelector(".clocko").innerHTML = time);
}

function setIcon(icon, iconID) {
  const skycons = new Skycons({
    color: "white"
  });
  const currentIcon = icon.replace(/-/g, "_").toUpperCase();
  skycons.play();

  return skycons.set(iconID, Skycons[currentIcon]);
}



//default for Warsaw
window.addEventListener("load", () => {
  // setInterval(clock, 1000);
  let latitude;
  let longitude;


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      latitude = position.coords.latitude.toFixed(6);
      longitude = (position.coords.longitude).toFixed(6);
      console.log(latitude, longitude);

      // let urlAPI = `https://api.darksky.net/forecast/ecf36338ca3e63e62b57a1d409a3e9a7/${latitude},${longitude}?lang=pl&units=ca`;

      fetch('./data.json')
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;

          const temp = Number(temperature.toFixed(1));
          let hourlySummary = document.querySelector("#hourlySummary").textContent = data.hourly.summary;
          let currentTemp = document.querySelector(".temperatureInC").textContent = temp;
          let shortSummary = document.querySelector(".summary").textContent = summary;
          let weekSummary = document.querySelector("#weekSummary").textContent = data.daily.summary;

          let sunriseTimeUnix = data.daily.data[0].sunriseTime;
          let sunsetTimeUnix = data.daily.data[0].sunsetTime;
          function unixToTime(timeUnix, id) {
            let d = new Date(timeUnix * 1000);
            let hours = d.getHours();
            let minutes = d.getMinutes();
            let seconds = d.getSeconds();
            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            let timeString = `${hours}:${minutes}:${seconds}`;
            document.querySelector(id).textContent = timeString;

          }

          unixToTime(sunriseTimeUnix, '#sunriseTime');
          unixToTime(sunsetTimeUnix, '#sunsetTime');


          let day1Summary = document.querySelector('#day1Summary').textContent = data.daily.data[2].summary;
          let day1LowTemp = document.querySelector('#day1LowTemp').textContent = data.daily.data[2].temperatureLow.toFixed(1);
          let day1HighTemp = document.querySelector('#day1HighTemp').textContent = data.daily.data[2].temperatureHigh.toFixed(1);

          let day2Summary = document.querySelector('#day2Summary').textContent = data.daily.data[3].summary;
          let day2LowTemp = document.querySelector('#day2LowTemp').textContent = data.daily.data[3].temperatureLow.toFixed(1);
          let day2HighTemp = document.querySelector('#day2HighTemp').textContent = data.daily.data[3].temperatureHigh.toFixed(1);

          let day3Summary = document.querySelector('#day3Summary').textContent = data.daily.data[4].summary;
          let day3LowTemp = document.querySelector('#day3LowTemp').textContent = data.daily.data[4].temperatureLow.toFixed(1);
          let day3HighTemp = document.querySelector('#day3HighTemp').textContent = data.daily.data[4].temperatureHigh.toFixed(1);



          setIcon(icon, document.querySelector("#icon1"));
          setIcon(data.daily.data[2].icon, document.querySelector("#icon2"));
          setIcon(icon, document.querySelector("#icon3"));
          setIcon(icon, document.querySelector("#icon4"));



        });
    });
  }
});

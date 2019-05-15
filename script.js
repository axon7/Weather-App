

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
  setInterval(clock, 1000);
  let latitude;
  let longitude;


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      console.log(latitude, longitude);

      let urlAPI = `https://api.darksky.net/forecast/ecf36338ca3e63e62b57a1d409a3e9a7/${latitude},${longitude}?lang=pl&units=ca`;

      fetch("https://cors-anywhere.herokuapp.com/" + urlAPI)
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;

          const temp = Number(temperature.toFixed(1));
          let hourlySummary = document.querySelector("#hourlySummary").textContent = data.hourly.summary;
          let currentTemp = (document.querySelector(".temperatureInC").textContent = temp);
          let shortSummary = (document.querySelector(".summary").textContent = summary);
          let weekSummary = document.querySelector("#weekSummary").textContent = data.daily.summary;
          setIcon(icon, document.querySelector("#icon1"));
        });
    });
  }
});

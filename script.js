let latitude = 52.22977;
let longitude = 21.01178;
let urlAPI = `https://api.darksky.net/forecast/ecf36338ca3e63e62b57a1d409a3e9a7/${latitude},${longitude}?lang=pl&units=ca`


function clock(){
    let d = new Date();
    hours = d.getHours();
    minutes = d.getMinutes();
    seconds = d.getSeconds();

    let time = `${hours}:${minutes}:${seconds}`;
    let clocko = document.querySelector(".clocko").innerHTML = time;
}

setInterval(clock, 1000);

//default for Warsaw
window.addEventListener('load', ()=>{
    setInterval(clock, 1000);

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=> {
           latitude = position.coords.latitude;
           longitude = position.coords.longitude;
           console.log(latitude, longitude);

            fetch('https://cors-anywhere.herokuapp.com/'+ urlAPI)
                .then(res =>{
                    return res.json();
                })
                .then(data=>{
                    console.log(data);
                    const {temperature, summary} = data.currently;
                    const temp = Number(temperature.toFixed(1)) + 2;
                    let currentTemp = document.querySelector(".temperatureInC").textContent = temp;
                    let shortSummary = document.querySelector('.summary').textContent = summary;
                });
        });
    }   




});




console.log(urlAPI);



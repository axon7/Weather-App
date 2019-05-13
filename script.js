let latitude = 52.22977;
let longitude = 21.01178;
let urlAPI = `https://api.darksky.net/forecast/ecf36338ca3e63e62b57a1d409a3e9a7/${latitude},${longitude}`;




//default for Warsaw
window.addEventListener('load', ()=>{
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
                    const {temperature} = data.currently;
                    const tempInC = ((Number(temperature) - 32)/1.8).toFixed(1);
                    console.log(tempInC);
                    let temperatureInC = document.querySelector(".temperatureInC").textContent = tempInC;
                });
        });
    } 
});




// console.log(urlAPI);



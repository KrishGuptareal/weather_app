const city = document.querySelector("input");
const button = document.querySelector(".icon");
const key = "1765194da641282ad813a4a188e28729";


const ultimate = async (lat,lon)=>{
    let link=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
    let out=await fetch(link);
    let real_output=await out.json();
    //'console.log(real_output);



    //taking values
    let name=real_output.name;
    let des=real_output.weather[0].main;
    let temp=real_output.main.temp;
    let humid=real_output.main.humidity;
    let wind=real_output.wind.speed;
    temp=temp-273.15;
    temp=Math.round(temp)
    //real updating
    document.getElementById("location").innerText =`Location: ${name}`;
    document.getElementById("description").innerText =des;
    document.getElementById("temperature").innerText =`${temp}°C`;
    document.getElementById("wind").innerText=`Wind: ${wind} km/h` 
    document.getElementById("humid").innerText=`Humidity: ${humid}%`;
};


const update = async (val) => {
    // find lat,lon
    let link = `http://api.openweathermap.org/geo/1.0/direct?q=${val}&limit=5&appid=${key}`;
    let out=await fetch(link)
    let real_output= await out.json();
    let lat=real_output[0].lat;
    let lon=real_output[0].lon;
    

    //call weather change api
    ultimate(lat,lon);
};
window.onload = function () {
  update("Delhi");
};

//key down if a key is pressed
city.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const val = city.value.trim();
    update(val);
  }
});

button.addEventListener('click', () => {
    const val = city.value.trim();
    update(val);
});



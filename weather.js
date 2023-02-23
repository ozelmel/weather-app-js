const form = document.querySelector("section.top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector("span.msg");
const list = document.querySelector(".ajax-section .cities");

//apiKey=fda926dd8473bdc8852b2bc56a4cf2c1
// localStorage.setItem("apiKey", EncryptStringAES("fda926dd8473bdc8852b2bc56a4cf2c1"));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeatherDataFromApi();
});
// function getWeatherDataFromApi() {}
const getWeatherDataFromApi = async () => {
  // alert("http request has gone");
  // input.value=""
  let apiKey = DecryptStringAES(localStorage.getItem("apiKey"));
  // console.log(apiKey);
  let inputVal = input.value;
  let units = "metric";
  let lang = "tr";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=${units}&lang=${lang}`;

  try {
    // const response = await fetch.get(url).then(response => response.json());
    const response = await axios.get(url);
    const { name, main, sys, weather } = response.data;
    console.log(response.data);
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    const createdLi = document.createElement("li");
    createdLi.classList.add("city");
    const createdLiInnerHTML = `
        <h2 class="city-name"
        data-name = "${name}, ${sys.country}" >
            <span>${name}</span><sup>${sys.country}</sup></h2><div class = "city-temp">${Math.round(main.temp)}<sup>°C</sup></div><figure>
            <img class="city-icon" src="${iconUrl}">
            <figcaption>${weather[0].description}</figcaption></figure>`;
      createdLi.innerHTML = createdLiInnerHTML;
      list.append(createdLi); //append vs prepend
  } catch (error) {}
  form.reset();
};

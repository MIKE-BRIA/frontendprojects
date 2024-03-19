"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);

  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(request.responseText);
    console.log(data);
    //*currencies
    const currencies = Object.values(data.currencies).map(
      currency => `${currency.name} `
    );

    //*lanuages
    const languages = Object.values(data.languages)
      .map(language => language)
      .join(", ");
    const html = `
          <article class="country">
            <img class="country__img" src="${data.flags.png}" />
            <div class="country__data">
              <h3 class="country__name">${data.name.common}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
              ).toFixed(1)} M</p>
              <p class="country__row"><span>🗣️</span>${languages}</p>
              <p class="country__row"><span>💰</span>${currencies}</p>
            </div>
          </article>
    `;

    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
  });
};

*/

const renderCountry = function (data) {
  const html = `
    <article class="country">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} M</p>
        <p class="country__row"><span>🗣️</span>${data.languages.eng}</p>
        <p class="country__row"><span>💰</span>${data.currencies.KES.name}</p>
      </div>
    </article>
`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

/*
const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);

  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(request.responseText);
    console.log(data);
    //*currencies
    const currencies = Object.values(data.currencies).map(
      currency => `${currency.name} `
    );

    //*languages
    const languages = Object.values(data.languages)
      .map(language => language)
      .join(", ");

    //*country 1
    renderCountry(data, currencies, languages);

    //* Get neighbour country

    const [neighbour] = data.borders;

    if (!neighbour) return;

    const request2 = new XMLHttpRequest();
    request2.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour}`);

    request2.send();

    //*currencies
    const currencies2 = Object.values(data.currencies).map(
      currency => `${currency.name} `
    );

    //*languages
    const languages2 = Object.values(data.languages)
      .map(language => language)
      .join(", ");

    request2.addEventListener("load", function () {
      const [data2] = JSON.parse(request2.responseText);
      console.log(data2);
      renderCountry(data2, currencies2, languages2);
    });
  });
};

// getCountryAndNeighbour("Kenya");
// getCountryAndNeighbour("usa");
getCountryAndNeighbour("portugal");
// getCountryAndNeighbour("Nigeria");


// const request = new XMLHttpRequest();
// request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
// request.send();

// const request = fetch("https://restcountries.com/v3.1/name/Kenya");
// console.log(request);

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};

getCountryData("kenya");
*/

//* microtask queue have a high priority(promises) over callback queue

console.log("Test start");
setTimeout(() => console.log("0 sec timer"), 0);
Promise.resolve("Resolved promise 1").then(res => console.log(res));

Promise.resolve("Resolved promise 2").then(res => {
  for (let i = 0; 1 < 1000; i++) {
    console.log(res);
  }
});
console.log("Test end");

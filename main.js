const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const renderCountry = function (data, className = "") {
  const html = `
  <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)}m</p>
        <p class="country__row"><span>🗣️</span>${Object.values(
          data.languages
        )}</p>
        <p class="country__row"><span>💰</span>${
          Object.values(data.currencies)[0].name
        }</p>
      </div>
  </article>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const whereAmI = async function (country) {
  const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);

  const [data] = await res.json();
  renderCountry(data);
  console.log(data);
  const neighbour = data.borders[0];

  const resNeg = await fetch(
    `https://restcountries.com/v3.1/alpha/${neighbour}`
  );

  const [data2] = await resNeg.json();
  console.log(data2);

  renderCountry(data2);
};

btn.addEventListener("click", function () {
  const country = prompt("Enter a Country");
  whereAmI(country);
});

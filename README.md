#API => [https://openapi.programming-hero.com/api/all]

These are the Programming Hero APIs this project interacts with:

Endpoint	Purpose
/api/all	Fetches data on all countries.
/api/alpha/{code}	Fetches data about a country by its ISO alpha-code (e.g. 116).
/api/lang/{language}	Fetches countries where the specified language is spoken.
/api/name/{name}	Fetches data on a country (or countries) by its common name.

// Fetch all countries
fetch("https://openapi.programming-hero.com/api/all")
  .then((res) => res.json())
  .then((data) => console.log(data));

// Fetch country by ISO code
fetch("https://openapi.programming-hero.com/api/alpha/116")
  .then((res) => res.json())
  .then((data) => console.log(data));

// Fetch countries by language
fetch("https://openapi.programming-hero.com/api/lang/english")
  .then((res) => res.json())
  .then((data) => console.log(data));

// Fetch country by name
fetch("https://openapi.programming-hero.com/api/name/bangladesh")
  .then((res) => res.json())
  .then((data) => console.log(data));

  #api/all
  [
  {
    "name": "Afghanistan",
    "alpha2Code": "AF",
    "alpha3Code": "AFG",
    "capital": "Kabul",
    "region": "Asia",
    "population": 40218234
    // ... more fields
  },
  {
    "name": "Albania",
    "alpha2Code": "AL",
    "alpha3Code": "ALB",
    "capital": "Tirana",
    "region": "Europe",
    "population": 2877797
    // ...
  }
  // ... many more
]

# Live Link : https://react-world-country-idea.vercel.app/
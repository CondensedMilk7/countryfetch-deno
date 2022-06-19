import * as nano from "https://deno.land/x/nanocolors@0.1.12/mod.ts";
import { environment } from "./environment/environment.ts";
import { Country } from "./models/country.model.ts";

let COUNTRIES: Country[];
let QUERY = environment.queries;

export async function syncCountries(force?: boolean) {
  const lastSynced = localStorage.getItem("lastSynced");
  const savedCountries = localStorage.getItem("countries");
  const week = environment.syncInterval * 24 * 60 * 60 * 1000;
  if (
    !savedCountries ||
    !lastSynced ||
    force ||
    Date.now() - Number(lastSynced) > week
  ) {
    console.log(
      nano.cyan("Syncronizing countries database..."),
      force
        ? ""
        : `\nThis will only happen every ${environment.syncInterval} days`
    );

    const response = await fetch(environment.baseUrl + QUERY);
    const countries = await response.json();
    COUNTRIES = countries;
    localStorage.setItem("countries", JSON.stringify(countries));
    localStorage.setItem("lastSynced", JSON.stringify(Date.now()));
    console.log("Synced successfully");
  } else {
    COUNTRIES = JSON.parse(savedCountries);
  }

  return COUNTRIES;
}

export function printCountry(country: Country) {
  let currencies = [];
  let iteration = 0;
  for (const currencyAbbr in country.currencies) {
    iteration++;
    const currency = country.currencies[currencyAbbr];
    currencies.push(
      `${iteration > 1 ? "\t\t " : ""}${currency.symbol} ${
        currency.name
      } (${currencyAbbr})\n`
    );
  }

  let languages = [];
  for (const langAbbr in country.languages) {
    languages.push(country.languages[langAbbr] + " ");
  }

  console.log(
    nano.cyan("\nCountry:\t"),
    country.flag,
    country.name.common,
    nano.green("\nLanguages:\t"),
    ...languages,
    nano.green("\nCapital:\t"),
    country.capital[0],
    nano.green("\nPopulation:\t"),
    country.population.toLocaleString(),
    nano.green("\nCurrencies:\t"),
    ...currencies
  );
}

export function findCountry(name: string): Country {
  // Replace snake case or kebab case with whitespaces
  name = name.toLowerCase().replace(/-|_/g, " ");

  // Find exact match first, then fall back to fuzzy match
  const country = COUNTRIES.find((c) => {
    const countryName = c.name.common.toLocaleLowerCase();
    return countryName === name || countryName.includes(name);
  });

  if (!country) {
    throw Error(`Cannot find country named ${name}`);
  }

  return country;
}

export function randomCountry() {
  const randomNum = Math.floor(Math.random() * COUNTRIES.length);
  return COUNTRIES[randomNum];
}
